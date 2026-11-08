codex
# EP01 script review

**FAIL — revise before storyboarding.** The problem chain works, and the narration meets its word-count budget. Accuracy fails the gate: several sentences overstate their sources, and some claims rely on factsheet material explicitly marked unverified.

Reviewed against the specified factsheet, brief, writing-style §§5–6, and script-flow teardown. Local hash calculations were checked. No files were changed.

## Rubric

Pass requires **every row ≥3 and no fact errors**.

| Criterion | Score | Quoted evidence and assessment |
|---|---:|---|
| Hook | 3/5 | “Somewhere, on a server you will never see, there is a row with your email on it.” Establishes setting rather than opening with the surprise. The first explicit question arrives roughly 42 seconds in, beyond the required first 15 seconds. |
| Architecture | 4/5 | “So encryption fixed the wrong problem. … It only needs to check it.” Plaintext → encryption → hashing → salt → expensive guessing follows the problem-chain template. Adobe and LinkedIn supply historical re-hooks. The prediction/test beat and concrete server-side cost of slow hashing are missing. |
| Open loops | 3/5 | “And if that table leaks, the attacker gets fingerprints, not passwords.” S08 closes without planting the next vulnerability. The two opening questions eventually close, but several scenes end on explanation rather than forward tension. |
| Explanation | 4/5 | “Let's say you sign up for a new grocery app.” Strong concrete model, carried through most concepts. Hunter2/hunter3 temporarily replace it, while S14 introduces several unfamiliar concepts together. |
| Accuracy | 2/5 | “Right next to **each password** sat the user's password hint” exceeds F10. “Sites **should not** force you to change your password” weakens F29’s SHALL NOT. The scrypt date is not verified in F25. Additional absolutes require qualification. |
| Voice | 3/5 | “What does it keep instead? / And why do some … still fall in under a minute?” violates the ban on stacked rhetorical questions. “The algorithm, the settings, the salt, and the hash” exceeds the three-item list rule. Otherwise direct and conversational. |
| Ear | 4/5 | “But salt only stops the shortcut. It doesn't stop guessing.” Generally sayable, with numbers mostly written for speech. Algorithm names and acronyms need explicit TTS pronunciations. |
| Pace | 4/5 | **1,435 narration words**, 7.4% below the 1,550-word target: within ±10%. About **9:15 at 155 wpm**, before pauses. No individual scene approaches two minutes; the planned act timings need adjustment. |
| Ending | 3/5 | “The attacker gets a fingerprint that is slow to crack, and useless everywhere else.” Assumes the breached site used good storage and overstates the outcome. Recap and action work, but the voice guide also requires an honest limit—what the viewer still does not know. |
| Policy | 4/5 | “Back to RockYou's most popular password.” Specific breach history, a running example and computed comparisons give the episode a distinct argument. No evident templated filler; this assesses the script, not final platform compliance. |

## Fact check: every `[F#]` occurrence

All **48 tag occurrences** are covered below. **Missing** means the supplied verified evidence does not establish the entire claim; it does not automatically mean the claim is false.

