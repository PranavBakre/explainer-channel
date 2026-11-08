# Brief the look, then lock it in code

A long-form AI explainer needs the same creative brief Gadha wrote for Frontier, plus three things a still identity never has to carry: **time** (a colour script and an edit grammar across 10 minutes), **motion** (a reference reel and a written motion language) and **sound**. Professional studios run the same order: kick-off brief, style development (moodboards, style frames, palettes, character sheets), script, storyboard, animatic, then production. Style frames and storyboard are separate sign-offs, because "the storyboard is purely for narrative explanation" while style frames show "how we envisage the final film" ([Boords](https://boords.com/blog/the-seven-steps-of-animation-production); [Animade](https://archive.animade.tv/scoops/the-stages-of-animation-production-ultimate-guide)). In an AI pipeline every one of those artefacts becomes an input. The brief becomes the system prompt for each Claude call. Style frames and asset sheets become image-model references. The motion language becomes Remotion or Manim constants, and the fact sheet becomes the check on every on-screen number. Existing agent skills cover the render layer well: Remotion's official skills, HyperFrames, two strong Manim skills, video-use for ffmpeg assembly and ElevenLabs for TTS. They cover the creative layer for long-form explainers badly. No skill found encodes 8–15 minute explainer structure, video art direction, or long-video QA. The user should write five skills, ranked below. The first two are a long-form beat-sheet skill and a video art-direction skill modelled on `dumbledore-creative`. Everything here builds on the pipeline, storyboard table, cost model and policy analysis in `reports/Tech explainer YouTube playbook.md`. The beat templates are in `reports/Script flow teardown.md` (being written in parallel). Neither is repeated here.

**How to read the evidence.** "Sourced" means a cited studio, vendor or official document says it. "Inference" means a synthesis from the research notes, labelled where it appears. Several items are inferences, because no Buck, Giant Ant, Ordinary Folk or Kurzgesagt style bible, treatment or pitch deck is public. They are: the brief-to-video mapping, the reference reel with timestamps, the shot-type applications, the rubric rows and the whole skills-to-write list.

## Every brief section and creative stage has a video artefact

The table maps Gadha's brief sections and the eight `dumbledore-creative` stages (`/Users/psbakre/Projects/dumbledore/config/skills/dumbledore-creative/SKILL.md`) to a video artefact. Each row says what the artefact is for and who makes it in an AI pipeline. The mapping is an inference. The artefacts themselves are sourced studio practice where a citation appears.

| Gadha brief section / creative stage | Video artefact | What it's for | Who / what produces it |
|---|---|---|---|
| Project context | Channel and episode context: audience, promise, length, viewing context (mostly mobile), series slot, what the viewer must know at 0:30 / midpoint / end | Fixes why this video exists and what "done" means; becomes the system prompt for every Claude call | Human writes; Claude drafts from the packaging stage |
| Source material | **Fact sheet**: every claim, number and diagram with its primary source; script status; scratch VO link | Every on-screen number, label and diagram traces to a source; no invented facts, logos, UI or quotes | Claude researches and cites; human verifies |
| Existing identity | **Channel kit**: logo sting, fonts, palette, end screen, thumbnail family, past episodes | Carries the channel across episodes; for episode 1, say "none yet" and let this brief set it | Human; later the series bible |
| What did not work | **Rejected treatments** as nouns (glowing circuit boards, isometric server racks, floating 3D icons, random whip-pans) | Stops a retry repeating a failure in new colours; feeds the negative-prompt list | Human names them; Claude converts to negative nouns |
| Numbered references + what to take | **Stills set** and a **reference reel**: numbered clips with URL, timestamp in–out, the one thing to take, what to ignore | Stills brief the look; clips brief easing, rhythm, transitions and camera, which a still can't | Human picks; Claude can pull frame strips |
| Shared principles ("don't imitate each separately") | 5–7 principles the references share | Gives a direction its rules, so it doesn't collage the references | Claude drafts, human edits |
| Material / texture rules | **Rendering process**: flat vector, riso print, paper cut-out, chalk, clay; grain, line boil, frame-rate feel | Texture comes from the process in every shot, never from a filter added to some shots | Claude writes the style block; image model and Remotion/Manim execute it |
| Named directions | 2–3 named directions, each with **4–6 style frames + a 10–15 s motion test** on scratch VO | Tests each direction as a hypothesis; a still can pass while the motion fails | Image model (frames), Remotion/Manim (motion test), ElevenLabs (scratch VO) |
| Extension across a system (eight pillars) | Each direction extended across the **shot types**, with a fixed-vs-varies table | Proves the look survives a whole episode, not one hero frame | Image model + Remotion/Manim; Claude assembles side-by-side sheets |
| Applications | **Shot types and deliverables**: cold open, title sting, diagram build, zoom transition, data viz, metaphor scene, code/protocol detail, chapter card, end screen, thumbnail, Shorts 9:16 | The checklist every direction must show | Same as above; thumbnail follows `dumbledore-creative` |
| Expected output | Synthesis, per-direction rules, side-by-side frames, one full-res detail frame, motion test, **colour script strip**, fixed-vs-varies, rubric scores | What the creative round returns for a decision | Claude assembles; human decides |
| (video-only) Time | **Colour script** + **edit grammar** | Plans colour and value across the 10–15 min arc; fixes the cut and transition rules per section | Claude drafts strip from storyboard; image model renders thumbnails |
| (video-only) Motion | **Motion language**: named easings, durations in frames, stagger, holds, one allowed camera move per shot type | Makes frame 400 move like frame 1; becomes code constants | Claude writes as Remotion/Manim constants |
| (video-only) Sound | **Sound brief**: VO voice, pace, pronunciation list; music role per section; one SFX per recurring action | Sound is where AI explainers most often sound generic | ElevenLabs (VO, SFX), music library, human casting |
| Stage 1 · Measure the slot | Three slots: thumbnail at feed size, 16:9 player on a vertical phone with captions and controls, the first 30 s and the 9:16 Shorts crop | Decides what must read and where | Human screenshots real surfaces; Claude measures |
| Stage 2 · Study the house | Two contact sheets: 15–20 competing thumbnails at feed size; frame strips (one frame every ~5 s) of the 3–5 best competing videos | Sets the bar and shows competitors' visual density and colour over time | Claude + ffmpeg frame extraction |
| Stage 3 · Art direction | The video creative brief (template below) | The look, motion and sound rules before any prompt | Claude drafts, human corrects |
| Stage 4 · Idea before image | One **through-line metaphor** for the episode plus the thumbnail idea; 8–10 listed, 3 genuinely different kept | Gives the episode one visual idea a viewer can name in a few words | Claude lists, human picks |
| Stage 5 · Generate | Style frames, then motion tests, then boardomatic, then production; change one thing per retry | Spend in order of cost: cheap frames before expensive motion | Image model, Remotion/Manim, ElevenLabs, AI video only for atmosphere |
| Stage 6 · Fresh eyes | Separate reviewer sees only renders: generation faults, label errors against the fact sheet, flicker, style drift on a one-frame-per-shot sheet | Catches what the maker can't see | A separate Claude agent, given no prompts |
| Stage 7 · Judge in the slot | Blind-ranked feed mock; phone watch of boardomatic and final; cold viewer on first 30 s; later the retention graph | Judges the work where viewers meet it | Reviewer agent + human + YouTube Analytics |
| Stage 8 · Deliver | Master, SRT, thumbnail + 2–3 test variants, Shorts cuts, chapters, and the brief saved as the series bible | Makes episode 2 start from episode 1's settled direction | Claude packages; human uploads |

Three sourced facts anchor the video-only rows. Pixar's colour scripts are "the simplified and caricatured medium" that "focus on the emotional core of what we're trying to say visually with color, value, and lighting". Ralph Eggleston's WALL-E script runs from "very dull and muted" to "wildly saturated" at key moments and back to the opening look, with "the absence and presence of green" as a motif ([Eggleston interview](https://www.animationartconservation.com/design-with-a-purpose,-an-interview-with-ralph-eggleston.html)). His warning applies directly to an AI pipeline: "The bad thing about the computer is it affords endless change." Second, a motion language can be written as exact tokens. IBM Carbon separates "productive" motion that stays "subtle and out of the way" from "expressive" motion kept for significant moments. It specifies named curves such as `cubic-bezier(0.2, 0, 0.38, 0.9)` and durations from 70 to 700 ms ([IBM Carbon](https://carbondesignsystem.com/elements/motion/overview/)). Third, the budget fallback for an animatic is the **boardomatic**, "very simply the VO played against the storyboard frames" ([Boords](https://boords.com/blog/the-seven-steps-of-animation-production)). With AI stills and scratch TTS it costs almost nothing. The "rip-o-matic", an animatic cut from existing footage ([Wikipedia](https://en.wikipedia.org/wiki/Animatic)), is what the reference reel becomes once cut to the scratch VO. That definition rests on Wikipedia alone.

The working order follows Boords and Animade, adapted (inference): brief, treatment, references (stills plus reel), 2–3 directions as style frames and motion tests, pick one, then the style bible, asset sheets and motion language, script lock, colour script, storyboard, boardomatic on scratch VO, and only then generation. One small-studio blog puts style frames after storyboard approval instead ([VMG Studios](https://blog.vmgstudios.com/animation-mood-boards-style-frames-storyboards)). For a solo AI channel, locking the look first is the better choice, because the style frames double as image references for the storyboard.

## The video creative brief, in Gadha's order

The template below mirrors Gadha's Frontier brief section by section. It adds the video-only parts as sections 9–12: motion language, colour script, sound brief and AI production kit. Its structure draws on Milanote's motion-graphics brief fields (background, goals, deliverables, visual and animation references, creative direction, style guide) ([Milanote](https://milanote.com/guide/motion-graphics-brief)) and on `dumbledore-creative` step 3. That step requires failures "named as treatments … not as colours", principles "not a list of pieces to copy or collage", and texture that comes "from that material or process; a generic distress filter or effect is a fault". The template itself is an inference.

### Template (ready to copy)

```
VIDEO CREATIVE BRIEF — <Channel> / <Episode title>

1. Project context
   - Channel promise; audience (who, prior knowledge, what they already watch);
     viewing context (mobile share, TV)
   - Episode: the question it answers, target length, series slot, publish target
   - What the viewer must understand / feel at 0:30, at the midpoint, at the end

2. Source material
   - Fact sheet: every claim, number and diagram with its primary source
   - Script status (draft / locked); scratch VO link
   - Rule: no invented facts, numbers, logos, UI or quotes on screen

3. Existing identity
   - Channel kit (logo sting, fonts, palette, end screen, thumbnail family), or "none yet"
   - Past episodes and what carries over

4. What did not work (named as treatments, not colours)
   - Rejected looks, motion habits, sound choices
   - "Don't repeat any of these in another colour."

5. References
   5a. Stills (numbered): image, source, what to take, what to ignore
   5b. Reference reel (numbered): URL, timestamp in–out, what to take (ONE thing:
       a transition, a colour behaviour, a diagram build, a camera move), what to ignore
   5c. Rule: don't imitate each reference separately; find what they share

6. Shared principles (synthesis of 5)
   - Typography on screen (display face, label/code face, max words per card, how type enters)
   - Depth model (flat 2D / 2.5D parallax / 3D) and where the camera may go
   - Surface and rendering process (texture from the process, never a filter)
   - Scale, zoom levels and cropping
   - Controlled imperfection (line boil, grain, misregistration, 12/24/60 fps feel)
   - Colour: a role per colour, and colour over time
   - Type–image–surface relationship (printed on the object, callout, drawn in by a line)
   - Motion character (productive vs expressive moments)
   - Sound character

7. Directions (2–3, named, as hypotheses)
   Per direction: one-line idea, recurring metaphor, type, material/process,
   image, colour, motion and sound rules

8. Extend each direction across the system
   Applications (shot types): cold open (first 5 s), title/series sting, diagram build,
   zoom transition between levels, data-viz beat, metaphor scene, code/protocol detail,
   chapter card, end screen, thumbnail (1280x720 and at feed size), Shorts 9:16
   recomposition (not letterboxed)
   Fixed vs varies table

9. Motion language
   Named easings, durations in frames at project fps, stagger, minimum hold,
   transition grammar per section boundary, one allowed camera move per shot type

10. Colour script
    One strip: a frame per section, its colour key, and why (emotional / clarity arc)

11. Sound brief
    VO: voice, pace (wpm), tone, pronunciation list
    Music: role per section, references with timestamps, where it drops out
    SFX vocabulary: one sound per recurring action

12. AI production kit
    Style block, reference set, asset sheets, seeds / sref codes, negative nouns,
    tool split (generated vs Remotion/Manim)

13. Expected output
    - Synthesis of the references first
    - Per direction: rules for type / material / image / colour / motion / sound
    - Style frames per application, side by side across directions
    - One full-resolution detail frame per direction
    - A 10–15 s motion test per direction on scratch VO
    - Colour script strip
    - What stays fixed vs what changes
    - Scores on the style-frame and motion rubric, naming the row that holds each back
```

The default fixed-versus-varies split (inference): **palette roles, type, line and texture process, motion curves, recurring metaphors and the narrator stay fixed**. The chapter's colour key (from the colour script), subject, composition and zoom level vary.

### Filled example: "How UPI works" (EXAMPLE ONLY)

This is a hypothetical channel ("Under the Hood") made to show the template filled in. It is not a recommendation. **Every technical claim about UPI is a placeholder marked [VERIFY].** Each must be checked against NPCI and RBI primary documentation before it reaches a script or a frame. The research deliberately states no UPI flow as fact.

```
1. Project context
   - Channel: long-form explainers on the systems Indians use daily. Audience 18–35,
     uses UPI daily, doesn't know what happens after "Pay". Mostly mobile viewing.
   - Episode question: "What happens in the few seconds between tapping Pay and the
     shopkeeper's speaker saying the amount?" Target 11–13 min.
   - At 0:30 the viewer holds the question and a wrong belief to be corrected
     (e.g. "the app moves the money" [VERIFY that this is the common belief]).
     At the end they can name the parties involved and the order of messages
     [VERIFY parties and order against NPCI documentation].

2. Source material
   - Fact sheet built from NPCI's published UPI documentation and RBI material.
     Every party name, message step, time figure and volume number on screen cites it.
     [All technical claims are placeholders until verified.]
   - Scratch VO recorded after script draft 3.

3. Existing identity
   - None yet (episode 1). This brief also sets the channel kit.

4. What did not work (illustrative test frames)
   - Glowing blue circuit-board backgrounds and floating rupee coins.
   - Isometric server racks standing in for "the bank".
   - Every party as a smiling phone mascot with a face.
   - AI-generated UI screens with fake app logos or garbled Devanagari.
   - Random whip-pans between every beat.
   Don't redo any of these in another colour.

5. References (format shown; clips still to be gathered)
   5b. #1 <URL> 02:10–02:24 — take: how a message object keeps its identity while the
       camera follows it between systems. Ignore: their palette.
       #2 <URL> 00:40–00:55 — take: zoom from city scale to a single device in one move.
       #3 <URL> — take: hand-printed texture that stays consistent in motion.

6. Shared principles
   - Objects are physical and countable: a request is a sealed paper slip.
   - One zoom axis: street → phone → network → bank ledger, and back.
   - Texture from risograph-style two-colour print; grain in every shot or none.

7. Directions
   A. "Paper Trail" — the payment as a stamped paper slip passed between counters;
      riso print, two inks + paper; type stamped onto slips.
   B. "Switchboard" — the network as a telephone exchange; warm brass and cable;
      type on enamel labels.
   C. "Live Map" — clean Manim-style vector diagrams on dark ground, one accent per
      party; type as callouts.

8. Applications per direction: cold open (a chai-stall QR at the moment of tapping
   Pay), diagram of the parties [VERIFY], zoom into the network, number reveal
   [VERIFY volume figure and its date], failure/reversal scene [VERIFY how a failed
   payment is reversed], thumbnail, Shorts recomposition.
   Fixed: party colours, slip design, type, easing. Varies: chapter colour key, scale.

9. Motion language: slips travel on an expressive curve; labels on a productive curve;
   one dolly-in per zoom-level change; hold ≥ 2 s on each new party.

10. Colour script: daylight street (warm) → network (cool, dim) → bank ledger (paper
    white) → failure chapter (single red accent) → back to the warm street at the end.

11. Sound: one narrator, unhurried; Indian-English pronunciation list for bank names;
    SFX — stamp thud = request signed, bell = credit confirmed; music drops out at
    the reveal of the answer.

12. AI kit: style refs = 3 approved Direction-A frames; asset sheets = slip, phone,
    counter, ledger; negative nouns = neon, circuit board, server rack, coin shower,
    hologram, app logo. All labels, numbers and party names rendered in Remotion.

13. Expected output: as in the template.
```

## The prompt bible sends text and geometry to code, not to the model

Current generators reward three habits. First, reference images instead of adjectives. Second, a fixed prompt structure in the tool's own vocabulary. Third, negative lists written as plain nouns. Google's official Veo guide gives the structure: subject, action, scene, camera angle, camera movement, lens, visual style, temporal elements, audio and cinematic terms such as "match cut". It gives a named camera vocabulary ("Static shot", "Dolly (in/out)", "Truck (left/right)", "Pedestal", "Arc shot", "Whip pan", "Vertigo effect (dolly zoom)"). It advises against "instructive language or words such as 'no' or 'don't'" in negative prompts and says to list unwanted elements as nouns ([Google Cloud Veo prompt guide](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide)). Runway's Gen-4 References carry "characteristics, styles, characters, or objects" from reference images into new generations ([Runway Help](https://help.runwayml.com/hc/en-us/articles/40042718905875-Gen-4-Image-References-Guide)). Midjourney's official style-reference docs cover `--sref` and its versions ([Midjourney docs](https://docs.midjourney.com/docs/style-reference)). Third-party guides report that reference locking holds for faces, products and colour but **fails on text, logos and precise geometry** ([ud.hk](https://ud.hk/en/blogs/insight/article/midjourney-consistent-look-2026-08-07)). That report is secondary, but it matches the playbook's existing tool split, and it is the main reason every label, number, diagram and line of code belongs in Remotion or Manim. Two points are still unconfirmed: Omni Reference parameter ranges and whether Runway References is web or API only.

**Prompt bible structure** (one file per direction, used verbatim; inference built on the sources above):

| # | Part | Contents | Rule |
|---|---|---|---|
| 1 | Style block | Medium/process, palette by role with hex, line weight, texture source, lighting, depth model, in `dumbledore-creative`'s labelled sections (scene, subject, material and process, type, palette, constraints) | Pasted unchanged into every image prompt |
| 2 | Reference set | 3 approved style frames as style refs on every call; one asset sheet per recurring object (slip, phone, counter) showing front, ¾, side and every state (sealed, opened, rejected) | Asset sheets are subject refs; label inputs "image_1", "image_2" in the prompt ([Scenario](https://help.scenario.com/en/articles/runway-gen-4-the-essentials/)) |
| 3 | Seeds / sref codes | Recorded per approved frame | A retry changes one thing (the skill's rule) |
| 4 | Camera vocabulary | Veo terms only; one allowed move per shot type (diagram build = static; zoom transition = dolly in; metaphor scene = slow truck) | No move outside the table |
| 5 | Motion constants | 2–3 named easings (productive for labels, expressive for reveals, after Carbon), durations in frames, stagger interval, minimum hold | Live as Remotion/Manim constants, not prose |
| 6 | Negative nouns | Converted from "what did not work": neon glow, circuit board, isometric server rack, lens flare, stock office, robot hand, holographic UI | Nouns in the negative field, never "no …" |
| 7 | Division of labour | Legible text, exact geometry, numbers, code → Remotion/Manim. Generated stills/video → atmosphere, metaphor, texture plates only | Fill the storyboard's Tool column before generating |

### Style-frame and motion rubric

The rubric adapts `dumbledore-creative`'s six rows (`references/rubric.md`) and adds four motion rows (inference). Score L1–L5. Keep the skill's gates: any fault found by the fresh-eyes check fails the frame, and **a separate reviewer sees only renders, never prompts**.

| # | Row | Judged from | Question |
|---|---|---|---|
| 1 | Idea | Full-size frame | Does the frame carry this episode's metaphor, not a generic "tech" image? |
| 2 | Reads at slot size | Phone-size 16:9 player with captions | Does the key element and label read on a phone held vertically? |
| 3 | System fit | Sheet of all frames in the direction | Same world: palette roles, line, texture, light? |
| 4 | Concept clarity | Frame with VO muted | Could a viewer say what is happening without the narration? |
| 5 | Type and information | Full-size frame + fact sheet | Labels correct, sourced, legible, attached as the type–image rule says? |
| 6 | Craft | Full-size frame | No generation faults; texture from the process, not a filter? |
| 7 | Easing and timing | Motion test at 1x | Matches the named easings and durations? |
| 8 | Continuity | Shot-to-shot playback | Exit left re-enters right; the packet keeps its identity; camera move is the one allowed? |
| 9 | Rhythm against VO | Boardomatic with VO | Do visual state changes land on the stressed words? |
| 10 | Temporal stability | AI clips at 100% | No flicker, morphing or texture crawl? |

HyperFrames' `sound.md` makes row 9 a hard rule: for narrated films, the voice is the clock, and text lands on the anchor word ([HyperFrames](https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes/references/sound.md)). Its motion doctrine enforces scene-to-scene continuity with a "seam gate" script, which is row 8 automated ([motion-doctrine](https://github.com/heygen-com/hyperframes/blob/main/.claude/skills/motion-doctrine/SKILL.md)).

### Judge in the slot: the YouTube checks

YouTube's slot is three places, not one. The thumbnail file is **1280×720, at least 640 px wide, 16:9, under 2 MB** ([YouTube Help](https://support.google.com/youtube/answer/72431?hl=en-GB)). The duration badge sits bottom-right ([Moda](https://moda.app/resources/sizes/youtube)). YouTube publishes no figure for on-screen text size in long-form or for thumbnail render size per surface, so measure from screenshots of the real surfaces. A site claiming a 3840×2160 thumbnail recommendation is unreliable and should be ignored. The checks below adapt `dumbledore-creative` step 7 (inference):

| Slot | Check | Pass condition |
|---|---|---|
| Thumbnail in feed | Mock a home grid, suggested rail and mobile feed with the duration badge; place concepts among the house sheet's strongest; a second reviewer agent ranks the pool blind, titles hidden | Top third of the blind pool; reads in one second; a viewer names the idea in a few words |
| Thumbnail without title | Hide the title | Image alone says what the video is about, not just the topic |
| Player on a phone | Watch boardomatic and final on a phone held vertically, at normal distance, captions on | Every label clears captions and controls; no state change is missed |
| First 30 s | Someone who hasn't seen the script watches the cold open | They can state the question (and the wrong belief, for misconception-first scripts) |
| Shorts crop | View the 9:16 recomposition at phone size | Recomposed, not letterboxed; the hero survives |
| Style drift | One frame per shot on a single sheet | Reads as one direction end to end |
| Retention (after publish) | Check each dip against the colour script and edit grammar | Dips explained and fed back into the brief |

Colour scripts and motion consistency are craft practices. **No evidence links them to retention**, so treat the retention check as diagnosis, not proof.

## Existing skills render well and direct badly

Treat popularity numbers sceptically. Many leading video repos were **created in 2026 with very high star counts**: OpenMontage at 78.6k, HyperFrames at 81k and video-shotcraft at 17.8k. Whether those stars are organic was not checked. skills.sh install counts run to hundreds of thousands. HyperFrames' `faceless-explainer` shows 522K and `remotion-best-practices` 774K ([skills.sh](https://skills.sh)). Those counts are probably inflated by CLI auto-installs and say nothing about quality. The verdicts below weigh the opened SKILL.md files over stars. No independent review of any skill's output exists. All quality evidence comes from the projects' own demos, and **none shows an 8–15 minute explainer**. The longest samples are 50–60 s pieces.

**Licences matter in two places.** OpenMontage is **AGPL-3.0**. Reading it for ideas is fine. Copying its skill text into the user's own skills carries copyleft obligations, so adapt the ideas and write new text ([OpenMontage](https://github.com/OpenMontageInc/OpenMontage)). The Remotion skills repo has no licence file the GitHub API detects, and the Remotion engine uses its own custom licence (`NOASSERTION`) ([remotion-dev/remotion](https://github.com/remotion-dev/remotion)). The engine is free for individuals and companies of up to three people ([Remotion license](https://remotion.dev/docs/license)). Check those terms before the channel becomes a larger company.

| Pipeline stage | Skill | Link | Last push | Licence | Verdict |
|---|---|---|---|---|---|
| Research / proposal | OpenMontage `research-director`, `proposal-director` | [repo](https://github.com/OpenMontageInc/OpenMontage) | created 2026-03-29 | AGPL-3.0 | Good stage structure (sourced data points, concept proposals with cost); read for ideas only |
| Script | Jakeschincariol `yt-script` | [SKILL.md](https://github.com/Jakeschincariol/youtube-agent-skill/blob/main/skills/yt-script/SKILL.md) | 2026-09-16 (single push) | MIT | Useful hook scoring script and `[ON SCREEN]` per beat; tuned to talking heads, no 10+ min beat-sheet or re-hooks |
| Script | OpenMontage `script-director` | [md](https://github.com/OpenMontageInc/OpenMontage/blob/main/skills/pipelines/explainer/script-director.md) | as above | AGPL-3.0 | Most detailed explainer script skill (word budget by duration, myth_busting structure, TTS performance cues); built for short pieces |
| Storyboard / spec | HyperFrames `story.md`, `spec.md`, `storyboard.md` | [SKILL.md](https://github.com/heygen-com/hyperframes/blob/main/skills/hyperframes/SKILL.md) | 2026-11-08 | Apache-2.0 | Most craft-dense found: one spine example, three storylines before building, every adjective as a number, review loop; built for 15–90 s |
| Scene planning | OpenMontage `scene-director` | [md](https://github.com/OpenMontageInc/OpenMontage/blob/main/skills/pipelines/explainer/scene-director.md) | as above | AGPL-3.0 | Good tool-picking per scene (Remotion / Manim / Mermaid / image gen); read only |
| Visuals: motion graphics | `remotion-dev/skills` | [repo](https://github.com/remotion-dev/skills) | 2026-11-05 | none detected; engine custom | Solid tool manual (scaffold, Studio preview, don't render until asked); no storytelling or VO-timing craft |
| Visuals: diagrams/algorithms | `awesome-skills/manim-skill` v2.2.0 | [SKILL.md](https://github.com/awesome-skills/manim-skill/blob/main/SKILL.md) | 2026-10-30 | MIT | Best verification habit (shot list first, low-quality render, accept only what frames show); 12 stars, one maintainer |
| Visuals: diagrams/algorithms | `manim-video` (in video-use; also on everything-claude-code) | [SKILL.md](https://github.com/browser-use/video-use/blob/main/skills/manim-video/SKILL.md) | 2026-10-08 | MIT | Real pedagogy ("geometry before algebra", opacity layering, breathing room); plan → render → review |
| Visuals: diagrams | `adithya-s-k/manim_skill` | [repo](https://github.com/adithya-s-k/manim_skill) | 2026-01-23 | MIT | Has `manim-composer`; ten months without a push |
| AI footage | Higgsfield MCP (connector already in this environment) | [blog](https://higgsfield.ai/blog/Generate-AI-Videos-From-Claude-with-Higgsfield-MCP) | hosted | commercial, per-generation credits | Use only for atmosphere/metaphor B-roll; no craft encoded |
| Voice | `elevenlabs/skills` (text-to-speech, speech-to-text) | [repo](https://github.com/elevenlabs/skills) | 2026-11-04 | MIT | Thin API wrapper (`eleven_v4`); STT gives word timestamps; no voice direction |
| Edit / assembly | `browser-use/video-use` | [SKILL.md](https://github.com/browser-use/video-use/blob/main/SKILL.md) | 2026-10-08 | MIT | Real ffmpeg rules (30 ms fades at every cut, subtitles last, never cut inside a word); aimed at footage, but the rules apply |
| Packaging | `yt-package` | [SKILL.md](https://github.com/Jakeschincariol/youtube-agent-skill/blob/main/skills/yt-package/SKILL.md) | 2026-09-16 | MIT | Title + thumbnail linter only (truncation, ≤3 words, no repeat); generation belongs to `dumbledore-creative` |
| Skip | HeyGen `heygen-video`, `stickman-video-director`, `video-shotcraft` | [heygen](https://github.com/heygen-com/skills), [stickman](https://github.com/kaomei/stickman-video-director), [shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 2026-07 to 11 | MIT / MIT / Apache-2.0 | Wrong genre: avatar presenter, stickman, product promo |

Anthropic's own `anthropics/skills` has no video, voice or YouTube skill ([anthropics/skills](https://github.com/anthropics/skills)). The two OpenMontage and HyperFrames end-to-end pipelines show only short outputs. OpenMontage's explainer pipeline defaults to a **$2 budget and a 20-minute wall-time cap** ([pipeline def](https://github.com/OpenMontageInc/OpenMontage/blob/main/pipeline_defs/animated-explainer.yaml)), which points to short pieces. The right approach is to assemble per-stage skills, not adopt either pipeline wholesale. Build 8–15 minute videos as per-section Remotion or Manim compositions concatenated at the end, the way video-use and manim-video already work (inference).

## Five skills the user should write, in order

No existing skill covers the creative core of long-form explainers. The ranking below is an inference. It orders the skills by how early each gap blocks the pipeline and how little existing work covers it.

| Rank | Skill to write | Scope | Borrow from |
|---|---|---|---|
| 1 | **Long-form beat sheet** | Turn a fact sheet and packaging into an 8–15 min beat outline: cold open, promise, re-hooks, open loops, section turns, payoff. Word budget at ~150 wpm (≈1,200–2,250 words; arithmetic, not a benchmark). Rotate skeletons so episodes aren't interchangeable. One `[ON SCREEN]` intent per beat | Beat templates from `reports/Script flow teardown.md`; skeletons and policy from the playbook; `yt-script` hook scoring; OpenMontage `script-director` word budget (ideas only, AGPL) |
| 2 | **Video art direction** | Run the brief above end to end: measure three slots, study the house (thumbnail sheet + competitor frame strips), write the brief, find the through-line metaphor (8–10 → 3), generate style frames and motion tests per direction, fresh-eyes check, judge in slot, score on the ten-row rubric | `/Users/psbakre/Projects/dumbledore/config/skills/dumbledore-creative/SKILL.md` and `references/identity-systems.md`, `rubric.md`; HyperFrames `spec.md` (adjectives as numbers) and `motion-doctrine` (Apache-2.0, adaptable) |
| 3 | **Scene-to-VO timing** | Take locked TTS audio, get word timestamps, fill the storyboard's in–out and duration columns, place each visual state change on its anchor word, flag holds over ~6 s, emit Remotion/Manim timing constants | HyperFrames `sound.md` (voice as the clock); ElevenLabs speech-to-text; the playbook's storyboard table |
| 4 | **Long-video QA** | Before publish: frame-strip review for style drift, labels and numbers checked against the fact sheet, flicker check on AI clips, audio fades and caption rules, phone-size watch, cold-viewer first-30-s test | `awesome-skills/manim-skill` (accept only what frames show); `video-use` hard rules; `dumbledore-creative` step 6 (reviewer sees renders only) |
| 5 | **Series bible** | Save the settled direction (brief, style block, reference set, asset sheets, seeds, motion constants, sound brief, rejected treatments) per channel, and load it at the start of every episode | `dumbledore-creative`'s `references/brands/frontier.md` pattern and its "never load another brand's file" rule |

Thumbnails need no new skill. Extend `dumbledore-creative` with a YouTube slot: the 1280×720 feed sizes, the duration badge and the competitor sheet as the house. Add `yt-package` as a title-pairing lint. Skills 2 and 5 together are the video version of Gadha's brief and `brands/frontier.md`. They should be built as a pair.

## Conclusion

AI tools have changed which artefacts carry the weight, not the professional process. In a studio, style frames and colour scripts persuade a client. In an AI pipeline they are the machine's inputs: style frames become reference images, the motion language becomes code constants, rejected treatments become negative nouns, and the fact sheet checks every label. Briefing quality therefore shows up directly in output consistency, and a weak brief can't be rescued by a better model. The same logic answers YouTube's "interchangeable" rule. A channel whose every episode starts from a written brief and a new through-line metaphor has an auditable creative vision, which is what the policy asks for.

The skills market has built the hands before the eye. Rendering, TTS and ffmpeg assembly are solved well enough to use today. Judgement is not: the beat sheet for 10 minutes, art direction across time, and QA of a long cut. That is also where the user already has the strongest asset, a working creative skill with slot measurement, a house study, a blind fresh-eyes review and a scored rubric. Extending `dumbledore-creative` from one frame to a timeline is a smaller and better-grounded job than adopting any 2026 pipeline with six-figure stars and no long-form sample.
