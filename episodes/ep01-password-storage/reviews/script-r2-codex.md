# EP01 — round 2 script review (Codex)

**FAIL — revise before storyboarding.** Revision 2 resolves most round-1 problems, including the misleading Adobe hint scope, unsupported scrypt date, hash-length evidence, several absolutes, and the ending's guarantee about breached sites. Remaining source gaps and overstatements prevent the accuracy gate from passing.

Reviewed revision 2 against the supplied factsheet (including F38–F43), brief, writing-style §§5–6, Script flow teardown, and script-r1-codex.md. This is a review against the supplied verified record, not a fresh external-source audit. Independently recomputed the displayed mango hashes, hunter bit difference, and exhaustive-search arithmetic. No audio was synthesized. Only this review file was written. Junior recall was attempted but failed with a read-only database error; no memory guidance was recovered.

## Rubric

Gate: every score ≥3 **and no factual errors**. A missing source is a verification gap, not proof the claim is false.

| Row | Score | Evidence and assessment |
|---|---:|---|
| Hook | 3 | “So when you log in, what is it checking your password against?” The surprise is immediate, but this question starts after 37 words: about 14.3 seconds at 155 wpm, and finishes at about 18.2 seconds. Tighten to put the complete question inside 15 seconds. |
| Architecture | 4 | Clear problem chain: readable storage → reversible encryption → hashing → salt → costly guesses. Adobe and LinkedIn motivate transitions. Still lacks a viewer prediction/test and a concrete server-side cost of slow hashing; S14 supplies a narrated application instead. |
| Open loops | 3 | “But encryption is built to be undone. Whoever holds the key can turn every row back into the original.” S04 ends on the problem without planting the next question. S08 now successfully plants LinkedIn; S10→S11 closes the salt loop well. S14–S17 remain an information tail with limited forward tension. |
| Explanation | 4 | Grocery row and fingerprint carry the mechanism. Hunter2/3 is a useful short exception. “Passes,” “bits,” and algorithm variants still accumulate without simple definitions; S14 should distinguish the illustrated library format from universal storage. |
| Accuracy | 2 | “A password manager is the easiest way to keep that habit … [F41]” exceeds F41; “shall be salted and hashed, with a cost as high as practical” blurs SHALL versus SHOULD. See blocking corrections below and complete audit. |
| Voice | 3 | “names, dictionary words, slang or simple patterns” remains a four-item spoken list. “The only way in is to guess, hash the guess, and compare” stacks an absolute onto the explanation. No banned reveal phrases; the ending has a useful limit, but the concrete cost to the legitimate server is absent. |
| Ear | 4 | Numbers mostly written for speech; short sentences and graphic cues work. Algorithm identifiers need pronunciation overrides. “Mango at one two three” should identify the at sign explicitly once. |
| Pace | 4 | 1,464 narration whitespace-delimited words, 5.5% below 1,550: passes ±10%. About 9:27 at 155 wpm, before pauses. Longest scene is about 60 seconds; the technical chain has frequent turns. Actual generated timing remains unobserved. |
| Ending | 3 | “Most people find out from a breach notice.” Unsupported population claim. “Now you know what that notice should say: salted, slow, and nothing readable.” Memorable recap, but a notice's wording cannot establish implementation quality. The password-manager action and honest visibility limit are present. |
| Policy | 4 | Specific breach history, computed examples and one transformed database row provide an original teaching angle. This scores the script's specificity, not final platform eligibility. |

## Corrections required for the accuracy gate

1. **S16: retain normative strength and scope.** Say: “NIST requires salted password hashing. It recommends the highest cost the site can practically handle.” F27 explicitly distinguishes SHALL from SHOULD and preserves verifier performance. Frame subsequent “sites must” statements as requirements of these guidelines, not universal law. F28's list includes commonly used, expected **or** compromised passwords; “a blocklist of common and breached ones” should not imply a particular breach corpus is mandatory.
2. **S18: F41 does not establish the password-manager recommendation.** It verifies permission for managers/autofill, not that a manager is “the easiest” way to generate/store long unique passwords. Present this explicitly as the narrator's recommendation and add verified support for the generation/storage mechanism if explaining it as fact. Delete or verify “Most people find out from a breach notice.” The latter is an empirical prevalence claim with no supplied source.
3. **S17: describe the response precisely.** “It gets back the leaked hashes that start the same way” still obscures the response format and corpus scope. Use: “The service returns matching hash endings from its database. Your device checks its own ending against that list.” F33 verifies suffixes and counts, not full hashes or an exhaustive collection of all leaks.
4. **S06: narrow the exclusive claim.** “There's no practical way to run it backwards” matches F12. “The only way in” goes beyond preimage resistance. Use “An attacker can still guess, hash the guess, and compare.” This also avoids implying that other attack routes have been ruled out.
5. **S14: identify the demonstrated format.** F42 verifies one argon2-cffi serialization, not a universal rule about every stored value. Say “In this library's format, the stored value carries its recipe.” The graphic calls an ellipsized prefix a “real … string”; either display the complete F42 string or label the prefix “abbreviated.”

