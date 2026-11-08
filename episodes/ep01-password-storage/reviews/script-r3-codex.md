# EP01 — round 3 script review (Codex)

**FAIL — accuracy gate remains open.** Revision 3 resolves several round-two blockers, but not all. The historical cracking-time claim remains unsupported, and the illustrated Argon2 string still misrepresents an abbreviation. Additional source gaps remain below. Do not advance this revision through the script gate.

Reviewed revision 3 against `factsheet.md`, `brief.md`, writing-style §§5–6, the problem-chain template and transition guidance in `Script flow teardown.md`, and every blocking correction in `script-r2-codex.md`. This checks the supplied verified record, not a fresh external-source audit. Hash bit differences and search-space arithmetic were independently recomputed. No audio was synthesized. Junior recall failed with `attempt to write a readonly database`; no guidance was recovered. Only this review file was written.

## Rubric

Pass requires every row ≥3 **and no fact errors**. Missing evidence is a verification gap, not proof that a statement is false.

| Row | Score / 5 | Assessment |
|---|---:|---|
| Hook | 4 | Surprise first; the complete question ends after 24 words, about 9.3 seconds at 155 wpm. No greeting or stacked questions. |
| Architecture | 4 | Plaintext → encryption → hashing → salt → expensive guesses follows Template A. The grocery row carries the mechanism; Adobe and LinkedIn motivate failures. The template's prediction/test and server-side cost payoff remain absent. |
| Open loops | 3 | “But encryption is built to be undone. Whoever holds the key can turn every row back into the original.” S04 closes on a problem rather than a next question. LinkedIn and the salt/guessing handoff work; S15–S17 remain a mostly explanatory tail. |
| Explanation | 4 | Concrete row before abstract fingerprint; the common-library qualification fixes the serialization explanation. Bits, passes and Argon2id still need brief plain-language glosses or precise visual treatment. |
| Accuracy | 2 | “Other sites did protect their passwords. Some of those still fell in under a minute.” No VERIFIED entry establishes that historical event. See remaining fact issues. |
| Voice | 4 | Verdict first, one scenario, real names, short contrasts and no banned reveal phrases. The four-item spoken list is reduced to three. Missing legitimate-server cost weakens the trade-off rule; several sentences remain long. |
| Ear | 4 | First mention now says “at sign.” Numbers are speech-ready; technical identifiers still need lexicon overrides. No unsupported visual-only narration reference. |
| Pace | 4 | 1,487 narration words, 4.1% below the 1,550-word budget; passes ±10%. Approximately 9:36 at 155 wpm, or 9:18–9:55 at 160–150 wpm before pauses. Longest scene is S18, about 65 seconds. Actual runtime remains unmeasured. |
| Ending | 3 | “Your job is a long password you've used nowhere else, so the one that leaks can't open anything else.” The action and visibility limit are useful, but the protection claim is too broad. Final “Time” refers to a concrete mechanism, though its protection still depends on password strength and settings. |
| Policy | 4 | Specific breaches, a recurring grocery row and computed examples give this script a distinct teaching angle. Final-video originality and platform eligibility cannot be established from narration alone. |

## Round-two blocking-correction closure

This includes the five numbered corrections and the additional blockers identified in the round-two fact audit and verdict.

| Round-two correction | Revision-three result |
|---|---|
| S16: distinguish NIST SHALL from SHOULD; scope requirements to the guidelines; preserve blocklist categories | **Resolved.** Requires salted hashing; recommends practical cost; “Under these guidelines” scopes the subsequent rules. Commonly used, expected or compromised now matches F28. |
| S18: frame manager advice as opinion; support generation/storage mechanism; delete majority claim | **Partly resolved.** “Our advice” removes the unsupported “easiest” superlative; “Most people” is deleted. No new VERIFIED support for the manager-storage mechanism or password-reuse protection was added. The narrowed advice no longer claims generation. |
| S17: response contains suffixes from the service's corpus, matched locally | **Resolved.** “Endings … in its database” and device-side matching accurately convey F33. Counts can be omitted from this explanation. |
| S06: remove exclusive “only way in” | **Resolved.** “An attacker can still guess” matches the intended scope. |
| S14: identify library format and show full string or label abbreviation | **Partly resolved.** “In a common library's format” fixes scope. The graphic still calls an ellipsized prefix “the real … string.” |
| S02: remove historical under-a-minute implication | **Unresolved.** Wording is unchanged. F24 is a modern benchmark calculation, not a historical cracking observation. |
| S18: end on mechanism rather than notice wording as proof | **Resolved in intent.** Conditional breach-notice interpretation replaces “what that notice should say”; the explicit visibility limit remains. A notice is still a report, not independent verification. |
| S14: remove unsupported OWASP name expansion/ordering claim | **Partly resolved.** Incorrect expansion is gone. “Security nonprofit” and “lists Argon2id first” are still not established by the supplied VERIFIED lines. |
| S15/login: directly source verification steps; avoid inferring a stored readable copy from an email | **Unresolved.** F36 retains its partial-verification caveat, and “kept a copy it can read” remains. |
| S16: avoid claiming all these provisions changed recently | **Unresolved.** “This also explains some rules that changed recently” remains without provision-by-provision history. |

## Remaining fact issues only

Correct numerical claims and resolved claims are intentionally omitted from this table. The benchmark arithmetic, hunter2/3 difference, displayed mango hash fragments/prefix, historical rounded breach figures and Argon2 settings match the supplied record. F32's caveat supports storing a public salt with the hash; that earlier citation-location concern is not a remaining defect.