| # | Scene and claim | Tag | Result |
|---:|---|---|---|
| 1 | S02: December 2009 RockYou hack | F1 | **Match.** |
| 2 | S02: Thirty-two million readable passwords leaked | F1 | **Match, rounded.** Say “about thirty-two million.” |
| 3 | S02: Same count and plaintext claim | F2 | **Match, rounded.** F2 specifically directs “about 32 million”; the exact count is a reported hacker claim. |
| 4 | S02: `123456` most common; almost 300,000 accounts | F3 | **Match:** 290,731. |
| 5 | S05: Adobe breached in 2013 | F6 | **Match.** |
| 6 | S05: Encrypted rather than hashed; Triple DES | F6 | **Match** for method. “Old cipher” is an additional characterization not established by this entry. |
| 7 | S05: Australian regulator found one encryption key | F7 | **Match.** |
| 8 | S05: Plaintext hint beside **each** password | F7 | **Mismatch in scope.** Verifies plaintext hints, not universal presence or literal column placement. |
| 9 | S05: Same universal hint claim | F10 | **Mismatch:** about 109 million records had hints, versus about 153 million total. |
| 10 | S05: 38 million active users; about 153 million records | F9 | **Match.** Preserve “approximately” for 38 million too. |
| 11 | S06: Hash takes any text and produces a fixed-length fingerprint | F12 | **Missing** for fixed length in this entry. It establishes cryptographic one-way and collision-resistance properties. Specify “cryptographic hash.” |
| 12 | S06: Same fixed-length claim | F13 | **Missing verified general support.** F13 verifies computed examples, explicitly leaving the standard unchecked. |
| 13 | S06: Cannot work backward from fingerprint to password | F12 | **Qualified match.** “Can't” overstates “computationally infeasible.” Distinguish reversal from guessing and checking. |
| 14 | S07: Hunter2/hunter3 differ in 146 of 256 bits | F14 | **Match:** independently recomputed from the supplied outputs. |
| 15 | S07: Same bit count | F15 | **Match for this pair.** Not a guaranteed proportion for every changed input. |
| 16 | S09: About 6.5 million LinkedIn hashes posted | F16 | **Match.** |
| 17 | S09: Unsalted SHA-1 | F16 | **Match** to the contemporaneous press report; not a directly retrieved LinkedIn statement. |
| 18 | S09: Precomputed common-password hashes and lookup | F19 | **Conceptual match.** A simple lookup table illustrates the idea; do not label its literal row layout a rainbow table. |
| 19 | S09: Four years later, LinkedIn said 117 million emails/passwords | F17 | **Match.** “LinkedIn said it believed…” preserves the source’s attribution more precisely. |
| 20 | S10: Random per-user string mixed into hashing | F20 | **Match.** Generate when establishing/changing a password, rather than implying one permanent salt per user. |
| 21 | S10: Public salt stored beside hash; every fingerprint unique | F20 | **Partial/missing.** Random unique salts are supported; this entry does not establish every clause or guarantee unique hashes. |
| 22 | S10: Same storage/uniqueness sentence | F21 | **Partial.** Supports different salted results and negligible salt recurrence, not absolute uniqueness. |
| 23 | S10: Precomputed tables useless because each salt needs its own | F21 | **Match with condition:** salts must be sufficiently large and random. |
| 24 | S11: People choose words, names, years and common favourites | F4 | **Partial.** Supports weak patterns in RockYou; “years” and the universal generalization are not established by the supplied entry. |
| 25 | S12: RTX 4090 running hashcat | F23 | **Match.** |
| 26 | S12: About 164 billion MD5 guesses/second | F23 | **Match:** 164.1 billion. |
| 27 | S12: About 50 billion SHA-1; 22 billion SHA-256 | F23 | **Match:** 50.6387 and 21.9755 billion. |
| 28 | S12: Eight lowercase/digit characters ≈2.8 trillion possibilities | F24 | **Match:** \(36^8=2,821,109,907,456\). |
| 29 | S12: MD5 17 seconds; SHA-1 under a minute; SHA-256 about two minutes | F24 | **Match as rounded full-space estimates.** Say “about seventeen seconds.” |
| 30 | S13: Purposefully expensive, adjustable password hashing | F25 | **Match.** F38 also directly supports increasing work factors. |
| 31 | S13: “bcrypt came first, in nineteen ninety-nine” | F25 | **Date matches.** “Came first” needs qualification: first among the three algorithms being introduced. |
| 32 | S13: Low-setting bcrypt ≈184,000 guesses/second | F23 | **Match.** Retain the low-setting caveat. |
| 33 | S13: Same space takes about half a year | F24 | **Match:** about 177 days at that setting. |
| 34 | S13: scrypt from 2009; memory use constrains GPUs | F25 | **Missing in part.** The date remains unverified in the opened evidence. Memory hardness is verified; GPUs being “short of” memory is imprecise and unsupported here. |
| 35 | S13: scrypt ≈7,000 guesses/second | F23 | **Match:** 7,126. |
| 36 | S13: Twelve and a half years | F24 | **Match, rounded.** Add “about.” |
| 37 | S14: Argon2 “current favourite”; competition winner in 2015 | F25 | **Partial.** Winner/year match; popularity claim is missing. Use the supported OWASP recommendation. |
| 38 | S14: OWASP minimum 19 MiB and two passes | F26 | **Match but incomplete configuration:** parallelism one also belongs to the quoted minimum. The graphic includes it. |
| 39 | S14: Raise cost; rehash at next login | F38 | **Match.** |
| 40 | S14: Separate shared pepper protects against database-only theft | F32 | **Match as implementation reasoning.** Conditional on the secret remaining separate and uncompromised. |
| 41 | S15: Server receives password at login | F36 | **Match** for the conventional password flow explained here. |
| 42 | S15: Encrypted transit, hashing, comparison, disposal | F36 | **Partial/missing.** Transit supported; recomputation/comparison explicitly verified only in parts; “is thrown away” is not established as universal behavior. |
| 43 | S16: NIST requires salted, costly password hashing | F27 | **Broad match.** Preserve SHALL salt/hash versus SHOULD choose cost as high as practical. |
| 44 | S16: Sites “should not” force 90-day rotation unless compromised | F29 | **Mismatch in normative strength:** SHALL NOT require periodic rotation; SHALL force change on evidence of compromise. Ninety days is illustrative. |
| 45 | S16: No composition demands; 15 characters for single-factor use | F30 | **Match.** Say “at least fifteen.” |
| 46 | S16: Check new passwords against common/breached lists | F28 | **Broad match.** Required blocklist covers commonly used, expected or compromised values; no particular remote service is mandated. |
| 47 | S17: HIBP takes the hash and sends its first five characters | F33 | **Misleading actor.** The client computes the hash and sends its prefix **to** HIBP. |
| 48 | S17: Gets every matching leaked hash; matches locally | F33 | **Partial.** Returns suffixes and counts from its corpus, not every leaked hash everywhere. Local comparison matches. |

