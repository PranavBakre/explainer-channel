> Frozen 2026-11-24: no new grading rounds; judge skills by the videos they produce (video-qa ratchet, retention). Model: claude-opus-5-5. Reason: `docs/reviews/2026-11-24-video-quality-review.md` §7.

# Round 6 (2026-11-10, video-qa only)

**video-qa: 110/120 (91.7%) · A**, up **3** from Round 5's 107/120 · B. The reviewer exit-status defect is fixed and the Claude image-review invocation now exists. Frame-completeness validation remains weaker than advertised, and one outage branch conflicts with author-family independence. An aggregate A does not waive those issues or certify a rendered episode.

Applied only the rubric at `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md`: D1 20; D2–D6 15 each; D7 10; D8 15; A ≥108. Read the complete current 76-line skill and its actual spatial/alignment helpers, and rechecked Round 5's findings against the working tree at HEAD `eb0ca024093b15189916c68b858a464a05389893` (including uncommitted changes). Pattern: **Tool + Process**. Approximate **E:A:R 90:10:0**: grain-resistant detection, rendered-ink measurement, cross-shot literals and cold-viewer failures are expert/local knowledge; routine inspection is brief activation. Junior recall ran against a disposable SQLite backup after the original refused writes; no project-specific grading override emerged. Skill-local `SKILL.md:line` below means `.claude/skills/video-qa/SKILL.md:line`.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Grain-hidden holds, illegible phone captions and stale recurring values capture observed false passes; ordinary look/fix reminders remain activation (SKILL.md:21,37–42,63–66). |
| D2 Mindset + procedures | 14/15 | Mechanical, perceptual and cold-viewer checks compose into a meaningful gate; the outage selector still contradicts the independent-family rule (SKILL.md:45–59,68–71). |
| D3 Anti-pattern quality | 14/15 | Contact-sheet-only holds, desktop-only review and silent acceptance have concrete failure reasons; rejecting numeric mentions as frame coverage is still missing (SKILL.md:73–76; tools/review/second-look.sh:11). |
| D4 Specification | 15/15 | Valid name/frontmatter and a precise WHAT/WHEN description cover full renders, edited shots, automated checks, independent review and dispositioned reports (SKILL.md:1–4). |
| D5 Progressive disclosure | 14/15 | The self-contained skill separates episode/shot scope and supplies a reusable Claude route; adapting each review purpose's inputs and output remains manual (SKILL.md:44–59,61–68). |
| D6 Freedom calibration | 13/15 | Closed-gate verdicts, process-status preservation, stdin closure and trapped cleanup constrain fragile operations; substring coverage and ambiguous failover weaken those guarantees (SKILL.md:45–48,71; tools/review/second-look.sh:3–11). |
| D7 Pattern recognition | 9/10 | Automated evidence → visual judgment → per-shot repair → checksum invalidation is a coherent Tool/Process pattern; alternate reviewer routing remains less explicit than the primary path (SKILL.md:10–71). |
| D8 Practical usability | 12/15 | Controlled execution confirms failure propagation, basic omission detection and cleanup, and installed Claude help supports the fallback flags; numeric false passes and author-relative outage routing remain actionable gaps (SKILL.md:45–48; tools/review/second-look.sh:10–11). |

## Verified changes since Round 5

Ran the **actual** `tools/review/second-look.sh` with disposable FFmpeg/Codex stubs, never a real Codex subprocess. Fixtures were isolated under `/var/folders/j3/nz93hcxj55d26p8xbf9224r00000gn/T/round6-qray_x13`; no episode outputs changed.

- A complete two-frame review exits **0**. A reviewer printing both clean-frame lines then exiting **7** now makes the helper exit **7**, with no successful report emitted. This closes Round 5's process-failure masking (`tools/review/second-look.sh:3–4,10`).
- Requesting frames **0,12** but returning only `Frame 0: clean` exits **1** with `frame 12 missing from review`; an empty review also exits **1**. The new check detects ordinary omissions, subject to the false positives below (`tools/review/second-look.sh:11`).
- The reviewer receives EOF even when the caller supplies sentinel stdin. Scratch directories disappear after success, reviewer exit 7, incomplete/empty output, and frame-extraction exit **9** (`tools/review/second-look.sh:6–10`).
- The Claude route now explicitly reads absolute image paths, prints the complete review to a redirected report, closes stdin, and places the prompt before variadic `--allowedTools` (`.claude/skills/video-qa/SKILL.md:45–46`). Installed `claude --help` confirms `-p`, `--model` and variadic `--allowedTools`. This closes the missing-invocation gap for a **Codex-authored** video, without proving current model access or a successful live image review.

No real Codex invocation, live Claude image review, full render or episode publication verdict was performed. This is a focused skill re-grade; only this section is prepended, with the prior report preserved byte for byte.

## Remaining issues with repository evidence

1. **Frame coverage can still falsely pass.** `tools/review/second-look.sh:11` uses unanchored `grep -q "$f"`, so any matching digits count as a review of that frame. Fresh reproduction: requesting **1,10** and returning only **`Frame 10: clean`** exits **0**; requesting **0,12** and returning only **`Frame 0: label misaligned at (12, 20)`** also exits **0**. Frame 1 or 12 was never reviewed. This affects any episode/shot using the helper; it is not evidence that an existing saved review omitted frames. Require an explicit per-frame record format and validate exact frame identifiers, including clean records, rather than numeric substrings. Until then, the unconditional completeness promise at `.claude/skills/video-qa/SKILL.md:48` is not met in all cases, and manual verification remains necessary under line 59.
2. **Claude-author/Codex-down routing is contradictory.** `.claude/skills/video-qa/SKILL.md:45` first requires another model family, then says **“Codex built it, or Codex is down”** selects Claude. If Claude built the video and Codex is down, that second condition selects the author's own family. Line 47 only closes the gate when neither family is available, leaving this specific state unresolved. Make the selector author-relative: use an available independent family or explicitly leave §4 incomplete. The concrete Claude invocation at line 46 fixes execution for Codex authors; it does not resolve this outage branch. This affects the instructions for Claude-authored videos during a Codex outage, not a demonstrated failure of an existing episode review.

**Next refinements:** validate exact frame records; make unavailable-independent-reviewer handling explicit; give purpose-specific Claude substitutions for spatial, explanation and cold-viewer inputs/output, preserving the cold viewer's restricted context (`.claude/skills/video-qa/SKILL.md:45–59`). Retain the now-correct final PASS predicate and the scope boundary between shot checks and the episode gate (`.claude/skills/video-qa/SKILL.md:68–71`).

---

# Round 5 (2026-11-10, focused)

| Skill | Round 4 | Round 5 |
|---|---:|---:|
| episode-research | 113/120 · A | **113/120 · A** (carried forward) |
| episode-brief | 114/120 · A | **114/120 · A** (carried forward) |
| script-writing | 111/120 · A | **111/120 · A** (carried forward) |
| script-review | 107/120 · B | **112/120 · A** |
| storyboard | 108/120 · A | **114/120 · A** |
| voice-narration | 108/120 · A | **114/120 · A** |
| video-build | 113/120 · A | **113/120 · A** (carried forward) |
| video-qa | 106/120 · B | **107/120 · B** |
| package-review | 108/120 · A | **108/120 · A** (carried forward) |

**Eight skills reach A numerically; video-qa remains one point short.** Only script-review, storyboard, voice-narration and video-qa were re-graded. The other five totals are copied unchanged from Round 4, not freshly certified. The remaining critical issues affect video QA's reviewer execution: a failed spatial reviewer can still produce apparently successful evidence, and a Codex-built video's alternate-family route still lacks equivalent executable commands. These are procedure/tool findings, not a new review of any episode's finished video.

## Method and repository evidence

Applied the complete rubric in `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md`: **D1 20; D2–D6 15 each; D7 10; D8 15; A ≥108, B 96–107, C 84–95, D 72–83, F <72**. Read the four skills completely, their real helpers and consumers, the relevant style/architecture/learning references, and Round 4's findings. All four have valid names and WHAT/WHEN/keyword descriptions; their directories contain only `SKILL.md` (62/74/62/56 lines for script-review/video-qa/voice-narration/storyboard). D5 therefore rewards compact self-contained guidance and conditional handoffs, rather than demanding reference directories. Approximate E:A:R below distinguishes expert/local knowledge, useful activation and redundant basics. Junior recall used a disposable SQLite backup after the original rejected writes; it supplied no project-specific override.

Fresh checks ran in an isolated temporary tree (`/private/var/folders/j3/nz93hcxj55d26p8xbf9224r00000gn/T/round5-4qysu2vt`); episode files and production build outputs were read only:

- **Extraction:** actual `storyboard-lines.ts` extracted ep01's **86** saved lines identically from script alone, an existing storyboard, and `--from-script` (`tools/storyboard-lines.ts:10–26`).
- **Three narration states:** followed the no-board, single-board and segmented branches with changed wording. Real one-line Kokoro synthesis at `af_heart`, speed 0.86 produced a WAV and manifest entry, which replaced only the changed id. The skill's exact manifest command exited **1** for stale text and **0** after replacement. The no-board branch now correctly defers assembly; after supplying a board, that fixture also built successfully. Single-board and segment fixtures built immediately. The actual builder, copied into an isolated root, wrote premixed audio, timing, registration, captions and chapters; the actual Markdown generator also ran (`.claude/skills/voice-narration/SKILL.md:47–54`; `tools/build-episode.ts:15,46–82`).
- **Structural recovery:** insertion and deletion each made the real single-board sync or segment merge refuse the unedited structure. Deliberately editing/renumbering beats as instructed restored exact id/text equality in both branches (`.claude/skills/voice-narration/SKILL.md:56`; `tools/sync-storyboard-vo.py:17–26`; `tools/merge-segments.py:15–22`). This checks source recovery, not fresh synthesis of every structurally changed beat.
- **Frame rounding:** ten 0.100-second beats at 30 fps yielded identical helper/builder starts **0, 17, 34, …, 153**. The helper now uses `math.floor(x + 0.5)` for these nonnegative durations, matching `Math.round`; all **86** saved ep01 within-shot offsets also agree (`tools/beat-frames.py:17`; `tools/build-episode.ts:48–52`). Its last-beat length remains an explicitly qualified estimate; scene/act/final tails come from the builder. Components really receive built `steps` (`video/src/Episode.tsx:27`).
- **Reviewer failure:** with the actual `second-look.sh` and temporary FFmpeg/Codex stubs, a reviewer printing `Frame 0: clean` and exiting **7** still yielded helper exit **0** and that complete-looking captured line. Stdin was closed by the test caller. No external reviewer ran (`tools/review/second-look.sh:3,8–9`).
- **CLI and pronunciation contracts:** installed Codex/Claude help supports the shown primary flags; OpenCode help, with disposable writable XDG data/state paths, confirms `--model provider/model#variant` and `--file`. This does not establish live model availability or authentication. The documented phonemizer examples `SHA two fifty-six` and `N I S T` work; isolated `SHA one` instead yields `/ʃˈɑː/`, while the saved full sentence “They were SHA one hashes…” spells the letters. Preflight must be interpreted in utterance context, not as a universal fused-acronym guarantee (`.claude/skills/voice-narration/SKILL.md:18–20`; `tools/tts/synth.py:27`).

No full render, human listening approval, whole-episode ASR, live independent review or publication-readiness verdict is claimed. This is a focused audit and report prepend, not a skill/tool repair. Skill-local `SKILL.md:line` references below resolve to `.claude/skills/<named skill>/SKILL.md`; other paths are repository-relative. Round 4 and everything following it are preserved byte for byte.

## script-review — 112/120, A (+5)

