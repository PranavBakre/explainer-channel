# Learnings and issues

Running log. Newest at the bottom of each section.

## Research phase (2026-11-08)
- **YouTube blocks caption pulls after ~70 yt-dlp requests** (HTTP 429, "confirm you're not a bot"). Fix: `--cookies-from-browser firefox --sleep-requests 3 --sleep-interval 3`, and never run more than ~3 pulling agents at once.
- **yt-dlp ignores `sort=p` on channel pages.** The working popular list is the uploads playlist with a `UULP` prefix, or vidIQ/Social Blade.
- **Captions lie in two ways**: auto-captions garble names ("Rock You"), and some 2026 tracks are machine-rewritten English ("hedgehog" for "urchin"). Use them for structure and timing, not verbatim quotes. India in Pixels' English captions are translations of Hindi audio.
- **Channel identity must be checked**: "The Culture Mafia" turned out to be an Australian Godfather-analysis channel, not Indian/tech.
- **First-pass speaking-pace estimates were wrong** (House ~205 wpm) because duplicated caption lines inflate word counts; recomputed 175–186.
- **The voice guide produced its own cliché**: "the catch is" became a rule and then a tic. Ban signposted reveals and slogan closers explicitly.
- **Opening-only research missed the point**: the useful evidence was full-video beat sheets (where the question is answered as % of runtime, where explanation sits), not hooks.

