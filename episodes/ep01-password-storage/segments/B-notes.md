# Segment B — S04 (encrypt it), S05 (Adobe 2013), S16 (the rules changed)

15 shots, one per beat. Frame lengths from `python3 tools/beat-frames.py <beats>` and `tools/build-episode.ts`.

## Data computed for this segment

**Triple DES ciphertexts.** `openssl enc -des-ede3-cbc` with one demo key, PKCS#7 padding, base64:

```
key   0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF   (24 bytes)
iv    0000000000000000
$ printf 'mango@123' | openssl enc -des-ede3-cbc -K $K -iv $IV | base64
6FeRQifMiphtMzZfI0QUmw==
```

Decrypting that value with the same key prints `mango@123` (round-trip checked). The other five rows in the
drawer are the same recipe: `sunshine1` → `hstsZlb8v6ItsAQx8pDMCQ==`, `123456` → `YvyLlffrXN8=`,
`qwerty` → `px4kh3Q10Do=`, `iloveyou` → `cGwWPiVXhC7jj3em3WEoJw==`, `football` →
`DHrScU34Jx8Z6UMom6dHlg==`. Card faces truncate to 12 characters plus `…`; the box lid prints the
full 24-character value of `mango@123`.

**Hash shown on the light table.** `81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1`
= SHA-256(`mango@123`), factsheet F43. Both cards carry it: the overlay is the compare step, not a
near-miss.

## Shots

### S04 · Encrypt it · `transitionIn: push`

| # | Beat | Frames | Mode | On screen | Why |
|---|------|--------|------|-----------|-----|
| 1 | S04_01 | 180 | 3D `LockboxSet` `action: lock` | steel box open, `mango@123` card sinks in, lid closes over the real ciphertext `6FeRQifMiphtMzZfI0QUmw==` | encryption as a physical lock; the lid prints the real 3DES value |
| 2 | S04_02 | 168 | 3D `CatalogSet` `action: drawer`, new `field: cipher` | the same card drawer as S03, every password field now the real 3DES string of that row's password | same table, new state — the contrast is the point |
| 3 | S04_03 | 222 | 3D `LockboxSet` `action: unlock` | key slides in, lid opens, the plaintext card rises red | reversibility: the key gives the original back |

### S05 · Adobe, 2013 · `transitionIn: fade`

| # | Beat | Frames | Mode | On screen | Why |
|---|------|--------|------|-----------|-----|
| 1 | S05_01 | 91 | `DocShot` `adobe-krebs.png` | Krebs on Security's 29 Oct 2013 page, slow push | the breach is evidence, so it is the document |
| 2 | S05_02 | 176 | 3D `LockboxSet` `action: locked`, `angle: close`, `stamp: TRIPLE DES` | closed box in close-up: ciphertext on the lid, `TRIPLE DES` stamped on the front | the cipher named on the object that is the mechanism |
| 3 | S05_03 | 216 | 3D `LockboxSet` `action: wall` | one brass key crossing a wall of boxes, each lid opening on its password | one key for every box = the regulator's finding, physically |
| 4 | S05_04 | 186 | `EvidenceShot` `adobe-oaic.png` + `adobe-oaic-quote.png` | OAIC report, then the highlighted finding: one encryption key, password hints in plain text; note chip `≈109M records had a hint · Troy Hunt` | the 109M count is Troy Hunt's, not in the OAIC page, so it is cited separately |
| 5 | S05_05 | 261 | `EvidenceShot` `adobe-krebs.png` + `adobe-krebs-quote.png` | Krebs page, then the crop "encrypted passwords for approximately 38 million active users"; note chip `≈153M records in the leaked file · Have I Been Pwned` | 38M is in the source; the 153M dump size comes from HIBP, cited |
| 6 | S05_06 | 120 | 3D `LockboxSet` `action: hints`, `closed: true` | wall of shut boxes, hint tags pinned on the outside of three of them (`my dog's name`, `dog's name`, `my dog`) | a hint is readable while the box stays locked: stored outside the encryption |
| 7 | S05_07 | 257 | 3D `LightTableSet` `action: match` | two punched cards slide together on the backlit table and light green; both are the real SHA-256 of `mango@123` | "it only needs to check it": comparing fingerprints, nothing opened — the bridge into S06 |

`closed: true` is a new optional prop on `LockboxSet` (hints action only): the shotlist asks for hints on
*locked* boxes, and the default `hints` action opens every box.

### S16 · The rules changed · `transitionIn: fade`

All five are NIST SP 800-63B-4 §3.1.1.2 on screen; the crop that matches each beat appears mid-shot.

