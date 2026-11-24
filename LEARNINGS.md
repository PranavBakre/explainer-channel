# Learnings and issues

Running log. Newest at the bottom of each section.

## Operator feedback: withdrawn rules (kept at the top; read before any older file)
Older briefs, storyboards and build notes still carry these. Each was withdrawn by the operator feedback section of that date; never copy one forward. Old files mark them "withdrawn <date>, see `LEARNINGS.md` withdrawn rules".
- **The background clock** ("no field or mat longer than about 40 s", "change the field before ~40 s"), withdrawn 2026-11-13: the field may hold a whole act while actions flow on it (`storyboard` §1.2, direction §3).
- **Any motion quota** ("something must move every 2 s", "something changes on every beat and every second"), withdrawn 2026-11-11: rests are still (direction §6).
- **"Fill 60 % of the frame, push in for 72 px text"**, withdrawn 2026-11-11: props whole with table around them; enlarge the piece, not the zoom.
- **The ten rules as a gate**, withdrawn 2026-11-13: per-episode ten-rule notes (`script-writing` §2), checked only for what they adopt (`script-review` §3b).
- **A reference's rules as channel law** (e.g. Veritasium's one studio per idea and a cut every 5.8 s), withdrawn 2026-11-13: a rule holds only for the format its reference is evidence for.
- **A character in every episode**, withdrawn 2026-11-13: only where the format needs one.
- **Numbers on a board of any kind** (math board, chalkboard, flip chart), withdrawn 2026-11-09: a number lives in its source document or as a prop's reading.
- **A hidden written-to-spoken lexicon** (and "S H A", "at sign"), withdrawn 2026-11-09: the script is the TTS input ("SHA", "at the rate").
- **The painted-props 3D look**, superseded 2026-11-11 by cut paper (`art-direction` §0).

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

## Segment C production (2026-11-10)
- Catalog rows must compute each user's digest; a shared hash placeholder silently depicts distinct passwords as identical. Segment C supplies verified rows locally instead of changing shared renders.
- Compare a salted hash with an unsalted table using the same hash algorithm; otherwise the missed lookup can be explained by switching algorithms instead of adding a salt.
- `tools/render.sh` changes into `video/` before resolving its output argument; pass an absolute output path to keep renders under the episode's intended `out/`.
- A larger punched-card title also needs a lower text baseline; enlarging its font alone crops capital letters against the top edge. Keep default shared renders unchanged and move the baseline only for enlarged titles.
- Inspect supplied evidence crops themselves: the 2016 LinkedIn quote asset highlights “more than 100 million” and cuts through the next line. Preserve that asset, trim the cut fragments locally, and additionally magnify the original page paragraph that explicitly says 117 million.
- On this Mac, default headless Chrome selected `swiftshader-webgl` (software GPU process around 640% CPU), holding the shared render lock for many minutes. Segment C’s checked shot renders use `tools/render.sh ... --gl=angle`; its 20 full-duration shots completed in roughly two minutes. Keep the shared queue and pass an absolute output path.

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

## Segment E build (2026-11-10)
- `tools/render.sh` changes into `video/` before resolving its output argument. Pass an absolute output path from a worktree; a repository-relative path otherwise lands under `video/episodes/`.
- The gallery supplies fixed four-beat steps even when an item includes `props.steps`. Segment E's 3D shots use narration-derived fallback offsets for this gallery shape, and the actual `steps` in the episode.
- The live HIBP `F14D5` range contained 1,965 suffixes on this build, above the older response-size examples in F33. Save the actual range and use its real rows; do not synthesise a short response or treat an old average as a current limit.
- Opening the segment E PNGs caught the closing drawer's front hiding the Argon2id card and its open bottom extending off screen. Lift the active card above the open drawer face, lower it during closure, and frame the entire cabinet before the preview. A local SHA-1 suffix also crossed the stock browser chrome; give that local readout real clearance instead of trusting a contact sheet.
- `tools/render.sh` already supplies `--log=error`. Passing another `--log` flag makes Remotion receive an array and reject the value. Use its existing logging option unchanged.
- The manager fill arrow must end at the password field's edge. Its original tip covered several masked characters. Alignment also needs a tight suffix-pill region (stock furniture has the same paper colour) and a narrow white-text tolerance on green pills (the beige backdrop otherwise counts as white ink).
- After adding a paper backing for the local-match caption, keep the returning suffix arrow outside that backing: its endpoint belongs beside the suffix pill, so the caption cannot hide the arrowhead.
- Check the whole open-to-close camera path: E's widened first drawer frame fit, but its nearer mid-close view still cropped the bottom. Keep the camera farther back throughout the shot; enlarge the active card rather than pushing the cabinet out of frame.
- Run the TypeScript command from `video/`, not the repository root: root-level `bunx tsc --noEmit` prints help and may select a different compiler instead of checking this project.
- For FFmpeg key frames, quote the expression inside the filter (`select='eq(n,500)'`) or escape its comma. Shell quotes around the entire filter alone do not protect the comma from FFmpeg's parser.
- Physical materials change texture ink colours under lighting. Sample the rendered plate's ink before an alignment check, and open its crop to ensure the measurement includes the whole word. A document's painted yellow highlight is an annotation, so measure the quoted text inside the white source card rather than treating the marker stroke as a UI field.
- A punched hash card must contain the complete digest's bits, even when a nearby textual label uses a prefix. E's first recap used 32 prefix bits for a salted SHA-256 output; compute and punch all 256 bits, and use the same digest on its comparison table.
- For the recap's first-guess card, rotate it flat, align it with the real machine slot, then feed it into the machine body. Let the body occlude it; shrinking a card before it reaches the slot weakens the mechanism.
- The final E recap and closing passes rendered correctly with explicit `--gl=angle` through `tools/render.sh`; the default browser had selected SwiftShader. Inspect frames when changing the renderer backend.

## Segment E lead review (2026-11-10)
- A camera track needs a framing envelope for each focus stop. The lookup cabinet was centred while the SHA-1 machine was clipped; project the whole active prop group through the camera, including the episode push-in, and retain margin at every held stop.
- A recap inherits each prop's established studio colour. Blend between drawer/lockbox brown, hash-machine blue and light-table teal as focus moves; a new neutral recap studio breaks the episode's visual meanings.
- Physical label reflections can become a second, upside-down reading. Keep the graphics-card name plate on a main-camera-only layer while its body and the other props retain their reflections. Default Studio/Plate behaviour stays unchanged.
- New Lottie flows must inherit the S03/S15 text roles: Inter, 26 px values, 20–28 px labels. Separate a long local digest from the browser and wrap it in a dedicated readout instead of packing a small hash into the browser's top margin.

