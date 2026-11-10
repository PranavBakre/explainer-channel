# Segment A notes (S01, S02, S03) — ep01 "How sites store your password"

Files: `episodes/ep01-password-storage/segments/A.json`, `video/src/segments/segA/HeapSet.tsx`,
`video/src/segments/segA.ts`, `tools/lottie/s03_reuse.py` → `video/public/assets/lottie/s03-reuse.json`.

## S01 — Cold open: the row (4 beats, one shot)

| Beat | Mode | On screen | Data |
|---|---|---|---|
| S01_01 | 3D set (`CatalogSet`, action `row`, angle `wide`) | Card drawer (the app's `users` table) with six index-card rows; your card rises out of it; every password field reads `?` | emails + `?` |
| S01_02 | same shot | camera pushes in on your card, `?` fills the frame | — |
| S01_03 | same shot | your row's password field becomes `$argon2id$v=19$m=19456,t=2,p=1$cE3JU6U6s…` | factsheet F42 (real Argon2id hash of `mango@123` at OWASP's minimum settings) |
| S01_04 | same shot | field flips to amber `mango@123`; the row behind reads `football` | script's running password; USERS list in `CatalogSet` |

Why 3D: the drawer *is* the users table (shotlist v3 prop table), and the change happens on the row itself.
Additive changes to `CatalogSet`: `argon` field state, `states` + `steps` (per-beat field and camera keyframes, each state
owns a slow move to its `posTo`/`targetTo` framing), `rise` (card lift), `tag.atStep`, `copyTo`, `copyOpacity`.
`Studio` gained an optional `look` (pos + target) so a beat can own the camera. Existing prop paths render as before.

## S02 — Cold open: RockYou (3 shots, 4 beats)

| Beat | Mode | On screen | Data |
|---|---|---|---|
| S02_01 | DocShot `shots/rockyou.png` | TechCrunch page, slow push | source label "TechCrunch, 14 Dec 2009" |
| S02_02 | DocShot crop `shots/rockyou-quote.png` | the article's own words: "32,603,388 to be exact" and the highlighted "The database included a full list of unprotected plain text passwords." | F2 |
| S02_03 | 3D set (`HeapSet`) | a heap of 291 index cards each reading `123456` beside one standing card; labels "290,731 accounts" / "1 account" | F3 count 290,731 (heap is a proportion, no per-card scale printed) |
| S02_04 | FootageShot `footage/gpu-rtx-rgb-fans.mp4` (CC BY 3.0, INVADER PC, credits.json) at 0.68× | GEFORCE RTX card in a lit case, slow push, scrimmed tags: "one modern graphics card" → "every 8-character a–z 0–9 password" → "2,821,109,907,456 guesses" | F23 benchmark GPU family; F24 computed 36^8 |

Why footage: shotlist v3 keeps the 3D GPU for part three (S12); the cold open only needs real hardware, so licensed
footage of an actual RTX card is honest and cheaper. `FootageShot` gained an optional `scrim` (top gradient) so cream
tags stay legible over RGB-lit footage.

## S03 — Part one: keep it (3 shots, 5 beats)

| Beat | Mode | On screen | Data |
|---|---|---|---|
| S03_01–03 | LottieShot `s03-signup` (operator's `tools/lottie/s03_signup.py`, beats at 0/188/413) | sign up typing `mango@123`, the users table appears above the server with the password column plain, then a login compares typed vs saved and ticks | real plaintext rows |
| S03_04 | 3D set (`CatalogSet`, action `copy`) | the drawer and its copy side by side, both rows readable, the copy slides out; tag "the copy holds every password" | same rows |
| S03_05 | LottieShot `s03-reuse` (new, `tools/lottie/s03_reuse.py`) | one "stolen from the grocery app" card (`you@mail.com / mango@123`); a dashed arrow to the laptop form, a pill rides it, tick "signed in"; a second arrow to a drawn login form, the pair fills it, tick "signed in" | the same pair, replayed on two other sites |

`s03_reuse.py` re-uses `lot.py` (`laptop_scene`, `pill`, `connection`, `server`-style palette) and keyframes to the shot's
single beat (frame 0 of 246).

## Checks run

- `cd video && bunx tsc --noEmit` — passes.
- Per-shot alignment (`tools/review/align.py`, final segment render):
  `tools/review/checks/s03-reuse.json` at frame 2550 → 3/3 pass (laptop password field dx −6 dy 0; second-site email
  dx +3 dy +2; second-site password dx +4 dy +5). `tools/review/checks/s03.json` (operator's) on the sign-up shot →
  email/password fields, users table and both compare chips pass on the gallery render.
- S01's card values are not pills, so they were measured directly: the value ink sits 64–67 px inside the card's left
  edge and ~92 px inside its right edge at both states, no clipping; the value baseline now sits above the ruled line
  like the email row above it.
- Second model (`tools/review/second-look.sh`), four rounds on full-size frames of every shot. Fixed from its findings:
  heap label off the pile's centre and a per-card scale that contradicted the lone "1 account" card; a milky ghost
  overlay from the copy drawer's transparency; the copy tag pointing between the two drawers; an ambiguous S01 tag
  (removed — the amber field carries the beat); card values sitting on the ruled line; second-site field text size and
  vertical centring; the two "signed in" ticks at inconsistent places (now both under their panel); missing site labels;
  no visible route from the stolen card to the forms (two dashed connections added).
- Segment preview: `bun tools/build-episode.ts … /tmp/segA-sb.json` + `tools/render.sh ep01` → `out/seg-A.mp4`
  (88.3 s, 2650 frames). Contact sheet at 1/3 fps: every beat changes something, no black frame except the end tail,
  `silencedetect` finds no gap > 2 s, `freezedetect` no freeze > 8 s, integrated loudness −22.2 LUFS (the segment strip
  is not mastered; the full episode gets the two-pass `loudnorm` to −16).

## Could not finish / known limits

- **The drawer's card fan hides its rear rows.** From any 3D angle the cards behind the front one show partial labels;
  the second model flags this every round. It is what a real card file looks like, and S01_03–04 need the front card
  readable, so it stays. S03_04's copy is framed wider so its fan shows several different rows.
- **The TechCrunch capture carries the 2026 page's own defects**: a broken image icon in the right column and a stepped
  green header. It is the authentic source page; fixing it would mean editing evidence.
- **S02_04 footage credit is not on screen.** CC BY 3.0 (INVADER PC) — it must appear in the episode's credits/description.
- **The act wipe reveals against black.** `SceneTransition`'s `wipe` clips the incoming scene in from the left while the
  outgoing one has already ended, so frames 2–12 of S03 show the incoming strip over the empty background (a black
  flash). It is the shared transition in `transitions.tsx`, affects every wipe in the episode, and S03's `wipe` comes
  from the storyboard, so it is untouched here.
- The salt in S01_03 is the real one from F42 truncated with `…`; the full string is the fact sheet's.
