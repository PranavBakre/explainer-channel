# Storyboard — ep01

18 scenes · 86 narration beats · 10.37 min · 1920×1080 @ 30 fps · voice Kokoro af_heart

Generated from `storyboard.json` and the voice-timed build. Visuals are Remotion components (`video/src/components`).

## S01 — Cold open · part 0 · 0:00.6
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S01_01 | 0:00.6 | DbTable | A well-run website does not keep a readable copy of your password. | table "users — on a server somewhere" (email, password) · caption: Badly run site: anyone with the file can | rows fade in top to bottom; password cells re-scramble when the storage method changes |  |
| S01_02 | 0:05.4 | ↳ | So when you log in, what is it checking against? |  |  |  |
| S01_03 | 0:08.7 | ↳ | Somewhere there's a row with your email on it. Next to it sits something nobody at the company can read back. |  |  | tick |
| S01_04 | 0:16.0 | ↳ | A badly run website does keep the password. |  |  | tick |

## S02 — continued · part 0 · 0:19.6
Transition in: **cut (same idea continues)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S02_01 | 0:19.6 | BigNumber | In December two thousand nine, a company called RockYou was hacked. | 32,603,388 — RockYou passwords leaked · Dec 2009 · reported count | number counts up over 1.3 s, ease-out | hit |
| S02_02 | 0:24.4 | ↳ | About thirty-two million passwords leaked, and they were stored as plain, readable text. |  |  |  |
| S02_03 | 0:30.3 | TextStack | The most common password was one two three four five six. Almost three hundred thousand accounts used it. | 123456 / 290,731 accounts | lines rise 24 px and fade in on the word that names them |  |
| S02_04 | 0:37.6 | TextStack | Other sites did protect their passwords. But one modern graphics card can try every eight-character password of lowercase letters and digits, in some of those formats, in under a minute. | Other sites did protect their passwords. / One graphics card: every 8-char a–z 0–9 password, under a minute / for some of those formats · benchmark estimate | lines rise 24 px and fade in on the word that names them |  |

