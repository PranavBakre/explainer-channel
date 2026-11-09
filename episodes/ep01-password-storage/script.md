# EP01 — Websites Don't Know Your Password

Template: problem chain (each fix breaks somewhere new). Target 10:00 at ~155 wpm.
Running scenario: you sign up for a grocery app with the password `mango@123`.
Fact tags `[F#]` refer to `factsheet.md`; they are stripped before TTS. Narration is written as spoken ("SHA two fifty-six", "at the rate"); `voice/written.json` maps it back for captions.
Revision 5 — narrows the S02 benchmark scope per `reviews/script-r4-codex.md`. Revision 4 addressed `reviews/script-r3-codex.md` remaining fact issues and the r1 DeepSeek proofread. Revision 3 addressed `reviews/script-r2-codex.md` blocking corrections. Revision 2 addressed `reviews/script-r1-codex.md` (accuracy, hook, stacked questions, absolutes) and `reviews/script-r1-deepseek-proofread.md`.

| Scene | Beat | Job |
|---|---|---|
| S01–S02 | Cold open | Surprise in 15 s, the question, RockYou as the cost of doing it wrong |
| S03–S05 | Part one: keep it / encrypt it | Naive way, first fix, where it breaks (Adobe) |
| S06–S10 | Part two: fingerprint it / salt it | One-way fix, login check, LinkedIn break, salt fix |
| S11–S14 | Part three: slow it down | Guessing, GPU race, slow hashes, the grocery table today |
| S15–S18 | Part four: your side | What the site still sees, rules that changed, HIBP, two jobs + honest limit |

---

## S01 — Cold open: the surprise
A well-run website does not keep a readable copy of your password.
So when you log in, what is it checking against?
Somewhere there's a row with your email on it. Next to it sits something nobody at the company can read back.
A badly run website does keep the password.
> on-screen: a database row — email, then a password column that changes from "?" to unreadable to plain

## S02 — Cold open: RockYou
In December two thousand nine, a company called Rock You was hacked. [F1]
About thirty-two million passwords leaked, and they were stored as plain, readable text. [F1][F2]
The most common password was one two three four five six. Almost three hundred thousand accounts used it. [F3]
Other sites did protect their passwords. But one modern graphics card can try every eight-character password of lowercase letters and digits, in some of those formats, in under a minute. [F23][F24]
> on-screen: 32,603,388 (reported count) · "123456" × 290,731

## S03 — Part one: store it as typed
Let's say you sign up for a new grocery app. Your password is mango at the rate one two three.
The simplest thing the app can do is save it as it is. One column for your email, one for your password.
It works. You log in. The app compares what you typed with what it saved, and lets you in.
It also means anyone who copies that table walks away with every password in it. That was Rock You.
And attackers try leaked passwords on other sites. If you reused yours, one leak can open those accounts too. [F44]
> on-screen: plaintext table, password column in amber

## S04 — Part one: encrypt it
The obvious fix is to lock the column. Encrypt each password with a secret key.
Now the table shows scrambled text instead of mango at the rate one two three.
But encryption is built to be undone. Whoever holds the key can turn every row back into the original. [F11]
> on-screen: plain ↔ cipher with one key; "decrypt" arrow appears in red

## S05 — Part one: Adobe
In twenty thirteen, Adobe was breached. [F6]
Its passwords were encrypted, not hashed, with a cipher called Triple D E S. [F6]
Australia's privacy regulator later found that Adobe used a single encryption key for all of them. [F7]
About a hundred and nine million records also had a password hint, stored in plain text. [F7][F10]
Adobe said about thirty-eight million active users were hit. The leaked file had about a hundred and fifty-three million records. [F9]
A hint like "my dog's name" gives a guesser a head start.
So encryption solved the wrong problem. The site never needed to read your password back. It only needs to check it.
> on-screen: Adobe 2013 · Triple DES · one key · ~109M plain-text hints · ~38M active users / ~153M records

## S06 — Part two: the one-way idea
Checking without reading back is what a cryptographic hash does.
It turns any text into a fingerprint of fixed length. [F12][F40]
Feed it mango at the rate one two three, and SHA two fifty-six gives back sixty-four characters, a jumble of digits and letters. It looks like noise. [F40][F43]
And there's no practical way to run it backwards. An attacker can still guess, hash the guess, and compare. [F12]
> on-screen: mango@123 → SHA-256 → 81c68634…efff1

## S07 — Part two: the avalanche
Change one character, and the fingerprint changes all over.
Hunter two and hunter three differ by a single digit. The differences are scattered across the whole fingerprint.
In this pair, one hundred and forty-six of the two hundred and fifty-six bits flipped. [F14][F15]
So a near miss doesn't look like a near miss.
> on-screen: hunter2 / hunter3 hashes; "146 of 256 bits changed"

## S08 — Part two: how login works now
So the app stores the fingerprint instead of the password.
When you log in, it hashes what you just typed, and compares the two fingerprints. [F45]
They match, so the app lets you in.
If that table leaks, the attacker gets fingerprints, not passwords. That sounds airtight. LinkedIn found out it wasn't.
> on-screen: typed → hash → compare with stored → ✓

## S09 — Part two: LinkedIn and lookup tables
In twenty twelve, a file of about six and a half million LinkedIn password hashes was posted online. [F16]
They were SHA one hashes, with nothing added. Unsalted. [F16]
That matters because the same password always produces the same fingerprint.
Attackers don't need to reverse anything. They hash millions of common passwords once, ahead of time, and keep the results in a lookup table. [F19][F43]
Then they just search. If your fingerprint is in their table, your password is the row next to it.
Four years later, LinkedIn said it believed the breach was far bigger: a hundred and seventeen million emails and passwords. [F17]
> on-screen: lookup table scan → match on a SHA-1 hash; 6,458,020 (2012) → 117M (2016)

