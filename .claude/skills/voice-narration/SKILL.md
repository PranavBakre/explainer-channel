---
name: voice-narration
description: Voice an episode's narration with ElevenLabs (the channel voice) - line extraction from the script or storyboard, a read sheet for emphasis, pauses and pace, each line voiced with its neighbours as context, 2-3 takes per line picked by ear, every line levelled to -18 LUFS, transcript checks, single-line re-voicing and manifest updates. Kokoro stays as a draft and offline fallback. Use when voicing an approved script, auditioning or changing the narrator, running the Kokoro vs ElevenLabs blind test, fixing a misread or flat line, or re-voicing lines after a script change.
---

# Voice narration

Model: claude-opus-5-5 (rewrite of 2026-11-24, from `docs/reviews/2026-11-24-video-quality-review.md` §1).

The voice is heard in every second of the film; it decides whether the channel sounds made or generated. Channel voice: **ElevenLabs**, model `eleven_multilingual_v2`, one fixed narrator for the season:

| Season setting | Value |
|---|---|
| Narrator voice id | **TBD by operator** (picked by ear, recorded here and in `LEARNINGS.md`; exported as `ELEVENLABS_VOICE_ID`) |
| Model | `eleven_multilingual_v2` |
| Stability / similarity / style | 0.5 / 0.75 / 0 until the operator's audition sets them; then fixed for the season |
| Line level | −18 LUFS integrated, every take |

Change the voice or its settings only through an audition the operator hears, recorded in `LEARNINGS.md`. Synthesize only a script that passed `script-review`. The key and the voice id come from the environment (`ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`); never write either into a file in this repo.

## 0. Blind test before switching episodes over (once)
Before the first episode moves from Kokoro to ElevenLabs, take 60 s of one episode (its opening), voice it both ways, and build both cuts with the same picture and mix. Label them A and B at random. Play them to three to five people **on a phone speaker**, one at a time, and ask which one they would keep watching and why. Not Whisper, not a model: people. Record the answers, the voice id and the settings in `LEARNINGS.md`; the operator decides from them.

## 1. Lines
`bun tools/storyboard-lines.ts episodes/<ep>` writes `voice/lines.json` (`[{"id": "S01_01", "text": "…"}]`). With no `storyboard.json` it reads `script.md` (one line per narration paragraph, fact tags stripped); once a storyboard exists it reads the beats. Both give the same ids, so the voice can precede the storyboard. A line may carry `"spoken"` when the voice must be sent a different case of the same words (`"pin"` for PIN); the words never differ.

## 2. Read sheet: direct the voice before voicing it
Write `voice/read-sheet.md` (model name on top) before the first take. One row per line, short:

| id | operative word | feeling | pace | note |
|---|---|---|---|---|
| S01_02 | **checking** | curious, a real question | steady | lift at the end |
| S04_03 | **twelve years** | quiet surprise | slow | land it, then stop |

- **Operative word:** the one word carrying the new information. Every line has one. A take where it lands flat is a wrong take, however clean.
- **Feeling:** in plain words a reader could act on ("dry, a little amused", "level, this is the mechanism"), never "engaging".
- **Pace for meaning:** quick through setup and things the viewer already knows; slow on the mechanism, the number and the payoff. Pace comes from how the line is written and which take is kept, never from a speed setting.
- **Pauses:** a pause between lines is a build pause (`video-build` §2, the beat's `pause` in the storyboard), so it can be timed to the picture. A pause inside a line is punctuation: a comma for a breath, a full stop for a beat, a line split for anything longer. A dash or ellipsis in the script changes the read; use them only where the sheet asks for it.
- **Emphasis:** shape the sentence so the operative word falls at the end or after a short setup ("Not one week. Twelve years."). Capitals, italics and stage directions in the text are read aloud or ignored; do not write them.
- Mark the hazard words (§4) and the first line of each act; those get the closest listen.

## 3. Voice
```
export ELEVENLABS_API_KEY=… ELEVENLABS_VOICE_ID=…        # from the operator's vault, never echoed into files or logs
python3 tools/tts/synth_elevenlabs.py episodes/<ep>/voice/lines.json episodes/<ep>/voice/lines --takes 3
```
- Each line is sent with the line before and after it as context (`previous_text`, `next_text`), so intonation runs across lines instead of resetting at every one. Re-voicing one line keeps its neighbours as context.
- Each take lands in `voice/lines/takes/<id>.t<n>.wav`, trimmed at the edges and levelled to −18 LUFS. `voice/lines/<id>.wav` is the picked take (take 1 until picked) and `manifest.json` keeps the fields the build reads (`id`, `text`, `spoken`, `file`, `seconds`, `wpm`) plus `take` and `takes`.
- Existing takes are kept on a rerun (they cost credits); `--force` re-voices them.
- Two takes are enough for plain connecting lines; three for the hook, the first line of each act, every payoff and every hazard line.
- `--dictionary <id>:<version>` (up to 3) adds an ElevenLabs pronunciation dictionary for how a word is said: a name, a brand, an acronym said as a word. It may only change pronunciation, never the words: script, captions and audio say the same thing (the hidden lexicon stays withdrawn, `LEARNINGS.md`).

## 4. Pick takes by ear (a person, not a model)
The operator picks. Send them the takes per act as one page or folder they can play on a phone, with the read sheet beside it.
1. Pick per line: the operative word lands, the feeling matches the sheet, it sounds like it continues the line before, no odd breath, click, swallowed ending or accent drift.
2. Record the picks: `python3 tools/tts/synth_elevenlabs.py <lines.json> <voice/lines> --pick S01_02=2 S04_03=3` (no API call; rewrites `<id>.wav` and the manifest).
3. Listen to each act stitched in order. A line can be right alone and jump in energy next to its neighbours; re-voice that one line (§6) rather than re-picking the act.
4. No take is right after three: change the line's wording or its neighbour's, not the settings (§5 table).

## 5. Check
1. Transcribe every picked line: `tools/tts/.venv/bin/python tools/tts/transcribe.py <wav>`. ElevenLabs can skip, repeat or add a word, which Kokoro never did, so a word difference is a real finding. Normalize first: Whisper writes numbers as digits or money ("$50 billion") and re-spells broken acronyms ("SHA-1"), so a clean transcript does not prove clean speech.
2. Decide per mismatch:
   | Finding | Action |
   |---|---|
   | number or format difference only | ignore |
   | word skipped, repeated or added | pick another take; if all fail, re-voice that line |
   | key term misheard | listen; add it to the pronunciation dictionary, or reword the script (`script-writing` §3) |
   | same word fails after a dictionary entry and two takes | reword the sentence ("a salt" → "That string is the salt") |
   | heteronym or acronym said as a word (live, lives, read, close, lead, record; PIN) | listen even when the transcript is clean: Whisper writes both back correctly |
3. **Human listen** before the build: every hazard line, every line with Indian units, names or non-English words, and the first line of each act. Whisper wrote "forty lakh" as "40 lock" in every ep02 round; only an ear settles it.
4. Edges: each picked file starts and ends within 0.3 s of speech (the tool trims; check after a manual edit).
5. Pace: compare the median line wpm with the last shipped episode's manifest right after the first pass. Off by more than about 15 wpm is a script or direction finding for the operator, not a setting to nudge; the film is re-timed to the voice (`build-episode.ts` sets every beat from the line's seconds), never the voice to the film.

