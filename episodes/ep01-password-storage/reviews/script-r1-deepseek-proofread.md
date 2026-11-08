# Narration proofread — EPRead both files. The script already pre-spells most numbers and several acronyms (`Triple D E S`, `R T X`, `M D five`), which is good — the findings below are what's left.

## 1. Typos and grammar

- **L29 (S02):** `And why do some of those "protected" passwords still fall in under a minute?` — "fall in under a minute" is awkward ("fall [in]" + "under a minute"). Use "still fall in under a minute" → "still fall within a minute" or "still fall in under a minute" rewritten as "still get cracked in under a minute".
- **L33 (S03):** `Your password is mango at one two three.` — the `@` rendered as the word "at" reads as "mango at 123". Needs a spoken marker (see §2).
- **L43 (S04):** `Whoever holds the key turns every row back into the original.` — missing noun; should be "back into the original password."
- **L53 (S05):** `So encryption fixed the wrong problem. The site never needed to read your password back. It only needs to check it.` — tense shift (never needed → only needs).
- **L89 (S10):** `A salt is a random string the site generates for each user, and mixes into the password before hashing.` — missing object: "…and mixes **it** into the password."
- **L98 (S11):** `…and the same favourites as everyone else.` — "favourites" has no antecedent noun (favourite passwords); loose as written.
- **L100 (S11):** `That was the point of them.` — awkward/dangling antecedent; "That was their whole point." or "That's what they were designed for."
- **L123 (S14):** `The algorithm, the settings, the salt, and the hash, all in one line.` — comma-spliced fragment; also a four-item list (see §3).
- **L131 (S15):** `It arrives over an encrypted connection, gets hashed, gets compared, and is thrown away.` — mixed voice ("gets" vs "is thrown").
- **L132 (S15):** `So if a site ever emails you your old password…` — clunky doubling; `That tells you how it stores everything else.` — overreach/non sequitur (a readable old password doesn't prove how *everything else* is stored).
- **L115 (S13):** `That same set of passwords now takes about half a year.` — redundant "now" after "That same set."

## 2. TTS hazards

| Line | Text | Risk | Suggested spoken spelling |
|---|---|---|---|
| L33, L42, L91 | `mango at one two three` | "@"→"at" read as the preposition | `mango, at-sign, one two three` |
| L25, L36 | `RockYou` | may read "Rocky-you" | `Rock You` |
| L48, L54 | `Triple D E S` | good as-is | keep (or `Triple-D-E-S`) |
| L59, L60 | `SHA-256` | "sha" vs letters; hyphen on 256 | `S H A two five six` |
| L80, L145 | `SHA-1`, `SHA-1 hash` | same | `S H A one` |
| L104 | `R T X forty ninety` | OK; 4090 | keep (or `R T X four thousand ninety`) |
| L105 | `M D five` | good | keep |
| L104 | `hashcat` | usually fine | keep |
| L115 | `bcrypt` | "b-crypt" | `bee-crypt` |
| L117 | `scrypt` | "s-crypt" | `ess-crypt` |
| L121, L133 | `Argon2` | digit | `argon two` |
| L122, L133 | `Argon2id` | `2id` | `argon two I D` |
| L122 | `OWASP` | "oh-wasp" vs letters | `O W A S P` |
| L137 | `The US standards body NIST` | "US" → the word "us"; NIST usually fine | `the U S standards body, NIST` |
| L122 | `mebibytes` | rare; "meh-bib-ites" | `mebibytes (MEB-ee-bytes)` or say `megabytes` |
| L145 | `Have I Been Pwned` | "Pwned" → "peed/powned" | `Have I Been Pwned (P W N E D, "poned")` |
| L78, L79, L84 | `LinkedIn` | "linked-in" | keep; verify it says `Linked In` |
| L18, L83 | `row` | homograph: /roʊ/ vs "row" (argument) | verify; add `row, as in a database row` if wrong |
| L53, L132 | `read` | homograph: "reed" vs "red" (present tense) | verify it says `reed` |
| L29, L108 | `minute` | /ˈmɪnɪt/ vs "my-NOOT" | low risk |
| L133 | `TLS` (on-screen only) | if ever voiced → "t-l-s" | `T L S` |

On-screen strings — **do not voice** (or spell out if narrated): `mango@123`, `81c68634…efff1`, `hunter2 / hunter3`, `146 of 256 bits`, `32,603,388`, `"123456" × 290,731`, `6,458,020`, `117M`, `38M / ~153M`, `f14d5`, `$argon2id$v=19$m=19456,t=2,p=1$…`, `NIST SP 800-63B-4`, `17 s · 56 s · ~2 min`, `~177 days`, `~12.5 years`. If any become narration: `32,603,388` → "thirty-two million, six hundred and three thousand, three hundred and eighty-eight"; `123456` → "one two three four five six"; `19456` → "nineteen thousand four hundred and fifty-six"; `SP 800-63B-4` → "S P eight hundred sixty-three B four".

## 3. Phrases banned by `my-writing-style.md` §5–6

- None of the explicitly banned words/phrases appear (no "the catch is", "here's the thing", "it turns out", "game-changer", "seamless", "unlock", "delve", etc.). Good.
- **§5 rule 7 / §6 "At most three items per list":** L123 `The algorithm, the settings, the salt, and the hash, all in one line.` — four items. Split or drop one.
- **§5 banned "stacked rhetorical questions":** L28–29 (S02) is the one real hit — two questions back to back: `So if a site is not supposed to keep your password, what does it keep instead?` / `And why do some of those "protected" passwords still fall in under a minute?` Keep one.
- Borderline (not banned phrases, but flag per the "no slogan ending / no signpost" rules): L21 `And we know what happens next.` is a soft tease/signpost; L126 `Not your password. A slow, salted fingerprint of it.` and L154 `So the site's job is a slow, salted hash. Your job is a long password you've used nowhere else.` are slogan-adjacent parallel constructions. Section endings themselves (L146, L156) are concrete, so they pass.
- Narration has no em-dash asides, so §5's em-dash limit passes.

## 4. Sentences over 22 words / hard in one breath

- **L97 (S11) — 23 words:** `An attacker with a leaked salt and hash can still try passwords one by one: hash a guess with that salt, compare, repeat.` Split after "one by one".
- **L124 (S14) — 27 words:** `Because the settings travel with the hash, a site can raise the cost as hardware gets faster, and re-hash your password the next time you log in.` Split into two.
- **L145 (S17) — 24 words:** `The service Have I Been Pwned takes the SHA-1 hash of the password you want to test, and sends only its first five characters.` Split after "test".

Near the limit (21–22 words, likely a second breath):
- L113 (S13) — 21: `Password hashing functions are built to be slow on purpose, and you can turn the slowness up as hardware gets faster.`
- L116 (S13) — 21: `scrypt, from two thousand nine, also forces each guess to use a lot of memory, which graphics cards are short of.`
- L156 (S18) — 21: `Then, when some site does get breached, the attacker gets a fingerprint that is slow to crack, and useless everywhere else.`
- L115 (S13) — 19: `On the same card, bcrypt at a low setting manages about a hundred and eighty-four thousand guesses a second.` (fine alone, tight with the next sentence).
