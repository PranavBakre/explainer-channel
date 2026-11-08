---
name: video-qa
description: Evaluate a rendered explainer MP4 with automated checks (duration, loudness, black/frozen frames, transcript vs script) and a visual review of sampled frames against the brief and storyboard. Use after every full render and before calling an episode done.
---

# Video QA (gate)

Output: `episodes/<ep>/reviews/video-qa-<round>.md` with PASS/FAIL per check.

## Automated (run all)
```
V=episodes/<ep>/out/<ep>.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json $V
ffmpeg -i $V -af ebur128=framelog=quiet -f null - 2>&1 | grep -A3 Summary      # integrated ≈ −16 LUFS, true peak < −1 dBTP
ffmpeg -i $V -vf blackdetect=d=0.5:pix_th=0.05 -an -f null - 2>&1 | grep black_start   # none except intended
ffmpeg -i $V -vf freezedetect=n=0.003:d=8 -an -f null - 2>&1 | grep freeze_start       # no freeze > 8 s
ffmpeg -i $V -af silencedetect=n=-40dB:d=2 -f null - 2>&1 | grep silence_start         # no gap > 2 s
tools/tts/.venv/bin/python tools/tts/transcribe.py $V > /tmp/transcript.txt             # compare to script: WER < 5 %
```
| Check | Pass |
|---|---|
| Duration | within brief target (e.g. 9:30–11:00 for "10 min") |
| Format | h264, 1920×1080, 30 fps, AAC |
| Loudness | −17 to −14 LUFS integrated, TP < −1 |
| Black / freeze / silence | none unintended |
| Transcript | every scripted sentence present, in order |

## Visual review
1. Extract one frame every 10 s into a contact sheet: `ffmpeg -i $V -vf "fps=1/10,scale=480:-1,tile=6x6" -frames:v 2 /tmp/sheet_%02d.png`, plus full-size frames at every scene midpoint.
2. Look at each image. Score 1–5 on: legibility at phone size (shrink to 360 px wide), hierarchy (one focal point), consistency with the style bible, text inside safe areas, no overlaps/clipping, diagram correctness vs fact sheet, visual change rate (no static stretch > 10 s).
3. Watch the first 30 s and every transition region frame-by-frame (`--frame` stills) for glitches.
4. Have a second model judge the frames (codex or opencode with image input) without telling it your scores; reconcile.

Any FAIL → fix → re-render → re-run the full checklist.
