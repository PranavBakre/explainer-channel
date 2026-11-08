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