## Round-1 closure check

This table covers the prior rubric, tag audit, number audit, untagged-claim table, proofreading recommendations and top-three retention changes. Repeated manifestations are grouped.

| Round-1 finding | Round-2 status and evidence |
|---|---|
| Surprise/question late; stacked opening questions | **Partly resolved.** Verdict first; only one question. Complete question still lands around 18 seconds. |
| S08 lacks next vulnerability | **Resolved.** “LinkedIn found out it wasn't.” |
| Missing prediction/test and legitimate server cost | **Still open, retention/architecture.** S14 applies the model but asks for no prediction; no legitimate-server cost is explained. Do not invent a millisecond figure. |
| Adobe “each password” had a hint | **Resolved.** About 109M records, distinct from ~153M total. |
| “Old cipher” unsupported | **Resolved.** Deleted. |
| 38M approximation; RockYou rounding/exact count attribution | **Resolved.** “About” in narration; RockYou graphic says “reported count.” |
| General fixed-length hash support missing | **Resolved for the SHA-256 example.** F40 verifies length; F12 supplies the cryptographic context. |
| Absolute inability to reverse | **Improved.** “No practical way” is good; new “only way in” remains too exclusive. |
| Company cannot read it | **Resolved in context.** Opening refers to the stored row; S15 explains transient access. |
| Reuse guarantees email/bank/everything access | **Resolved in wording.** Conditional “if … works … can” replaces guarantee. Verified reuse-benefit support remains absent from the factsheet. |
| Encryption/checking explanation lacked references | **Mostly resolved.** F11 attached; M2 supports the reasoning. |
| Hint alone implies recovery/key theft | **Resolved.** Now a modest head-start claim, no stolen-key assertion. Adobe's actual recovery mechanism is still lightly explained. |
| Avalanche “share almost nothing” / reveals “nothing” | **Resolved.** Scattered changes in this pair; near-miss phrasing is an illustration. |
| “Same fingerprint, same password” mathematical identity | **Resolved.** App accepts a matching value. |
| Salt uniqueness guarantee/permanent-user salt implication | **Mostly resolved.** Generated per password; described as its job, with long/random caveat. “Completely different” is supported by the two computed examples, not a guarantee of zero matching bits. |
| People universally choose years/patterns | **Resolved in scope.** RockYou dataset specifically; four-item list remains a voice issue. |
| Fast hashes designed to be fast | **Resolved.** Only says fast to calculate, supported by benchmark. |
| bcrypt “came first” | **Resolved.** “Arrived” with 1999. |
| scrypt 2009 unverified; GPUs “short of memory” | **Resolved.** F39 verifies date; F25/F39 support memory-hard/custom-hardware explanation. |
| Low bcrypt setting; approximate 17 seconds/12.5 years | **Resolved in narration.** Graphic still needs explicit benchmark-setting/estimate labels. |
| Argon2 “current favourite” | **Resolved.** OWASP recommendation replaces popularity. Organization name gloss still needs correction or removal. |
| 19 MiB / two passes missing p=1 | **Resolved across narration and graphic.** p=1 on screen; spoken 20 MB is a sound approximation. |
| Four-item algorithm/settings/salt/hash list | **Resolved structurally.** Split into short sentences. |
| Format/version lacked support | **Resolved for the example by F42.** Universal phrasing and calling an abbreviation a real full string remain open. |
| Login universal disposal claim | **Resolved.** Disposal deleted; F36 still labels recomputation/comparison only partly verified. |
| NIST “should not” periodic rotation | **Resolved.** Must not; must change on compromise. |
| Fifteen-character minimum/single-factor scope | **Resolved.** Explicit “at least” and condition. |
| HIBP actor wrong | **Resolved.** Browser/app sends prefix. |
| HIBP response suffixes/corpus scope | **Partly resolved.** Local matching retained; response wording still imprecise. |
| “Without anyone learning” overpromise | **Resolved.** Narrowly says password/full hash not sent. |
| Emailing password implies storage of everything else | **Resolved.** Unrelated-data inference removed. |
| Lookup/GPU/slow hash absolute outcomes | **Resolved.** “Can fall”; slow hashing makes guesses expensive. |
| 123456 “instant” / first on every list | **Resolved as a qualitative explanation.** Among early guesses, no fabricated timing. F3 supports rank only, not observed Argon2 attack order. |
| Password-manager generation/uniqueness support | **Still open.** F41 adds permission only. |
| Ending guarantees good site storage and harmless leak | **Resolved.** Responsibilities separated; visibility limit explicit. “Most people” introduces a new unsupported claim. |
| Pronunciation/at sign/hex wording | **Open production fixes.** See TTS table. |
| Planned act timings inconsistent | **Resolved.** Stale allocations removed; current duration passes budget. |
| Turn S14–S17 into a grocery-app test | **Partly resolved.** Grocery breach returns in S14, but subsequent rules/HIBP are still a separate lecture. |

