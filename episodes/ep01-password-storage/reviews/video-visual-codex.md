# EP01 — independent visual review

**Verdict: revisions needed.** The episode has a coherent visual identity and a clear conceptual sequence, but too often presents a small slide in the middle of a large dark frame. The mechanisms need to become the visual event. Brand consistency is ahead of legibility, explanatory animation, and compositional variety.

Reviewed the supplied final-MP4 15-second contact sheet, eight-frame S03 wipe strip, and two sheets sampling every shot at 70%. Read `video-qa/SKILL.md`, `brief.md`, and `storyboard.md` for shot/time identification. Timecodes below are storyboard anchors, not frame-accurate measurements of the final encode. This is a visual review, not an automated or audio QA pass. Contact-sheet downscaling limits judgments about original-resolution sharpness; no native 360px-wide playback test or continuous-motion inspection was performed.

## Visual rubric

| Row | Score / 5 | Evidence |
|---|---:|---|
| Legibility at phone size | **2** | Headlines survive the sheets, but hash outputs, database cells, benchmark qualifiers, and source lines become texture; S06–S10 and S14 are particularly vulnerable. Phone-size compliance remains unverified. |
| Hierarchy: one focal point | **4** | RockYou’s number, `123456`, Salt, and Argon2id have unmistakable focal points; the recap and multi-row comparisons distribute attention without a strong active step. |
| Consistency with style bible | **4** | Ink, cream, serif headlines, mono technical content, and semantic red/teal recur consistently; red `123456` and multi-accent frames conflict with literal brief rules. |
| Text inside safe areas | **5** | In the supplied samples, meaningful content stays comfortably inside the frame and above the bottom exclusion zone; excessive inset is the larger problem. |
| No overlaps / clipping | **5** | No visible text collisions, cropped labels, or broken table boundaries in the supplied samples; this does not certify unsampled transition frames. |
| Diagram correctness vs fact sheet | **3 — provisional** | Guess → salt → hash → compare and distinct salts producing distinct hashes are conceptually coherent; the samples do not expose enough detail to validate exact strings or parameters against VERIFIED factsheet lines. |
| Visual change rate: no static stretch >10s | **2 — provisional** | The S03 wipe strip is almost identical until the line arrives, and several long beats retain the same composition across samples; the sheets raise a pacing concern but cannot establish an exact static-frame duration. |

Scores are ordinal judgments, not an aggregate gate score. Diagram verification and the >10-second motion check remain evidence gaps; neither is certified as passing.

## Concrete defects and concerns

1. **Technical information is consistently underscaled — S06_02 (2:33), S07 (2:55), S09_03 (3:47), S10_04 (4:35), S14_03 (7:04).** The hash machines, lookup table, salt comparison, and stored Argon2 string occupy narrow horizontal islands. The full hash is given space as text without enough visual emphasis on the part the viewer should compare. Enlarge the mechanism, isolate the relevant substring, and distinguish “must read” content from authentic background detail. Native paused-frame readability still needs checking.

2. **The avalanche is asserted more clearly than it is shown — S07 (2:55–3:16).** Two long cream hash strings look similarly noisy in the sampled still. The changed input digit and the changed output positions do not have a strong visible correspondence. Keep the exact output available, but highlight changed positions or add a bit-difference view so the 146-bit claim has a visual demonstration.

3. **Lookup-table matching lacks a large, obvious comparison target — S09_03–05 (3:47–4:09).** The stolen hash is separated from a dense, miniature table. A red row indicates the result, but reading the equality requires inspecting tiny strings. Pull the matching fingerprint into a large shared alignment, then reveal its password beside it.

4. **Log bars visually understate the breakthrough — S12_02 (5:29), S13_04–06 (6:15–6:45).** Billions, hundreds of thousands, and thousands appear as bars of moderately different lengths. That can be mathematically legitimate on a log scale, but the scale explanation is too subordinate in the sheets. A casual viewer can read a modest slowdown where the labels describe orders of magnitude. Make the logarithmic encoding explicit and promote the 17 seconds → months → years comparison to the main visual.

