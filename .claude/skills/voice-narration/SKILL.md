---
name: voice-narration
description: Generate, check and repair an episode's narration with the local Kokoro TTS (af_heart) — line extraction from the script or storyboard, speed calibration, phonemizer preflight, Whisper transcription checks, human listening, single-line resynthesis and manifest updates. Use when synthesizing narration for an approved script, auditioning a voice or speed, fixing a mispronounced or misheard word, or re-voicing lines after a script change.
---

# Voice narration

Channel voice: Kokoro `af_heart` at speed **0.86** (calibrated range 0.85–0.88). Change voice or range only through an audition recorded in `LEARNINGS.md`. Synthesize only a script that passed `script-review`.

## 1. Lines
`bun tools/storyboard-lines.ts episodes/<ep>` writes `voice/lines.json` (`[{"id": "S01_01", "text": "…"}]`). With no `storyboard.json` it reads `script.md` (one line per narration paragraph, fact tags stripped); once a storyboard exists it reads the beats. Both give the same ids, so the first synthesis can precede the storyboard.

## 2. Preflight new terms (before synthesis)
```
tools/tts/.venv/bin/python -c "
from kokoro_onnx import Kokoro; import sys
k = Kokoro('tools/tts-models/kokoro-v1.0.onnx', 'tools/tts-models/voices-v1.0.bin')
for t in sys.argv[1:]: print(t, '->', k.tokenizer.phonemize(t, 'en-us'))" "SHA two fifty-six" "N I S T"
```
Read the phonemes: a spaced capital `A` becomes /ɐ/ ("uh") and fuses with the next word; a fused initialism (`SHA` → /ˌɛsˌeɪtʃˈeɪ/) is spelled letter by letter. Fix the script, not a lexicon.

## 3. Synthesize
```
tools/tts/.venv/bin/python tools/tts/synth.py episodes/<ep>/voice/lines.json episodes/<ep>/voice/lines --voice af_heart --speed 0.86
```
Writes `<id>.wav` and `manifest.json` (seconds, wpm per line). `--lexicon` stays unused: `voice/written.json` (spoken → written, e.g. `"SHA two fifty-six": "SHA-256"`) is applied to captions by `build-episode.ts`, never to audio.

## 4. Calibrate pace on per-line output
A paragraph audition at speed 1.0 measured 155 wpm, but sentence-by-sentence synthesis at 1.0 ran 182. `build-episode.ts` adds pauses (0.45 s beat, 0.7 s scene, 1.2 s act, 0.6 s lead-in). Target: median line 155–165 wpm in the manifest (ep01: 160 at 0.85–0.88), about 150 wpm overall with pauses. Median above 170 → lower speed by 0.02; below 150 → raise it. Lines under ~6 words swing from 120 to 230 wpm by length alone; listen to those instead of re-speeding.

## 5. Check
1. Transcribe: `tools/tts/.venv/bin/python tools/tts/transcribe.py <wav>`. Normalize before diffing: Whisper writes numbers as digits or money ("$50 billion") and turns a broken "S H A one" back into "SHA-1", so a clean transcript does not prove clean speech.
2. Decide per mismatch:
   | Finding | Action |
   |---|---|
   | number/format difference only | ignore |
   | key term misheard | phonemize it; fix the script spelling; resynthesize |
   | same word fails after two spellings | reword the sentence ("a salt" → "That string is the salt") |
   | transcript clean but term is a known hazard (lone A, letter runs, article + noun) | listen to it |
3. **Human listen** before the build: every line with a hazard term and the first line of each act. Whisper is a screen, not the judge.
4. Edges: each file starts and ends within 0.3 s of speech.

## 6. Re-voice after a script change (canonical order; script-writing and storyboard route here)
`script.md` is the only source of wording. Edit it, then follow the branch for where the episode is:
| Episode state | Get the new wording into the beats and `voice/lines.json` |
|---|---|
| no storyboard yet | `bun tools/storyboard-lines.ts episodes/<ep>` |
| single `storyboard.json` | `python3 tools/sync-storyboard-vo.py episodes/<ep>` → `bun tools/storyboard-lines.ts episodes/<ep>` |
| segments | `bun tools/storyboard-lines.ts episodes/<ep> --from-script` → copy each changed `text` into the matching beat `vo` in `segments/<X>.json` → `python3 tools/merge-segments.py episodes/<ep>` (fails unless segments equal the new lines, verbatim) |
Then for each changed id only:
1. `D=$(mktemp -d)`; put the line in `$D/one.json`, synthesize into `$D/out/`, copy the wav over the old one, replace that id's entry in `voice/lines/manifest.json`.
2. Check §5 on the new wav, then that every manifest `text` equals `voice/lines.json` (`build-episode.ts` does not compare them; stale audio would ship under new captions):
   `python3 -c "import json,sys;e=sys.argv[1];m={x['id']:x['text'] for x in json.load(open(e+'/voice/lines/manifest.json'))};b=[l['id'] for l in json.load(open(e+'/voice/lines.json')) if m.get(l['id'])!=l['text']];print(b or 'OK');sys.exit(bool(b))" episodes/<ep>` (exits 1 on any mismatch)
3. If a storyboard exists: `bun tools/build-episode.ts episodes/<ep> <id>` re-times beats, narration, captions and chapters. Before the storyboard, stop here; the build comes in `storyboard` §1.5.

Adding or removing a paragraph (not just rewording) changes beat ids: `sync-storyboard-vo.py` and `merge-segments.py` refuse it on purpose. Add or remove the beat in the storyboard or segment by hand, renumber that scene's ids to match `storyboard-lines.ts --from-script`, then rerun the branch.
Never resynthesize the whole episode for one line.

## NEVER
- Never use a lexicon to hide a written form; the script, review and audio must say the same words.
- Never accept a voice or speed from a paragraph audition alone; calibrate on per-line output.
- Never judge loudness here: the final mix is normalised to −16 LUFS in `video-build`.
