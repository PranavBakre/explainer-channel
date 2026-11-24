---
name: video-build
description: Build and render an explainer episode in Remotion — assemble storyboard.json with the narration manifest, add or change visuals in the episode's art direction (2D components, three.js, Lottie, documents, footage), check stills, render the MP4 and normalise loudness. Use when adding or fixing a visual or 3D prop, assembling or re-timing an episode, rendering shots or the full episode, or when a render fails or looks wrong.
---

# Video build (Remotion)

Code: `video/` (Remotion 4, `@remotion/three` + R3F + drei). Visuals register in `video/src/registry.ts`; every new visual gets a gallery entry (`video/src/gallery.json`) so it can be checked alone. Before building a visual, read the art direction named in `brief.md` (only that file in `.claude/skills/art-direction/references/directions/`): its §4–8 say what to build and §10 which helpers, assets and look-specific gotchas apply. This skill holds only what is true in every direction.

## 1. Pipeline (in order)
```
EP=$PWD/episodes/<ep>; ID=<id>; RAW=$EP/out/$ID-raw.mp4; FINAL=$EP/out/<ep>.mp4
df -h .                                   # renders need several GB of temp space
bun tools/build-episode.ts $EP $ID        # → video/src/episodes/$ID.json (auto-registered in episodes/index.ts),
                                          #   video/public/$ID/narration.wav, $EP/out/captions.srt, chapters.txt
(cd video && bunx tsc --noEmit)           # from video/; at the repo root tsc prints help; once per round, not per builder
(cd video && node stills.mjs $ID /tmp/stills-$ID)   # one frame at 70 % of each shot; review at phone size
tools/render.sh $ID $RAW --codec=h264 --crf=20      # serialised across worktrees; adds --gl=angle, --log=error
ffprobe -v error -show_entries format=duration -of csv=p=0 $RAW   # must exist and match the built duration
```
Loudness, two passes (the raw mix lands near −22 LUFS). `TP=-2.0` keeps the AAC-encoded file under −1 dBTP; ep02's −1 dB target measured −0.8 after encoding:
```
ffmpeg -i $RAW -af loudnorm=I=-16:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | tail -12
ffmpeg -i $RAW -c:v copy -af loudnorm=I=-16:TP=-2.0:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true -c:a aac -b:a 192k $FINAL
```
Hand `$FINAL` to `video-qa`.

