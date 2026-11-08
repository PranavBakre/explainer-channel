# EP01 — revision 4 verification (Codex)

**FAIL — one unsupported scope claim remains in S02.** The historical-breach implication is removed, but “every short password” exceeds the benchmark's defined alphabet. All other remaining fact issues from r3 are resolved. This is a targeted factual closure check, not another style review.

Reviewed `script.md` revision 4, `script-r3-codex.md`, and the relevant fact-sheet entries, including F44–F45. Applied `.claude/skills/script-review/SKILL.md`: pass requires every rubric row ≥3 **and no fact errors**. This verifies against the supplied research record and a local computation, not a fresh external-source audit. Only this report was written; existing workspace changes were left alone.

## Blocking-correction closure

The r3 “Round-two blocking-correction closure” table contains ten items. Each is accounted for here, including those already closed in r3.

| Item | Status | Revision-four quoted line and verification |
|---|---|---|
| NIST normative strength, scope and blocklist categories | **Resolved** | “The US standards body NIST now requires salted password hashing in its guidelines, and recommends the highest cost a site can practically handle.” “Under these guidelines…” and “commonly used, expected or compromised passwords” preserve F27–F30. |
| Manager advice, mechanism and majority claim | **Resolved** | “Our advice: use a password manager. NIST now requires sites to allow them.” F41 supports the factual clause. The storage/generation mechanism and majority claim are removed; the recommendation is explicitly editorial. |
| HIBP response and local matching | **Resolved** | “The service returns the endings of matching leaked hashes in its database. Your device checks its own ending against that list.” Matches F33. |
| Exclusive attack route | **Resolved** | “An attacker can still guess, hash the guess, and compare.” No exclusive claim remains. |
| Argon2 library format and abbreviated string | **Resolved** | “In a common library's format, the stored value carries its own recipe.” The visual now specifies “code card with the full F42 string split into its fields: settings, salt, hash”. It no longer presents an ellipsized prefix as the complete value. |
| Historical under-a-minute claim | **Unresolved overall; historical implication resolved** | “But one modern graphics card can try every short password, in some of those formats, in under a minute.” This now describes a modern benchmark, but “every short password” is broader than F24. See the sole remaining defect below. |
| Ending treats notice as proof | **Resolved** | “And if a breach notice ever says passwords were salted and hashed with something slow, you'll know what that bought you. Time.” This remains conditional, alongside “What you can't see from a login screen is how a site stores your password.” It does not claim independent verification. |
| OWASP expansion/status/ordering | **Resolved** | “The OWASP guidance on password storage recommends Argon2id.” F26 supports this; the unsupported organizational-status and ordering claims are removed. |
| Login verification and emailed-password inference | **Resolved** | “It arrives over an encrypted connection, then gets hashed and compared with the stored value.” F36 plus new F45 cover the flow. “So if a site ever emails you the password you forgot, it can recover your password.” This no longer infers a retained readable copy. |
| Recent changes to every NIST provision | **Resolved** | “The current guidelines reflect all of this.” No narration claims that all listed provisions changed recently. The scene heading is production metadata, not a spoken historical claim. |

## Every row of r3's “Remaining fact issues only”