## Fact check: every fact-tag occurrence

There are **60 `[F#]` occurrences** in revision 2 (the introductory literal `[F#]` is not a numeric tag). Paired tags have separate occurrence numbers below. “Partial/missing” identifies support gaps rather than asserting falsehood.

| Occurrence(s) | Scene / claim | Fact IDs | Result |
|---|---|---|---|
| 1 | S02 December 2009 RockYou hack | F1 | Match. |
| 2–3 | ~32M readable passwords leaked | F1; F2 | Both match with rounding and reported-count graphic caveat. |
| 4 | 123456 top; almost 300K | F3 | Match: 290,731. |
| 5 | S04 encryption reversible with key | F11 | Match as explanation from the verified single-key design and M2; does not claim Adobe’s key leaked. |
| 6 | S05 Adobe 2013 | F6 | Match. |
| 7 | Triple DES encryption, not hashing | F6 | Match. |
| 8 | One encryption key, regulator finding | F7 | Match. |
| 9–10 | ~109M hints in plain text | F7; F10 | F7 verifies storage; F10 verifies count. Match jointly. |
| 11 | ~38M active / ~153M records | F9 | Match; distinguishes populations. |
| 12–13 | S06 cryptographic hash fixed-length fingerprint | F12; F40 | F12 supports one-way property; F40 verifies SHA-256 length. Match for the demonstrated fixed-output hash. |
| 14–15 | Mango SHA-256, 64 characters | F40; F43 | Match: 64 hexadecimal characters and computed output. Add “hexadecimal” for clarity. |
| 16 | No practical reversal; “only way in” guess/hash/compare | F12 | Partial: preimage infeasibility matches; exclusivity not established. |
| 17–18 | S07 hunter pair: 146/256 bits | F14; F15 | Both match jointly; independently recomputed. |
| 19 | S09 ~6.5M LinkedIn hashes posted in 2012 | F16 | Match to press report. |
| 20 | Unsalted SHA-1 | F16 | Match to contemporaneous reporting, not directly retrieved company statement. |
| 21–22 | Precompute common hashes and lookup | F19; F43 | F19 supports precomputation principle; F43 supports concrete simple-table entries. Match jointly; not claiming a literal rainbow-table layout. |
| 23 | Four years later, LinkedIn believed 117M | F17 | Match; company attribution retained. |
| 24 | S10 random salt per password, mixed into hashing | F20 | Match. |
| 25–26 | Salt public/stored beside hash; differing outputs | F20; F21 | Partial: unique random salts/differing outputs supported; neither entry explicitly verifies storage location/public status. F42 supplies a concrete stored-salt example. Add that citation and qualify format if enforcing verified-line coverage. |
| 27 | Two salted mango examples differ | F43 | Match for displayed examples; not literal disjoint characters/bits. |
| 28–29 | Long random salts defeat shared precomputation | F21; F22 | F21 directly supports; F22 supports collision-minimizing salt length, not the entire attack explanation alone. Joint match. |
| 30 | S11 nearly half RockYou names/words/slang/patterns | F4 | Match, rounded. |
| 31 | S12 one RTX 4090/hashcat | F23 | Match. |
| 32 | MD5 ~164B guesses/s | F23 | Match: 164.1B. |
| 33 | SHA-1 ~50B; SHA-256 ~22B | F23 | Match: 50.6387B / 21.9755B. |
| 34 | Eight lowercase+digit characters ≈2.8T | F24 | Match for 26 Latin letters + 10 digits. Specify alphabet on screen. |
| 35 | Exhaust all: ~17s / <1min / ~2min | F24 | Match as computed estimates using that benchmark, not observed cracking of real sites. |
| 36–37 | S13 deliberately costly, adjustable password hashing | F25; F38 | Match jointly. |
| 38 | bcrypt 1999 | F25 | Match. |
| 39–40 | Low-setting bcrypt ~184K/s, half year | F23; F24 | Match for benchmark setting, not recommended current settings. |
| 41–42 | scrypt 2009, memory-hard/custom-hardware resistance | F25; F39 | Match jointly: F39 closes old date gap. |
| 43–44 | scrypt ~7K/s / ~12.5 years | F23; F24 | Match at benchmark settings. |
| 45–46 | S14 OWASP lists Argon2id first; Argon2 won in 2015 | F25; F26 | Winner/year and recommended configuration match. F26 records minimums, not ordering or organization-name expansion; “open web security project” is not established. Prefer “OWASP recommends Argon2id.” |
| 47 | ~20MB/two passes minimum | F26 | Match rounded: 19 MiB = 19.922944 MB; graphic includes p=1. |
| 48 | Stored algorithm/settings/salt/hash recipe | F42 | Match for argon2-cffi example; scope too broad without identifying format. |
| 49 | Raise cost and rehash at next login | F38 | Match. |
| 50 | Separate shared pepper; database alone insufficient | F32 | Match as conditional implementation reasoning, provided the pepper remains secret and implementation uses it correctly. |
| 51 | S15 site sees submitted password | F36 | Match for conventional flow being taught, not every authentication protocol. |
| 52 | Encrypted transport, hash and compare | F36 | Partial by factsheet's own explicit caveat: transport/full submission verified; exact recomputation steps only verified in parts. F42 is generation, not an explicit verification source. |
| 53 | S16 salted/hash SHALL plus highest practical cost | F27 | Partial/mismatch in normative phrasing: cost SHOULD, with performance qualification. |
| 54 | No scheduled changes; forced change on compromise | F29 | Match. Ninety days illustrative. |
| 55 | No required composition; ≥15 single-factor | F30 | Match within NIST guideline scope. |
| 56 | Check new passwords against blocklist | F28 | Broad match; include expected/compromised scope, avoid implying mandatory specific breach corpus. |
| 57 | S17 client sends first five SHA-1 characters | F33 | Match; specify hexadecimal and Pwned Passwords API if useful. |
| 58 | Returns matching leaked hashes; local match | F33 | Partial: returns suffixes/counts from its corpus. See required fix. |
| 59 | S18 123456 among earliest guesses even with Argon2 | F3 | F3 verifies historical rank, not this attack ordering; plausible explanatory inference. Mark as inference or add verified attack-strategy support. No Argon2 speed invented. |
| 60 | Password manager easiest; NIST permits it | F41 | Permission matches; superlative recommendation unsupported as fact. |

