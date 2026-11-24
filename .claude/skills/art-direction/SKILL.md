---
name: art-direction
description: Choose, prove and record the look of an explainer episode or the channel — pick a recorded art direction or find a new one, prove it with style frames of the episode's load-bearing shots and a short motion test before anything is built, and save it under references/directions/. Use when the operator says the video looks weak, cheap or unlike its thumbnail, when a thumbnail or reference outclasses the video, before the storyboard of a new episode or a rebuild, when asked for style frames, a motion test or "what would this look like", or when a look decision changes.
---

# Art direction

Outputs: `episodes/<ep>/package/styleframes/` (frames, a before/after sheet, one motion test) and, once the operator settles a look, one file in `references/directions/`. `episode-brief` names the direction an episode uses; `storyboard`, `video-build` and `video-qa` read that direction's file before planning, building or judging shots; they hold only channel-wide rules, so anything about the look lives in the file.

The ep01 redo went from script to shots with no art-direction step. Builders made what 3D could make; the result was a competent diagram, and its own props ranked last of twelve as thumbnails. The look was only questioned after a generated thumbnail outclassed the video.

## 0. Start from a recorded direction
Read only the file for the direction in play (never a second one; its anchors leak):
| Direction | File | State |
|---|---|---|
| Cut-paper stop motion | `references/directions/cut-paper-stop-motion.md` | reference only; proved in stills and a motion test (ep01 redo, 2026-11-11); dropped on ep03 v2 as dated (operator, 2026-11-15: "this UI has gotten old now. we need to innovate") |
| Screen-first | `references/directions/screen-first.md` | **season-1 locked default**; proved in stills and an example track (ep03 look2, 2026-11-15); full episode ep03 v4 (QA r4 PASS; operator: "i like the new video") |
| Painted props, 3D | `references/directions/painted-props-3d.md` | reference only; shipped in ep01 r1–r7; ranked last blind; kept as a record of what it costs |
**One look for the season.** Screen-first is the season-1 default and is locked: every episode uses it, and it is not changed per episode or by a lead's judgement. The look went painted 3D → cut paper → screen-first in about two weeks, and ep01 mixed four styles in one video; each restart threw away its components. The other directions stay as references (their failures and fixes are evidence), never as an option for one episode. A new look needs an explicit operator decision, recorded in `LEARNINGS.md` under operator feedback with their words and date, before §1 starts; a look that weakens inside the season is fixed inside screen-first (its §10 and §9), not replaced.

## 1. Find the gap before proposing a look
- Put the video where it competes: a contact sheet of its own frames (`ffmpeg -vf "fps=1/14,scale=480:-1,tile=6x7"`) beside the thumbnail it will ship with and the house sheet of competing thumbnails (`dumbledore-creative` §1–2).
- If the thumbnail promises a look the first five seconds do not deliver, that is a retention problem, not taste. Say which of the two is better and why in terms of idea, material and colour count.
- The author's ranking is not evidence. A different model ranks blind (`dumbledore-creative` §7); the ep01 scoreboard thumbnail was self-picked first and ranked twelfth.
- `dumbledore-creative` is a user-level skill on the operator's machine (`~/.claude/skills/dumbledore-creative/`), not in this repo. A thumbnail is made with it in full (`package-review` §1a). Only where it is missing does the repo stand in: the house sheet is our shipped thumbnails beside 5 current ones from the niche at 168×94, the thumbnail rules and blind ranking are `package-review` §1 (Thumbnail, Pairing, Blind ranking rows), and the look and plate method are the direction file's §2 and §10.

## 2. Style frames: three load-bearing shots
Pick three shots of different kinds that carry the episode (for ep01: the phone/login hook, the mechanism machine, the verdict board). One still each, in the candidate look, beside the current frame.
- Hero images may be generated (`codex exec` with its built-in image generation; say "do not draw a substitute with code"). The prompt has labelled sections (subject, material and process, palette, constraints) and always: no text, letters, numbers, logos, people or hands; blank surfaces stay blank.
- All type is set in code on the blank surfaces, in the channel faces, the way the video will do it. A generated image containing text is never used.
- Deliver a before/after sheet. State what the frames do NOT prove: motion, colour over the whole runtime, and how real captures sit in the look.

