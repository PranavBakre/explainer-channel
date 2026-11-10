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
- **Write narration the way it is spoken.** "SHA-256" → "SHA two fifty-six", "@" → "at the rate" (not "at sign"), "bcrypt" → "B crypt". A hidden written → spoken lexicon made the script, the review and the audio disagree, and respellings like "shah" and "ay to eff" still came out wrong. The script is now the TTS input; `voice/written.json` maps spoken back to written for captions only, and the lexicon is a safety net (`{}`).
- **Every Remotion bundle copies `public/` into `$TMPDIR`** (~150 MB each here) and is never deleted; five renders left 761 MB. `stills.mjs` now removes its bundle; delete `remotion-webpack-bundle-*` after CLI renders too.
- **Operator feedback: v1 was text, not visuals.** Plan in `episodes/ep01-password-storage/visual-pass-v2.md`: one physical password card, hashes drawn as their real bits, three.js (`@remotion/three`) for machines and the guess swarm, rough.js for hand-drawn marks, pre-seeded particles instead of a physics engine (Remotion renders frames out of order).

## Visual pass v2 (2026-11-09)
- **Showing beats telling, and it was cheaper than expected.** Ten mechanism components (rough.js boxes, SVG bit grids, one three.js scene) took about the same effort as the original card set and removed every static hold in the scenes they replaced.
- **Hashes as bit grids** made abstract claims visible and stayed honest: every grid is the real digest, so "146 of 256 bits" is a count the viewer can see.
- **Remotion's audio mixer filled the disk**: it writes a full-length WAV per group of overlapping clips (~120 MB each). Pre-mixing the 86 narration lines into one `narration.wav` in `build-episode.ts` fixed it and also stopped `public/` (copied into every bundle) from carrying 86 WAVs. Keep `public/` small: the pad is now mono 32 kHz.
- **zsh does not word-split `$VAR`**: `node stills.mjs ep01 out $F` passed every frame as one argument (Frame NaN). Use `${=F}`. And clean up in `finally`, or failed runs leak a bundle each.
- **@remotion/three needed no `--gl` flag** on this Mac; instanced meshes updated in `useLayoutEffect` rendered correctly frame by frame.
- **Seed every random thing by index or frame** (rough.js `seed`, particle lanes from `sin` hashes), or wobble and particles jump between frames rendered out of order.

## Operator feedback: v2 still bad; reference Veritasium "We're 99.9% sure this pattern is true" (2026-11-09)
- **What the reference actually does** (41:30, 428 cuts ≈ one every 5.8 s): lit 3D *objects* with real materials (marble number tiles in a brass tray, a copper "Averaging Machine" with an Edison bulb, reflective floor, depth of field); one coloured studio per idea; text only as small labels on the objects; mixed modes (3D sets, math board, archival photos, papers, host, interviews). v2 was flat outlines on black: a slide deck with doodles.
- **three.js can reach that look in Remotion** with physical materials, a lit backdrop, `MeshReflectorMaterial` floor, `ContactShadows`, `Environment` + `Lightformer`s, and canvas textures for labels (no async font loading). Prototype: `out/proto-hash-machine.mp4`.
- **`@react-three/postprocessing` renders a blank canvas under Remotion capture** (with and without MSAA); even the scene background disappears. Use an additive sprite for bulb glow and CSS overlays for vignette instead of bloom/vignette passes.
- **R3F's `camera` prop is applied once**; animate the camera with a rig that sets position + `lookAt` in `useLayoutEffect` per frame.
- **yt-dlp older than ~90 days gets only images from YouTube** ("Only images are available"); `brew upgrade yt-dlp` fixed it.