## Every number and on-screen value

Scene labels, revision identifiers, F IDs and planning labels are not empirical claims. Repeated occurrences are grouped.

| Scene(s) | Number/value | Check |
|---|---|---|
| Metadata | 10:00, ~155 wpm | Budget 1,550; measured text count 1,464, within 1,395–1,705. |
| S02 | December 2009; ~32M; 32,603,388 | F1/F2; graphic properly marks reported count. |
| S02/S18 | 123456; almost 300K; 290,731 | F3; rank/count correct. No measured Argon2 crack time supplied or claimed. |
| S03–S06/S10 | mango@123 | Fictional running input; spoken form should specify at sign. |
| S03–S05 | One email/password column; one key; 2013 | Model quantities illustrative; Adobe one key and year F6/F7. |
| S05 | ~109M hints; ~38M active; ~153M records | F9/F10; approximate, correctly separated. |
| S05 | Triple DES | Algorithm name F6, not an unsupported ECB claim. |
| S06 | SHA-256; 64 characters; 81c68634…efff1 | F40/F43; independently verified full SHA-256: 81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1. Characters are hexadecimal. |
| S07 | hunter2/hunter3; one digit; 146 of 256 | F14/F15; independently recomputed bit difference 146. |
| S08/S10 | Two fingerprints / two users | Illustrative comparison, consistent with mechanism. |
| S09 | 2012; ~6.5M; 6,458,020 | F16; exact on-screen figure should retain press/reported attribution. |
| S09 | Four years; 2016; 117M | F17; correct later disclosure, no claim of a new breach. |
| S11 | Nearly half / nearly 50% | F4; correct rounded dataset finding. |
| S12 | One RTX 4090; MD5; SHA-1; SHA-256 | F23 identifiers and single-card benchmark. |
| S12 | ~164B/~50B/~22B per second | Correct rounded values; label as this benchmark, not universal card performance. |
| S12 | Eight characters; ~2.8T | 36^8 = 2,821,109,907,456. Graphic needs explicit a–z/0–9. |
| S12 | 17s / 56s / ~2min | Recomputed 17.1914 / 55.7106 / 128.3752 seconds. Add approximation marks to first two graphic labels and “full-space estimate.” |
| S13 | 1999; ~184K/s; half year; ~177 days | F25/F23/F24. Recomputed 15,332,119 seconds ≈177.46 days. Keep low-setting label on graphic. |
| S13 | 2009; ~7K/s; ~12.5 years | F39/F23/F24. Recomputed 395,889,687 seconds ≈12.55 years at supplied settings; graphic should label benchmark settings. |
| S14 | Argon2/Argon2id; 2015 | F25/F26; year refers to competition win, not current popularity. |
| S14 | ~20MB; 19 MiB; t=2; p=1 | F26; 19 × 1,048,576 = 19,922,944 bytes, so spoken decimal rounding works. Not a discrepancy. |
| S14 | v=19; m=19456,t=2,p=1 | F42 verifies the computed library serialization. 19,456 KiB = 19 MiB. Version 19 is a format field, not year 2019. |
| S14 | `$argon2id$v=19$m=19456,t=2,p=1$…` | Correct abbreviated prefix; not a complete real hash string. Use full F42 example or explicitly label abbreviation. |
| S14 | Single/shared secret, one more layer | F32 pepper model; not a replacement for salt. |
| S15 | TLS; Argon2id graphic | F36/F26; label the good grocery-app flow, not all sites. |
| S16 | US; ninety days; ≥15 characters; NIST SP 800-63B-4 | Institution/location description conventional but not separately verified in factsheet; 90 days illustrative; minimum and document identifier correct. “Recently”/“now” should not imply all provisions originated in this revision. |
| S17 | SHA-1; first five; f14d5 | F33/F43; independent SHA-1: f14d5ba7f5892b8cb2549dea72287ee3692bb297. Correct prefix. |
| S18 | Two jobs; long/unique; “most people” | Two responsibilities are editorial structure; uniqueness consequence needs verified mechanism support; “most people” is an unsupported quantitative majority claim. |