## 6. Re-voice after a script change (canonical order; script-writing and storyboard route here)
`script.md` is the only source of wording. Edit it, then follow the branch for where the episode is:
| Episode state | Get the new wording into the beats and `voice/lines.json` |
|---|---|
| no storyboard yet | `bun tools/storyboard-lines.ts episodes/<ep>` |
| single `storyboard.json` | `python3 tools/sync-storyboard-vo.py episodes/<ep>` → `bun tools/storyboard-lines.ts episodes/<ep>` |
| segments | `bun tools/storyboard-lines.ts episodes/<ep> --from-script` → copy each changed `text` into the matching beat `vo` in `segments/<X>.json` → `python3 tools/merge-segments.py episodes/<ep>` (fails unless segments equal the new lines, verbatim) |
Then for the changed ids only:
1. `python3 tools/tts/synth_elevenlabs.py episodes/<ep>/voice/lines.json episodes/<ep>/voice/lines --only <ids…> --force`, pick by ear (§4), check (§5). The rest of the manifest is untouched. A changed line can change how its neighbours should sound; listen to the line before and after it in place.
2. Check that every manifest `text` equals `voice/lines.json` (`build-episode.ts` does not compare them; stale audio would ship under new captions):
   `python3 -c "import json,sys;e=sys.argv[1];m={x['id']:x['text'] for x in json.load(open(e+'/voice/lines/manifest.json'))};b=[l['id'] for l in json.load(open(e+'/voice/lines.json')) if m.get(l['id'])!=l['text']];print(b or 'OK');sys.exit(bool(b))" episodes/<ep>` (exits 1 on any mismatch)
3. If a storyboard exists: `bun tools/build-episode.ts episodes/<ep> <id>` re-times beats, narration, captions and chapters; then re-run the word alignment (`video-build` §2) and the sound plan's cue times (`sound-design`). Before the storyboard, stop here.

Adding or removing a paragraph changes beat ids: `sync-storyboard-vo.py` and `merge-segments.py` refuse it on purpose. Add or remove the beat by hand, renumber that scene's ids to match `storyboard-lines.ts --from-script`, then rerun the branch. Never re-voice the whole episode for one line.

## 7. Kokoro fallback (drafts and offline only)
Kokoro `af_heart` is for a draft voice (timing a storyboard before the takes are picked), offline work, or no credits. A Kokoro voice never ships without the operator's yes.
```
tools/tts/.venv/bin/python tools/tts/synth.py episodes/<ep>/voice/lines.json episodes/<ep>/voice/lines --voice af_heart --speed 0.81
```
Same layout and manifest fields (no takes). Speed 0.81 matched ep02's pace; leave it there. Known Kokoro misreads, if a draft must be clean: a spaced capital "A" becomes "uh" and fuses with the next word (write "SHA one", not "S H A one"); fused initialisms are spelled letter by letter; check new terms with its phonemizer (`k.tokenizer.phonemize(t, 'en-us')`) before synthesis. Kokoro is deterministic, so a retry must change the input (case, punctuation, then wording), never the speed. Replace a Kokoro draft with ElevenLabs takes before the pilot (`storyboard` §1.6) and re-run the build.

## NEVER
- Never tune the voice's speed to fit the picture; re-time the picture to the voice.
- Never let a model pick the takes or judge the voice; a person listens.
- Never use a dictionary or lexicon to change the words; the script, review, captions and audio say the same words.
- Never change the narrator mid-season without an operator audition recorded in `LEARNINGS.md`.
- Never mix or master here: lines are levelled to −18 LUFS, and the final mix and its loudness live in `sound-design`.