| # | Beat | Frames | Crop | Beat's rule |
|---|------|--------|------|-------------|
| 1 | S16_01 | 91 | page only (`nist.png`) | "the current guidelines" — establish the document before quoting it |
| 2 | S16_02 | 326 | `nist-salted-hashed-quote.png` at f105 | passwords SHALL be salted and hashed |
| 3 | S16_03 | 356 | `nist-no-rotation-quote.png` at f70 | SHALL NOT require periodic changes |
| 4 | S16_04 | 316 | `nist-min-length-quote.png` at f150 | 15-character minimum for a single factor |
| 5 | S16_05 | 307 | `nist-blocklist-quote.png` at f55 | blocklist check |

`nist-password-managers-quote.png` belongs to S18_05 ("use a password manager"), not to this segment.

## New/changed files

- `video/src/segments/segB/EvidenceShot.tsx` — `DocShot` with the page→crop change placed on a frame
  (a single-beat shot has no `steps` to key it to, and `DocShot` keys its crop to `steps[quoteStep]`), plus
  an optional second citation chip for a number the page does not print.
- `video/src/segments/segB.ts` — exports `EvidenceShot`.
- `video/src/three/sets/LockboxSet.tsx` — additive: `stamp?` (nameplate on the box front, S05_02), `closed?`
  (hints action keeps the boxes shut, S05_06), the lid's ciphertext plate shrinks to fit instead of overflowing,
  new camera angles `lid` (S04_01, looks far enough down that the lid's ciphertext reads), `rise` (S04_03) and
  `stamp` (S05_02, keeps the box inside the frame), a dark plate on the box mouth so an open box reads as open,
  and the key now ends with its tip at the keyhole instead of lying across the lock face. Only segment B uses
  these sets, so no other segment's render changes.
- `video/src/three/sets/CatalogSet.tsx` — additive: `Field` gains `cipher`, with the six real 3DES values.

## Checks

Loop per shot: render the shot alone from `video/src/gallery.json` at its real duration, extract key frames,
`tools/review/align.py` where the text sits in a 2D container, and `tools/review/second-look.sh` (Codex, a
different model) on six full-size frames. Every finding below was either fixed and re-rendered, or is listed
with the reason it is not a defect.

**align.py** (`tools/review/checks/s05-4-oaic.json`, `s16-2-salted.json`) — all PASS:
`oaic-note-chip` box 635×51 dx=+0 dy=+2 pad l/t/r/b 20/15/19/12; `oaic-source-chip` 599×50 dx=+0 dy=+2
19/15/19/11; `nist-source-chip` 538×50 dx=+0 dy=+2 20/16/20/11.

The only text-in-a-2D-container elements in this segment are the citation chips. Everything else printed is a
canvas texture on a 3D mesh seen in perspective (the index cards, the box lid, the nameplate, the hint tags, the
punched cards), where an axis-aligned container/text bbox is not the container; those were judged from the
second-look frames instead, which reported the plates as centred within their containers.

**EvidenceShot crop bands.** Each crop PNG carries slivers of the paragraph above and below; a second-model
review called them "severed text… looks unfinished". `quoteBand` clips the displayed region to complete text
rows, computed from the crops' row profiles (drop rows within 3 px of an edge, pad 10 px, and drop a trailing
row that belongs to the *next* NIST item). Verified by template match: the card at frame 2150 of
`B-shots2.mp4` matches `nist-salted-hashed-quote.png` cropped to rows 63–513 and scaled to 1714 px with a mean
absolute difference of 2.3/255, against 44.3 for the uncropped image.

**Fixed after review** (each was re-rendered and re-reviewed):
1. S04_01 — the open lid was cut by the top edge, and the ciphertext on the lid was unreadable at the old camera
   elevation (−17°). New `lid` angle (+36°) and target: lid inside the frame, lid text legible at frames 126–176.
2. S04_03 — key lay across the lock face instead of meeting the keyhole, then (after the first fix) the key's
   bow clipped into the box front. Key now ends with the shaft tip at the keyhole, bow in front of the face,
   ring facing the camera.
3. S04_03 — the box read as "sealed beneath the raised lid": a dark plate now sits in the box mouth.
4. S05_01/S16_01 — moved from `DocShot` to `EvidenceShot` so all of this segment's document shots share one
   page treatment.
5. S05_02 — the box body was cut by the bottom edge at the `close` angle; new `stamp` angle frames the whole box.
6. S05_03 — a fragment of the departing key stayed at the right edge at the end of the shot; the key now leaves
   the frame.
7. S05_04/S05_05 — "the attribution is ambiguous: a second count under a first source": the note chips now read
   "Counted by Troy Hunt: ≈109M records had a hint" / "Counted by Have I Been Pwned: ≈153M records".
8. S05_06 — the three hint tags were different lengths, so the plate auto-fit set them at different sizes; all
   three now read "my dog's name", and the tag sits on the box front instead of hanging past its right edge.
