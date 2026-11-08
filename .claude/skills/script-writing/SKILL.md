---
name: script-writing
description: Write the narration script for a long-form explainer from the fact sheet and brief, using the beat-sheet templates and the creator's voice guide. Use when drafting or rewriting a script, or when a review asks for structural changes.
---

# Script writing

Inputs: `factsheet.md`, `brief.md`. Output: `episodes/<ep>/script.md`.

## 1. Pick the architecture (from `docs/research/Script flow teardown.md`)
| Topic type | Template |
|---|---|
| Concept explainer | Problem chain: naive way → where it breaks → the fix → where *that* breaks … |
| Incident, known cause | Primer-before-failure |
| Incident, cause hunted | Detective investigation |
| How a big system works | Scale tension + numbered mechanisms |
| What if X failed | Timeline scenario + reality check |
Rotate templates across episodes so the channel never looks templated (YouTube "inauthentic content").

## 2. Budget
150–160 wpm → 10 min ≈ 1,500–1,600 words. Write a beat table first: beat, job, % runtime, word budget, open loop planted/closed.

## 3. Rules (binding; from `docs/my-writing-style.md` §5)
- First sentence: the surprise or the verdict. No greeting, no "let's dive in".
- Misconception first: voice the wrong belief, show why it fails, then the right idea.
- One scenario carried through the whole video; return to it when a new term appears.
- Real names, one rounded number per idea, said as spoken ("thirty-two million").
- Define jargon once, in ≤8 words, the first time.
- Sentences 6–14 words mostly; one breath each. Max three items per list, as plain sentences.
- Trade-offs shown as concrete consequences, never signposted.
- Banned: "the catch is", "here's the thing", "it turns out", "what if I told you", "that's the whole game", "game-changer", "seamless", "robust", "delve", "unlock", slogan endings, stacked rhetorical questions.
- Re-hook every 60–120 s by opening the next question, not by announcing it.
- End: what the viewer now knows, one thing they can do, no "smash that like".

## 4. Format
Each scene: `## S<nn> — <beat name>` then narration paragraphs, then an `> on-screen:` note for any text/number that must appear. Facts carry a `[F<n>]` tag matching the fact sheet; strip tags before TTS.

## 5. Before handing to review
Read aloud (or TTS one scene). Count words per scene against budget. Then run `script-review`.
