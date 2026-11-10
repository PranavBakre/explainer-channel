---
name: script-review
description: Gate an explainer script before storyboarding with an independent review by a different model (Codex) — rubric scores, a fact-check table against the VERIFIED fact sheet, a TTS proofread and prior-finding closure. Use after every script draft or revision, when a reviewer must check accuracy or claim scope, or when re-reviewing after fixes.
---

# Script review (gate)

Pass = every rubric row ≥ 3, no fact mismatch or overbroad claim, every prior blocker closed. The round count never waives a failure.

## 1. Run it with a different model
The reviewer's model family must differ from the author's: Claude wrote it → Codex (GPT) reviews; Codex wrote it → Claude or an opencode non-OpenAI model reviews. Pin the inputs: `shasum -a 256 episodes/<ep>/script.md episodes/<ep>/factsheet.md` goes at the top of the review; if either hash changes before you act on the verdict, the review is void.
```
OUT=episodes/<ep>/reviews/script-r<r>-codex-$(date +%H%M%S)-$RANDOM.md
codex exec -m gpt-6.1-sol -c model_reasoning_effort='"high"' --skip-git-repo-check -s workspace-write -C <repo> \
  "Review episodes/<ep>/script.md using .claude/skills/script-review/SKILL.md §2–3. Read factsheet.md, \
docs/my-writing-style.md §5–6, LEARNINGS.md 'Operator feedback' sections and <previous review file, or 'none' in round 1>. \
Write the complete review to $OUT; print only DONE." < /dev/null
```
- **Named file, workspace-write.** `> file` captures only the last message, and the operator's global Codex Stop hook replaces it.
- **`< /dev/null`**: an open stdin stalled `codex exec` for 20 minutes.
- **Unique path per attempt**: a slow first run once interleaved into its retry's file.
- **Check completeness** against the schema for the round (§5): full review = rubric, fact table, prior findings, verdict; closure check = each open blocker and changed line with closed/open, carried-forward scores, verdict. Incomplete → rerun to a new path; never merge partials.
- **Reviewer routing** (author family → reviewer, in order; none available → the gate stays closed and you tell the operator):
  | Author | 1st | 2nd |
  |---|---|---|
  | Claude | Codex (above) | `opencode run` with a Cerebras or NVIDIA model |
  | OpenAI/Codex | Claude (below) | `opencode run` with a Cerebras or NVIDIA model |
  Every route keeps the same prompt, input hashes, unique `$OUT` and completeness check, and writes the reviewer model at the top of the file.
- **Claude as reviewer**: same prompt, inputs and hashes through Claude, which prints to stdout without the Codex hook:
  `claude -p --model claude-opus-5-5 "<same prompt, ending: print the complete review>" < /dev/null > $OUT` (name `$OUT` …`-claude-…`). OpenAI-authored and Claude down → `opencode run` with a Cerebras or NVIDIA model (OpenAI OAuth expired once). Record the reviewer model at the top of the file.

## 2. Rubric (1–5; quote the line for anything below 4)
| Row | 5 looks like |
|---|---|
| Hook | First 10 s give the episode's most startling fact as one concrete case, then the question; no greeting, no hedge phrase. Score ≤ 2 if a stronger fact appears later in the first minute |
| Architecture | Matches a template in `docs/research/Script flow teardown.md`; every beat has a job |
| Open loops | Each planted loop closes; a new one opens before each section ends |
| Explanation | Concrete before abstract; each term defined once; one running example, and the last act gives its verdict under the final design |
| Accuracy | Every factual sentence and `> on-screen` note maps to a VERIFIED fact with the same scope |
| Voice | `docs/my-writing-style.md` §§5–6; no banned phrases. Counted, with the lines quoted: a take closes every section (rule 9) and one deadpan line per two minutes (rule 11). Missing either scores ≤ 2; a script with nothing banned and nothing said is not a pass |
| Ear | One breath per sentence; spoken forms per §3; no visual-only references without a cue; at most one new number per paragraph; no list longer than three; scope named as a case, never hedged ("at the tested setting") |
| Pace | Words within ±10 % of budget; no stretch > 2 min without a re-hook |
| Ending | What they now know + one action; no slogan |
| Policy | Original angle and take; nothing templated |

## 3. Also produce
1. **Fact table**: claim (quoted) · fact id · match / overbroad / mismatch / missing. Scope is where ep01 failed four rounds: "every short password" for a benchmark of 8-character lowercase-plus-digit passwords; "should not" for NIST "SHALL NOT"; "they admitted ECB" for a researcher's inference.
2. **Prior findings**: each earlier blocker → closed / open, with the line.
3. **Proofread**: typos, grammar, TTS hazards with the spoken fix.
4. **Click-away list**: the three places a viewer watching to learn and be entertained would leave (scene, line, why), then the **top 3 changes** for retention.
5. **Verdict**: PASS or FAIL with blocking rows.

## 4. Reconcile before fixing
Operator decisions override reviewer advice. Pronunciation follows the latest LEARNINGS "Operator feedback": a reviewer suggesting "S H A" or "at sign" is stale; reject it and note why. A reviewer claim from its own outside knowledge (not the fact sheet) is a research task for `episode-research`, not an edit.

## 5. Rounds
Fix, then re-review with the previous review attached. From round 3, ask for a focused closure check (open blockers + changed lines, earlier row scores carried forward unless a changed line touches them) instead of a full review. After round 3 with a blocker still open, tell the operator what is stuck and why; keep the gate closed. Ep01 passed accuracy only at round 5.

## NEVER
- Never let the author's own model family gate its script; it misses its own overstatements.
- Never pass on style while an accuracy row or fact row is failing.
- Never let a reviewer verify facts from memory; matches are against `factsheet.md` only.
