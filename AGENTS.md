# Explainer channel

Faceless, AI-produced long-form tech-concept explainers, 7–10 min (ep01 8:22, ep02 7:38; the brief sets each target). One folder per episode under `episodes/`: `<ep>` in the skills is that folder's name (`ep03-passkeys`), `<id>` the short Remotion composition id (`ep03`). The brief names the episode's **format**; format-dependent rules follow from it (`script-writing` §1).

## Pipeline (each step has a skill in `.claude/skills/`)

| # | Step | Skill | Output in `episodes/<ep>/` |
|---|------|-------|----------------------------|
| 1 | Research | `episode-research` | `factsheet.md` |
| 2 | Brief + art direction | `episode-brief`, `art-direction` | `brief.md`; a new look also writes `.claude/skills/art-direction/references/directions/<name>.md` |
| 3 | Script | `script-writing` | `script.md` |
| 4 | Script review (gate) | `script-review` | `reviews/script-*.md` |
| 5 | Storyboard | `storyboard` | `storyboard.md`, `storyboard.json` |
| 6 | Voice | `voice-narration` | `voice/` (wav + manifest) |
| 7 | Build + render | `video-build` | `out/<ep>.mp4` |
| 8 | Video QA (gate) | `video-qa` | `reviews/video-qa-*.md` |
| 9 | Packaging review | `package-review` | `reviews/package-*.md` |

Gates: do not storyboard an unreviewed script, or from a brief marked "look not locked" (`episode-brief` §3); do not publish a video that fails `video-qa`.
Done means: each step's output exists and, for a gate, its latest review says PASS. The episode is done at `episodes/<ep>/out/<ep>.mp4` with a PASS `video-qa` and `package-review` report. Delivery to the operator (Slack, upload) is the operator's own session: stop at the file and write `episodes/<ep>/HANDOFF.md` (what was made, gate verdicts with report paths, anything open). Stopping earlier, or at a step that waits for the operator (the act-1 pilot), write the same note and stop.

## Sources of truth (read before working)
- `LEARNINGS.md`: every "Operator feedback" section binds and overrides older text; the rest is history and lessons. Its first section lists withdrawn rules; an earlier episode's files are examples of form, never a source of rules (`episode-brief` §1).
- Reference studies: `research/` (each states what type of video it is and which format its lessons are evidence for) and `docs/research/` (playbook, script-flow teardown, creative process, Manley/House).
- Narration voice: `docs/my-writing-style.md` (sections 5–6 are binding for scripts).
- Every on-screen or spoken fact must trace to a VERIFIED line in the episode's `factsheet.md`.

## Tools
- TTS: `tools/tts/.venv/bin/python tools/tts/synth.py` (Kokoro ONNX, voice `af_heart`).
- STT/QA: `tools/tts/.venv/bin/python tools/tts/transcribe.py <wav> [--words out.json]`; word times re-keyed to the script with `python3 tools/tts/align-words.py episodes/<ep>`.
- Storyboard and build: `tools/storyboard-lines.ts`, `tools/sync-storyboard-vo.py`, `tools/merge-segments.py`, `tools/beat-frames.py`, `bun tools/build-episode.ts episodes/<ep> <id>`; each prints its usage in its first lines.
- Video: Remotion in `video/` (`bunx tsc --noEmit` from `video/`); full renders only through `tools/render.sh <id> <out.mp4>`, which takes its own lock.
- Remote stills: `tools/boat/sync.sh` then `tools/boat/still.sh <id> <frame> <out.png>`. Needs the Boat CLI already logged in (`$BOAT`, default `~/.ascii/bin/boat`) and the sandbox in `tools/boat/sandbox-id`; never create or delete sandboxes. Without Boat, take stills locally (`video-build` §1), one at a time.
- Independent reviewers: `codex exec` (ChatGPT plan), `claude -p` and `opencode run`.

## Reviews
- A review comes from a different model family than the author (Claude, OpenAI, or another such as DeepSeek). Every agent writes the model it is running as at the top of every markdown file it writes (script, brief, reviews, `HANDOFF.md`), so the next agent can tell the family; routing tables are in each gate skill (a DeepSeek-written script: GLM-5.3, `opencode-go/glm-5.3`, runs the rubric review and the cold listener, and Codex runs the fact table, which alone scores Accuracy; `script-review` §1).
- **The model name** is the model id you were launched with, as your runtime or the launch command gives it (`opencode run -m opencode-go/deepseek-v4.1-flash` → `opencode-go/deepseek-v4.1-flash`); if you cannot tell, write "unknown model, launched as <command>". Use the identical string in every file of the run (the ep03 dry run wrote two names). Describe no agent that did not exist ("the lead and a separate research agent"): name a sub-agent only if you spawned it; a single agent did all the work itself.
- A usage-limit error from any plan (Codex, Claude, OpenCode Go) ends that route: stop it, never turn on extra usage, and take the next route in the gate skill's table; none left → the gate stays closed and `HANDOFF.md` says so.

## Machine (one 16 GB laptop, shared with other sessions)
- One heavy process at a time: a render, frame extraction or a model review. Reviews of one gate run one after another, each launched after the last has written its file (`script-review` §1).
- Stills on the remote sandbox; the full render on the laptop, once per fix round.
- Never start a second render to rerun a first; check for one still running.

## Rules
- Text, numbers, code and diagrams are built in code (Remotion), never generated by an image model.
- Disk is tight on this machine: one shared `video/node_modules`, render to `episodes/<ep>/out/`, delete intermediate frames.
- Record every issue and lesson in `LEARNINGS.md` as it happens.
- Git: commit nothing unless the operator asks; other sessions edit this repo at the same time, so never stash, reset or revert files you did not change.
