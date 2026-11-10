# Segment D — S11–S14

Worktree `seg-D`, branch `seg/D`. All four scene IDs, act/title/transitionIn values, and all 22 beat IDs/VO strings are preserved from the current storyboard. No script or voice files were edited.

## Per-shot choices and sources

| Beats | Mode / component | On screen and reason | Source |
|---|---|---|---|
| S11_01 | 3D MachineSet / DAttack `salt` | Repeated password cards enter the hash machine beside a fixed `e05b13d8` salt chip. The machine remains the hash function. | F20–F22; F43; salted digests computed below |
| S11_02 | 3D MachineSet + LightTableSet / DAttack `loop` | Guess cards feed the machine; two real salted guess digests overlay the leaked digest. Red differing holes trigger the next comparison. | F12, F20, F43; computed salted SHA-256 |
| S11_03–04 | 3D heap / DHeap | A 100-card illustrative heap splits into about-half names/words/patterns and about-half other choices. Likely guesses feed the slot first; the first-ranked card is `123456`, with its real 290,731 account count. | F3, F4 (Imperva). The 50/50 mass is rounded, not an exact measured fraction. There are no invented individual category shares or ranks. |
| S11_05 | 3D MachineSet / DAttack `fast` | The same salt remains fixed as guesses now feed at high speed. | F23; schematic speed, not one drawn card per real guess |
| S12_01 | 3D GPU bench / DGPUBench `intro` | One graphics card on a bench, moving fans and a hashcat v6.2.6/24 GB instrument plate. Hardware is the attacker's hardware. | F23 benchmark hardware header |
| S12_02–03 | DocShot / DEvidence `fast` | Real hashcat page, then `hc-md5.png`, `hc-sha1.png`, `hc-sha256.png` as their rates are spoken. | F23; `hashcat.png`; credits.json / Chick3nman RTX 4090 gist |
| S12_04 | 3D GPU bench / DGPUBench `space` | A mechanical drum counter rolls to **2,821,109,907,456**. Its plate limits the search to eight characters from a–z/0–9. | Computed 36⁸; F24 |
| S12_05 | 3D GPU bench / DGPUBench `times` | A physical stopwatch performs three accelerated runs, ending at ~17 s / <1 min / ~2 min, beside the same GPU. | F23 rates → arithmetic below. Full-space estimates, one GPU; animation time is compressed. |
| S13_01–03 | 3D machine / DSlowMachine `cost` | Gears engage; the cost dial turns from 5 to 10 and gear rotation slows to 1/32 of its initial rate; the plate changes to BCRYPT · 1999 at the third beat. | F25, F26, F38. Dial is explanatory; the following measured benchmark explicitly returns to cost 5. |
| S13_04 | DocShot → 3D GPU calendar / DSlowBenchmark `bcrypt` | Real `hc-bcrypt.png` shows 184.0 kH/s and Iterations:32, then a desk calendar turns printed pages toward ~177 days beside the same GPU. | F23, F24; cost 5 = log₂32, **not** OWASP's cost-10 minimum. |
| S13_05 | 3D machine / DSlowMachine `memory` | SCRYPT · 2009; drawers must fill per cycle. Cost dial reads 2¹⁴ for the later tested setting. Drawers represent memory use, not literal GPU capacity or measured throughput. | F25, F39; N=16384 from F23. No r/p or memory quantity invented for this benchmark. |
| S13_06 | DocShot → 3D GPU calendar / DSlowBenchmark `scrypt` | Real `hc-scrypt.png` shows 7126 H/s and Iterations:16384, then the calendar turns printed pages toward 12.5 years. | F23, F24; same full search space, tested N=16384, not OWASP's stronger minimum. |
| S14_01 | DocShot / DEvidence `owasp` | Real `owasp.png` followed by `owasp-quote.png`, with its actual highlighted Argon2id recommendation. | F26; competition-winner narration from F25 |
| S14_02 | 3D machine / DSlowMachine `argon` | Memory drawers, a 19 MiB gauge, parameter plate m=19456/t=2/p=1 and two passes. No Argon2 GPU-rate claim. | F26 (19456 KiB / 1024 = 19 MiB); F42 |
| S14_03 | 3D drawer / DRecipe | Your card stands above grocery_app.users with the **full original Argon2id string**, wrapped at `$` boundaries without dropping characters. Algorithm/settings, salt, then hash highlight in narration order. | Current storyboard S14 CodeCard and S01 prefix; F42 |
| S14_04 | 3D machine → drawer / DRehash | Dial rises t=2 → t=3 at login; a newly computed real t=3 card is re-filed. | F38; local argon2-cffi computation below (same demonstrated salt to isolate the changed cost) |
| S14_05 | 3D drawer + vault / DPepper | A copy of the users drawer leaves; its row shows the real abbreviated `$argon2id$…` prefix. The closed PEPPER safe remains outside it. Secret contents are never printed or copied. | F32 |
| S14_06 | 3D machine / DSlowMachine `final` | A leaked Argon2id fingerprint card, memory drawers and slow gears; a single password guess enters the machine. Punched holes encode the real F42 tag bytes, not SHA-256. | F27, F42; base64-decoded Argon2 tag |

## Arithmetic re-derived from the source crops

Search alphabet: 26 lowercase letters + 10 digits = 36 symbols. Exactly eight positions: **36⁸ = 2,821,109,907,456**. Every time below exhausts that whole space, not average success time (which would be half), not arbitrary passwords, and not a forecast for multiple GPUs.

