# Segment E — S15, S17, S18

## Shots

| Beats | Mode / component | What happens / why this mode | Sources |
|---|---|---|---|
| S15_01–02 | Edited Lottie / ELogin / s15-login.json | Existing laptop, sealed HTTPS capsule, server, hash chips and compare tick. Only time values are changed: authored 0 / 138 / 330 map to narration 0 / 147 / 337. | F36, F43, F45; existing s15_login.py artwork |
| S15_03 | Edited Lottie / EEmail / s15-email.json | Email envelope arrives, email exposes mango@123 in red, warning pill identifies recoverable storage. Same stock laptop and lot.py palette/builders. | F36 and the reviewed narration; the email is an illustrative example |
| S17_01 | DocShot / EHibpSource | Real HIBP page, then hibp-quote.png. Evidence before the mechanism; source label raised into safe area. | F33; assets/shots/hibp.png and hibp-quote.png, credits.json |
| S17_02–03 | Edited Lottie / ECheck / s17-check.json | Local SHA-1 appears in a separate readout: blue F14D5 above the complete digest wrapped into two 20-character lines. Only the prefix travels to HIBP. Four real response lines are shown (three initial rows plus the actual match); suffix is compared locally. | F33, F43; SHA-1 recomputed with hashlib; saved public range response |
| S18_01–03 | Continuous 3D set / ERecap | Camera tracks the same CatalogSet drawer, LockboxSet box/key, lookup cabinet, MachineSet machine and LightTableSet comparison surface. The studio blends from drawer/lockbox #4E3A36 to machine #2E5663, light table #2B4F5C and back to machine blue. Each camera stop frames its whole active prop group. A GPU appears beside the comparison table for fast salted guessing; gears appear for slow hashing. 123456 is the first card fed into the Argon2id machine. No plaintext output is depicted. | F3, F16, F23, F26, F42, F43; shotlist-v3 S18.1–3 |
| S18_04–05 | Edited Lottie / EManager / s18-manager.json | Long unique example password, then a password manager fills the laptop password field. Locally authored 20-character example, not a real credential. | F41, F44; shotlist-v3 S18.4–5 |
| S18_06–07 | 3D drawer / EDrawerClose | Argon2id users row, large slow-hash label on its card; the actual drawer retracts into its cabinet in the established #4E3A36 studio, then the light dims. | F42; shotlist-v3 S18.6–7 |

## Live range data

Fetched once during this build with `curl -s https://api.pwnedpasswords.com/range/F14D5`.
Full unmodified response (line endings normalised to LF): `tools/lottie/s17-F14D5.txt`.
SHA-1(`mango@123`) = `F14D5BA7F5892B8CB2549DEA72287EE3692BB297`.
The response contained **1,965** suffix rows; the matching line was:
`BA7F5892B8CB2549DEA72287EE3692BB297:7743`.
The reported count is **7,743** in this captured response, not a claim about unique people or a permanent count.
The shot shows selected rows rather than claiming this is the entire response.

## Timing and integration

- `tools/lottie/timing.py` reads offsets from `tools/beat-frames.py`; no voice files or script changes.
- S15 login: steps 0 / 147, length 337. Email: 218 base frames; actual preview length 225.
- S17 source: 158 frames. Flow: steps 0 / 296, base length 567; actual preview length 574.
- S18 recap: steps 0 / 226 / 535, length 970. Manager: steps 0 / 352, length 534.
- Closing drawer: steps 0 / 268, base length 506; actual preview length 568 with its final hold.
- Actual episode `steps` drive the 3D shots. Gallery's hardcoded four-step fixture is handled with the narration-derived offsets.
- Shared changes are additive: exported CatalogDrawer / LookupCabinet / EncryptionBox, a small optional lookup-cabinet size, an Argon2id field state, and ComparisonTable. Existing set defaults are unchanged.

## Verification

