---
name: package-review
description: Gate an episode's YouTube package before upload: title, thumbnail at feed size, title/thumbnail pairing with a blind ranking, first-30-second promise, description with chapters, sources and asset credits, and the AI-disclosure decision — writing a PASS/FAIL/BLOCKED report tied to the exact video file. Use after video-qa passes, when writing or changing a title, thumbnail or description, before any upload, and 24 hours and 7 days after publishing to log real views, CTR, view duration and retention against the reviewers' predictions.
---

# Package review (gate)

Output: `episodes/<ep>/reviews/package-<round>.md` (committed). Verdict: **PASS**; **FAIL** = a fixable package error (fix, rerun); **BLOCKED** = evidence missing or a decision only the operator can make (a licence, a policy call).

## 0. Preconditions (else BLOCKED)
- The video is the exact file the latest `reviews/video-qa-*.md` passed, and `out/chapters.txt` and `out/captions.srt` come from the build that made it (how to check: `docs/ops.md` §3). A re-render after QA voids both.
- `upload.md` was written for that cut and the current `script.md` revision. After a rebuild, rewrite the description and drop sources for claims the script no longer makes (ep03's screen-first rebuild).
- This skill, and `dumbledore-creative` for §1a, run in full however late in the session or after a context compaction; a sub-agent's brief names both skill files. Ep03's package came at the end of a long session and the operator asked "why are you not using the skills? you were using them properly last week" (2026-11-15).

## 1. Checks (one row each, with evidence)
| Check | Pass | Evidence to record |
|---|---|---|
| Title | ≤ 60 chars; a claim or puzzle the video pays off in full | the line that pays it off |
| Thumbnail | readable at 1280×720 and at 168×94; ≤ 4 words, counting every visible word (ep03's "word-free" address carried seven in its form labels); one focal object; made as §1a says; shares the video's subject and colours (it promises what the first five seconds deliver) without being built from the video's screens; every word set in code, no generated text | both sizes attached, beside a frame from the first five seconds; the reference sheets and art-direction brief from §1a |
| Pairing | thumbnail adds an angle the title does not state | one sentence on each |
| Blind ranking | a model of a different family from the package's author (image route in `docs/ops.md` §1) ranks our thumbnail+title among 5 current ones from the niche, unlabelled, randomised order; ours in the top 3. The key to the order sits outside the folder the ranker reads until it has answered | the 6 images, the order shown, the ranking; any claim about the neighbours checked against the saved images (ep03's draft said all showed "passkeys"; three did). Not run → BLOCKED, never PASS |
| Promise | the first 30 s states what the title promises; a question title is asked there, not first at 0:56 as on ep02 | quoted line + timestamp |
| Chapters | the description's chapters equal `out/chapters.txt` exactly, first at 0:00, every name in the viewer's words (ep02 shipped "Callback and exit") | `diff` output (ep01's description drifted by 1 s from rebuilt chapters) |
| Description length | ≤ 5,000 characters, counted by a script that finds the block itself (a heading containing "END DESCRIPTION" made a naive search count zero) | the script and its count |
| Sources | every fact behind an on-screen claim, with its URL from `factsheet.md`; nothing the video does not use; each label as narrow as the line the video says (ep03: "no password to steal" and "can't be shared" were wider than the cut's claims) | fact ids |
| Credits | every third-party asset in the final video, sounds and music included (recorded when added, `video-build` §4): author, URL, licence, what we changed (edited Lottie names its original). From `video/public/assets/credits.json`, which stays local; copy the used entries into this report. Entries marked "test only" or with unclear provenance → BLOCKED | the copied entries |
| Disclosure | decided from YouTube Help "Disclosing use of altered or synthetic content", opened today; consider realistic synthetic people, places, events, voices and music | URL, date opened, decision, reason |

## 1a. Making the thumbnail
- Make it with `dumbledore-creative` (`~/.claude/skills/dumbledore-creative/`), every step, with a fresh reference search for this episode's topic. A brief to a sub-agent names that skill file and requires each step; a brief that names only this skill gets a thumbnail built without one. Three ep03 rounds made that way each ranked 5th or 6th of 6.
- Do not build it from the episode's own screen components. Small interface, icon diagrams and many small cards were the weak group among 82 references, and three such ep03 thumbnails ranked last on the rail. Generate the picture with the image model, with no text in it, and set the words in code.
- Starting hypothesis for a faceless explainer in the YouTube feed (82 references, 2026-11-15; rankings by one model reviewer, not click-through data): one hero object under real directional light; a metaphor the viewer already knows (for phishing, the hook) or a short claim the title does not make; two or three very large words, never the title. Recheck it against the new references each episode.
- The image must carry the whole claim, not only the topic. ep03's "NICE TRY" (a sign-in page in disguise) had one hero and two big words and still missed: nothing showed the passkey refusing it. "NOT BITING" (baited hook, fingerprint phone not taking it) showed both sides and ranked 4th of 10.

## 2. After the verdict
Any change to the video, title, thumbnail or description voids the matching rows; rerun them in a new round.

## 3. After publishing: real viewers
At 24 hours and at 7 days (6 hours too, if someone is looking), read YouTube Studio for the episode (read only) and log in `LEARNINGS.md`, under the episode, in the same entry as `video-qa` §6:
- views, against the channel's normal at the same age; impressions click-through rate (CTR); average view duration and average percentage viewed;
- the retention curve's drop points (timestamp, share lost), plus the share still watching at 0:30;
- the cold viewer's predicted click-aways marked hit or miss, and the hit rate per reviewer (`video-qa` §6 says how);
- the blind ranking's call against real CTR: where ours ranked, and whether its CTR sits above or below the channel's normal. Keep a running count of how often the ranker's top-3 call matched an above-normal CTR;
- the comments, saved as text, and what worked and what failed.
A number Studio does not show is written as NOT CHECKED with the reason; never estimate it. These numbers, not rubric scores, are how the skills are judged (`GRADES.md` is frozen).

## NEVER
- Never list a source the video does not use, or omit one it shows.
- Never carry a disclosure decision forward from an earlier episode or a summary of the policy; the assets and the policy both change.
- Never upload or publish from this skill; the operator uploads.
