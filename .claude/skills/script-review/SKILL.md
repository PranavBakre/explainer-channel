---
name: script-review
description: Gate an explainer script before storyboarding with an independent review by a different model (Codex) — rubric scores, a fact-check table against the VERIFIED fact sheet, a TTS proofread and prior-finding closure. Use after every script draft or revision, when a reviewer must check accuracy or claim scope, or when re-reviewing after fixes.
---

# Script review (gate)

Pass = every rubric row ≥ 3, no fact mismatch or overbroad claim, every prior blocker closed, the cold listener at or above its bar with every click-away dispositioned (§3a), and the ten-rule notes present with their adopted items done (§3b). The whole gate runs before the voice is recorded. The round count never waives a failure.

## 1. Run it with a different model
The reviewer's model family must differ from the author's: Claude wrote it → Codex (GPT) reviews; Codex wrote it → Claude or an opencode non-OpenAI model reviews. Pin the inputs: the recipe hashes them immediately before it launches the reviewer and puts the hashes at the top of the review; if a file on disk no longer matches its hash before you act on the verdict, the review is void.
```
OUT=episodes/<ep>/reviews/script-r<r>-codex-$(date +%H%M%S)-$RANDOM.md
H=$(shasum -a 256 episodes/<ep>/script.md episodes/<ep>/factsheet.md)   # right before launch; re-run it if any input changes after this point
codex exec -m gpt-6.1-sol -c model_reasoning_effort='"high"' --skip-git-repo-check -s workspace-write -C <repo> \
  "Review episodes/<ep>/script.md using .claude/skills/script-review/SKILL.md §2–3b. Read factsheet.md, \
brief.md and the reference study it names for the opening, docs/my-writing-style.md §5–6, LEARNINGS.md 'Operator feedback' sections and <previous review file, or 'none' in round 1>. \
Do not run the §3a cold listener yourself. Write the complete review to $OUT, starting with these input hashes verbatim: $H. \
Write only $OUT and touch no other file. Print only DONE." < /dev/null
```
Without the last two sentences Codex ran an uncalibrated listener of its own inside ep03 r1 and appended a section to `LEARNINGS.md` in r4; with them it left the file alone (rounds 5–6, checked with `cmp`).
- **Read the review only from `$OUT`, never from stdout.** The operator's global Codex Stop hook adds unrelated text to what `codex exec` prints ("No Dumbledore memory lesson added.", "Dumbledore memory lesson …") and replaces its last message, so stdout says nothing about the review, not even whether it finished; `> file` would capture the hook's text. Hence workspace-write and a named file.
- **`< /dev/null`**: an open stdin stalled `codex exec` for 20 minutes.
- **Unique path per attempt**: a slow first run once interleaved into its retry's file.
- **Check completeness** against the schema for the round (§5): full review = rubric, fact table, prior findings, ten-rule notes check, verdict; closure check = each open blocker and changed line with closed/open, carried-forward scores, verdict. Then compare the hashes at the report's top with `shasum -a 256` of the same files now. A report is complete only if it passes both; otherwise rerun to a new path (hash step included) and never merge partials.
- **One review at a time** (`AGENTS.md`, Machine): the rubric review, then the Codex fact table where the route has one, then the cold listener (§3a), each launched only after the previous one's file has passed the completeness check.
- **Reviewer routing** (author family → reviewer, in order; none available → the gate stays closed and you tell the operator):
  | Author | 1st | 2nd |
  |---|---|---|
  | Claude | Codex (above) | `opencode run` with a Cerebras or NVIDIA model |
  | OpenAI/Codex | Claude (below) | `opencode run` with a Cerebras or NVIDIA model |
  | Any other family (DeepSeek, …) | `opencode run` with `opencode-go/glm-5.3` (below) for the rubric review and the cold listener, plus the Codex fact table (below), which alone scores the Accuracy row | Claude (below), with the same Codex fact table |
  The author's family is the model named at the top of `script.md` (every agent writes the model it runs as there). Every route keeps the same prompt, input hashes, unique `$OUT` and completeness check, and writes the reviewer model at the top of the file.
