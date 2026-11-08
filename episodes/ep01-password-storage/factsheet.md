# Ep01 fact sheet: Why websites don't store your password

Researched 2026-11-09. Status key:
- VERIFIED: I opened the source (or extracted its text) and it says this. Press quoting a company or researcher is marked as such.
- UNVERIFIED: only seen in a search snippet or a secondary source, the source could not be opened, or the source does not actually say it.

Rules applied: no invented numbers. Computed numbers are labelled "computed" and show their inputs.

---

## 1. Plaintext storage

**F1. In December 2009, game-widget maker RockYou had about 32 million user passwords leaked, and they were stored as readable text.**
- Figure: "32 million passwords"; "stored in cleartext in the database and were extracted through a SQL Injection vulnerability".
- Source: Imperva ADC, "Consumer Password Worst Practices" (white paper, text extracted from PDF), https://www.imperva.com/docs/WP_Consumer_Password_Worst_Practices.pdf . Report publication date is not printed in the extracted text (it says "In December 2009, a major password breach occurred").
- VERIFIED
- Caveat: the whole-file claim that the hacker posted the full list online is also in this paper (verified). Imperva is a security vendor analysing leaked data, not RockYou itself.

**F2. The exact count of accounts was 32,603,388.**
- Source: TechCrunch, "RockYou Hacked" (Dec 14, 2009), https://techcrunch.com/2009/12/14/rockyou-hacked/ . Text: "32,603,388 to be exact"; "The database included a full list of unprotected plain text passwords."
- VERIFIED (as press at the time)
- Caveat: attributed to the hacker's claim, not a RockYou audit. Say "about 32 million" in the script.

**F3. The most common RockYou password was "123456", used by 290,731 accounts, about 0.89 percent, roughly 1 in 112.**
- Figure: 290,731 users (Imperva top-20 table, extracted text reads "290731"). Share computed: 290,731 / 32,603,388 = 0.8917%. Imperva's own wording: one guess per account with the top-5000 list hits "0.9%" with the first attempt.
- Source: Imperva white paper (URL in F1) for the count and "The most common password among Rockyou.com account owners is '123456'. The runner up is '12345'"; denominator from TechCrunch (F2).
- VERIFIED (count and rank); share is COMPUTED
- Caveat: mixing two sources for the share. If you want a single-source share, say "about 0.9 percent", which is Imperva's own rounding. Imperva's analysed set was "32 million", so the exact count may differ slightly.

**F4. Imperva found weak choices were the norm in that leak.**
- Figures: about 30% of passwords were six characters or fewer; almost 60% drew from a limited character set; about 40% used only lowercase and about 16% only digits; nearly 50% used names, slang, dictionary words or trivial patterns; the 5,000 most popular passwords were used by about 20% of users; only 0.2% met two NASA password recommendations.
- Source: Imperva white paper (URL in F1).
- VERIFIED
- Caveat: rounded figures from the paper; read them as "about".

**F5. Facebook said in March 2019 that it found hundreds of millions of user passwords stored in a readable format in internal logs.**
- Figure: "hundreds of millions of Facebook Lite users", "tens of millions of other Facebook users", "tens of thousands of Instagram users" (post of March 21, 2019). Update dated April 18, 2019: Instagram impact revised to "millions of Instagram users". Found "during a routine security review in January." Facebook says the passwords "were never visible to anyone outside of Facebook."
- Source: Facebook Newsroom, "Keeping Passwords Secure", https://about.fb.com/news/2019/03/keeping-passwords-secure/
- VERIFIED
- Caveat: Facebook gives ranges, not exact counts, and this was internal logging, not an outside breach. Facebook did not say the passwords were stolen. Good example that "stored plaintext" can happen by accident.

## 2. Encryption vs hashing: Adobe 2013

**F6. Adobe confirmed its stolen passwords were encrypted, not hashed.**
- Figure: Adobe spokesperson Heather Edell: "The system involved in the attack used Triple DES encryption to protect all password information stored." CSO says Adobe confirmed the passwords "were not hashed as originally assumed by many, but they were encrypted." Disclosure was Oct 3, 2013.
- Source: CSO Online, "Adobe confirms stolen passwords were encrypted, not hashed" (Nov 4, 2013), https://www.csoonline.com/article/540070/network-security-adobe-confirms-stolen-passwords-were-encrypted-not-hashed.html
- VERIFIED (press quoting Adobe)
- Caveat: the CSO page text says the CSO article date is Nov 4, 2013 and cites researcher Jeremi Gosney for 130,324,429 users in the most recent dump, with about 1.9 million using "123456" and over 440,000 using "123456789". Those are a researcher's figures in press: treat as VERIFIED that CSO reported them, not as Adobe's numbers.

