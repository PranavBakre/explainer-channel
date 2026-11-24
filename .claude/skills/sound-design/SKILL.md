---
name: sound-design
description: Plan, source, mix and gate an episode's sound - a sound plan written at storyboard time (music per act with a named feeling and a reference track, a sting on the hook, a sound on every visual action), licensed music and effects only, levels on a percent-of-voice scale held stretch by stretch with ramps, the final mix at -14 LUFS / -1 dBTP, words checked for clarity, and a sound gate that passes before anyone hears a mix. Use when storyboarding an episode, picking or changing music or effects, mixing or re-mixing after a re-time, when someone says the video sounds thin, empty, cheap or muddy, or before sending a mix to the operator or a reviewer.
---

# Sound design

Model: claude-opus-5-5 (2026-11-24, from `docs/reviews/2026-11-24-video-quality-review.md` §5).

A faceless explainer has no face to hold the viewer; the voice, the music and the sound of every move do that work. Kurzgesagt and Fireship put a sound under almost every action on screen, and the music changes with the story. A flat generated bed under ten minutes of voice sounds like nobody chose it.

## 1. The sound plan (written at storyboard time, before the build)
Write `episodes/<ep>/sound-plan.md` (model name on top) beside `storyboard.md`. The operator reviews it with the storyboard. It holds:

1. **Music per act.** For each act: a named feeling in plain words ("curious, ticking forward", "cold, something is wrong", "release, it finally makes sense"), a **reference track** (a real track, artist and timestamp, whose feel this act should match) and the chosen licensed track with its source and licence id. A new act, a new feeling, usually a new cue; the same track may return when the feeling returns.
2. **The hook.** What plays from frame 0, and the **sting**: one short musical hit on the hook's key line (the question, the number). It lands on the word, measured from `voice/words`, not guessed.
3. **Turns.** Where the music drops out (the reveal, an act start) and the line that brings it back.
4. **Levels per stretch** on the percent scale (§3): one row per stretch, start and end beat ids, percent, and the ramp into it.
5. **Cue list.** Every visual action in the storyboard gets a row: beat id and word (`S04_02 "locks"`), the move, the sound (§2 table), its level.

## 2. A sound on every visual action
One sound family per film (paper and wood for a paper look, soft UI clicks and glass for screen-first), and the sound matches the move it marks. Start each sound on the move's first frame; a contact sound (click, lock) lands on the contact frame.

| Move on screen | Sound | Level under the voice | Note |
|---|---|---|---|
| appear (a card, value or node comes in) | soft pop or tap | about 26 dB | short, under 150 ms |
| slide (a panel enters, a card moves) | short whoosh, as long as the move | about 28 dB | peaks mid-move, ends with it |
| lock / click (a key turns, a box shuts, a match lands) | mechanical click | about 24 dB | on the contact frame |
| hash churn (characters scramble) | fine tick roll, looped for the churn | about 30 dB | stops on the frame the value settles |
| error (rejected, red mark, alarm) | low dull thud or short buzz, never a cartoon buzzer | about 24 dB | once per error |
| reveal (the payoff, a door opens) | soft hit, with the music change | about 22 dB | the loudest effect in the film |
| hook sting | musical hit or riser end | music at 75 % for the hit | on the hook's key word |

- Effects mostly sit about 26 dB under the voice: heard, not noticed. The voice always wins.
- The music dips about 5 dB under each movement sound (50 ms down, 300 ms back), so the effect reads without being loud.
- Vary the sample: three or four takes of each kind, chosen by index, so a repeated move does not sound like a loop.
- A count gets ticks, a reveal gets a hit. A sound that does not match its move is worse than none.

## 3. Levels: percent of the voice
Levels are written as a percent of the voice, measured as short-term loudness of each stem over the same stretch.

| Percent | Music under the voice | Use |
|---|---|---|
| 100 % | equal (0 dB) | no voice: an act-break breath, the cold open before the first word |
| 75 % | 13.5 dB under | the hook, an act opening, the reveal's music |
| 45 % | 18 dB under | under explanation, the usual level |
| effects | about 26 dB under | §2 table |

- Hold each level for a whole stretch (a scene or a run of beats); do not ride it line by line.
- Every change is a ramp: 1 to 2 s between stretches, 0.3 to 0.5 s into a turn's drop. A step change is heard as a mistake.
- Never digital silence: when the music drops out, a quiet room tone stays under it, and the music stem runs to the last frame (built to the episode length plus 1 s, again after any re-time).
- Measure a reference before trusting the numbers: take one explainer the operator admires, separate or measure its voice and music over a 30 s stretch, and write its percent in the plan. If ours is far from it, the reference wins and this table is updated with the evidence.