## Segment build, ep01 v3 (2026-11-10)
- **`tools/render.sh` resolves the output path after `cd video`.** `${2:A}` runs in the video directory, so a relative
  `episodes/...` path renders into `video/episodes/...` (and Remotion fails only after all frames). Always pass an
  absolute output path.
- **Lottie draws the first layer on top**: a panel's background must be appended LAST and its text before its field
  rect. Building the card first and adding text after gave white boxes with no text at all.
- **A translucent 3D set hides its own cards.** `CatalogSet`'s ghost copy (opacity 0.85) is drawn in front of its cards,
  so the card faces show through the drawer front as milky rectangles with text. `copyOpacity={1}` gives a clean
  second drawer; keep the ghost only where the copy must read as not-real.
- **Values on a lined index card belong above the rule, not on it.** With the value baseline exactly on a ruled line the
  text looked misaligned against the email row (whose baseline sits above its rule); moving the baseline up 22 canvas px
  matched the two rows.
- **A per-card scale contradicts a lone card.** "one card = 1,000 accounts" beside a single card labelled "1 account"
  reads as a contradiction; drop the scale and let the two labels ("290,731 accounts" / "1 account") carry it.
- **Footage with text over it needs a scrim.** Cream serif tags over RGB-lit GPU footage vanish on the bright areas; a
  top gradient (82 % → 0 at 44 %) makes them legible without touching the footage.
- **`remotion still` is the cheap loop, renders are the expensive one.** Five worktrees share one render lock; a gallery
  render of 2,600 frames sat queued for 25 minutes behind another segment. Iterating on `node stills.mjs gallery`
  (bundle once, N frames) found every layout problem before paying for a render.

## 3D lookdev: scans over procedural finish (2026-11-10)
- **Operator: the 3D read as "1995 Toy Story" — no texture, surface or finish.** Procedural canvas maps (brushed grain,
  speckle, clearcoat) and better softboxes moved it only slightly. Photoscanned Poly Haven models (CC0) fixed it at once:
  the card-catalogue drawer read as a real object. Default to scans for every physical prop whose look fits its meaning.
- **Pick scans with separable parts and no printed text.** The catalogue chest's drawers are nodes, so one drawer
  becomes the users table. A scanned instrument with Cyrillic labels
  and handwriting was rejected: stock text on a prop breaks "everything printed is real data".
- **Where no scan fits, put scanned surface maps under our colour.** The hash machine keeps its copper and geometry with
  Poly Haven green_metal_rust's normal and roughness and a desaturated, brightened diffuse (mean ~210/255; darker greys
  multiply the paint colour toward black in linear space).
- **`Scanned` hinges a part about a pivot in model metres.** Solve the pivot from the open and closed poses, and attach
  anything mounted on the part (the ciphertext plate) in the same pivot frame, or it floats. Check text on a hinged part
  for mirroring after the rotation.
- **An HDRI studio fought the art direction** (black copper, washed floor); softbox Lightformers stayed.
- **Arrows end at a container's edge, outside it, drawn above the art.** S03.5's heads ended inside fields that were
  layered above the connector and vanished; the flying pill carries the value into the field instead.
- **Operator liked the real GPU footage (S02.4).** Prefer licensed footage when real hardware is the subject.
- **A direct `npx remotion render ... --gl=angle --codec=h264 --crf=20` rendered the full episode** after `tools/render.sh`
  failed silently six minutes in.

## Operator review of the scan pass (2026-11-10)
- **"Lockbox looks ass. You gave it a rusted toolbox."** A worn tool chest scan read as broken, not secure. A scan must
  fit the prop's meaning, not just look real; the lockbox is now our own brushed-steel box with a brass lock. Brushed
  metal at metalness 1 read as black lacquer under softboxes; 0.55 reads as steel.
- **A copied drawer drawn inside its original showed a doubled pull.** Copies grow in beside the original from scale 0.
  Fading the copy instead was rejected: its cards would not fade with it.
- **Mirrored text in floor reflections.** The lockbox hint plate read upside down in the floor. `Plate reflect={false}`
  moves it to layer 1, which only renders if the Studio has `unreflectedLabels`.
- **The recap showed a ciphertext from an older key** (`Y5DCWKxs…`) while the lockbox shot showed the current one
  (`6FeRQifM…`). Recompute every on-screen value from the recorded command and list recurring values side by side in QA.
- **Key teeth stopped outside the lock.** A key shown unlocking must visibly enter the cylinder before it turns.
- **The agent picked episode 1's topic without asking.** Topics are the operator's call; season 1 is in
  `docs/season-1.md`, and `episode-brief` now shortlists and waits.
- **Skills were improved with Dumbledore's skill-judge, graded by Codex** (`.claude/skills/GRADES.md`). Episode-specific
  facts stay here, not in skills.

## Viewer review of the ep01 final (2026-11-10)
Watched as a viewer (captions plus a frame every 7 s), after every gate had passed. Teaching held up; entertainment did
not. Each finding below passed its gate because the gate did not ask the question; the skills now do.
- **Hook buried.** The opener is a calm statement; the graphics-card fact lands at 0:37 behind "in some of those
  formats". The Hook row only asked for a surprise and a question in 15 s.
- **No takes, no light line in ten minutes.** Style guide rules 9 and 11 exist; the Voice row only checked banned
  phrases, so a script with nothing wrong and nothing said passed.
- **Scope fixes turned into hedges.** "At the tested setting", "in a common library's format": the cure for
  overbroad claims was applied as qualifiers instead of naming the case.
- **Adobe piles three counts into 20 s** (109 M hints, 38 M active users, 153 M records).
- **NIST scene (8:09–8:54) is one blurred page for 45 s** with four highlight boxes. Each beat changed something, so
  the 8 s hold rule passed.
- **`mango@123` never gets its verdict.** The benchmark covers 8-character lowercase plus digits; the running example
  is neither, and the video never says how long it lasts.
- **Floating captions unreadable on a phone** though over 24 px: "290,731 accounts" (0:30), "the copy holds every
  password" (1:14), "146 of 256 bits changed" (3:10), "Illustrative salt · 32 bits" (4:22). Thin condensed serif,
  pale on pale or red on brown/teal.
- **A cold-viewer pass by Codex** (`reviews/viewer-r1-codex.md`, now `video-qa` §4) agreed on Adobe, the NIST scene and the
  missing `mango@123` verdict, and added a drop-off at 5:45: the full-search arithmetic after the guesses-per-second
  figures. It also asked what "forgot password" does when a site cannot recover a password.
- **Read loudness with `ebur128`, not `loudnorm`'s summary.** The last lines `loudnorm` prints are its own *output*
  at its default −24 LUFS target; a `tail` of that looked like a −24 LUFS file. The episode measures −16.0.