These are idealized full-space times computed from benchmark rates. They are not observed compromise times for LinkedIn or other sites; the script must not let S02's “Some of those still fell in under a minute” imply that historical claim.

## Untagged claims and new issues

| Claim | Finding / suggested handling |
|---|---|
| S01 well-run site stores unreadable value | Supported by M1/F26/F27 in context; S15 supplies transient-access limit. Attach source mapping for production. |
| S02 “Some of those still fell in under a minute.” | **Unsupported historical implication.** F24 demonstrates an eight-character search-space estimate on a later GPU, not measured historical site/account cracking. Replace with “A modern graphics card can test an entire small password space in under a minute,” or move this hook to S12 with explicit conditions. |
| S03 plaintext table exposes passwords | Logical consequence of the illustrated design and F1; not a separate empirical statistic. |
| Reused password can open other accounts; unique password cannot be reused elsewhere | Conditional mechanism is sensible; factsheet lacks an explicitly VERIFIED credential-reuse entry. Round-1 evidence gap remains. Avoid absolute “can't open anything else”: a recovered credential can still be used on the breached site. Scope to other accounts via password reuse. |
| S05 hint gives a head start | Reasonable hypothetical inference from F10/M6, not a claim the key leaked or hints alone decrypted Adobe. |
| S06 cryptographic checking; S08 login comparison | Logical design explanation, but F36 explicitly notes incomplete direct verification. Add verified support for recomputation with stored salt/parameters if enforcing every-claim sourcing. |
| S07 change spreads everywhere / near miss | Supported as illustration of the computed pair. Do not animate every bit flipping or present 146 as universal. |
| S09 deterministic same password/same hash | Implied by repeated computation and F21; specify same algorithm/input conditions. |
| S11 leaked salt/hash permits targeted guessing | Reasoning consistent with F21 caveat. Likely-first strategy is not directly established by F4's distribution alone; distinguish inference. |
| S14 “OWASP, the open web security project” | Neither supplied entry verifies this gloss; it should not be presented as an authoritative organization-name expansion. Delete gloss or verify its correct name. |
| S14 “Each row … a slow fingerprint” | Legitimate only for the illustrated well-configured grocery app. Say that assumption explicitly; this is not a report about all current sites. |
| S15 emailed old password means readable copy | Strong warning, but “copy” is narrower than the demonstrated inference. “It can recover your password” is safer; doesn't establish plaintext versus reversible encryption or how every record is stored. |
| S16 “rules … changed recently” | Current guideline support does not prove each rule is newly introduced. Prefer “The current guidelines reflect this.” |
| S18 “easiest”; “most people”; notice “should say” | Recommendation needs clear opinion framing; majority claim delete/source; breach-notice wording is not verification of storage quality. End on what the mechanisms mean rather than a notice-wording test. |

