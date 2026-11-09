# Shot list v3 — one built world, every 3D shot earns its place

Rule, from the reference (Veritasium, 8HBDE-msUjw): 3D is used where a physical object *is* the mechanism, so the
viewer sees the idea work. Each object stands for one real part of the system and keeps that meaning all episode,
and everything printed on it is real data (real hashes, real ciphertext, real counts). Numbers go on the math board,
evidence (news, regulators, NIST) goes on screen as the actual document. Nothing from v2 survives.

## The props (one meaning each, all episode)

| Prop | Stands for | Its state is always true to |
|---|---|---|
| Card drawer | the app's `users` table | the password column: plain / Triple DES / hash / salt+hash / Argon2id string |
| Index card | one row | real values (`81c68634…`, `f14d5ba7…`, `Y5DCWKxs…` = 3DES of mango@123 under a demo key) |
| Lockbox + key | encryption | one key per site; opening reveals the real plaintext |
| Hash machine | the hash function | punched card holes = the real 256 (or 160) bits |
| Light table | the compare step at login | overlaying the two real bit patterns |
| Salt chip | the salt | real 8-hex salts `9f2c4a71`, `e05b13d8`; real salted hashes `fb9d0556…`, `324ce3f9…` |
| Lookup wall | a precomputed table | drawers labelled by real SHA-1 prefixes, the password inside |
| Card heap | how often a password is reused | heap size proportional to the count |
| Graphics card | the attacker's hardware | guess rate from the hashcat 4090 benchmark |
| Gears + dial | a slow, tunable hash | dial = cost setting |
| Phone | you, at sign-up / login | — |

## Shots (beat → mode → what moves → why 3D)

