---
name: episode-brief
description: Choose an episode's topic with the operator and write its creative brief (brief.md) — the question, packaging (titles, thumbnails), which visual medium shows each mechanism, references, negative list, motion, colour and sound. Use when starting a new episode or picking the next topic, before research, scripting or storyboarding, when a channel style decision changes, or when a video's look is off-target.
---

# Episode brief

Output: `episodes/<ep>/brief.md`. Channel-wide rules live in `AGENTS.md` and `LEARNINGS.md` (operator feedback sections); the brief records only what is specific to this episode.

## 0. Topic — the operator decides
Take the next topic from `docs/season-*.md`. If none is listed, or the operator asks for options, shortlist three, each with: the question, a candidate news/event hook, the misconception it corrects, three primary sources, and which existing props or flows it can reuse. Wait for the operator's pick. Never start research on a topic the operator has not chosen.

A season listing approves the topic, not its evidence. Before research starts, every episode needs a VERIFIED hook, the misconception it corrects and three primary sources it will show (`docs/season-1.md`). No current hook → propose an evergreen framing (a common experience instead of news) and let the operator choose it or swap the episode.

## 1. Before writing, read
- `LEARNINGS.md`: every "Operator feedback" section and the latest look decisions. They supersede older briefs.
- The previous episode's `brief.md` and `reviews/video-qa-*.md`, so this episode inherits fixes, not first drafts. No previous episode → the house values in the skills (`storyboard` §2, §4; `video-build` §3) are the defaults.
- Precedence: operator feedback in `LEARNINGS.md` > skill house values > the previous brief. Ep01's brief prescribed fades within an act and wipes between acts; the shipped episode and `storyboard` use cut within, fade at an act start.

## 2. Brief sections
1. **Context**: the question, the viewer (smart non-expert, mostly watching on a phone), the promise, target length.
2. **Packaging first**: 3 titles and 2 thumbnail concepts, decided before the script (one focal object, ≤4 words, an angle the title does not state).
3. **Medium per mechanism**: for each thing the viewer must understand, write what must be *seen*, then choose:
   | The mechanism is… | Medium |
   |---|---|
   | a physical-feeling process (store, lock, compare, guess) | 3D prop that stands for exactly one part of the system all episode |
   | a user-facing flow (sign up, log in, a check on a site) | edited Lottie flow in the existing illustration family |
   | evidence, a quote or a number from a source | the real document: page, then its highlighted passage, then back to the prop or flow it changes |
   | a list of rules a standard imposes | the flow or prop showing each rule applied to the running example; the document only as proof |
   | real hardware or a real place | licensed footage |
   If none makes the mechanism visible, rethink the beat; do not fall back to a text card.
4. **Props table**: prop → the one thing it means → what is printed on it (real data only) → finish that matches the meaning.
5. **References**: what to take, what to ignore from each; never copy one.
6. **Negative list**: this episode's rejected looks, plus the channel's (see NEVER).
7. **Motion, colour script, sound**: per act. Channel defaults live in the previous episode's brief (ep01: §4 House style, §8 Motion language, §11 Sound) as amended by later `LEARNINGS.md` decisions; copy the values you inherit into a table with their source, and mark any value you change with the reason.

## 3. Lock the brief with a proof
Render one representative frame per medium at phone size (360 px wide) and compare it with the previous episode's frames. Lock only when the mechanism reads at that size; if it does not, change that mechanism's medium or prop in §2.3, not the camera or the text size alone. A medium with no existing component gets a rough prototype frame, not a skipped proof.

**Lottie provenance before adopting a family:** stock LottieFiles results include re-uploads of other studios' art. Use a family only when its author, source URL and licence are clear; otherwise draw the flow ourselves.

## NEVER
- **No board of any kind** (whiteboard, chalkboard, flip chart, "math board"); the operator rejected rendered and composited boards as fake. Numbers live in their source document or as the reading of a prop (counter, dial, display).
- **No decorative 3D**: a prop that does not stand for part of the mechanism is noise, and the operator rejected it.
- **No stock text on props**: Cyrillic labels, handwriting or brand marks on a scan break "everything printed is real data".
- **No finish that contradicts the meaning**: a security prop with rust reads as broken ("looks like a rusted toolbox"); choose clean metal for safety, wear only when wear is the point.
- No image-model text, numbers or code; no flat procedural 3D when a scanned model or scanned surface fits ("too plain, like 1995 Toy Story").