## Every number and on-screen value

Repeated instances share a row. Scene/act labels and fact IDs are organizational identifiers rather than factual quantities.

| Scene | Value | Check |
|---|---|---|
| S02 | December 2009; 32 million; `32,603,388` | Supported by F1/F2 at different precision. Label exact figure “reported count,” or display “~32 million.” |
| S02/S18 | `123456`; 290,731; almost 300,000 | Historical password/count match F3. No measured Argon2 cracking time is supplied. |
| S03–S06/S10 | `mango@123`; spoken “mango at one two three” | Fictional example. Say “at sign” when introducing it. |
| S03/S04 | One password column; one email column; one key | Illustrative database design, not measured quantities. |
| S05 | 2013; Triple DES; one key; 38M/~153M | Match F6/F7/F9. Mark 38M approximate too. |
| S06 | SHA-256; 64 characters | Correct for hexadecimal representation, but F13 leaves general standards verification open. Say “sixty-four hexadecimal characters.” |
| S06 | `81c68634…efff1` | **Correct.** SHA-256 of `mango@123` is `81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1`. |
| S07 | `hunter2`/`hunter3`; one digit; 146 of 256 bits | **Correct.** About 57% differ; 110 bits still match. |
| S08 | Two fingerprints | Correct description of the depicted comparison. Matching hashes are not literal mathematical proof of identical inputs. |
| S09 | 2012; 6.5M; `6,458,020`; SHA-1 | Match F16, with press attribution for the exact count. |
| S09 | Four years; 2016; 117M | Match F17. |
| S10 | Two users with the same password | Illustrative example consistent with F20/F21 when salts differ. |
| S12 | One RTX 4090; MD5/SHA-1/SHA-256 | Match F23 hardware and algorithm identifiers. |
| S12 | 164B/50B/22B guesses per second | Correct rounded benchmark values. |
| S12 | Eight characters; about 2.8 trillion | Correct for 26 lowercase Latin letters plus ten digits. Make that alphabet explicit in the graphic. |
| S12 | 17s/56s/~2min; “under a minute” | Correct rounded exhaustive-search estimates. Use approximation markers consistently. These are benchmark-derived estimates, not measured cracking times for particular stolen accounts. |
| S13 | bcrypt 1999 | Verified. “First” needs qualification. |
| S13 | 184,000/second; half a year; ~177 days | Correct at the low benchmark setting. Label the graphic accordingly. |
| S13 | scrypt 2009 | **Verification gap** explicitly retained in F25. Remove the date or verify it before recording. |
| S13 | ~7,000/second; 12.5 years | Correct rounded values at the benchmark setting. Say “about twelve and a half years.” |
| S14 | Argon2; 2015 | Competition/year match F25. |
| S14 | Argon2id; 19 MiB; two passes | Match the selected F26 configuration, with parallelism one. |
| S14 | `$argon2id$v=19$m=19456,t=2,p=1$…` | Parameters match F26. **`v=19` and serialization semantics lack verified factsheet support.** With an ellipsis, this is a prefix rather than a complete real hash string. |
| S14 | “One more layer”; “single secret” | Consistent with the shared-pepper model in F32. |
| S15 | TLS; Argon2id | Appropriate for the illustrated flow. Avoid implying every website uses Argon2id. |
| S16 | Ninety days | Illustrative periodic interval, not a threshold specified by F29. |
| S16 | Fifteen characters | **Minimum**, specifically for single-factor passwords. |
| S16 | NIST SP 800-63B-4 | Correct document identifier. |
| S17 | SHA-1; first five characters; `f14d5` | **Correct.** SHA-1 of `mango@123` is `f14d5ba7f5892b8cb2549dea72287ee3692bb297`. |
| S18 | “Almost instantly”; “first guess on every list” | **Unsupported absolutes.** Say it is among the earliest guesses and therefore requires few expensive attempts. |
| Metadata | Target 10:00 at ~155 wpm | Implies approximately 1,550 words. Actual narration: 1,435, within ±10%. |
| Metadata | 0:00–0:50; 0:50–2:50; 2:50–5:40; 5:40–8:10; 8:10–10:00 | Planning allocations, not fact claims. Several differ materially from narration duration; see pacing table below. |