## 3. Name the worries, then one motion test that answers all of them
Stills that look good make a slideshow. Before building anything, ask the operator what would make the look fail and write each worry down (ep01: "all red will be tiring", "don't make it a slideshow", "real articles in white and accent colours will clash").
- One 12–15 s test shot covering every worry: a mechanism working, a camera move, and one real capture in the look.
- Every moving thing is its own piece built in code; generated images supply texture and reference only, never a finished frame.
- The builder looks at a one-frame-per-second sheet: any two adjacent tiles that barely differ are a dead stretch. Stills cannot judge motion feel; the operator watches the clip.
- Show the operator the first test before improving it, and change one thing per round. On ep01 the author sent five fixes at once from its own reading of a contact sheet; the operator preferred the first test and named two of the fixes as the faults.

## 4. Record the direction
When the operator accepts the test, write `references/directions/<name>.md` with exactly these sections, each stating what is fixed and what is open. The pipeline skills hold only channel-wide rules and look up everything about the look here, so a missing section leaves `episode-brief`, `storyboard` or `video-build` without an answer:
1. One-line idea and the reference the operator named, in their words.
2. Anchors: palette with a meaning per colour, type, the object that carries the episode, and the character for formats that use one (`storyboard` §1.2).
3. Colour over time: which field for which state, and the share of runtime for the loudest colour, and how an act keeps one field (`storyboard` §1.2).
4. Medium per mechanism: how this look shows a physical-feeling process, a user-facing flow, evidence from a source, a list of rules, real hardware or a place. Mark unproved rows open.
5. Material and process: surfaces, shadows, edges, what texture comes from.
6. Motion: what moves how (step rate, camera, jitter), transitions, rests, and the anti-slideshow rules.
7. Text on screen: where words live (on objects, or floating over the scene), faces and weights, and any size above `storyboard` §4's minimums.
8. Real captures and footage: the treatment that keeps the words unaltered.
9. What failed, as treatments (not colours), including the operator's rejections in this look.
10. How it is built: components and helpers, assets, prompts that worked, build gotchas of this look, and the checks.
Then add its row to §0, a line to `LEARNINGS.md` under operator feedback, and name it in the episode's `brief.md`.

## 5. Component library: reuse before building
Approved shots and components are listed in `video/src/components/LIBRARY.md`. An entry is added when the operator approves a shot or a component ships in a passing episode, with: **name** (the export and its file), **what it shows**, **when to use** (the mechanism and the beat it fits, and when not to), and **the episode it shipped in**. Before building anything new for a brief or storyboard, check the library: an approved entry that shows the mechanism is reused (restyled only through the direction's tokens); a new piece is built only when none fits, and the storyboard row says which entries were checked and why they did not fit. Remove or mark an entry when the operator rejects it, so the library holds only what to aim for. Ep03's builders each wrote private copies of door reveals, laptop pages and the thief layer (`LEARNINGS.md`, ep03 rebuild); the library is the shared copy.

## Aim for (next to the NEVER list)
Rules here mostly say what failed. These are frames to aim at; take the idea, never copy the art:
- **3Blue1Brown-style mechanism shots:** one mechanism isolated on a dark field, the part that changes enlarged and lit, everything else dimmed, the change shown continuously rather than cut to.
- **Kurzgesagt:** one big object carrying the idea, scale shown as size (a tiny thing beside a huge one), bold flat colour with one accent, and a sound on every move.
- **Fireship:** fast, dense, real code and real screens at readable size, a light line every few seconds, a sound on every visual beat.
- **ByteByteGo:** a request visibly travelling through a system that is built piece by piece, each part lighting as it is named. In screen-first the parts are real-looking devices and screens, never labelled boxes joined by arrows (`screen-first.md`, What it must not become).
Before a look option or style frame goes to the operator, put one frame from the closest of these beside it.

## Showing look options
Style frames, before/after sheets and motion tests go to the operator as one local HTML review page (`storyboard` §6), one card per option, not as images in Slack.

## NEVER
- Never change the season's look for one episode, or without an operator decision recorded in `LEARNINGS.md`.
- Never build a new component before checking `video/src/components/LIBRARY.md`.
- Never rebuild shots in a new look before a motion test the operator has watched.
- Never show a generated image as a finished frame, or use one that contains text.
- Never carry one loud field colour through a whole episode; colour is a state.
- Never recolour or retype a real capture's words; treat the capture, keep its words.
- Never load two direction files in one build.