Pattern: **Process + Tool**. Approximate **E:A:R 90:10:0**: scope traps, hook/stdin failures and author-relative review are expert; ordinary proofreading is brief activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Scope examples, Stop-hook output loss, stdin hangs and retry-file collisions encode local failures; routine proofread reminders add little (SKILL.md:11–22,47–54). |
| D2 Mindset + procedures | 14/15 | The author-family/availability table now closes the unsafe failover; final provider/model discovery remains implicit (SKILL.md:23–30,56–57). |
| D3 Anti-pattern quality | 14/15 | Self-family gating, memory-based fact checks and style-only passes have specific consequences; alternate-run failure examples could be equally explicit (SKILL.md:19–22,54,59–62). |
| D4 Specification | 15/15 | Valid metadata explicitly triggers on drafts, revisions, scope checks and re-review, and names the required review artifacts (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Round-dependent schemas and two concrete CLI paths are compact; OpenCode is named without a complete provider-specific invocation (SKILL.md:13–30,56–57). |
| D6 Freedom calibration | 14/15 | Family independence, pinned hashes and a closed gate on unavailable reviewers fit the risk; subprocess-status handling could be explicit for every route (SKILL.md:11,22–30). |
| D7 Pattern recognition | 9/10 | Run → assess → reconcile → focused closure is a coherent Process/Tool pattern; a runnable closure-prompt variant would finish the handoff (SKILL.md:10–30,46–57). |
| D8 Practical usability | 13/15 | Codex/Claude flags exist and all outage routes now preserve independence; the last OpenCode route still needs concrete model/output setup (SKILL.md:23–30; installed CLI help). |

**Remaining critical issues:** none found in the focused contract. Round 4's Claude-author/Codex-down contradiction is closed: the table selects a Cerebras/NVIDIA route subject to the different-family requirement; if no independent route is available, the gate stays closed (`.claude/skills/script-review/SKILL.md:11,23–30,60`). A provider label alone is not evidence of reviewer family; line 28 now requires recording the actual model. Live availability remains unverified, rather than a claimed defect or a tested successful review.

**What still blocks A:** nothing; **4 points above 108**. Next refinements: give the final OpenCode route an explicit discovered `provider/model` command and durable-output contract; check process status alongside completeness; show the focused-closure prompt instead of requiring adaptation of the full-review example. These improve execution and explain the residual D5/D8 deductions without reviving the fixed routing finding.

## storyboard — 114/120, A (+6)

Pattern: **Process + Tool**. Approximate **E:A:R 90:10:0**: meaningful visual events, canonical segments and truthful rendered props are expert; safe-area reminders are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Document-run limits, decorative-motion traps and cross-shot literal drift are production knowledge; familiar layout reminders remain brief (SKILL.md:12–15,36–50). |
| D2 Mindset + procedures | 15/15 | Voice-first durations, meaningful shot changes, exact built timing and canonical segment repair now form a working sequence (SKILL.md:11–16,29–34). |
| D3 Anti-pattern quality | 14/15 | Document-only explanation, fake hardware and generated factual text have reasons and alternatives; the short NEVER list partly relies on earlier sections (SKILL.md:12–15,53–56). |
| D4 Specification | 15/15 | Metadata precisely identifies approved voiced inputs, both outputs, segment work and QA-driven shot changes (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Registry, schema, timing helper and canonical narration repair are routed at use; the final before/after-build checklist could be separated (SKILL.md:14–34,47–51). |
| D6 Freedom calibration | 14/15 | Shot design stays flexible while fact identity, phone contrast and timing are strict; the helper now matches the builder's rounding (SKILL.md:15,27–30,43–45; tools/beat-frames.py:17). |
| D7 Pattern recognition | 9/10 | Voice → meaning → truth → timed proof → generated review is coherent; the “Before build” heading still contains an explicitly post-build item (SKILL.md:10–16,47–51). |
| D8 Practical usability | 14/15 | Real helper/builder boundary and saved-offset comparisons pass, as do repair/build/Markdown paths; rendered phone/contrast proof remains manual (SKILL.md:16,30,49–51). |

**Remaining critical issues:** none found in the focused timing and repair contracts. The Round 4 ties-to-even discrepancy is fixed in the actual helper, not merely reworded in the skill (`tools/beat-frames.py:17`; `tools/build-episode.ts:52`). The helper's final-pose caveat and preference for built `steps` remain correct; exact offsets really reach components (`.claude/skills/storyboard/SKILL.md:30`; `video/src/Episode.tsx:27`). Canonical narration changes continue to route to the now phase-correct voice procedure (`.claude/skills/storyboard/SKILL.md:34`; `.claude/skills/voice-narration/SKILL.md:47–56`).

**What still blocks A:** nothing; **6 points above 108**. Next refinements: split before-build checks from post-build documentation; record per-beat meaningful-change/phone/contrast evidence explicitly; keep the helper's estimated tail distinct from exact built duration. No new visual or contrast PASS follows from the timing tests.

## voice-narration — 114/120, A (+6)

Pattern: **Tool**. Approximate **E:A:R 95:5:0**: tokenizer hazards, per-line pace and wording/audio ownership dominate; general transcription/listening reminders are brief activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Lone-A phonemes, ASR normalization, pace calibration and stale-caption risks are dense expertise; the fused-acronym example needs context qualification (SKILL.md:18–20,29–41,52–53). |
| D2 Mindset + procedures | 15/15 | Three state branches now end at the correct phase, with deliberate structural recovery and one owner for wording (SKILL.md:43–56). |
| D3 Anti-pattern quality | 14/15 | Lexicons hiding wording, paragraph-only auditions and whole-episode repairs have concrete failure reasons; contextual pronunciation deserves an explicit warning (SKILL.md:20,29,32–40,57–62). |
| D4 Specification | 15/15 | Metadata covers synthesis, audition, phonemizer/STT/listening checks and selective repair after script changes (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | One compact canonical state tree and a conditional build handoff avoid duplication; direct commands for manifest-entry replacement remain implicit (SKILL.md:43–56). |
| D6 Freedom calibration | 14/15 | Fixed voice, selective WAV replacement and a failing text guard protect fragile state; scratch cleanup and full manifest identity could be more explicit (SKILL.md:8,50–56). |
| D7 Pattern recognition | 9/10 | Extract → preflight → synthesize → diagnose → selective repair now includes phase and structural recovery; the repair still relies on manual manifest patching (SKILL.md:10–56). |
| D8 Practical usability | 14/15 | Real synthesis, all three state repairs, stale-text rejection and insertion/deletion source recovery execute; full-utterance preflight would strengthen the term-only examples (SKILL.md:18,47–56). |

**Remaining critical issues:** none found in the focused repair branches. The no-board state now ends after checked audio and explicitly defers `build-episode.ts` until a storyboard exists, closing Round 4's ENOENT path (`.claude/skills/voice-narration/SKILL.md:54`; `tools/build-episode.ts:15`). Per-attempt `mktemp`, the exit-1 manifest guard and deliberate paragraph-edit recovery are substantive improvements, confirmed against the tools (`.claude/skills/voice-narration/SKILL.md:51–56`; `tools/sync-storyboard-vo.py:20–21`; `tools/merge-segments.py:16–22`).

**Residual evidence, not a new saved-audio defect:** the broad example “a fused initialism … is spelled letter by letter” at `.claude/skills/voice-narration/SKILL.md:20` is context-sensitive in the installed tokenizer. `SHA two fifty-six` spells the letters, isolated `SHA one` does not, and the actual full saved sentence does. The real synthesis path tokenizes the whole line (`tools/tts/synth.py:23–27`); §5 already requires listening to hazard terms (`.claude/skills/voice-narration/SKILL.md:39–40`). Thus qualify the example and preflight complete changed utterances; do not infer that ep01's existing WAVs are wrong from a fragment test.

**What still blocks A:** nothing; **6 points above 108**. Next refinements: preflight the full utterance as well as the new term; give an atomic manifest-entry patch/validation command that also checks duplicate ids and WAV presence; clean each owned scratch directory after a successful repair. No listening or pace approval is claimed for the short synthesis fixture.

## video-qa — 107/120, B (+1)

Pattern: **Tool + Process**. Approximate **E:A:R 90:10:0**: grain-resistant holds, rendered-ink measurement and cold-viewer misses are expert; general look/fix reminders are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Grain, phone captions, rendered-state alignment and cold-viewer blind spots explain concrete false passes; routine inspection remains brief activation (SKILL.md:21,37–64). |
| D2 Mindset + procedures | 14/15 | Final criteria now compose visual outcomes correctly, but actual reviewer-status and alternate-family execution remain incomplete (SKILL.md:45–57,69; tools/review/second-look.sh:8). |
| D3 Anti-pattern quality | 14/15 | Contact-sheet-only holds, desktop-only legibility and silently accepted findings address observed failures; subprocess-success assumptions remain unstated (SKILL.md:71–74). |
| D4 Specification | 15/15 | Valid metadata explicitly names whole-episode/shot scope, automated and independent checks, and dispositioned evidence (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Scoped shot/full routes and separate review purposes are clear; the non-Codex image/output path still requires reconstruction (SKILL.md:45–57,66). |
| D6 Freedom calibration | 12/15 | §2 FAILs and accepted §4 defects can no longer satisfy final PASS, but helper failure masking and hardcoded Codex still weaken gate guarantees (SKILL.md:46,69; tools/review/second-look.sh:3,8–9). |
| D7 Pattern recognition | 9/10 | Automated → visual → repair → checksum invalidation forms a strong Process; execution of required independent passes remains uneven (SKILL.md:10–69). |
| D8 Practical usability | 10/15 | Common gate criteria improve, yet the actual spatial helper still returns complete-looking clean evidence after reviewer exit 7 (SKILL.md:46; tools/review/second-look.sh:3,8–9). |

**Closed since Round 4:** `.claude/skills/video-qa/SKILL.md:69` now requires **§2 has no FAIL**, **§4 findings fixed or rejected with reasons**, and all applicable §5 passes. General “accepted with reason” dispositions at line 8 no longer waive those specific criteria. The old “completed review equals passing review” finding is closed; neither caption/document failures nor an accepted §4 defect satisfies the new predicate.

**Remaining critical issues / evidence**

1. **Spatial reviewer failures are still masked.** `.claude/skills/video-qa/SKILL.md:46` requires checking helper status and frame completeness, but the helper has only `set -e`, no `pipefail`, and pipelines Codex through AWK/grep before successful cleanup (`tools/review/second-look.sh:3,8–9`). The fresh controlled reproduction returned **0** with **`Frame 0: clean`** even though the reviewer exited **7**. Both prescribed acceptance checks therefore pass for unsuccessful evidence. This affects any episode/shot using the helper, not proof a particular saved review failed. Preserve the actual reviewer status, close stdin in the invocation, and require a complete durable report; checking the current wrapper's status alone does not close the defect.
2. **Codex-built videos still lack an equivalent executable independent route.** The author-relative selector at `.claude/skills/video-qa/SKILL.md:45` is correct, but spatial review hardcodes Codex in `tools/review/second-look.sh:8`, and explanation/cold-viewer commands hardcode Codex at `.claude/skills/video-qa/SKILL.md:48,53`. A Codex builder must invent the Claude frame attachments, prompt/output handling and file-completeness checks for all three passes. Supply and verify a Claude path for each purpose, preserving the cold viewer's restricted inputs and durable output. This is a usability/contract gap, not evidence that a saved episode used its author's family as reviewer.

**What still blocks A:** **1 point to reach 108**, with the two repository-backed execution gaps above still open. First preserve reviewer failure and durable complete output in the actual spatial helper; then provide the alternate-family invocations rather than only naming a family in prose. D8 remains **10/15, below 80%**, because both checking exit status and checking every frame can currently accept the reproduced failed reviewer. The repair is in the helper's subprocess/report contract, not another completeness sentence in the skill. Retain the now-correct PASS predicate, phone-caption checks, runtime-wide sampling and repeated-click-away escalation; crossing the aggregate A threshold would not waive either critical issue.

---

# Round 4 (2026-11-10)

| Skill | Round 3 | Round 4 | Change |
|---|---:|---:|---:|
| episode-research | 112/120 · A | **113/120 · A** | +1 · A → A |
| episode-brief | 110/120 · A | **114/120 · A** | +4 · A → A |
| script-writing | 107/120 · B | **111/120 · A** | +4 · B → A |
| script-review | 106/120 · B | **107/120 · B** | +1 · B → B |
| storyboard | 107/120 · B | **108/120 · A** | +1 · B → A |
| voice-narration | 107/120 · B | **108/120 · A** | +1 · B → A |
| video-build | 110/120 · A | **113/120 · A** | +3 · A → A |
| video-qa | 105/120 · B | **106/120 · B** | +1 · B → B |
| package-review | 108/120 · A | **108/120 · A** | 0 · A → A |

**Seven skills reach A; two remain B.** Segmented re-voice now passes the merger, and script-only extraction bypasses the old missing-storyboard sync failure. Both callers route to the canonical `voice-narration` §6. However, that procedure still ends its no-storyboard branch with an unconditional build that requires a storyboard. ANGLE is passed by both still-renderer calls. Reviewer failure handling, visual verdict composition and helper frame rounding also have remaining verified gaps. Scores follow the additive rubric: reaching A does not waive a listed residual defect or certify an episode for publication.

## Method and repository verification

Read the entire **752-line** rubric at `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md` and all nine current skills. Maxima: **D1 20; D2–D6 15 each; D7 10; D8 15**. Grades: **A ≥108, B 96–107, C 84–95, D 72–83, F <72**. Round 3 totals above come from the previously leading section, whose bytes are preserved below. Its findings were rechecked, not treated as current evidence.

All nine have valid matching names and descriptions with WHAT, WHEN and keywords. Their directories contain only `SKILL.md`; at 33–74 lines, self-containment and conditional loading are the appropriate D5 tests, rather than demanding more reference files. Approximate E:A:R below means expert/local knowledge : useful activation : redundant basics. Read the relevant season/style/template references, `LEARNINGS.md`, actual extraction/sync/merge/build/synthesis/review/render helpers, types, registration and consumers. Junior recall ran against a disposable SQLite backup after the original rejected writes; it supplied no project-specific override. The unavailable `RTK.md` include was not treated as a skill defect.

Executed checks in `/tmp/round4-dyvcqcuy`, with real episode files read only:

- **Bootstrap and extraction:** ep01's script alone produced **86 lines**; automatic storyboard extraction and forced `--from-script` extraction matched those lines and the saved input exactly. The override really bypasses an existing storyboard (`tools/storyboard-lines.ts:10–26`).
- **All three re-voice branches:** changed one sentence while preserving beat IDs in disposable no-board, single-board and segmented fixtures. The segmented branch extracted the new script first, updated canonical segment `vo`, and then passed the merger's verbatim check. Merging against mismatched new lines still failed as intended (`tools/merge-segments.py:16–22`). The previous merge-before-extraction advice is no longer prescribed for narration changes.
- **Real selective synthesis and build:** ran the documented phonemizer preflight and synthesized one changed line at `af_heart`, speed 0.86, into a temporary directory. Copied that WAV and replaced only its manifest entry in each fixture; manifest/line equality passed. Isolated builds rebuilt premixed narration, captions, chapters, episode JSON, registration and absent `out/` directories for the single-board and segmented fixtures. A script-only fixture built after a storyboard was supplied, but executing the canonical final build while it still had no storyboard reproduced **exit 1, ENOENT `storyboard.json`**. Thus extraction/audio repair passes all three states, while the unconditional final build does not. No human listening or pace-calibration PASS is claimed.
- **Timing boundary:** with a 0.100-second first line, 0.45-second pause and 30 fps, the actual builder put the second beat at **17 frames** while the actual helper printed **16**. All **86** beat offsets in the saved ep01 build agree with the helper; the boundary defect is not evidence of existing ep01 drift (`tools/beat-frames.py:17`; `tools/build-episode.ts:52`).
- **Manifest guard:** deliberately stale manifest text did not stop an isolated build, which captioned the new storyboard wording. The explicit equality check in the canonical voice procedure remains necessary; it is not redundant process (`tools/build-episode.ts:46–50`; `.claude/skills/voice-narration/SKILL.md:52–53`).
- **Still/backend and fallback contracts:** a disposable copy of `stills.mjs`, with only renderer/bundler imports substituted by recording stubs, passed `chromiumOptions: {gl: 'angle'}` to selection and every still, then removed its bundle. Source confirms the actual calls (`video/stills.mjs:15–21`). This is an invocation test, not a GPU-render proof. A private-lock test of the manual render fallback preserved a failing command's exit 7 and removed its owned lock; the old final-`rmdir` status defect is fixed (`.claude/skills/video-build/SKILL.md:29`).
- **Review failure reproduction:** ran the actual `second-look.sh` with temporary FFmpeg/Codex stubs and closed stdin. A reviewer that printed `Frame 0: clean` and exited **7** yielded a plausible captured report and helper exit **0**. No external reviewer ran. The pipeline masks the reviewer status (`tools/review/second-look.sh:3,7–9`).
- **Other focused checks:** the corrected freeze filter detected a five-second static synthetic source; SHA-256/SHA-1 recomputations matched F43. Saved narration still has median **160.2 wpm**, and saved built timing is **628.067 s**. Installed Codex/Claude help supports the shown flags; live model availability/authentication was not tested. OpenCode help hit this session's log-write restriction, which is an environment limitation, not a scored skill defect.

No full episode render, new independent content/visual review, current YouTube policy decision, licence audit or publication-readiness verdict was performed. **The operator's local-only `credits.json` rule receives no deduction**: used entries have an explicit committed-report handoff (`.claude/skills/video-build/SKILL.md:58`; `.claude/skills/package-review/SKILL.md:24`). Only this report is changed; existing skill/tool/episode edits are preserved.

## episode-research — 113/120, A (+1)

Pattern: **Process**. Approximate **E:A:R 90:10:0**: scope/attribution, stable IDs and computed-value ownership are expert content; the source hierarchy is brief activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Normative strength, attributed inference and saved-salt reproducibility capture concrete research failures; the source hierarchy is familiar activation (SKILL.md:12–26). |
| D2 Mindset + procedures | 14/15 | Question → scoped evidence → compute/attribute/narrow, with conflict resolution, transfers judgment; a final consumer-closure record remains implicit (SKILL.md:10,28–34). |
| D3 Anti-pattern quality | 14/15 | Benchmark-as-history, unseen snippets and mismatched recurring values have specific reasons and alternatives (SKILL.md:42–46). |
| D4 Specification | 15/15 | Valid metadata names fact-sheet maintenance, missing facts, reviewer scope and on-screen computation triggers (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | The compact fact contract delegates changed-fact propagation to script-writing §5 at the decision point (SKILL.md:12–18,34). |
| D6 Freedom calibration | 14/15 | Evidence scope is strict while source selection and attributed inference retain judgment; randomized examples now have an explicit safe branch (SKILL.md:19,23–32). |
| D7 Pattern recognition | 9/10 | A coherent Process covers evidence, missing-fact decisions, disagreement and downstream revision; closure could be recorded explicitly (SKILL.md:28–40). |
| D8 Practical usability | 14/15 | `VERIFIED (computed)` is explicit and saved/example salts are distinguished; local F43 outputs recompute correctly (SKILL.md:17,26; episodes/ep01-password-storage/factsheet.md:335–342). |

Skill-local `SKILL.md` references in each dimension table resolve to `.claude/skills/<skill>/SKILL.md`; other evidence paths are repository-relative.

**Remaining critical issues:** none found. Round 3's computed-status and random-salt ambiguities are addressed at `.claude/skills/episode-research/SKILL.md:17,26`. The actual revision caller includes visual literals and selective re-voice before QA (`.claude/skills/script-writing/SKILL.md:50–54`); the helpers execute that contract in the tested branches.

**What still blocks A:** nothing; **5 points above 108**. Next refinements: record which downstream consumers were closed after a changed fact; separate reusable format rules from repeated ep01 anecdotes; make the final fact-to-consumer audit as explicit as the missing-fact decision tree. These are refinements, not demonstrated false facts.

## episode-brief — 114/120, A (+4)

Pattern: **Philosophy + Process**. Approximate **E:A:R 90:10:0**: operator taste, medium selection and provenance are expert; context/packaging headings are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Meaning-sensitive props/finishes, rejected boards and source-document limits encode channel-specific art direction (SKILL.md:23–47). |
| D2 Mindset + procedures | 15/15 | What must be seen determines the medium, and failed phone proof now routes back to that mechanism rather than cosmetic fixes (SKILL.md:23–38). |
| D3 Anti-pattern quality | 14/15 | Decorative 3D, stock labels, rusty security props and unclear Lottie provenance have concrete causes and fallbacks (SKILL.md:40–47). |
| D4 Specification | 15/15 | Metadata covers topic selection, initial briefs, style decisions and off-target episode looks (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Feedback/prior-artifact reads have explicit precedence and a no-previous-episode route; sound inheritance could name a standalone fallback (SKILL.md:15–18,35). |
| D6 Freedom calibration | 14/15 | Operator-owned topics and mechanism readability constrain consequential choices while prototypes preserve creative latitude (SKILL.md:11–13,31,38). |
| D7 Pattern recognition | 9/10 | Philosophy → medium/prop choice → representative proof is well matched to art direction; one inheritance clause remains imprecise (SKILL.md:20–40). |
| D8 Practical usability | 14/15 | Season prerequisites, precedence and prototype fallback match real files; missing prior sound defaults still require judgment (SKILL.md:13,17–18,35,38; docs/season-1.md:21–22). |

**Remaining critical issues:** none found. The prior missing-previous-episode and failed-proof branches are explicit, and transition precedence is reconciled (`.claude/skills/episode-brief/SKILL.md:17–18,38`; `.claude/skills/storyboard/SKILL.md:27`). This closes the instruction contradiction without claiming a new visual proof was rendered.

**What still blocks A:** nothing; **6 points above 108**. Next refinements: reconcile §2.7's statement that defaults live in the previous brief with §1's stronger skill-default precedence; provide a first-episode sound fallback; trim repeated episode anecdotes while preserving the operator's reasons. Do not penalize operator topic approval or prescribed visual modes as generic rigidity.

## script-writing — 111/120, A (+4)

Pattern: **Process**. Approximate **E:A:R 85:15:0**: spoken-form hazards and cross-artifact repair are expert; budgeting and jargon reminders are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Kokoro letter/article traps, exact-scope teasing and stale on-screen literals are hard-won local knowledge (SKILL.md:29–40,50–54). |
| D2 Mindset + procedures | 14/15 | Architecture, takes and running-example payoff lead to canonical source-owned repair; its final no-board build still violates phase order (SKILL.md:10–26,50–54). |
| D3 Anti-pattern quality | 14/15 | Hidden lexicons, reviewer hedges and slogan reveals are tied to observed failures; some ep01 examples repeat other skills (SKILL.md:29–36,56–61). |
| D4 Specification | 15/15 | Metadata names drafting, review rewrites, claim revisions and pronunciation repair with concrete inputs/output (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Only the selected architecture section loads, binding style sections are named, and re-voice branches stay in their canonical owner (SKILL.md:8,11,54). |
| D6 Freedom calibration | 13/15 | Angle/take originality stays open while review and source ownership are strict; numerical style rules remain somewhat mechanical (SKILL.md:18,23–26,38–40,53–54). |
| D7 Pattern recognition | 9/10 | Architecture → budget → spoken prose → scoped revision is coherent; structural beat edits could have a more explicit recovery handoff (SKILL.md:10–54). |
| D8 Practical usability | 13/15 | Extraction and source updates work, but the delegated no-board repair reaches a build that needs a board; template names resolve correctly (SKILL.md:11–18,54; tools/build-episode.ts:15). |

**Remaining critical issue / evidence:** the delegated no-storyboard repair still attempts a premature final build. `.claude/skills/script-writing/SKILL.md:54` correctly routes to canonical voice §6 rather than duplicating the old sync/merge recipe, but `.claude/skills/voice-narration/SKILL.md:47,50–54` applies `build-episode.ts` even when no storyboard exists. The builder unconditionally opens that file (`tools/build-episode.ts:15`); the script-only fixture reproduced ENOENT after successful line/audio/manifest repair. The ownership/extraction/segment-order fixes are real; the final build needs a phase condition. See voice-narration for the shared root cause.

**What still blocks A:** nothing numerically; **3 points above 108**. First fix the shared canonical owner so a pre-storyboard repair ends after validated audio and defers assembly until the storyboard exists. Next distinguish wording-only changes from beat insertion/deletion, and annotate architecture choices with template letters A–E. The helper already rejects a single-board beat-count change safely (`tools/sync-storyboard-vo.py:20–21`); that separate structural case is a recovery-documentation opportunity, not a silent-corruption finding.

## script-review — 107/120, B (+1)

Pattern: **Process + Tool**. Approximate **E:A:R 90:10:0**: scope traps, pinned hashes and CLI failure handling dominate; ordinary proofreading is activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Scope-specific review, Stop-hook capture, stdin hangs and prior-blocker closure are concentrated project expertise (SKILL.md:11–24,40–50). |
| D2 Mindset + procedures | 13/15 | Full versus closure review and actual-author selection are strong, but failover can still select the author's own family (SKILL.md:11,22–24,49–50). |
| D3 Anti-pattern quality | 14/15 | Author-family self-review, memory-based fact checks and style-only PASS are explicitly prohibited with useful reasons (SKILL.md:52–56). |
| D4 Specification | 15/15 | Valid metadata clearly advertises independent draft/revision gates, scope verification and TTS proofing (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Round-specific schemas, named evidence and an executable Claude route avoid excess loading; the final OpenCode path is less concrete (SKILL.md:13–24). |
| D6 Freedom calibration | 12/15 | Hashes and family independence fit gate risk, but the unconditional Claude failover conflicts with those constraints (SKILL.md:11,23–24,53). |
| D7 Pattern recognition | 9/10 | A complete Process/Tool gate covers run, evidence, reconcile and closure; unavailable-reviewer routing remains incomplete (SKILL.md:10–24,44–50). |
| D8 Practical usability | 11/15 | Codex/Claude invocation flags exist and the Codex-author reverse route is now concrete; Claude-author/Codex-down recovery remains contradictory (SKILL.md:14–24). |

**Remaining critical issue / evidence:** the **Claude-authored script + Codex unavailable** branch. `.claude/skills/script-review/SKILL.md:11,53` requires a different model family, but line 23 says “Codex unavailable, or Codex wrote the script” → Claude. Thus the failure branch directs a Claude author back to Claude. The OpenCode alternative at line 24 is limited to “OpenAI-authored and Claude down,” so it does not resolve this case. This is a directly traceable instruction conflict, not an assertion that a saved review used the wrong reviewer. The old universal ban on Claude reviewing a Codex author is fixed.

**What still blocks A:** **1 point**. Make failover a function of both **author family and available reviewer family**: Claude author/Codex down → a verified non-Anthropic reviewer or a closed gate; OpenAI author/Claude down → a verified non-OpenAI reviewer or a closed gate. Also record the actual model/provider and give the final alternate invocation the same input, unique-path and completeness protections. D8 is below 80% because a realistic outage still requires inventing a safe route; another formatting or rubric row would not fix it. Preserve the now-correct reverse-model CLI and full/closure distinction.

## storyboard — 108/120, A (+1)

Pattern: **Process + Tool**. Approximate **E:A:R 90:10:0**: meaningful events, canonical segments and visual truth are expert; safe-area reminders are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Document-run limits, beat-meaning changes, computed props and phone-caption failures directly encode production misses (SKILL.md:12–16,36–50). |
| D2 Mindset + procedures | 14/15 | Voice-first proof and canonical segment revision now compose correctly, although timing estimates still disagree at rounding boundaries (SKILL.md:11,16,29–34). |
| D3 Anti-pattern quality | 14/15 | Decorative motion, document-only explanation, fake hardware and generated factual text have specific reasons and alternatives (SKILL.md:12–15,53–56). |
| D4 Specification | 15/15 | Valid metadata names voiced inputs, actual build data, segmentation and QA-driven shot changes (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Registry/schema/types, build/stills commands and canonical voice §6 are loaded at use without duplicating the repair tree (SKILL.md:14–34). |
| D6 Freedom calibration | 12/15 | Creative shots and authentic-evidence exceptions are flexible, but a fragile timing contract is still described more strongly than implemented (SKILL.md:27–30,36–43). |
| D7 Pattern recognition | 9/10 | Voice → truthful shots → timed proof → generated review document is coherent; the “Before build” heading still includes an after-build step (SKILL.md:47–51). |
| D8 Practical usability | 11/15 | Same-structure segmented narration repairs now execute, but the stated same-rounding helper remains wrong for some durations (SKILL.md:30,34; tools/beat-frames.py:17). |

**Remaining consequential issue / evidence:** `.claude/skills/storyboard/SKILL.md:30` says the helper uses the “same rounding.” It does not: `tools/beat-frames.py:17` uses Python ties-to-even, whereas `tools/build-episode.ts:52` uses JavaScript positive half-up rounding. The isolated actual build advanced **17**, the helper **16**, for `(0.100 + 0.45) × 30`. Repeated boundary beats can accumulate error in animation authored from helper estimates. Saved ep01 offsets all agree, and components receive the builder's exact `steps` (`video/src/Episode.tsx:27`), so this is not proof that every episode or final build is mis-timed. The segment source/merge-order issue from round 3 is closed by the explicit voice §6 route (`.claude/skills/storyboard/SKILL.md:34`).

**What still blocks A:** nothing numerically; **exactly 108**. A is an aggregate rubric threshold, not permission to leave the verified helper mismatch unqualified. Priorities: match the helper's rounding to the builder and compare offsets; keep animation tied to built `steps`; rename/reorder the before-build checklist's post-build documentation item. D8 remains below 80% specifically because a documented timing tool can produce a different answer, even though common saved timings and the repair branches pass.

## voice-narration — 108/120, A (+1)

Pattern: **Tool**. Approximate **E:A:R 95:5:0**: local phonemes, per-line pace and source/manifest ownership dominate; basic transcription reminders are brief activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Lone-A phonemes, ASR normalization traps, per-line calibration and stale-manifest risks are dense operational expertise (SKILL.md:13–41,52–53). |
| D2 Mindset + procedures | 14/15 | One wording source and three state branches fix extraction/merge order, but the common final build ignores the no-storyboard state (SKILL.md:43–54). |
| D3 Anti-pattern quality | 14/15 | Hidden lexicons, paragraph-only auditions, Whisper-as-truth and whole-episode repairs each have concrete local failure reasons (SKILL.md:20,29–40,55–60). |
| D4 Specification | 15/15 | Metadata covers script/storyboard extraction, audition, calibration, pronunciation and selective repair (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Runnable preflight/synthesis and a canonical state tree keep callers concise; the final build needs its own conditional route (SKILL.md:11–24,43–54). |
| D6 Freedom calibration | 12/15 | Fixed identity, measured pace and selective repair fit the risk, but phase-sensitive assembly is unconditional after all branches (SKILL.md:8,29,38,47–54). |
| D7 Pattern recognition | 9/10 | Extract → preflight → synthesize → diagnose → selectively repair is a strong Tool pattern; insertion/deletion recovery could be explicit (SKILL.md:10–55). |
| D8 Practical usability | 11/15 | All three extraction/audio repairs pass; single-board/segment rebuilds pass, but the no-board final build reproduces ENOENT (SKILL.md:47–54; tools/build-episode.ts:15). |

**Remaining critical issue / evidence:** the no-storyboard branch ends with a storyboard-dependent build. `.claude/skills/voice-narration/SKILL.md:47` explicitly supports this state, but its common continuation at lines 50–54 always runs `build-episode.ts`. `tools/build-episode.ts:15` unconditionally reads `storyboard.json`; the actual script-only fixture failed there with exit 1 after successful extraction, WAV replacement and manifest equality. Make step 3 conditional: no storyboard → finish the checked audio repair and continue to storyboarding; existing storyboard/segments → rebuild timing/captions/chapters. Do not manufacture an empty board or weaken validation. The old extraction/merge defects are closed: `--from-script` really bypasses the board (`tools/storyboard-lines.ts:10–22`), and updating canonical segment text before merging passes the real validator (`tools/merge-segments.py:16–22`).

**What still blocks A:** nothing numerically; **exactly 108**, with the verified phase-order issue still requiring repair. Priorities: condition the final build on storyboard existence; add deliberate beat insertion/deletion recovery; use per-attempt scratch paths and a nonzero-exit manifest check. D8 is below 80% because following one advertised branch still fails at its final command. The current equality check remains useful, and both caller skills correctly delegate to this single owner. No new audition, listening approval or full-episode ASR pass is claimed.

## video-build — 113/120, A (+3)

Pattern: **Tool**. Approximate **E:A:R 90:10:0**: premix/disk/backend/material knowledge is expert; safe-area checks are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Mixer exhaustion, ANGLE, meaning-sensitive scans, reflection layers and texture churn are specific production knowledge (SKILL.md:28–53,61–63). |
| D2 Mindset + procedures | 14/15 | Assemble → typecheck → still proof → serialized render → normalize → QA is concrete; output-duration comparison could be a runnable assertion (SKILL.md:10–34). |
| D3 Anti-pattern quality | 14/15 | Interpenetration, mirrored labels, stretched narration, double log flags and huge animated textures have concrete causes (SKILL.md:30–37,50–63). |
| D4 Specification | 15/15 | Metadata covers assembly, media-specific visuals, stills, rendering, loudness and failure recovery (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Failure and medium branches route to real tools and storyboard text rules; scratch-bundle ownership could be more explicit (SKILL.md:28–58). |
| D6 Freedom calibration | 14/15 | Brief-driven composition is flexible while audio/path/lock/credits contracts are strict; manual fallback now preserves status (SKILL.md:12–34,39–58). |
| D7 Pattern recognition | 9/10 | A compact Tool workflow includes actual assembly, repair and delivery handoffs; bundle lifecycle is still partly manual (SKILL.md:10–34). |
| D8 Practical usability | 14/15 | Actual isolated builds create outputs/registration, still calls pass ANGLE, and the fallback trap preserves failure and cleans its lock (SKILL.md:14–29; video/stills.mjs:15–21). |

**Remaining critical issues:** none found in the normal build/render handoff. The still-helper GL omission is fixed in both actual API calls (`video/stills.mjs:15,17`), and the manual fallback's EXIT trap no longer returns the cleanup command's status instead of Remotion's (`.claude/skills/video-build/SKILL.md:29`). Auto-registration is consumed by `video/src/Root.tsx:7–22`; captions/chapters and output-directory creation executed in the isolated build. Material descriptions match procedural `Brushed` and plain `Glass` (`video/src/three/finish.tsx:28–53,75–82`).

**What still blocks A:** nothing; **5 points above 108**. Next refinements: record the exact invocation-owned bundle path instead of inferring ownership from a before/after directory list; turn duration/output checks into explicit failing assertions; prefer the builder's exact `steps` until the beat helper's rounding is reconciled (the shared helper issue is detailed under storyboard). The local-only credits ledger and committed used-entry copy are authorized workflow choices, not defects.

## video-qa — 106/120, B (+1)

Pattern: **Tool + Process**. Approximate **E:A:R 90:10:0**: grain, rendered-ink measurement and viewer misses are expert; general look/fix reminders are activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Grain-resistant holds, state-aware ink measurements, phone-caption contrast and cold-viewer misses encode real false-pass mechanisms (SKILL.md:21,37–64). |
| D2 Mindset + procedures | 14/15 | Spatial, explanation and cold-viewer passes separate different judgments, but final composition still treats some visual checks as merely completed (SKILL.md:44–57,69). |
| D3 Anti-pattern quality | 14/15 | Contact-sheet-only pacing, desktop-only legibility and silently accepted findings are specific traps with reasons (SKILL.md:71–74). |
| D4 Specification | 15/15 | Valid metadata explicitly names whole-video/shot scopes, grain checks, consistency, alignment and dispositioned evidence (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Spatial capture, per-frame completeness, family selection and the shot/full distinction are now explicit; helper execution still diverges (SKILL.md:45–57,66). |
| D6 Freedom calibration | 11/15 | Numeric gates and hash invalidation fit the risk, but visual FAIL acceptance and hardcoded reviewer execution leave crucial guarantees loose (SKILL.md:8,37,45–57,69). |
| D7 Pattern recognition | 9/10 | A strong automated/visual/repair Process exists, but its final success predicate still fails to compose all required outcomes (SKILL.md:10–69). |
| D8 Practical usability | 10/15 | Capture and changed-shot §5 gating are fixed, yet the actual spatial pipeline can return a complete-looking “clean” artifact after reviewer failure (SKILL.md:46,57,69; tools/review/second-look.sh:3,7–9). |

**Remaining critical issues / evidence**

1. **Completed visual review is still weaker than passing visual review.** `.claude/skills/video-qa/SKILL.md:37` explicitly calls a document run a FAIL, while line 69 requires §2 and §4 only to be completed with artifacts and findings dispositioned. Line 8 permits accepted-with-reason findings. A §2 FAIL can therefore be recorded and accepted while the written final PASS predicate is satisfied. The added requirement that applicable §5 pass is a real fix, but does not repair §2/§4 composition. Require all mandatory criteria to pass; reserve acceptance for observations that do not fail a gate. This affects any episode with a visual failure, not evidence that the saved video was newly assessed.
2. **Reviewer failure can look like successful spatial evidence.** The actual helper has `set -e` without `pipefail`, sends Codex through AWK/grep, then finishes with successful cleanup (`tools/review/second-look.sh:3,8–9`). A stub reviewer that emitted a complete one-frame clean line and exited 7 produced helper exit 0 and that line in the captured report. The skill's new per-frame completeness requirement at `.claude/skills/video-qa/SKILL.md:46,57` does not distinguish that output from success. Preserve the actual reviewer status, close stdin, and capture a durable complete report before accepting it. The prior absence-of-redirection issue is fixed; the reproduced problem is failure masking, not missing redirection.
3. **Author-relative prose still lacks a complete executable alternate path.** `.claude/skills/video-qa/SKILL.md:45` now correctly selects a different family, closing the old missing-selector finding. However, its spatial helper hardcodes Codex (`tools/review/second-look.sh:8`), and the explanation/cold snippets also hardcode it (`.claude/skills/video-qa/SKILL.md:48,53`). A Codex author must reconstruct the Claude image/caption invocation and durable-output contract. This is a remaining execution gap, not proof any saved review violated independence; it should not be reported as though the new selector were absent.

**What still blocks A:** **2 points**. First compose PASS from successful mandatory visual criteria, not artifact presence; then make spatial review preserve failure/status and report completeness; finally provide one real alternate-family invocation for all three passes. D6/D8 remain below 80% because these gaps can certify unsuccessful evidence. Keep the fixed redirection, frame inventory, applicable §5 requirement, runtime-wide sampling, grain-resistant detection and repeated-click-away escalation.

## package-review — 108/120, A (unchanged)

Pattern: **Process**. Approximate **E:A:R 70:30:0**: exact-QA identity, missing-evidence verdicts and local-credit handoff add expertise; much packaging advice remains activation.

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 16/20 | Hash identity, missing-ranking BLOCKED and used-credit copying add real local delta; title/word/focal-object heuristics remain familiar (SKILL.md:10–25). |
| D2 Mindset + procedures | 13/15 | Paid-off promise, complementary packaging and evidence completeness shape judgment; ranking ties and iteration remain implicit (SKILL.md:17–25). |
| D3 Anti-pattern quality | 13/15 | No unused sources, carried-forward disclosure or unauthorized upload addresses concrete release mistakes; ranking bias traps could be clearer (SKILL.md:20,24,28–33). |
| D4 Specification | 15/15 | Metadata names all package assets, exact-video verdicts and post-QA/change/upload triggers (SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | A 33-line evidence gate loads current official policy only when the decision is needed, with real local inputs (SKILL.md:10–25). |
| D6 Freedom calibration | 14/15 | Creative packaging remains flexible within house limits while hash, provenance and missing-evidence decisions are strict (SKILL.md:17–25). |
| D7 Pattern recognition | 9/10 | Prerequisites → evidence rows → PASS/FAIL/BLOCKED → invalidation is coherent; retry/tie routing could finish the pattern (SKILL.md:8–28). |
| D8 Practical usability | 14/15 | Build outputs and local ledger exist, six-way blind ranking is specified, and missing evidence blocks; relative-command working directories remain implicit (SKILL.md:11–25). |

**Remaining critical issues:** none found in this instruction contract. `tools/build-episode.ts:80–82` really creates the referenced caption/chapter artifacts. `.claude/skills/package-review/SKILL.md:11–12,20–25` ties the gate to the QA checksum and requires ranking, exact chapters, used sources, provenance and a current policy decision. Historical package shortcomings are reasons for these checks, not proof the revised skill is broken. `credits.json` staying uncommitted is explicitly authorized; line 24 supplies the durable used-entry copy.

**What still blocks A:** nothing; **exactly 108**. Next refinements: state episode-relative versus repository-relative working directories; define tie/weak-ranking revision and record the actual reviewer model; reduce generic heuristics in favor of decisions about truthful differentiation. No policy was newly opened and no package PASS is asserted: this audit verifies the required procedure and local contracts, not today's disclosure outcome or asset rights.

---

# Round 3 (2026-11-10)

Re-graded all nine current skills using the **entire** rubric in `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md`. **A starts at 108/120. Four skills reach A; five remain B.** The round 2 bootstrap and registration findings are fixed in the repository. The main remaining shared defect affects **narration changes in segmented episodes**: the documented merge-before-extraction order fails the merger's verbatim-text validation. A separate frame-rounding discrepancy affects some future beat durations, although ep01's saved offsets agree. These are instruction/tool-contract findings, not a new verdict on ep01's release readiness.

| Skill | Round 2 | Round 3 | Change |
|---|---:|---:|---:|
| episode-research | 109/120 · A | **112/120 · A** | +3 · A → A |
| episode-brief | 105/120 · B | **110/120 · A** | +5 · B → A |
| script-writing | 105/120 · B | **107/120 · B** | +2 · B → B |
| script-review | 100/120 · B | **106/120 · B** | +6 · B → B |
| storyboard | 94/120 · C | **107/120 · B** | +13 · C → B |
| voice-narration | 103/120 · B | **107/120 · B** | +4 · B → B |
| video-build | 99/120 · B | **110/120 · A** | +11 · B → A |
| video-qa | 101/120 · B | **105/120 · B** | +4 · B → B |
| package-review | 92/120 · C | **108/120 · A** | +16 · C → A |

## Method and verified repository contracts

- Dimension maxima: **D1 20; D2–D6 15 each; D7 10; D8 15**. Grades: A ≥108, B 96–107, C 84–95, D 72–83, F <72. Round 2 scores are copied from the immediately following historical section; its findings were rechecked rather than inherited. Reasons below score the usable instructions, including tool behavior, rather than the number of newly added rules.
- Read all nine skills completely, the full judging rubric, `LEARNINGS.md`, relevant research/style/season references, actual tool implementations, Remotion registration/components and ep01's source and review artifacts. All names/frontmatter are valid and have WHAT/WHEN/keywords. Each skill directory contains only `SKILL.md`; no nonexistent bundled reference tree is required. Approximate E:A:R ratios below distinguish project expertise, useful activation and redundant basics.
- **Fresh narration now works:** in a disposable episode containing only ep01's `script.md`, `bun tools/storyboard-lines.ts <episode-dir>` created `voice/` and extracted **86 lines**, identical in IDs and text to saved ep01 narration and to subsequent storyboard extraction. The fallback and directory creation are implemented at `tools/storyboard-lines.ts:15–26`. The old voice/storyboard cycle is closed.
- **Helpers are parameterized:** `tools/merge-segments.py:8–22` reads the supplied episode, discovers segment scene arrays, sorts scenes and validates against narration; `tools/beat-frames.py:10–17` reads that episode's manifest and fps. Neither still hardcodes ep01 or A–E. In a disposable segmented copy, changing one segment's narration and immediately merging reproduced `beat 0: storyboard has (...Changed.), narration has (...old text...)`, exit 1. This is the repair-order defect discussed below.
- **Build registration and output creation work:** an isolated copy of `build-episode.ts` with two 0.1-second WAVs produced its premix, built JSON, generated `video/src/episodes/index.ts`, captions, chapters and a previously absent `out/`. Source confirms `Root` consumes that index (`tools/build-episode.ts:73–82`; `video/src/Root.tsx:7–22`). No real episode output was rebuilt or overwritten.
- **Timing checked, including a boundary case:** the isolated 30-fps build used second-beat offset **17**, while `beat-frames.py` printed **16** for the same 0.1-second first line. Python `round` and JavaScript `Math.round` differ at this half-frame boundary (`tools/beat-frames.py:17`; `tools/build-episode.ts:52`). All current ep01 within-shot offsets agree; this is a demonstrated future-input defect, not a claim of existing ep01 drift. Builder pause constants are 0.45/0.7/1.2 seconds, lead-in 0.6, final tail 2.5 (`tools/build-episode.ts:24–27,40,52`).
- **Numbers checked:** ep01's saved manifest contains **86 lines, 1,545 words, median 160.2 wpm**; built duration is **628.067 seconds (10:28)**. SHA-256 of `mango@123` recomputes to F43's `81c68634…efff1`. The phonemizer command runs: fused `SHA` yields letter names; spaced `S H A one` yields article-like `/ɐ/`. These support the pace and pronunciation instructions; no fresh whole-episode synthesis was needed.
- **Commands/flags checked against implementations:** synthesis accepts `--voice`, `--speed`, `--lexicon`; transcription accepts a media path and optional `--model`/`--words`; alignment accepts `--crops` and implements 8% offset and padding **strictly greater than 3 px** (`tools/tts/synth.py:15–35`; `tools/tts/transcribe.py:9–23`; `tools/review/align.py:11,49–65`). Installed `codex exec --help` confirms `-m`, `-c`, `-s workspace-write`, `-C`, `--skip-git-repo-check`, and variadic `--image`. Render flags exist in the installed Remotion CLI; the wrapper supplies concurrency 4, ANGLE and one log flag (`tools/render.sh:4–8`). The grain-resistant freeze filter also executes on a synthetic clip.
- **Corrected paths and handoffs are credited:** timed stills now explicitly run inside `video/`; RAW/FINAL paths are absolute and shared through render/loudnorm/QA; source screenshots and procedural material exceptions are explicit. The uncommitted credits ledger is an **operator rule, not a defect**. Its durable handoff is now the copied used entries in the committed package report (`.claude/skills/video-build/SKILL.md:58,63`; `.claude/skills/package-review/SKILL.md:8,24`). Existing `test only` entries should make a future package review BLOCKED; they do not prove the revised skill is defective or that rights were violated.
- Verification limits: no full render, playback, full transcription, new independent model review, blind ranking, live licence audit or live YouTube policy assessment was run. Helper/model behavior inferred from source is identified as such. Junior recall was queried using a disposable SQLite backup after the original database rejected writes; it supplied no episode-specific override. This audit changes only this report. All pre-existing content below Round 3 remains byte-for-byte unchanged.

| Skill | Current lines / bytes | Pattern | Approx. E:A:R | Disclosure assessment |
|---|---:|---|---|---|
| episode-research | 46 / 4,117 | Process | 90:10:0 | Compact fact contract, conflict branch and revision-sweep route. |
| episode-brief | 46 / 4,719 | Philosophy + Process | 90:10:0 | Feedback/prior-episode reads, inherited-value sources and conditional prototype route. |
| script-writing | 60 / 5,998 | Process | 85:15:0 | Binding style sections and repair handoff; architecture reference is not section-routed. |
| script-review | 55 / 5,273 | Process + Tool | 90:10:0 | Input files and full/closure schemas are explicit; alternate reviewer invocation remains thin. |
| storyboard | 56 / 5,885 | Process + Tool | 90:10:0 | Registry/schema/build paths are concrete; segment-revision recovery remains implicit. |
| voice-narration | 52 / 4,286 | Tool | 90:10:0 | Runnable preflight, extraction and build commands; repair modes need separate branches. |
| video-build | 63 / 6,592 | Tool | 90:10:0 | Ordered build/render/mix workflow and conditional medium/failure guidance. |
| video-qa | 74 / 7,503 | Tool + Process | 90:10:0 | Dedicated full/shot/cold-viewer routes; spatial helper report capture remains unspecified. |
| package-review | 33 / 2,971 | Process | 70:30:0 | Self-contained evidence gate; current policy loaded at the decision point. |

Shared references: `docs/my-writing-style.md` **210 lines / 20,319 bytes** (binding sections start at 116 and 174); `docs/research/Script flow teardown.md` **308 / 54,547** (templates A–E start at 84, 114, 155, 187, 221); `docs/season-1.md` **22 / 1,351**; `LEARNINGS.md` **199 / 30,361**. No skill exceeds 100 lines, so concision/self-containment is the appropriate D5 test; an extra references directory would not itself improve the score.

## episode-research — 112/120, A (+3)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Stable fact IDs, normative strength, attribution and reproducible screen values are concentrated local expertise; source hierarchy adds a brief familiar reminder (.claude/skills/episode-research/SKILL.md:12–26). |
| D2 Mindset + procedures | 14/15 | Question → scoped evidence → compute/attribute/narrow plus conflict resolution is a useful decision process; computed-status consumption could be more explicit (.claude/skills/episode-research/SKILL.md:17–32). |
| D3 Anti-pattern quality | 14/15 | Benchmark-as-history, unseen snippets and cross-shot value drift have concrete failure reasons; no material anti-pattern omission remains (.claude/skills/episode-research/SKILL.md:42–46). |
| D4 Specification | 15/15 | Valid matching metadata names fact-sheet creation, maintenance, reviewer scope and on-screen-number triggers (.claude/skills/episode-research/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | A 46-line contract routes changed facts to the actual revision sweep without duplicating it; template/source-selection detail stays compact (.claude/skills/episode-research/SKILL.md:28–34). |
| D6 Freedom calibration | 14/15 | Narrow evidence boundaries preserve researcher judgment and explicitly permit verified attribution; deterministic versus random computed examples need a finer distinction (.claude/skills/episode-research/SKILL.md:19,26,30–32). |
| D7 Pattern recognition | 9/10 | Clear Process with missing-fact and source-conflict branches plus a downstream handoff; final consumer audit is delegated (.claude/skills/episode-research/SKILL.md:28–40). |
| D8 Practical usability | 13/15 | Revision routing reaches TSX/voice/QA and F43 recomputes; the status template could say explicitly that verified computations are consumable (.claude/skills/episode-research/SKILL.md:8,17,34; episodes/ep01-password-storage/factsheet.md:338–342). |

**Remaining critical issues:** none found in the inspected contract. The round 2 attribution and dependency-sweep omissions are addressed at `.claude/skills/episode-research/SKILL.md:19,30–34`; the target sweep now includes TSX and generated narration (`.claude/skills/script-writing/SKILL.md:49–53`).

**What still blocks A:** nothing; already 4 points above the threshold. Refinements: (1) write `VERIFIED (computed)` rather than leaving standalone COMPUTED's eligibility implicit; (2) distinguish reproducing a randomized Argon2 example from reproducing its exact bytes—F42 explicitly uses a random salt (`episodes/ep01-password-storage/factsheet.md:335–338`); (3) add a final consumer checklist when closing a changed fact. These are precision improvements, not newly demonstrated false claims.

## episode-brief — 110/120, A (+5)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Medium-to-mechanism choices, meaning-sensitive finishes and rejected visual modes capture the operator's hard-won taste rather than generic creative advice (.claude/skills/episode-brief/SKILL.md:22–46). |
| D2 Mindset + procedures | 14/15 | Viewer question → what must be seen → medium/prototype → phone proof guides decisions; proof rejection could route more explicitly back to the failed mechanism (.claude/skills/episode-brief/SKILL.md:20–37). |
| D3 Anti-pattern quality | 14/15 | Boards, decorative 3D, stock labels, rusty security props and unclear Lottie provenance each have concrete causes and alternatives (.claude/skills/episode-brief/SKILL.md:39–46). |
| D4 Specification | 15/15 | Metadata clearly triggers topic choice, early briefs, channel-style decisions and off-target looks (.claude/skills/episode-brief/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Mandatory feedback/prior-artifact reading and cited inheritance sections are useful; absent prior artifacts still lack an explicit branch (.claude/skills/episode-brief/SKILL.md:15–17,34). |
| D6 Freedom calibration | 13/15 | Operator topic ownership and phone proofs constrain consequential decisions while prototypes leave creative room; inherited-default conflicts need a precedence rule (.claude/skills/episode-brief/SKILL.md:11–13,34–37). |
| D7 Pattern recognition | 9/10 | Philosophy → medium selection → proof is well matched to art direction; a failed-proof iteration loop is implied rather than specified (.claude/skills/episode-brief/SKILL.md:19–39). |
| D8 Practical usability | 12/15 | Season preconditions and provenance are now actionable and match repo evidence; first-episode and conflicting-inheritance cases still require judgment (.claude/skills/episode-brief/SKILL.md:13,17,34,39). |

**Remaining critical issues:** none found for the current successor-episode path. Per-episode evidence preparation now matches `docs/season-1.md:21–22`; inherited values must be copied with their sources, and unclear Lottie provenance has a draw-it-ourselves fallback (`.claude/skills/episode-brief/SKILL.md:13,34,39`; `LEARNINGS.md:77,143–158,162–174`).

**What still blocks A:** nothing; already 2 points above the threshold. Refinements: (1) handle a missing previous brief/review explicitly; (2) reconcile inherited transition defaults—ep01's brief prescribes fade within an act and wipe at act boundaries, whereas the storyboard skill prescribes cut within an act and fade at its start (`episodes/ep01-password-storage/brief.md:41`; `.claude/skills/storyboard/SKILL.md:27`); (3) identify which mechanism to revise when its phone proof fails. The old brief is historical evidence, not proof that the current rendered transitions are wrong.

## script-writing — 107/120, B (+2)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Spoken-form traps, exact-scope teasing and cross-artifact revision knowledge dominate; word-budget reminders add limited familiar content (.claude/skills/script-writing/SKILL.md:21–39,49–53). |
| D2 Mindset + procedures | 14/15 | Beat jobs, takes, running-example payoff and a full revision chain improve author decisions; segmented revision ordering remains inconsistent with validation (.claude/skills/script-writing/SKILL.md:23–26,53). |
| D3 Anti-pattern quality | 14/15 | Hidden lexicons, overbroad teasers and signposted reveals are explained by observed failures; stale canonical segment recovery remains unguarded (.claude/skills/script-writing/SKILL.md:29–35,51–58). |
| D4 Specification | 15/15 | Valid metadata names drafting, review revisions, changed claims and TTS mispronunciations with the expected inputs/output (.claude/skills/script-writing/SKILL.md:2–3). |
| D5 Progressive disclosure | 13/15 | Style §§5–6 and narration repair are routed; the 54-KB architecture reference is not mapped to its chosen template section (.claude/skills/script-writing/SKILL.md:8–18,53). |
| D6 Freedom calibration | 12/15 | Originality is correctly framed as angle/take rather than template rotation; fragile source/segment update ordering still requires agent improvisation (.claude/skills/script-writing/SKILL.md:18,51–53). |
| D7 Pattern recognition | 9/10 | Compact Process covers architecture, budget, spoken form and revisions; pre-storyboard versus segmented repair branches are not separated (.claude/skills/script-writing/SKILL.md:10–60). |
| D8 Practical usability | 11/15 | Pace numbers match saved data and TSX/QA invalidation are now covered, but the segmented sync→merge→extract sequence reproducibly rejects changed wording (.claude/skills/script-writing/SKILL.md:51–53; tools/merge-segments.py:16–21). |

**Remaining critical issues / evidence**

- **Segmented narration revisions cannot follow the stated order.** `.claude/skills/script-writing/SKILL.md:53` says sync into storyboard “or segment + merge” **before** regenerating lines. `tools/merge-segments.py:10,16–21` compares new segment text with the still-old `voice/lines.json` and exits on any wording change. Editing a segment then merging reproduced this failure. Alternatively syncing the merged storyboard leaves canonical segment narration stale; a later merge fails or overwrites the repair (`tools/sync-storyboard-vo.py:15–26`; `.claude/skills/storyboard/SKILL.md:34`). This affects any segmented episode with a narration edit, including ep01 on its next such revision; it does not establish that current ep01 files disagree.
- **The same revision recipe lacks a pre-storyboard branch.** The script can need a pronunciation correction before shot planning, now that voice comes first. Line 53 still starts with storyboard sync, whose helper unconditionally opens `storyboard.json` (`tools/sync-storyboard-vo.py:15`). At that stage regenerate from the script directly instead (`tools/storyboard-lines.ts:15–26`).

**What still blocks A:** 1 point. Supply a tested source-ownership decision tree: no storyboard → extract from script; unsegmented storyboard → sync then extract; segmented storyboard → update canonical segments and approved line input coherently before the validating merge, then extract/verify. Also point the selected architecture to the corresponding reference section and preserve the existing review-before-voice and gate-invalidation rules. The fixes should repair the dependency order, not weaken merge validation.

## script-review — 106/120, B (+6)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Scope traps, stdin/capture failures and prior-blocker closure are unusually dense local review knowledge (.claude/skills/script-review/SKILL.md:19–23,40–55). |
| D2 Mindset + procedures | 14/15 | Content hashes, full/closure schemas and evidence-backed reconciliation close major round 2 gaps; actual-author model routing remains contradictory (.claude/skills/script-review/SKILL.md:11,22,46–53). |
| D3 Anti-pattern quality | 14/15 | No fact-checking from memory, style-only PASS or stale pronunciation advice is specific and justified; model-family ban needs correction (.claude/skills/script-review/SKILL.md:47,53–55). |
| D4 Specification | 15/15 | Valid metadata clearly advertises an independent gate, fact-scope checks and re-review triggers (.claude/skills/script-review/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Invocation names the evidence inputs and now handles round 1 and closure schemas; alternate-provider execution has no equivalent concrete route (.claude/skills/script-review/SKILL.md:14–23). |
| D6 Freedom calibration | 11/15 | Actual-author independence and hash pinning fit the risk, but the Claude ban conflicts with the permitted Codex-author path and the fallback is not author-relative (.claude/skills/script-review/SKILL.md:11,23,53). |
| D7 Pattern recognition | 9/10 | Strong Process/Tool gate with completeness checks and recovery; first-class alternate-model routing would finish the pattern (.claude/skills/script-review/SKILL.md:10–23,49–50). |
| D8 Practical usability | 10/15 | Installed CLI supports the shown flags, filenames include seconds/randomness and hashes identify edits; Codex-authored/fallback reviews still lack a coherent executable branch (.claude/skills/script-review/SKILL.md:11–23,53). |

**Remaining critical issues / evidence**

- **Independence rules conflict when Codex authored the script.** `.claude/skills/script-review/SKILL.md:11` explicitly permits Claude to review a Codex-authored script, while line 53 says never use another Claude model as the gate. The description/invocation also centre Codex. State the prohibition relative to the **actual author**, rather than leaving a universal Claude ban next to the reverse-model route. This is a contradictory instruction, not evidence that an existing independent ep01 review used the wrong model.
- **The reverse/fallback route is incomplete.** Line 23 names `opencode run` and non-Anthropic providers but supplies no invocation matching the named-file, stdin, complete-report and model-recording protections of lines 13–22. Non-Anthropic alone also does not establish independence from a Codex author. `LEARNINGS.md:23,27–28` records the provider/tool-call, interleaving and stdin failures that make these controls material. No current reviewer-authentication failure was reproduced.

**What still blocks A:** 2 points. Make all bans and fallbacks author-relative, and give one working alternate-model invocation with the same input hashes, unique report path, stdin closure and round-specific completeness checks. Keep the now-correct full/closure distinction and invalidation-by-hash; do not restore the previous minute-only naming or full-rubric requirement for focused closure.

## storyboard — 107/120, B (+13)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Meaningful beat changes, document-run limits, computed props and phone-caption contrast directly encode missed ep01 failures (.claude/skills/storyboard/SKILL.md:12–16,36–50). |
| D2 Mindset + procedures | 14/15 | Voice-first now bootstraps and timed proof correctly follows assembly; segment narration revisions still lack a coherent update branch (.claude/skills/storyboard/SKILL.md:11,16,29,34). |
| D3 Anti-pattern quality | 14/15 | Decorative motion, document-only explanation, fake hardware and image-generated data are specific failure modes with reasons (.claude/skills/storyboard/SKILL.md:12–15,53–56). |
| D4 Specification | 15/15 | Valid metadata names approved voiced inputs, registry props, segmentation and QA-driven shot changes (.claude/skills/storyboard/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Actual schema, registry/types, episode-dir helpers and correct stills CWD are all routed at use; source-owned revision recovery remains implicit (.claude/skills/storyboard/SKILL.md:14–34). |
| D6 Freedom calibration | 12/15 | Clear text roles and documentary exceptions replace contradictory minima; fragile helper timing and source synchronization are less constrained than the visual rules (.claude/skills/storyboard/SKILL.md:29–43). |
| D7 Pattern recognition | 9/10 | Strong Process/Tool flow from narration to truthful shots and timed proof; the “Before build” heading still contains a post-build documentation step (.claude/skills/storyboard/SKILL.md:47–51). |
| D8 Practical usability | 10/15 | New-episode/registration/stills/segment shape fixes are real, but beat-frame rounding and segmented narration revisions can still give wrong results or stop the workflow (.claude/skills/storyboard/SKILL.md:29–34). |

**Remaining critical issues / evidence**

- **Beat helper is not exactly the builder clock.** `.claude/skills/storyboard/SKILL.md:30` tells animators to use helper frames. `tools/beat-frames.py:17` uses Python round-to-even, while `tools/build-episode.ts:52` uses JavaScript half-up `Math.round` for positive durations. With a 0.100-second line plus the 0.45-second beat pause at 30 fps, the helper advances 16 frames and the builder 17. Multiple such beats can accumulate drift. Ep01's present offsets all agree; this finding is limited to the reproduced boundary case. Match the builder's rounding and validate helper offsets against built `steps`.
- **Segment narration ownership and validation still lack a revision route.** Lines 29 and 34 respectively prescribe syncing the merged storyboard and editing/merging canonical segments; the first changes only merged beats (`tools/sync-storyboard-vo.py:15–26`), while the second checks new text against old narration lines (`tools/merge-segments.py:10,16–21`). A narration edit must update the validation input and segment source in a deliberate order; the visual-only segment edit path already works.

**What still blocks A:** 1 point. Make helper offsets identical to built timing, and document/test segmented narration revisions without discarding verbatim validation. Then clarify that markdown regeneration is after the timed build. The old hardcoded-episode, root-stills, scene-array, tail and text-minimum findings are closed (`tools/beat-frames.py:10–12`; `tools/merge-segments.py:8–14`; `.claude/skills/storyboard/SKILL.md:16,30,34,36–43`).

## voice-narration — 107/120, B (+4)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Real phonemes, per-line speed calibration and ASR normalization/listening traps remain dense expert knowledge (.claude/skills/voice-narration/SKILL.md:13–41). |
| D2 Mindset + procedures | 13/15 | Review→extract→preflight→synthesize→listen is coherent; the repair recipe still assumes a storyboard and usable segment merge (.claude/skills/voice-narration/SKILL.md:8–11,43–47). |
| D3 Anti-pattern quality | 14/15 | Hidden lexicons, paragraph-only auditions, Whisper-as-truth and whole-episode repairs have concrete local reasons (.claude/skills/voice-narration/SKILL.md:20,29,32–40,47–52). |
| D4 Specification | 15/15 | Metadata now correctly advertises script or storyboard extraction plus calibration, pronunciation and selective repair (.claude/skills/voice-narration/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Runnable phonemizer, extraction, synthesis and exact build commands are self-contained; repair needs conditional source routing (.claude/skills/voice-narration/SKILL.md:11–24,43–47). |
| D6 Freedom calibration | 12/15 | Fixed voice with auditioned speed and manual listening fits the task; source repair is insufficiently constrained across pipeline stages (.claude/skills/voice-narration/SKILL.md:8,29,40,44). |
| D7 Pattern recognition | 9/10 | Strong Tool pattern with mismatch-specific decisions and manifest repair; no-board/segmented repair modes remain conflated (.claude/skills/voice-narration/SKILL.md:31–47). |
| D8 Practical usability | 11/15 | Bootstrap and preflight execute, numbers match ep01 and manifest equality is checked; pre-storyboard and segment repairs can still fail before synthesis (.claude/skills/voice-narration/SKILL.md:11,44–47). |

**Remaining critical issues / evidence**

- **Repair still assumes `storyboard.json` exists.** `.claude/skills/voice-narration/SKILL.md:11` now intentionally supports voice before storyboarding, but line 44 directs every corrected line through `sync-storyboard-vo.py`, which unconditionally opens that missing file (`tools/sync-storyboard-vo.py:15`). A phonemizer/listening correction during first narration should instead edit the approved script, re-review affected wording and rerun direct script extraction.
- **Its segment alternative hits the stale-lines merge failure.** Line 44 says edit the segment and merge, **then** regenerate lines; the merger rejects changed narration against the old `voice/lines.json` (`tools/merge-segments.py:10,16–21`, reproduced). Updating only merged storyboard text is not a durable alternative because segments are canonical (`.claude/skills/storyboard/SKILL.md:34`). The manifest equality check is good but occurs too late to solve this ordering problem.

**What still blocks A:** 1 point. Split repair into no-board, unsegmented and segmented paths and verify each from canonical script through regenerated lines, one WAV/manifest replacement and rebuilt captions. Preserve the existing manifest-text equality check: the builder itself accepts stale manifest text and captions from different `beat.vo` wording (`tools/build-episode.ts:46–50`, confirmed in the isolated build), so that check is meaningful protection rather than redundant process.

## video-build — 110/120, A (+11)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Premix/disk failures, ANGLE, scanned finishes, reflection layers and texture churn are repository-specific production knowledge (.claude/skills/video-build/SKILL.md:28–53,61–63). |
| D2 Mindset + procedures | 14/15 | Build→typecheck→stills→serialized render→normalize→QA now has concrete paths; fallback failure handling could preserve status more rigorously (.claude/skills/video-build/SKILL.md:12–34). |
| D3 Anti-pattern quality | 14/15 | Interpenetration, mirrored labels, software rendering, stretched audio and huge animated textures have observed causes; no operator credit rule is penalized (.claude/skills/video-build/SKILL.md:31–37,51–63). |
| D4 Specification | 15/15 | Valid metadata covers assembly, visuals, stills, final rendering and failure recovery with actual technologies (.claude/skills/video-build/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | Ordered commands plus failure/medium branches route to real helpers and storyboard text rules; still-render backend details remain hidden (.claude/skills/video-build/SKILL.md:17,28–34,39–58). |
| D6 Freedom calibration | 13/15 | Brief-driven media and precise paths/audio/credits contracts are appropriately balanced; fallback lock ownership and preview backend need tighter controls (.claude/skills/video-build/SKILL.md:28–34,58). |
| D7 Pattern recognition | 9/10 | Complete compact Tool workflow with explicit QA handoff and conditional recovery; failure cleanup remains partly manual (.claude/skills/video-build/SKILL.md:10–34). |
| D8 Practical usability | 12/15 | Isolated build proves output creation/auto-registration; absolute RAW/FINAL and local-credit handoff work, but preview GL and fallback exit handling are less robust (.claude/skills/video-build/SKILL.md:14–30). |

**Remaining critical issues:** none found in the normal build→wrapper→mix→QA contract. `tools/build-episode.ts:73–82` now generates registration and `out/`; `video/src/Root.tsx:7–22` consumes registration. Absolute RAW/FINAL variables survive the subshell commands (`.claude/skills/video-build/SKILL.md:12–26`). Material descriptions now match the procedural `Brushed`/plain `Glass` implementation (`video/src/three/finish.tsx:28–53,75–82`); authentic source images are explicitly permitted and used by `DocShot` (`video/src/components/DocShot.tsx:24,43`).

**What still blocks A:** nothing; already 2 points above the threshold. Refinements: (1) align “ANGLE always” with the actual still helper, whose `selectComposition`/`renderStill` calls supply no GL option (`.claude/skills/video-build/SKILL.md:17,31`; `video/stills.mjs:15–17`); this is a source-confirmed default, not a reproduced bad preview; (2) use an EXIT trap and propagate Remotion's status in the manual lock fallback, whose final `rmdir` currently determines shell success (`.claude/skills/video-build/SKILL.md:29`; compare `tools/render.sh:3–8`); (3) track the invocation's bundle explicitly rather than identifying it as “newest” after releasing the lock (.claude/skills/video-build/SKILL.md:33). These improve recovery reliability without reopening the fixed registration, output, material or credits findings.

## video-qa — 105/120, B (+4)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Grain-resistant holds, rendered-ink geometry, phone captions and cold-viewer misses are dense lessons tied to observed ep01 failures (.claude/skills/video-qa/SKILL.md:21,39–64). |
| D2 Mindset + procedures | 14/15 | Separate spatial/explanation/cold-viewer passes improve judgment; PASS still tests completion rather than successful visual checks (.claude/skills/video-qa/SKILL.md:44–57,69). |
| D3 Anti-pattern quality | 14/15 | Contact-sheet-only pacing, desktop-only legibility and silently accepted findings are concrete false-pass traps; contradictory visual verdict closure remains (.claude/skills/video-qa/SKILL.md:69–74). |
| D4 Specification | 15/15 | Valid metadata explicitly names full and per-shot entry, grain-resistant checks, consistency and dispositioned reports (.claude/skills/video-qa/SKILL.md:2–3). |
| D5 Progressive disclosure | 13/15 | Three review routes and a shot-only scope are clear; the spatial helper's output-to-report capture and author-model independence remain implicit (.claude/skills/video-qa/SKILL.md:44–57,66). |
| D6 Freedom calibration | 12/15 | Quantitative gates, checksum invalidation and repeated click-away escalation fit the risk, but visual FAILs can be dispositioned into an overall PASS (.claude/skills/video-qa/SKILL.md:37,56,64,69). |
| D7 Pattern recognition | 9/10 | Strong Tool/Process with automated, runtime, semantic and per-shot checks; the final gate does not fully compose their success conditions (.claude/skills/video-qa/SKILL.md:10–69). |
| D8 Practical usability | 9/15 | Correct d=2, runtime sizing and alignment thresholds are implemented, but spatial-review capture and contradictory visual PASS criteria remain operational gaps (.claude/skills/video-qa/SKILL.md:16,35,46,57,69). |

**Remaining critical issues / evidence**

- **The spatial helper does not write one of the files the skill says to await.** `.claude/skills/video-qa/SKILL.md:46` invokes `second-look.sh` without redirection or an output argument; line 57 requires all three review files. `tools/review/second-look.sh:5–9` extracts images, asks Codex for terminal findings, filters stdout and removes its temporary folder; it specifies no report file and does not close stdin. The other two routes do name/copy their outputs (.claude/skills/video-qa/SKILL.md:48,53–54). Supply a durable named capture and completeness/exit-status checks; do not treat missing output as clean. These are source-confirmed contract gaps; no new reviewer hang was induced.
- **Visual FAIL can coexist with the written overall PASS rule.** Line 37 calls a repeated document run a FAIL and line 64 requires no measured per-shot FAIL, but line 69 only requires §2/§4 to be **completed**, §3 mismatch-free and findings dispositioned; it omits applicable §5 success. Line 8 permits “accepted with reason.” Thus a written acceptance can satisfy the final predicate despite an explicit document-run/alignment failure. Require every applicable visual gate to pass, and distinguish nonblocking accepted observations from failed criteria that must keep the gate closed (`.claude/skills/video-qa/SKILL.md:8,37,62–69`; `tools/review/align.py:59–66`).
- **Second-model independence remains implicit in this gate.** All three shown routes use Codex and none compares the reviewer with the actual author (`.claude/skills/video-qa/SKILL.md:44–54`; `tools/review/second-look.sh:8`). That supports the current Claude-author path, but not a Codex-authored shot. `AGENTS.md:30` requires a different model; the script gate already has an actual-author selector. Reuse that selector and record the actual model for each pass. No claim is made that the saved ep01 reviewer violated independence.

**What still blocks A:** 3 points. Capture and validate the spatial report, compose PASS from successful applicable sections including §5, and choose the reviewer relative to the actual author. Retain the now-fixed short-hold detection, checksum identity, dedicated explanation prompt, shot/full distinction and new cold-viewer escalation. Saved viewer evidence corroborates the new review's purpose (`episodes/ep01-password-storage/reviews/viewer-r1-codex.md:3–15`; `LEARNINGS.md:178–199`), not completion of the new gate on the current MP4.

## package-review — 108/120, A (+16)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 16/20 | Exact-QA identity, missing-ranking BLOCKED, used-credit copying and current disclosure evidence add real delta; title/thumbnail heuristics remain familiar (.claude/skills/package-review/SKILL.md:10–25). |
| D2 Mindset + procedures | 13/15 | Paid-off promise, complementary packaging and evidence-completeness distinguish publishable from merely attractive; ranking tie/disagreement decisions remain implicit (.claude/skills/package-review/SKILL.md:17–25). |
| D3 Anti-pattern quality | 13/15 | No unused sources, inherited disclosure decision or unauthorized upload addresses concrete release mistakes; heuristic exceptions are not discussed (.claude/skills/package-review/SKILL.md:20,24,28–33). |
| D4 Specification | 15/15 | Valid metadata names package components, exact-video verdicts and post-QA/change/upload triggers (.claude/skills/package-review/SKILL.md:2–3). |
| D5 Progressive disclosure | 14/15 | A 33-line self-contained gate loads the current authoritative policy only at the disclosure decision and names real local inputs (.claude/skills/package-review/SKILL.md:10–25). |
| D6 Freedom calibration | 14/15 | Creative choices stay open while QA identity, provenance and missing evidence are strict; numerical packaging limits are house choices, not alleged platform rules (.claude/skills/package-review/SKILL.md:17–25). |
| D7 Pattern recognition | 9/10 | Compact Process has prerequisites, evidence rows, verdict distinctions and row invalidation; ranking retries could be specified (.claude/skills/package-review/SKILL.md:8–28). |
| D8 Practical usability | 14/15 | Current paths/credits/chapters are real, six-way comparison is unambiguous and stale or incomplete evidence blocks; snippet working-directory context could be explicit (.claude/skills/package-review/SKILL.md:11–25). |

**Remaining critical issues:** none found in the revised gate. QA PASS must cover the exact video hash; chapters must diff exactly; a missing blind ranking or unclear/test-only provenance is BLOCKED; disclosure requires today's official page and a reason (`.claude/skills/package-review/SKILL.md:10–25`). Existing artifacts demonstrate why these checks matter: description timestamps `2:55/3:16` differ from generated chapters `2:56/3:17` (`episodes/ep01-password-storage/out/description.md:11–12`; `episodes/ep01-password-storage/out/chapters.txt:6–7`), and the old package report passed feed size while deferring ranking (`episodes/ep01-password-storage/reviews/package-r1.md:7,14`). The revised instructions catch these cases; they are not residual skill defects. The ledger's local-only status is authorized and its used-entry report copy supplies the durable handoff.

**What still blocks A:** nothing; exactly at the threshold. Refinements: (1) state whether each relative `out/`/`reviews/` command runs from the episode directory while the credit ledger is repo-relative; (2) define how a weak/tied blind ranking is revised and re-ranked, recording the actual reviewer model; (3) make familiar title/word-count heuristics subordinate to a recorded editorial decision when necessary. No current policy conclusion, complete asset-rights audit or new package PASS is asserted by this grading exercise.

---

# Round 2 (2026-11-10)

Re-graded the rewritten skills against the **complete** rubric at `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md`. These scores assess the instructions an agent can follow, including their actual repository contracts; they do not grade ep01's artistic quality. A starts at **108/120**. All nine improve; **episode-research reaches A**. The largest remaining shared problem is the new-episode handoff: storyboard requires synthesized voice, but voice extraction requires the storyboard. This affects subsequent episodes, while ep01's existing files conceal it.

| Skill | Baseline score/grade | New score/grade | Change |
|---|---:|---:|---:|
| episode-research | 88/120 · C | **109/120 · A** | +21 · C → A |
| episode-brief | 80/120 · D | **105/120 · B** | +25 · D → B |
| script-writing | 97/120 · B | **105/120 · B** | +8 · B → B |
| script-review | 86/120 · C | **100/120 · B** | +14 · C → B |
| storyboard | 79/120 · D | **94/120 · C** | +15 · D → C |
| voice-narration | 83/120 · D | **103/120 · B** | +20 · D → B |
| video-build | 79/120 · D | **99/120 · B** | +20 · D → B |
| video-qa | 90/120 · C | **101/120 · B** | +11 · C → B |
| package-review | 70/120 · F | **92/120 · C** | +22 · F → C |

## Method, inventory and verification boundaries

- Read all nine current skills completely, plus the full judging rubric. Dimension maxima: **D1 20; D2–D6 15 each; D7 10; D8 15**. Grades: A ≥108, B 96–107, C 84–95, D 72–83, F <72. Baseline scores above are copied from the original table below; the baseline's assertions are not treated as fresh verification.
- All nine have matching lowercase hyphenated names and simple, valid frontmatter with WHAT, WHEN and useful trigger keywords. Every skill directory still contains only `SKILL.md`; none has bundled references, scripts or assets. Compact self-contained skills receive disclosure credit without needing extra files. E:A:R estimates below mean expert/project knowledge : activation reminders : redundant material, weighted approximately by content rather than measured tokens.
- Read actual tool implementations, relevant `video/src/` components and registration, all of `LEARNINGS.md`, and ep01's script, fact-sheet entries, brief, review evidence, segment shape, narration manifest and packaging artifacts. Source inspection confirms behavior; historical render failures in `LEARNINGS.md` remain historical observations, not freshly reproduced renderer results.
- Executed the phonemizer preflight: fused `SHA` spells the letters; spaced `S H A` produces the article sound for A. Recomputed the three SHA-256 examples in F43. Ep01's manifest has **86 lines, 1,545 words and median 160.2 wpm**; its built timing is **628.067 seconds (10:28)**, supporting the revised pace guidance. Verified pause constants and caption mapping in `tools/build-episode.ts:18–27,45–55`.
- In a disposable copy, ran narration sync and storyboard-line extraction: **0 beats changed, 86 lines, exact equality with saved ep01 narration**. Ran the storyboard's root-directory stills command: it fails with `ENOENT: src/episodes/ep01.json`, as predicted by `video/stills.mjs:12–13`. A synthetic five-second static clip produced **no freeze event at d=8**, but a freeze event at d=2. These are focused functional checks, not a full episode render or QA pass.
- Checked `codex exec --help` against the review flags and inspected the installed Remotion CLI's flag declarations (`video/node_modules/@remotion/cli/dist/print-help.js:155–198`). Model availability, reviewer authentication and external reviewer output were **not** tested. TTS synthesis, full transcription, full render, actual playback, licences and a new independent visual review were **not** performed. No claims of current ep01 publication readiness follow from this audit.
- Checked the live official YouTube disclosure and monetization pages only for the policy assertions identified below. Repository source was the primary evidence for executable contracts. Junior recall succeeded using a disposable SQLite backup because the original database rejected writes; it yielded no episode-specific instruction that supersedes this repository.
- Locations below are repository-relative **file:line** references to the evaluated snapshot. Issues and remaining improvements are recorded here; no skill implementation or episode asset was edited. The baseline begins after the separator and is preserved byte-for-byte.

| Skill | Lines / bytes | Pattern | Approx. E:A:R | External loading assessment |
|---|---:|---|---|---|
| episode-research | 41 / 3,091 | Process | 85:15:0 | Self-contained fact contract; topic approval routes to season/brief. |
| episode-brief | 41 / 3,685 | Philosophy + Process | 85:15:0 | Explicit feedback and prior-episode loading; no first-episode fallback. |
| script-writing | 52 / 4,150 | Process | 80:20:0 | Binding style §§5–6 identified; architecture reading not section-routed. |
| script-review | 55 / 4,238 | Process + Tool | 85:15:0 | Inputs embedded in invocation; initial-round and focused-closure branches incomplete. |
| storyboard | 45 / 4,073 | Process + Tool | 85:15:0 | Registry/schema named, but prerequisite order and episode-specific helpers are concealed. |
| voice-narration | 49 / 3,715 | Tool | 90:10:0 | Self-contained preflight and repair decisions; build handoff lacks exact invocation. |
| video-build | 55 / 5,515 | Tool | 90:10:0 | Good medium selector; exceptional render/asset paths need explicit branches. |
| video-qa | 57 / 4,405 | Tool | 85:15:0 | Compact ordered checks; the helper's actual review scope is not disclosed. |
| package-review | 24 / 2,257 | Process | 55:40:5 | Short input/check/output contract; policy needs a dated primary-source route. |

Shared reference sizes: `docs/my-writing-style.md` **210 lines / 20,319 bytes**; `docs/research/Script flow teardown.md` **308 / 54,547**; `docs/season-1.md` **22 / 1,351**; `LEARNINGS.md` **176 lines**. The style guide's binding sections start at lines **116** and **174**; architecture templates A–E start at **84, 114, 155, 187, 221**. Naming those specific routes would avoid loading unrelated material. High expert ratios do not excuse wrong commands: D8 and, where necessary, D2/D6 lose points separately.

## episode-research — 109/120, A (+21)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Stable IDs, normative scope and reproducible figures are concentrated project knowledge; source-order reminders add a little familiar material (`.claude/skills/episode-research/SKILL.md:12–25`). |
| D2 Mindset + procedures | 14/15 | Question → scoped evidence → computation → narrow/cut is strong reasoning; the inference-status decision remains ambiguous (`.claude/skills/episode-research/SKILL.md:27–30`). |
| D3 Anti-pattern quality | 14/15 | Benchmark-as-history, unopened snippets and cross-shot drift have concrete failure reasons (`.claude/skills/episode-research/SKILL.md:19,37–41`); contradictory-source handling is missing. |
| D4 Specification | 15/15 | Valid metadata identifies fact-sheet creation, maintenance, reviewer scope findings and on-screen-number tracing (`.claude/skills/episode-research/SKILL.md:2–3`). |
| D5 Progressive disclosure | 14/15 | Forty-one lines provide a self-contained contract without orphan resources; the season/brief approval route could be more precise (`.claude/skills/episode-research/SKILL.md:10`). |
| D6 Freedom calibration | 13/15 | Strong evidence boundaries leave research judgment intact, but attributed inference lacks an explicit permitted-status rule (`.claude/skills/episode-research/SKILL.md:17,29`). |
| D7 Pattern recognition | 9/10 | Clear compact Process with an expansion branch; missing a final dependent-artifact check prevents full marks (`.claude/skills/episode-research/SKILL.md:27–35`). |
| D8 Practical usability | 12/15 | F43's digests reproduce and the scope fixes match r4/r5, but status and downstream invalidation need tighter handoffs (`.claude/skills/episode-research/SKILL.md:17,29–31`). |

**Critical issues / evidence**

- **Inference status is underspecified, not a demonstrated false research result.** Only VERIFIED facts may be consumed at `.claude/skills/episode-research/SKILL.md:8`, yet line 17 gives “inferred” as a reason for UNVERIFIED and line 29 allows a labelled inference into the script. Distinguish a VERIFIED report that a named researcher inferred something from an unsupported inference by the author. Ep01's Adobe warning makes this distinction necessary (`episodes/ep01-password-storage/factsheet.md:286`).
- **A changed fact's dependency sweep is incomplete.** `.claude/skills/episode-research/SKILL.md:31` names script, storyboard props and written captions, but ep01 also has segment-owned JSON and generated/embedded values. Narration sync does not change props (`tools/sync-storyboard-vo.py:22–26`), and the recap embeds ciphertext in TSX (`video/src/segments/segE/Recap.tsx:39`). This is a missing invalidation rule, not proof those current values are wrong.

**Top 3 improvements** — already ≥108; these strengthen A rather than being required to cross it.

1. Define statuses for **verified attribution**, computed evidence and unsupported author inference; show one permissible attributed sentence and one forbidden inference.
2. Route fact changes through the full revision sweep in `script-writing`, including segment JSON, TSX data, generated Lottie, audio, captions and the final description; invalidate dependent gates until rebuilt.
3. Add a contradictory/superseded-source branch: retain the stable ID, record which source/date wins and why, and narrow or block consumption when the conflict is unresolved.

## episode-brief — 105/120, B (+25)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Mechanism-to-medium choices and meaning-sensitive finishes replace the generic outline with hard-won local taste (`.claude/skills/episode-brief/SKILL.md:20–28,36–41`). |
| D2 Mindset + procedures | 13/15 | “What must be seen?” plus a phone proof shapes decisions, but selecting a season topic skips that season's preparation requirements (`.claude/skills/episode-brief/SKILL.md:11,20,33–34`). |
| D3 Anti-pattern quality | 14/15 | No boards, decorative 3D, stock labels or rusty security props all have reasons (`.claude/skills/episode-brief/SKILL.md:36–41`); rights/provenance rejection lacks an equally clear rule. |
| D4 Specification | 15/15 | Description covers choosing topics, briefs, channel-style changes and repairing an off-target look (`.claude/skills/episode-brief/SKILL.md:2–3`). |
| D5 Progressive disclosure | 13/15 | Feedback and previous artifacts are mandatory at the right step, but no first-episode or missing-prior-review branch exists (`.claude/skills/episode-brief/SKILL.md:13–15`). |
| D6 Freedom calibration | 12/15 | Operator ownership and proof gates fit the risk; a fixed four-medium menu and unstated inherited defaults constrain less well-covered topics (`.claude/skills/episode-brief/SKILL.md:20–31`). |
| D7 Pattern recognition | 9/10 | Philosophy → medium selection → proof is well matched to creative work; failure/revision routing could be sharper (`.claude/skills/episode-brief/SKILL.md:17–34`). |
| D8 Practical usability | 11/15 | Current look decisions match the log, but topic preconditions and inherited channel constants still require agent inference (`.claude/skills/episode-brief/SKILL.md:11,31`). |

**Critical issues / evidence**

- **A listed topic is treated as sufficient preparation.** `.claude/skills/episode-brief/SKILL.md:11` sends the agent straight to the next season topic; the detailed hook, misconception and three sources are only required for a shortlist. `docs/season-1.md:21–22` requires those for **each** episode before research and explicitly says hooks are unverified. Topic authorization and evidence preparation need separate checks; the approved list itself need not be re-approved.
- **Channel inheritance is not fully resolvable.** `.claude/skills/episode-brief/SKILL.md:8` says channel rules live in AGENTS/LEARNINGS, while line 31 says to inherit channel motion/colour/sound values. Ep01 actually stores numeric palette, motion and sound defaults in `episodes/ep01-password-storage/brief.md:17–21,37–41,52–53`. The skill names the previous brief, but does not identify which old values remain binding after later feedback; even its 15% bottom exclusion differs from storyboard/build's 12% (`episodes/ep01-password-storage/brief.md:20`; `.claude/skills/storyboard/SKILL.md:35`).
- **Lottie provenance can disappear at medium selection.** The flow recommendation at `.claude/skills/episode-brief/SKILL.md:24` omits the log's warning about suspected re-uploads and unclear rights (`LEARNINGS.md:77`). Later packaging can block, but the brief offers no route for rejecting or replacing an unsuitable source before editing it.

**Top 3 improvements to reach A** — gap: 3 points.

1. Separate season approval from the per-episode hook/source preparation check, with an explicit “hook unavailable → evergreen framing or operator decision” branch.
2. Name one maintained channel-defaults location or require an explicit inherited-values table with source and superseding decision; resolve safe-area, motion and sound defaults there.
3. Add first-episode/missing-reference recovery and a provenance check before adopting a Lottie family; let an unavailable medium fall back to a justified prototype rather than silently skipping the proof.

## script-writing — 105/120, B (+8)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Kokoro hazards, scope-preserving teases and dependency sweeps are valuable; a few universal hook/ending reminders remain (`.claude/skills/script-writing/SKILL.md:24–29,41–52`). |
| D2 Mindset + procedures | 14/15 | Architecture choice, beat budgets and revision propagation work together; the audio regeneration order is incomplete (`.claude/skills/script-writing/SKILL.md:10–21,41–45`). |
| D3 Anti-pattern quality | 14/15 | Lone-A, hidden-lexicon, source-scope and cliché bans have concrete causes; stale TTS input is not explicitly prohibited (`.claude/skills/script-writing/SKILL.md:24–29,47–52`). |
| D4 Specification | 15/15 | Metadata covers drafts, claim changes, review revisions and pronunciation repair (`.claude/skills/script-writing/SKILL.md:2–3`). |
| D5 Progressive disclosure | 13/15 | Binding §§5–6 are named, but architecture reading lacks template-specific loading and skip guidance (`.claude/skills/script-writing/SKILL.md:8–10`). |
| D6 Freedom calibration | 12/15 | Topic-driven architecture is useful; mandatory rotation partly substitutes a policy claim for creative judgment (`.claude/skills/script-writing/SKILL.md:18`). |
| D7 Pattern recognition | 9/10 | Strong Process from architecture to budget to revision, with an identifiable gate handoff (`.claude/skills/script-writing/SKILL.md:10–45`). |
| D8 Practical usability | 10/15 | Pace numbers and parser-compatible current text check out, but revisions can leave narration inputs and built output stale (`.claude/skills/script-writing/SKILL.md:39,43–45`). |

**Critical issues / evidence**

- **The revision steps do not synchronize the TTS input.** `.claude/skills/script-writing/SKILL.md:43–44` updates dependent wording and re-synthesizes changed lines without explicitly running sync → extraction. `tools/sync-storyboard-vo.py:22–26` only writes storyboard beats, and `tools/storyboard-lines.ts:6–10` separately creates `voice/lines.json`. Synth reads that JSON (`tools/tts/synth.py:23–24`), so the missing step can synthesize old wording despite a corrected script. The current ep01 inputs match; this is a reproducible contract gap for subsequent revisions.
- **The dependency list stops short of actual TSX consumers.** `.claude/skills/script-writing/SKILL.md:43` lists JSON, Lottie and caption mappings but not `video/src/segments/` or shared components. The recap ciphertext is literal TSX (`video/src/segments/segE/Recap.tsx:39`); the corrective lesson explicitly concerns this cross-shot value (`LEARNINGS.md:170–171`).
- **Template rotation is not a verified YouTube rule.** `.claude/skills/script-writing/SKILL.md:18` attributes repeated structure to YouTube's treatment. The official policy allows similar patterns when the substance is materially varied; rotating architecture alone does not establish originality. Treat rotation as editorial taste and assess substantive variation separately. [YouTube monetization policy](https://support.google.com/youtube/answer/1311392?hl=en).

**Top 3 improvements to reach A** — gap: 3 points.

1. Give the exact revision order: edit canonical script/segment data → sync narration → regenerate lines → synthesize changed IDs → patch manifest → rebuild timing/captions → re-review the content actually voiced.
2. Include TSX and generated data in the dependency sweep, and explicitly invalidate script/video/package evidence when their inputs change.
3. Route architecture reading to the chosen template; keep topic suitability primary and label rotation as a house preference rather than a platform requirement.

## script-review — 100/120, B (+14)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Real capture/stdin failures, scope traps and prior-blocker closure dominate; rubric reminders add modest familiar content (`.claude/skills/script-review/SKILL.md:19–23,39–50`). |
| D2 Mindset + procedures | 13/15 | Evidence-based closure and operator-precedence rules are strong; initial/full versus focused review contracts conflict (`.claude/skills/script-review/SKILL.md:22,50`). |
| D3 Anti-pattern quality | 14/15 | No memory fact-checks, style-only pass or stale pronunciation advice are specific and justified (`.claude/skills/script-review/SKILL.md:46–55`); weak revision identity is not caught. |
| D4 Specification | 15/15 | Clear valid metadata advertises an independent script gate, scope checks and re-review (`.claude/skills/script-review/SKILL.md:2–3`). |
| D5 Progressive disclosure | 13/15 | Source documents are embedded in the invocation, but first-round and focused-closure loading branches are not fully specified (`.claude/skills/script-review/SKILL.md:15–17,50`). |
| D6 Freedom calibration | 10/15 | Fixed author/reviewer identities and a full-review completeness rule overconstrain valid independent or focused runs (`.claude/skills/script-review/SKILL.md:11,22,50,53`). |
| D7 Pattern recognition | 9/10 | Well-organized Process/Tool gate with a fail-closed round rule and recovery routes (`.claude/skills/script-review/SKILL.md:8–23,49–50`). |
| D8 Practical usability | 8/15 | CLI flags are supported, but minute-level filenames, weak snapshot identity and closure validation can still break the loop (`.claude/skills/script-review/SKILL.md:11–22`). |

**Critical issues / evidence**

- **Focused closure can be rejected by the completeness check.** `.claude/skills/script-review/SKILL.md:22` requires every file to have full rubric and fact tables; line 50 switches to focused closure from round three. The repository's successful r5 closure contains a two-row check table and carried-forward assessments, not a full rubric (`episodes/ep01-password-storage/reviews/script-r5-codex.md:3–10`). Define required output for each mode and explicit score carry-forward.
- **The supposedly unique path is only minute-unique.** `.claude/skills/script-review/SKILL.md:13` uses `date +%H%M`; retries in the same minute share a file despite line 21's prohibition. The collision this is meant to prevent is recorded at `LEARNINGS.md:27`. Use a random suffix or `mktemp`, including the round.
- **Review identity is insufficient for uncommitted work.** HEAD plus `git diff --stat` at `.claude/skills/script-review/SKILL.md:11` does not identify contents; different edits with identical counts share the same label, and untracked inputs do not appear. Hash the actual script/fact-sheet inputs and recheck before accepting the verdict.
- **Independence assumes a Claude author.** `.claude/skills/script-review/SKILL.md:11,53` hardcodes Claude → GPT rather than comparing actual author/reviewer models. This is valid for the stated Claude path, but it does not safely route a Codex-authored script to an independent model. Model selection/authentication was not exercised in this audit.

**Top 3 improvements to reach A** — gap: 8 points.

1. Define separate full-review and focused-closure schemas, explicit carry-forward of prior scores, and a first-round branch without a previous review file.
2. Use collision-resistant output paths and content hashes for the reviewed inputs; reject a verdict if those inputs changed during review.
3. Select an independent reviewer outside the actual author's model family; include a concrete fallback invocation and complete-output check for that provider.

## storyboard — 94/120, C (+15)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Beat-level semantic changes, truthful props and actual schema are strong local knowledge (`.claude/skills/storyboard/SKILL.md:12–29`). |
| D2 Mindset + procedures | 12/15 | Meaning-led shot planning is strong, but voice-first sequencing cannot bootstrap the advertised new-episode flow (`.claude/skills/storyboard/SKILL.md:11`). |
| D3 Anti-pattern quality | 13/15 | Decorative motion, cards, fake hardware and generated text are concrete bans; helper scope and gallery timing traps are not addressed (`.claude/skills/storyboard/SKILL.md:12,42–45`). |
| D4 Specification | 15/15 | Metadata clearly covers timed storyboards, registry props, segmentation and QA repairs (`.claude/skills/storyboard/SKILL.md:2–3`). |
| D5 Progressive disclosure | 12/15 | Registry and type sources are named, but episode-specific helper assumptions and build-before-stills prerequisites are undisclosed (`.claude/skills/storyboard/SKILL.md:15,28,32,40`). |
| D6 Freedom calibration | 10/15 | Precise fragile contracts are appropriate, but circular ordering and conflicting text minima require guesses (`.claude/skills/storyboard/SKILL.md:11,35`). |
| D7 Pattern recognition | 8/10 | A clear Process/Tool shape is weakened by proof and generation steps that require a build not yet described (`.claude/skills/storyboard/SKILL.md:15,37–40`). |
| D8 Practical usability | 6/15 | The schema fits the builder, but root stills fails, helpers target ep01, and segment shape is misstated (`.claude/skills/storyboard/SKILL.md:15,28,32`). |

**Critical issues / evidence**

- **Voice-first is circular for a new episode.** `.claude/skills/storyboard/SKILL.md:11` demands synthesized voice first; `.claude/skills/voice-narration/SKILL.md:11` extracts voice from storyboard beats. `tools/storyboard-lines.ts:6–10` requires an existing `storyboard.json` and `voice/` directory. Define an untimed narration skeleton or script-based extraction before timed shot planning.
- **The documented root stills command fails.** `.claude/skills/storyboard/SKILL.md:15` says `node video/stills.mjs ...`; `video/stills.mjs:12–13` reads `src/episodes/<id>.json` and resolves `src/index.ts` from CWD. Running it from the repo root reproduced ENOENT. It also requires built timing, so it is an assembly-before-full-render proof, not a pre-assembly step.
- **General-purpose claims conceal ep01-only contracts.** `.claude/skills/storyboard/SKILL.md:28,32` routes to helpers as if usable for any episode; `tools/beat-frames.py:9–10` hardcodes 30 fps and ep01's manifest, while `tools/merge-segments.py:7–12` hardcodes ep01 and segments A–E. Segment files are scene arrays, not the full storyboard object's “same shape” shown at skill lines 18–24 (`episodes/ep01-password-storage/segments/A.json:1`; `tools/merge-segments.py:12`).
- **Timing and text exceptions are inconsistent.** The claimed 8–23 extra scene-ending frames at `.claude/skills/storyboard/SKILL.md:28` omit the final 2.5-second tail: at 30 fps it adds roughly 61–62 frames over the normal 0.45-second beat pause (`tools/build-episode.ts:24–27,40,52`). Line 35 simultaneously requires readable text ≥24 px and permits 20–28 px Lottie labels without defining an exception; the 20 px role is real (`tools/lottie/lot.py:182–183`).

**Top 3 improvements to reach A** — gap: 14 points.

1. Define a two-pass storyboard: script-reviewed narration skeleton → extract/synthesize voice → assign timed shots → assemble built JSON → phone proof; give the working `video/` CWD.
2. Mark current merge/beat helpers as ep01-only until parameterized; document scene-array segments, canonical ownership and the exact merge/build/markdown order.
3. Derive offsets/tails from built timing, explicitly include the final tail, and reconcile label minima with a measured phone-size exception rather than contradictory thresholds.

## voice-narration — 103/120, B (+20)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Verified phoneme behavior, per-line speed drift and manifest repair are unusually dense expert knowledge (`.claude/skills/voice-narration/SKILL.md:13–44`). |
| D2 Mindset + procedures | 13/15 | Preflight → synthesize → normalize comparisons → listen is sound; initial extraction and revision synchronization lack a complete route (`.claude/skills/voice-narration/SKILL.md:10–11,43–44`). |
| D3 Anti-pattern quality | 14/15 | Hidden lexicons, paragraph-only calibration and trusting Whisper are rejected for concrete reasons (`.claude/skills/voice-narration/SKILL.md:26–40,46–49`). |
| D4 Specification | 15/15 | Metadata identifies generation, audition, pronunciation and selective repair triggers (`.claude/skills/voice-narration/SKILL.md:2–3`). |
| D5 Progressive disclosure | 13/15 | Short self-contained tool workflow; bare build handoff and prerequisites need exact routes (`.claude/skills/voice-narration/SKILL.md:11,44`). |
| D6 Freedom calibration | 12/15 | Calibrated speed and listen/reword choices fit TTS fragility, but error and synchronization handling leave too much discretion (`.claude/skills/voice-narration/SKILL.md:29–44`). |
| D7 Pattern recognition | 9/10 | Strong Tool pattern with mismatch-specific actions and single-line repair (`.claude/skills/voice-narration/SKILL.md:31–44`). |
| D8 Practical usability | 8/15 | Preflight runs and speed metrics match ep01, but new-episode bootstrapping and repair consistency are incomplete (`.claude/skills/voice-narration/SKILL.md:11,44`). |

**Critical issues / evidence**

- **New-episode extraction has unstated prerequisites and the shared cycle.** `.claude/skills/voice-narration/SKILL.md:11` cannot run until `storyboard.json` and `voice/` exist (`tools/storyboard-lines.ts:6,10`), while storyboard demands voice first (`.claude/skills/storyboard/SKILL.md:11`). Ep01's established directory is not evidence that a new episode can bootstrap.
- **Repair can desynchronize source text and narration.** `.claude/skills/voice-narration/SKILL.md:44` patches WAV/manifest but does not explicitly update/re-extract the canonical script → storyboard → `voice/lines.json` chain. `tools/build-episode.ts:46–50` checks the ID/duration but takes caption wording from `beat.vo`; it does not compare that text with the manifest's text. A repaired voice can therefore disagree with captions without an error.
- **The build handoff is not an actionable command.** `.claude/skills/voice-narration/SKILL.md:44` only says rerun `build-episode.ts`; its actual signature needs `<episode-dir> <id> [storyboard.json]` (`tools/build-episode.ts:1,13–16`). Build outputs also require `out/` to exist (`tools/build-episode.ts:74–75`).

**Top 3 improvements to reach A** — gap: 5 points.

1. Provide the bootstrap/skeleton route, create required directories, and explicitly require a passing script review before initial synthesis.
2. Make selective repair update the canonical text, regenerate line JSON, patch exactly one matching manifest ID and verify text equality before rebuilding; keep whole-episode resynthesis prohibited.
3. Give the exact build command and prerequisite directories, then verify the repaired WAV's duration/edges and regenerated captions against the approved wording.

## video-build — 99/120, B (+20)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 19/20 | Disk/audio lessons, GPU backend, scan pivots, reflected labels and texture limits are dense repository expertise (`.claude/skills/video-build/SKILL.md:24–47,54`). |
| D2 Mindset + procedures | 13/15 | Medium selection and still-first iteration shape decisions; new-composition registration and serialized fallback are missing (`.claude/skills/video-build/SKILL.md:10–28,33–39`). |
| D3 Anti-pattern quality | 13/15 | Strong learned prohibitions; indiscriminate credit-file exclusion and TMP cleanup lack the right scope (`.claude/skills/video-build/SKILL.md:27,55`). |
| D4 Specification | 15/15 | Metadata precisely covers visual changes, assembly, rendering and repair (`.claude/skills/video-build/SKILL.md:2–3`). |
| D5 Progressive disclosure | 12/15 | Code paths and conditional medium routes help, but generic commands conceal ep01-only registration/helper assumptions (`.claude/skills/video-build/SKILL.md:8,12,31`). |
| D6 Freedom calibration | 10/15 | Fragile render/credit operations need stronger contracts; current text and cleanup absolutes are overbroad (`.claude/skills/video-build/SKILL.md:16,27,50,55`). |
| D7 Pattern recognition | 9/10 | Appropriate compact Tool pattern with actual commands and non-obvious failure lessons (`.claude/skills/video-build/SKILL.md:10–47`). |
| D8 Practical usability | 8/15 | Core flags and material/label APIs exist, but a new episode is unregistered and output/credit handoffs are incomplete (`.claude/skills/video-build/SKILL.md:12–22,55`). |

**Critical issues / evidence**

- **Generating a new episode JSON does not register its composition.** `.claude/skills/video-build/SKILL.md:12–17` presents a generic build-to-render sequence, but `video/src/Root.tsx:8–10` statically imports only ep01. `tools/build-episode.ts:73` writes a new JSON without updating Root. Subsequent episode IDs need explicit import/registration before stills or render.
- **The default render command bypasses the shared lock.** `.claude/skills/video-build/SKILL.md:16–17` uses direct Remotion, while line 26 says one render at a time. Only `tools/render.sh:4–8` enforces cross-worktree serialization. A failure fallback may be necessary (`LEARNINGS.md:159–160`), but the primary/fallback route needs to preserve the lock rather than relying on each agent's awareness.
- **Loudness/output paths are disconnected.** `.claude/skills/video-build/SKILL.md:16` creates `<id>-raw.mp4` in the episode output directory; lines 21–22 read `raw.mp4` and write `<ep>.mp4` relative to the now-active `video/` directory. Those are not the same paths. Placeholder measurement values are reasonable, but raw/final filenames need actual shared variables and mapping to the QA input.
- **Credits have conflicting lifecycle instructions.** `.claude/skills/video-build/SKILL.md:42` says record assets in `credits.json`, line 55 forbids committing it, and package-review requires it (`.claude/skills/package-review/SKILL.md:8,18`). The existing ledger has actual sources/licences, including a model and textures (`video/public/assets/credits.json:361–388`), and is currently untracked. No durable alternative or explicit local-only handoff is defined.
- **Some blanket instructions contradict the real pipeline.** Line 43 groups `Brushed`/`Glass` with scanned-map finishes, but `video/src/three/finish.tsx:28–53,75–82` implements procedural brushed maps and plain glass. Line 50's “never images” excludes the real source screenshots rendered by `video/src/components/DocShot.tsx:24,43`; ≥24 px also conflicts with its own 20 px labels. Line 27's global bundle cleanup is broader than “delete this invocation's bundle”; `video/stills.mjs:20–21` already cleans its own bundle.

**Top 3 improvements to reach A** — gap: 9 points.

1. Document required `out/` creation and Root registration, use one absolute RAW/FINAL path pair through render/loudnorm/QA, and send the completed MP4 explicitly to `video-qa`.
2. Make the serialized wrapper the normal render route; retain serialization during fallback and clean only bundles owned by the finished invocation.
3. Define a durable credits handoff and precise exceptions for authentic document images, small label roles and procedural material helpers; distinguish scanned surfaces from other finishes.

## video-qa — 101/120, B (+11)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 18/20 | Grain-resistant holds, recurring-value checks and rendered-ink measurement are strong local knowledge (`.claude/skills/video-qa/SKILL.md:16,38–49`). |
| D2 Mindset + procedures | 13/15 | Automated, global and per-shot checks are sensibly ordered, but the verdict does not require all of them (`.claude/skills/video-qa/SKILL.md:51–52`). |
| D3 Anti-pattern quality | 14/15 | Contact-sheet-only pacing, desktop-only inspection and silent finding acceptance have concrete failure reasons (`.claude/skills/video-qa/SKILL.md:54–57`). |
| D4 Specification | 15/15 | Metadata explicitly covers full renders, single shots, alignment and independent review (`.claude/skills/video-qa/SKILL.md:2–3`). |
| D5 Progressive disclosure | 14/15 | Concise sections and actual helper paths are easy to load; helper limits and single-shot exceptions need a branch (`.claude/skills/video-qa/SKILL.md:41–49`). |
| D6 Freedom calibration | 11/15 | Numerical gates are useful, but short-hold detection, review completion and accepted-deviation rules leave fragile decisions ambiguous (`.claude/skills/video-qa/SKILL.md:27,42,49,52`). |
| D7 Pattern recognition | 9/10 | A clear Tool/Process gate with rerender loops; full-episode and per-shot entry modes need explicit separation (`.claude/skills/video-qa/SKILL.md:10,44–52`). |
| D8 Practical usability | 7/15 | Alignment thresholds match the implementation and contact-sheet sizing scales, but holds and independent review are not enforced end to end (`.claude/skills/video-qa/SKILL.md:16,27,42,52`). |

**Critical issues / evidence**

- **Short holds are required but not detected by the supplied automation.** `.claude/skills/video-qa/SKILL.md:16` uses `d=8`, while line 27 requires a timestamped list of 2–8-second holds. A five-second synthetic hold returned no events with that exact filter, and an event with `d=2`. Record shorter events then classify them; six-second contact-sheet samples do not fill that measurement gap.
- **The helper does not implement the claimed broad independent review.** `.claude/skills/video-qa/SKILL.md:42` claims pacing/colour-rule review, but `tools/review/second-look.sh:8` supplies a spatial-polish prompt without the brief, timing or colour meanings. It also has no explicit model selection, named report, stdin closure or completeness check, unlike the fixes required by `.claude/skills/script-review/SKILL.md:19–22`. This is a source-confirmed coverage/recovery gap; no external reviewer failure was reproduced here.
- **PASS does not explicitly depend on visual-review completion.** `.claude/skills/video-qa/SKILL.md:52` requires §1, §3 and dispositions, omitting successful completion/evidence for §2, §4 and applicable §5. A missing background review can leave no findings to disposition. Require the report itself and measured checks, rather than treating absence of findings as a clean review.
- **Single-shot entry is incompatible with the whole-episode gate.** The description activates for a single shot (`.claude/skills/video-qa/SKILL.md:3`), while §1 requires brief-length duration and every script sentence (`.claude/skills/video-qa/SKILL.md:23,28`). Define the shot's expected script/range and the checks a shot pass does not establish. Alignment itself is verified: `tools/review/align.py:11,49–60` enforces ≤8% centering and padding strictly greater than 3 px, with horizontal exemption for left alignment.

**Top 3 improvements to reach A** — gap: 7 points.

1. Detect at two seconds, preserve starts/ends/durations, classify 2–8-second holds and block >8-second holds except under a clearly documented exception policy.
2. Separate spatial helper review from episode-level visual/pacing review; pass the brief and timing, select an independent model, capture a durable complete report and wait for it before disposition.
3. Define separate shot/episode verdict contracts requiring every applicable section, bind reports to an input MP4 checksum, and rerun dependent checks when shared generators or the render change.

## package-review — 92/120, C (+22)

| Dimension | Score | One-line reason |
|---|---:|---|
| D1 Knowledge delta | 14/20 | Durable verdicts, local artifact names and licence coverage add value; most title/thumbnail heuristics are familiar (`.claude/skills/package-review/SKILL.md:8–19`). |
| D2 Mindset + procedures | 11/15 | Pairing and payoff checks guide judgment, but missing QA evidence and asset provenance have no complete decision path (`.claude/skills/package-review/SKILL.md:8,15–19`). |
| D3 Anti-pattern quality | 11/15 | Missing-credit and unused-source bans are concrete, but no stale-package, stale-QA or unsupported-disclosure guard exists (`.claude/skills/package-review/SKILL.md:21–24`). |
| D4 Specification | 15/15 | Valid description advertises concrete package checks, verdicts and upload/change triggers (`.claude/skills/package-review/SKILL.md:2–3`). |
| D5 Progressive disclosure | 14/15 | Twenty-four lines are appropriately self-contained; current policy should be loaded only at the disclosure decision (`.claude/skills/package-review/SKILL.md:19`). |
| D6 Freedom calibration | 11/15 | Clear creative constraints and operator upload ownership help; the absolute disclosure rule and unqualified credit rule are too broad (`.claude/skills/package-review/SKILL.md:19,23–24`). |
| D7 Pattern recognition | 8/10 | Recognizable compact Process gate; recovery and evidence criteria are underdeveloped (`.claude/skills/package-review/SKILL.md:8–19`). |
| D8 Practical usability | 8/15 | Named outputs fix the baseline's main omission, but QA identity, stale chapters and incomplete credits can still pass unnoticed (`.claude/skills/package-review/SKILL.md:8,17–19`). |

**Critical issues / evidence**

- **Video-QA PASS is a trigger, not a checked input.** `.claude/skills/package-review/SKILL.md:3` says use after QA passes, but line 8 never requires the QA report or matching MP4 identity; “before any upload” is also a trigger. `AGENTS.md:19` forbids publishing failed video QA. Require an applicable passing report and establish that it covers the exact candidate video before the package can pass.
- **Freshness is already a real packaging failure mode.** `.claude/skills/package-review/SKILL.md:17` requires chapters from the build, yet the saved description's avalanche/login chapters are `2:55` and `3:16` (`episodes/ep01-password-storage/out/description.md:11–12`), while current `episodes/ep01-password-storage/out/chapters.txt:6–7` says `2:56` and `3:17`. The skill needs an exact reconciliation/rebuild check; existence of both files is insufficient. This audit does not claim either set matches the chosen final MP4.
- **The credit ledger is not sufficient evidence of final asset coverage.** `.claude/skills/package-review/SKILL.md:18` relies on `credits.json`, but the Lottie entries are labelled “test only” (`video/public/assets/credits.json:333–358`), while the final pipeline edits stock art (`tools/lottie/lot.py:124–149`). Define how edited/derived assets map to original author, URL, licence and modifications, and how the ledger survives the build skill's no-commit instruction (`.claude/skills/video-build/SKILL.md:55`). These gaps do not prove infringement.
- **Disclosure is stated too categorically and without a current source.** `.claude/skills/package-review/SKILL.md:19` says disclosure is required “only” for realistic synthetic people, places or events and exempts TTS as a class. Current official guidance also addresses generated music and assesses realistic/meaningful alteration, with non-exhaustive examples. Do not infer a blanket TTS exemption from an original script; record the actual audio/visual use and the applicable current rule. [YouTube disclosure guidance](https://support.google.com/youtube/answer/14328491?hl=en).

**Top 3 improvements to reach A** — gap: 16 points.

1. Make the exact rendered MP4 plus its matching QA PASS report a prerequisite; compare generated chapters and final description verbatim and invalidate packaging after relevant video/title/thumbnail changes.
2. Define an episode-used-asset manifest with derivative provenance, accepted licence evidence and a durable storage handoff; separate missing evidence (BLOCKED) from an identified fixable package error (FAIL).
3. Replace the disclosure absolute with a dated official-source decision tree, and define evidence for blind ranking (five candidates, independent model, order, verdict); missing ranking or uncertain policy must not silently become PASS.

---

# Project skill evaluation

Evaluated 2026-11-10 using the complete evaluation protocol in `/Users/psbakre/Projects/dumbledore/config/skills/skill-judge/SKILL.md`. Scores assess the instructions as written, not the quality of ep01 or improvements a capable agent could invent.

| Skill | Score /120 | Grade | Pattern | One-line verdict |
|---|---:|:---:|---|---|
| episode-research | 88 | C | Process | Useful evidence discipline, but it does not preserve the scope and provenance that repeatedly blocked review. |
| episode-brief | 80 | D | Process | A compact brief outline that has not absorbed the project's rejected visual approaches or current medium-selection decisions. |
| script-writing | 97 | B | Process | The strongest skill: specific voice and architecture guidance, weakened by missing scope and revision-propagation safeguards. |
| script-review | 86 | C | Process | A substantive review rubric attached to a known-unreliable invocation and an ambiguous round limit. |
| storyboard | 79 | D | Process | Voice-led planning is sound; incomplete build contracts and weak visual-event requirements undermine the handoff. |
| voice-narration | 83 | D | Tool | Valuable Kokoro lessons coexist with a stale speed default and contradictory pronunciation-repair instructions. |
| video-build | 79 | D | Tool | A useful entry point that omits the disk, audio, determinism and rendering lessons needed to operate reliably. |
| video-qa | 90 | C | Tool | Stronger than a generic QA checklist, but its automation can miss holds and omit the end of a long episode. |
| package-review | 70 | F | Process | Mostly familiar packaging heuristics; no durable output, enforceable verdict or recovery path. |

Scale: A ≥108; B 96–107; C 84–95; D 72–83; F <72. Dimension maxima: D1 20, D2–D6 15 each, D7 10, D8 15. No skill reaches A.

## Method and evidence boundaries

- Read all nine skills completely. The section scans below classify content as **E** (expert/project knowledge), **A** (brief activation reminder), or **R** (redundant). E:A:R ratios are approximate content-weighted estimates, not measured token counts; useful but stale project knowledge still loses D8 points.
- Checked frontmatter names and descriptions, counted lines, inventoried resources, identified patterns, and mentally followed commands and handoffs. All nine have valid-looking simple YAML frontmatter, matching lowercase hyphenated names, and descriptions with WHAT, WHEN and relevant keywords. None needs a format deduction merely for being short.
- Read `AGENTS.md`, `LEARNINGS.md`, and all ten `episodes/ep01-password-storage/reviews/*.md` files **only to check accuracy and operational fit**, including the chronology of corrections. The older reviews' “S H A”/“at sign” suggestions do not override later operator feedback. The early “ship-able” video verdict does not override AGENTS' publication gate.
- D8 distinguishes **contradiction/staleness demonstrated by the record**, **an omitted recovery path demonstrated by the record**, and **an unverified dependency**. Missing instructions are not proof an implementation is broken. No render, source audit, policy lookup, reviewer launch or tool-source inspection was performed.
- Only metadata (existence, line/byte counts) was inspected for external reference documents and tool dependencies below. Their contents were not independently validated; no credit is assumed for unseen reference content. Junior recall was attempted as required by the supplied workspace instructions, but returned `attempt to write a readonly database`; no recovered guidance influenced these scores.
- Compact, self-contained skills can score well on D5 without a `references/` directory. Deductions concern ambiguous or missing loading routes, not absence of extra files. Detailed deductions below cover every dimension below 80% of its maximum; other deductions are stated in the score rows.

Evidence notation: **S:Lx** means the evaluated skill's `SKILL.md`, line x; **L:x** means root `LEARNINGS.md`, line x; **A:x** means root `AGENTS.md`, line x. Review filenames refer to `episodes/ep01-password-storage/reviews/`. These locations identify the evaluated snapshot.

## Structure and resource inventory

Every skill directory contains only `SKILL.md`: no bundled scripts, references or assets. These are lightweight project workflows relying on resources outside their own directories.

| Skill | SKILL.md lines | Bytes | External reading route |
|---|---:|---:|---|
| episode-research | 17 | 1,369 | Playbook cited for one assertion; no instruction to load a relevant section. |
| episode-brief | 21 | 1,805 | “see” creative-process document; channel style bible unnamed. |
| script-writing | 40 | 2,837 | Architecture source and binding voice §5 named at their steps; no explicit selective-loading instruction for §6. |
| script-review | 34 | 2,013 | Architecture and voice §5 named inside rubric; input-loading procedure absent. |
| storyboard | 29 | 1,908 | Brief §9 routed at shot selection; voice-narration routed at timing; no schema reference. |
| voice-narration | 25 | 1,870 | script-writing routed for spoken text; Kokoro VOICES.md cited without a location. |
| video-build | 25 | 1,623 | Local code locations and commands, no conditional implementation references. |
| video-qa | 42 | 3,500 | Brief/style/storyboard checks plus alignment and second-look tools; style-bible location unnamed. |
| package-review | 12 | 1,054 | Fact sheet and storyboard mentioned inline, no detailed reference route needed for this size. |

Explicit documentary references, shared rather than bundled:

| Reference | Lines | Bytes | Skills that name it |
|---|---:|---:|---|
| `docs/research/Tech explainer YouTube playbook.md` | 122 | 33,143 | episode-research |
| `docs/research/Video creative process and skills.md` | 293 | 36,811 | episode-brief |
| `docs/research/Script flow teardown.md` | 308 | 54,547 | script-writing, script-review |
| `docs/my-writing-style.md` | 210 | 20,319 | script-writing, script-review |
| Channel style bible | — | — | episode-brief, video-qa; no concrete path supplied |
| Kokoro `VOICES.md` | — | — | voice-narration; no concrete path supplied |

Named executable/code dependencies (metadata only):

| Dependency | Lines | Bytes | Used by |
|---|---:|---:|---|
| `tools/tts/synth.py` | 38 | 1,746 | voice-narration |
| `tools/tts/transcribe.py` | 23 | 1,063 | voice-narration, video-qa |
| `tools/build-episode.ts` | 89 | 5,044 | voice-narration names `build-episode.ts` without its directory |
| `video/src/index.ts` | 4 | 89 | video-build |
| `video/src/transitions.tsx` | 22 | 1,259 | video-build |
| `tools/review/align.py` | 70 | 3,197 | video-qa |
| `tools/review/second-look.sh` | 9 | 1,284 | video-qa |

Episode-generated artifacts (`factsheet.md`, `brief.md`, scripts, manifests, storyboard data, checks and renders) have variable sizes and are inputs/outputs, not bundled reference files. Peer-skill routes refer to the nine files inventoried above.

## episode-research — 88/120, C

Source: [SKILL.md](episode-research/SKILL.md). Pattern: **Process**. Knowledge ratio **55:35:10**.

Section scan: output contract **[A]**; question selection **[A]** with ep01 example; source hierarchy **[E/A]**; verified fact-row contract **[E]**; local computation **[E]**; misconception-first rule **[E/A]**; “do not say” list **[E]**; rounding reminder **[A]**. Familiar research advice supplies more of the body than the compressed size initially suggests.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 13/20 | “script-ready claim · exact figure … VERIFIED” (S:L12) is useful project knowledge; primary-source and question-first advice is mostly familiar. |
| D2 Mindset + procedures | 11/15 | Question → source → compute → misconception (S:L10–15) is coherent, but gives no decision rule for unsupported qualifiers or changing evidence. |
| D3 Anti-patterns | 9/15 | “Do not say” and “Never round … in a way that changes it” (S:L15–17) help, but omit the specific scope and inference traps demonstrated in review. |
| D4 Specification | 15/15 | S:L2–3 name fact-sheet creation and explicitly trigger on a new episode, a new scripted fact, or a reviewer finding. |
| D5 Disclosure | 12/15 | Seventeen lines are economical; the playbook reference (S:L14) provides neither a loading trigger nor a targeted section. |
| D6 Freedom | 12/15 | Source and evidence constraints are appropriate, but a mandatory misconception opening (S:L14) is too rigid for every topic architecture. |
| D7 Pattern | 8/10 | Six ordered research steps form a clear Process pattern; branching and completion criteria remain thin. |
| D8 Usability | 8/15 | S:L12 omits explicit stable F IDs and S:L8 is weaker than A:24's VERIFIED-only rule; reviews r3–r5 show why exact scope must survive the handoff. |

**Critical issues**

- **Incomplete evidence contract:** S:L8 allows “facts from” a sheet that S:L12 explicitly permits to contain UNVERIFIED entries; it never explicitly forbids using those entries. AGENTS A:24 does. Stable `[F<n>]` identifiers required by script-writing are also unspecified.
- **Scope is not a first-class field:** `script-r4-codex.md:45–55` isolates the alphabet/length overclaim; `script-r5-codex.md:7–10` passes only after those limits are restored. A figure and URL alone do not preserve benchmark conditions, normative strength or attribution.
- **No evidence-expansion loop:** L:21 says scripting/review must append newly verified facts. The description activates for that case, but the body never tells the agent how to preserve IDs or invalidate dependent wording.

**Episode-specific content:** the password-storage question (S:L10), NIST/OWASP-heavy examples and hash/keyspace computation (S:L11–13) come from ep01. They are acceptable examples, but should be explicitly illustrative; other episodes need equally concrete source/computation routes.

**Top 3 improvements**

1. Define stable fact IDs, a strict VERIFIED-only consumption rule, and claim fields for population, date, conditions, units, attribution and uncertainty.
2. Add an unsupported-claim branch: obtain evidence and append a fact, label an inference, narrow the claim, or remove it; preserve original IDs.
3. Add targeted anti-patterns for benchmark-as-history, SHALL/SHOULD drift, universals and source-incompatible rounding; route playbook reading only when choosing the teaching structure.

**Detailed deductions below 80%:** D1 needs less generic sourcing advice and more claim-boundary expertise; D2/D8 need the unsupported-claim and update branches above; D3 needs the concrete traps from r4 rather than relying on an agent to invent its “do not say” list. Examples should cover another technical domain without turning the skill into a tutorial.

## episode-brief — 80/120, D

Source: [SKILL.md](episode-brief/SKILL.md). Pattern: **Process**, with an underdeveloped Philosophy component. Knowledge ratio **45:45:10**.

Section scan: output/reference **[A]**; context **[A]**; packaging-first decision **[E]**; source material **[A]**; house-style instruction **[E/A]**; reference synthesis **[E/A]**; negative list **[E]**; material doctrine **[E]**; motion specification **[A]**; shot-type list **[A/R]**; colour script **[E]**; sound targets **[E]**; checks **[A]**. It supplies headings more often than expert choices within those headings.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 12/20 | Packaging before script and material-from-process (S:L11,17) add taste; much of S:L10–21 is a familiar brief outline. |
| D2 Mindset + procedures | 10/15 | “what to take, what to ignore” (S:L14) encourages judgment, but no mechanism-to-medium decision process follows. |
| D3 Anti-patterns | 7/15 | “never copy one reference” and “never a filter” (S:L14,17) lack the concrete project failures and reasons in L:56,66–79,142–158. |
| D4 Specification | 15/15 | S:L3 clearly covers episode briefs, channel art direction, pre-storyboard use and repairing an off-target look. |
| D5 Disclosure | 11/15 | A short scaffold is efficient, but “see” a 293-line document and an unnamed bible (S:L8,13) are weak reading routes. |
| D6 Freedom | 10/15 | “Change … deliberately” permits useful judgment, yet the fixed applications list (S:L18) and material doctrine lack context-dependent alternatives. |
| D7 Pattern | 8/10 | The twelve-part Process is easy to follow; it lacks the Philosophy-to-expression reasoning a creative brief needs. |
| D8 Usability | 7/15 | No stale command is proved, but S:L13–18 do not route to the later no-board, meaningful-prop, scans and footage decisions in L:74–77,142–158. |

**Critical issues**

- **Current art-direction constraints are missing:** L:76 explicitly rejects every board mode; L:74 rejects decorative 3D; L:145–158 prefer scans with separable parts, authentic data and licensed hardware footage. The skill neither preserves these decisions nor requires reading the current negative list before making a brief. This is an operational omission, not a claim that the skill explicitly recommends boards.
- **The house style has no resolvable source:** S:L13 assumes a bible without identifying where it lives or whether the task is to create one. Its description includes channel-bible work, but its only output path is an episode brief (S:L8).
- **A visual format is listed instead of justified:** the shot menu includes title/code/data cards but no test that the mechanism is actually visible. `video-visual-codex.md:23–45` and L:56 show that a coherent style alone did not make the explanation work.

**Episode-specific content:** no hardcoded episode path or password fact. Grain/paper/CRT examples (S:L13,17) should be options, not permanent channel identity inherited from ep01. The no-board decision is an operator constraint; ep01's exact drawer colours and prop assignments should remain episode-local.

**Top 3 improvements**

1. Route to the latest operator decisions and a concrete style-bible location; distinguish stable channel rules from episode-specific choices.
2. Add a medium-selection framework: explain what must be seen, choose mechanism object/real evidence/footage/illustration, and reject decorative substitutes.
3. Require a representative phone-size proof and negative-reference comparison before locking the brief; make shot types optional applications rather than a mandatory menu.

**Detailed deductions below 80%:** D1/D2 need selection criteria rather than more headings; D3 needs rejected approaches with causes; D5 needs section-specific reading and a bible destination; D6 needs permission to omit irrelevant formats; D8 needs explicit loading of superseding operator feedback. Do not copy every ep01 prop into the general skill to address these gaps.

## script-writing — 97/120, B

Source: [SKILL.md](script-writing/SKILL.md). Pattern: **Process**. Knowledge ratio **70:25:5**.

Section scan: input/output **[A]**; architecture selector **[E]**; budgeting **[E/A]**; binding voice rules **[E]** with brief familiar reminders **[A]**; format/fact tags **[E]**; read-aloud and handoff **[A]**. The voice and Kokoro constraints carry most of its value; there is little tutorial filler.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 16/20 | Architecture mapping and the lone-A/Kokoro rule (S:L10–18,28) are specific knowledge; standard hook/breath advice still costs some tokens. |
| D2 Mindset + procedures | 12/15 | Topic-to-template choice plus loop/word budgets (S:L10–21) shapes decisions; source-scope and revision reasoning are absent. |
| D3 Anti-patterns | 12/15 | S:L28,32 give concrete pronunciation and cliché bans with some reasons; factual teaser overreach is missing. |
| D4 Specification | 15/15 | S:L3 names narration, inputs, templates and voice, with explicit drafting, rewriting and structural-review triggers. |
| D5 Disclosure | 12/15 | Source documents are named at relevant steps (S:L10,23); only §5 is routed although A:23 binds §§5–6. |
| D6 Freedom | 11/15 | Architecture selection is flexible, but mandatory misconception-first and a universal ≤8-word jargon gloss (S:L25,29) can overconstrain non-concept episodes. |
| D7 Pattern | 9/10 | Choose architecture → budget → write → format → review is a strong compact Process; revision branching is the missing piece. |
| D8 Usability | 10/15 | Spoken text and caption mapping match L:54,73; no rule prevents the teaser-scope error or stale visual wording documented at L:29–30. |

**Critical issues**

- **The fact gate is too implicit:** S:L37 requires fact tags but never explicitly restricts them to VERIFIED claims with their original scope. `script-r4-codex.md:45–55` proves an accurate payoff does not repair an overbroad opening tease.
- **A script correction does not propagate automatically:** L:30 records unchanged visual props after narration fixes. There is no instruction to inventory script/on-screen/caption/storyboard consumers and recheck dependent wording.
- **Model review may repeat superseded pronunciation advice:** the skill correctly encodes L:54,73, but offers no reconciliation rule when an older or external review recommends “S H A” or “at sign.” This is a recovery gap, not a stale pronunciation rule in this skill.

**Episode-specific content:** S:L28 embeds `mango at the rate one two three`, `SHA`, `Argon two I D`, `Oh wasp` and `B crypt`. The lone-A phonemizer failure is reusable expertise; the password, algorithm names and preferred spoken readings belong in an episode example or pronunciation data, rather than a universal narration rule.

**Top 3 improvements**

1. Require a VERIFIED claim map for every factual sentence and on-screen note; preserve conditions in teasers, comparisons and recaps.
2. Add a revision handoff that identifies changed claims and checks all dependent captions, visual props and storyboard text before re-review.
3. Separate stable voice rules from episode vocabulary, explicitly route to binding §§5–6, and make architecture-specific teaching choices conditional.

**Detailed deductions below 80%:** D6 should condition misconception-first and gloss length on the chosen architecture and accuracy; D8 needs the scope/revision procedure above, including rejection or testing of superseded pronunciation suggestions. Other deductions concern incomplete specialist coverage rather than a need for more generic prose advice.

## script-review — 86/120, C

Source: [SKILL.md](script-review/SKILL.md). Pattern: **Process**. Knowledge ratio **60:30:10**.

Section scan: output/pass contract **[E]**; independent-model invocation **[E]** but stale; retry sentence **[A]** with ambiguous limit; rubric **[E/A]**; fact table **[E]**; proofreading **[A]**; retention changes **[A/R]**. The rubric adds real project judgment; generic review-output requests add less.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 14/20 | The ten-row rubric and no-fact-error gate (S:L8,17–29) are useful domain knowledge, diluted by familiar review prompts. |
| D2 Mindset + procedures | 12/15 | Review separates accuracy, architecture, ear and pace (S:L20–29); it lacks evidence-boundary and revision-closure decisions. |
| D3 Anti-patterns | 10/15 | S:L20,26,28 ban greetings, unsupported visual references and slogan endings, but do not guard against stale reviewer recommendations or false scope equivalence. |
| D4 Specification | 15/15 | S:L3 explicitly mandates a different author/reviewer model after every draft and names fact-checking/proofreading. |
| D5 Disclosure | 12/15 | Compact rubric references architecture and voice documents at the relevant rows; input loading and binding §6 are not explicit. |
| D6 Freedom | 10/15 | Fixed gate plus interpretive rubric is appropriate; “until pass or three rounds” (S:L15) leaves failure/escalation behavior underspecified. |
| D7 Pattern | 9/10 | Independent review → scored evidence → corrections → re-review is a clear Process, weakened by the stop condition. |
| D8 Usability | 4/15 | The read-only stdout capture (S:L12–13) is specifically contradicted by L:22, and it omits the stdin/retry safeguards in L:27–28. |

**Critical issues**

- **Known-bad primary command:** S:L12–13 uses `-s read-only`, asks the reviewer to print, and redirects stdout. L:22 documents lost review output from the Stop hook and prescribes workspace-write plus a named review file. The r1 file also ends with hook chatter. This is demonstrated staleness, not a hypothetical CLI concern.
- **No stdin isolation or unique attempt path:** L:27–28 record interleaved outputs and a twenty-minute stdin stall. S:L13 hardcodes `r1-codex.md`; retry/round naming and `< /dev/null` are absent.
- **Three rounds is ambiguous:** S:L15 must not become a gate waiver. `script-r3-codex.md:85`, `script-r4-codex.md:74` and `script-r5-codex.md:3–10` explicitly show failure after round three and passage only at round five. A:19 preserves the gate.
- **Review scope is unpinned:** no requirement to identify script revision, inspect prior blockers, separate external verification from the supplied record, or confirm reviewer model differs from the author. Naming a CLI alone does not establish that model distinction.

**Episode-specific content:** no substantive ep01 facts. The literal `script-r1-codex.md` is a first-attempt artifact name, not a reusable multi-round invocation. It should be parameterized by episode, revision, reviewer and attempt.

**Top 3 improvements**

1. Replace stdout capture with the recorded named-file procedure, closed stdin, unique attempt paths and an output-completeness check; provide a provider failure route grounded in L:23.
2. Define round three as an escalation/budget checkpoint while keeping unresolved accuracy failures blocking; support focused closure checks like r4/r5.
3. Pin revision/model identity and require prior-finding closure, VERIFIED scope matching, §§5–6 and the latest operator pronunciation decisions.

**Detailed deductions below 80%:** D1 needs fewer generic output requests and more evidence-review expertise; D3 needs exact scope, normative-strength and stale-suggestion traps; D6 needs a non-waiving round-limit branch; D8 needs the demonstrated execution fixes before this can be a reliable gate. Fixing formatting alone would not address any critical issue.

## storyboard — 79/120, D

Source: [SKILL.md](storyboard/SKILL.md). Pattern: **Process**. Knowledge ratio **55:35:10**.

Section scan: outputs **[E/A]**; voice-first order **[E]**; row contract **[E]**; shot pacing **[E/A]**; transition meanings **[E]**; text/colour/sound constraints **[E/A]**; JSON contract **[E]** but incomplete; final checklist **[A]**. The handoff contract matters more than the familiar storyboard columns.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 12/20 | Voice-led timing and semantic transitions (S:L11,15) add value, but the columns and generic completeness checks are familiar. |
| D2 Mindset + procedures | 10/15 | S:L15 explains why a transition is chosen; there is no analogous decision test for how a mechanism becomes a visual event. |
| D3 Anti-patterns | 8/15 | Static-hold and safe-area prohibitions (S:L14,16) are specific but miss decorative motion, text-card substitution and factual visual drift. |
| D4 Specification | 15/15 | S:L3 names human and machine outputs and explicitly triggers only after script-review passes. |
| D5 Disclosure | 12/15 | Brief §9 and voice-narration are routed at use (S:L11,14); the machine contract has no authoritative schema route. |
| D6 Freedom | 9/15 | Creative shot choice is open, but universal text-card limits coexist with underspecified fragile timing/transition contracts. |
| D7 Pattern | 8/10 | A readable Process with outputs and a final check; it needs a validation/return loop to close the handoff. |
| D8 Usability | 5/15 | `zoom-in`/`match` (S:L15) disagree with video-build's `zoom`/no `match` list; S:L14 retains a 10-second ceiling versus L:44's stricter 8-second event rule. |

**Critical issues**

- **Cross-skill contract conflict:** storyboard promises `zoom-in` and `match`; video-build S:L14 promises `cut`, `fade`, `push`, `wipe`, `zoom`. No alias/translation or unsupported-transition branch resolves the disagreement. This is a conflict between instructions; implementation support was not inspected.
- **Pacing permits the known failure:** “change the visual every 3–8 s” is useful, but “never hold … >10 s” leaves an inconsistent ceiling. L:44 says every beat changes the active element and no hold exceeds eight seconds; `video-visual-codex.md:55` excludes decorative grain/pulsing as explanatory change.
- **The machine example is only illustrative:** S:L22–24 uses ellipses and omits timing/validation details despite requiring real voice timing. It is not valid copyable JSON or a complete schema. No claim is made that the current builder rejects the real storyboard; that code was outside this audit.
- **Truth and visual wording can drift:** S:L29 asks that a source appear, but does not validate every displayed factual value against VERIFIED evidence or propagate script corrections. L:30 records this exact miss.

**Episode-specific content:** no ep01 path or factual example. `af_heart`, 1080p and 30 fps are current channel/tool choices, not episode leakage. The `Headline` example and card limits should not silently make ep01's text-led first cut the reusable default.

**Top 3 improvements**

1. Define one canonical transition/component/timing schema shared with the builder, with validation and an explicit route for unsupported visuals.
2. Require a meaningful event for every beat and mechanism-first phone-size proofs before full production; use one consistent maximum hold duration.
3. Add a VERIFIED visual-claim audit and revision diff across narration, on-screen props and captions; distinguish authentic evidence detail from text that must be readable.

**Detailed deductions below 80%:** D1/D2 need visual-explanation decisions rather than more columns; D3 needs the specific “motion without explanation” and “fixed narration, stale visual” failures; D6 needs flexible composition but strict data contracts; D8 needs transition reconciliation, a valid minimal example and the updated pacing rule.

## voice-narration — 83/120, D

Source: [SKILL.md](voice-narration/SKILL.md). Pattern: **Tool**. Knowledge ratio **65:25:10**.

Section scan: channel voice/speed **[E]** but partly stale; synthesis command/input shape **[E]**; spoken-script/lexicon/caption separation **[E]**; phonemizer check **[E]**; transcription, pace and silence checks **[A/E]**; mix target **[A]**. There is real local-tool knowledge here, with an inconsistent repair loop.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 14/20 | The lone-A phonemizer trap and caption-only written mapping (S:L18,21) are hard-won knowledge; ordinary pace/silence reminders add less. |
| D2 Mindset + procedures | 10/15 | Fine-grained lines and preflight phonemization are valuable, but ASR disagreement has no trust/normalization decision tree. |
| D3 Anti-patterns | 10/15 | “Fix … in the script … not the lexicon” plus the /ɐ/ explanation (S:L18,21) are specific; S:L22 immediately undermines the repair rule. |
| D4 Specification | 15/15 | S:L3 clearly triggers on audition, synthesis and pronunciation fixes, with Kokoro, timing and manifest keywords. |
| D5 Disclosure | 13/15 | Twenty-five lines are self-contained for common work and route to script-writing; VOICES.md and tokenizer setup remain implicit. |
| D6 Freedom | 9/15 | Fixing a house voice is appropriate, but fixed speed 1.0 and broad ASR-to-lexicon repair overconstrain the wrong controls. |
| D7 Pattern | 8/10 | Tool invocation → input contract → checks is clear; audition and repair branches are underdeveloped. |
| D8 Usability | 4/15 | S:L8,13 prescribe 1.0 despite L:25's 182-wpm per-line result, and S:L18 contradicts S:L22 on where repairs belong. |

**Critical issues**

- **Stale speed calibration:** S:L8 calls 1.0 approximately 150–160 wpm; S:L13 uses it. L:25 distinguishes paragraph auditions from sentence synthesis and records 0.85–0.88 plus pauses as the successful calibration. The skill's checks can catch fast output, but never tell the operator which control to change.
- **Contradictory correction loop:** S:L18 says correct the script, not the lexicon; S:L22 says a key-term word error goes to “lexicon fix.” Later operator feedback (L:54) explicitly rejects hidden written-to-spoken divergence.
- **ASR is treated as pronunciation truth:** L:73 says Whisper normalized a broken “S H A” take back into “SHA-1”; L:34 records numeric formatting artifacts. S:L22 has no normalization, listening or reword-after-failed-attempts branch. L:17 also says a human listen is the real test.
- **Operational gaps:** S:L21 uses an unexplained `k` object, not a complete invocation; the description promises audition/voice choice but the body gives no audition procedure. The single-line repair must preserve and update the manifest (L:36), which is not described.

**Episode-specific content:** `SHA two fifty-six`, `at the rate` and related caption replacements (S:L18) are ep01 vocabulary. Keep the reusable spoken-script/caption separation and lone-A warning; move the episode terms to episode data. `af_heart` is a channel default, not ep01-only content.

**Top 3 improvements**

1. Calibrate on representative per-line output and give a measured speed/pause adjustment loop; replace the contradicted 1.0 assumption.
2. Make script text the sole pronunciation repair source, update caption mapping separately, and document single-line resynthesis plus manifest refresh.
3. Add a runnable phonemizer preflight and an ASR/normalization/listening decision tree with rewording after repeated failures and a human audition checkpoint.

**Detailed deductions below 80%:** D1 needs tighter concentration on local failure handling; D2/D3 need a single coherent source-of-truth and ASR-disagreement model; D6 must constrain identity while permitting measured speed changes; D8 requires fixing both demonstrated contradictions and completing the partial phonemizer/repair procedures.

## video-build — 79/120, D

Source: [SKILL.md](video-build/SKILL.md). Pattern: **Tool**. Knowledge ratio **50:35:15**.

Section scan: data locations **[E]**; voice-clock rule **[E]**; data-driven components **[E/A]**; house motion/transitions **[E]**; safe-area/audio reminders **[A]**; commands **[E/A]**; short-render check **[A]**. The command block is project-specific operational routing, not a standard-library tutorial, but it is not the missing assembly procedure.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 12/20 | Paths, beat pauses and motion timings (S:L8,11,13) are useful house knowledge; familiar component/safe-area guidance occupies substantial space. |
| D2 Mindset + procedures | 9/15 | “Voice is the clock” (S:L11) is a strong principle; no build/merge step turns storyboard plus manifest into the stated input. |
| D3 Anti-patterns | 9/15 | “Never stretch audio” and “no bounce, no spin” (S:L11,13) help; the expensive disk/randomness/audio pitfalls in L:55,61,64 are absent. |
| D4 Specification | 15/15 | S:L3 clearly covers new components, episode assembly and final rendering, naming both input artifacts and Remotion. |
| D5 Disclosure | 13/15 | Twenty-five lines give concise paths and commands; conditional 3D/Lottie/render-failure guidance has no route. |
| D6 Freedom | 8/15 | Styling is tightly prescribed, while fragile assembly, normalization, disk cleanup and renderer selection are largely unconstrained. |
| D7 Pattern | 8/10 | A recognizable Tool pattern with rules and invocation; missing assembly and recovery branches prevent a complete workflow. |
| D8 Usability | 5/15 | No merge/premix command, cleanup or loudness correction is supplied despite L:35,55,61; the transition list also conflicts with storyboard. |

**Critical issues**

- **The named assembly task is missing:** S:L8 describes merged episode data, but S:L19–24 starts at typecheck/still/render. There is no command or contract for merging the narration manifest and storyboard. L:61 records the necessary move to a single premixed narration WAV after disk exhaustion; the skill does not explain that current audio architecture.
- **Known resource failures have no prevention/recovery:** A:34 requires disk discipline; L:55 records leaked bundles, L:61 mixer exhaustion, L:138–140 the shared render queue and cheap still loop. S:L25's test render alone does not address them.
- **Audio levels do not establish the final target:** S:L16 specifies mix gains only. L:35 and `video-qa-r1.md:9` record a −22.3 LUFS raw output corrected by two-pass loudness normalization without re-rendering video. The build never reaches that required delivery step.
- **Current medium-specific traps are omitted:** frame-index determinism (L:64), blank postprocessing capture (L:69), per-frame camera updates (L:70), and software-GPU fallback (L:87,114) are not routed anywhere. A short render may expose some, but gives no diagnosis.
- **Do not overstate the wrapper issue:** S:L23 runs the CLI after `cd video`, with `../episodes/...`; the `tools/render.sh` relative-path bug in L:123–125 is not proof this particular command has a wrong destination. L:159–160 even records a direct CLI fallback succeeding after the wrapper failed. The missing guidance is when/how to use each path and verify its output.

**Episode-specific content:** no hardcoded episode path. “Hashes” (S:L12) is ep01-flavoured wording; frame rates, pauses and motion curves are channel defaults. Literal “all text … never an image” needs a distinction between generated labels and genuine document/footage evidence (L:76,158), rather than a new rule forbidding authentic source images.

**Top 3 improvements**

1. Document the actual assemble/premix/validate/render/deliver sequence with explicit episode outputs and a loudness-normalization path.
2. Add disk preflight, shared-render coordination, verified-output checks and bundle/intermediate cleanup, with wrapper versus direct-CLI recovery guidance.
3. Add conditional deterministic-3D/Lottie guidance, reconcile transitions with storyboard, and prefer full-size/phone-size still reviews before expensive renders.

**Detailed deductions below 80%:** D1/D2 need the actual build decisions instead of more general component advice; D3 needs failure-specific prohibitions with causes; D6 should make style conditional on the brief and data/resource handling strict; D8 needs the documented audio/disk recovery and missing assembly handoff. No uninspected tool implementation is declared broken here.

## video-qa — 90/120, C

Source: [SKILL.md](video-qa/SKILL.md). Pattern: **Tool**, with a Process repair loop. Knowledge ratio **70:25:5**.

Section scan: output/verdict **[E]**; automated checks **[E/A]**; thresholds **[E]**; visual sampling/rubric **[E/A]**; independent second look **[E]**; full repair loop **[A]**; per-shot alignment method **[E]**. Measurement and the border-versus-ink trap are valuable; ordinary “look/fix/retry” language adds little.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 15/20 | S:L39–40 specifies container/ink/inset measurement and the misleading-border diagnosis; some surrounding generic inspection prose remains. |
| D2 Mindset + procedures | 12/15 | Combines automated evidence, phone-size judgment and a blind second model (S:L28–42); no explicit unresolved-evidence/reviewer-disagreement disposition exists. |
| D3 Anti-patterns | 11/15 | S:L40 warns that equal padding may mean the border was measured; grain false negatives, midpoint blind spots and wrong text-state sampling remain unguarded. |
| D4 Specification | 15/15 | S:L3 names automated and visual checks, inputs, full-render trigger and the final-completion boundary. |
| D5 Disclosure | 13/15 | Forty-two lines route directly to tools at use; alignment-check schema/setup and lengthy alternate-media checks remain implicit. |
| D6 Freedom | 10/15 | Quantitative gates are appropriate, but hardcoded sampling and “finding you agree with” (S:L42) leave important coverage and closure choices too loose. |
| D7 Pattern | 9/10 | Checks → thresholds → independent inspection → repair is a strong Tool/Process combination; incomplete coverage weakens execution. |
| D8 Usability | 5/15 | Plain freezedetect (S:L16) is contradicted by L:40; two 6×6 sheets at 10-second intervals (S:L29) cover only about 12 minutes of an allowed 15-minute episode. |

**Critical issues**

- **Known false-negative check remains primary:** L:40 says animated grain defeats plain `freezedetect` and records downscale+blur preprocessing. S:L16 still uses the plain filter. `video-qa-r1.md:13` confirms why the processed check mattered. Whole-frame motion also cannot certify meaningful explanatory change (L:44; `video-visual-codex.md:55`).
- **Sampling truncates long episodes:** S:L29 fixes `tile=6x6` and `-frames:v 2`: at most 72 samples, about 720 seconds at one per ten seconds. A:3 allows 8–15 minutes. Full-size scene midpoints are separately required, but the uniform contact-sheet sweep silently omits the tail of longer episodes.
- **Audio gates lack sufficient measurement/interpretation:** S:L14 neither requests true-peak measurement nor retains a full summary, so it cannot substantiate its own TP threshold. S:L18 says WER <5%, whereas `video-qa-r1.md:12` used ≈10% raw with formatting notes. That recorded deviation does not justify weakening the skill; it requires a defined normalized comparison and explicit exceptions. L:34,73 document both ASR false alarms and missed pronunciation errors.
- **Visual pass and disagreement rules are incomplete:** S:L30 scores seven criteria but gives no passing threshold; S:L42 permits closure when there is no finding “you agree with,” without an evidence-backed disposition for rejected findings. A:19 forbids publishing a failing video; `video-qa-r1.md:34`'s “ship-able” label despite failed holds cannot serve as a precedent to waive it.
- **Per-shot checks miss known states:** S:L39 asks for one fully shown state. L:79 records mismatched typed/masked states, L:108 the cropped mid-close camera view, and L:111 lighting-dependent ink. S:L41's literal frame numbers can exceed shorter shots and do not adapt to real duration/beats.

**Episode-specific content:** the six sample frames `60 150 185 225 270 325` (S:L41) are shot-specific, despite being presented as the reusable command. The 9:30–11:00 duration is explicitly labelled an example and is harmless; per-shot IDs and check filenames are already placeholders. Alignment heuristics are reusable, but need state-aware parameters.

**Top 3 improvements**

1. Replace the contradicted freeze recipe with grain-resistant detection plus an audit of meaningful events; derive sheet count and frame choices from runtime, scenes and motion beats.
2. Produce complete loudness/true-peak evidence and normalized transcript comparison; separate numerical formatting, pronunciation and missing narration, preserving explicit delivery gates.
3. Define visual PASS thresholds and evidence-backed finding dispositions; measure every text/camera state and rerun affected shared consumers, with duration-safe second-look frames.

**Detailed deductions below 80%:** D1's remaining generic prose should yield room for diagnostic branches; D3 needs named false-pass conditions; D6 needs data-derived sampling and accountable disagreement handling; D8 needs the demonstrated grain fix, complete audio evidence and long-runtime/state coverage. An early passing technical row or contact sheet must not be treated as proof of the whole video.

## package-review — 70/120, F

Source: [SKILL.md](package-review/SKILL.md). Pattern: **Process**, underdeveloped. Knowledge ratio **25:60:15**.

Section scan: title/pairing **[A]**; thumbnail constraints **[A/E]**, with blind ranking the distinctive procedure; early promise **[A]**; description contents **[A/E]**; disclosure rule **[E]** but unversioned. The body is mostly familiar packaging advice without operational decisions.

| Dimension | Score | One-line evidence and deduction |
|---|---:|---|
| D1 Knowledge delta | 9/20 | The 168×94 check and five-thumbnail blind comparison (S:L9) add some delta; most of S:L8–12 is standard packaging advice. |
| D2 Mindset + procedures | 8/15 | Title/thumbnail complement and early promise (S:L8–10) give a useful lens, but no ranking, disagreement or weak-package iteration procedure. |
| D3 Anti-patterns | 4/15 | Word/title limits are constraints, not an expert NEVER list; no explicit guard against misleading claims, repetition or a false PASS on missing comparison. |
| D4 Specification | 15/15 | S:L3 clearly names title/thumbnail/description checks and the post-video-QA activation point. |
| D5 Disclosure | 12/15 | Twelve lines are admirably compact; no extra reference tree is needed, but policy and promised inputs have no precise loading route. |
| D6 Freedom | 9/15 | Heuristic limits are rigid while truth/policy/release decisions have no evidence or exception discipline. |
| D7 Pattern | 7/10 | Five ordered checks resemble Process, but omit outputs, explicit verdict, remediation and gate closure. |
| D8 Usability | 6/15 | A:17 expects `reviews/package-*.md`; the body defines no output/pass contract, and storyboard chapter starts (S:L11) differ from the build-derived timings recorded in package-r1:9. |

**Critical issues**

- **No durable review or enforceable verdict:** unlike script-review and video-qa, there is no output path, report format, pass condition, blocked state or fix/re-review loop. A:17 supplies a path externally, but the skill does not carry its own handoff.
- **Required blind ranking has no execution or failure route:** S:L9 mandates comparison, while `package-r1.md:7,14` marks the feed-size row PASS and defers ranking because no human panel was available. The skill does not define who ranks, what evidence to record, or how an incomplete check affects the verdict. This is a documented process gap, not proof the thumbnail itself is poor.
- **Final assets are not the timing authority:** S:L11 says chapters come from storyboard scene starts; `package-r1.md:9–10` uses build-derived chapters and voice-timed captions. No refresh/recheck step follows a timing edit. The skill also omits captions and the licence/human-listen checks explicitly left open at package-r1:14.
- **Disclosure advice is categorical and unversioned:** S:L12 has no policy source/date or asset inventory check. The older review's diagram-only conclusion cannot automatically cover later photoreal assets (L:75) or footage/scanned-prop production (L:142–158). This audit did not verify current YouTube rules and does **not** assert a specific policy violation; the unsupported carry-forward is the usability gap.

**Episode-specific content:** no hardcoded ep01 title, path or password fact. The disclosure parenthesis assumes a diagrams-plus-TTS package resembling the original ep01 cut; that is an example asset mix, not a universal conclusion. Kokoro credit is a current channel dependency, not episode leakage.

**Top 3 improvements**

1. Define `reviews/package-<round>.md`, evidence per check, explicit PASS/FAIL/BLOCKED rules and a correction/re-review loop; missing comparison must remain incomplete.
2. Replace generic heuristics with a truth/promise test, blind-comparison method and concrete anti-patterns; preserve discretion for an effective title/thumbnail outside heuristic limits.
3. Read timings/captions from final build artifacts, validate actual released assets and rights, and check a dated authoritative disclosure source instead of carrying forward the diagram-only conclusion.

**Detailed deductions below 80%:** D1/D2 need discriminating editorial decisions and an executable ranking method; D3 needs specific misleading-package failure modes and reasons; D6 needs flexible creative heuristics but strict truth/evidence gates; D7/D8 need the missing report, completeness verdict and final-artifact handoff. Expanding the checklist without those decisions would not repair the fundamental design.