## Script redo review (2026-11-10)
- **A total timing gap is not a hardware attribution.** Redo revision 3's F59 paired CPU ratio is a floor from a different-load run; dividing the GPU/CPU scoreboard times establishes their total gap, not how much hardware caused. Keep the measured same-core comparison and the unmeasured GPU limit separate. Review: `episodes/ep01-password-storage-r2/reviews/script-r4-codex-184918.md`.
- **Correct computed numbers can still imply an unsupported password lifetime.** The ep01 redo round-one script review found that a full mask-search cost became a guaranteed time for a password absent from lists, and one list/Argon2id configuration became a generic slow-hash result. Preserve the operation, upper bound, list, settings and hardware in both narration and the final on-screen reading. A key allowing decryption also does not establish that encryption lasts until the key leaks.
- **Count voice and handoffs, not just banned phrases.** The redo has explicit takes but only two clear early deadpan beats and disconnected late section transitions. Full findings and source-scope checks: `episodes/ep01-password-storage-r2/reviews/script-r1-codex-163453-28861.md` (FAIL; no earlier script review for this redo).

## Skill grading rounds (2026-11-10)
- **Grading by a different model found tool bugs, not just prose gaps.** Codex reproduced each claim in a temp copy:
  voice and storyboard each waited on the other for a new episode, `merge-segments.py`/`beat-frames.py` hard-coded
  ep01, `Root.tsx` registered only ep01, `beat-frames.py` rounded halves to even (Python `round`) where the builder
  rounds up, and `second-look.sh` exited 0 when Codex failed. Skills went from 1 A to 9 A over six rounds.
- **Two numbers in a rewritten skill had no source** ("bottom 12 %", "≥ 24 px"); ep01's brief says bottom 15 %. Check
  every number in a skill against the brief, code or LEARNINGS before writing it.
- **`claude -p "<prompt>" --allowedTools Read`**: the prompt goes first; `--allowedTools` is variadic and swallows it.
- **The lockbox plate's "0" reads as "8"** at full size (`6FeRQifM…I0QUmw==`), and `==` blurs into one bar; the data
  is right, the plate font is not. The fixed second look also flagged the key ring cut off at frame 3000 and the
  machine covering the SALT label's corner at frame 9000.

## Revision-5 script review, round 6 (2026-11-10)
- **Review the rewrite afresh, including the screen notes.** Round 6 found cold spoken terms, unexplained screen labels and unwanted benchmark settings/load detail despite the writer's narration-only ledger. It also found a SHA-1 timing carried into a SHA-256 salt illustration, a dataset presented as a universal password ranking, a blanket fast-hash protection claim, universalized reset-link guidance and a promised response window unsupported by the laptop projections. All findings and existing-fact replacements are in `episodes/ep01-password-storage-r2/reviews/script-r6-codex-201736.md`; earlier rounds reviewed the rejected script and supply no inherited scores or approval.

## Script review round 8, ep01 redo (2026-11-10)
- **A warm company name can still have an unsourced description.** Revision 6 introduced Adobe as a software company and LinkedIn as a jobs/networking site, but the approved facts only covered their breach events. Use “a company called…” when that is all the explanation needs; do not verify a familiar biography from memory.
- **Three items and three rhetorical questions are different style checks.** “A second? A year? Never?” passed the writer’s three-item check but violated the binding stacked-question ban. Check both, and time the actual commitment prompt against the hook template rather than timing only the first surprise. Full review: `episodes/ep01-password-storage-r2/reviews/script-r8-codex-211248.md` (FAIL).

## Operator feedback: look (2026-11-11)
- **"The thumbnail looks better than the video entirely."** The video never had an art-direction step. Direction settled as cut-paper stop motion ("Shaun the Sheep" = the handmade frame-by-frame feel): `.claude/skills/art-direction/references/directions/cut-paper-stop-motion.md`. Colour is a state, not a background ("all red will be too tiring"); no slideshow; real articles become black-and-white press clippings with an amber marker.
- **The first thumbnails "suck hard".** They were the video's own props with words on top, built in code, with no idea behind them. Thumbnails follow `dumbledore-creative`: idea first, generated hero with no text, type set in code, blind ranking by another model. (That skill is outside this repo; without it, `art-direction` §1 says what to use.)

## Ep01 r3 beat-end visual review r2 (2026-11-11)
- **A changed picture can still omit the operation.** Salt introduction frames 8228–8379 show a machine and labels without visible salt/password inputs; frame 7472 retains a corrupt scoreboard result. Check the settled end of every narration beat, not only whether something moved. Full findings: `episodes/ep01-password-storage-r3/reviews/video-visual-r2.md`.
- **Recurring lists need stable rows as well as stable highlighted values.** Line 9,500,188 stays correct, but line 9,500,191 changes from `tom1523` at frame 6980 to `lumi523` at 8996.

## Operator feedback: ep01 paper cut, and what ep02 starts from (2026-11-11)
Ep01 shipped as the cut-paper version (r3, cut v4). Each line is the operator's note and what it changes from the first frame of ep02; the look rules themselves live in the direction file.
- **"I am missing breathing pauses… each chapter should ideally have a breathing pause."** Every chapter ends on about 2.2 s of silence over a still picture and has one 1.6 s rest after its key reveal (`pauseScene`, `pauseAct`, beat `pause` in the build). Plan the rests in the storyboard; ep01 added them after the first full cut.
- **"For the news pages, too many items move. so i am not able to focus on the text at all."** A clipping is laid once, already framed; only the marker moves; then it holds 2.5 s. The cause was the lead's own rule that something must move every 2 s. Never brief builders with a motion quota.
- **"The content is too zoomed in… phone doesn't fit fully. the previous version was better."** Props are shown whole with table around them (a phone needs zoom ≤ 0.85). The cause was the lead's "fill 60 % of the frame, 72 px text" rule. Size text by making the piece bigger, not the camera closer.
- **"This shade of red is too overwhelming" / thumbnail "too red".** The field red is the muted brick stock; the thumbnail uses the same brick, not a hot red.
- **"What's the dash between the text?"** A split-flap seam across a settled value reads as a strikethrough. Settled values sit on one unsplit card.
- **"What is this circle on the right?"** A detached part (a flywheel beside the machine) reads as a different object. A mechanism's parts are attached to it.
- **Crops reported by QA at 5:24 and 7:55: "it's not cut. it's mid transition."** QA sampled single frames. A crop needs frames half a second either side (`video-qa` NEVER).
- **"Why are your renders taking time?"** The full paper render takes 10 minutes; the hours went into four builders re-rendering every clip behind one lock. Builders verify with single stills; the lead does the one full render.
- **Description over YouTube's 5,000-character limit.** `upload.md` carries one description block with its character count; sources are a label plus URL.
- **The ending named the wrong next episode.** Ep01's last tag ("next: when the password isn't the only lock") pointed at one-time codes while the season listed passkeys next; the video was already uploaded, so the season was reordered. A "next" line is checked against `docs/season-1.md` at script review.
- **Shared values need one owner.** Four builders each invented hashes, salts and user names; QA found the same value meaning two things and a user list that changed between scenes, and the ending showed encryption text on the "hashed" card. The storyboard carries one data table (every user, password, hash, salt, code) and builders take values only from it.
- **A photo must be the thing the words name.** A data-centre board under "one gaming graphics card" failed QA; it became a paper card. Prefer a paper prop to a near-miss photo.

