---
name: script-review
description: Independently review, fact-check and proofread an explainer script before storyboarding, scoring it on a fixed rubric. Use after every script draft; the reviewer must be a different model than the author (codex exec or opencode run).
---

# Script review (gate)

Output: `episodes/<ep>/reviews/script-<round>-<reviewer>.md`. Pass = every row ≥ 3 and no fact errors.

## Run it with a different model
```
codex exec --skip-git-repo-check -s read-only -C <repo> \
  "Use .claude/skills/script-review/SKILL.md to review episodes/<ep>/script.md. Write nothing; print the review." > episodes/<ep>/reviews/script-r1-codex.md
```
Author model fixes, then re-review until pass or three rounds.

## Rubric (score 1–5, quote the line for anything below 4)
| Row | 5 looks like |
|---|---|
| Hook | First 15 s states a surprise/misconception and the question; no greeting |
| Architecture | Matches a template in `docs/research/Script flow teardown.md`; every beat has a job |
| Open loops | Each planted loop closes; a new one opens before each section ends |
| Explanation | Concrete before abstract; each term defined once; one running scenario |
| Accuracy | Every claim traces to a VERIFIED fact-sheet line; numbers match exactly |
| Voice | Follows `docs/my-writing-style.md` §5; no banned phrases |
| Ear | Sentences sayable in one breath; numbers written as spoken; no visual-only references ("as you can see") without a storyboard cue |
| Pace | Word count within ±10 % of budget; no section > 2 min without a re-hook |
| Ending | Recap of what they now know + one action; no slogan closer |
| Policy | Original angle and take; nothing that reads as templated or mass-produced |

## Also produce
1. **Fact check table**: claim · fact-sheet id · match / mismatch / missing.
2. **Proofread list**: typos, grammar, TTS hazards (acronyms, numbers, symbols, homographs like "read", "live", "lead") with the spoken fix.
3. **Top 3 changes** that would most improve retention.
