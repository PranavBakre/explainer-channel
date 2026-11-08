# EP01 — Websites Don't Know Your Password

Template: problem chain (each fix breaks somewhere new). Target 10:00 at ~155 wpm.
Running scenario: you sign up for a grocery app with the password `mango@123`.
Fact tags `[F#]` refer to `factsheet.md`; they are stripped before TTS.

| Scene | Beat | Job | Budget |
|---|---|---|---|
| S01–S02 | Cold open | Misconception + RockYou number + the question | 0:00–0:50 |
| S03–S05 | Act 1: store it / encrypt it | Naive way, first fix, where it breaks (Adobe) | 0:50–2:50 |
| S06–S10 | Act 2: hash it / salt it | One-way fix, login check, LinkedIn break, salt fix | 2:50–5:40 |
| S11–S14 | Act 3: speed | GPU race, slow hashes, what modern sites run | 5:40–8:10 |
| S15–S18 | Act 4: what it means for you | Login reality, rules that changed, the one habit, callback | 8:10–10:00 |

---

## S01 — Cold open: the misconception
Somewhere, on a server you will never see, there is a row with your email on it.
Most people assume the password sits right next to it. Typed out, exactly as you typed it.
On a well-run website, it doesn't. Even the company can't read it.
On a badly run one, it does. And we know what happens next.
> on-screen: a database row — email, then a password column

## S02 — Cold open: RockYou
In December two thousand nine, a company called RockYou was hacked. [F1]
Thirty-two million passwords leaked, and every one of them was stored as plain, readable text. [F1][F2]
The most common one was one two three four five six. Almost three hundred thousand accounts used it. [F3]
So if a site is not supposed to keep your password, what does it keep instead?
And why do some of those "protected" passwords still fall in under a minute?
> on-screen: 32,603,388 · "123456" × 290,731

## S03 — Act 1: store it as typed
Let's say you sign up for a new grocery app. Your password is mango at one two three.
The simplest thing the app can do is save it as it is. One column for your email, one for your password.
It works. You log in, the app compares what you typed with what it saved, and lets you in.
It also means anyone who gets a copy of that table gets every password in it. That was RockYou.
And since people reuse passwords, one leak opens their email, their bank, their everything else.
> on-screen: plaintext table, password column in amber

## S04 — Act 1: encrypt it
The obvious fix is to lock the column. Encrypt each password with a secret key.
Now the table shows scrambled text instead of mango at one two three.
But encryption is built to be undone. Whoever holds the key turns every row back into the original.
> on-screen: plain ↔ cipher with one key; "decrypt" arrow appears in red

## S05 — Act 1: Adobe
In twenty thirteen, Adobe was breached. [F6]
Its passwords were encrypted, not hashed, with an old cipher called Triple D E S. [F6]
Australia's privacy regulator later found that Adobe used a single encryption key for all of them. [F7]
And right next to each password sat the user's password hint, in plain text. [F7][F10]
Adobe said thirty-eight million active users were hit. The leaked file had about a hundred and fifty-three million records. [F9]
A hint like "my dog's name" next to a scrambled password is not much of a lock.
So encryption fixed the wrong problem. The site never needed to read your password back. It only needs to check it.
> on-screen: Adobe 2013 · Triple DES · one key · hints in plain text · 38M active users / ~153M records

## S06 — Act 2: the one-way idea
Checking without reading back is exactly what a hash does.
A hash function takes any text and turns it into a fixed-length fingerprint. [F12][F13]
Feed it mango at one two three, and SHA-256 gives back sixty-four characters of what looks like noise.
The key property is that it only runs one way. You can't take the fingerprint and work back to the password. [F12]
> on-screen: mango@123 → SHA-256 → 81c68634…efff1

## S07 — Act 2: the avalanche
Change one character and the whole fingerprint changes.
Hunter two and hunter three differ by a single digit. Their SHA-256 fingerprints share almost nothing.
In this pair, one hundred and forty-six of the two hundred and fifty-six bits flipped. [F14][F15]
So the fingerprint gives away nothing about how close a guess was.
> on-screen: hunter2 / hunter3 hashes; "146 of 256 bits changed"

## S08 — Act 2: how login works now
So the app stores the fingerprint instead of the password.
When you log in, it hashes what you just typed, and compares the two fingerprints.
Same fingerprint, same password. You're in.
And if that table leaks, the attacker gets fingerprints, not passwords.
> on-screen: typed → hash → compare with stored → ✓

## S09 — Act 2: LinkedIn and lookup tables
That's roughly where LinkedIn was in twenty twelve.
A file of about six and a half million LinkedIn password hashes was posted online. [F16]
They were SHA-1 hashes, with nothing added. Unsalted. [F16]
That matters because the same password always produces the same fingerprint.
Attackers don't need to reverse anything. They hash millions of common passwords once, ahead of time, and keep the results in a lookup table. [F19]
Then they just search. If your fingerprint is in their table, your password is the row next to it.
Four years later, LinkedIn said the breach was far bigger: a hundred and seventeen million emails and passwords. [F17]
> on-screen: lookup table scan → match on a SHA-1 hash; 6,458,020 (2012) → 117M (2016)

