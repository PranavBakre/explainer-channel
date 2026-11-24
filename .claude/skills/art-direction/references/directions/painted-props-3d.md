# Painted props, 3D

**Reference only for season 1.** Screen-first is the locked season look (`art-direction` §0). Use this file for its lessons and failures; an episode uses this look only after an explicit operator decision recorded in `LEARNINGS.md`, never for one episode.

The look ep01 shipped in through revision 7. Kept as a record and a working spec; the operator moved to `cut-paper-stop-motion.md` on 2026-11-11.

## 1. Idea
Painted wood, brass and paper props (card drawer, lockbox, hash machine, scoreboard) built in three.js on coloured studio walls, with flat illustrated phone flows (Lottie) and real captures between them.

## 2. Anchors
Channel style bible v1 (`episodes/ep01-password-storage/brief.md` §4): ink, cream, amber = password, red = exposed, teal = safe; Instrument Serif, Inter, JetBrains Mono. Operator look decisions: `LEARNINGS.md` operator feedback sections.

## 3. Colour over time
Not settled in this look; ep01 kept pastel walls throughout, which faded at thumbnail size.

## 4. Medium per mechanism
| The mechanism is… | Medium |
|---|---|
| a physical-feeling process (store, lock, compare, guess) | three.js prop that stands for exactly one part of the system all episode |
| a user-facing flow (sign up, log in, a check on a site) | edited stock Lottie (`tools/lottie/*.py` → JSON, `LottieShot`) in one illustration family with clear provenance |
| evidence, a quote or a number from a source | `DocShot`: real page screenshot, then highlighted crop, then back to the prop or flow it changes |
| a list of rules a standard imposes | the flow or prop showing each rule applied to the running example; the document only as proof |
| real hardware or a real place | `FootageShot` with licensed footage and a scrim under text |

## 5. Material and process
- **Scanned model when one fits the meaning** (`Scanned`, Poly Haven CC0, `video/public/assets/models/<name>/`): prefer separable nodes (`node` extracts one; `parts` hinges about a pivot in model metres) and no printed text.
- **No scan fits → our geometry with a scanned surface** (`video/src/three/finish.tsx`: `Oak`, `Painted`). `Brushed` is a procedural brushed map and `Glass` a plain physical material; use them for metal and displays. Procedural-only bodies read as "too plain, like 1995 Toy Story".
- **Finish must match meaning:** clean steel for security, wear only when wear is the point; a rusty tool chest as "the lockbox" was rejected ("looks like a rusted toolbox"). `Brushed` at metalness 1 reads black under softboxes; ~0.55 reads as steel.
- Softbox Lightformers, not HDRI (it turned copper black).

## 6. Motion
Channel house values (`storyboard` §1–2): cut inside an act, fade at an act start, every beat changes the active element.

## 7. Text on screen
- Lottie flows: Inter, 26 px values, 20–28 px labels.
- 3D labels are a canvas texture (`Plate`); a label that would mirror in the floor gets `reflect={false}`, and its Studio needs `unreflectedLabels`.
- Floating captions over a set or footage sit on a plate or scrim with ≥ 4.5:1 contrast, in the flows' sans at weight ≥ 500. Ep01's thin condensed serif at ~40 px, pale on a pale backdrop or red on brown and teal, was unreadable at 360 px wide.

## 8. Real captures and footage
Web pages shown as screenshots in `DocShot`, unaltered; footage full-frame under a scrim.

## 9. What failed
- Three media in one video (3D sets, flat phone illustrations, white web pages) with caption pills over all of them: no single world.
- Pastel walls fade at thumbnail size; its own props ranked 12 of 12 blind as a thumbnail, while a generated cut-paper thumbnail ranked first. The operator: "the thumbnail looks better than the video entirely".
- Boards of any kind (whiteboard, chalkboard, flip chart, "math board"), rendered or composited: rejected as fake. Numbers live in their source document or as the reading of a prop (counter, dial, display).
- Decorative 3D: a prop that does not stand for part of the mechanism.
- Scanned props carrying stock text (Cyrillic labels, handwriting, brand marks).

## 10. How it is built
- Code: `video/src/three/`, `video/src/segments/segR/`, `tools/lottie/r2*.py`; build notes in `episodes/ep01-password-storage-r2/segments/*-notes.md`.
- Lottie provenance: stock LottieFiles results include re-uploads of other studios' art; use a family only when its author, source URL and licence are clear, otherwise draw the flow ourselves.