**F7. Adobe's regulator-reviewed facts: a single encryption key, hints in plain text, and a block cipher that lets common passwords show up as identical.**
- Figures: "continued to store user credential information in that system using a single encryption key"; "Adobe also stored customer 'password hints' in the backup system in plain text rather than in an encrypted format." The report also contains a sentence beginning "The choice of a block cipher encryption algorithm meant that common passwords shared by different users" (the rest of that sentence was cut off in my fetch; it concerns identical ciphertext).
- Source: Office of the Australian Information Commissioner, Adobe Systems Software Ireland Ltd own motion investigation report (published 1 June 2015), https://www.oaic.gov.au/privacy/privacy-assessments-and-decisions/privacy-decisions/Investigation-inquiry-reports/adobe-systems-software-ireland-ltd-own-motion-investigation-report
- VERIFIED (regulator document); the sentence ending is not read
- Caveat: Australian counts in the report are not global (1,787,100 Australian active and inactive users with current password data involved; 135,288 with encrypted payment card data). Do not present them as the global figure. Re-open the page to read the end of the block-cipher sentence before quoting it.

**F8. Adobe's passwords were 3DES in ECB mode, so identical passwords gave identical ciphertext.**
- Source: Filippo Valsorda, "Analyzing the Adobe leaked passwords", https://filippo.io/analyzing-the-adobe-leaked-passwords . Text: "allegedly 3DES, in ECB mode"; "every block of 8 bytes is encrypted separately and you can spot duplicates between 8-character blocks"; with no salt "duplicate passwords will stand out."
- UNVERIFIED for the ECB mode as an Adobe-confirmed fact (a researcher's inference, hedged with "allegedly"; Adobe only confirmed Triple DES, F6). The page itself warns it is "almost ten years old".
- Caveat: Troy Hunt, "Adobe credentials and the serious insecurity of password hints" (https://www.troyhunt.com/adobe-credentials-and-serious/, metadata date 2013-11-12) does say "all instances of a password of, say 'blue' will produce the same cipher", which is VERIFIED for the identical-ciphertext point without naming ECB. Say "identical passwords produced identical scrambled values" and keep "ECB" as a label only if you accept the hedge.

**F9. Adobe said attackers got encrypted passwords for about 38 million active users; the dump was far larger, about 153 million records.**
- Figures: Adobe spokesperson: "encrypted passwords for approximately 38 million active users" (Krebs, Oct 29, 2013). HIBP: 152,445,165 accounts, breach date 2013-10-04, added 2013-12-04. Troy Hunt imported 152,989,508 records; Filippo lists 152,982,479 entries. Three slightly different counts: use "about 153 million".
- Sources: Krebs on Security, https://krebsonsecurity.com/2013/10/adobe-breach-impacted-at-least-38-million-users/ ; HIBP breach record, https://haveibeenpwned.com/api/v3/breach/Adobe (description: "153 million Adobe accounts ... encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text."); Troy Hunt (URL in F8).
- VERIFIED
- Caveat: Krebs says Adobe first reported "nearly 3 million encrypted customer credit card records". The widely repeated "2.9 million customers" appears only in a Duo snippet I could not open: UNVERIFIED, do not use.

**F10. Adobe's password hints were stored unencrypted, and about 109 million records had one.**
- Figure: 109,305,888 records contain a hint (Troy Hunt); hints "in plain text" (HIBP, OAIC).
- Sources: Troy Hunt (URL in F8); HIBP (URL in F9); OAIC (URL in F7).
- VERIFIED
- Caveat: Hunt's counts are from the dump he loaded, not an Adobe statement.

**F11. Why reversible encryption was the wrong tool: a key can unlock everything and identical passwords look identical.**
- Source for the key point: OAIC "single encryption key" (F7). Contrast with NIST: verifiers "SHALL be salted and hashed" (F27).
- VERIFIED for the facts above; the explanation is script reasoning, not a quoted source.
- Caveat: do not claim the key leaked. No source I opened says the key was stolen; the passwords were "quickly resolved" because of the weaknesses above.

## 3. Hashing basics

**F12. A cryptographic hash function is "one-way": it is computationally infeasible to find any input that maps to a pre-specified output.**
- Source: NIST CSRC Glossary, "hash function", quoting FIPS 186-5 and SP 800-57 Part 1 Rev. 5, https://csrc.nist.gov/glossary/term/cryptographic_hash_function . Also "Collision-resistant: It is computationally infeasible to find any two distinct inputs that map to the same output."
- VERIFIED

**F13. SHA-256 always produces a 256-bit (64 hex character) output, whatever the input size.**
- Evidence: my local run (below) shows 64 hex characters for a 7-character input. The standard (FIPS 180-4) was not opened.
- UNVERIFIED against the standard; VERIFIED by local computation for these two outputs.
- Caveat: link FIPS 180-4 (https://csrc.nist.gov/pubs/fips/180-4/upd1/final) only after opening it.

**F14. Exact SHA-256 outputs (computed locally on macOS with `shasum`).**
```
$ printf 'hunter2' | shasum -a 256
f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7

$ printf 'hunter3' | shasum -a 256
fb8c2e2b85ca81eb4350199faddd983cb26af3064614e737ea9f479621cfa57a
```
- Source: local computation, 2026-11-09. Inputs have no trailing newline (`printf`).
- VERIFIED (own computation)
- Caveat: if the script shows `echo hunter2`, the newline changes the hash. Use `printf`.

**F15. Changing one character of the input changed 146 of the 256 output bits (about 57 percent): the avalanche effect.**
- Figure: computed by XOR of the two hashes in F14 and counting set bits: 146 of 256.
- Source: own computation. Ideal avalanche is about half the bits (128); 146 is one sample, not a guarantee.
- VERIFIED (own computation); the term "avalanche effect" has no opened authoritative source: UNVERIFIED for the definition.
- Caveat: say "about half the output bits flip", not "exactly half".

## 4. Unsalted fast hashes: LinkedIn 2012

**F16. In June 2012 a file of 6,458,020 unsalted SHA-1 password hashes from LinkedIn was posted online.**
- Figure: "6,458,020 SHA-1 unsalted password hashes" (quoting Sophos's Graham Cluley); other reports said "nearly 6.5 million". LinkedIn had not confirmed the number at the time of the article.
- Source: GovInfoSecurity, "LinkedIn: Hashed Passwords Breached" (Tracy Kitten, June 6, 2012), https://www.govinfosecurity.com/linkedin-hashed-passwords-breached-a-4837
- VERIFIED (press at the time)
- Caveat: LinkedIn's own 2012 blog post could not be opened (its URL now redirects to a generic blog index and the archive was blocked). LinkedIn's own confirmation of the hash type is UNVERIFIED.

**F17. In May 2016 LinkedIn said it believed 117 million emails and passwords were stolen in the 2012 breach, far above the 6.5 million first reported.**
- Figures: "117 million user emails and passwords were stolen in the breach"; the 6.5 million originally reported had been reset in 2012; "no indication of a new data breach". Article dated May 18, 2016.
- Source: AP via Phys.org, "LinkedIn confirms 2012 hack exposed 117M user passwords", https://phys.org/news/2016-05-linkedin-hack-exposed-117m-user.html
- VERIFIED (press quoting LinkedIn)
- Caveat: the AP piece does not mention salting. LinkedIn's own May 18, 2016 post could not be opened.

**F18. Have I Been Pwned lists 164,611,595 LinkedIn accounts from the 2012 breach, added 21 May 2016.**
- Figure: PwnCount 164611595; BreachDate 2012-05-05; AddedDate 2016-05-21. Description: "Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later"; the full description mentions 164 million email addresses and passwords.
- Source: HIBP breach record, https://haveibeenpwned.com/api/v3/breach/LinkedIn
- VERIFIED
- Caveat: 164.6M is the count of emails in the dump; 117M had passwords (LinkedIn's figure, F17). A Fraud.org page (https://fraud.org/linkedin_breach/) reportedly says 167 million total with 117 million having passwords. I did not open it: UNVERIFIED. Use "about 164 million" with HIBP as the source and "117 million" for passwords.

**F19. Rainbow tables are precomputed lookup tables built to reverse a hash quickly; the 2003 paper cracked 99.9 percent of alphanumeric Windows password hashes using 1.4 GB of tables.**
- Figure: "Using 1.4GB of data (two CD-ROMs) we can crack 99.9% of all alphanumerical passwords hashes" (Windows passwords). The paper builds on Hellman's 1980 time-memory trade-off. The "13.6 seconds" timing is from a search snippet only: UNVERIFIED.
- Source: Philippe Oechslin, "Making a Faster Cryptanalytic Time-Memory Trade-Off", CRYPTO 2003, https://infoscience.epfl.ch/record/99512 (abstract page opened).
- VERIFIED (abstract)
- Caveat: Windows LM-style hashes, which were unusually weak. Do not generalise the 99.9% figure to modern hashes.

## 5. Salting

**F20. A salt is a unique, randomly generated string added to each password before hashing.**
- Source: OWASP Password Storage Cheat Sheet, "A salt is a unique, randomly generated string that is added to each password as part of the hashing process." https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html (opened 2026-11-09; page undated).
- VERIFIED

**F21. Salting defeats precomputed lookup tables: with a large random salt, "lookup tables offer an adversary no advantage".**
- Figure: "If a random salt is chosen whenever users establish new passwords, and if the salt space is large enough to ensure a negligible probability of recurrence, lookup tables offer an adversary no advantage; he may as well compute F at the time of attack." The paper credits the salt idea to Morris and Thompson.
- Source: Provos and Mazieres, "A Future-Adaptable Password Scheme", 1999 USENIX Annual Technical Conference (Monterey, June 6-11, 1999), https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf (text extracted from PDF)
- VERIFIED
- Caveat: a salt does not slow down guessing a single targeted account. It stops one precomputed table from working on all accounts and makes identical passwords hash differently.

**F22. NIST requires the salt to be at least 32 bits and chosen to minimise collisions among stored hashes.**
- Figure: "The salt SHALL be at least 32 bits in length and chosen to minimize salt value collisions among stored hashes". Section 3.1.1.2.
- Source: NIST SP 800-63B-4, https://pages.nist.gov/800-63-4/sp800-63b.html
- VERIFIED
- Caveat: 32 bits is a floor. OWASP and bcrypt/Argon2 libraries use longer random salts (RFC 9106 recommended sets use a 128-bit salt, F25).

## 6. Speed is the enemy: hashcat on an RTX 4090

Benchmark: hashcat v6.2.6, NVIDIA GeForce RTX 4090 (24 GB), CUDA 11.8, driver 522.25, single GPU. Source: https://gist.github.com/Chick3nman/32e662a5bb63bc4f51b847bb422222fd (benchmark posted by a hashcat community member; opened).

**F23. One RTX 4090 tests 164.1 billion MD5 guesses per second.**

| Algorithm (hashcat mode) | Speed (exact line) | Per second |
|---|---|---|
| MD5 (0) | 164.1 GH/s | 164,100,000,000 |
| SHA-1 (100) | 50638.7 MH/s | 50,638,700,000 |
| SHA2-256 (1400) | 21975.5 MH/s | 21,975,500,000 |
| PBKDF2-HMAC-SHA256 (10900) | 8865.7 kH/s | 8,865,700 |
| bcrypt $2*$ (3200), "Iterations: 32" | 184.0 kH/s | 184,000 |
| scrypt (8900), "Iterations: 16384" | 7126 H/s | 7,126 |

- VERIFIED (lines quoted from the gist)
- Caveats:
  - This is a community-posted benchmark, not an official hashcat release page. hashcat v6.2.6 had no Argon2 mode in the part I read (the gist was truncated after mode 26600, last ~29k characters unread): Argon2 on a 4090 is UNVERIFIED, do not quote a number.
  - The bcrypt benchmark uses "Iterations: 32", which is 2^5, i.e. cost 5 (my reading of hashcat's convention, not stated on the page). OWASP says cost 10 or more; cost 10 is 32 times slower (computed).
  - scrypt benchmark "Iterations: 16384" is N = 2^14. The page does not show r or p. OWASP's minimum is N = 2^17, 8 times costlier in memory and time (computed).
  - The PBKDF2 benchmark's internal iteration count was not stated on the page I read. Do not compare it to OWASP's 600,000.

**F24. Time to try every 8-character lowercase+digit password (36^8 = 2,821,109,907,456) on one RTX 4090 at those rates (computed).**

| Algorithm | Seconds | Readable |
|---|---|---|
| MD5 | 17.19 | about 17 seconds |
| SHA-1 | 55.71 | about 56 seconds |
| SHA-256 | 128.38 | about 2.1 minutes |
| PBKDF2-HMAC-SHA256 (benchmark settings) | 318,205 | about 3.7 days |
| bcrypt, cost 5 (benchmark settings) | 15,332,119 | about 177 days (0.49 years) |
| bcrypt, cost 10 (benchmark x 32, computed) | about 490 million | about 15.5 years |
| scrypt, N=2^14 (benchmark settings) | 395,889,687 | about 12.5 years |
| scrypt, N=2^17 (benchmark / 8, computed estimate) | about 3.2 billion | about 100 years |

- Method: 36^8 / rate, worst case (exhausting the whole space); the average success time is half. One GPU only; attackers can use many.
- VERIFIED inputs, COMPUTED outputs
- Caveats: the bcrypt cost-10 and scrypt N=2^17 rows are linear extrapolations, not measured, and a real GPU may behave differently with memory-hard settings. Real people do not pick random 8-character strings, so cracking real leaks is faster (see RockYou F4). Say "about" for every row.

## 7. Slow, memory-hard password hashing

**F25. The history in one line: bcrypt (1999), scrypt (2009), Argon2 (2015 winner, RFC 9106 in 2021).**
- bcrypt: Provos and Mazieres, "A Future-Adaptable Password Scheme", 1999 USENIX Annual Technical Conference, Monterey, June 6-11, 1999. Abstract: "algorithms with adaptable cost" (eksblowfish), "a blockcipher with a purposefully expensive key schedule". https://www.usenix.org/legacy/events/usenix99/provos/provos.pdf (VERIFIED)
- scrypt: Colin Percival, "Stronger Key Derivation via Sequential Memory-Hard Functions". Abstract: introduces "memory-hard algorithms and sequential memory-hard functions" to resist "attacks using custom hardware". https://www.tarsnap.com/scrypt/scrypt.pdf (VERIFIED for title and abstract). The extracted text has no conference name or date, so "BSDCan 2009" is UNVERIFIED from this file (the references cite "personal communication, 2009").
- Argon2: Password Hashing Competition site: "In July 2015 we announced Argon2 as a winner and gave special recognition to four of the finalists: Catena, Lyra2, Makwa, yescrypt." https://www.password-hashing.net/ (VERIFIED)
- RFC 9106, "Argon2 Memory-Hard Function for Password Hashing and Proof-of-Work Applications", copyright 2021, status Informational (not a Standards Track document). https://www.rfc-editor.org/rfc/rfc9106 (VERIFIED). The page did not show the month; the RFC number sequence places it in 2021, but I did not confirm "September".
- Argon2 recommended settings in RFC 9106 section 4: FIRST RECOMMENDED "Argon2id with t=1 iteration, p=4 lanes, m=2^(21) (2 GiB of RAM), 128-bit salt, and 256-bit tag size"; SECOND RECOMMENDED "t=3 iterations, p=4 lanes, m=2^(16) (64 MiB of RAM)", same salt and tag.
- Caveat: RFC 9106 is "Informational", so do not call it an internet standard.

**F26. OWASP's current minimums (page opened 2026-11-09; page carries no date).**
- Argon2id: minimum "19 MiB of memory, an iteration count of 2, and 1 degree of parallelism" (m=19456, t=2, p=1).
- scrypt: minimum CPU/memory cost parameter N = 2^17, block size r = 8 (1024 bytes), parallelization p = 1.
- bcrypt: "a work factor of 10 or more and with a password limit of 72 bytes"; "enforce a maximum password length of 72 bytes".
- PBKDF2-HMAC-SHA256: 600,000 iterations; PBKDF2-HMAC-SHA512: 220,000; PBKDF2-HMAC-SHA1: 1,400,000 ("legacy only, do not select for new systems").
- Source: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- VERIFIED
- Caveat: the sheet lists equivalent Argon2id/scrypt settings; I quoted only the minimum configuration. Values change over time, so re-check the page the day you record.

## 8. NIST SP 800-63B (current revision)

Document: NIST SP 800-63B-4, "Digital Identity Guidelines: Authentication and Authenticator Management", Final July 2025 (record shows "07/31/25: SP 800-63B-4 (Final)"), supersedes SP 800-63B (03/02/2020). Sources: https://csrc.nist.gov/pubs/sp/800/63/b/4/final and https://pages.nist.gov/800-63-4/sp800-63b.html (both opened). VERIFIED. All clauses below are from Section 3.1.1.2 "Password Verifiers" of the HTML edition.

**F27. Passwords must be salted and hashed, with a cost factor as high as practical.** "Passwords SHALL be salted and hashed using a suitable password hashing scheme." "The chosen cost factor SHOULD be as high as practical without negatively impacting verifier performance." (Cost factor is SHOULD; salting/hashing is SHALL.) VERIFIED. Table 4 also says to "Store centrally verified passwords in a salted, hashed form, including a keyed hash." (that table's section number was not confirmed; cite only 3.1.1.2).

**F28. Verifiers must check new passwords against a blocklist of common and breached passwords.** "SHALL compare the prospective secret against a blocklist that contains known commonly used, expected, or compromised passwords" (sentence begins "When processing a request to establish or change a password"). The blocklist "may include" "Passwords obtained from previous breach corpuses", "Dictionary words", and "Context-specific words, such as the name of the service, the username, and derivatives thereof". VERIFIED.

**F29. No forced periodic rotation.** Item 6: "Verifiers and CSPs SHALL NOT require subscribers to change passwords periodically. However, verifiers SHALL force a change if there is evidence that the authenticator has been compromised." VERIFIED.

**F30. Length over composition.** Item 1: passwords used as a single factor must be "a minimum of 15 characters in length"; passwords used only inside multi-factor processes "SHALL" be at least eight characters. Item 2: "SHOULD permit a maximum password length of at least 64 characters." Item 5: "SHALL NOT impose other composition rules (e.g., requiring mixtures of different character types) for passwords." VERIFIED. Caveat: the 15-character minimum applies to single-factor passwords; do not say "NIST says 15 characters for everything".

**F31. Hints and security questions are banned, and verifiers must check the whole password.** Item 7: "SHALL NOT permit the subscriber to store a hint ... that is accessible to an unauthenticated claimant." Item 8: "SHALL NOT prompt subscribers to use knowledge-based authentication (KBA) ... or security questions when choosing passwords." Item 9: "SHALL request the password to be provided in full ... and SHALL verify the entire submitted password (e.g., not truncate it)." Also: "Verifiers SHALL allow the use of password managers and autofill functionality." and "SHALL implement a rate-limiting mechanism" (Sec. 3.2.2 referenced). VERIFIED. Nice tie to Adobe's plaintext hints (F10).

## 9. Pepper

**F32. A pepper is a secret shared across stored passwords that is kept separately from the password database.**
- Figures: "shared between stored passwords"; "should not be stored along with the generated hash"; "Peppers are secrets and should be stored in 'secrets vaults' or HSMs (Hardware Security Modules)"; "the pepper should be stored separately from the password database"; "In the event of a pepper's compromise, the pepper will have to be changed"; "Consider using a pepper to provide additional defense in depth."
- Source: OWASP Password Storage Cheat Sheet (URL in F20).
- VERIFIED
- Caveat: OWASP frames a pepper as defence in depth, an extra, never a replacement for a salt and a slow hash. A salt is unique per user and stored with the hash; a pepper is shared and stored elsewhere.

## 10. Have I Been Pwned: Pwned Passwords and k-anonymity

**F33. Pwned Passwords lets you check a password by sending only the first 5 hex characters of its SHA-1 hash.**
- Figures: `GET https://api.pwnedpasswords.com/range/{first 5 SHA-1 chars}`; the API returns "the suffix of every hash beginning with the specified prefix" with a count for each; every prefix returns HTTP 200; the client matches its own suffix locally. Optional `Add-Padding: true` makes responses contain between 800 and 1,000 results (padded entries have a count of 0). The docs call this a "k-anonymity model". 5 hex characters give 16^5 = 1,048,576 buckets (computed).
- Source: HIBP API v3 documentation, https://haveibeenpwned.com/api/v3#PwnedPasswords ; HIBP Passwords page, https://haveibeenpwned.com/Passwords ("only the first 5 characters of the SHA-1 hash are sent to the API").
- VERIFIED
- Caveat: the response is a few hundred suffixes per prefix, not one: Cloudflare measured an average of 478 on the half-billion dataset (smallest 381, largest 584). Source below.

**F34. Cloudflare's 2018 write-up explained the same range-search idea and measured response sizes.**
- Figure: Example password "test" has SHA-1 `a94a8fe5ccb19ba61c4c0873d391e987982fbbd3`, so prefix `a94a8`. Over 500 million passwords (v2), average 478 hashes returned per prefix.
- Source: Cloudflare Blog, "Validating Leaked Passwords with k-Anonymity" (metadata date 2018-02-21), https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/
- VERIFIED

**F35. How many passwords are in Pwned Passwords?** Dec 20, 2021: "Today's release brings the total Pwned Passwords count to 847,223,402."
- Source: Troy Hunt, "Open Source Pwned Passwords with FBI Feed and 225M New NCA Passwords is Now Live" (metadata date 2021-12-20), https://www.troyhunt.com/open-source-pwned-passwords-with-fbi-feed-and-225m-new-nca-passwords-is-now-live
- VERIFIED for Dec 2021 only.
- Caveat: a Netwrix community post titled "Latest HIBP Update - 695,710,228 Hashes (2,002,467,796 total)" is dated Dec 1, 2025 (https://community.netwrix.com/t/latest-hibp-update-695-710-228-hashes-2-002-467-796-total/119001). That is a secondary, third-party forum post and the HIBP Passwords page does not state a total: the "about 2 billion" current figure is UNVERIFIED. Say "hundreds of millions, now over a billion" only after checking HIBP; safest: quote the 2021 figure with its date.

## 11. How a login works

**F36. The pieces of a login, each with a source.**
1. The browser sends the password over an encrypted connection: OWASP Authentication Cheat Sheet: "The login page and all subsequent authenticated pages must be exclusively accessed over TLS or other strong transport." https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html (VERIFIED). TLS 1.3 (RFC 8446, August 2018) is "designed to prevent eavesdropping", also tampering and message forgery. https://www.rfc-editor.org/rfc/rfc8446 (VERIFIED, abstract only read).
2. The server receives the full password and verifies all of it: NIST 3.1.1.2 item 9 (F31). VERIFIED. So the site does see your password for a moment at login.
3. It looks up your stored salt and cost settings, recomputes the hash and compares: salted slow hash per NIST (F27) and OWASP (F26). The "recompute with stored salt and parameters" description is the standard design, but no opened page spells out those exact steps: treat the sentence as script explanation, VERIFIED only in parts.
4. It compares in a way that does not leak timing: Python docs on `hmac.compare_digest`: "designed to prevent timing analysis by avoiding content-based short circuiting behaviour, making it appropriate for cryptography." https://docs.python.org/3/library/hmac.html#hmac.compare_digest (VERIFIED). The page does not use the phrase "constant time"; OWASP Password Storage did not mention constant-time comparison in the part I read. Say "a timing-safe comparison".
5. Error messages are generic: OWASP: respond with "Login failed; Invalid user ID or password." regardless of the cause. VERIFIED.

## 12. India-relevant example

**F37. No clearly sourced India password-storage case found.**
- Searches returned only threat-intelligence marketing pages and unofficial summaries (for example HEROIC reports, a CloudSEK/Cyble item about the Swachhata Platform with 16 million records, a MojoAuth article on a Madhya Pradesh Cyber Police advisory about "68 crore" credentials, an Angel One article on a CERT-In alert about 16 billion credentials). I opened none of the primary documents.
- UNVERIFIED. Do not use any of these in the script.
- Next step if you want one: look for a CERT-In advisory or a court/regulator document that states the storage method (plaintext or hash type). The global cases above already cover the argument.

---

## Misconceptions and the sources that correct them

**M1. "The company can see my password."** Partly. A well-run site stores only a salted slow hash (F27, F26), so it cannot read the stored password. But at login it must receive your full password to check it (F31 item 9, F36) and can mishandle it, as Facebook did with plaintext in internal logs (F5). Sources: NIST SP 800-63B-4; Facebook Newsroom.

**M2. "Encryption and hashing are the same thing."** Encryption is reversible with a key; hashing is one-way (F12). Adobe used encryption (F6) and the result was "poorly done and many were quickly resolved back to plain text" (HIBP, F9). Sources: NIST glossary; CSO Online; HIBP.

**M3. "Hashed means safe."** Not if the hash is fast and unsalted: LinkedIn's 2012 leak was unsalted SHA-1 (F16) and one RTX 4090 tests about 50.6 billion SHA-1 hashes per second (F23), which clears the 36^8 space in under a minute (F24). Sources: GovInfoSecurity; hashcat benchmark.

**M4. "Symbols and mixed case beat length."** NIST SP 800-63B-4 bans composition rules ("SHALL NOT impose other composition rules") and sets a 15-character minimum for single-factor passwords (F30). OWASP: "There should be no requirement for upper or lower case or numbers or special characters" (https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html, VERIFIED). Imperva: most RockYou users chose short or simple passwords regardless (F4).

**M5. "You should change your password every 90 days."** NIST: "SHALL NOT require subscribers to change passwords periodically" unless there is evidence of compromise (F29). VERIFIED.

**M6. "A password hint is harmless."** NIST bans hints visible to an unauthenticated claimant (F31 item 7); Adobe stored them unencrypted, and about 109 million records had one (F10).

---

## Do not say (tempting, wrong or unsourced)

1. "Adobe hashed its passwords" or "used MD5." Adobe encrypted with Triple DES (F6).
2. "Adobe confirmed ECB mode." Adobe confirmed Triple DES only; ECB came from a researcher's inference (F8).
3. "2.9 million Adobe accounts" as the headline number. Only seen in an unopened snippet; Adobe's own figure for passwords was 38 million active users, while the dump had about 153 million records (F9).
4. "Adobe's encryption key was stolen." No opened source says so.
5. "LinkedIn stored passwords in plaintext." They were unsalted SHA-1 hashes (F16).
6. "117 million LinkedIn passwords leaked in 2012." About 6.46 million hashes were posted in 2012; the 117 million figure surfaced in 2016 (F16, F17). Say "164 million accounts" only with the HIBP source (F18).
7. "LinkedIn's 2016 file was unsalted SHA-1." I did not open a source for the 2016 dump's format.
8. "RockYou had exactly 32 million passwords" or "123456 was exactly 1 percent." The count is 32,603,388 per TechCrunch (hacker's claim) or "32 million" per Imperva; 123456 was about 0.89 percent (F3).
9. "Facebook stored 600 million passwords in plaintext." Facebook's post says "hundreds of millions" of Lite users and gives no exact count (F5). The 200 to 600 million press figures were not opened.
10. "13.6 seconds to crack any password with rainbow tables." That is a snippet about Windows alphanumeric hashes in a 2003 paper (F19).
11. "Argon2 on an RTX 4090 does X per second." No Argon2 number was found in hashcat v6.2.6 results (F23).
12. "The PBKDF2 row means 600,000 iterations" or "bcrypt benchmark is OWASP's cost 10." The benchmark rows use hashcat's own settings (F23).
13. "RFC 9106 is an internet standard." It is Informational (F25).
14. "NIST says passwords must be 8 characters." The current revision says 15 for single-factor passwords, 8 only when the password is one part of multi-factor authentication (F30).
15. "A pepper replaces a salt." OWASP calls it defence in depth; the pepper is shared and stored apart (F32).
16. "HIBP sends or stores your password." Only the first 5 hex characters of the SHA-1 hash are sent (F33).
17. "bcrypt is unbreakable" or "bcrypt hashes any length." OWASP notes a 72-byte limit (F26).
18. "NIST SP 800-63B-4 came out in 2024." Final July 2025 (F8 header).
19. "Python documents constant-time comparison." Its docs describe avoiding timing analysis and do not use that phrase (F36).
20. Any India breach figure from HEROIC, MojoAuth, Angel One, CloudSEK or Cyble pages (F37).

## Open items before scripting
- Open LinkedIn's own 2012 and 2016 blog posts (they were not retrievable) to upgrade F16 and F17 from press to company statement.
- Read the end of the OAIC block-cipher sentence (F7).
- Open FIPS 180-4 for SHA-256 output length (F13) and a primary source for the avalanche effect (F15).
- Confirm the current Pwned Passwords total on haveibeenpwned.com (F35).
- Open the RFC 9106 info page for the exact month, and Percival's BSDCan 2009 venue (F25).

## Added during scripting (2026-11-09)

**F38. A work factor can be raised over time; the common approach is to re-hash a user's password with the new setting the next time they log in.**
- Figure: "One key advantage of having a work factor is that it can be increased over time as hardware becomes more powerful and cheaper. The most common approach to upgrading the work factor is to wait until the user next authenticates, then re-hash their password with the new work factor."
- Source: OWASP Password Storage Cheat Sheet, "Upgrading the Work Factor", https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html (opened 2026-11-09)
- VERIFIED

**F39. scrypt was presented at BSDCan'09 in May 2009; it is designed to make hardware brute-force attacks far more costly.**
- Figure: "presented at BSDCan'09, May 09"; "designed to be far more secure against hardware brute-force attacks than alternative functions such as PBKDF2 or bcrypt."
- Source: Tarsnap scrypt page, https://www.tarsnap.com/scrypt.html (opened 2026-11-09)
- VERIFIED

**F40. SHA-256 always produces a 256-bit digest (64 hexadecimal characters).**
- Figure: "The SHA-224 and SHA-256 algorithms produce 224-bit and 256-bit message digests"; table "SHA-256 32 byte / 256 bit".
- Source: RFC 6234, US Secure Hash Algorithms, https://www.rfc-editor.org/rfc/rfc6234.txt (opened 2026-11-09)
- VERIFIED

**F41. NIST requires sites to allow password managers and autofill, and recommends allowing paste.**
- Figure: "Verifiers SHALL allow the use of password managers and autofill functionality. Verifiers SHOULD permit claimants to use the 'paste' function when entering a password..."
- Source: NIST SP 800-63B-4, §3.1.1.2, https://pages.nist.gov/800-63-4/sp800-63b.html (opened 2026-11-09)
- VERIFIED

**F42. A real Argon2id hash of mango@123 at OWASP's minimum settings, as stored by a common library.**
- Figure: `$argon2id$v=19$m=19456,t=2,p=1$cE3JU6U6szy6uvAh96bkyw$Pr8MGyxkXWUs/ALFyQ4a+2IS3skjs84BpY4YSDhLGFM` — algorithm, version, memory (KiB), passes, parallelism, salt, hash in one string.
- Source: computed locally with argon2-cffi `PasswordHasher(time_cost=2, memory_cost=19456, parallelism=1).hash('mango@123')` (2026-11-09). The salt is random per run.
- VERIFIED (computed)

**F43. SHA-256 and SHA-1 outputs used on screen (computed locally with shasum).**
- SHA-256(`mango@123`) = `81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1`; SHA-1(`mango@123`) = `f14d5ba7f5892b8cb2549dea72287ee3692bb297`; SHA-1 of 123456, password, 12345678, qwerty, iloveyou, 111111 as shown in the lookup-table scene; SHA-256(`9f2c4a71mango@123`) = `fb9d0556…0401`, SHA-256(`e05b13d8mango@123`) = `324ce3f9…a9a8` (salt prepended, illustrative 32-bit salts).
- VERIFIED (computed)

**F44. Leaked passwords are reused against other sites (credential stuffing), which relies on people reusing passwords.**
- Figure: "Credential stuffing attacks rely on not just the re-use of passwords between multiple sites, but also the re-use of usernames."; "due to frequent reuse of passwords across multiple sites, the possibility that the users email account has also been compromised should be considered."
- Source: OWASP Credential Stuffing Prevention Cheat Sheet, https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html (opened 2026-11-09)
- VERIFIED

**F45. Verification recomputes the hash with the stored salt and settings and compares: a working demonstration.**
- Figure: argon2-cffi `PasswordHasher.verify(stored, "mango@123")` returns True on the F42 string; `verify(stored, "mango@124")` raises `VerifyMismatchError`. The library reads algorithm, settings and salt from the stored string, hashes the attempt, and compares.
- Source: computed locally with argon2-cffi (2026-11-09)
- VERIFIED (computed demonstration)