## Proofreading and TTS hazards

No material spelling errors found. These are script/voice-preparation fixes, not observed synthesis defects.

| Text | Spoken fix / handling |
|---|---|
| mango at one two three | First mention: “mango, at sign, one two three”; preserve mango@123 in graphics. |
| SHA-256 / SHA-1 | Override as “S H A two fifty-six” / “S H A one.” |
| bcrypt / scrypt | “bee crypt” / “ess crypt.” |
| Argon2 / Argon2id | “argon two” / “argon two I D.” |
| OWASP / NIST | Test “oh wasp” / “nist.” Avoid the unsupported organization-name gloss. |
| Have I Been Pwned | Official caption spelling; pronounce “Have I Been Poned,” rhyming with owned. |
| RTX 4090 / MD5 | Existing “R T X forty ninety” / “M D five” are speech-ready; keep captions conventional. |
| Triple D E S | Already speech-ready. |
| Sixty-four characters | “Sixty-four hexadecimal characters” explains the representation. |
| Names, dictionary words, slang or simple patterns | Four items violates voice rule. Compress to “words or simple patterns” while retaining the source's broader definition in a graphic. |
| Long S14 first sentence / recipe explanation | Split recommendation from competition history. Define a pass as a repeat of the work; keep parameter detail on screen. |
| “scrypt … At its benchmark setting, that drops” | Clarify subject: “At the tested setting, the card manages…” |
| Hashes, parameters, tags, metadata, arrows, ellipses | Strip from narration input; do not read v=19 as a year or speak the hash strings. |
| Lead / read / live homographs | No exposed tense ambiguity requiring a textual rewrite identified. Test “read back” in the actual voice pass. |

## Pacing and brief match

Counts remove headings, table/metadata, fact tags and on-screen cues, then count whitespace-separated narration tokens. Different tokenization of hyphens can shift the count slightly without changing the gate.

| Beat | Words | At 155 wpm |
|---|---:|---:|
| S01–S02 | 116 | 0:45 |
| S03–S05 | 246 | 1:35 |
| S06–S10 | 345 | 2:14 |
| S11–S14 | 407 | 2:38 |
| S15–S18 | 350 | 2:15 |
| Total | 1,464 | 9:27 |

At the brief's 150–160 wpm, narration is approximately 9:09–9:46; measured pauses/holds may put the final cut in 9:30–11:00. No runtime pass is claimed without audio. The last four scenes occupy almost a quarter of narration and introduce several systems; this is the main retention opportunity. The grocery row, real code, verified quantities and calm visual cues match the brief. The promise about interpreting breach handling is partly fulfilled; the ending correctly admits a login screen cannot reveal implementation.

## Top three retention changes

1. **Complete the opening question inside fifteen seconds.** “A well-run website doesn't keep a readable password. So what does it compare when you log in?” Then introduce the email row.
2. **Make S14 a prediction, with the cost paid on both sides.** Pause before revealing what the leaked grocery table contains. Explain that slow hashing also costs the server work at each login; source any timing rather than inventing it. Fold pepper into that test or shorten it.
3. **Compress the standards tail and close on the viewer's action.** Keep the most useful rule changes; make HIBP an example of the blocklist check. Remove the unsupported majority claim and frame the manager recommendation as a take. Preserve the honest limit about invisible server storage.

## Verdict

**FAIL.** The revision is substantially stronger, and most round-1 factual corrections are complete. The remaining historical “under a minute” implication, normative NIST wording, unsupported manager/majority claims, and incomplete HIBP/format wording need correction or verified support. Accuracy remains below three. Re-review the corrected script before storyboarding; no changes to the script or other files were made in this round.