## Untagged claims and qualifications

The skill requires every claim—not only tagged claims—to trace to verified evidence.

| Quoted claim | Assessment and correction |
|---|---|
| “Even the company can't read it.” | Narrow to **“can't read your password from the stored value.”** F36 explains that the company receives the password at login. |
| “One leak opens their email, their bank, their everything else.” | Overclaim. Reuse creates risk where credentials work; it does not guarantee entry past other controls. Add verified evidence for credential-reuse consequences. |
| Encryption is reversible; the site needs checking rather than recovery | Supported as reasoning by F11 and M2. Attach those references. |
| “A hint like ‘my dog's name’ … is not much of a lock.” | Hypothetical is legitimate, but hints alone do not explain recovery of encrypted values. Connect them to verified repeated-ciphertext weaknesses; do not imply the key leaked. |
| “Change one character and the whole fingerprint changes.” | Present this computed pair rather than a universal guarantee. |
| “Their … fingerprints share almost nothing.” | Misleading: 146 bits differ and 110 match. Prefer **“The differences are scattered across the fingerprint.”** |
| “So the fingerprint gives away nothing about how close a guess was.” | The example demonstrates scattered differences, not an unrestricted “nothing” guarantee. Narrow the claim and add verified support. |
| “Same fingerprint, same password.” | Practical simplification, not mathematical identity. Prefer **“The fingerprints match, so the app accepts the password.”** |
| Salt “makes every fingerprint unique” | Intended outcome, not an absolute guarantee. Explain that different salts give the same password different hash values. |
| Hashes “were designed to be fast. That was the point of them.” | Add verified design evidence or narrow to the demonstrated property: **“These hashes are fast to calculate.”** |
| Graphics cards “are short of” memory | Imprecise. Explain that memory requirements constrain efficient parallel guessing, with a verified supporting entry. |
| Algorithm, settings, salt and hash are “all in one line” | Common format, not a universal storage rule. Specify and source the format shown. F38 does not verify serialization. |
| Emailing your old password “tells you how it stores everything else” | Unsupported inference. It indicates recoverable access to that password, not how unrelated data is stored. Delete the second sentence. |
| Checking “without anyone learning your password” | Overpromises privacy. F33 supports **not sending the password or full hash to HIBP**, not unconditional secrecy. |
| “A plain hash falls to a lookup table.” | Conditional on the password appearing among precomputed guesses. Use “can fall.” |
| “A salted fast hash falls to a graphics card.” | Conditional on password strength and available resources. Use “can fall.” |
| “A salted slow hash is what holds.” | Too absolute. Its supported benefit is making each guess expensive. |
| A password manager makes long, unique passwords easy | Useful action, but supplied verified evidence only establishes that NIST requires allowing managers/autofill. Add support for generation/storage and uniqueness benefits. |
| Final breach guarantees a slow fingerprint | The viewer cannot make a poorly implemented site use good storage. Separate the protections: slow hashing depends on the site; uniqueness limits reuse of a recovered password elsewhere. |

