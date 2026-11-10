# Segment C — S06–S10

Worker branch: `seg/C`. All scene metadata and 23 narration beats are preserved. No script or voice edits.

## Shot map

| Beat(s) | Mode and component | Visible action and purpose | Source |
|---|---|---|---|
| S06_01 | 3D set · `HashMachineC` | The established copper hash machine is revealed beside the password card. The machine stands for the function. | F12, F40, F43; computed data |
| S06_02 | 3D set · `HashMachineC` | Three differently sized inputs (`a`, `mango@123`, and the sentence `Any text becomes a fixed-length fingerprint.`) become identically sized 256-bit cards. | F12, F40, F43; computed data |
| S06_03 | 3D set · `HashMachineC` | The machine ejects the mango SHA-256 card. The full 64 hex characters are printed in four lines on the output readout; each bit pattern is computed from that digest. | F12, F40, F43; computed data |
| S06_04 | 3D set · `HashMachineC` | The output card is pushed toward the output slot, the lamp goes red, then a forward guess enters the input slot. | F12, F40, F43; computed data |
| S07_01, S07_02, S07_03, S07_04 | 3D set · `CompareC` | The hunter2 and hunter3 cards lie apart on the lit table, overlay on the second beat, reveal the exact 146-bit XOR mask on the third beat, and move to top view on the fourth. | F14–F15; computed XOR |
| S08_01 | 3D set · `UsersDrawerC` | The users-table drawer carries computed SHA-256 prefixes for its illustrative users. Copy shots slide a duplicate drawer away; no readable password is filed. | F43, F45; computed data |
| S08_02 | 3D set · `HashMachineC` | The submitted password enters the same hash machine and the corresponding real bit card emerges. | F43, F45; computed data |
| S08_03 | 3D set · `CompareC` | Stored and freshly computed mango bit cards overlay, showing the same fingerprint and a green match reading. | F43, F45; computed data |
| S08_04 | 3D set · `UsersDrawerC` | The users-table drawer carries computed SHA-256 prefixes for its illustrative users. Copy shots slide a duplicate drawer away; no readable password is filed. | F43, F45; computed data |
| S09_01 | DocShot · `EvidenceC` | DocShot shows the real 2012 source capture followed by its highlighted quote crop. The existing archival page is cited by its actual title. | F16–F19, F43; computed data |
| S09_02 | 3D set · `UsersDrawerC` | Close view of an illustrative users-table row carrying the real SHA-1 prefix f14d5ba7… and the unsalted algorithm label. This is a demonstration, not a genuine LinkedIn record. | F16–F19, F43; computed data |
| S09_03 | 3D set · `HashMachineC` | The same password is fed twice; two SHA-1 cards carry identical real bits. | F16–F19, F43; computed data |
| S09_04 | 3D set · `LookupC` | The SHA-1 machine output travels into the hash-keyed catalogue wall. All six drawer labels are genuine SHA-1 prefixes of the passwords represented inside. | F16–F19, F43; computed data |
| S09_05 | 3D set · `LookupC` | Search steps through hash-keyed drawers; the f14d5ba7 drawer opens and mango@123 rises. Lookup retrieves a precomputed password; it does not reverse the function. | F16–F19, F43; computed data |
| S09_06 | DocShot · `EvidenceC` | DocShot shows the real AP / Phys.org 2016 capture followed by its highlighted quote crop. The caption credits the press source rather than presenting it as a LinkedIn-authored article. A later magnification of the original page paragraph shows the explicit 117 million figure; the supplied quote crop itself highlights more than 100 million. | F16–F19, F43; computed data |
| S10_01 | 3D set · `HashMachineC` | A brass chip carrying the real demo salt clips onto the password card before any hashing. | F20–F22, F43; computed data |
| S10_02 | 3D set · `HashMachineC` | The password card and its salt chip travel into the input slot together; the salted digest is the output. | F20–F22, F43; computed data |
| S10_03 | 3D set · `UsersDrawerC` | The two illustrative users chose the same password; each row stores its own salt beside its own computed salted SHA-256 prefix. | F20–F22, F43; computed data |
| S10_04 | 3D set · `CompareC` | The two mango cards use distinct salts; overlay reveals the exact 136 differing bits. | F20–F22, F43; computed data |
| S10_05 | 3D set · `LookupC` | The salted SHA-256 prefix misses the unsalted SHA-256 table, then two separate tables grow for the two illustrative salts. All labels in the salt tables are recomputed with that table’s salt. | F20–F22, F43; computed data |

## Data and provenance

