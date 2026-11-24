---
name: episode-brief
description: Choose an episode's topic with the operator and write its creative brief (brief.md) — the question, packaging (titles, thumbnails), the art direction it uses and which medium of that direction shows each mechanism, references, negative list, motion, colour and sound. Use when starting a new episode or picking the next topic, before research, scripting or storyboarding, or when an episode changes art direction.
---

# Episode brief

Output: `episodes/<ep>/brief.md`. The look comes from `art-direction`: season 1 uses **screen-first**, locked for the season (`art-direction` §0). The brief names it and does not choose a look; a different look needs an explicit operator decision recorded in `LEARNINGS.md` first, and is never changed for one episode. Read only that file in `.claude/skills/art-direction/references/directions/` before writing the medium, colour and motion sections. Channel-wide rules live in `AGENTS.md` and `LEARNINGS.md` (operator feedback sections); the brief records only what is specific to this episode.

## 0. Topic — the operator decides
Take the next topic from `docs/season-*.md`. If none is listed, or the operator asks for options, shortlist three, each with: the question, a candidate news/event hook, the misconception it corrects, three primary sources, and which existing props or flows it can reuse. Wait for the operator's pick. Never start research on a topic the operator has not chosen.

A season listing approves the topic, not its evidence. Before research starts, every episode needs a VERIFIED hook, the misconception it corrects and three primary sources it will show (`docs/season-1.md`). No current hook → propose an evergreen framing (a common experience instead of news) and let the operator choose it or swap the episode.

## 1. Before writing, read
- `LEARNINGS.md`: every "Operator feedback" section and the latest look decisions. They supersede older briefs.
- The previous episode's `brief.md` and `reviews/video-qa-*.md`, so this episode inherits fixes, not first drafts. No previous episode → the direction file, then the house values in the skills (`storyboard` §2, §4; `video-build` §2), are the defaults.
- An earlier episode's files are examples of form, never a source of rules. Rules come only from the skills, the direction file and the binding sections of `LEARNINGS.md`; check anything you would copy against its "Withdrawn rules" list first (ep02's brief still carries the withdrawn 40-second field clock).
- Precedence: operator feedback in `LEARNINGS.md` > the direction file > skill house values > the previous brief. A previous brief in another direction contributes its fixes, never its look. Ep01's brief prescribed fades within an act and wipes between acts; the shipped episode and `storyboard` use cut within, fade at an act start.

## 2. Brief sections
1. **Context**: the question, the viewer (smart non-expert, mostly watching on a phone, has not seen any other episode: `script-writing` §2), the promise, the **payoff number or contrast** the hook will lead with (ep01: under a minute against twelve years), the target length, and the format (`script-writing` §1: concept video, a story format, …), which decides which format-specific rules apply. **Length defaults to 6 to 8 minutes**; a longer target carries a one-sentence reason (`script-writing` §2). List here the side topics the episode will not narrate (ep01: pepper, rehash-on-login), so the script sends them to the description and pinned comment instead of growing.
2. **Packaging first**: 3 titles and 2 thumbnail concepts, decided before the script (one focal object, ≤4 words, an angle the title does not state).
3. **Medium per mechanism**: for each thing the viewer must understand, write what must be *seen*, then take its medium from the direction file's §4 table. Check the component library (`video/src/components/LIBRARY.md`, `art-direction` §5) before planning a new piece: an approved component that shows the mechanism is reused, and the brief names it. In every direction: one object stands for exactly one part of the system all episode; evidence is the real source with its passage marked, then back to the object it changes; a list of rules is shown applied to the running example, the source only as proof; real hardware or a place comes from real footage or photos, treated per the direction. A row the direction marks open needs a prototype frame in §3 below. If no medium makes the mechanism visible, rethink the beat; do not fall back to a text card.
4. **Props table**: object → the one thing it means → what is printed on it (real data only) → finish that matches the meaning.
5. **References**: what to take, what to ignore from each; never copy one. Name **one reference video whose opening the hook is measured against** (`script-review` §2, Hook row), with its study in `research/`. A reference study (`research/`) first states the video and channel type (presenter-led documentary, faceless story, entertainment clip…) and tags each lesson with the format it is evidence for; a lesson from another type is a candidate, and where two types disagree, record the disagreement instead of averaging it.
6. **Negative list**: this episode's rejected looks, the direction file's §9, and the channel's (see NEVER).
7. **Motion, colour script, sound**: per act. Motion and colour come from the direction file (§3, §6); sound from the previous episode's brief (ep01: §11 Sound); both as amended by later `LEARNINGS.md` decisions. Copy the values you inherit into a table with their source, and mark any value you change with the reason.

## 3. Lock the brief with a proof
Render one representative frame per medium at phone size (360 px wide) and compare it with the direction's style frames and the previous episode's frames. Lock only when the mechanism reads at that size; if it does not, change that mechanism's medium or prop in §2.3, not the camera or the text size alone. A medium with no existing component gets a rough prototype frame, not a skipped proof.

**When the task rules out rendering** (or stops before the build), the task wins: write the brief anyway, put `Look: not locked (proof owed)` on its first line under the model name, and list each owed proof frame in `HANDOFF.md`. Script work may go on; `storyboard` refuses a brief marked not locked, so the proof is rendered before the storyboard starts.

**Provenance before adopting any stock asset** (Lottie family, model, texture, footage): stock libraries include re-uploads of other studios' work (ep01 found them on LottieFiles). Use one only when its author, source URL and licence are clear; otherwise make it ourselves.

## NEVER
- **No decorative objects**: a piece that does not stand for part of the mechanism is noise; the operator rejected decorative 3D props.
- **No stock text on any asset**: Cyrillic labels, handwriting or brand marks on a scan or texture break "everything printed is real data".
- **No finish that contradicts the meaning**: a security prop with rust reads as broken ("looks like a rusted toolbox"); wear only when wear is the point.
- **No bare numbers**: a number lives in its source document or as the reading or output of an object in the scene (counter, dial, display, printed strip), never as a figure on a card standing in for the mechanism. Ep01's rendered "math board" was rejected as fake.
- No image-model text, numbers or code.
- No look rule copied from a direction the episode does not use.