- **opencode as reviewer** (DeepSeek author): same prompt, inputs and hashes, run from the repo root; `--auto` lets it write `$OUT` itself:
  `opencode run --auto -m opencode-go/glm-5.3 --title "<ep> script r<r>" "<same prompt>" < /dev/null` (name `$OUT` …`-glm-…`; about 11 minutes). Calibrated 2026-11-14 on ep02 (`research/reviewer-calibration-2026-11-15.md` (not in repo); passed the final script; failed a copy carrying the round-1 lines, but caught 4 of its 7 blockers and rated three overstated lines a match, including F14's "SHALL NOT be considered phishing-resistant" told as "no code counts as protection"), so it does not gate accuracy: also run the **Codex fact table**, the recipe above (hash step included) with the prompt narrowed to §3 item 1 and the Accuracy row (`$OUT` …`-facts-codex-…`), and take Accuracy from it. On ep03 r1 it found one accuracy fault where Codex found fourteen. `kimi-k3.1-pro` missed the same three and is untested on a passing script; Claude is the fallback. GLM-5.3 cannot read images. "OpenCode Go usage limit reached" ends this route (`AGENTS.md`, Reviews): stop it, never turn on extra usage, and go to Claude.
- **Claude as reviewer**: same prompt, inputs and hashes through Claude, which prints to stdout without the Codex hook:
  `claude -p --model claude-opus-5-5 "<same prompt, ending: print the complete review>" < /dev/null > $OUT` (name `$OUT` …`-claude-…`). OpenAI-authored and Claude down → `opencode run` with a Cerebras or NVIDIA model (OpenAI OAuth expired once). Record the reviewer model at the top of the file.

## 2. Rubric (1–5; quote the line for anything below 4)
| Row | 5 looks like |
|---|---|
| Hook | First 10 s state the stakes for the viewer and open a question a stranger wants answered, built on the episode's strongest payoff number or contrast as one concrete case (ep01's aim: "under a minute, or twelve years: depends on a choice an engineer made before you signed up"), opened as the brief's format requires (`script-writing` §2). No greeting, and no hedge or qualifier phrase anywhere in the first 30 s. Quote our first 10 s beside the first 10 s of the reference video the brief chose and say which one a stranger would keep watching, and why. Score ≤ 2 if a stronger fact or the payoff contrast appears later in the first minute, if the opening is a premise with no question, or if the reference opening wins |
| Architecture | Matches a template in `docs/research/Script flow teardown.md`; every beat has a job |
| Open loops | Each planted loop closes; a new one opens before each section ends |
| Explanation | Concrete before abstract; each term defined once, in plain words, at or before first use for the brief's viewer (score ≤ 2 if the hook or any line uses a term cold); one running example, and the last act gives its verdict under the final design; each mechanism asked for by the story, each act's objection voiced, no fact for the other side of the counter (`script-writing` §2–3) |
| Accuracy | Every factual sentence and `> on-screen` note maps to a VERIFIED fact with the same scope |
| Voice | `docs/my-writing-style.md` §§5–6; no banned phrases. Counted, with the lines quoted and their times: a light line, take or human moment at least every 60 to 90 s (`script-writing` §2), including a take closing every section (rule 9) and about one deadpan line per two minutes (rule 11). A gap over 90 s, or a missing section take, scores ≤ 2; a script with nothing banned and nothing said is not a pass |
| Ear | One breath per sentence; spoken forms per §3; no visual-only references without a cue; at most one new number per paragraph; no list longer than three; scope named as a case, never hedged ("at the tested setting"). Quote every **stacked qualifier** (two condition phrases in one line, or a condition repeated on later lines after the case was named) and every qualifier in the first 30 s; each is a finding, and three or more score ≤ 2. The fix is to say the fact plainly once and move the qualifier to the source label or description, never to drop the fact's scope (Accuracy still applies) |
| Pace | Length 6 to 8 minutes at 145 wpm unless the brief gives a written reason for longer (score ≤ 2 otherwise); words within ±10 % of budget; spoken numbers within the soft ceiling of two new ones per minute (`script-writing` §2; list each minute over it with its numbers quoted); one number per point, related comparisons collapsed into one contrast, side topics moved to the description list; no stretch > 2 min without a re-hook; every part counted or named aloud as it starts; nothing after the running example's resolution (`script-writing` §2) except "what do I do" and the ending. Score ≤ 2 if the cold listener (§3a) stops before the ending and that stretch is unchanged |
| Ending | Pays off the opening; no board restated, no list (`script-writing` §2); then one action; no slogan |
| Policy | Original angle and take; nothing templated |