All digests below were generated with Python `hashlib` and independently checked by piping the exact UTF-8 input bytes, without a newline, into `shasum -a 1` or `shasum -a 256`. Every one of the 38 comparisons passed. `video/src/segments/segC/data.json` is the stored, checked input/output ledger used by all C components. Prefixes always come from these complete values.

Salt convention: **the eight ASCII hex characters are prepended to the UTF-8 password**. These are illustrative **32-bit** salts, labelled as illustrations on the machine; they are not a recommendation for a production salt length. The password stays `mango@123`.

- Asha: salt `9f2c4a71`, input `9f2c4a71mango@123`, SHA-256 `fb9d05563ec1fbbdebc0c48ed14a7db7087102a8373e44fc54ad57d8b1ed0401`.
- You: salt `e05b13d8`, input `e05b13d8mango@123`, SHA-256 `324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8`.
- XOR popcount hunter2/hunter3: **146 / 256**.
- XOR popcount the two salted mango outputs: **136 / 256**.

| Algorithm | Exact input | Full verified digest |
|---|---|---|
| sha1 | `a` | `86f7e437faa5a7fce15d1ddcb9eaeaea377667b8` |
| sha256 | `a` | `ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb` |
| sha1 | `mango@123` | `f14d5ba7f5892b8cb2549dea72287ee3692bb297` |
| sha256 | `mango@123` | `81c68634d1b211e0d5632839f7efc8601c743f1ef0c94da8220e26ab221efff1` |
| sha1 | `Any text becomes a fixed-length fingerprint.` | `a6024c8e183a4de117c0d4b67f50ed3f38421c4b` |
| sha256 | `Any text becomes a fixed-length fingerprint.` | `77070bb4e8c1264328add0d96ec6f2cd4c04d7bcdcb792935a2c1b7219d7c969` |
| sha1 | `hunter2` | `f3bbbd66a63d4bf1747940578ec3d0103530e21d` |
| sha256 | `hunter2` | `f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7` |
| sha1 | `hunter3` | `71544f76730f65cdb71a68877b02d015feb51ab1` |
| sha256 | `hunter3` | `fb8c2e2b85ca81eb4350199faddd983cb26af3064614e737ea9f479621cfa57a` |
| sha1 | `sunshine1` | `08b314f0e1e2c41ec92c3735910658e5a82c6ba7` |
| sha256 | `sunshine1` | `284fff3bd254b48cca05a8bfc4fad69e05cad0d086513a034a66a118829e6fa4` |
| sha1 | `123456` | `7c4a8d09ca3762af61e59520943dc26494f8941b` |
| sha256 | `123456` | `8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92` |
| sha1 | `qwerty` | `b1b3773a05c0ed0176787a4f1574ff0075f7521e` |
| sha256 | `qwerty` | `65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5` |
| sha1 | `iloveyou` | `ee8d8728f435fd550f83852aabab5234ce1da528` |
| sha256 | `iloveyou` | `e4ad93ca07acb8d908a3aa41e920ea4f4ef4f26e7f86cf8291c5db289780a5ae` |
| sha1 | `football` | `2d27b62c597ec858f6e7b54e7e58525e6a95e6d8` |
| sha256 | `football` | `6382deaf1f5dc6e792b76db4a4a7bf2ba468884e000b25e7928e621e27fb23cb` |
| sha1 | `password` | `5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8` |
| sha256 | `password` | `5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8` |
| sha1 | `12345678` | `7c222fb2927d828af22f592134e8932480637c0d` |
| sha256 | `12345678` | `ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f` |
| sha1 | `111111` | `3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d` |
| sha256 | `111111` | `bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a` |
| sha256 | `9f2c4a71mango@123` | `fb9d05563ec1fbbdebc0c48ed14a7db7087102a8373e44fc54ad57d8b1ed0401` |
| sha256 | `9f2c4a71123456` | `d88030fd1291c9d885156c6179fca6f73681dac751b730fcbebbcf9e87960b5e` |
| sha256 | `9f2c4a71password` | `27418a5aeee9589b0a4cd82cf5cb4de1d82847e691af78001907bb246fca7563` |
| sha256 | `9f2c4a71qwerty` | `086d15c2ca4b35d406c5cde888e2af45e7344a3ca9e977e84786d2f4e597d8c3` |
| sha256 | `9f2c4a71iloveyou` | `e7e0182b39db3dc95b0753924c3b9220f9dc765eb1fd06c87484e35cd59af2fb` |
| sha256 | `9f2c4a71111111` | `bae538bf219f417be11ee8917dd7f8e202c3f9a6c825898bdf9720829d7c0e65` |
| sha256 | `e05b13d8mango@123` | `324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8` |
| sha256 | `e05b13d8123456` | `18f5aa40812be12091e712305b515234220d185caafb6d74c593c8c8d2e042b3` |
| sha256 | `e05b13d8password` | `de62f9ae86f8462b1e85b328dbf78d6a4e41f631fe314f4c523dbd142abf5c7a` |
| sha256 | `e05b13d8qwerty` | `994232f95abee3f05f457d3028a91cfcfee63e79bb889fd520d129ac54d86674` |
| sha256 | `e05b13d8iloveyou` | `2694f667634106c4cc27d8ef794434708659c84cb5f7a59c9ba91361196da37b` |
| sha256 | `e05b13d8111111` | `5902325b202a328ff95f5f92166131fb23aafb48ef91b3f9dd54638647833c59` |

