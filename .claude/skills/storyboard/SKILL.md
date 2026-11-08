---
name: storyboard
description: Turn an approved script into a scene-by-scene storyboard with visuals, on-screen text, motion, transitions and sound cues, plus the machine-readable storyboard.json the Remotion build consumes. Use after script-review passes.
---

# Storyboard

Outputs: `episodes/<ep>/storyboard.md` (human) and `storyboard.json` (build input).

## Order of work
1. **Voice first.** Synthesize narration per line (`voice-narration`) so durations are real; the storyboard is timed to the voice, not guessed.
2. **One row per narration line** (a beat inside a scene). Columns:
   `id · VO line · duration · shot type · visual (what is on screen, built how) · on-screen text · motion/easing · transition in · SFX/music · fact id`
3. **Shot types** come from the brief (§9). Change the visual every 3–8 s inside a scene; never hold a static frame > 10 s.
4. **Transitions** are part of meaning: `cut` (same idea continues), `push` (next step in a chain), `zoom-in` (go inside a mechanism), `wipe` (new act), `match` (same object transforms). State the transition for every scene boundary and why.
5. **Text on screen**: ≤ 7 words per card, ≥ 48 px at 1080p, inside 90 % title-safe, never in the bottom 15 % (captions/controls on mobile).
6. **Colour script** per act from the brief.
7. **Sound**: music bed per act with level, SFX on reveals only (≤ 1 per 10 s).

## storyboard.json shape
```json
{"fps":30,"width":1920,"height":1080,"voice":"af_heart",
 "scenes":[{"id":"S01","act":1,"transitionIn":"cut",
   "beats":[{"id":"S01_01","vo":"…","visual":"Headline","props":{…}}]}]}
```
Each `visual` must be a component name exported from `video/src/components`. Add a component before using a new visual name.

## Check before build
Every VO line has a visual; every fact-tagged line shows its source on screen or in the description; transitions listed for every boundary.