| R3 issue | Status | Revision-four quoted line / fact-sheet match |
|---|---|---|
| S02 historical speed tease (F23–F24) | **Unresolved scope; historical issue resolved** | “But one modern graphics card can try every short password, in some of those formats, in under a minute.” F24 covers eight-character lowercase-letter-and-digit passwords, not short passwords generally. |
| S03 reuse and S18 overbroad protection | **Resolved** | “If you reused yours, one leak can open those accounts too.” “Your job is a long password you've used nowhere else, so a leak on one site can't be replayed on your other accounts.” New F44 supports credential stuffing; the ending now limits its protection claim to replay of the leaked password. |
| S08/S15 verification flow | **Resolved** | “When you log in, it hashes what you just typed, and compares the two fingerprints.” “It arrives over an encrypted connection, then gets hashed and compared with the stored value.” F45 supplies the working verification demonstration requested in r3; F36 supplies transport and server receipt. |
| S14 OWASP status/ordering | **Resolved** | “The OWASP guidance on password storage recommends Argon2id.” Matches F26 without the unsupported additions. |
| S14 misleading abbreviated code cue | **Resolved** | “code card with the full F42 string split into its fields: settings, salt, hash”. The requested complete stored value replaces the misleading abbreviation. Actual rendering remains a later production check. |
| S15 readable-copy inference | **Resolved** | “So if a site ever emails you the password you forgot, it can recover your password.” Recovery is the observation; retained plaintext is no longer asserted. |
| S16 unsupported recent-change history | **Resolved** | “The current guidelines reflect all of this.” Current provisions match F27–F30; no provision-by-provision change date is asserted. |
| S18 likely first guesses behind Argon2 | **Resolved** | “A sensible attacker tries the most common passwords first. So even behind Argon2, one two three four five six would be among the first guesses.” This explicitly presents the attack-strategy inference requested by r3, grounded in F3's historical popularity. It asserts no Argon2 cracking speed. |
| S18 manager-storage mechanism | **Resolved** | “Our advice: use a password manager. NIST now requires sites to allow them.” Editorial recommendation plus F41-supported permission requirement; the unsupported storage mechanism is gone. |

## New evidence: F44–F45

- **F44: sufficient for the revised reuse claims.** The VERIFIED entry explicitly describes reuse of passwords and usernames across sites as the basis for credential stuffing. S03 remains conditional; S18 addresses replay on other accounts, rather than promising protection from every account-compromise route.
- **F45: working demonstration independently reproduced.** Ran the local Python environment's `argon2.PasswordHasher.verify` against the complete F42 string. `mango@123` returned `True`; `mango@124` raised `VerifyMismatchError`. This supports the login verification explanation and meets r3's explicit alternative of a working demonstration. This was a functional check, not an audit of the library's internal comparison implementation. F36(3)'s older partial-source caveat is superseded for these script claims by F45; it is not itself a remaining script defect.

## Sole remaining factual defect

**S02 — unsupported generalization:**

> “But one modern graphics card can try every short password, in some of those formats, in under a minute.”

F23–F24 establish a specific exhaustive-search estimate: eight characters drawn from 26 lowercase Latin letters and ten digits, using one RTX 4090 at the measured rates. “In some of those formats” limits the hash algorithm, not the character alphabet. S12 correctly states the narrower example, but that does not make the broader S02 claim true as written. For comparison, eight characters drawn from lowercase, uppercase and digits give `62^8` candidates: about 1,331 seconds (22 minutes) even at the cited MD5 rate, rather than under a minute. This is a scope error, not a stylistic objection.

Minimal factual correction:

> “But one modern graphics card can try every eight-character password made of lowercase letters and digits, in some of those formats, in under a minute.”

That matches the MD5 and SHA-1 estimates paid off in S12. No other factual correction is requested.

## Gate

Non-accuracy scores are carried forward from r3 for this limited verification; no new style or retention requirements are introduced. Accuracy remains below the gate because of the S02 scope claim.

| Rubric row | Score / 5 | Basis |
|---|---:|---|
| Hook | 4 | R3 assessment retained. |
| Architecture | 4 | R3 assessment retained. |
| Open loops | 3 | R3 assessment retained: “But encryption is built to be undone. Whoever holds the key can turn every row back into the original.” |
| Explanation | 4 | R3 assessment retained. |
| Accuracy | 2 | “one modern graphics card can try every short password … in under a minute” exceeds F24. |
| Voice | 4 | R3 assessment retained. |
| Ear | 4 | R3 assessment retained; audio not tested. |
| Pace | 4 | R3 assessment retained; revision adds no substantial scene-length change. Actual runtime not measured. |
| Ending | 3 | R3 score retained conservatively: “Your job is a long password you've used nowhere else, so a leak on one site can't be replayed on your other accounts.” The earlier factual overreach is resolved; no new stylistic objection. |
| Policy | 4 | R3 assessment retained. |

**FAIL.** The gate is not waived after the final scheduled review round. Resolve the S02 alphabet/length scope before passing the script to storyboarding. Preserve r3's production qualifications: exhaustive-search times are idealized benchmark estimates, the grocery table illustrates adoption of slow hashing, and pepper protection assumes the separate secret remains secret.
