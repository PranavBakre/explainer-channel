---
name: video-qa
description: Gate a rendered explainer MP4 (whole episode) or a single new or edited shot — automated checks (format, loudness, black, grain-resistant freeze, silence, transcript), a runtime-wide contact sheet, cross-shot data consistency, pixel alignment of text in containers and a second-model visual review, with a dispositioned report. Use after every full render, after a shot is built or edited, and before calling an episode done or packaging it.
---

# Video QA (gate)

Output: `episodes/<ep>/reviews/video-qa-<round>.md`: each check PASS/FAIL with evidence, each finding with a disposition (fixed / accepted with reason / rejected with reason), and a verdict.

## 1. Automated (whole episode)
```
V=episodes/<ep>/out/<ep>.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json $V
ffmpeg -i $V -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary
ffmpeg -i $V -vf blackdetect=d=0.5:pix_th=0.05 -an -f null - 2>&1 | grep black_start
ffmpeg -i $V -vf "scale=320:-1,gblur=sigma=2,freezedetect=n=0.002:d=2" -an -f null - 2>&1 | grep -E 'freeze_(start|duration|end)'
ffmpeg -i $V -af silencedetect=n=-40dB:d=2 -f null - 2>&1 | grep silence_start
tools/tts/.venv/bin/python tools/tts/transcribe.py $V > /tmp/transcript.txt
shasum -a 256 $V      # record in the report; any re-render invalidates it
```
Plain `freezedetect` reported 0 freezes under animated grain while a reviewer saw long holds; the blur pass found 20. Detect at 2 s, then classify: > 8 s FAIL, 2–8 s listed and judged against the beat's visual change.
| Check | Pass |
|---|---|
| Duration | inside the brief's target |
| Format | h264, 1920×1080, 30 fps, AAC |
| Loudness | −16 ± 1 LUFS integrated, true peak ≤ −1 dBTP |
| Black / silence | none unintended |
| Freeze | no hold > 8 s; holds of 2–8 s listed with timestamps and judged |
| Transcript | every script sentence present in order (normalize numbers; Whisper writes "$50 billion") |

## 2. Contact sheet across the whole runtime
```
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $V)
N=$(python3 -c "import math;print(math.ceil($D/6))")
ffmpeg -v error -i $V -vf "fps=1/6,scale=320:-1,tile=10x$(( (N+9)/10 ))" -frames:v 1 /tmp/sheet.png
```
Look for: one focal point per frame, legibility at 360 px wide, props consistent with their meaning and colour all episode, nothing in the bottom 15 %, and medium runs: three or more neighbouring tiles of the same document (even with a different highlight) is a FAIL against the storyboard's 12 s limit.

**Floating captions.** List every caption that is not printed on a prop, with its timestamp. For each, `ffmpeg -ss <t> -i $V -frames:v 1 -vf scale=360:-1 /tmp/cap-<t>.png`, read it at that size, and sample ink and background for contrast ≥ 4.5:1. Ep01 passed the size rule and shipped four captions nobody could read on a phone (pale thin serif on a pale set, red on brown and teal).

## 3. Cross-shot data consistency
List every on-screen value that recurs (hashes, ciphertexts, counts, names, the running example) with its shots. Each must match its fact or recorded computation exactly. Ep01's recap showed a ciphertext from an older key while the lockbox shot showed the current one; neither a contact sheet nor a reviewer caught it until the values were listed side by side.