- **render.sh fails or exits without output** (it once died silently six minutes in): hold the same lock and render directly:
  `zsh -c 'until mkdir /tmp/explainer-render.lock 2>/dev/null; do sleep 3; done; echo $$ > /tmp/explainer-render.lock/pid; trap "rm -rf /tmp/explainer-render.lock" EXIT; cd video && npx remotion render src/index.ts '$ID' '$RAW' --gl=angle --codec=h264 --crf=20 --concurrency=4 --log=error'` (exit status is Remotion's). The `pid` file matters: `render.sh` takes over a lock with no live pid in it, so without one a second render would start beside this one.
- render.sh already passes `--log`; a second `--log` is rejected. Output paths must be absolute (it resolves them after `cd video`).
- **`--gl=angle` always.** Default headless Chrome picked SwiftShader (~640 % CPU) and some 3D rendered wrong.
- **Narration is pre-mixed.** Remotion's mixer writes a full-length WAV per group of overlapping clips (~120 MB each) and filled the disk.
- **Cleanup:** every bundle copies `public/` (~150 MB) into `$TMPDIR`. Note `ls -d $TMPDIR/remotion-webpack-bundle-*` before the render and delete only the new ones after it; also test MP4s and still folders. `stills.mjs` removes its own bundle.
- Iterate with stills: `tools/boat/still.sh $ID <frame> <out.png>` (remote, about 3 s); locally only while Boat is down (`npx remotion bundle src/index.ts --out-dir=/tmp/xbundle` once, then `npx remotion still /tmp/xbundle $ID f.png --frame=N --gl=angle`). Render a shot or `--frames=a-b` range only when motion must be judged.
- **Stills before render.** Before any full render, send the operator contact sheets of settled stills per scene group (Slack DM), and render only on their word (operator, 2026-11-15: "is it not possible for me to see before rendering? it takes time then i give feedback"). If they ask to scrub it live, start Remotion Studio (`cd video && bunx remotion studio src/index.ts --port 3123 --no-open`), tell builders to leave it alone, and stop it before the render (operator: "render it. and close the studio"). On ep03 this made one render one round.
- **Build the pilot first** (`storyboard` §1.6): act 1 at finished quality, then stop until the operator has watched it. With no operator in the session, render act 1 (`--frames=a-b`), note its path in `episodes/<ep>/HANDOFF.md` and stop there.
- **Fix rounds:** show each fix as stills or a short before/after clip; render the full episode once per round, after the fixes are accepted.
- **One heavy process at a time** on this machine (a render, frame extraction, a Codex review). Builders take stills on the remote sandbox (`tools/boat/still.sh`, about 3 s); the lead (whoever owns the episode; a single agent is its own lead) does the one full render on the laptop (Boat full renders failed three times on dropped SSH). Never start a second render to rerun a first: check the remote for a running one (`BOAT_KILL_STALE=1` clears it). Every builder brief carries these rules plus: no local stills while Boat is up, one `tsc` at the end, and never end a turn with a render, review or extraction still running (operator, 2026-11-12: "stop tasks. they are causing my laptop to lag"; 2026-11-15: "why are you having 5 shells and 1 monitor?"). A background shell stops at 10 minutes: a render plus mastering fits; anything longer runs under `nohup` with one watcher.

## 2. Timing
Voice is the clock: beat = VO seconds + pause (defaults 0.45 s beat, 0.7 s scene, 1.2 s act, 0.6 s lead-in, 2.5 s episode tail; `build-episode.ts`; a beat's `pause` and the storyboard's `pauseScene` / `pauseAct` replace them). Never stretch audio. Animate on beat frames (`tools/beat-frames.py`); a component with more elements than beats must pace the rest after the last beat, or it stalls.
- **Key actions to real word times.** Before building, run `tools/tts/transcribe.py <id>.wav --words voice/words/<id>.json` per line and `tools/tts/align-words.py episodes/<ep>`, then place actions and effects with `sceneWords(...).at(i, word)` and `sfxWord`, never at guessed times; ep02's guessed times cost a whole integration pass.
- **After a timing fix, re-measure the holds on both sides of it.** Ending one action earlier made ep02's next hold exactly 8 s.
- **A fix for a long hold is never a crop.** Keep the whole object in frame and give each beat a small settle (ep02's board: zoom steps of 0.02, the card lift carrying the emphasis).

## 3. Rules in any direction
- A tool shown working (a key, a stamp, a feed) reaches its target on screen.
- A copy grows in beside its original (scale from 0), never inside it; a translucent copy hid the cards in it.
- Lottie draws the first layer on top.
- `@react-three/postprocessing` renders blank under Remotion; the R3F camera prop applies once (use a per-frame rig).
- Seed all randomness (jitter, roughened edges, particle positions) by index or frame; Remotion renders frames out of order across workers.
- A component with its own clock (Lottie, a step rate) still starts each action on a beat frame.
- Shared props, colours and values live in one shared folder and `data.ts` from the start (ep02: `video/src/paper/scenes/ep02/shared/`, `data.ts`); a builder who needs a new one adds it there. Ep02's segments drew their own phones and the wire came out black in one scene, grey in two.

## 4. Text and layout
Text, numbers, hashes and code render from data; images only for authentic evidence (source screenshots, footage) and, where the direction allows, textures and plates with blank surfaces. Sizes, safe areas and contrast: `storyboard` §4; faces and where words may sit: the direction's §7. Arrows end at a container's edge, outside it, above the art. A data value (hash, ciphertext) is computed by the recorded command in `factsheet.md` and must match across every shot, including literals in `video/src/segments/**`.

Every third-party asset (model, texture, footage, Lottie source, sound effect, music) gets an entry in `video/public/assets/credits.json` when it is added: title, author, URL, licence, what was changed. Ep02's package gate blocked on `tick.wav` and `hit.wav`, unrecorded since ep01. The file stays local (operator rule); `package-review` copies the used entries into its committed report.

## 5. Sound
From the GrowthX studio's rules (`research/study-youtube-video-creation.md` §3, items 7–8); `video-qa` §1 checks the countable ones.
- One sound family per film, and the sound matches the move it marks (a tick for a count, a hit for a reveal); how many effects: `storyboard` §2.
- Effects sit at least 6 dB over the music, or they are not heard; with four or more kinds of effect, no single one is more than a quarter of all effects (with fewer kinds the rule cannot hold: ep03's hit-and-tick palette was waived twice, QA r2–r3).
- Music drops out at the story's turns (the reveal, an act start) and comes back on the line that relaunches it.
- Never digital silence: a breath rest silences the voice, not the mix; a quiet bed or room tone stays under it. Generate the bed to the built episode length plus 1 s, again after any re-time, and let it fade to the last frame: ep03 v3's 363.24 s bed under a 363.53 s cut left 0.54 s of silence at the end (QA r3 S9).
- Dips are 50 % of the bed, not 30 %: 30 % of a 0.10 bed measured about −58 dBFS, silent on a phone (ep03 QA r1).

## 6. Lead review (before any full render)
The lead runs this on every builder's scenes, and a single agent on its own. Pull stills (remote `tools/boat/still.sh`, else local `npx remotion still`) at every beat's last frame, and at each action's frame plus 0.5 s before and after it. Look at each full size and again at 360 px wide. Reject on sight (each was rejected on ep01 or ep02; `LEARNINGS.md` operator feedback and ep02 build sections, `episodes/ep02-otp-2fa/reviews/video-qa-r1.md`):
- a marker in any colour but brick red, or amber on anything but the password;
- a clipping or phone cropped by the camera to enlarge text; any prop not whole with table around it;
- text overlapping another value (a used value must leave first);
- a detached part that reads as a separate object; a split seam across a settled value;
- a lopsided frame, the subject pushed to one side and the rest empty (ep02's keypad at 5:59, the empty black table in S02);
- a still held with nothing to read or watch, or a cue whose change does not read at 360 px (`storyboard` §5);
- a prop whose state disagrees with the line being spoken (`storyboard` §1.4).
A piece cut by the frame edge that is still moving 0.5 s later is mid-transition, not a crop (`video-qa` NEVER).

## 7. Splitting the build
With sub-agents, give each builder whole scenes and no other builder's files, plus one shared contract: `data.ts` and the shared props folder (§3), the aligned word times (§2) and the direction file. The contract owner builds every piece two groups will touch (a clipping window, a settings page, a door, the other side's device) before fan-out, or names one group its owner: on ep03 builders wrote private copies of the clipping, settings card and door tag, then again of the door reveals, laptop pages and thief layer, and an integration round had to fold them both times. Builders add to the shared folder rather than drawing their own copy, take stills only (never a full render), and hand back for §6. A builder's brief names each skill and direction file it must follow and requires every step, however late in the session or after a context compaction. A single agent with no sub-agents builds scene by scene under the same contract.

## NEVER
- Never ship a frame you have not looked at full size: contact sheets hid 9–10 px text offsets and cropped props.
- Never put a 1024-wide canvas texture on small, per-frame-changing parts (counter digits); it creates multi-MB textures every frame.
- Never run two renders at once on this 16 GB machine, or commit `credits.json`, node_modules symlinks or renders; stage explicit paths.