## Proofreading and TTS hazards

No material spelling errors found. Recommended spoken fixes:

| Text | Spoken fix or handling |
|---|---|
| `SHA-256` | “S H A two fifty-six,” consistently. |
| `SHA-1` | “S H A one.” |
| `bcrypt` | “bee crypt.” |
| `scrypt` | “ess crypt.” |
| `Argon2` / `Argon2id` | “argon two” / “argon two I D.” |
| `OWASP` | “O-wasp”; test a short Kokoro sample. |
| `NIST` | “nist”; test the sample. |
| `Have I Been Pwned` | Use a TTS pronunciation override: “poned,” rhyming with “owned.” Preserve official spelling in captions. |
| `mango@123` | Introduce as “mango, at sign, one two three.” |
| “nineteen mebibytes” | Pronunciation-test it; alternatively retain exact settings on screen and simplify narration. |
| “sixty-four characters” | “Sixty-four hexadecimal characters.” |
| “bcrypt came first” | “bcrypt arrived in nineteen ninety-nine.” |
| “seventeen seconds” | “About seventeen seconds.” |
| “Twelve and a half years” | “About twelve and a half years.” |
| “Fifteen characters” | “At least fifteen characters.” |
| “sites should not force” | “Sites must not force periodic password changes.” |
| Four-item stored-value list | Split into two short sentences. |
| Two consecutive opening questions | Keep one main question; turn the other into a later re-hook. |
| Hashes, parameter strings, arrows, `[F#]` tags and scene metadata | Exclude from narration extraction unless deliberately assigned spoken forms. |

## Pacing

Counts exclude headings, metadata, fact tags and on-screen cues.

| Beat | Words | At 155 wpm | Planned allocation |
|---|---:|---:|---:|
| S01–S02: hook | 133 | 0:51 | 0:50 |
| S03–S05: plaintext/encryption | 247 | 1:36 | 2:00 |
| S06–S10: hashing/salt | 334 | 2:09 | 2:50 |
| S11–S14: guessing/slow hashes | 403 | 2:36 | 2:30 |
| S15–S18: implications/ending | 318 | 2:03 | 1:50 |
| **Total** | **1,435** | **9:15** | **10:00** |

