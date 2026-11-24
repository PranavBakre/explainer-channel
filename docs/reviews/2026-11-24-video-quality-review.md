# Explainer channel: review and how to lift video quality

Reviewer: Kai (claude-opus-5-5), 24 Nov 2026, for Pranav Bakre.
Repo reviewed: `PranavBakre/explainer-channel` at `c0813e0`.
Reference: GrowthX's internal video toolkit ("the studio pipeline" below), version of 24 Nov 2026. It is private, so this public copy names its methods and numbers but not its files, commands or access details. Ask the GrowthX video team for those.

## What was checked, and what was not

- Read: `AGENTS.md`, `LEARNINGS.md` (operator feedback sections in full), every skill in `.claude/skills/`, the three art-direction directions, episode 1's brief, script, storyboard, shot list and visual pass, and the repo's own contact sheets and lookdev frames.
- Skimmed: `.claude/skills/GRADES.md` and `docs/research/` (headings only).
- Not done: no frames rendered (`video/node_modules` is not installed), no audio heard, no studio-pipeline tool run. What each of its tools does comes from its own docs.
- Only episode 1 is in the repo (the 10:28 scanned-props cut, 67 shots). If the 8:22 cut is the cut-paper redo, check sections 4 and 5 against that cut.

## Summary

Most of the pipeline's effort goes into checking videos, and too little into making them good to watch and listen to. About 56% of the skill text is process (reviewer routing, model names, hashes, locks, gates). Almost all the operator feedback in `LEARNINGS.md` is about the look and the sound, and none of it is about a missing gate.

What lifts quality the most, in order:

1. Replace the Kokoro voice, and change how the voice is made.
2. Rewrite the hook so it opens a question.
3. Cut episode 1 to about 7 minutes.
4. Lock one look for the season.
5. Build real sound: music per act, sound effects, a sound gate.
6. Measure against real reference videos and real retention, not rubrics.
7. Trim the process machinery.

Keep: the fact chain, the truth pass, the mute test, the packaging and thumbnail review, and the script skill's click-away lessons.

---

## 1. Voice: the biggest single problem

**What you have.** Kokoro ONNX, voice `af_heart`, one take per line, pace tuned by speed (`voice-narration`: "Median above 170 → lower speed by 0.02"). The voice skill says "Open operator decision: Kokoro or ElevenLabs… the channel stays on Kokoro until the operator decides." About 65% of that skill is workarounds for Kokoro misreadings:

- a lone "A" read as "uh"
- "lives" said as in human lives
- "PIN" spelled out letter by letter
- "a salt" heard as "assault"

Nothing covers emphasis, warmth or pacing for meaning. The voice is heard in every second, and it is what makes the video read as cheap AI.

**What the studio pipeline does:**

- ElevenLabs, with each line voiced using the lines before and after it as context.
- "Make up to 3 takes per line and keep the best."
- "Level each line to −18 LUFS."
- The model used ignores the speed setting, so "re-time the film to the voice", never the voice to the film.

**Change.**

1. Make a blind test: 60 seconds of one episode in ElevenLabs and in Kokoro, played to a few people on a phone (not judged by Whisper).
2. Move to ElevenLabs with surrounding-line context and 2 to 3 takes per line. A person picks the take, and every line is levelled.
3. Pick your own narrator voice for the channel and keep it fixed.
4. Delete the speed-tuning and mispronunciation sections. Rewrite the skill around emphasis, pauses and pacing for meaning.

## 2. Hook: a lecture premise, not an open question

**What you have** (S01 to S02, 0:00 to 0:51): "A well-run website does not keep a readable copy of your password. So when you log in, what is it checking against? … A badly run website does keep the password."

A stranger has no reason to care yet. The real stakes ("one modern graphics card can try every eight-character password… in under a minute") land at about 0:37, softened by "in some of those formats".

**Change.** Lead with the episode's own payoff, the gap between 17 seconds and 12.5 years, and open the question by 0:10. For example:

> "Your password is probably sitting in a database you'll never see. If that database leaks tomorrow, one gaming graphics card could crack it in under a minute, or it could take twelve years. Which one depends on a decision some engineer made before you ever signed up. Here's how to tell which kind of site you're trusting."

Judge the first 30 seconds of the finished video, not only the script on paper (see section 6).

## 3. Script and length: correct, but heavy and hedged

**Problems.**

- Five fact-check rounds turned into hedges: "at the tested setting", "in a common library's format", "in this pair". There is no light line or take for ten minutes.
- Too many numbers, which dilutes the payoff:
  - **S05 Adobe (1:45 to 2:29):** three counts in about 20 s (109M hints, 38M active users, 153M records).
  - **S12 to S13 (5:24 to 6:49):** a stream of benchmark numbers (164B, 50B, 22B, 184k, 7k).
  - **S14 (6:49 to 7:51, 61 s):** Argon2id, MiB, rounds, recipe string, rehash and pepper all at once.
  - **S16 NIST (8:09 to 8:54):** four rule cards in a row.