5. **The salt explanation spends its strongest comparison on tiny outputs — S10_04 (4:35).** Repeated amber passwords and distinct teal salts are useful, but the outputs remain small strings rather than the focal outcome. Align the identical passwords, animate each salt joining its input, and reveal two large visibly different fingerprints. This is a diagram-design weakness, not evidence that the hashing is wrong.

6. **The breached-password check is visually too quiet for its complexity — S17 (8:49–9:13).** Two dark panels and a short prefix do not make the request/response/local-check sequence immediately apparent. The sampled states underplay the returned list of suffixes and the local match. Show a large five-character prefix moving out, multiple suffixes returning, and the final comparison staying on the device.

7. **Standards cards become a run of similar reading tasks — S16_02–05 (8:08–8:49).** The teal rule and highlighted words establish a reliable quotation format, but four centered prose cards in succession flatten the visual progression. The longest blocklist quotation is especially dense. Retain the exact cited quotation as supporting evidence while making one short practical rule the dominant element of each beat.

8. **The act wipe has little explanatory or spatial payoff — S03 around 0:51.6.** Seven supplied strip frames largely repeat the outgoing centered text; an amber vertical line appears near the right edge in the last sample. There is no visible tear, clipping, or broken frame in this strip, but it does not show a satisfying reveal of the incoming act. Inspect the complete boundary at native size before changing the implementation; these eight frames do not prove a transition glitch.

9. **Password color breaks the stated invariant — S02_03 (0:30) and S18_03 (9:31).** `123456` is red although the brief says passwords are always amber mono. Red use is semantically understandable as exposure, but the exception weakens the recurring password object. Keep the literal password amber and put exposure emphasis on its container or annotation, or explicitly revise the style rule.

10. **The brief’s accent-color restriction and actual visual grammar disagree — S10_04, S13 race bars, S18_01 (9:13).** Amber/teal and red/teal combinations communicate useful comparisons, but violate “more than one accent colour per frame.” Preserve purposeful semantic comparisons and clarify the style bible for episode 2 rather than treating every mixed-accent frame as an aesthetic failure.

11. **The recap compresses the causal chain into a text list — S18_01 (9:13–9:31).** Five colored lines summarize the argument, but discard the table/password object that could connect each failure to the next fix. Transform the same database row through the five storage methods and expose one failure at a time.

12. **Long holds need continuous-motion verification — S03 table (0:58–1:26), S06 hash machine (2:33–2:55), S13 bars (6:15–6:45), S18 checklist (9:45–10:12).** Entry reveals alone may leave substantial stretches without meaningful change. The sampled similarities warrant checking these spans first; they do not establish a measured freeze or a definite >10-second violation.

The black unused cells in `shots-2.jpg` are contact-sheet padding, not evidence of black video frames. Likewise, the final black tile in the 15-second sheet is insufficient to diagnose an unintended ending without the extraction range and final-frame check.

## Top three visual changes for episode 2

1. **Design the essential explanation at 360px width first.** Give each beat one large readable claim or mechanism; expand diagrams across the useful frame instead of preserving broad empty margins. Keep full strings and citations as secondary details, with deliberate close-ups when they matter. Verify native 1080p paused frames and actual 360px playback before rendering the full episode.

2. **Carry one object through a visible causal transformation.** Keep the same user row or token on screen as each method changes. Animate the operation and its failure: input joins salt, guess becomes fingerprint, fingerprint matches a row, prefix leaves the device and suffixes return. Reserve text cards for conclusions and evidence, rather than using them to carry the mechanism itself.

3. **Build a progression of meaningful visual events through each long explanation.** Change the active comparison, scale, highlighted substring, or diagram state at the relevant narration beat; shorten holds that have finished teaching. Use a large time comparison for speed differences and a clean incoming-state reveal at act boundaries. Audit every >10-second hold in the actual MP4; decorative grain or a pulsing border does not count as explanatory change.
