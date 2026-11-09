---
name: voice-narration
description: Generate and check the narration audio for an episode with the local Kokoro TTS — voice choice, pronunciation lexicon, pace, per-line files and timing manifest. Use when auditioning voices, synthesizing narration, or fixing a mispronunciation.
---

# Voice narration

Channel voice: Kokoro `af_heart` (grade A in Kokoro's VOICES.md), speed 1.0 ≈ 150–160 wpm. Change only via a new audition recorded in `LEARNINGS.md`.

## Synthesize
```
tools/tts/.venv/bin/python tools/tts/synth.py episodes/<ep>/voice/lines.json episodes/<ep>/voice/lines \
  --voice af_heart --speed 1.0 --lexicon episodes/<ep>/voice/lexicon.json
```
`lines.json` = `[{"id":"S01_01","text":"…"}]`, one sentence group (≤ 2 sentences) per line so timing is fine-grained. Write numbers as spoken words in the text. Manifest gives seconds and wpm per line.

## Lexicon
The script is already written as spoken (see script-writing), so `lexicon.json` is a safety net for stray written forms, normally `{}`. Fix a mispronunciation in the script text, not the lexicon. `voice/written.json` maps spoken → written (`"S H A two fifty-six": "SHA-256"`, `"at the rate": "@"` forms) and is applied only to captions by `build-episode.ts`.

## Check (every run)
1. Transcribe each line with `tools/tts/transcribe.py`; diff against text. Any word error on a key term → lexicon fix → resynth that line.
2. Pace: overall 145–170 wpm; flag lines < 120 or > 185.
3. Silence: each line file starts/ends within 0.3 s of speech; the build adds the pauses.
4. Loudness after mix: −16 LUFS integrated (YouTube normalises to about −14).