9. S16_02–S16_05 — the source pill named §3.1.1.2 while the page on screen was the document's Abstract; the pill
   now changes to the section citation when the crop appears.
10. Document pages — the 1.04→1.12 push-in cropped the page's own masthead and sidebar; `EvidenceShot` pushes
    1.00→1.03 anchored at the top-left. The source pill is 94 % opaque and the crop card is 24 % wider than
    `DocShot`'s, so the quoted rule is legible.
11. S16_03/S16_05 — the crops' last rows ("accessible," / "For example, the list may include:") ended the excerpt
    mid-thought; the bands now stop before them.
12. The 18-frame crop cross-fade was called "muddy"; it is 10 frames and the page blurs faster.

**Reviewed and not changed** (with reason):
- S04_02 drawer: rear cards are occluded by the ones in front and the values end in `…`. That is a drawer of
  cards and a truncated column; the front card's ciphertext is the readable one.
- S04_02 drawer, "password cramped against the card's bottom edge" (three reviews): measured on the rendered
  frame, the front card's value ink ends at y≈530 and the card's paper reaches y≈600, a ~70 px margin (~20 % of
  the card's height, matching the 84 px value baseline and the 616 px border in the 640 px card texture). What
  reads as a tight bottom edge is the card's own shading under the value, a perspective effect on a card standing
  in the drawer. Changing the shared `IndexCard` texture layout would move the value off the ruled line it sits on
  and change every drawer shot in the segment.
- S05_03 wall: middle- and back-row cards are partly hidden behind the front row's open lids. That is the wall
  as built; a steeper camera would foreshorten the card text instead. The key crossing and the opening lids
  carry the beat.
- S05_03/S05_06: boxes are cut by the left and right frame edges. A wall of 18 boxes is wider than the frame at
  a size where the passwords still read; framing the whole wall would make every card unreadable.
- S05_07: with two identical fingerprints overlaid, the top card covers the bottom one, so the viewer sees one
  card titled MATCH. That is the compare step working (nothing is opened); the green lamp and title are the only
  possible signal when the two patterns are equal.
- S05_05: the highlighted line in `adobe-krebs-quote.png` has uneven letter spacing ("active users,") — that is in
  the asset, not in the card.
- S04_03: the card's text is left-aligned inside a `PaperCard` (by design), and the card sits ~18 px right of the
  open lid's centre in projection (parallax between a card at z≈0.1 and a lid at z≈−1.1).
- S16_04: `nist-min-length-quote.png` itself is cropped into the first glyph of its opening line (its text
  starts at x=0 while the other crops have 56 px of margin). The missing pixels are not in the asset.
- S16_05: the crop ends at "For example, the list may include:" — a colon with the list off the bottom of the
  crop, which one review calls unfinished. Cutting the line instead leaves "…not substrings", a sentence chopped
  mid-thought; the colon is the honest end of what the asset contains.
- The highlighted span inside `nist-no-rotation-quote.png` and `nist-min-length-quote.png` covers only part of a
  sentence (it stops at "periodically." / wraps after "15"). That is where the highlighter was drawn in the crop
  assets; the cards show the full lines, not just the yellow.
- Document pages: the page capture is a viewport, so body text is cut at the bottom edge; the NIST page's section
  badges (`1Introduction`) are its own CSS; S05_04 shows the source page's "TOP" button under the caption row.
- Document pages: the source pill sits over the page by design (it is a lower-third caption). Its first 12 frames
  fade in, which two reviews read as "too faint to read".
- S05_02: a stepped edge in the floor reflection under the box (`MeshReflectorMaterial`, shared `Studio`).

## Segment preview

`bun tools/build-episode.ts episodes/ep01-password-storage ep01 /tmp/segB-sb.json` then
`tools/render.sh ep01 episodes/ep01-password-storage/out/seg-B.mp4` (3 scenes, 3291 frames, 1:49.7). Contact sheet
`fps=1/3, tile=6x6` at `/tmp/segB-sheet.png`: the dark tiles are the 3D sets, the bright ones the documents, in the
expected order (S04 dark → S05 documents → S16 documents).

| Check | Result |
|---|---|
| Format | h264 1920×1080 30 fps + AAC |
| Duration | 109.7 s for 15 beats (segment preview; tails differ from the merged episode) |
| blackdetect d=0.5 | none |
| freezedetect n=0.002 d=6 (downscale + blur) | none |
| silencedetect n=−40 dB d=2 | none |
| Loudness | −22.3 LUFS — the known pre-`loudnorm` level of a Kokoro + 0.12 music-bed mix (LEARNINGS); the episode render applies the two-pass `loudnorm` |

A second-model pass over 12 frames of the finished segment (one per shot, both sides of each scene transition)
found no defect the per-shot rounds had missed; its remaining notes were the source-pill overlay and the
S04_02 bottom-edge perception covered above.
