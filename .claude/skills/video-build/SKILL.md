---
name: video-build
description: Build and render an episode in Remotion from storyboard.json and the narration manifest — component library, timing from voice, transitions, music/SFX mix, and the render command. Use when adding a visual component, assembling an episode, or rendering the final MP4.
---

# Video build (Remotion)

Code: `video/`. Episode data is copied to `video/public/<ep>/` (audio) and `video/src/episodes/<ep>.json` (storyboard merged with manifest).

## Rules
- **Voice is the clock.** Each beat's duration = its VO seconds + a pause (0.25 s within a scene, 0.6 s at a scene end, 1.0 s at an act boundary). Never stretch audio to fit visuals.
- **Components are data-driven**: a beat names a component in `video/src/components` and passes props. All text, numbers, hashes and code render as real text — never an image.
- **Motion language** (house style): enter with `easeOutCubic` over 12–18 frames; exit 8–10 frames; diagrams build piece by piece on the VO word that names the piece; no bounce, no spin.
- **Transitions** implemented in `video/src/transitions.tsx`: `cut`, `fade`, `push`, `wipe`, `zoom`.
- **Safe areas**: nothing important in the bottom 15 %; text ≥ 48 px.
- **Audio**: VO at 0 dB; music bed −22 dB under VO; SFX sparse.

## Commands
```
cd video
bunx tsc --noEmit                       # typecheck
bunx remotion still src/index.ts <ep> out.png --frame=<n>   # spot-check a frame
bunx remotion render src/index.ts <ep> ../episodes/<ep>/out/<ep>.mp4 --codec=h264 --crf=20 --concurrency=4
```
Render a 20 s range (`--frames=0-599`) and check it before the full render.