| Scene / claim | Fact-sheet ID | Result and necessary correction |
|---|---|---|
| S02: “Other sites … Some of those still fell in under a minute.” | F23–F24; M3 | **Missing historical evidence. Blocking.** These establish a particular modern GPU/search-space estimate. Replace with an explicitly conditional benchmark preview, such as “A modern graphics card can test an entire small password space in under a minute,” and specify the eight-character alphabet and algorithm when paid off in S12. Do not imply measured cracking of historical sites. |
| S03 reuse consequence; S18 “can't open anything else” | No explicit VERIFIED reuse entry | **Missing support; S18 overbroad.** The conditional S03 mechanism is reasonable, but the strict sourcing rule still requires support. Scope S18 to “other accounts through password reuse”; uniqueness does not rule out every other route to account access. Add VERIFIED support for that mechanism. |
| S08 hash/compare; S15 recomputation flow | F36(3), F27, F26 | **Partial.** The factsheet explicitly says no opened source spells out recomputation with stored salt/settings and comparison. This is a verification gap, not an identified algorithm error. Obtain a VERIFIED verification-method source or working verification demonstration before claiming complete fact coverage. |
| S14: “The security nonprofit OWASP now lists Argon2id first.” | F25–F26 | **Partial/missing.** Settings and competition history are supported; organizational status and recommendation ordering are not explicitly verified in the record. Use “OWASP recommends Argon2id” and retain F26, or verify the additional claims. |
| S14 code cue: “the real `$argon2id$v=19$m=19456,t=2,p=1$…` string” | F42 | **Mismatch in presentation. Blocking.** The prefix is authentic, but it is not the complete stored value and shows neither salt nor hash while promising labelled fields. Display the complete F42 string, or label this explicitly “abbreviated” and show the omitted fields schematically. |
| S15: emailed old password means “it kept a copy it can read” | F36; M1–M2 | **Inference exceeds evidence.** An email demonstrates recovery/access at that point; it does not establish a retained readable copy rather than reversible storage or another capture path. Say “it can recover your password.” |
| S16: “rules that changed recently” | F27–F30; revision header | **Missing change history.** A July 2025 revision establishes current requirements, not when each listed rule changed. Use “The current guidelines reflect this.” |
| S18: 123456 is among the first guesses “Even behind Argon2” | F3; F4 | **Partial/inference.** F3 verifies historical rank, not attack ordering against Argon2. Explicitly frame as the sensible strategy illustrated by that rank, or add VERIFIED attack-strategy support. No Argon2 attack speed is established or needed. |
| S18 manager advice: “let a password manager hold those passwords for you” | F41 | **Recommendation is now clearly editorial; mechanism support still missing.** F41 verifies that sites must permit managers, not how managers store unique passwords. Add a VERIFIED mechanism source if retaining the strict every-claim sourcing gate. Do not restore the “easiest” superlative. |

Two contextual qualifications should also survive into the storyboard: S12–S13 times are idealized exhaustive-search estimates for 26 lowercase Latin letters plus ten digits on one GPU at the tested settings, not observed breach durations; label the graphics accordingly. S14's leaked grocery table is the hypothetical app **after adopting the recommended slow hashing**, not evidence that every present-day app does so. Pepper reasoning assumes the separate secret stays secret. These are constraints on the illustration, not newly discovered numerical errors.

## Proofreading and TTS hazards

No material typo or grammar defect found. These are anticipated hazards, not observed audio failures.

| Text | Spoken fix / production handling |
|---|---|
| SHA-256 / SHA-1 | “S H A two fifty-six” / “S H A one.” Use a consistent lexicon. |
| bcrypt / scrypt | “bee crypt” / “ess crypt.” |
| Argon2 / Argon2id | “argon two” / “argon two I D.” Distinguish the family from the named variant. |
| OWASP / NIST | Test “oh wasp” / “nist” with the chosen voice. |
| Have I Been Pwned | “Have I Been Poned,” rhyming with owned; keep official spelling in captions. |
| mango at one two three | First occurrence now correctly says “at sign.” Keep later readings consistent with that established password. |
| “sixty-four characters”; “first five characters” | Add “hexadecimal” on first explanation, glossed as digits and letters A through F. Subsequent references can stay short. |
| “two passes”; “bits” | Define a pass as a round of work and a bit as a zero or one. Keep each gloss brief. |
| “At its benchmark setting, that drops…” | “At the tested setting, the card manages…” makes the subject unambiguous. |
| F-tags, headings, hashes, `$…`, `v=19`, `p=1`, arrows | Exclude from narration extraction. Do not read the version as a year or the code card aloud. |
| “read back” | Intended present-tense “reed”; confirm synthesis. No other exposed lead/live ambiguity found. |

## Top three retention changes

1. **Replace the unsupported S02 speed tease with a precise promise.** Pay it off in S12 under the stated alphabet and GPU conditions; keep the surprise without implying an undocumented breach result.
2. **Turn S14 into a prediction and cost payoff.** Ask what the grocery leak now contains, pause, reveal it. Explain that the server pays the slow-hash cost on each legitimate login too; obtain VERIFIED support, without inventing milliseconds.
3. **Compress the standards tail into the grocery scenario.** Link the new-password blocklist directly to S17's private check. Keep the short manager recommendation and finish with the limit that users cannot inspect server storage from the login screen.

## Verdict

**FAIL.** Hook timing, NIST normative strength, HIBP suffix handling and the exclusive-attack wording are corrected. The unsupported historical speed claim and misleading abbreviated code cue remain, alongside the documented source gaps and overbroad reuse claim. Accuracy is 2/5, so the gate fails even though every other rubric row reaches three. This is the final scheduled review round; reaching round three does not waive the gate. No script, factsheet, learning log or other file was modified.