- Momentum drops after salt (S10, about 5:00), right where the chain should turn toward the climax.

**What works.** One prop, the `mango@123` card, carried through the whole episode (drawer, lockbox, hash machine, lookup wall, GPU bench). That is an excellent spine. The extra numbers bury it.

**Change.**

1. Target about 7 minutes. The core chain (plain, encrypt, hash, salt, slow) plus "your side" fits in 6 to 7.
2. Use one Adobe number, not three.
3. Collapse the GPU and slow-hash sections into one race: 17 seconds against 12 years.
4. Drop pepper and rehash-on-login; use one NIST card, not four.
5. Keep facts verified, but say them plainly once instead of hedging every line.
6. Add a line with some personality every 60 to 90 seconds.

## 4. Look: four styles in one episode, three restarts in two weeks

**What you have.**

- The house look went from painted 3D to cut paper to screen-first in about two weeks.
- Episode 1 mixes scanned 3D props on pastel walls, Lottie phone flows, document screenshots and dark type cards.
- Your own art-direction notes admit the "pastel walls… faded at thumbnail size".
- Your independent visual review scored legibility 2 out of 5. Phone UI text is "about 5 px at 360 px wide (accepted)", and claim-bearing phone UI is still listed as unreadable.
- Long holds: S01 is one 19 s shot, the S07 avalanche 21 s, the S18 recap 32 s, the S16 NIST run 45 s.
- Log-scale bars understate the gap: 164 billion against 7 thousand reads as a modest difference.

**What the studio pipeline does.**

- One house look across everything, set once and reused.
- A graphics library of approved graphics, each with "when to use" notes. You check it before building anything new: liked graphics first, then ones already live.

**Change.**

1. Lock one look for the season. Screen-first scales best for tech concepts.
2. Keep approved components as library entries with "when to use" notes, and reuse them before building new ones.
3. Make the mechanism the event. Show it big and isolated on the part that matters (the changed bits, the matching drawer), readable on a phone.
4. Break holds longer than 8 s.
5. Show large gaps on a scale that feels as large as they are.

## 5. Sound: almost empty

**What you have.**

- One generated music bed at a flat 0.12 gain, normalised to −16 LUFS.
- Two kinds of sound effect (a hit and a tick), capped at "at most one per 10 s" (`storyboard` §2).
- About 7 sound effects in 10 minutes.
- `video-build` §5 is six bullets on levels and avoiding silence. Nothing on music picking, music per act, or the first seconds.

**What the studio pipeline does.**

- **Music by percent of the voice:** 75% is 13.5 dB under the voice, 45% is 18 dB under.
- Levels are held stretch by stretch, and every change is a ramp.
- **Final mix:** −14 LUFS integrated, true peak −1 dBTP.
- **Words checked for clarity:** "tested, not assumed".
- **Tracks:** a licensed shelf, matched by measurement to a reference track you like, not generated.
- **Sound effects:** most sit about 26 dB under the voice, and the music dips about 5 dB under each movement sound. Your rule ("effects sit at least 6 dB over the music") is a different approach.
- **Sound gate:** nothing with sound goes to a reviewer until the gate script prints READY. Its pass marks were set on a released film and proved by breaking that film on purpose.

**Change.**

1. Write a sound skill: licensed music per act, a sting on the hook, a sound on every visual action (as Kurzgesagt and Fireship do), and a reference mix measured.
2. Write a sound plan per episode before the build.
3. Run the sound gate before anyone hears a mix.

## 6. Measure against real videos and real viewers

**What you have.** Every check is a rubric, another model's opinion, or a number the video must stay inside:

- freeze and loudness checks (`video-qa` §1)
- a cold viewer that sees one frame every 7 s plus captions, never the sound
- a blind thumbnail ranking by a model

The one comparison to a reference (cuts and picture changes per minute) is marked "Report, not gate". `package-review` §3 says to record views at 6 h, 24 h and 7 days, but `LEARNINGS.md` records none for any episode.

**What the studio pipeline does.**

- **Measured QA suite:** "A check that could not run is NOT CHECKED, and NOT CHECKED is never a pass."
  - Static holds: nothing still for 4 s or more, nothing empty for 1 s or more.
  - Text size: letters at least 30 px tall at 1080p (more for a call to action).
  - On-screen reading (OCR): reads every word on screen twice a second.
  - Spoken words: checks what is said.
  - Ratchet: once a quality bar is reached, it never drops.