- `hc-md5.png`: **164.1 GH/s = 164,100,000,000 H/s**. 2,821,109,907,456 ÷ 164,100,000,000 = **17.191407114 seconds**, displayed **~17 s**.
- `hc-sha1.png`: **50638.7 MH/s = 50,638,700,000 H/s**. Space ÷ rate = **55.710551563 seconds**, displayed **<1 min**.
- `hc-sha256.png`: **21975.5 MH/s = 21,975,500,000 H/s**. Space ÷ rate = **128.375231847 seconds** ÷ 60 = **2.139587197 minutes**, displayed **~2 min**.
- `hc-bcrypt.png`: **184.0 kH/s = 184,000 H/s**; Iterations:32, so log₂(32) = **cost 5**. Space ÷ 184,000 = **15,332,119.062260870 seconds** ÷ 86,400 = **177.455081739 days**, displayed **~177 days**. This is the low benchmark setting, not cost 10.
- `hc-scrypt.png`: **7126 H/s**, Iterations:16384 = **2¹⁴**. Space ÷ 7126 = **395,889,686.704462528 seconds** ÷ (86,400 × 365.25) = **12.544987157 years**, displayed **12.5 years**. No extrapolation to OWASP's N=2¹⁷.

The React instrument components compute these values from the exact rates rather than hard-coding the displayed durations. Stopwatch/calendar readings accelerate the passage of time to fit the narration.

## Real digest and recipe checks

- Each guess in `video/src/segments/segD/guesses.json` was recomputed with Python `hashlib.sha256(('e05b13d8' + password).encode()).hexdigest()`. Stored target = SHA-256(`e05b13d8mango@123`) = `324ce3f954f77c01e68347a9e85134bc81b2455b7a852fa022ea6c4b0efea9a8`.
- S14_03's full string is exactly F42 and the current storyboard's full S14 recipe, whose prefix is shown in S01: `$argon2id$v=19$m=19456,t=2,p=1$cE3JU6U6szy6uvAh96bkyw$Pr8MGyxkXWUs/ALFyQ4a+2IS3skjs84BpY4YSDhLGFM`.
- Rehash illustration computed with `argon2.low_level.hash_secret(b'mango@123', base64.b64decode('cE3JU6U6szy6uvAh96bkyw'+'=='), time_cost=3, memory_cost=19456, parallelism=1, hash_len=32, type=Type.ID)`: `$argon2id$v=19$m=19456,t=3,p=1$cE3JU6U6szy6uvAh96bkyw$Geb8qETA4qvN49njY2IlxdUBXvyo542DwrErph8hHCI`.

## Verification log

- Scene/beat contract: PASS. Four scene metadata records and all 22 full beat objects match the current storyboard exactly.
- Data: PASS. Four salted candidate hashes independently recomputed; both Argon2id strings verify for `mango@123`; original recipe equals the storyboard value; final punched tag equals its decoded bytes; 36⁸ and all five rate inputs checked.
- TypeScript: PASS after implementation; repeated after restoring generated files before committing.
- Full-duration gallery: 18 shots rendered at their actual narration-derived duration and steps. Opened the key PNGs, all eight alignment-crop sheets, calendar front/back page-turn frames, and corrected plate-spacing frames.
- Alignment: **187 checks across all 18 shots, PASS**. Moved a low drawer label up. Separated two touching plate borders and re-rendered those shots. Corrected lighting masks to exclude brass borders and include shaded letters. The 8% centering / 3 px edge criteria were unchanged.
- Narration: all 22 lines present and in order; normalized WER **0.25% (1/400 words)**, using written.json plus equivalent acronym/year/number spellings. Word timestamps checked against recipe highlights, rate crops, stopwatch phases and the rehash cut.
- Preview: 179.2 seconds, H.264/AAC, 1920×1080, 30 fps. Final media checks PASS: −16.0 LUFS integrated, −1.9 dBTP; no detected black spans or frozen stretches over 8 s. The only >2 s silence is the intentional closing pause (176.609–179.2 s, 2.591 s).
- Independent review belongs to the lead, per assignment; `second-look.sh` was not used.

## Code and review artifacts

- `video/src/segments/segD/Attack.tsx`: attack loop and proportional heaps.
- `video/src/segments/segD/Bench.tsx`: GPU instruments and real DocShots.
- `video/src/segments/segD/Slow.tsx`: cost/memory mechanisms, recipe, rehash and pepper vault.
- `video/src/segments/segD/props.tsx`: GPU, bench, mechanical counter, stopwatch, turning calendar, drawer and real recipe card.
- `video/src/segments/segD/Inspect.tsx`: gallery adapter for real steps/duration. Optional Freeze is for pose probes; the composition must be longer than its largest frozen frame.
- Shared additions preserve existing defaults: MachineSet gains an attack angle, salt chip and optional larger labels; Plate gains an optional text shift.
- Checks in `tools/review/checks/D-S*.json` target `out/D-shots.mp4`, except `D-S11-3-final.json` → `out/D-S11-3-final.mp4` and `D-S14-2-final.json` → `out/D-S14-2-final.mp4`. These two use shot-local frame numbers after the spacing correction. Run the existing align.py with that video/check pair.
- Temporary gallery and generated episode JSON are restored after rendering. Public asset symlinks, node_modules and credits.json are excluded from the commit.

The grouped ~50% share is rounded from F4. It does not claim separate measured category shares. Instrument time is compressed; rates and final readings are real. No Argon2 GPU throughput is claimed.

Final review outputs: `out/seg-D.mp4`, `out/seg-D-contact-01.png`, `out/seg-D-contact-02.png`, `out/D-transitions.png`, and twelve full-size `out/D-review-*.png` key frames. These captures stay out of Git. Two consecutive final code/spec/typecheck passes were clean.
