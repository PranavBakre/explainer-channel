# Segment E — S15, S17, S18

## Shots

| Beats | Mode / component | What happens / why this mode | Sources |
|---|---|---|---|
| S15_01–02 | Edited Lottie / ELogin / s15-login.json | Existing laptop, sealed HTTPS capsule, server, hash chips and compare tick. Only time values are changed: authored 0 / 138 / 330 map to narration 0 / 147 / 337. | F36, F43, F45; existing s15_login.py artwork |
| S15_03 | Edited Lottie / EEmail / s15-email.json | Email envelope arrives, email exposes mango@123 in red, warning pill identifies recoverable storage. Same stock laptop and lot.py palette/builders. | F36 and the reviewed narration; the email is an illustrative example |
| S17_01 | DocShot / EHibpSource | Real HIBP page, then hibp-quote.png. Evidence before the mechanism; source label raised into safe area. | F33; assets/shots/hibp.png and hibp-quote.png, credits.json |
| S17_02–03 | Edited Lottie / ECheck / s17-check.json | Local SHA-1 split into blue F14D5 and its suffix. Only the prefix travels to HIBP. Four real response lines are shown (three initial rows plus the actual match); suffix is compared locally. | F33, F43; SHA-1 recomputed with hashlib; saved public range response |
| S18_01–03 | Continuous 3D set / ERecap | Camera tracks the same CatalogSet drawer, LockboxSet box/key, lookup cabinet, MachineSet machine and LightTableSet comparison surface. A GPU appears for fast salted guessing; gears appear for slow hashing. 123456 is the first card fed into the Argon2id machine. No plaintext output is depicted. | F3, F16, F23, F26, F42, F43; shotlist-v3 S18.1–3 |
| S18_04–05 | Edited Lottie / EManager / s18-manager.json | Long unique example password, then a password manager fills the laptop password field. Locally authored 20-character example, not a real credential. | F41, F44; shotlist-v3 S18.4–5 |
| S18_06–07 | 3D drawer / EDrawerClose | Argon2id users row, large slow-hash label on its card; the actual drawer retracts into its cabinet, then the studio dims. | F42; shotlist-v3 S18.6–7 |

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
- Render/alignment/self-inspection: PASS — all seven shots rendered and opened as PNGs, plus the final contact sheet. All **32** alignment checks pass on clips extracted from the final narrated preview; log: `out/E-alignment-final.txt`. The drawer camera projection also checks all 568 frames (bounds x=661–1219, y=97–1025, zero out-of-frame points).
- Independent visual review belongs to the lead. `tools/review/second-look.sh` was not used.

## Preview assembly

The full narrated preview was built from `/tmp/segE-sb.json` with `tools/build-episode.ts`, then rendered using `tools/render.sh ep01 <absolute-output>`. Five corrected shots are rendered from that same composition at their actual global frame ranges: email 355–579, HIBP flow 738–1311, recap 1312–2281, manager 2282–2815, drawer 2816–3383. The final preview replaces precisely those ranges and keeps the original narration track; it does not alter timing or audio. The verified final frame count is 3,384.

Alignment JSONs are measured against the per-shot clips in `out/`, including the episode's actual push-in scale. The DocShot check measures the quote within the white source card; the source's yellow marker highlight is preserved exactly.

Salted SHA-256 recomputed for the recap: SHA-256(`e05b13d8mango@123`) = `324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8`. The output card punches all 256 bits; the light-table pair uses this exact same digest.

The final two 3D passes use `--gl=angle` through the same render queue.

## Final evidence and handoff

- `out/seg-E.mp4`: 3,384 frames, 112.811 s, H.264, 1920×1080, 30 fps, AAC. The narration AAC packet hash is identical before and after assembling the corrected ranges. Full-file FFmpeg decode/black detection completed with zero black intervals (`out/E-blackdetect.txt`).
- `out/E-final-frames/sheet.png`: final preview contact sheet; opened and inspected.
- `out/E-final-frames/index.json`: 46 key frames with global frame, local frame, visual and PNG filename for the lead's independent review. Every shot has full-size PNG self-inspection; all six final closing frames were opened.
- Canonical per-shot clips: `out/E-login.mp4`, `E-email.mp4`, `E-source.mp4`, `E-check.mp4`, `E-recap.mp4`, `E-manager.mp4`, `E-drawer.mp4`. Each uses the matching `tools/review/checks/E-<name>.json`; the 32 final checks pass.
- Issues found in the first passes (occluded labels, field/arrow overlap, cropped drawer, prefix-only punched output) were corrected and rerendered. No known remaining implementation issue. The lead's independent visual review remains the next gate; no same-model `second-look.sh` review was run.
