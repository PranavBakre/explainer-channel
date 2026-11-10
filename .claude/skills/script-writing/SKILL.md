---
name: script-writing
description: Write or revise the narration script (script.md) for a long-form explainer from the fact sheet and brief — architecture choice, word budget, spoken-form writing for Kokoro TTS, fact tags and on-screen notes. Use when drafting a script, rewriting scenes after a script-review or visual review, changing a claim, or fixing a line the TTS mispronounces.
---

# Script writing

Inputs: `factsheet.md` (VERIFIED facts only), `brief.md`, `docs/my-writing-style.md` §§5–6 (binding). Output: `episodes/<ep>/script.md`.

## 1. Pick the architecture
Read only the chosen template's section of `docs/research/Script flow teardown.md` (its beat sheet and example videos), not the whole file.
| Topic type | Template |
|---|---|
| Concept explainer | Problem chain: naive way → where it breaks → the fix → where *that* breaks … |
| Incident, known cause | Primer-before-failure |
| Incident, cause hunted | Detective investigation |
| How a big system works | Scale tension + numbered mechanisms |
| What if X failed | Timeline scenario + reality check |
Pick by topic first. Rotating templates across episodes is a house preference against looking templated; it does not make an episode original. Originality is the angle and the take, judged in review.

## 2. Budget
Kokoro at the channel speed narrates about 150 wpm including pauses (ep01: 1,545 words → 10:28), so 10 min ≈ 1,450–1,550 words. Write a beat table first: beat · job · % runtime · word budget · open loop planted/closed · take · light line. Re-hook every 60–120 s by opening the next question, not by announcing it.

The table must show, before any prose is written:
- **Hook (first 10 s):** the fact sheet's most startling hook candidate, told as one concrete case, then the question. Ep01 opened on a calm statement and reached its graphics-card fact at 0:37.
- **A take closing every section** (style guide rule 9) and **one deadpan line per two minutes** (rule 11). Ep01 had neither for ten minutes and read as a fact-check, not a narrator.
- **The running example's verdict** in the last act: what the final design means for that exact example, from a computed fact. Ep01 carried `mango@123` for ten minutes and never said how long it would last.

## 3. Writing rules beyond the style guide
- **The script is the TTS input.** Write every line exactly as spoken; on-screen text and captions get the written form from `voice/written.json`. Never fix pronunciation with a hidden lexicon: the script, the review and the audio then disagree.
  - Initialisms: spaced letters ("N I S T", "M D five"), **except a lone letter A**, which Kokoro reads as the article "uh": write it fused ("SHA two fifty-six", never "S H A").
  - Symbols and names as said, in the operator's form (ep01: "@" → "at the rate", not "at sign").
  - Article + noun pairs can fuse into another word ("a salt" → "assault"); reword ("That string is the salt").
  - Letter-name runs ("A to F") stay ambiguous after respelling; reword instead ("a jumble of digits and letters").
- **Claims keep their source's scope.** Teasers, comparisons and recaps inherit the exact conditions of their fact (charset, length, hardware, date, "SHALL NOT" vs "should not"). An accurate payoff does not repair an overbroad tease.
- **Keep scope by naming the case, not by hedging.** Say the conditions once as plain nouns ("one RTX 4090, every eight-character password of lowercase letters and digits, seventeen seconds"). Phrases that point at a condition without saying it ("in some of those formats", "at the tested setting", "in a common library's format") are reviewer language: name the thing, or move the condition to the `> on-screen` source label.
- One running example (a person, a password, a payment) carried through the whole episode; return to it whenever a new term appears.
- One rounded number per idea, spoken as words, and at most one new number per paragraph. When a source gives competing counts (accounts, records, active users), speak the one that answers the episode's question and put the rest on screen.
- A list of rules (a standard, a guideline) is at most three spoken items, each told as what happens to the running example, not read out as clauses.
- Define jargon once in ≤8 words.

## 4. Format
```
## S<nn> — <beat name>
One narration line per paragraph (one or two sentences: each becomes a beat). [F<n>]
> on-screen: <exact text or number that must appear, with its fact id>
```
`tools/sync-storyboard-vo.py` reads these paragraphs and strips `[F<n>]` tags; keep one paragraph per storyboard beat.

## 5. Revising after a review
1. List every changed claim, number or term.
2. `rg -n "<old wording or value>" episodes/<ep> video/src tools/lottie` and update every hit in the same change: storyboard or segment props, TSX literals in `video/src/segments/**` (ep01's recap hard-coded a ciphertext), Lottie generators, `voice/written.json`. Narration sync does not touch on-screen props (ep01 kept "every short password" in visuals after the script was fixed).
3. Send the diff and the changed-claim list to `script-review`; only a passing script is voiced.
4. Then re-voice with `voice-narration` §6 (it branches on no storyboard / single storyboard / segments) and re-run `video-qa` on the affected shots. Earlier video and package passes are void for anything these inputs feed.

## NEVER
- Never use a fact that is UNVERIFIED or missing from the sheet; add it via `episode-research` first.
- Never write signposted reveals or slogans: "the catch is", "here's the thing", "it turns out", "what if I told you", "that's the whole game"; the style guide's own rule became a tic in ep01.
- Never open with a greeting or "let's dive in"; the first sentence is the surprise or the verdict.
- Never reference visuals the viewer may not see ("as you can see") without a storyboard cue.
- Never end on "smash that like"; end on what the viewer now knows and one thing they can do.
