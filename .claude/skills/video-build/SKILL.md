---
name: video-build
description: Build and render an explainer episode in Remotion — assemble storyboard.json with the narration manifest, add or change visuals (2D components, three.js scenes with scanned models and surfaces, edited Lottie, documents, footage), check stills, render the MP4 and normalise loudness. Use when adding or fixing a visual or 3D prop, assembling or re-timing an episode, rendering shots or the full episode, or when a render fails or looks wrong.
---

# Video build (Remotion)

Code: `video/` (Remotion 4, `@remotion/three` + R3F + drei). Visuals register in `video/src/registry.ts`; every new visual gets a gallery entry (`video/src/gallery.json`) so it can be checked alone.

## 1. Pipeline (in order)
```
EP=$PWD/episodes/<ep>; ID=<id>; RAW=$EP/out/$ID-raw.mp4; FINAL=$EP/out/<ep>.mp4
df -h .                                   # renders need several GB of temp space
bun tools/build-episode.ts $EP $ID        # → video/src/episodes/$ID.json (auto-registered in episodes/index.ts),
                                          #   video/public/$ID/narration.wav, $EP/out/captions.srt, chapters.txt
(cd video && bunx tsc --noEmit)           # from video/; at the repo root tsc prints help
(cd video && node stills.mjs $ID /tmp/stills-$ID)   # one frame at 70 % of each shot; review at phone size
tools/render.sh $ID $RAW --codec=h264 --crf=20      # serialised across worktrees; adds --gl=angle, --log=error
ffprobe -v error -show_entries format=duration -of csv=p=0 $RAW   # must exist and match the built duration
```
Loudness, two passes (the raw mix lands near −22 LUFS):
```
ffmpeg -i $RAW -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | tail -12
ffmpeg -i $RAW -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true -c:a aac -b:a 192k $FINAL
```
Hand `$FINAL` to `video-qa`.

- **render.sh fails or exits without output** (it once died silently six minutes in): hold the same lock and render directly:
  `zsh -c 'until mkdir /tmp/explainer-render.lock 2>/dev/null; do sleep 3; done; trap "rmdir /tmp/explainer-render.lock" EXIT; cd video && npx remotion render src/index.ts '$ID' '$RAW' --gl=angle --codec=h264 --crf=20 --concurrency=4 --log=error'` (exit status is Remotion's)
- render.sh already passes `--log`; a second `--log` is rejected. Output paths must be absolute (it resolves them after `cd video`).
- **`--gl=angle` always.** Default headless Chrome picked SwiftShader (~640 % CPU) and some 3D rendered wrong.
- **Narration is pre-mixed.** Remotion's mixer writes a full-length WAV per group of overlapping clips (~120 MB each) and filled the disk.
- **Cleanup:** every bundle copies `public/` (~150 MB) into `$TMPDIR`. Note `ls -d $TMPDIR/remotion-webpack-bundle-*` before the render and delete only the new ones after it; also test MP4s and still folders. `stills.mjs` removes its own bundle.
- Iterate with stills (`npx remotion bundle src/index.ts --out-dir=/tmp/xbundle` once, then `npx remotion still /tmp/xbundle $ID f.png --frame=N --gl=angle`); render a shot or `--frames=a-b` range only when motion must be judged.

## 2. Timing
Voice is the clock: beat = VO seconds + pause (0.45 s beat, 0.7 s scene, 1.2 s act, 0.6 s lead-in, 2.5 s episode tail; `build-episode.ts`). Never stretch audio. Animate on beat frames (`tools/beat-frames.py`); a component with more elements than beats must pace the rest after the last beat, or it stalls.

## 3. Medium
| Viewer must see… | Build |
|---|---|
| a physical-feeling mechanism | three.js set; one prop = one meaning all episode |
| a user flow | edited stock Lottie (`tools/lottie/*.py` → JSON, `LottieShot`), one illustration family with clear provenance |
| a source's claim or number | `DocShot`: real page screenshot, then highlighted crop |
| real hardware or places | `FootageShot` with licensed footage and a scrim under text |

### 3D look decisions
- **Scanned model when one fits the meaning** (`Scanned`, Poly Haven CC0, `video/public/assets/models/<name>/`): prefer separable nodes (`node` extracts one; `parts` hinges about a pivot in model metres) and no printed text.
- **No scan fits → our geometry with a scanned surface** (`finish.tsx`: `Oak`, `Painted`). `Brushed` is a procedural brushed map and `Glass` a plain physical material; use them for metal and displays. Procedural-only bodies read as "1995 Toy Story".
- **Finish must match meaning:** clean steel for security, wear only when wear is the point; a rusty tool chest as "the lockbox" was rejected. `Brushed` at metalness 1 reads black under softboxes; ~0.55 reads as steel.
- **Copies never interpenetrate:** a duplicate grows in beside its original (scale from 0), not inside it; a translucent copy hides the cards in it.
- **Labels:** text is a canvas texture (`Plate`); a label that would mirror in the floor gets `reflect={false}`, and its Studio needs `unreflectedLabels`. A key or tool shown working must reach its target.
- Softbox Lightformers, not HDRI (it turned copper black). `@react-three/postprocessing` renders blank under Remotion; the R3F camera prop applies once (use a per-frame rig); seed all randomness by index or frame.

## 4. Text and layout
Text, numbers, hashes and code render from data; images only for authentic evidence (source screenshots, footage). Sizes and safe areas: `storyboard` §4. Lottie flows: Inter, 26 px values, 20–28 px labels; Lottie draws the first layer on top. Arrows end at a container's edge, outside it, above the art. A caption floating over a 3D set or footage sits on a plate or scrim that gives it ≥ 4.5:1 contrast, in the flows' sans at weight ≥ 500 (see `storyboard` §4); coloured thin serif over a lit backdrop disappears at phone size. A data value (hash, ciphertext) is computed by the recorded command in `factsheet.md` and must match across every shot, including literals in `video/src/segments/**`.

Every third-party asset (model, texture, footage, Lottie source) gets an entry in `video/public/assets/credits.json`: title, author, URL, licence, what was changed. The file stays local (operator rule); `package-review` copies the used entries into its committed report.

## NEVER
- Never ship a frame you have not looked at full size: contact sheets hid 9–10 px text offsets and cropped props.
- Never put a 1024-wide canvas texture on small, per-frame-changing parts (counter digits); it creates multi-MB textures every frame.
- Never run two renders at once on this 16 GB machine, or commit `credits.json`, node_modules symlinks or renders; stage explicit paths.
