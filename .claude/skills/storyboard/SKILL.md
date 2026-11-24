---
name: storyboard
description: Turn an approved, voiced script into the shot-by-shot storyboard — storyboard.json for the Remotion build (scenes, shots, beats, visuals from the component registry, props, transitions, SFX) and the human storyboard.md — with pacing, phone-size and visual-truth checks. Use after script-review passes and narration is synthesized, when adding or changing shots, splitting work into segments, or when QA reports long holds or on-screen text that drifts from the script.
---

# Storyboard

Outputs: `episodes/<ep>/storyboard.json` (build input; canonical unless segments exist), optional `segments/*.json`, and the generated `storyboard.md`. Visual rules come from `brief.md` (medium per mechanism, props table, negative list) and the art direction it names: read only that file in `.claude/skills/art-direction/references/directions/` before planning. Its motion and text sections override the house values here; the limits marked *channel* do not move for any direction.

## 1. Order of work
Start only from a passed script and a locked brief: a brief marked "look not locked" goes back to `episode-brief` §3 for its proof frames first.
1. **Voice first, or word anchors.** After script-review passes, `voice-narration` extracts lines straight from `script.md` and synthesizes them, so durations are real before any shot is planned. A storyboard may be drafted beside the voice only when every action is keyed to a word (`word#n`), never to seconds, and resolved from `voice/words` at build; ep03 did this on the lead's instruction and lost nothing.
2. **Shots carry meaning.** For each script scene, list what the viewer must see change. Each beat (one narration paragraph) must change the active element: a reveal, highlight, move, count, camera stop or new node. Decorative motion (grain, pulsing, drift) is not a change. *Channel:* no hold longer than 8 s; ep01's 1–2 reveals across 3–5 beats produced 10–23 s holds. Planned rests (the direction's breathing pauses, a hold after a reveal) count as holds and stay inside that limit.
   **A document proves; it does not explain** (*channel*). In the direction's evidence treatment, a run is page → highlighted passage → back to the object or flow that the claim changes: at most two beats or 12 s of documents in a row, and never a whole scene on one page. A changing highlight box on the same blurred page counts as the same picture; ep01 held one NIST page for 45 s across four rules. Show a list of rules as what happens to the running example in the flow, with the page as the proof.
   **Never a slide deck** (*channel*; operator, 2026-11-13: "I meant dont make a ppt. the video has same bg but action keeps on happening in a flow"). One background may hold for the whole act; on it each action leads into the next, built piece by piece, never a static picture swapped for another static picture. A change of colour field or a visible cut inside an act needs its reason written in the storyboard row (a state change in the direction's colour script is one). Ep02 changed the frame about every 5 s with 36 hard cuts (`research/reference-Jktv8v8ICpk.md` §8). A breath rest, scene tail or clipping hold is a pause inside the flow, not a slide; this is not a motion quota, and "something must move every N s" stays withdrawn.
   **The character**, only in a format that uses one (`script-writing` §2). Whoever the story follows is on screen from the first beat in the direction's character treatment. Their words appear beside the face, never on it, and the part of the frame holding the character stays fixed (`research/study-youtube-video-creation.md` §5).
3. **Pick the visual per shot** from the registry (`video/src/registry.ts`) following the brief's medium table, using the components the direction file's §10 names. Visual missing → build it in `video-build` with a gallery entry first; never put a placeholder name in the storyboard.
4. **Truth pass.** Every number, hash, name or quote in `props` maps to a VERIFIED fact or a recorded computation, and reads identically in every shot that shows it (ep01's recap printed a ciphertext from an older key). Then walk each scene line by line: every object at rest is a claim about the line being spoken, and a state changes on the word that changes it. Ep03 QA caught what stills review missed: a code step left on the phone under "Your phone checks", `Passkey ON` a second after "Make one", `password · deleted` while the narration said the app won't let you, and `mango@123` gone before "one two three" (a value the narrator spells out stays whole until its last spoken part). A hypothetical shown on one app's own screen binds every later beat of that screen.
5. **Timed proof** before any full render: `bun tools/build-episode.ts episodes/<ep> <id>`, then `(cd video && node stills.mjs <id> /tmp/stills-<id>)` (one frame at 70 % of each shot; while Boat is up, take the same frames with `tools/boat/still.sh` instead, `video-build` §1); review at 360 px wide, then run `video-build` §6 lead review on them and send the operator's contact sheets (`video-build` §1, stills before render).
6. **Pilot.** `video-build` builds the first act (about the first 60–90 s) at finished quality and the operator watches it before any other act is built; their notes change the storyboard, not only act 1 (`research/study-youtube-video-creation.md` §3). Ask of the pilot: what is the hero object, and is it the biggest readable thing in frame? Ep03's pilot showed its stamp as a ~40 px square.

## 2. storyboard.json (as `tools/build-episode.ts` reads it)
```json
{"fps": 30, "width": 1920, "height": 1080, "voice": "af_heart", "musicVolume": 0.12,
 "scenes": [{"id": "S02", "act": 1, "title": null, "transitionIn": "cut",
   "shots": [{"visual": "DocShot",
     "props": {"page": "rockyou.png", "quote": "rockyou-quote.png", "quoteStep": 1, "source": "TechCrunch, 14 Dec 2009"},
     "beats": [{"id": "S02_01", "vo": "In December two thousand nine, a company called Rock You was hacked."}],
     "sfx": ["hit"]}]}]}
```
- `transitionIn` ∈ `cut | fade | push | zoom | wipe` (`video/src/types.ts`). House use, unless the direction's motion section says otherwise: `cut` inside an act only between scenes on the same stage, so the cut does not show (a visible one carries its reason, §1.2), `fade` at an act start; others only when the motion means something (a `zoom` into a mechanism). No action starts under a transition (ep03 v1 opened a door during a fade).
- Rests: `pause` on a beat (seconds after it; the scene's last beat takes the scene or act pause instead), `pauseScene` / `pauseAct` at the top level, replace the defaults in `video-build` §2. Set them to the direction's rests.
- `title` (non-null) starts a chapter in `out/chapters.txt`; set it on the first scene of each chapter, in the viewer's words (ep02 shipped "Callback and exit"), and put the part's count or name on screen as it starts (a row label, "3 / 4"). `package-review` checks the names.
- Beat ids and `vo` must equal `voice/lines.json`; `python3 tools/sync-storyboard-vo.py episodes/<ep>` copies narration from the script and fails when a scene's beat count changed.
- `python3 tools/beat-frames.py episodes/<ep> <beat ids…>` estimates beat start frames inside a shot before the build (same rounding as the builder); after `build-episode.ts` the exact offsets are the shot's `steps` in `video/src/episodes/<id>.json`, and components receive those. Animate on beat starts. Shots ending a scene or act run longer and the episode's last shot has a 2.5 s tail: hold the last pose.
- If the script's ten-rule notes adopt a takeaway end card (`script-writing` §2), the last shot ends on it at card-text size (§4), held through the tail so it can be read and screenshot.
- A clipping lands on the word that names its source, the marker on the next phrase (ep02's Microsoft clipping sat unmarked 9.7 s; on the name, 2.4 s). A value that has been used leaves before anything else lands on its place (ep02's "418093" stayed under the guess slips).
- SFX on reveals only, at most one per 10 s.

## 3. Segments (parallel builds)
Split by act into `segments/<X>.json`, each a **scene array** (not the whole object); `storyboard.json` then supplies only the top-level fields. Order: edit segment → `python3 tools/merge-segments.py episodes/<ep>` (checks every narration line appears once, in order, verbatim) → `build-episode.ts`. Edits made directly to a merged `storyboard.json` are overwritten. Narration changes follow `voice-narration` §6 (segments branch).

## 4. Text on screen
| Role | Minimum at 1080p, measured in the render |
|---|---|
| Card or headline text | 48 px, ≤ 7 words |
| Labels and values in flows, props, plates | 20 px (the direction's §7 may set more) |
| Authentic document detail | any size, if a highlighted crop carries the claim |

Everything inside 90 % title-safe and out of the bottom 15 % (captions and mobile controls). A label that only reads at 360 px wide below these sizes means enlarge the prop or move the camera, not shrink the rule.

**Words that must be read** pass the size rule and can still fail on a phone: ep01's thin condensed serif at ~40 px, pale on a pale backdrop or red on brown and teal, was unreadable at 360 px wide. *Channel:* contrast ≥ 4.5:1 between the ink and what is directly behind it (fix it with a plate, scrim or surface under the text rather than by recolouring), a weight that survives 360 px, and, when the text is the number the narration speaks, the largest text in the frame. Whether words may float over a scene at all, and in which face, is the direction's §7.

## 5. Before build
- Every beat has a visual change; no hold > 8 s; no more than 12 s of documents in a row. Measure holds from the cue list, not the stills: a cue that changes nothing visible at 360 px is part of the hold around it (ep03 v3's "fingerprint" and "number" cues were no-ops and became QA r3's 9.7 s and 8.3 s blockers).
- No slide deck: every in-act field change or visible cut has its written reason; where the format uses a character, it is in frame from the first beat; chapter names in the viewer's words; the end card, if adopted.
- Every word the viewer must read was read in a 360 px still and has ≥ 4.5:1 contrast.
- Every factual prop passed the truth pass; script changes were propagated into props (sync only copies narration).
- (After the timed build) `python3 tools/storyboard-md.py episodes/<ep> video/src/episodes/<id>.json` regenerated `storyboard.md` for review.

## NEVER
- Never use a text card standing in for a mechanism, a decorative object, or a treatment in the direction's §9 (see `episode-brief`). In every direction, the same goes for a table or list of rows, a stat card, a chapter title card, a chart, boxes joined by arrows, and a frame of text alone (ep01 v1 "text, not visuals", v2 "a slide deck with doodles"; operator on ep03, 2026-11-15: "our episode 1 v1 had a similar style of tables that i disliked"). Mute test: with the narration muted, something happens to an object.
- Never draw real hardware from imagination when real footage or photos exist; the operator preferred real GPU footage. Treat it per the direction's §8.
- Never put image-generated text or numbers on screen; build them in code.