## S03 — 1 · Keep it · part 1 · 0:51.6
Transition in: **amber wipe (new part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S03_01 | 0:51.6 | ActTitle | Let's say you sign up for a new grocery app. Your password is mango, at sign, one two three. | Part one: Keep it | title rises in, accent rule draws left to right | whoosh |
| S03_02 | 0:58.2 | DbTable | The simplest thing the app can do is save it as it is. One column for your email, one for your password. | table "grocery_app.users" (email, password) · caption: Copy the table, get every password | rows fade in top to bottom; password cells re-scramble when the storage method changes |  |
| S03_03 | 1:05.7 | ↳ | It works. You log in. The app compares what you typed with what it saved, and lets you in. |  |  |  |
| S03_04 | 1:12.0 | ↳ | It also means anyone who copies that table walks away with every password in it. That was RockYou. |  |  |  |
| S03_05 | 1:18.7 | ↳ | And attackers try leaked passwords on other sites. If you reused yours, one leak can open those accounts too. |  |  |  |

## S04 — Encrypt it · part 1 · 1:26.9
Transition in: **push left (next link in the chain)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S04_01 | 1:26.9 | KeyDiagram | The obvious fix is to lock the column. Encrypt each password with a secret key. | mango@123 ⇄ U2FsdGVkX19x4k · one secret key | encrypt arrow first; red decrypt arrow and key turn red on the 'undone' line |  |
| S04_02 | 1:32.9 | ↳ | Now the table shows scrambled text instead of mango at one two three. |  |  |  |
| S04_03 | 1:38.0 | ↳ | But encryption is built to be undone. Whoever holds the key can turn every row back into the original. |  |  |  |

## S05 — Adobe, 2013 · part 1 · 1:45.4
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S05_01 | 1:45.4 | TextStack | In twenty thirteen, Adobe was breached. | Encrypted, not hashed / Triple DES | lines rise 24 px and fade in on the word that names them |  |
| S05_02 | 1:48.4 | ↳ | Its passwords were encrypted, not hashed, with a cipher called Triple D E S. |  |  |  |
| S05_03 | 1:54.3 | DbTable | Australia's privacy regulator later found that Adobe used a single encryption key for all of them. | table "adobe backup (illustration)" (email, password (encrypted), hint) · caption: One key for all of them · ~109M hints in plain text | rows fade in top to bottom; password cells re-scramble when the storage method changes |  |
| S05_04 | 2:01.5 | ↳ | About a hundred and nine million records also had a password hint, stored in plain text. |  |  | tick |
| S05_05 | 2:07.7 | StatGrid | Adobe said about thirty-eight million active users were hit. The leaked file had about a hundred and fifty-three million records. | 38M active users hit (Adobe) · ~153M records in the leaked file | figures rise in together |  |
| S05_06 | 2:16.4 | TextStack | A hint like "my dog's name" gives a guesser a head start. | A hint is a head start. / The site never needs to read it back. / It only needs to check it. | lines rise 24 px and fade in on the word that names them |  |
| S05_07 | 2:20.4 | ↳ | So encryption solved the wrong problem. The site never needed to read your password back. It only needs to check it. |  |  |  |

## S06 — 2 · Fingerprint it · part 2 · 2:29.0
Transition in: **amber wipe (new part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S06_01 | 2:29.0 | ActTitle | Checking without reading back is what a cryptographic hash does. | Part two: Fingerprint it | title rises in, accent rule draws left to right | whoosh |
| S06_02 | 2:33.3 | HashMachine | It turns any text into a fingerprint of fixed length. | mango@123 → SHA-256 → 81c68634d1b2… · No way back. Only guess, hash, compare. | input fades in, algorithm box pulses amber, output scrambles then locks left to right | tick |
| S06_03 | 2:37.0 | ↳ | Feed it mango at one two three, and SHA-256 gives back sixty-four characters, a jumble of digits and letters. It looks like noise. |  |  |  |
| S06_04 | 2:47.6 | ↳ | And there's no practical way to run it backwards. An attacker can still guess, hash the guess, and compare. |  |  |  |

## S07 — The avalanche · part 2 · 2:55.0
Transition in: **cut (same idea continues)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S07_01 | 2:55.0 | HashMachine | Change one character, and the fingerprint changes all over. | hunter2 → SHA-256 → f52fbd32b2b3… · hunter3 → SHA-256 → fb8c2e2b85ca… · 146 of 256 bits changed | input fades in, algorithm box pulses amber, output scrambles then locks left to right |  |
| S07_02 | 2:59.2 | ↳ | Hunter two and hunter three differ by a single digit. The differences are scattered across the whole fingerprint. |  |  |  |
| S07_03 | 3:07.1 | ↳ | In this pair, one hundred and forty-six of the two hundred and fifty-six bits flipped. |  |  |  |
| S07_04 | 3:12.7 | ↳ | So a near miss doesn't look like a near miss. |  |  |  |

## S08 — Login, with hashes · part 2 · 3:16.0
Transition in: **push left (next link in the chain)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S08_01 | 3:16.0 | FlowDiagram | So the app stores the fingerprint instead of the password. | You type → Hash it → Compare → Logged in | boxes and arrows build left to right, active box outlined |  |
| S08_02 | 3:19.7 | ↳ | When you log in, it hashes what you just typed, and compares the two fingerprints. |  |  |  |
| S08_03 | 3:25.2 | ↳ | They match, so the app lets you in. |  |  |  |
| S08_04 | 3:27.8 | ↳ | If that table leaks, the attacker gets fingerprints, not passwords. That sounds airtight. LinkedIn found out it wasn't. |  |  |  |

## S09 — LinkedIn, 2012 · part 2 · 3:36.2
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S09_01 | 3:36.2 | TextStack | In twenty twelve, a file of about six and a half million LinkedIn password hashes was posted online. | 6,458,020 password hashes posted online / SHA-1 · no salt | lines rise 24 px and fade in on the word that names them |  |
| S09_02 | 3:43.4 | ↳ | They were SHA-1 hashes, with nothing added. Unsalted. |  |  |  |
| S09_03 | 3:47.5 | LookupTable | That matters because the same password always produces the same fingerprint. | attacker's lookup table · SHA-1, computed in advance | scan bar steps down the table, matching row flashes red |  |
| S09_04 | 3:52.8 | ↳ | Attackers don't need to reverse anything. They hash millions of common passwords once, ahead of time, and keep the results in a lookup table. |  |  |  |
| S09_05 | 4:02.6 | ↳ | Then they just search. If your fingerprint is in their table, your password is the row next to it. |  |  | tick |
| S09_06 | 4:09.1 | StatGrid | Four years later, LinkedIn said it believed the breach was far bigger: a hundred and seventeen million emails and passwords. | 6.5M hashes posted · 2012 · 117M emails and passwords · LinkedIn, 2016 | figures rise in together |  |

## S10 — Salt · part 2 · 4:18.0
Transition in: **zoom in (go inside the mechanism)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S10_01 | 4:18.0 | TextStack | The fix is called salting. | Salt / a random string, unique to each user / stored next to the hash · not secret | lines rise 24 px and fade in on the word that names them |  |
| S10_02 | 4:20.1 | ↳ | Each password gets its own random string, mixed in before hashing. That string is the salt. |  |  |  |
| S10_03 | 4:26.8 | ↳ | It isn't secret. It's stored right next to the hash. Its job is to make the same password hash differently for every user. |  |  |  |
| S10_04 | 4:35.8 | SaltDiagram | Two people who both chose mango at one two three now get completely different fingerprints. | Asha: mango@123+9f2c4a71 · You: mango@123+e05b13d8 | each user row fades in; salted hash scrambles then locks |  |
| S10_05 | 4:42.0 | ↳ | As long as salts are long and random, a table built in advance stops working. It would need a separate table for every salt. |  |  |  |

## S11 — 3 · Slow it down · part 3 · 4:51.8
Transition in: **amber wipe (new part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S11_01 | 4:51.8 | ActTitle | But salt only stops the shortcut. It doesn't stop guessing. | Part three: Slow it down | title rises in, accent rule draws left to right | whoosh |
| S11_02 | 4:56.0 | FlowDiagram | An attacker with a leaked salt and hash can still try passwords one by one. Hash a guess with that salt, compare, repeat. | Guess → + salt → Hash → Compare | boxes and arrows build left to right, active box outlined |  |
| S11_03 | 5:04.8 | TextStack | Real people make that easier. In the RockYou leak, nearly half the passwords were names, dictionary words or simple patterns. | nearly half: names, words, slang, patterns / likely guesses first, the long tail later / and these hashes are fast to calculate | lines rise 24 px and fade in on the word that names them |  |
| S11_04 | 5:13.7 | ↳ | So attackers try the likely passwords first, and the long tail later. |  |  |  |
| S11_05 | 5:18.7 | ↳ | And the hashes we've seen so far are fast to calculate. |  |  |  |

## S12 — The GPU race · part 3 · 5:22.8
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S12_01 | 5:22.8 | TextStack | Take one gaming graphics card, an R T X forty ninety, running the cracking tool hashcat. | RTX 4090 + hashcat | lines rise 24 px and fade in on the word that names them |  |
| S12_02 | 5:29.7 | RaceBars | It tries about a hundred and sixty-four billion M D five guesses every second. | MD5 164.1 billion / s · SHA-1 50.6 billion / s · SHA-256 22.0 billion / s | bars grow left to right on a log scale, values fade in after each bar |  |
| S12_03 | 5:35.8 | ↳ | About fifty billion for SHA-1. About twenty-two billion for SHA-256. |  |  |  |
| S12_04 | 5:41.9 | StatGrid | Take every possible eight-character password made of lowercase letters and digits. That's about two point eight trillion of them. | 17 s MD5 · 56 s SHA-1 · ~2 min SHA-256 | figures rise in together |  |
| S12_05 | 5:50.5 | ↳ | With M D five, that card gets through all of them in about seventeen seconds. With SHA-1, under a minute. SHA-256, about two minutes. |  |  |  |

## S13 — Slow on purpose · part 3 · 6:01.3
Transition in: **push left (next link in the chain)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S13_01 | 6:01.3 | TextStack | So the real fix is to make each guess expensive. | Make each guess expensive / slow on purpose · tunable as hardware improves / bcrypt · 1999 | lines rise 24 px and fade in on the word that names them |  |
| S13_02 | 6:05.0 | ↳ | Password hashing functions are built to be slow on purpose, and the slowness can be turned up as hardware gets faster. |  |  |  |
| S13_03 | 6:13.0 | ↳ | bcrypt arrived in nineteen ninety-nine. |  |  |  |
| S13_04 | 6:15.9 | RaceBars | On the same card, bcrypt at a low setting manages about a hundred and eighty-four thousand guesses a second. That same set of passwords now takes about half a year. | bcrypt 184 thousand / s (cost 5) · scrypt 7,126 / s | bars grow left to right on a log scale, values fade in after each bar |  |
| S13_05 | 6:27.4 | ↳ | scrypt arrived in two thousand nine. It also makes each guess use a lot of memory, to blunt custom cracking hardware. |  |  |  |
| S13_06 | 6:36.2 | ↳ | At the tested setting, the card manages about seven thousand guesses a second. About twelve and a half years for the same set. |  |  |  |

## S14 — Argon2 · part 3 · 6:45.0
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S14_01 | 6:45.0 | TextStack | The OWASP guidance on password storage recommends Argon2id. It comes from Argon2, which won an open password hashing competition in twenty fifteen. | Argon2id / OWASP recommends · from Argon2, competition winner 2015 / minimum: 19 MiB memory · 2 passes · 1 lane | lines rise 24 px and fade in on the word that names them |  |
| S14_02 | 6:57.6 | ↳ | Its minimum setting uses about twenty megabytes of memory and two rounds of work for every single guess. |  |  |  |
| S14_03 | 7:04.8 | CodeCard | In a common library's format, the stored value carries its own recipe. One line holds the algorithm and its settings. Then the salt. Then the hash. | # algorithm + settings · salt · hash $argon2id$v=19$m=19456,t=2,p=1 $cE3JU6U6szy6uvAh96bkyw $Pr8MGyxkXWUs/ALFyQ4a+2IS3skjs84BpY4YSDhLGFM | lines type in one by one |  |
| S14_04 | 7:15.9 | ↳ | Because the settings travel with the hash, a site can raise the cost later. It re-hashes your password the next time you log in. |  |  |  |
| S14_05 | 7:24.7 | TextStack | Some sites add one more layer, called a pepper. It's a single secret kept outside the database, so a stolen table alone isn't enough to start guessing. | Pepper / one secret, kept outside the database | lines rise 24 px and fade in on the word that names them |  |
| S14_06 | 7:35.2 | TextStack | So picture the grocery app's table leaking today. Each row gives an attacker a salt and a slow fingerprint, and every guess costs real time. | a salt and a slow fingerprint per row / every guess costs real time | lines rise 24 px and fade in on the word that names them |  |

## S15 — 4 · Your side · part 4 · 7:46.2
Transition in: **amber wipe (new part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S15_01 | 7:46.2 | ActTitle | There's one moment the site does see your password. Every time you log in. | Part four: Your side | title rises in, accent rule draws left to right | whoosh |
| S15_02 | 7:51.1 | FlowDiagram | It arrives over an encrypted connection, then gets hashed and compared with the stored value. | Browser → Encrypted link → Server → Compare | boxes and arrows build left to right, active box outlined |  |
| S15_03 | 7:57.5 | TextStack | So if a site ever emails you the password you forgot, it can recover your password. That's the warning sign. | Emailed the password you forgot? / Then they can recover it. | lines rise 24 px and fade in on the word that names them |  |

## S16 — The rules changed · part 4 · 8:05.0
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S16_01 | 8:05.0 | TextStack | The current guidelines reflect all of this. | The current rules | lines rise 24 px and fade in on the word that names them |  |
| S16_02 | 8:08.0 | QuoteCard | The US standards body NIST now requires salted password hashing in its guidelines, and recommends the highest cost a site can practically handle. | "Passwords SHALL be salted and hashed using a suitable password hashing scheme." — NIST SP 800-63B-4 · §3.1.1.2 · July 2025 | quote rises in, key phrase in the accent colour |  |
| S16_03 | 8:19.1 | QuoteCard | Under these guidelines, sites must not force you to change your password on a schedule, like every ninety days. They must force a change if there's evidence it was compromised. | "Verifiers and CSPs SHALL NOT require subscribers to change passwords periodically." — NIST SP 800-63B-4 · §3.1.1.2 · July 2025 | quote rises in, key phrase in the accent colour |  |
| S16_04 | 8:31.0 | QuoteCard | Sites must not demand symbols and mixed case. They ask for length instead. At least fifteen characters, if the password is your only login factor. | "a minimum of 15 characters in length" — NIST SP 800-63B-4 · §3.1.1.2 · single-factor passwords | quote rises in, key phrase in the accent colour |  |
| S16_05 | 8:41.5 | QuoteCard | And sites must check new passwords against a blocklist of commonly used, expected or compromised passwords. | "SHALL compare the prospective secret against a blocklist that contains known commonly used, expected, or compromised passwords" — NIST SP 800-63B-4 · §3.1.1.2 · July 2025 | quote rises in, key phrase in the accent colour |  |

## S17 — Checking without telling · part 4 · 8:49.9
Transition in: **push left (next link in the chain)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S17_01 | 8:49.9 | KAnonymity | That last check can work without sending your password, or even its full hash. | mango@123 → SHA-1 f14d5… sent | five-character prefix slides from device panel to service panel |  |
| S17_02 | 8:55.2 | ↳ | Your browser or app hashes the password with SHA-1, and sends only the first five characters to the service Have I Been Pwned. |  |  |  |
| S17_03 | 9:04.5 | ↳ | The service returns the endings of matching leaked hashes in its database. Your device checks its own ending against that list. |  |  |  |

## S18 — Putting it together · part 4 · 9:13.8
Transition in: **fade 0.6 s (next step in the same part)**

| Beat | Time | Shot | Narration | On screen | Motion | Sound |
|---|---|---|---|---|---|---|
| S18_01 | 9:13.8 | TextStack | Put the whole chain together. Plain text leaks everything. Encryption leaks everything to whoever holds the key. | Plain text → leaks everything / Encryption → leaks to whoever holds the key / Plain hash → lookup table / Salted fast hash → graphics card / Salted slow hash → holds | lines rise 24 px and fade in on the word that names them |  |
| S18_02 | 9:21.3 | ↳ | A plain hash can fall to a lookup table. A salted fast hash can fall to a graphics card. A salted slow hash makes every guess expensive. |  |  |  |
| S18_03 | 9:31.6 | TextStack | Back to RockYou's most popular password. A sensible attacker tries the most common passwords first. So even behind Argon2, one two three four five six would be among the first guesses. | 123456 / among the first guesses on any list | lines rise 24 px and fade in on the word that names them |  |
| S18_04 | 9:45.5 | Checklist | So the site's job is to make guessing expensive. Your job is a long password you've used nowhere else, so a leak on one site can't be replayed on your other accounts. | Two jobs: The site: a slow, salted hash / You: a long password, used nowhere else / Use a password manager | items rise in, tick strokes draw |  |
| S18_05 | 9:57.3 | ↳ | Our advice: use a password manager. NIST now requires sites to allow them. |  |  |  |
| S18_06 | 10:03.3 | ↳ | What you can't see from a login screen is how a site stores your password. That half of the job is out of your hands. Your half isn't. |  |  |  |
| S18_07 | 10:12.3 | TextStack | And if a breach notice ever says passwords were salted and hashed with something slow, you'll know what that bought you. Time. | salted · hashed · slow / it bought you time | lines rise 24 px and fade in on the word that names them |  |

## Sound

- Music bed: procedural two-chord ambient pad, volume 0.1 under narration, 4 s fade in, 5 s fade out.
- SFX: whoosh on part titles, low hit on the RockYou number, soft ticks on table changes and lookup match.