## Evidence assets

- `linkedin-2012.png` / `linkedin-2012-quote.png`: Tracy Kitten, **LinkedIn: Hashed Passwords Breached**, GovInfoSecurity, June 2012. F16; source URL and archival-capture caveat in `credits.json`.
- `linkedin-2016.png` / `linkedin-2016-quote.png`: Associated Press via Phys.org, **LinkedIn confirms 2012 hack exposed 117M user passwords**, May 2016. F17; this source does not establish the 2016 file’s hash format.
- The users and lookup records shown in the 3D sets are illustrative computations, not records taken from either breach.

## Validation

- TypeScript: `bunx tsc --noEmit` passes; two consecutive final clean review/verification passes completed before commit.
- Spec integrity: all 23 beat IDs / VO / order and all 5 scene metadata records match the starting `C.json`.
- All 20 initial shots rendered individually at their narration-derived durations through `tools/render.sh gallery <absolute-output> --gl=angle`. One full-size frame from every initial shot was opened and inspected. Corrected renders complete. All 112 text/container alignment checks across 20 shot files pass; all 112 crops and six-key-frame motion strips were inspected. The final narrated preview contact sheets were inspected.
- Independent review: reserved for the lead’s different model. `tools/review/second-look.sh` was not invoked.

## Rendered bit-pattern verification

The S06 mango output also passed independent sampling of all 256 bits against hashlib (123 one-bits). Independent pixel sampling at the centres of all 256 holes in the rendered comparison cards passed: `C-S07-01.mp4` frame 600 had exactly 146 red cells, all at the computed hunter2/hunter3 XOR positions (256/256 decisions agree); `C-S10-04.mp4` frame 170 had exactly 136 red cells, all at the computed salted SHA-256 XOR positions (256/256 agree).

## Shared additions

- `PunchedCard.titleScale`: optional larger labels with a suitable baseline; the default title size and baseline are preserved exactly.
- `Machine.largeLabel`: optional larger name and algorithm plates; existing callers retain their original plate sizes.

## Capture fixes

- Separated fixed-length outputs, moved the machine aside, and lowered enlarged card headings to avoid clipping.
- Moved the precomputed input clear of the machine’s side panel.
- Enlarged user-drawer and lookup-wall labels for full-resolution readability.
- Trimmed already-cut glyph fragments from the provided evidence crops in the C wrapper, preserving the shared assets. Added a magnification of the original 2016 source paragraph rather than inventing a new number card.
- Kept both salt lookup states on SHA-256 so the missed lookup is explained by the salt. The scan completes before the hit drawer opens, or before the salt tables multiply.

## Narrated preview

`episodes/ep01-password-storage/out/seg-C.mp4` is the five-scene narration preview (146.645 seconds; H.264, 1920×1080, 30 fps, AAC). Final preview media checks found no black interval and no freeze longer than eight seconds. The only >2-second silence is the intentional final tail, 144.041–146.645 seconds.

The original narration is retained at its existing level: **−22.2 LUFS integrated, −2.9 dBFS true peak**. This is an unmastered worker preview, below the full-episode video-QA loudness target. Apply final loudness mastering to the assembled episode; this worker did not change the script or voice assets.

## Review handoff

- Full-size stills: `/tmp/C-frames/C-S*.png`.
- Six full-size key frames per shot: `/tmp/C-keys/C-S*/01.png` through `06.png`; motion strips are `/tmp/C-keys/C-S*.png`.
- Alignment checks: `tools/review/checks/C-S*.json`; run with `tools/tts/.venv/bin/python -I tools/review/align.py episodes/ep01-password-storage/out/<shot>.mp4 tools/review/checks/<shot>.json --crops /tmp/C-rev/<shot>`.
- The lead’s different-model frame review is intentionally pending. No invocation of `tools/review/second-look.sh`.
