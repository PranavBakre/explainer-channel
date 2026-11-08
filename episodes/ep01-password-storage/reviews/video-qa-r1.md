# EP01 — video QA r1 (final cut `out/ep01.mp4`)

## Technical

| Check | Target | Result |
|---|---|---|
| Duration | 9:30–11:00 | **10:22.3** (622.3 s) — PASS |
| Format | H.264 1920×1080 30 fps, AAC 48 kHz stereo | PASS (CRF 20, 124 MB, faststart) |
| Loudness | −16 LUFS integrated, true peak ≤ −1 dBFS | **−16.0 LUFS**, peak −1.4 dBFS, LRA 2.4 LU — PASS (raw render was −22.3 LUFS; two-pass `loudnorm`, video stream copied) |
| Black frames | none ≥ 0.5 s | 0 — PASS |
| Silence | none ≥ 2 s at −45 dB | 0 — PASS |
| Transcript vs script | WER ≤ 10%, no wrong terms | ≈10% raw, nearly all number formatting ("2009" for "two thousand nine"). Real mishearing fixed before final: "a salt" → "assault" (reworded). Residual: "LinkedIn" once heard as "linked and", "Feed it" as "feed at" — PASS with notes |
| Static holds > 10 s | none | **FAIL (known): 15 holds**, measured with a blurred `freezedetect` (grain defeats the plain filter). Down from 20 after a 3% push-in per shot. Longest: S17 HIBP (8:50) and S13 slow hashes (6:16). |
| Safe areas | content ≥ 96 px from sides, above bottom 15% | PASS on every shot, measured on stills at 70% of each shot |

## Visual

Second-model review: `video-visual-codex.md` (Codex, from MP4 frame sheets). Scores: legibility 2, hierarchy 4, style 4, safe areas 5, overlaps 5, diagram correctness 3 (provisional), change rate 2.

Fixed after that review:
- Underscaled content: per-visual scale (1.05–1.5×), re-verified against safe-area margins.
- Passwords in red (`123456`, S02/S18) broke the "passwords are amber" rule → amber.
- Static holds partly mitigated with a slow push-in.

Not fixed in ep01 (carried to ep02 as storyboard rules, see LEARNINGS):
- Avalanche shows two hashes without highlighting changed positions.
- Lookup match needs a large aligned comparison.
- Log bars understate orders of magnitude; time comparison should be the hero.
- S17 HIBP sequence too quiet; NIST quote cards run four in a row.
- Recap is a text list instead of transforming the same row.

## Verdict

**Ship-able first cut with known pacing debt.** Every technical gate passes except static holds. The script gate passed after 5 Codex rounds (`script-r5-codex.md`). A human listen end to end is still required before upload; no person has heard the narration.