The word-count gate passes. At 150–160 wpm, narration alone is approximately **8:58–9:34**. Pauses and visual holds could meet the brief’s **9:30–11:00** range, but that requires generated-narration timing. Do not pad early acts solely to preserve the current table.

## Top three retention changes

1. **Bring the surprise and question into the first 15 seconds.**  
   Suggested opening: “A well-run website doesn't keep a readable copy of your password. So what does it compare when you log in?” Then use RockYou to show the consequence of doing the opposite.

2. **Make S14–S17 a test of the grocery app.**  
   Algorithm history, settings, pepper, NIST rules and HIBP currently accumulate terminology. Ask the viewer to predict what a stolen grocery-app database reveals, then apply the relevant mechanisms. Keep detailed parameters in cited graphics.

3. **End with two responsibilities and one honest limit.**  
   The site makes guessing expensive; a long, unique password resists easy guesses and limits reuse elsewhere. A login screen cannot establish how an arbitrary site stores passwords. Close on the password-manager action without guaranteeing every breached site used slow hashing.

## Verdict

**FAIL.** Accuracy scores below three, and factual mismatches remain. Correct those mismatches, qualify the absolute claims, and remove or verify the explicitly unsupported material before re-review and storyboarding.
hook: Stop
hook: Stop Blocked
hook: PreToolUse
hook: PreToolUse
hook: PreToolUse Completed
hook: PreToolUse Completed
exec
/bin/zsh -lc 'rtk read /Users/psbakre/.codex/hooks/learnings-prompt.txt' in /Users/psbakre/Projects/explainer-channel
 succeeded in 0ms:
You are an engineering partner. At Stop, decide whether this turn produced a lesson worth storing in Dumbledore's memory.

Do not write `learnings.md` or any other repo-root notes file.

Default outcome: no lesson. Store a lesson only if it clears this bar:

- It would change how a future agent should act, not just summarize what happened.
- It is durable across future work, not a one-off fact about this exact diff.
- Getting it wrong would cause wasted time, wrong code, hidden data loss, review churn, or repeated user correction.
- It is not already obvious from repo instructions, docs, tests, types, or the code change itself.
- It is specific enough to be actionable later: when to apply it, what to do, and why.

Skip routine implementation notes, fixed bugs, command outputs, test results, PR summaries, todos, and "known gaps" unless the gap materially affects someone continuing the work.

If no lesson clears the bar, say nothing about memory unless the hook requires a final response; then say "No Dumbledore memory lesson added."

To store a lesson, send it to Dumbledore in one `ask_dumbledore` call on the `dumbledore` MCP server with `waitSeconds: 120`. He checks his own memory for an equivalent and skips it instead of duplicating; web chat can only remember and recall. Use this message shape:

  Lesson to remember, from a Codex session in <repo or "no repo">:
  Principle: <one-sentence reusable principle>
  Why: <why it matters, with 1-3 concrete examples>
  Applies when: <when a future agent should apply it>
  Check your memory for an equivalent first. If one exists, skip it; if this sharpens it, say what to change so the operator can correct it in the DM. Reply in one line with what you stored or skipped.

Rules for the message:

- Never include tokens, keys, passwords, connection strings, private customer data, or raw command output. Describe credentials by name only (for example "the PranavBakre gh account").
- Write the text literally. Never build it with shell command substitution.
- If the dumbledore tool is unavailable, or he replies that memory tools are unavailable, say so in one line, state the lesson in one line, and stop. Do not fall back to Junior or to writing his database directly.
- If the call outlasts the wait, report the returned conversationId and move on.

Quality bar:

- The principle is reusable, not a changelog headline.
- The why includes only the examples needed to make it memorable.
- Prefer one strong lesson over several weak ones.

codex
No Dumbledore memory lesson added.
hook: Stop
hook: Stop Completed
tokens used
95,629
