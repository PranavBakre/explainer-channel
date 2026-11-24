---
name: video-qa
description: Gate a rendered explainer MP4 (whole episode) or a single new or edited shot — automated checks (format, loudness, black, grain-resistant freeze, silence, transcript), a runtime-wide contact sheet, cross-shot data consistency, pixel alignment of text in containers and a second-model visual review, with a dispositioned report. Use after every full render, after a shot is built or edited, and before calling an episode done or packaging it.
---

# Video QA (gate)

Output: `episodes/<ep>/reviews/video-qa-<round>.md`: each check PASS/FAIL with evidence, each finding with a disposition (fixed / accepted with reason / rejected with reason), and a verdict.

## 1. Automated (whole episode)
```
V=episodes/<ep>/out/<ep>.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json $V
ffmpeg -i $V -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary
ffmpeg -i $V -vf blackdetect=d=0.5:pix_th=0.05 -an -f null - 2>&1 | grep black_start
ffmpeg -i $V -vf "scale=320:-1,gblur=sigma=2,freezedetect=n=0.002:d=2" -an -f null - 2>&1 | grep -E 'freeze_(start|duration|end)'
ffmpeg -i $V -af silencedetect=n=-40dB:d=2 -f null - 2>&1 | grep silence_start
tools/tts/.venv/bin/python tools/tts/transcribe.py $V > /tmp/transcript.txt
shasum -a 256 $V      # record all 64 characters in the report; any re-render invalidates it
```
Plain `freezedetect` reported 0 freezes under animated grain while a reviewer saw long holds; the blur pass found 20. Detect at 2 s, then classify: > 8 s FAIL, 2–8 s listed and judged against the beat's visual change. The blur also hides small real changes: on ep03 it reported 11.3 s at 1:23.9 across a real press, and 8.03 s across v4's thin focus ring. Confirm every blurred hold over 8 s with an unblurred per-frame difference scan (small greyscale frames) or frames either side before calling it. Also check, from the built cue list and `voice/words`: each cue's motion onset within ±0.25 s of its word (ep03 r3: 95 of 104; the no-op cues were both blockers), and zero moving frames in every breath rest and scene tail.
| Check | Pass |
|---|---|
| Duration | inside the brief's target |
| Format | h264, 1920×1080, 30 fps, AAC |
| Loudness | −16 ± 1 LUFS integrated, true peak ≤ −1 dBTP |
| Black / silence | none unintended, at `pix_th=0.05` as above (ffmpeg's default 0.10 also flags the 0.6 s lead-in, `video-build` §2, which is intended); silence < −40 dB only at act tails and rests, never inside speech |
| Freeze | no hold > 8 s; holds of 2–8 s listed with timestamps and judged |
| Transcript | every script sentence present in order (normalize numbers; Whisper writes "$50 billion"); flag unusual words for `voice-narration` §5's human listen, never pass them on the transcript |
| Sound (`video-build` §5) | effect share as `video-build` §5 says (count the built `sfx` lists); no digital silence (`silencedetect=n=-90dB:d=0.3` finds nothing, the last half second included); no speech audible in the music or effect files (`transcribe.py` on each, gain raised until audible; a recognised word is a listen item, a FAIL only if a person hears speech: Whisper wrote "You" on `hit.wav` and one sentence looped 12 times on `pad.wav`, ep03 r2–r3) |
| Shot list | after any re-cut, every shot with its length (`ffmpeg -vf "select='gt(scene,0.3)',showinfo"`); a shot under about 0.5 s is a ghost frame until judged |

Report, not gate: cuts a minute (scene score over 0.3) and big picture changes a minute (over 8 % of the frame in a half-second step; method in `research/reference-Jktv8v8ICpk.md` §8), beside the faceless reference, an incident story and so a comparison rather than a target for other formats (0.1 and about 4), and ep02 (4.7 and 12).

## 2. Contact sheet across the whole runtime
```
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $V)
N=$(python3 -c "import math;print(math.ceil($D/6))")
ffmpeg -v error -i $V -vf "fps=1/6,scale=320:-1,tile=10x$(( (N+9)/10 ))" -frames:v 1 /tmp/sheet.png
```
Look for: one focal point per frame, legibility at 360 px wide, props consistent with their meaning and colour all episode and with the brief's art direction (its anchors §2, colour over time §3, what failed §9), nothing in the bottom 15 %, and medium runs: three or more neighbouring tiles of the same document (even with a different highlight) is a FAIL against the storyboard's 12 s limit.

**Floating captions.** List every caption that is not printed on a prop, with its timestamp; one in a direction whose §7 forbids them is a FAIL. For each, `ffmpeg -ss <t> -i $V -frames:v 1 -vf scale=360:-1 /tmp/cap-<t>.png`, read it at that size, and sample ink and background for contrast ≥ 4.5:1. Ep01 passed the size rule and shipped four captions nobody could read on a phone (pale thin serif on a pale set, red on brown and teal).

**The operator's notes on the previous cut**, one row each with PASS/FAIL and evidence (timestamps, frames, word durations), before any other finding; ep03 r3 checked the v2 notes this way (PIN, standalone, doors, no tables or cards, whole objects, still rests, colours).

## 3. Cross-shot data consistency
List every on-screen value that recurs (hashes, ciphertexts, counts, names, the running example) with its shots and the one file that owns it (`data.ts`). Each must match its fact or recorded computation exactly. Ep01's recap showed a ciphertext from an older key while the lockbox shot showed the current one; neither a contact sheet nor a reviewer caught it until the values were listed side by side.

## 4. Second-model visual review
Pick key frames from the built timing (`video/src/episodes/<id>.json`): each shot's first full reveal and its 70 % frame, plus every act boundary. Two independent passes by a model family other than the one that built the video, never shown your own verdict. Claude built it → the Codex commands below (Codex down → `opencode run` with a Cerebras or NVIDIA vision model, or the gate stays closed). Another family built it (DeepSeek, …) → the Codex commands first, Claude second; never GLM-5.3, the DeepSeek script route, which cannot read images (`research/reviewer-calibration-2026-11-15.md`). Codex built it → the same prompts through Claude, which reads the frame files itself:
`claude -p "Read each of these frames: <abs paths>. <same prompt>. Print the complete review, every frame number with defects or clean." --model claude-opus-5-5 --allowedTools Read < /dev/null > <same report path>` (prompt before `--allowedTools`, which is variadic and swallows it otherwise)
Neither family available → §4 is incomplete and the gate stays closed.
**Calibrate before trusting** a new or changed reviewer prompt (here or in `script-review` §3a): run it once on a known-good input, which must pass, and an unrelated one, which must fail; record both in the report. The GrowthX studio's judges passed their original and failed an unrelated reel (`research/study-youtube-video-creation.md` §3).
- **Spatial polish:** `tools/review/second-look.sh $V <frames…> > episodes/<ep>/reviews/second-look-<round>.md` (clipping, centring, labels, arrows; several minutes, run in the background). The helper exits nonzero if Codex fails or any frame number is missing from the review; then rerun it, never disposition a partial file.
- **Explanation and pacing:** write the frames to a folder and run
  `codex exec --skip-git-repo-check -s workspace-write -C <repo> "Review these frames of episodes/<ep> against brief.md, storyboard.md and .claude/skills/art-direction/references/directions/<the direction brief.md names>.md: does each frame show the mechanism its narration describes, keep each prop's meaning and colour, and change every beat? Write findings with frame numbers to episodes/<ep>/reviews/video-visual-<round>.md; print DONE." --image <abs paths, comma-separated> < /dev/null`
- **Cold viewer** (whole episode; the other two passes know the plan and so never ask "would I keep watching"). The reviewer gets only phone-width contact sheets and the captions: no script, brief or fact sheet.
  ```
  D=$(mktemp -d /tmp/cold.XXXX); cp episodes/<ep>/out/captions.srt $D/
  ffmpeg -v error -i $V -vf "fps=1/7,scale=360:-1,tile=6x4" $D/sheet_%02d.jpg
  codex exec --skip-git-repo-check -s workspace-write -C $D "You are a YouTube viewer who watches explainers to learn and to be entertained. You know nothing about how this video was made. Attached are contact sheets of it (one frame every 7 seconds, left to right, top to bottom, each frame at phone width); its captions are in captions.srt in this folder. Write viewer.md with: (1) would you finish it, and would you subscribe; (2) the three timestamps where you would click away, and why; (3) on-screen text you needed in order to follow the point and could not read, with timestamps; (4) questions the video raised and never answered; (5) what you would tell a friend it said, in two sentences. No praise and no production advice. Print only DONE." --image $(ls $D/sheet_*.jpg | paste -sd, -) < /dev/null
  cp $D/viewer.md episodes/<ep>/reviews/viewer-<round>.md
  ```
  The cold reviewer is more technical than the brief's Viewer: answer its unanswered questions only where that Viewer would ask them. On the ep01 redo its "how much of the gap is the hardware" led to a same-core benchmark beat the operator cut as moot for the audience.
  About two minutes. Disposition every click-away and every unanswered question: a click-away that two rounds repeat goes back to `script-writing` or `storyboard`, not into "accepted". On ep01 it found a drop-off the author's own viewing missed (5:45, a second round of benchmark arithmetic).
Wait for all three files; a missing or truncated review is a FAIL of §4, not an absence of findings.

## 5. Per-shot alignment loop (each new or edited shot)
1. Render the shot alone (gallery item with its real `duration`) to `out/<shot>.mp4`. Under the one-render-per-round rule, use the episode render instead: `align.py` reads any MP4, so give it the shot's absolute frame numbers (ep03 r2–r3 waived §5 for want of shot renders; that waiver is no longer needed).
2. Write `tools/review/checks/<shot>.json`: one entry per text-in-a-container at a frame where it is fully shown: `region`, container colour `box`, text colour `ink` (sample the rendered ink; lighting shifts plate colours), `align: left` for left-set text, `inset` ≥ border width.
3. `tools/tts/.venv/bin/python -I tools/review/align.py out/<shot>.mp4 tools/review/checks/<shot>.json --crops /tmp/rev`. It fails if the text centre is > 8 % off or within 3 px of an edge. Open every crop: equal padding on all sides means the border was measured, so raise `inset`. Check every text state (typed vs masked), not only the first.
4. Second look on the shot's start, each motion beat and end frame.
5. Fix in the generator, re-render, rerun from 3. Done when no measured FAIL and every second-model finding is fixed or rejected with a written reason.

A shot pass covers only §5 and §2's caption check for that shot; it never stands in for the episode gate.

## Verdict
PASS only when §1 passes; §2 has no FAIL (holds, medium runs, captions at 360 px); §4's reviews are complete and each finding is fixed or rejected with a reason; §5 passed for every shot changed since the last episode PASS, §3 has no mismatch, and every finding has a disposition. Any fix → re-render → new checksum → a scoped round: every check touching the changed spans or a shared component they use, plus one whole-file audio and black pass. Give the reviewer the changed spans and the accepted deviations so it does not re-raise them (ep02's scoped round 3 took 10 minutes). Find the changed spans with a per-frame difference between the old and new cut rather than from the builder's notes; ep03 r4 found every span that way and judged against the script and contract. Fix should-fix findings in the same round as the blockers, not only the blockers: ep03 v3 failed r3 on two holds with eleven should-fix items, and v4 closed all of them in one round and passed r4. A re-render voids every earlier QA verdict and checksum, so the package gate waits for the new round.

## NEVER
- Never report a piece as cropped from one sampled frame. Take frames 0.5 s before and after: if it is still moving it is mid-transition, not cropped. On ep01's paper cut two of the three "worst crops" (a machine with its input card showing "mar", a card at the left edge) were pieces sliding in; the operator caught it, and one fix had already changed camera work nobody objected to.
- Never judge holds from a contact sheet alone; it hid 10–23 s static stretches.
- Never review only at 1920 px; design and judge at phone size first.
- Never accept a finding silently; an accepted hold or deviation needs a written reason in the report.
