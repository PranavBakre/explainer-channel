Model: claude-opus-5-5

# Component library

Check this file before building any new shot or component (`art-direction` §5, `storyboard` §1.3, `episode-brief` §2.3). Reuse an entry that shows the mechanism; build new only when none fits, and say in the storyboard row which entries were checked.

**Adding an entry:** when the operator approves a shot or a component ships in an episode that passed `video-qa`, add a row under "Approved" with its name (export and file), what it shows, when to use it (and when not), and the episode it shipped in. Rejected pieces move to "Do not reuse" with the reason.

## Approved (season 1, screen-first)
None recorded yet. The screen-first kit named in `.claude/skills/art-direction/references/directions/screen-first.md` §10 (`video/src/proto/look2/`, `video/src/screen/<id>/`) is not in this checkout; add its pieces here, one row each, when they land.

| Name | What it shows | When to use | Shipped in |
|---|---|---|---|

## Existing components, not yet reviewed for the library
All shipped in ep01 (password storage) in the painted-props or cut-paper look unless noted. Each is a candidate: it needs the operator's approval in the season look before it moves to "Approved".

### `video/src/components`
| Name | What it shows |
|---|---|
| `DocShot` (`DocShot.tsx`) | A real source page capture with a slow push, then its highlighted passage lifted onto a card. |
| `FootageShot` (`FootageShot.tsx`) | Licensed stock footage as a full shot, muted, slow push, optional on-object tags. |
| `LottieShot` (`LottieShot.tsx`) | One Lottie animation, large, on a soft backdrop, with on-object tags (ep01 login flows). |
| `KAnonExchange` (`KAnonExchange.tsx`) | The device sends a five-character hash prefix, candidate endings come back, the match happens on the device (ep01 S17). |
| `Fingerprint`, `Avalanche`, `hexBits` (`fingerprint.tsx`) | A hash drawn as its real bits, one cell per bit; `Avalanche` shows how many bits change for a one-character change. |
| `Drawn` (`drawn.tsx`) | A hand-drawn stroke that draws itself, seeded so the wobble is stable across frames. |
| `HashGrinder` (`mechanisms.tsx`) | The password card goes into a machine and a fingerprint comes out; the way back is struck out (ep01 S06). |
| `LoginMatch` (`mechanisms.tsx`) | The stored fingerprint in the user's row; the typed password is hashed and laid against it (ep01 S08). |
| `SaltGrinder` (`mechanisms.tsx`) | The same password with two salts gives two unrelated fingerprints (ep01 S10). |
| `LockBox` (`mechanisms.tsx`) | The card locked in a box; one key opens it again (ep01 S04). |
| `KeyCascade` (`mechanisms.tsx`) | One key opens every box in turn, plain-text hints beside some (ep01 S05). |
| `LookupWall` (`mechanisms.tsx`) | A precomputed table keyed by hash finds the stolen fingerprint (ep01 S09). |
| `ChainLine` (`mechanisms.tsx`) | The card passes each storage method in turn; each failure lights, the last holds (ep01 S18 recap). |
| `GuessStream` (`three/GuessStream.tsx`) | Guesses pouring through one graphics card, density following the benchmark rate (ep01 S12). |
| `Stage`, `Background`, `Label`, `Scramble`, `stepAt`, `currentStep` (`base.tsx`) | Shared layout, backdrop, label and text-scramble helpers and beat-step timing for every shot. |
| `TextStack`, `ActTitle`, `BigNumber`, `DbTable`, `StatGrid`, `FlowDiagram`, `Checklist`, `QuoteCard`, `CodeCard`, `RaceBars`, `HashMachine`, `KeyDiagram`, `LookupTable`, `SaltDiagram`, `KAnonymity` (`visuals.tsx`) | Ep01 v1 card set. |

### `video/src/three`
| Name | What it shows |
|---|---|
| `Studio`, `CameraRig`, `Glow`, `PaperCard`, `PunchedCard`, `Plate`, `Tag`, easing helpers (`kit.tsx`) | The 3D kit: a lit studio, a per-frame camera, glow sprite in place of bloom, paper and punched cards carrying real bits, name plates and floating labels. |
| `finish.tsx` (`Oak`, `Painted`, `Brushed`, `Glass`, `fibre`) | Surface finishes: scanned oak veneer and seeded procedural maps. |
| `Scanned` (`Scanned.tsx`) | A CC0 photoscanned model, scaled and placed on the floor, with hinged or sliding parts. |
| `HashMachineSet` (`HashMachineSet.tsx`) | Prototype of the hash machine as a lit physical set. |
| `MachineSet`, `Machine` (`sets/MachineSet.tsx`) | The hash machine set with named camera set-ups. |
| `CatalogSet`, `CatalogDrawer`, `LookupCabinet` (`sets/CatalogSet.tsx`) | A card-catalogue drawer of user rows, a stolen copy, a wall of precomputed lookups. |
| `LockboxSet`, `EncryptionBox`, `Key`, `KeyInLock` (`sets/LockboxSet.tsx`) | One encrypted box and its key, or a wall of boxes one key opens. |
| `LightTableSet`, `ComparisonTable` (`sets/LightTableSet.tsx`) | Two punched cards on a backlit table, shown apart and then laid over each other. |

## Do not reuse
| Name | Reason |
|---|---|
| `TextStack`, `ActTitle`, `BigNumber`, `StatGrid`, `DbTable`, `Checklist`, `FlowDiagram`, `QuoteCard`, `LookupTable` | Text cards, stat cards, chapter cards, tables, checklists and boxes joined by arrows: rejected on ep01 v1 ("text, not visuals") and banned in every direction (`storyboard` NEVER). |
| `RaceBars` with `log` | Log bars understate a headline gap (`storyboard` §1.2, Big gaps look big). |