## S10 — Part two: salt
The fix is called salting.
Each password gets its own random string, mixed in before hashing. That string is the salt. [F20]
It isn't secret. It's stored right next to the hash. Its job is to make the same password hash differently for every user. [F20][F21]
Two people who both chose mango at the rate one two three now get completely different fingerprints. [F43]
As long as salts are long and random, a table built in advance stops working. It would need a separate table for every salt. [F21][F22]
> on-screen: two users, same password, different salts, different hashes

## S11 — Part three: guessing one at a time
But salt only stops the shortcut. It doesn't stop guessing.
An attacker with a leaked salt and hash can still try passwords one by one. Hash a guess with that salt, compare, repeat.
Real people make that easier. In the Rock You leak, nearly half the passwords were names, dictionary words or simple patterns. [F4]
So attackers try the likely passwords first, and the long tail later.
And the hashes we've seen so far are fast to calculate.
> on-screen: guess loop; "nearly 50%: names, words, slang, patterns"

## S12 — Part three: the GPU race
Take one gaming graphics card, an R T X forty ninety, running the cracking tool hash cat. [F23]
It tries about a hundred and sixty-four billion M D five guesses every second. [F23]
About fifty billion for SHA one. About twenty-two billion for SHA two fifty-six. [F23]
Take every possible eight-character password made of lowercase letters and digits. That's about two point eight trillion of them. [F24]
With M D five, that card gets through all of them in about seventeen seconds. With SHA one, under a minute. SHA two fifty-six, about two minutes. [F24]
> on-screen: log-scale bars MD5 / SHA-1 / SHA-256; StatGrid 17 s · 56 s · ~2 min

## S13 — Part three: slow on purpose
So the real fix is to make each guess expensive.
Password hashing functions are built to be slow on purpose, and the slowness can be turned up as hardware gets faster. [F25][F38]
B crypt arrived in nineteen ninety-nine. [F25]
On the same card, B crypt at a low setting manages about a hundred and eighty-four thousand guesses a second. That same set of passwords now takes about half a year. [F23][F24]
S crypt arrived in two thousand nine. It also makes each guess use a lot of memory, to blunt custom cracking hardware. [F25][F39]
At the tested setting, the card manages about seven thousand guesses a second. About twelve and a half years for the same set. [F23][F24]
> on-screen: bars add bcrypt and scrypt in teal; caption ~177 days · ~12.5 years

## S14 — Part three: what good sites run today
The Oh wasp guidance on password storage recommends Argon two I D. It comes from Argon two, which won an open password hashing competition in twenty fifteen. [F25][F26]
Its minimum setting uses about twenty megabytes of memory and two rounds of work for every single guess. [F26]
In a common library's format, the stored value carries its own recipe. One line holds the algorithm and its settings. Then the salt. Then the hash. [F42]
Because the settings travel with the hash, a site can raise the cost later. It re-hashes your password the next time you log in. [F38]
Some sites add one more layer, called a pepper. It's a single secret kept outside the database, so a stolen table alone isn't enough to start guessing. [F32]
So picture the grocery app's table leaking today. Each row gives an attacker a salt and a slow fingerprint, and every guess costs real time.
> on-screen: Argon2id · 19 MiB · t=2 · p=1; code card with the full F42 string split into its fields: settings, salt, hash

## S15 — Part four: what the site still sees
There's one moment the site does see your password. Every time you log in. [F36]
It arrives over an encrypted connection, then gets hashed and compared with the stored value. [F36][F45]
So if a site ever emails you the password you forgot, it can recover your password. That's the warning sign.
> on-screen: flow — browser → TLS → server → Argon2id + salt → compare

## S16 — Part four: the rules changed
The current guidelines reflect all of this.
The U S standards body Nist now requires salted password hashing in its guidelines, and recommends the highest cost a site can practically handle. [F27]
Under these guidelines, sites must not force you to change your password on a schedule, like every ninety days. They must force a change if there's evidence it was compromised. [F29]
Sites must not demand symbols and mixed case. They ask for length instead. At least fifteen characters, if the password is your only login factor. [F30]
And sites must check new passwords against a blocklist of commonly used, expected or compromised passwords. [F28]
> on-screen: NIST SP 800-63B-4 quote cards

## S17 — Part four: checking without telling
That last check can work without sending your password, or even its full hash.
Your browser or app hashes the password with SHA one, and sends only the first five characters to the service Have I Been Poned. [F33]
The service returns the endings of matching leaked hashes in its database. Your device checks its own ending against that list. [F33]
> on-screen: SHA-1 of mango@123, first five chars "f14d5" sent, the rest stays local

## S18 — Part four: two jobs and one honest limit
Put the whole chain together. Plain text leaks everything. Encryption leaks everything to whoever holds the key.
A plain hash can fall to a lookup table. A salted fast hash can fall to a graphics card. A salted slow hash makes every guess expensive.
Back to the most popular password in the Rock You leak. A sensible attacker tries the most common passwords first. So even behind Argon two, one two three four five six would be among the first guesses. [F3]
So the site's job is to make guessing expensive. Your job is a long password you've used nowhere else, so a leak on one site can't be replayed on your other accounts. [F44]
Our advice: use a password manager. Nist now requires sites to allow them. [F41]
What you can't see from a login screen is how a site stores your password. That half of the job is out of your hands. Your half isn't.
And if a breach notice ever says passwords were salted and hashed with something slow, you'll know what that bought you. Time.
> on-screen: chain recap · checklist — site: slow, salted hash · you: long, unique · password manager · end card
