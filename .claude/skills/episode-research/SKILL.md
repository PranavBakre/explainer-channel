---
name: episode-research
description: Build and maintain the sourced fact sheet (factsheet.md) for an explainer episode — primary sources, VERIFIED/UNVERIFIED status, claim scope, computed figures, misconceptions and a do-not-say list. Use when starting research on an approved episode topic, when a script or review needs a new fact, when a reviewer flags an unsourced or overbroad claim, or when an on-screen number must be traced to a source.
---

# Episode research

Output: `episodes/<ep>/factsheet.md`. Script, storyboard, on-screen props and the description may only use **VERIFIED** facts from it.

Start only after the topic is approved (`docs/season-*.md` or the operator's pick in `episode-brief`). Write the one question the video answers first; a fact that does not serve it stays out.

## Fact format (stable IDs — never renumber)
```
**F<n>. <script-ready claim, exactly as narrow as the source>**
- Figure: <exact number + unit> · Scope: <population, date, conditions, normative strength>
- Source: <title> — <URL> (opened <date>) · Quote: "<the sentence that says it>"
- VERIFIED | VERIFIED (computed: <command>) | UNVERIFIED (<why: secondary only, paywalled, author's own inference>)
```
An attribution can be VERIFIED: "Researchers at <named source> concluded the passwords were encrypted with ECB" is VERIFIED if that source says so; "Adobe used ECB" is not. Your own reasoning from facts is never a fact; put it in the script as explanation, labelled as such, or cut it.
Scope is a first-class field. The costly ep01 failures were all scope, not falsehood: a benchmark for 8-character lowercase-plus-digit passwords narrated as "every short password"; NIST "SHALL NOT" softened to "should not"; a researcher's inference ("allegedly ECB") presented as the company's admission.

## Source order
Standard or spec text → original paper or tool output → the company's or regulator's own statement → contemporaneous named press → everything else (UNVERIFIED unless it quotes a primary you then open).

## Compute instead of quoting
Hashes, ciphertexts, keyspaces, percentages and durations shown on screen are computed locally; paste the exact command and parameters (key, IV, mode, rate, rounding) under the fact so any later shot can recompute the same value. Randomised outputs (a salted Argon2 hash) are reproducible only from the saved salt: store the salt, or mark the value as one example run and never compare its bytes across shots.

## When the script needs something the sheet lacks
1. Find and open a primary → append a new `F<n>` (next free number).
2. Only someone else's inference is available → append it as a VERIFIED attribution to that person, and the script must attribute it ("researchers think…").
3. Neither → narrow the claim to what an existing fact supports, or cut it.
**Sources disagree or a newer one supersedes:** keep the ID, add both sources with dates, state which wins and why (newer data, primary over secondary); if it cannot be settled, mark UNVERIFIED and narrow the claim to what both support.

When a fact changes, run the revision sweep in `script-writing` §5; it covers props, TSX literals, Lottie, voice, captions and the description.

## Also write
- **Misconceptions** (3–5): the wrong belief, who holds it, the fact that corrects it.
- **Hook candidates** (2–3): VERIFIED facts that startle as one concrete case whose whole scope fits in one spoken sentence. A fact that needs a qualifier clause to stay true is not a hook.
- **Running-example verdict**: once the script's example is chosen, compute what the final design means for that exact example (ep01: how long `mango@123` survives each hash) and record it as a fact with its command.
- **Do not say**: tempting claims that are wrong, outdated, out of scope, or need a qualifier, each with the reason.

## NEVER
- Never round a figure so its meaning changes; keep the exact figure here and say "about" in the script.
- Never let a benchmark stand in for history ("GPUs crack it in an hour" when the source measured one card, one mode, one charset).
- Never cite a page you did not open; never mark VERIFIED from a search snippet.
- Never let a number on a prop or recap differ from its fact or computation; the same value must read identically in every shot.