## 4. Second-model visual review
Pick key frames from the built timing (`video/src/episodes/<id>.json`): each shot's first full reveal and its 70 % frame, plus every act boundary. Two independent passes by a model family other than the one that built the video, never shown your own verdict. Claude built it → the Codex commands below (Codex down → `opencode run` with a Cerebras or NVIDIA vision model, or the gate stays closed). Codex built it → the same prompts through Claude, which reads the frame files itself:
`claude -p "Read each of these frames: <abs paths>. <same prompt>. Print the complete review, every frame number with defects or clean." --model claude-opus-5-5 --allowedTools Read < /dev/null > <same report path>` (prompt before `--allowedTools`, which is variadic and swallows it otherwise)
Neither family available → §4 is incomplete and the gate stays closed.
- **Spatial polish:** `tools/review/second-look.sh $V <frames…> > episodes/<ep>/reviews/second-look-<round>.md` (clipping, centring, labels, arrows; several minutes, run in the background). The helper exits nonzero if Codex fails or any frame number is missing from the review; then rerun it, never disposition a partial file.
- **Explanation and pacing:** write the frames to a folder and run
  `codex exec --skip-git-repo-check -s workspace-write -C <repo> "Review these frames of episodes/<ep> against brief.md and storyboard.md: does each frame show the mechanism its narration describes, keep each prop's meaning and colour, and change every beat? Write findings with frame numbers to episodes/<ep>/reviews/video-visual-<round>.md; print DONE." --image <abs paths, comma-separated> < /dev/null`
- **Cold viewer** (whole episode; the other two passes know the plan and so never ask "would I keep watching"). The reviewer gets only phone-width contact sheets and the captions: no script, brief or fact sheet.
  ```
  D=$(mktemp -d /tmp/cold.XXXX); cp episodes/<ep>/out/captions.srt $D/
  ffmpeg -v error -i $V -vf "fps=1/7,scale=360:-1,tile=6x4" $D/sheet_%02d.jpg
  codex exec --skip-git-repo-check -s workspace-write -C $D "You are a YouTube viewer who watches explainers to learn and to be entertained. You know nothing about how this video was made. Attached are contact sheets of it (one frame every 7 seconds, left to right, top to bottom, each frame at phone width); its captions are in captions.srt in this folder. Write viewer.md with: (1) would you finish it, and would you subscribe; (2) the three timestamps where you would click away, and why; (3) on-screen text you needed in order to follow the point and could not read, with timestamps; (4) questions the video raised and never answered; (5) what you would tell a friend it said, in two sentences. No praise and no production advice. Print only DONE." --image $(ls $D/sheet_*.jpg | paste -sd, -) < /dev/null
  cp $D/viewer.md episodes/<ep>/reviews/viewer-<round>.md
  ```
  About two minutes. Disposition every click-away and every unanswered question: a click-away that two rounds repeat goes back to `script-writing` or `storyboard`, not into "accepted". On ep01 it found a drop-off the author's own viewing missed (5:45, a second round of benchmark arithmetic).
Wait for all three files; a missing or truncated review is a FAIL of §4, not an absence of findings.

## 5. Per-shot alignment loop (each new or edited shot)
1. Render the shot alone (gallery item with its real `duration`) to `out/<shot>.mp4`.
2. Write `tools/review/checks/<shot>.json`: one entry per text-in-a-container at a frame where it is fully shown: `region`, container colour `box`, text colour `ink` (sample the rendered ink; lighting shifts plate colours), `align: left` for left-set text, `inset` ≥ border width.
3. `tools/tts/.venv/bin/python -I tools/review/align.py out/<shot>.mp4 tools/review/checks/<shot>.json --crops /tmp/rev`. It fails if the text centre is > 8 % off or within 3 px of an edge. Open every crop: equal padding on all sides means the border was measured, so raise `inset`. Check every text state (typed vs masked), not only the first.
4. Second look on the shot's start, each motion beat and end frame.
5. Fix in the generator, re-render, rerun from 3. Done when no measured FAIL and every second-model finding is fixed or rejected with a written reason.

A shot pass covers only §5 and §2's caption check for that shot; it never stands in for the episode gate.

## Verdict
PASS only when §1 passes; §2 has no FAIL (holds, medium runs, captions at 360 px); §4's reviews are complete and each finding is fixed or rejected with a reason; §5 passed for every shot changed since the last episode PASS, §3 has no mismatch, and every finding has a disposition. Any fix → re-render → new checksum → rerun §1 and every check touching the changed shots or a shared component they use.

## NEVER
- Never judge holds from a contact sheet alone; it hid 10–23 s static stretches.
- Never review only at 1920 px; design and judge at phone size first.
- Never accept a finding silently; an accepted hold or deviation needs a written reason in the report.
