# Operations: reviewers, model names, file identity, renders

Model: claude-opus-5-5. Moved here on 2026-11-24 from `AGENTS.md`, `video-qa` and `package-review` so the skills can hold craft, not bookkeeping (`docs/reviews/2026-11-24-video-quality-review.md` §7). The gates themselves stay in their skills; this file says how to run their reviewers and keep their files straight.

## 1. Reviews come from a different model family

- A gate's review comes from a model family other than the author's (Claude, OpenAI, or another such as DeepSeek or GLM).
- **One reviewer per gate by default.** A second, independent reviewer only for `script-review` Accuracy (the fact table), because a wrong fact is the one failure a viewer cannot forgive and a single reviewer has missed facts before. The cold listener and the cold viewer are separate checks, not second reviewers.
- The operator may override the rule for an episode (ep04 did); write the override and its date at the top of the review.

### Routing (author family -> reviewer, in order)

| Author | Text reviews (script, package text) | Image reviews (video-qa §4, thumbnail ranking) |
|---|---|---|
| Claude | Codex (`codex exec`, ChatGPT plan) | Codex, then `opencode run` with a Cerebras or NVIDIA vision model |
| Codex / OpenAI | Claude (`claude -p`), or an `opencode` non-OpenAI model | Claude (`claude -p`, reads frame files itself) |
| DeepSeek or another | GLM-5.3 (`opencode-go/glm-5.3`) for the rubric and cold listener; Codex for the fact table | Codex, then Claude. Never GLM-5.3: it cannot read images (2026-11-15 calibration; the calibration file is not in this repo) |

None available -> the gate stays closed and `HANDOFF.md` says so. `script-review` §1 keeps its own command lines.

### Commands that need care

- `codex exec ... < /dev/null`: an open stdin stalled it for 20 minutes. Run with `-s workspace-write` and tell it to write a named file; read the review from that file, never from stdout (the operator's global Codex hook rewrites stdout).
- Claude reading frames: `claude -p "Read each of these frames: <abs paths>. <prompt>. Print the complete review, every frame number with defects or clean." --model claude-opus-5-5 --allowedTools Read < /dev/null > <report path>`. The prompt goes before `--allowedTools`, which is variadic and swallows it otherwise.
- Give every attempt its own output path; a slow first run once wrote into its retry's file.
- A review file that is missing, truncated, or missing a frame number it was given is a failed review, not an absence of findings. Rerun to a new path; never merge partials.
- Calibrate a new or changed reviewer prompt once: a known-good input must pass and an unrelated one must fail. Record both in the report.

### Usage limits

A usage-limit error from any plan (Codex, Claude, OpenCode Go) ends that route: stop it, never turn on extra usage, and take the next route in the table. None left -> the gate stays closed and `HANDOFF.md` says so.

## 2. Model names in files

- Every agent writes the model it is running as at the top of every markdown file it writes (script, brief, reviews, `HANDOFF.md`), so the next agent can tell the family.
- The model name is the id you were launched with, as your runtime or launch command gives it (`opencode run -m opencode-go/deepseek-v4.1-flash` -> `opencode-go/deepseek-v4.1-flash`; this repo's Claude runs write `claude-opus-5-5`). If you cannot tell, write "unknown model, launched as <command>". Use the identical string in every file of the run.
- Name a sub-agent only if you spawned it; a single agent that did all the work says so.

## 3. File identity (hash pinning)

- A review is tied to the exact files it judged. `script-review` hashes its inputs right before launch and writes the hashes at the top of the review; if a file no longer matches, the review is void.
- `video-qa` records `shasum -a 256 <ep>.mp4` (all 64 characters) in its report. Any re-render voids every earlier QA verdict and checksum.
- `package-review` §0 checks that the video's checksum equals the one in the latest PASS `video-qa` report, and that `out/chapters.txt` and `out/captions.srt` come from the build that made that render.

## 4. Machine and renders (one 16 GB laptop, shared with other sessions)

- One heavy process at a time: a render, frame extraction or a model review. Reviews of one gate run one after another, each launched after the last has written its file.
- Full renders only through `tools/render.sh <id> <out.mp4>`, which takes the lock `/tmp/explainer-render.lock` (a directory made with `mkdir`; no pid is written, so check `ps` before clearing a stale lock). If `render.sh` dies, `video-build` §1 has the direct command.
- Never start a second render to rerun a first; check for one still running. One full render per fix round; builders verify with single stills.
- Stills on the remote sandbox when it is set up (the Boat scripts are not in this repo), else locally one at a time (`video-build` §1).
- Disk is tight: one shared `video/node_modules`, render to `episodes/<ep>/out/`, delete intermediate frames and `remotion-webpack-bundle-*` folders in `$TMPDIR`.
