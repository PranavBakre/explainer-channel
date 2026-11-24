# Reference baseline

Model: claude-opus-5-5. Started 2026-11-24 from `docs/reviews/2026-11-24-video-quality-review.md` §6.

The channel's measured target: the ranges of two or three faceless explainers the operator admires. `video-qa` §1b compares every render to these ranges and fails anything outside them unless the operator signs off in the QA report.

A reference counts only for the format it is evidence for (operator, 2026-11-13: "this depends on the type of video/channel as well"). Each slot names its format; an episode is compared only with references of its own format, as the brief names it.

## Slots (the operator picks; empty until measured)

| Slot | Channel and video (URL) | Format | Picked by | Measured on |
|---|---|---|---|---|
| R1 | (operator to name; Fireship is one example) | | | |
| R2 | (operator to name; ByteByteGo is one example) | | | |
| R3 | (operator to name; Kurzgesagt is one example) | | | |

Fireship, ByteByteGo and Kurzgesagt are suggestions only: three different paces (fast code jokes, steady diagram builds, illustrated science). Pick the ones whose videos you would like this channel's to feel like, then pick one long video from each that did well on that channel.

## What to measure, and how

Measure each reference for its first 60 seconds and for the whole film.

| Measure | How | First 60 s | Whole film |
|---|---|---|---|
| Cuts per minute | `python3 tools/qa/pace.py <video>` (scene score over 0.3) | per ref | per ref |
| Picture changes per minute | same tool (more than 8 % of the frame changes in a half-second step) | per ref | per ref |
| Voice words per minute | `tools/tts/transcribe.py <video> --words w.json`, then `pace.py --words w.json` | per ref | per ref |
| When music first enters (s) | by ear, with the timestamp written down; music under the voice cannot be split out of a mixed file reliably with our tools | per ref | n/a |
| Smallest must-read text (px cap height at 1080p) | `tools/qa/text_size.md` | per ref | per ref |
| Longest hold (s) | `python3 tools/qa/static_holds.py <video>` (`longest_still_s`) | per ref | per ref |

Download a reference at 1080p for measuring only, keep it outside the repo, and delete it after; record only the numbers here.

## Ranges (fill after measuring)

The range for each measure is from the lowest to the highest reference value, widened by 10 % either side so one reference does not set a hard edge. With only one reference measured, the range is that value plus or minus 20 %, and is marked provisional.

| Measure | R1 | R2 | R3 | Range used by `video-qa` |
|---|---|---|---|---|
| Cuts per minute, first 60 s | | | | |
| Cuts per minute, whole | | | | |
| Picture changes per minute, first 60 s | | | | |
| Picture changes per minute, whole | | | | |
| Voice wpm, first 60 s | | | | |
| Voice wpm, whole | | | | |
| Music enters (s) | | | | |
| Smallest must-read text (px) | | | | at least 30 in every case |
| Longest hold (s) | | | | under 4 in every case |

Two floors hold whatever the references show: text at least 30 px cap height at 1080p, and nothing still for 4 s or more (`video-qa` §1).

Earlier numbers kept for context, not as ranges: the faceless incident-story reference studied on 2026-11-13 measured 0.1 cuts and about 4 picture changes a minute, and ep02 measured 4.7 and 12 (the study file itself is not in this repo).

## The gate

Until the slots are measured, `video-qa` §1b is NOT CHECKED, and the episode cannot pass on it; the operator may sign off on shipping without it, in the QA report.