## S10 — Act 2: salt
The fix is called a salt.
A salt is a random string the site generates for each user, and mixes into the password before hashing. [F20]
It isn't secret. It's stored right next to the hash. Its job is to make every fingerprint unique. [F20][F21]
Two people who both chose mango at one two three now get completely different fingerprints.
A lookup table built in advance is useless, because it would need a separate table for every salt. [F21]
> on-screen: two users, same password, different salts, different hashes

## S11 — Act 3: guessing one at a time
But salt only stops the shortcut. It doesn't stop guessing.
An attacker with a leaked salt and hash can still try passwords one by one: hash a guess with that salt, compare, repeat.
Real people make that easier. They don't pick random strings. They pick words, names and years, and the same favourites as everyone else. [F4]
So attackers try the likely passwords first, and the long tail later.
And the hashes we've seen so far were designed to be fast. That was the point of them.
> on-screen: guess loop counter

## S12 — Act 3: the GPU race
Take one gaming graphics card, an R T X forty ninety, running the cracking tool hashcat. [F23]
It tries about a hundred and sixty-four billion M D five guesses every second. [F23]
About fifty billion for SHA-1. About twenty-two billion for SHA-256. [F23]
Take every possible eight-character password made of lowercase letters and digits. That's about two point eight trillion of them. [F24]
With M D five, that card gets through all of them in seventeen seconds. With SHA-1, under a minute. SHA-256, about two minutes. [F24]
> on-screen: log-scale bars MD5 / SHA-1 / SHA-256; StatGrid 17 s · 56 s · ~2 min

## S13 — Act 3: slow on purpose
So the real fix is to make each guess expensive.
Password hashing functions are built to be slow on purpose, and you can turn the slowness up as hardware gets faster. [F25]
bcrypt came first, in nineteen ninety-nine. [F25]
On the same card, bcrypt at a low setting manages about a hundred and eighty-four thousand guesses a second. That same set of passwords now takes about half a year. [F23][F24]
scrypt, from two thousand nine, also forces each guess to use a lot of memory, which graphics cards are short of. [F25]
At its benchmark setting, that drops to about seven thousand guesses a second. Twelve and a half years for the same set. [F23][F24]
> on-screen: bars add bcrypt and scrypt in teal; StatGrid ~177 days · ~12.5 years

## S14 — Act 3: what good sites run today
The current favourite is Argon2, which won an open password hashing competition in twenty fifteen. [F25]
The security group OWASP recommends Argon2id with at least nineteen mebibytes of memory and two passes per hash. [F26]
And the stored value carries its own recipe. The algorithm, the settings, the salt, and the hash, all in one line.
Because the settings travel with the hash, a site can raise the cost as hardware gets faster, and re-hash your password the next time you log in. [F38]
Some sites add one more layer, called a pepper. It's a single secret kept outside the database, so a stolen table alone isn't enough to start guessing. [F32]
That's what a good site keeps for you. Not your password. A slow, salted fingerprint of it.
> on-screen: code card with the real `$argon2id$v=19$m=19456,t=2,p=1$…` string, fields labelled

## S15 — Act 4: what the site still sees
The site does see your password, for a moment, every time you log in. [F36]
It arrives over an encrypted connection, gets hashed, gets compared, and is thrown away. [F36]
So if a site ever emails you your old password, it kept something it could read. That tells you how it stores everything else.
> on-screen: flow — browser → TLS → server → Argon2id → compare → ✓

## S16 — Act 4: the rules changed
This also explains some rules that changed recently.
The US standards body NIST now says sites must salt and hash passwords with a deliberately costly scheme. [F27]
It says sites should not force you to change your password every ninety days, unless there's evidence it was compromised. [F29]
It drops the demands for symbols and mixed case, and asks for length instead. Fifteen characters, if the password is your only login factor. [F30]
And it says sites must check new passwords against lists of common and breached ones. [F28]
> on-screen: NIST SP 800-63B-4 quote cards

## S17 — Act 4: checking without telling
That last check can be done without anyone learning your password.
The service Have I Been Pwned takes the SHA-1 hash of the password you want to test, and sends only its first five characters. [F33]
It gets back every leaked hash that starts the same way, and the matching happens on your own device. [F33]
> on-screen: SHA-1 of mango@123, first five chars "f14d5" sent, the rest stays local

## S18 — Act 4: callback and the one habit
Put the whole chain together. Plain text leaks everything. Encryption leaks everything to whoever holds the key.
A plain hash falls to a lookup table. A salted fast hash falls to a graphics card. A salted slow hash is what holds.
Back to RockYou's most popular password. Even behind Argon2, one two three four five six would fall almost instantly.
Slow hashing makes each guess expensive. It can't help a password that is the first guess on every list.
So the site's job is a slow, salted hash. Your job is a long password you've used nowhere else.
A password manager makes that one habit easy.
Then, when some site does get breached, the attacker gets a fingerprint that is slow to crack, and useless everywhere else.
> on-screen: checklist — site: salted slow hash · you: long, unique · end card