| Beat | Line (short) | Mode | Action | Why this mode |
|---|---|---|---|---|
| S01.1 | no readable copy | 3D drawer | your card rises, password field reads `?` | introduces the table as a thing |
| S01.2 | what is it checking against | 3D drawer | push in on `?` | — |
| S01.3 | something nobody can read | 3D drawer | field becomes the real Argon2id string | the answer, shown on the row itself |
| S01.4 | badly run site keeps it | 3D drawer | field flips to amber `mango@123` | contrast on the same row |
| S02.1 | RockYou hacked | doc | news screenshot | evidence |
| S02.2 | 32M plain text | math | 32,603,388 | a number |
| S02.3 | 123456 × ~290k | 3D heap | heap of `123456` cards beside a single card | reuse as physical mass |
| S02.4 | GPU, under a minute | 3D GPU | card blurs guesses through | sets up part 3's antagonist |
| S03.1 | sign up, mango@123 | 3D phone | typing the password | where it comes from |
| S03.2 | save it as is | 3D drawer | card filed with plain password | store = file the card |
| S03.3 | compares, lets you in | 3D light table | typed card over stored card, match | compare = overlay, used every login after |
| S03.4 | anyone who copies it | 3D drawer | copy slides away with every card readable | theft = a copy leaving |
| S03.5 | reused on other sites | 3D | stolen card opens two other sites' drawers | reuse shown as replay |
| S04.1 | encrypt with a key | 3D lockbox | card locked in, real ciphertext on lid | encryption = lock |
| S04.2 | table shows scrambled text | 3D drawer | fields read the real 3DES strings | same table, new state |
| S04.3 | key holder undoes it | 3D lockbox | key in, card rises | reversibility is the point |
| S05.1 | Adobe 2013 | doc | Krebs screenshot | evidence |
| S05.2 | Triple DES | 3D lockbox | close on the "TRIPLE DES" stamp | — |
| S05.3 | one key for all | 3D lockbox wall | one key opens every box, real passwords rise | the regulator's finding, physically |
| S05.4 | 109M plain hints | doc | OAIC report crop | evidence |
| S05.5 | 38M / 153M | math | two numbers | numbers |
| S05.6 | "my dog's name" | 3D lockbox wall | hint tags on locked boxes | hints sit outside the lock |
| S05.7 | only needs to check | 3D light table | two cards overlay without opening anything | foreshadows hashing |
| S06.1 | a hash does that | 3D machine | reveal | — |
| S06.2 | fixed length | 3D machine | `a`, `mango@123`, a sentence → three identical-size cards | fixed length you can see |
| S06.3 | 64 characters | 3D machine | punch; holes = real bits; hex tag | the real output |
| S06.4 | no way back; guess and compare | 3D machine | card pushed back in → red lamp, then a guess fed | one-way, then the attack |
| S07.1–4 | avalanche | 3D light table | hunter2/hunter3 → overlay → 146 red holes → top view | real bit diff |
| S08.1 | stores the fingerprint | 3D drawer | field = `81c68634…` | — |
| S08.2 | hashes what you typed | 3D machine | typed card in, card out | — |
| S08.3 | they match | 3D light table | match, green | same instrument as S03.3 |
| S08.4 | table leaks, LinkedIn | 3D drawer | copy slides away, fields are hashes | — |
| S09.1 | LinkedIn 2012 | doc | screenshot | evidence |
| S09.2 | SHA-1, unsalted | 3D drawer | close on `f14d5ba7…` | the real leaked format |
| S09.3 | same password, same print | 3D machine | mango fed twice → two identical cards | determinism |
| S09.4 | hash once, in advance | 3D lookup wall | machine output filed into hash-labelled drawers | precomputation |
| S09.5 | just search | 3D lookup wall | `f14d5ba7` drawer opens, `mango@123` rises | lookup, not reversal |
| S09.6 | 117M in 2016 | doc + math | LinkedIn 2016 crop, 6.5M → 117M | evidence |
| S10.1 | salting | 3D machine | salt chip clipped to the card | — |
| S10.2 | mixed in before hashing | 3D machine | card + chip fed together | order of operations |
| S10.3 | stored next to the hash | 3D drawer | field = `e05b13d8 · 324ce3f9…` | not secret |
| S10.4 | same password, different prints | 3D light table | `fb9d0556` vs `324ce3f9` overlay, mostly red | real diff |
| S10.5 | a table per salt | 3D lookup wall | search finds nothing; wall multiplies | why salt defeats it |
| S11.1 | salt doesn't stop guessing | 3D machine | salt chip fixed, guesses fed | — |
| S11.2 | hash, compare, repeat | 3D machine + light table | loop | the attack loop |
| S11.3 | nearly half names/words | math | RockYou category share | a number |
| S11.4 | likely first | 3D heap | heaps by count, tallest first into the slot | order of guessing |
| S11.5 | fast to calculate | 3D machine | loop at full speed | — |
| S12.1 | RTX 4090 + hashcat | 3D GPU | card on its bench, fans spin | — |
| S12.2–5 | rates, 2.8T, 17s/56s/2min | math | 36⁸ = 2,821,109,907,456 ÷ rate | arithmetic |
| S13.1 | make each guess expensive | 3D machine | gears appear | slowness as mechanism |
| S13.2 | turn it up | 3D machine | cost dial turns, gears slow | tunable cost |
| S13.3 | bcrypt 1999 | 3D machine | plate reads BCRYPT | — |
| S13.4 | 184k/s, half a year | math | — | numbers |
| S13.5 | scrypt: memory | 3D machine | memory drawers must fill per guess | memory-hard, visible |
| S13.6 | 7k/s, 12.5 years | math | — | numbers |
| S14.1 | OWASP recommends Argon2id | doc | OWASP crop | evidence |
| S14.2 | 19 MiB, 2 rounds | 3D machine | memory gauge 19 MiB, counter t=2 | the settings, physical |
| S14.3 | value carries its recipe | 3D drawer | close on the real string, fields light up in turn | the format |
| S14.4 | raise cost, rehash at login | 3D machine | dial up, card re-filed | — |
| S14.5 | pepper outside the DB | 3D drawer | copy slides away, a small safe stays behind | not in the stolen copy |
| S14.6 | leaks today: time per guess | 3D machine | slow gears, one guess | — |
| S15.1 | site sees it every login | 3D phone | typing | — |
| S15.2 | encrypted connection, hashed | 3D phone → machine → light table | card travels a sealed tube | the full path |
| S15.3 | emails you your password | 3D phone | email shows `mango@123` in red | warning sign |
| S16.1–5 | NIST rules | doc | NIST SP 800-63B-4 crops | the rule is the document |
| S17.1 | check without sending it | 3D phone | — | — |
| S17.2 | SHA-1, first five sent | 3D machine | SHA-1 card torn: `F14D5` into an envelope | prefix split, physical |
| S17.3 | endings returned, matched locally | 3D phone | real HIBP range list for F14D5, own ending found | real k-anonymity response |
| S18.1–2 | the chain | 3D recap | camera tracks along the props built so far | recap of what was built |
| S18.3 | 123456 still first | 3D heap + machine | 123456 card goes in first even with Argon2 | honest limit |
| S18.4–5 | your job; password manager | 3D phone | manager fills a long unique password | — |
| S18.6–7 | can't see it; Time | 3D drawer | drawer closes, light dims | end |