- **A lone spaced "A" is the article to Kokoro.** "S H A one" phonemized as /ˈɛs ˈeɪtʃ ɐ wˈʌn/, so the operator heard "S H" then "uh-one". Writing "SHA one" gives /ˌɛsˌeɪtʃˈeɪ/; other spaced letters (I D, M D, N I S T, D E S) were fine. Check new acronyms with the phonemizer before synthesis, not only Whisper after it: Whisper had normalised the broken take back to "SHA-1".
- **3D needs a reason and must match what is built.** Operator, after v2: decorative 3D fails. Each prop stands for one real part of the system for the whole episode (drawer = users table, light table = compare step), and everything printed on it is real: the lookup wall first showed passwords on its drawers when a lookup table is keyed by hash, and the opened Adobe boxes showed dots. Numbers go on a math board and evidence as the real document; 3D only where the object is the mechanism. Plan in `episodes/ep01-password-storage/shotlist-v3.md`.
- **"A board" in the reference is a filmed flip chart, not a rendered chalkboard.** Operator rejected a synthetic slate as both the wrong idea and fake-looking. The reference films a person drawing marker graphs on a white flip-chart pad in a warm room. Without a camera: a photoreal plate of a blank flip chart in a room (Codex image gen lands in `~/.codex/generated_images/<session>/`, not the path asked for), marker strokes mapped onto the paper with a CSS `matrix3d` homography and `mix-blend-mode: multiply` so they take the paper's shading, single-stroke print handwriting (EMS Readability via `hersheytext`, written stroke by stroke), slightly bowed lines, and handheld drift. Still missing versus the reference: the person at the board.
- **No board of any kind.** A rendered chalkboard and a flip chart composited onto a photographed room were both rejected as bad. Numbers now appear in the real document they come from (article, regulator report, hashcat benchmark) or as the reading of a prop (counter, stopwatch, calendar). Don't propose a board, whiteboard or "math board" mode again.
- **Lottie test (stock LottieFiles).** `@remotion/lottie` renders frame-accurately; the LottieFiles GraphQL API (`searchPublicAnimations`) gives JSON and GIF previews for fast contact sheets. Stock results mix a dozen illustration styles even within "isometric" searches, the good-quality ones are generic (the best login scene shows a 2FA code step the episode never mentions), and several look like re-uploads of other studios' art, so licence provenance is unclear. Usable only with one consistent family and content that matches the narration.
- **Editing stock Lottie to fit the script works.** S15 is one generated 1920×1080 Lottie (`tools/lottie/s15_login.py`): the stock laptop scene as a precomp with its 2FA layers, slide-in panel and baked-in asterisks removed, text changed to `you@mail.com` and an amber `mango@123` typed by text keyframes, plus drawn connection, capsule, server, hash compare in the illustration's own palette. Traps: lottie-web hides text set in a monospace web font (its load check compares against the monospace fallback), so use a proportional font; parenting carries transforms but not opacity, so child text needs its parent's fade; the first layer draws on top, so a child text must sit above its parent's fill; original text layers carry their own typing animators (`t.a`).
- **Measure every text state, not just the first.** S03's review caught the password set at size 12 beside a size-9 email (two values in matching fields) and the masked `•••••••••` sitting lower than the typed text it replaces: a bullet's ink centres near x-height, letters near cap height, and `mango@123` has a descender. Field values now share one size and a `dots-in-field` check measures the masked state. Shared builders live in `tools/lottie/lot.py`, so a fix there re-renders every flow shot; re-run each shot's checks after touching it.

## Segment D build (2026-11-10)
- `tools/render.sh` changes into `video/` before resolving its output argument; pass an absolute output path so the MP4 lands under the episode's `out/`, rather than `video/episodes/`.
- Imperva F4 gives a combined nearly-50% share for names, words, slang and patterns, not individual category shares. Keep that group together; do not invent percentages for separate bins.
- `tools/render.sh` already supplies `--log=error`; appending a second `--log` makes Remotion parse an array and reject it. Keep a single log flag.
- Remotion clamps `Freeze` to the composition range. A short pose-sampling gallery needs a padded composition duration (then render only the sample range), or late-shot samples silently show early states.
- Do not put a 1024-wide canvas Plate on each narrow counter digit: its tall aspect ratio creates multi-megabyte textures that change every frame. Counter drums use small digit textures and dispose replaced maps.
- The drawer plate text (with descenders) measured 9–10 px low despite looking plausible in a contact sheet. Use a per-plate text shift, preserve the shared default, and measure the full-size result. Lit brass can match cream lettering, so pick ink from the inner area and inset the border before judging centering.
- Calendar readings alone do not fulfil a page-turn shot. The GPU desk calendars now turn real printed pages while the estimate advances and hold the final computed reading cleanly.
- Run the computed Argon2 recipe checks with the shared `tools/tts/.venv/bin/python`; the system Python lacks argon2-cffi.
- Check projected plate rectangles as well as their text: different depths made the heap heading cover the rank plate, and the Argon parameter/pass plates touched. Separate the screen-space bounds; matching world-space heights alone is insufficient.
