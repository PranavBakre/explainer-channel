# EP01 brief — Why websites don't store your password

## 1. Context
- **Question:** If a site gets hacked, why doesn't the attacker just read everyone's password — and when do they?
- **Viewer:** smart non-expert (uses apps daily, has heard "hashing", can't explain it). Indian and global.
- **Promise:** by the end you can tell a good site from a bad one by how it handles a breach, and you know the one habit that actually protects you.
- **Length:** 10 min (9:30–11:00). Template: **problem chain** (`docs/research/Script flow teardown.md`) — each storage method fixes the last one's failure and breaks somewhere new.

## 2. Packaging (decided before the script)
- Titles: **"Websites Don't Know Your Password"** (chosen) · "Why Hackers Can't Just Read Your Password" · "The Password Database Nobody Can Read".
- Thumbnail A: a database row, email visible, password column showing a long hash in amber; text **"THEY CAN'T READ IT"**. Thumbnail B: `123456` huge in red with "32 MILLION" stamp.
- Thumbnail adds the angle the title doesn't: A says even the company can't read it.

## 3. Source material
`factsheet.md` (VERIFIED lines only). Real artefacts shown on screen as typeset quotes with citation: NIST SP 800-63B clauses, OWASP Password Storage Cheat Sheet parameters, hashcat benchmark numbers, real SHA-256 outputs computed locally.

## 4. House style (channel style bible v1)
- **Palette:** ink `#0B0F14` background · panel `#141A22` · cream text `#F2EDE4` · slate `#6B7685` secondary · **amber `#FFB224` = the password / the thing at risk** · red `#FF5A4E` = exposed/broken · teal `#3DDC97` = safe/fixed. No other hues.
- **Type:** display serif *Instrument Serif* (titles, big numbers) · *Inter* 500/700 (labels, body) · *JetBrains Mono* (passwords, hashes, code). Passwords are always amber mono.
- **Grid:** faint 40 px dot grid on ink; content inside 90 % title-safe; nothing important in the bottom 15 %.
- **Material:** animated film grain (per-frame SVG turbulence, 6 % opacity) and a soft vignette — the texture of a dim terminal room, from the process, not a filter preset.

## 5. References (what to take / what to ignore)
1. **Veritasium (Analog Computing, Markov)** — take: problem → answer → new problem chain, callback ending. Ignore: on-camera host, sponsor placement.
2. **Kurzgesagt** — take: one consistent object carried through the video, flat shapes, colour meaning. Ignore: character illustration (we don't have an illustrator).
3. **3Blue1Brown** — take: math/text that builds on the word that names it, calm pacing. Ignore: Manim's default look.
4. **The B1M** — take: one headline number with a concrete comparison per beat. Ignore: drone footage.
5. **Fireship** — take: real code on screen, short. Ignore: meme pace and 200+ wpm.
Shared principle: **one object, transformed step by step, on a dark calm field, with text that arrives exactly when spoken.**

## 6. What did not work / avoid
Stock "hacker in a hoodie", green Matrix rain, padlock clip-art, glowing circuit boards, random stock footage, AI-generated images containing text, spinning 3D globes, bouncy easing, emoji, more than one accent colour per frame.

## 7. Material rules
Grain and vignette on every frame. Hash strings render as real monospaced text that can be read when paused. Tables look like a real database client (header row, row numbers, column dividers).

## 8. Motion language
- Enter: fade + 24 px rise, `easeOutCubic`, 15 frames. Exit: fade 9 frames.
- Build-on-word: a diagram piece appears at the start of the VO line that names it.
- Hash "scramble": characters cycle through random hex for 12 frames, then lock left-to-right.
- Transitions: `cut` within a scene; `fade` between scenes in one act; `wipe` (amber line sweeps) at act boundaries; `zoom` when going inside a mechanism.

## 9. Shot types (applications)
Cold-open number · act title card · database table · hash machine · encryption key diagram · lookup/rainbow table · speed race (log bars) · time-to-crack counter · login flow diagram · standards quote card · code card · recap checklist · end card · thumbnail.

## 10. Colour script
- Act 1 (plaintext, encryption): red dominates — everything exposed.
- Act 2 (hashing, salting): amber + slate — hidden but crackable.
- Act 3 (speed, slow hashes): red returns in the GPU race, then teal takes over.
- Act 4 (what you do): teal + cream — calm.

## 11. Sound
Kokoro `af_heart`, 150–160 wpm. Procedural low ambient pad at −24 dB under VO, swelling at act titles. SFX: soft tick on table-row reveals and hash locks; low hit on the cold-open number. ≤ 1 SFX per 10 s.

## 12. Checks
`script-review` before storyboard; `video-qa` after render; `package-review` before upload.