- Two consecutive final clean passes: TypeScript (`cd video && bunx tsc --noEmit`), Python compilation, structural/data assertions, full salted-digest check and `git diff --check` all PASS.
- Python generators: PASS (`python3 -m py_compile` for all five relevant modules).
- Structural/data checks: PASS — all 13 beat objects and scene metadata equal the original segment; S15 generated JSON equals the original generated JSON with only times remapped; SHA-1 and the matching live suffix/count agree.
- Render/alignment/self-inspection: PASS — all seven shots rendered and opened as PNGs, plus the final contact sheet. All **34** alignment checks pass on clips extracted from the final narrated preview; log: `out/E-alignment-final.txt`. The recap camera projection checks 737 held-stop frames with at least 40 px of frame margin. The drawer camera projection also checks all 568 frames (bounds x=661–1219, y=97–1025, zero out-of-frame points).
- Independent visual review belongs to the lead. `tools/review/second-look.sh` was not used.

## Preview assembly

The narrated preview is built from `/tmp/segE-sb.json` with `tools/build-episode.ts`. The lead-review fixes are rendered as five affected shot ranges through `tools/render.sh ep01 <absolute-output> --frames=<start>-<end> --gl=angle`: email 355–579, HIBP flow 738–1311, recap 1312–2281, manager 2282–2815, drawer 2816–3383. After self-inspection and alignment checks, the full `out/seg-E.mp4` is rendered again through the same queue with `--gl=angle`.

Alignment JSONs measure the per-shot clips in `out/`, including the episode's actual push-in scale. The DocShot check measures the quote within the white source card; the source's yellow marker highlight is preserved exactly. The catalog index card has separate email/password field measurements because its stacked field layout is intentional.

Salted SHA-256 recomputed for the recap: SHA-256(`e05b13d8mango@123`) = `324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8`. The output card punches all 256 bits; the light-table pair uses this exact same digest.

## Lead-review fixes

1. Recap studio colours now follow the focused prop, with smooth blends; the closing drawer uses #4E3A36.
2. Camera stops now centre and fit the drawer, lockbox, lookup-plus-SHA-1 group, comparison table/GPU, slow machine and first-guess cards. Projection checks across every held-stop frame include the episode push-in and keep the active group inside x=40–1880, y=40–950. The GPU sits beside the table; its name plate is mounted on its lower face and excluded from the reflection camera. Its body and all other props retain the original floor reflections. The new optional Studio/Plate settings preserve their default rendering behaviour.
3. HIBP's local SHA-1 readout has its own paper card and two full-digest lines. The browser is lower with clear separation. Custom labels are 24–28 px and every displayed digest, prefix and suffix row is 26 px, in Inter.
4. Email and manager chips use 26 px values and 60 px heights, matching S03/S15. Their titles and server labels are 28 px; recipient and action text are 26 px. S15 login's artwork remains unchanged.

## Final evidence and handoff

- `out/seg-E.mp4`: 3,384 frames, 112.811 s, H.264, 1920×1080, 30 fps, AAC. The narration AAC packet hash is identical before and after the fresh full render. Full-file FFmpeg decode/black detection completed with zero black intervals (`out/E-blackdetect.txt`).
- `out/E-final-frames/sheet.png`: final preview contact sheet; opened and inspected.
- `out/E-final-frames/index.json`: 49 key frames with global frame, local frame, visual and PNG filename for the lead's independent review. Every shot has full-size PNG self-inspection; the email, HIBP flow, manager and drawer also have six-frame motion sheets.
- Canonical per-shot clips: `out/E-login.mp4`, `E-email.mp4`, `E-source.mp4`, `E-check.mp4`, `E-recap.mp4`, `E-manager.mp4`, `E-drawer.mp4`. Each uses the matching `tools/review/checks/E-<name>.json`; the 34 final checks pass.
- Issues found in the first passes (occluded labels, field/arrow overlap, cropped drawer, prefix-only punched output) were corrected and rerendered. No known remaining implementation issue. The lead's independent visual review remains the next gate; no same-model `second-look.sh` review was run.