## 3. Also produce
1. **Fact table**: claim (quoted) · fact id · match / overbroad / mismatch / missing. Scope is where ep01 failed four rounds: "every short password" for a benchmark of 8-character lowercase-plus-digit passwords; "should not" for NIST "SHALL NOT"; "they admitted ECB" for a researcher's inference. Also check any front-loaded answer (`script-writing` §2) against the fact sheet: an answer with no VERIFIED source blocks the script. Any line that leans on another episode ("last episode", "like last time", "again") or teases the next one is a blocking finding (`script-writing` §2; operator, 2026-11-15).
2. **Prior findings**: each earlier blocker → closed / open, with the line.
3. **Proofread**: typos, grammar, TTS hazards with the spoken fix.
4. **Term ledger**: every technical term, product, organisation, abbreviation and database word in order of first use, each marked explained-before-use or cold, judged as the brief's Viewer hearing it once. A cold term is a blocking finding. Two rounds of the ep01 redo passed with MD5 in the first sentence because the reviewer was never given the viewer.
5. **Click-away list**: the three places a viewer watching to learn and be entertained would leave (scene, line, why), then the **top 3 changes** for retention.
6. **Verdict**: PASS or FAIL with blocking rows.

## 3a. Cold listener (same gate, separate run)
The rubric reviewer knows the brief and the template, so it never asks "would I keep listening". Run a second reviewer that gets only the narration: no brief, fact sheet, script notes or rubric.
```
D=$(mktemp -d /tmp/coldscript.XXXX)
# right before launch, regenerate narration.txt from the final script.md: spoken lines in order, [m:ss] per scene at 145 wpm (`script-writing` §2)
python3 - episodes/<ep>/script.md > $D/narration.txt <<'EOF'
import re,sys
t=0
for body in re.findall(r'^## S\d\d — .*?\n(.*?)(?=^## |\Z)',open(sys.argv[1]).read(),re.M|re.S):
    print(f'[{int(t//60)}:{int(t%60):02d}]')
    for l in (re.sub(r'\s*\[[^\]]*\]','',l).strip() for l in body.split('\n')):
        if l and not l.startswith(('>','---','|','#')): print(l); t+=len(l.split())*60/145
    print()
EOF
H=$(shasum -a 256 episodes/<ep>/script.md $D/narration.txt)   # re-run both steps if script.md changes after this point
codex exec -m gpt-6.1-sol -c model_reasoning_effort='"high"' --skip-git-repo-check -s workspace-write -C $D "You are a YouTube viewer who watches explainers to learn and to be entertained. You use apps every day, you are not a programmer, and you know nothing about how this video was made. narration.txt in this folder is everything the narrator of one video says, in order; each bracketed time is roughly when that part starts. You hear it once, at speaking speed, and cannot re-read. Write viewer.md with: (1) would you finish it, and would you subscribe; (2) the three places you would click away (time, the line quoted, why); (3) every stretch that makes a point you already had, or delays the thing you are waiting for (time, lines quoted, what you were waiting for); (4) the three stretches you would skip if you could, ranked, quoted; (5) questions it raised and never answered; (6) what you would tell a friend it said, in two sentences; (7) what does this change for you if <X>?; (8) scores 1-5, one line of reason each: Hook (still listening at 0:30?), Clarity (could you retell it?), Patience (read aloud at full speed, where did you run out of patience? 5 = never), Payoff (did the ending pay what the opening promised?), Change (does (7) have a concrete answer you could act on?), Overall. No praise, no production advice, no rewriting. Print only DONE." < /dev/null
{ echo "Inputs: $H"; cat $D/viewer.md; } > episodes/<ep>/reviews/listener-r<r>-codex.md
```
The listener never sees the hashes; the copy adds them, and the report counts only when its `script.md` hash equals the file on disk (§1). Launch it only after the rubric review and fact table have finished (§1). Routing as §1. DeepSeek author: `cd $D && opencode run --auto -m opencode-go/glm-5.3 --title "<ep> listener r<r>" "<same prompt>" < /dev/null`, then the same copy to `listener-r<r>-glm.md`; not yet calibrated as a listener, so calibrate it before trusting its scores.
Swap the viewer sentence for the brief's Viewer and `<X>` for the brief's promise in the viewer's words ("I switch to a passkey"). **Pass bar:** every score ≥ 3 and Overall ≥ 4 (a judge rarely gives top marks; the GrowthX studio lowered its bar to 8/10, `research/study-youtube-video-creation.md` (not in repo) §3); below it the script goes back to `script-writing`. Before its first use, and after any change to the prompt, calibrate it once as `video-qa` §4 says. Disposition every click-away and every removable stretch in writing before the voice is recorded: cut, compress, or keep with the job it does. Asked "what could be removed" it listed every dated example and the scenario, so the prompt makes it rank three. A kept line needs its Template job named; "the template asks for it" alone is not one when the listener left there. The operator sees the dispositions with the draft (in `HANDOFF.md` when no operator is in the session). On the ep01 redo this pass ran only on the finished render: three slow stretches (a second breach detail, a second prediction exercise, a late company example) cost a re-voice, rebuild and an hour's render each time, and all three were visible in the narration alone. On ep02 it ran after the narration was frozen, so its click-aways (1:02, 3:52, 6:17) could only be accepted. On ep03 it ran, but the FIDO survey before the three ways, flagged by listeners r3, r4 and r6, was compressed and kept; the video's cold viewer left there first (2:16), then at the relay retold in door one (2:49) and at the door the sources could not close (4:22). A stretch flagged twice is cut or moved, not compressed again. Its unanswered questions are the best list of what to add; ep03's doors now end on what the sources let the viewer do. It also mishears metaphors ("two matching keys" heard as two copies; a secret stamp and its checking imprint fixed it), so a metaphor that confuses it changes before the storyboard draws it.

## 3b. Ten-rule notes (check only)
The writer's ten-rule notes (`script-writing` §2) are in `script.md`'s header. Check only that they exist and that the script does what they say it adopts; never judge the script against a rule the writer set aside. The rules are an entertainment-first studio's advice, candidates for a learning-first channel, not a standard (operator, 2026-11-13).

## 4. Reconcile before fixing
Operator decisions override reviewer advice. Pronunciation follows the latest LEARNINGS "Operator feedback": a reviewer suggesting "S H A" or "at sign" is stale; reject it and note why. A reviewer claim from its own outside knowledge (not the fact sheet) is a research task for `episode-research`, not an edit.

## 5. Rounds
Fix, then re-review with the previous review attached. From round 3, ask for a focused closure check (open blockers + changed lines, earlier row scores carried forward unless a changed line touches them) instead of a full review. After round 3 with a blocker still open, tell the operator what is stuck and why; keep the gate closed. Ep01 passed accuracy only at round 5.

## NEVER
- Never let the author's own model family gate its script; it misses its own overstatements.
- Never pass on style while an accuracy row or fact row is failing.
- Never let a reviewer verify facts from memory; matches are against `factsheet.md` only.