## Ep02 script review, round 1 (2026-11-12)
- **Check fact-sheet summaries against their own source quotes.** The ep02 review found that F19's summary and hook hardened “may not involve technical compromise” into a categorical no-hack claim; F1's primary adoption wording also did not establish a majority of payment transactions. Full findings and dispositions: `episodes/ep02-otp-2fa/reviews/script-r1-codex-0917.md` (FAIL).
- **A correct number can describe the wrong object.** The 100-try limit and 1-in-10,000 arithmetic match F13, but the source disables the specific authenticator after consecutive failures, rather than merely expiring one code. Keep narration, counter behavior and scope slip aligned. Ep02's SMS and authenticator fixture sets are distinct and its board totals are consistent.

## Ep02 script review, round 2 (2026-11-12)
- **A repaired object can still leave a numeric limit misstated.** Round 2 closes six prior blockers, but the 100-try rule still needs "at most" in narration and the scope slip; F13 gives a maximum, not a fixed cutoff. F19 and H1 also still overstate their source with "most", although the revised spoken opening correctly says "can work without". Full review: `episodes/ep02-otp-2fa/reviews/script-r2-codex-0933.md` (FAIL; B3 partly open).

## Ep02 build, render and QA (2026-11-12 to 2026-11-13)
Ep02 (one-time codes) shipped as cut v3 after three script rounds, three video cuts and three QA rounds. Reports are in `episodes/ep02-otp-2fa/reviews/`.
- **Check the voice pace before anyone builds to it.** The first narration came out at 181 words a minute against ep01's 170; it was re-voiced at speed 0.81 (about 168). Measure words a minute right after the first voice pass and compare with the last shipped episode.
- **Builders key actions to real word times, never estimates.** The four segments were built against guessed word times and needed a whole integration pass. Run `tools/tts/transcribe.py` and `align-words.py` before the build and place actions and sound effects with `sceneWords(...).at(i, word)` and `sfxWord`.
- **One shared phone, wire and value file from the start.** Segments drew their own phones and the phone-network wire came out black in one scene and grey in two. Shared props and colours live in `scenes/ep02/shared/` and `data.ts`; a builder who needs a new one adds it there.
- **A fix for "one framing too long" must not become a crop.** QA r1 failed the score scene for holding one framing 18 s; the fix was a close-up that cut off the board's title and column labels, and QA r2 failed that. The answer was the whole board in frame with a small settle per beat (zoom steps of 0.02) and the card lift carrying the emphasis.
- **A QA fix can move the problem next door.** Ending one action earlier made the next hold exactly 8 s; laying a clipping later left the previous prop still for 5.7 s. After a timing fix, re-measure the holds on both sides of it.
- **A value that has been used leaves before the next thing lands on its place.** The code "418093" stayed on the tray while the guess slips landed half over it.
- **Clippings land on the source's name.** The Microsoft clipping sat unmarked 9.7 s, then 4.5 s; laying it on the word "Microsoft" with the marker on the next phrase gave 2.4 s.
- **Lead decisions the builders got wrong twice:** the only marker colour is brick red (an amber underline on "-help" was rejected; amber stays the password's), and a clipping is never cropped by the camera to make its text bigger (zoom 1.12 with the whole piece in frame, not 1.4).
- **Leave true-peak headroom for the AAC encode.** Normalising to −16 LUFS with a −1 dB peak target measured −0.8 dBTP after encoding and failed QA. Master with `loudnorm` `TP=-2.0`; v3 measured −1.3.
- **Speech recognition is not a pronunciation check.** Whisper wrote "forty lakh" as "40 lock" in every round. A word like that needs a person's ear before publishing; QA can only flag it.
- **QA after a fix round is scoped.** Round 3 checked only the changed spans plus one whole-file audio and black pass, and took 10 minutes against round 2's much longer full review. Give QA the list of changed spans and the accepted deviations so it does not re-raise them.
- **The cold viewer's complaints were script-level and arrived after the narration was frozen.** It would leave before the end (click-aways near 1:02, 3:52 and 6:17) and asked what an authenticator changes when you approve the fraud yourself. Run the cold-listener pass on the script with those questions before the voice is recorded; after that it is the operator's call.

## Rendering: laptop, Boat and what to try next (2026-11-12 to 2026-11-13)
- **Measured speeds for the paper look (13,749 frames):** laptop about 50 frames a second, full render about 5 minutes. One Boat sandbox (8 vCPU, no GPU) about 5.5; six sandboxes in parallel about 2 each, 29 minutes in all. Boat draws in software, and the scenes lean on drop shadows and filters, which Remotion's docs call GPU-dependent. Not proven to be the whole cause: the laptop's cores are also faster.
- **Boat is good for stills, not for full renders.** `tools/boat/still.sh` returns a still in about 3 s and keeps builders off the laptop. Full renders failed three times in a row on dropped SSH connections (during bundling, then a stale render left behind, then the audio job). `render-parallel.sh` needs remote jobs detached from SSH and full cleanup on failure before it is used again.
- **Never start a second render to "rerun" a first.** Killing the local side of a Boat render left the remote one running; the rerun competed with it, and killing the orphan hung the survivor. Check the remote for running renders before starting one (`BOAT_KILL_STALE=1` clears them).
- **`--codec` and `--crf` are already in `tools/boat/render.sh`.** Passing them again fails with "CRF must be a number".
- **Untested alternatives, from research only:** Remotion Lambda (many workers, no GPU; needs an AWS account the operator names, not the GrowthX one), a Linux NVIDIA box with `--gl=vulkan` (the direct test of the GPU theory), other `--gl` modes or baked shadows on Boat, a rented Mac mini as the known-safe fallback. A 600-frame test settles each.
- **The laptop lags when agents run heavy work side by side.** Two Codex reviews plus frame extraction, on top of other sessions' work, made the machine unusable. Every agent brief carries: one heavy process at a time, no local renders or stills, one typecheck at the end, and do not end the turn with work still running.
- **A background shell command stops at 10 minutes.** A 5-minute render plus mastering fits in one background command; anything longer needs `nohup` and a watcher.

## Ep02 package (2026-11-13)
- **Chapter names are for the viewer.** The storyboard's "Callback and exit" went into `chapters.txt` and the description unchanged. Name chapters in the viewer's words when the storyboard is written.
- **A title's promise is checked against the first 30 seconds.** "Your OTP Doesn't Prove It's You" is stated at 0:21; the question-form title is only asked at 0:56.
- **Thumbnails were built in code this time, with no generated plate,** because the packaging run had no image generation. The earlier rule (a generated plate) stands until the operator decides; the three code-built candidates are in `episodes/ep02-otp-2fa/package/`.
- **Record rights and sound sources when an asset is added.** The package gate blocked on six clippings missing from `video/public/assets/credits.json` and on `tick.wav`/`hit.wav`, whose source has been unrecorded since ep01.
- **QA reports record the full checksum of the file they checked.** Round 3 recorded only the first part, which the package gate raised.
- **Count the description with a script that finds the block itself.** The heading line also contains the words "END DESCRIPTION"; a naive search for them counted zero characters.

## Faceless reference: "OpenAI-Hugging Face Incident: The Full Story" (2026-11-13)
The operator sent it as a reference with no person on screen (Junion, 19:32, 137k views against the channel's usual ~10k; After Effects). Full study with frames and a side-by-side first minute of ep02: `research/reference-Jktv8v8ICpk.md`. Its facts were not checked; these are craft lessons only.
- **Type:** a faceless incident story told through quotes, motion graphics on one stage. Its lessons are evidence for the story formats (incident, cause known or hunted), not for concept videos, unless another reference or our own cold-viewer evidence supports them.
- **A character stands in for the face.** One robot head with blinking eyes is on screen in about 70 of 84 sampled frames; name tags make it a cast, and each character's words are typed beside it as the narrator reads them. Ep01 and ep02 were concept videos and did not need one (operator, below); a story-format episode gets a cut-paper character for whoever the story follows.
- **Explain a mechanism only when a character needs it.** Each "how" arrives as "But how could it…?" and is answered on the same picture. Ep02 stepped out of the story at 1:08 ("First, what the app just did") and at 3:50 gave a fact with nobody attached; both are where the cold viewer clicked away. A script beat that defines or explains must be asked for by the story at that moment.
- **Build on one picture; do not swap the frame.** Measured the same way: the reference makes a big picture change every 16 s with 2 hard cuts in 19.5 minutes, ep02 every 5 s with 36 cuts in 7.6 minutes, yet the reference is moving 61 % of its first minute against ep02's 26 %. It keeps one background and adds pieces (typed text, drawn lines, one box at a time). The operator's own rule says the same ("same bg but action keeps on happening in a flow", below).
- **Give the story a reveal.** Cold open that plays the first incident whole (100 s), one sentence at 1:41 naming the method and the ending, a "But…" turn every 30–60 s, a twist at 61 % that reframes what came before, a last diagram that redraws the whole system. Ep02 had no reveal and ended on a score and a list of habits; Veritasium's concept videos also reframe late, so the reveal applies to concept videos too.
- **The thumbnail is the first frame's promise.** "DAY 1 → DAY 5" with the same robot on the same background, paid off by 1:26.
- **What not to copy.** 154 words a minute with almost no pauses (commenters ask for longer pauses) and labels of about 20–25 px. Keep our breath rests and the 36 px text floor.
- **Not cheap for us.** A true incident told through first-person quotes needs an incident topic with source material; its voice may be human.

## Second reference: "Linus' 10 Rules for Good Videos" (2026-11-13)
The operator sent it straight after the faceless one. It is **not** faceless: a 4-minute podcast clip, two men on camera in one locked-off shot (LMG Clips, about 0.3× its neighbours' views). Its value is the ten rules read aloud and what it shares with the first reference. Full study: `research/reference-mouSkcAltqM.md`.
- **Type:** an entertainment-first podcast clip with a little learning; we are learning-first. Its rules are candidates to weigh per format, not a standard: each episode's script records which it adopts and why (`script-writing` §2, ten-rule notes).
- **Rules 1, 2, 3, 7 and 8 point at what could have improved ep02**, and they line up with where our own cold viewer left: too little for the time (1), the RFC key-storage line out of scope and out of audience (2, 7, at 3:52), definitions before the answer (3, at 1:09), an ending that restated the board and listed habits (8, at 6:17). The cold viewer is the evidence; the rules name it.
- **Shared by both references:** the viewer always knows where they are and how much is left (a story clock, a spoken count); the substance comes first; one unchanging stage; every mechanism attached to someone; viewers want pauses and readable text.
- **Front-load and reveal disagree by type.** This clip says front-load; the first reference gives its premise by 1:41 and holds the reframe; every narrative architecture in `docs/research/Script flow teardown.md` pays the title at about 60 %. We front-load only when the promise is something the viewer does (`script-writing` §2), on our own ep02 evidence.
- **A face gives motion for free:** 55 % moving with zero cuts or graphics. We have no face; a character stands in only where the format needs one, and this is not a motion quota.
- **Voice objections as the viewer would say them.** Commenters called "I'm glad you asked" patronising; the clip's best moment is the second man pushing back. The misconception research and ep02's unvoiced objection make this a rule; the phrasing advice stays a candidate.
- **Viewers wanted the list as text:** the top comments (194 and 56 likes) retype the rules the video never showed. A takeaway end card is a candidate for the ten-rule notes, not a rule.
- **Not to copy:** the dark set, the opening preamble, the hard stop with no ending.

## GrowthX video studio study (2026-11-13)
GrowthX's private `youtube-video-creation` repo, read as text only (no video, audio or code run). Full study: `research/study-youtube-video-creation.md`.
- **Type:** a talking-head-to-Vox-style studio (a presenter's base cut becomes a graded explainer). Its process and QA rules are format-free; its picture rules assume a presenter and carry over only to a format with a character.
- **Adopted into the skills:** calibrate a reviewer prompt on a known-good and an unrelated input (`video-qa` §4); a scored cold-listener rubric with a pass bar (`script-review` §3a); a finished-quality pilot of act 1 (`storyboard` §1.6); fixes as stills or before/after clips with one full render per round; a shot list after re-cuts; speech checks on the music and effect files; their sound rules (`video-build` §5); views at 6 h, 24 h and 7 days (`package-review` §3).
- **Does not transfer:** their character is Udayan on camera; ×1.2 delivery (our operator asked for pauses); motion quotas such as "moving ≥ 90 %" (our operator rejected motion quotas); generated b-roll with gibberish text.
- **Ours is stronger** on fact-checking and packaging (they have no thumbnail method and an open title style).
- **Two rules for a puppet** come from their presenter framing: words beside the face, never on it; the character's part of the frame stays fixed.
- **Voice, as evidence, not a decision:** their founder on a Kokoro film, "audio is ass", "its so ai" (1 Nov), and their rule since then, "ElevenLabs, never Kokoro". We have no A/B on our own retention; Kokoro versus ElevenLabs stays the operator's call.
- **Render, still open:** they never used the cloud; two spare Macs over Tailscale (`farm.py`) are the GrowthX precedent, close to our "rented Mac mini" fallback. Their renderers are not Remotion, so no speed transfers.
- **Length data point:** on their channel, long videos under 10 minutes broke out 12 % against 21 % (their data, not ours); it bears on our 7–8 minute episodes and is the operator's call.

## Operator feedback: rules depend on the type of video (2026-11-13)
- **"remember that this depends on the type of video/channel as well. e.g. your veritassium report".** Rules taken from a reference hold only for the format it is evidence for; the brief names the format (`episode-brief` §2.1) and each reference study states its type (§2.5). Veritasium (2026-11-09 section) is a presenter-led science documentary: one studio per idea and a cut every 5.8 s, the opposite of the faceless story's single stage.
- **"I meant dont make a ppt. the video has same bg but action keeps on happening in a flow".** This is what "keep on regularly changing the background" meant; there is no clock on the background (`storyboard` §1.2, direction §3).
- **"yes if there is a need for a character. our two videos were concept videos".** A character only where the format needs one; when used, it may blink or idle, including during rests (direction §2).
- **"I asked for the 10 rules as a way to improve our videos. we need to determine if the current video type has something we could bring from those rules. LTT is more entertainment focused with a little learning sprinkled".** The ten rules are a per-episode consideration in the script notes, not a gate (`script-writing` §2, `script-review` §3b).


## Ep03 script review, round 4 (2026-11-15)
Reviewer model: unknown model, launched as Codex (OpenAI GPT-6 family; exact runtime model id and launch command are not exposed to this reviewer).
- **Compression can remove a passed claim's scope.** Revision 4's “If I break into the app, all I find…” no longer names the stolen public-key copy covered by F17. Keep the stolen object audible.
- **A plain example must not replace a survey's metric.** F3 measures phishing; “fake-page attacks” is not a separately VERIFIED measured subset.
- **Simplifying synced recovery must preserve its conditions.** F18 gives synced and device-bound alternatives; F29 gives one recovery method; F30 names a potential weakness. Do not add an unverified prevalence, universal provider-recovery outcome or contact-only account-security conclusion.
- **A recovered attacker still registers only the checking half.** In the stamp metaphor, the new secret stamp stays on the attacker's device; only its imprint goes into the app's drawer (F10/F29).
Full report: episodes/ep03-passkeys/reviews/script-r4-codex-093430-5465.md (FAIL, Accuracy; no cold listener run).

## Ep03 research, brief and script (2026-11-15)
Model: claude-opus-5-5. Gate stopped at the four-round cap: rubric r1 FAIL, r2 FAIL, r3 closure PASS, r3 listener FAIL (Overall 2), r4 full rubric FAIL. Trail: `episodes/ep03-passkeys/HANDOFF.md`.
- **Capture the whole page, not excerpts.** Re-verifying quotes needed full-page captures with page numbers. The FIDO Index PDF splits passages across columns, so a quote check fails on a column capture; save a rejoined-excerpts file beside the full capture.
- **`textutil` reads HTML as Latin-1** unless given `-inputencoding UTF-8`; without it, curly quotes and dashes come out as mojibake, and quote checks fail.
- **Codex runs a cold listener nobody asked for** inside a rubric review (r1). It is the same family and uncalibrated, so its scores do not count. Say "Do not run the §3a cold listener yourself" in the rubric prompt.
- **Codex appends to `LEARNINGS.md` from a review run** (r4 added its own section). That is outside the one-output-file rule; say "write only $OUT" in the prompt.
- **A recap-first hook loses to a surprise-first one.** "Last episode…" as the first line was a blocker; "You just fell for my fake sign-in page. And I got nothing." passed at Hook 4.
- **A clean rubric does not mean a listener will stay.** r3 passed the rubric while the listener scored Clarity 2 and Patience 2. The rubric checks each line; the listener hears the wait. Setup before the answer the title promised (sign-in steps, replay, a break-in aside, two authority lines) cost 0:42–2:14, and a second account introduced mid-door lost the thread.
- **The listener mishears metaphors.** It heard "two matching keys" as two copies; a secret stamp with a checking copy fixed it. Every visual that uses the metaphor must then keep its sides: r4 caught the thief's new stamp put in the app's drawer.
- **Compressing for pace drops scope.** Each cut in r4 widened a claim: "break into the app" lost "the app's copy of your stamp", "fake-page attacks" replaced the survey's measured "phishing", and "usually" added a prevalence the source did not give. After compressing, re-read every fact line against its sheet entry.
- **"Unlock" is on the style guide's banned word list** in narration. It may stay inside a verbatim clipping.
- **A fallback attack must keep the whole old flow.** Relaying only the password dropped the texted code that episode 2 taught; relay both.
- **A scenario choice is not advice.** The scenario's recovery route (text) became general advice about email recovery; scope advice with "can" and keep the scenario's own route.
- **The listener's unanswered questions are the best list of what to add.** Each door now ends on what the sources let the viewer do (delete where allowed, which number recovery goes to, change a known PIN, a second way in before deleting), not on a restated danger.
- **(Extension, rounds 5–6.)** Codex leaves LEARNINGS.md alone when the prompt says "Write only $OUT and touch no other file". Verified with `cmp` against a copy taken before the run.
- **Cutting does not fix a door the sources can't resolve.** Three listeners in a row (1,047, 1,010 and 919 words) left at the same place: the account passkeys are saved to, a limit with no viewer-level action in the sheet. Patience stayed at 2 while the words fell. When listeners keep leaving at a limit, look for the missing action in research, not in the word count.
- **A "what to do about each" promise must match what the sources give.** Payoff scored 2 while S01 promised a fix for every door and door two had none. Narrowing the promise raised Payoff to 3.
- **Pace in a closure check counts the budget.** Cutting below the brief's word floor reopened Pace as a blocker (r6), even though the lead had ruled out padding. Agree on a new floor with the lead before cutting below the old one.
- **(Revision 7, lead decisions.) A length change must be written into the brief before review.** The r7 closure passed Pace only because brief §1 recorded the lead's new budget (880–980 words); the r6 reviewer had refused a verbal acceptance. A word floor and a minute range can disagree (880 words is about 6:04, against a stated 6:15), so state one of them as binding.
- **Let a clipping carry a source's attribution when the line has to be short.** Cutting the spoken "U S federal guidelines call it a potential weak spot" kept the scope qualifier, because the on-screen NIST phrase still says "potential weakness". The closure check accepted it.

## Ep03 package (2026-11-15)
Model: claude-opus-5-5. Gate `episodes/ep03-passkeys/reviews/package-r1.md`: FAIL on the blind ranking, plus BLOCKED on QA and operator decisions.
- **A thumbnail whose story is a fake web address fails at rail size.** The `-help` underline that carries the episode is texture at 168 px. Both paired rankings put the question title 5th of 6 ("does not say who got nothing or why", "I still need to know what a passkey is"). The address has to be the focal object, not a tag above a phone.
- **Count every visible word, form labels included.** One address looked word-free, but its phone's sign-in form added grocery, Email, Password and Log in, which made seven words.
- **Check claims about the neighbours against the saved images.** The first draft said every neighbour shows "passkeys" and three carry a face; the images show three and two.
- **Source labels in the description narrow to the line the video uses.** "No password to steal" (F17) and "can't be shared" (F34) were wider than the cut's claims; Codex caught both.
- **Move the blind key out of the folder the ranker reads.** The ranking model works inside the evidence directory, so put the key aside during the run and restore it after.
- **(Round 2.) A big topic word does not rescue a clue the viewer has to decode.** With PASSKEY large and the fake address enlarged across the phone, the pair still came 5th of 6 in the feed (4th of 6 on the rail). The reviewer could read both, but didn't see why `-help` mattered. The thumbnail needs a picture a cold viewer reads as "fake" without the episode's explanation.

## Ep03 storyboard, build, render and QA (2026-11-15)
Process
- **When three listeners leave at the same line, change what the line asks the viewer to hold.** Accuracy closed in 7 Codex rounds, but the cold listener never reached the bar (Overall 3, Patience 2) across runs at 1,047, 1,010 and 919 words, always at the "online account" step. The lead closed the gate by decision and cut that step to one sentence, with the clipping carrying the attribution. Calibrate the listener prompt before using it as a hard gate.
- **Every pace cut gets a closure check against the fact sheet before the next listener run.** The cuts made for pace in r4 introduced four accuracy errors in one round.
- **Length landed at 886 words, 6:02, against a 7-9 minute range; the lead accepted it rather than padding.** The 145 wpm estimate already includes pauses; speech alone ran 165 wpm at Kokoro 0.81.
- **Kokoro is deterministic, so a retry needs a change.** A 0.01 speed step fixed "sign-in" heard as "sign and"; lowercase "pin" fixed PIN being spelled out. The skill should say what may vary when the script is frozen, and that a `spoken` field may differ from `text`.
- **Storyboard ran in parallel with voice and before the look was locked, on the lead's instruction.** All actions were re-timed from measured word timings at build time. The skill's "voice first" gate cost nothing to skip because segments carry word anchors, not seconds.
- **Pilot first (S01-S02, 89 s) paid off.** The lead caught that the hero object, the stamp, was a ~40 px square and its address tag sat where page address tags sit. The fix was a paper close-up of the stamp joined to the phone. In the pilot review ask "what is the hero object, and is it the biggest readable thing on the table".
- **Build every shared piece that two groups touch before fan-out, or name one group as its owner in the contract.** One builder made the pilot and the shared contract (data.ts, stage.ts, kit, CONTRACT.md); three builders then ran in parallel with disjoint folders and group-prefixed kit files. All three wrote their own clipping component and two wrote the same settings card and door tag, because the round-2 kit pieces did not exist yet.
- **An integration round by the contract owner was needed anyway.** It produced one clipping component, folded shared constants into stage.ts, and verified invisible cuts by PSNR between the last and first frame of adjoining scenes (must be identical).
- **`tools/boat/sync.sh` did not carry `episodes/*/clippings.json`, which broke the Boat bundle.** It now does.
- **Clipping captures ran as a separate agent while builders worked.** It captured the six real sources; phrases matched character for character, and marker rectangles live in `episodes/<ep>/clippings.json`, one per wrapped line.

QA (r1 FAIL on v1, r2 PASS on v2)
- **A torn or struck label must become unreadable or leave the frame in the same action.** A torn tag whose halves stayed touching still read as the untorn text ("PIN known" for 11 s). This blocker class is new in ep03.
- **At every beat, read each resting object as a claim and check it against the line being spoken; stale props are false statements.** Stills review missed these and QA caught them: a page address tag left on the phone while it showed the viewer's own settings; `password · deleted` on screen while the narration said the app won't let you delete it; a "logged in" pass carried into a beat where the thief gets nothing; a Google settings card beside a stamp tagged for the grocery app.
- **Actions must not start under a transition.** A door opened during a fade.
- **Music dips at 30 % of a 0.10 bed measured about -58 dBFS, near silent on a phone.** Dips are now 50 %.
- **Some video-qa skill rules cannot be met as written.** "No effect more than a quarter of all effects" fails with a two-effect palette; "any recognised word in the bed fails" trips on Whisper's false "You" on non-speech; §5 per-shot alignment needs shot renders, so a first full cut can never pass under a no-extra-render rule; the skill's blackdetect threshold (0.05) differs from ffmpeg's default (0.10), and a black paper table lead-in trips the default.
- **Clipping quotes at 34-36 px are not readable at phone width, even at full frame width.** Accepted for ep03, open for the operator.

Package
- **Thumbnails failed the blind top-3 ranking twice (5th of 6) against "passkeys explained" results.** A made-up address with a red underline needs decoding, and a cold viewer doesn't know the word passkey. Left as an operator decision.

## Operator feedback on ep03 v2 (2026-11-15)
- **"you are adding unnecessary continuity. These videos should ideally be watchable in any order even though a linear is preferred."** Episodes stand alone. Ep03 leaned on episode 2 in five places ("Last episode…", "like last time", "we're back to last episode", "I'll play the thief again"). Each is now stated in its own words: what a fake page normally does, "With a password or a code, spotting the wrong address is your job", "I'm the thief in this story". The running example (thief, grocery app, `mango@123`, the two addresses) stays, introduced as new. Rule in `script-writing` §2; the brief's Viewer line says "has not seen any other episode".
- **"Don't do this up next please."** No next-episode teaser; the episode ends on its payoff line (`script-writing` §2 and NEVER). Ep03's UPI line and its tag are gone.
- **"Drop in my opinions for things that make complete sense."** No "in my opinion" on a claim the video has shown. State it plainly, or reword it to what the sources support (`script-writing` §3). Ep03 S05_05 now reads "So the way back in stays open, and adding a passkey doesn't touch it."
- **"lives was spoken as human lives not he lives" and "It's saying PIN as P I N instead of one word."** Run a heteronym scan before voice and reword (live, lives, read, close, use, used to, lead, record…). Acronyms said as a word are listed in the header's Spoken forms; PIN is synthesised as lowercase "pin". Whisper writes both back correctly, so only the ear or a rewrite catches them (`voice-narration` §2, §5).
- **The doors are not a constant prop.** The operator rejected doors standing on every stage. They appear full-screen only when they are the subject: three large doors; door 1 opens with a reveal inside and a short label; when door 2 opens, door 1 is shown already open; the same for door 3. The rule is in ep03's script header, and the three labels are in its data table.
- **The paper look reads as old.** The operator finds the cut-paper UI dated and asked for a new visual idea; the lead is proposing one separately. Ep03's brief §2–§8 and every `> on-screen` line describe the old look and will be rewritten.
- **Process:** revision 8 passed its closure check on the first pass (`episodes/ep03-passkeys/reviews/script-r8-codex-142154-20751.md`). One informational listener on that hash scored Hook 4, Clarity 3, Patience 3, Payoff 3, Change 3, Overall 3. Patience rose from 2 to 3, the first time a listener did not run out of patience at the online-account step. Removing the episode-2 references cost no length: 886 words became 901.

## Look 2 "screen-first" proof (2026-11-15)
Model: claude-opus-5-5. Stills and an example track in `episodes/ep03-passkeys/look2/` (README there).
- **Build the proof as one world with a camera, not as separate frames.** Placing phone, thief panel and stamp layer at fixed world positions and giving each still a camera made "reachable by one camera move" true by construction, and the example animation reused it with only a timeline.
- **A neighbour left in the world shows up cropped at the frame edge after a push-in.** The thief panel appeared as half-words beside the zoomed sheet; it now fades out when the camera leaves it. Check every camera arrival for slivers of off-subject pieces.
- **zsh does not word-split `set -- $n` in a loop either**: three Boat stills failed with a bare ssh error because the composition id was "01 01-hook". Use `${c%%:*}`/`${c#*:}` or `${=n}`.
- **A capture's own type stays unreadable at 360 px even in a full-width browser window** (1.22x); only a crop of the marked phrase would fix it.

## Ep03 screen-first storyboard (2026-11-15)
Model: claude-opus-5-5.
- **A hypothetical shown on one app's own screen binds every later beat.** Putting `password · deleted` on the grocery settings in door 1 contradicted "where an app won't let you delete it"; the rebuild rings `Delete` in S04_03 and presses it only in S07_02, where the narration does it.
- **An address bar would put a forbidden string in frame.** NIST's source address contains "nist" and "800-63"; evidence windows in this episode have tab-only chrome, all six alike.
- **`word#n` anchors are 0-based and easy to get wrong.** "so", "delete", "stamp", "grocery" recur inside one beat; check every cue against `voice/words` before writing the storyboard (two resolved to the wrong occurrence here).
- **Phone-solo framings need every neighbour beyond 960/z px.** The proof's thief panel sat 200 px from the phone and had to fade; the rebuild spaces stations (laptop base from x 1020) so no framing needs a fade, at the price of a 0.77 two-shot.

## Ep03 screen-first rebuild, render and QA (2026-11-15)

- Stills before render: send contact sheets of settled frames per scene group to the operator, and render only on their word. One render then costs one round, not three.
- Cropped "close-up" camera presets (address bar, form, sheet) broke "whole objects at rest" in every group that used them. Keep one whole-phone framing and enlarge the type inside the page instead of zooming the camera.
- A cue that changes nothing visible still counts as a hold. QA r3 failed on two of them (9.7 s and 8.3 s). Every cue in a segment file needs a visible action; check holds from the cue list before rendering.
- A value the narrator spells out (`mango@123`) must be fully on screen until the last spoken part, not only while it is typed.
- A phone page left in an earlier state contradicts the voice later in the scene. Walk each scene's props against the narration line by line at integration.
- The music bed must be generated to the episode length; a shorter bed leaves digital silence at the end.
- Builders working in parallel each wrote private copies of shared pieces again (door reveals, laptop pages, the thief layer). The integration round folded them; next time the contract owner exports the shared pieces before fan-out.
- An evidence clipping set on one long line renders at a third of the size of the others. Wrap clippings to a common width before sizing the window.
- Upload package text is tied to a cut and a script revision. After a rebuild, rewrite it and drop sources for claims the script no longer makes.

## Operator feedback during the ep03 rebuild and package, not recorded above (2026-11-16)
From the operator's messages of 2026-11-15 and 2026-11-16; each rule is now in the skill named.
- **"is it not possible for me to see before rendering? it takes time then i give feedback", then "start remotion studio" and "render it. and close the studio".** Stills go to the operator before any render; Remotion Studio when they ask to scrub, stopped before the render (`video-build` §1).
- **"why are you having 5 shells and 1 monitor?"** Several background shells and a watcher at once is the laptop-load fault again; one heavy process, one watcher, nothing left running at the end of a turn (`video-build` §1).
- **"this 'phone' is screwed. two rectangles that do nothing. code is out of alignment" and "this UI is bad" (ep03 v2).** A drawn device with parts that do nothing reads as broken; screen-first draws a real-looking phone whose every part is UI (direction §5, §9).
- **"did you use the creative skill? art direction skill? did codex go and find other references?" and "why are you not using the skills? you were using them properly last week".** Late in a long session the thumbnail work ran without its skills. Tail-end tasks get their full skill, and a delegated brief names the skill files (`package-review` §0, §1a; `video-build` §7).
- **"I feel not biting is the best. do the blind rank on it once".** The operator's pick still goes through the blind ranking (`package-review` §1, Blind ranking row).

## Ep04 script review, rounds 1–3 (2026-11-16)
Model: claude-opus-5-5. The operator overrode the different-family rule: Claude reviewed a Claude-written script. Cold listeners ran as separate `claude -p --model claude-opus-5-5` calls on the narration only. Trail: `episodes/ep04-upi/HANDOFF.md`.
- **A source's list can name a party the narration renames.** The RBI's "payer PSP, payee PSP" was spoken as "the app on each side", but the same paragraph lists Third Party Application Providers separately. Read the whole source sentence before glossing one of its terms.
- **"Each payment adds to what banks owe each other" leaves out same-bank payments.** NPCI's settlement covers inter-bank transactions; say "each one between two different banks".
- **A dated rule told in the present tense becomes today's law.** The 2022 paper's zero-charge rule, said as "no bank may charge", sat just before the 2026 fee news. Tell it in the paper's tense.
- **An early full answer makes the middle sound like a recap.** With the answer complete by 0:26, listener r2 heard "how does the stall get paid?" at 1:29 as a stall. Answer in a word and hold the hard part. Promise only what the sources can give: revision 3's "and when" promised settlement times, which are UNVERIFIED, and listener r3 docked Payoff for it.
- **An announced shortcut draws attention to itself.** "The phone is the part you already know, so it's quick" was a click-away twice, at 38 and then 92 words of phone material.
- **Heavy attribution costs Patience.** Listener r3 tuned out "says / the paper says / one outlet reported" in the fee beat. When most facts are attribution facts, let the clipping carry the source.
