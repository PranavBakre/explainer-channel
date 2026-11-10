---
name: package-review
description: Gate an episode's YouTube package before upload — title, thumbnail at feed size, title/thumbnail pairing with a blind ranking, first-30-second promise, description with chapters, sources and asset credits, and the AI-disclosure decision — writing a PASS/FAIL/BLOCKED report tied to the exact video file. Use after video-qa passes, when writing or changing a title, thumbnail or description, or before any upload.
---

# Package review (gate)

Output: `episodes/<ep>/reviews/package-<round>.md` (committed). Verdict: **PASS**; **FAIL** = a fixable package error (fix, rerun); **BLOCKED** = evidence missing or a decision only the operator can make (a licence, a policy call).

## 0. Preconditions (else BLOCKED)
- `shasum -a 256 out/<ep>.mp4` equals the checksum in the latest `reviews/video-qa-*.md`, and that report's verdict is PASS. A re-render after QA voids both.
- `out/chapters.txt` and `out/captions.srt` come from the `build-episode.ts` run that produced that render.

## 1. Checks (one row each, with evidence)
| Check | Pass | Evidence to record |
|---|---|---|
| Title | ≤ 60 chars; a claim or puzzle the video pays off in full | the line that pays it off |
| Thumbnail | readable at 1280×720 and at 168×94; ≤ 4 words; one focal object; built in code | both sizes attached |
| Pairing | thumbnail adds an angle the title does not state | one sentence on each |
| Blind ranking | a different model ranks our thumbnail+title among 5 current ones from the niche, unlabelled, randomised order; ours in the top 3 | the 6 images, the order shown, the ranking. Not run → BLOCKED, never PASS |
| Promise | the first 30 s states what the title promises | quoted line + timestamp |
| Chapters | the description's chapters equal `out/chapters.txt` exactly, first at 0:00 | `diff` output (ep01's description drifted by 1 s from rebuilt chapters) |
| Sources | every fact behind an on-screen claim, with its URL from `factsheet.md`; nothing the video does not use | fact ids |
| Credits | every third-party asset in the final video: author, URL, licence, what we changed (edited Lottie names its original). From `video/public/assets/credits.json`, which stays local; copy the used entries into this report. Entries marked "test only" or with unclear provenance → BLOCKED | the copied entries |
| Disclosure | decided from YouTube Help "Disclosing use of altered or synthetic content", opened today; consider realistic synthetic people, places, events, voices and music | URL, date opened, decision, reason |

## 2. After the verdict
Any change to the video, title, thumbnail or description voids the matching rows; rerun them in a new round.

## NEVER
- Never list a source the video does not use, or omit one it shows.
- Never carry a disclosure decision forward from an earlier episode or a summary of the policy; the assets and the policy both change.
- Never upload or publish from this skill; the operator uploads.