## 4. Sources and licences
- Licensed music only, from a library the channel holds a licence for (Epidemic Sound, Artlist or similar). No generated music beds: `tools/make_pad.sh` is not used in any mix someone hears.
- Pick by measurement against the act's reference track: tempo, energy over time, how busy the middle frequencies are (busy mids fight the voice). Shortlist three, the operator picks by ear.
- Effects from a licensed library (or recorded) in the film's one family.
- Log each file when it is added: beside the file a `<file>.licence.txt` (library, track title, artist, track id or URL, licence or subscription id, date downloaded, what was cut or changed), and an entry in `video/public/assets/credits.json` (`video-build` §4).

## 5. Building the mix
The build (`build-episode.ts`, `video/src/Episode.tsx`) today plays the narration, one music file at a single flat volume and effects of three kinds at fixed gains. Until it supports per-stretch levels, build the sound as one stem outside Remotion:
1. After `build-episode.ts`, resolve every cue's frame from `voice/words` and the built `steps`.
2. With ffmpeg, place each act's track, the sting and every effect on one timeline, apply the plan's stretch levels as a gain envelope with ramps (`volume='<expression of t>':eval=frame`), and the 5 dB dips at each movement cue. Measure each stretch against `video/public/<id>/narration.wav` and correct the gain until it is within 1 dB of the plan.
3. Write it as `video/public/<id>/pad.wav` and set `"musicVolume": 1` in `storyboard.json` so it plays at the level it was mixed at; leave shot `sfx` lists empty so effects are not doubled.
4. Render, then master (§6).

## 6. Final master and clarity
- Final mix: **−14 LUFS integrated, true peak −1 dBTP** (measured after AAC encoding). In `video-build` §1's two-pass `loudnorm`, use `I=-14:TP=-2.0`: AAC overshoots, and ep02's −1 target measured −0.8 after encoding.
- Words checked for clarity, tested, not assumed: transcribe the **final mix** (`tools/tts/.venv/bin/python tools/tts/transcribe.py out/<ep>.mp4`), normalize numbers and spellings as in `voice-narration` §5, and compare with `voice/lines.json`. Every word heard in the voice-only transcript must still be heard in the mix; a word lost in the mix is a level fault at that time, fixed by lowering the music or the effect there, never by raising the voice.

## 7. Sound gate (passes before anyone hears a mix)
No mix goes to the operator or a reviewer until every check below passes. Write `episodes/<ep>/reviews/sound-gate-<round>.md` (model name on top) with each check, the number measured and PASS or FAIL, and end it with READY or NOT READY. A check that could not run is NOT CHECKED, and NOT CHECKED is never a pass.

| Check | How | Pass |
|---|---|---|
| Loudness | `ffmpeg -nostats -i $FINAL -af ebur128=peak=true -f null - 2>&1 \| tail -14` | −14 ± 1 LUFS integrated, true peak ≤ −1 dBTP |
| Music under voice, per stretch | `ffmpeg -nostats -ss <a> -to <b> -i <stem> -af ebur128 -f null - 2>&1 \| grep -A1 Integrated` on narration and on the sound stem, per stretch in the plan | within 1.5 dB of the plan's percent |
| Effects | the same on a window around each cue, effect alone vs voice | about 26 dB under (22 to 30 by the §2 table) |
| Ramps | `ebur128=metadata=1,ametadata=print:key=lavfi.r128.M:file=m.txt` on the sound stem | no jump over 6 dB inside 100 ms except at a planned sting, drop or hit |
| Cues | cue list vs placed sounds | every visual action in the storyboard has its sound, within 2 frames of its move |
| No digital silence | `ffmpeg -i $FINAL -af silencedetect=n=-90dB:d=0.3 -f null -` | nothing found, the last half second included |
| Length | `ffprobe` duration of the stem and of the film | stem ≥ film; music fades to the last frame |
| Clarity | transcript of the final mix vs the voice-only transcript (§6) | no word lost |
| Clean files | `transcribe.py` on each music and effect file | no speech a person hears |
| Licences | every music and effect file used | `.licence.txt` beside it and a `credits.json` entry |

After any re-time, re-voice or music change, the gate runs again before the mix is heard.

## NEVER
- Never put a generated music bed, or a track without a logged licence, in a mix anyone hears.
- Never hold one flat music level under a whole episode; never change a level without a ramp.
- Never raise the voice to beat the music; lower the music.
- Never send a mix to the operator or a reviewer before the sound gate says READY.