- **Baseline from the best films:** each long film is checked against the ranges of the best ones (pace, captions, on-screen words, loudness, voice over music).

**Change.**

1. Run the QA suite on each render. The text-size and static-hold checks alone would catch the phone legibility problem and the long holds.
2. Build a baseline from 2 or 3 faceless explainers you admire, and fail anything outside those ranges.
3. Make a side-by-side of the first 60 seconds against one reference per episode a pass/fail gate: frames at 0, 5 and 10 s, picture change rate, voice pace, when the music comes in, text size.
4. After publishing, log retention curves and click-through in `LEARNINGS.md`. Match the drop-off points to the cold viewer's predicted click-aways, and judge the reviewers by how often they guessed right.

## 7. Process: trim it

**What you have.** Process share of skill text, rough count by keyword:

| Skill | Process share |
|---|---|
| script-review | 79% |
| video-qa | 78% |
| package-review | 67% |
| voice-narration | 65% |
| video-build | 63% |
| art-direction | 23% (the most about craft) |

Other process costs:

- **`GRADES.md`:** 186 KB of skills grading skills (six rounds, "112/120, A").
- **Different-model reviews:** every file carries the author's model name for reviewer routing. The operator overrode the different-model rule on ep04, which shows it is heavy.
- **Rules that conflict:**
  - Rests must be fully still ("no idle animation"), while "no hold > 8 s" stays a channel limit. The ep03 QA failures were exactly this (9.7 s and 8.3 s).
  - The text floor is 36 px in `LEARNINGS.md` but 20 px in the `storyboard` §4 table.
- **Dead links:** about 18 references across `AGENTS.md`, the skills and `LEARNINGS.md` point to files not in the repo (`research/study-youtube-video-creation.md`, the `reference-*.md` studies, `reviewer-calibration-*.md`). The skills also cite ep02 to ep04 evidence that isn't in the repo.
- **Rules grow on rejection:** most rules say what not to do. Each rejection ("a slide deck with doodles", "this UI has gotten old now") became a new ban on top of the old ones. There is no library of good frames to aim at.

**What the studio pipeline does.** Its Shorts command runs every step that comes out the same each time as a script. The agent writes only the judgement parts (the shot plan and the sound plan), and people review them on review pages.

**Change.**

1. Merge the three review gates into one short review with one route.
2. Move model routing, hashing and render-lock rules into one shared ops file.
3. Freeze `GRADES.md`.
4. Aim for skills that are at least 70% craft.
5. Fix the conflicting rules and the dead links.
6. Keep a reference library of good frames next to the bans.

## 8. Human review: use review pages

**What you have.** Contact sheets in Slack and free-text replies.

**What the studio pipeline does.** A review command builds a page with a comment box on every item and a "Copy my answers" button, pasted back to the agent. The `storyboard-review` skill uses it at every stage: structure, look, opener, each beat, sound, names and facts. A person approves real stills before the build starts.

**Change.** Put storyboard stills, look options and pilot notes on review pages.

---

## Where you're ahead of the studio pipeline (keep these)

- **The fact chain:** every on-screen or spoken claim traces back to a VERIFIED line in the factsheet.
- **The truth pass** in the storyboard skill.
- **The mute test.**
- **Packaging and thumbnail review.**
- **Per-shot text alignment.**
- **Click-away lessons** from episodes 1 and 2 in `script-writing` §2 to 3. This is the strongest part of the repo.

## Using the studio pipeline directly

Ask the GrowthX video team for access. The review pages, the sound gate and the QA suite should work for this channel as they are (the QA suite needs macOS). The rest of its Shorts tooling is built for Shorts.

## What doesn't fit

- **On-camera rules:** framing, colour grading, speaker panel, half-and-half layouts.
- **The Shorts music level** (23 dB under the voice).
- **Its HTML-to-video renderer:** you use Remotion.
- **The Vox paper and atlas looks:** built for company and money films, optional for code and security concepts.
- **The calibration numbers:** tuned on a talking-head company film with a hype-heavy opening. Keep the method and re-tune the numbers on your own references.

## Top changes, in order

1. ElevenLabs voice with 2 to 3 takes per line, chosen by a person and levelled; rewrite the voice skill around emphasis and pacing.
2. Hook rewritten around "under a minute or twelve years", with the question open by 0:10.
3. Episode cut to about 7 minutes: fewer numbers, fewer hedges, a personality line every 60 to 90 s.
4. One locked look for the season, plus a graphics library; every mechanism readable on a phone.
5. A sound skill, a sound plan per episode, and the sound gate before anyone hears a mix.
6. The QA suite on every render, a measured baseline from reference explainers, and real retention logged after publishing.
7. Process cut to one review gate, `GRADES.md` frozen, conflicts and dead links fixed.
8. Review pages for every human approval.