## Production setup (2026-11-09)
- **Disk had 5.4 GB free.** Ruled out PyTorch TTS (Kokoro via torch ≈ 2+ GB). Used `kokoro-onnx` (venv 126 MB + 354 MB model) and a single Remotion install (316 MB node_modules via bun's cache).
- **faster-whisper + current PyAV crash** (`open() got an unexpected keyword argument 'metadata_errors'`). Fix: decode with ffmpeg to 16 kHz float32 and pass the array.
- **Voice choice without ears**: chose Kokoro `af_heart` from the model's published grades (A; best male voices are C+), then verified intelligibility by transcribing auditions with Whisper (no errors on the test paragraph) and measured pace (155 wpm at speed 1.0). A human listen is still the real test.

## Script and review (2026-11-09)
- **A different model catches what the author can't.** Codex (GPT, via the ChatGPT plan) failed draft 1 on accuracy: overstated absolutes ("can't reverse", "every fingerprint unique"), "should not" where NIST says SHALL NOT, the wrong actor in the HIBP flow, an unverified date, and a late hook. Two more rounds were needed. Budget three review rounds per script.
- **The fact sheet grows during scripting.** Each review round surfaced claims that needed a source (scrypt date, SHA-256 length, NIST password-manager clause); verify and append them (F38–F43) rather than softening the script blindly.
- **Codex output capture**: `codex exec > file` captured only the final message, and the user's global Codex Stop hook replaced it with "No Dumbledore memory lesson added." Fix: run with `-s workspace-write` and tell Codex to write the review to a named file.
- **OpenCode's OpenAI OAuth returned 401** for every OpenAI model (ChatGPT login likely expired; needs `opencode auth login`). Cerebras and NVIDIA providers worked. The DeepSeek flash model ended after tool calls with no answer; inlining the script in the prompt fixed it.
- **macOS has no `timeout`** — a backgrounded `timeout … codex` silently exited 127. Use plain commands with `run_in_background`.
- **Kokoro speaks single sentences fast.** The 155 wpm audition was a paragraph with pauses; per-line synthesis ran 182 wpm. Speed 0.85–0.88 plus 0.45 s inter-line pauses lands near 160 wpm.
- **Build-on-step components break when a shot has fewer beats than elements** (flow diagram showed one node). Components now pace remaining elements after the last beat.
- **Two background jobs wrote the same review file**: a slow first OpenCode run finished after the retry and interleaved its output into the retry's file. Give every run its own output path.
- **`codex exec` blocks on an open stdin** ("Reading additional input from stdin…") when launched from some background shells; it sat 20 minutes. Always redirect `< /dev/null`.
- **Five review rounds to pass Accuracy.** Codex failed rounds 1–4 on scope, not style: the last defect was "every short password" when the benchmark covered only eight-character lowercase-plus-digit passwords (62^8 would take 22 minutes, not under one). Write teases with the benchmark's exact scope from the start; teasers are where overclaims hide.
- **On-screen text drifts from the script.** Fixing narration did not fix the matching storyboard captions ("every short password", "OWASP's first choice" survived in visuals). `sync-storyboard-vo.py` only syncs narration; grep visual props for every corrected phrase.

## Voice, build and render (2026-11-09)
- **Lexicon respelling is not enough for letter names.** "A to F" → "ay to eff" was still heard as "I to EFF". Rewording ("a jumble of digits and letters") was faster and lost nothing. Check every lexicon term with Whisper; reword when two respellings fail.
- **Whisper reports numbers as money** ("$50 billion") — a transcript formatting quirk, not a TTS error. Judge by ear or normalise before WER.
- **The 20 s test render came out at −22.3 LUFS**, quieter than the −16 LUFS target, because Kokoro output plus a 0.12 music bed is not normalised. A two-pass `loudnorm` on the final MP4 fixes it without re-rendering.
- **Re-synthesize single lines, not the episode.** A one-line JSON through `synth.py`, then patching `manifest.json`, avoided redoing all 86 lines for one wording fix.
- **Contact sheet at 70% of each shot** caught every layout problem before the 30-minute render; run it after every storyboard change.
- **Disk stayed tight** (3.5 GB free); the render writes frames to a temp dir, so check `df` before the full render and delete test MP4s and still folders afterwards.
- **`codex exec --image` is variadic** — `-i a.jpg -i b.jpg "prompt"` swallowed the prompt ("No prompt provided via stdin"). Put the prompt first and pass `--image a,b` last.
- **Plain `freezedetect` is blind under animated grain**: 0 freezes reported while the visual reviewer saw long static holds. Downscale + `gblur` before `freezedetect` (n=0.002, d=10) found 20 holds > 10 s. Build this into video-qa.
- **"a salt" is heard as "assault"** by Whisper, and plausibly by people. Two rewordings failed while the indefinite article stayed; "That string is the salt" fixed it. Watch article + noun pairs that fuse into another word.
- **The second-model visual review was the most valuable gate after accuracy.** It caught underscaled diagrams (the stills looked fine to me at contact-sheet size), a colour-rule break, and pacing. Run it on the contact sheet *before* the first full render next time.
- **Design at phone size first.** Components were sized for a 1920 canvas and looked fine in Remotion studio; on a 15-s sheet most diagrams were islands in empty frame. A per-visual scale in `Episode.tsx` fixed it cheaply; ep02 components should target ~70% frame width by default.
- **One beat ≠ one visual event.** Shots with 3–5 beats but 1–2 reveals produced 10–23 s holds. Storyboard rule for ep02: every beat changes the active element (highlight, substring, scale, new node), and no shot holds > 8 s without a change.
- **Full renders were fast (~7–10 min for 10:22 at concurrency 4)**, so re-rendering after fixes was cheap; the slow parts were review loops and TTS checks.

## Episode 2 storyboard rules (from ep01 QA)
1. Mechanism over text card: show the operation (salt joining input, guess becoming fingerprint, prefix leaving the device).
2. Highlight the comparison: changed bits, matching substring, aligned rows — at readable size.
3. Speed differences as time (17 s → 6 months → 12 years), not only log bars.
4. Keep the running object (the user row) on screen through the recap.

## Operator feedback (2026-11-09)
- **Write narration the way it is spoken.** "SHA-256" → "S H A two fifty-six", "@" → "at the rate" (not "at sign"), "bcrypt" → "B crypt". A hidden written → spoken lexicon made the script, the review and the audio disagree, and respellings like "shah" and "ay to eff" still came out wrong. The script is now the TTS input; `voice/written.json` maps spoken back to written for captions only, and the lexicon is a safety net (`{}`).
- **Every Remotion bundle copies `public/` into `$TMPDIR`** (~150 MB each here) and is never deleted; five renders left 761 MB. `stills.mjs` now removes its bundle; delete `remotion-webpack-bundle-*` after CLI renders too.
- **Operator feedback: v1 was text, not visuals.** Plan in `episodes/ep01-password-storage/visual-pass-v2.md`: one physical password card, hashes drawn as their real bits, three.js (`@remotion/three`) for machines and the guess swarm, rough.js for hand-drawn marks, pre-seeded particles instead of a physics engine (Remotion renders frames out of order).
