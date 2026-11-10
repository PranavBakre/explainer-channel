---
name: storyboard
description: Turn an approved, voiced script into the shot-by-shot storyboard — storyboard.json for the Remotion build (scenes, shots, beats, visuals from the component registry, props, transitions, SFX) and the human storyboard.md — with pacing, phone-size and visual-truth checks. Use after script-review passes and narration is synthesized, when adding or changing shots, splitting work into segments, or when QA reports long holds or on-screen text that drifts from the script.
---

# Storyboard

Outputs: `episodes/<ep>/storyboard.json` (build input; canonical unless segments exist), optional `segments/*.json`, and the generated `storyboard.md`. Visual rules come from `brief.md` (medium per mechanism, props table, negative list).

## 1. Order of work
1. **Voice first.** After script-review passes, `voice-narration` extracts lines straight from `script.md` and synthesizes them, so durations are real before any shot is planned.
2. **Shots carry meaning.** For each script scene, list what the viewer must see change. Each beat (one narration paragraph) must change the active element: a reveal, highlight, move, count, camera stop or new node. Decorative motion (grain, pulsing, drift) is not a change. No hold longer than 8 s; ep01's 1–2 reveals across 3–5 beats produced 10–23 s holds.
   **A document proves; it does not explain.** A `DocShot` run is page → highlighted crop → back to the prop or flow that the claim changes: at most two beats or 12 s of documents in a row, and never a whole scene on one page. A changing highlight box on the same blurred page counts as the same picture; ep01 held one NIST page for 45 s across four rules. Show a list of rules as what happens to the running example in the flow, with the page as the proof.
3. **Pick the visual per shot** from the registry (`video/src/registry.ts`) following the brief's medium table. Visual missing → build it in `video-build` with a gallery entry first; never put a placeholder name in the storyboard.
4. **Truth pass.** Every number, hash, name or quote in `props` maps to a VERIFIED fact or a recorded computation, and reads identically in every shot that shows it (ep01's recap printed a ciphertext from an older key).
5. **Timed proof** before any full render: `bun tools/build-episode.ts episodes/<ep> <id>`, then `(cd video && node stills.mjs <id> /tmp/stills-<id>)` (one frame at 70 % of each shot); review at 360 px wide.

## 2. storyboard.json (as `tools/build-episode.ts` reads it)
```json
{"fps": 30, "width": 1920, "height": 1080, "voice": "af_heart", "musicVolume": 0.12,
 "scenes": [{"id": "S02", "act": 1, "title": null, "transitionIn": "cut",
   "shots": [{"visual": "DocShot",
     "props": {"page": "rockyou.png", "quote": "rockyou-quote.png", "quoteStep": 1, "source": "TechCrunch, 14 Dec 2009"},
     "beats": [{"id": "S02_01", "vo": "In December two thousand nine, a company called Rock You was hacked."}],
     "sfx": ["hit"]}]}]}
```
- `transitionIn` ∈ `cut | fade | push | zoom | wipe` (`video/src/types.ts`). House use: `cut` inside an act, `fade` at an act start; others only when the motion means something (a `zoom` into a mechanism).
- `title` (non-null) starts a chapter in `out/chapters.txt`; set it on the first scene of each chapter.
- Beat ids and `vo` must equal `voice/lines.json`; `python3 tools/sync-storyboard-vo.py episodes/<ep>` copies narration from the script and fails when a scene's beat count changed.
- `python3 tools/beat-frames.py episodes/<ep> <beat ids…>` estimates beat start frames inside a shot before the build (same rounding as the builder); after `build-episode.ts` the exact offsets are the shot's `steps` in `video/src/episodes/<id>.json`, and components receive those. Animate on beat starts. Shots ending a scene or act run longer and the episode's last shot has a 2.5 s tail: hold the last pose.
- SFX on reveals only, at most one per 10 s.

## 3. Segments (parallel builds)
Split by act into `segments/<X>.json`, each a **scene array** (not the whole object); `storyboard.json` then supplies only the top-level fields. Order: edit segment → `python3 tools/merge-segments.py episodes/<ep>` (checks every narration line appears once, in order, verbatim) → `build-episode.ts`. Edits made directly to a merged `storyboard.json` are overwritten. Narration changes follow `voice-narration` §6 (segments branch).

## 4. Text on screen
| Role | Minimum at 1080p, measured in the render |
|---|---|
| Card or headline text | 48 px, ≤ 7 words |
| Labels and values in flows, props, plates | 20 px (Lottie: Inter, 26 px values, 20–28 px labels) |
| Authentic document detail | any size, if a highlighted crop carries the claim |

Everything inside 90 % title-safe and out of the bottom 15 % (captions and mobile controls). A label that only reads at 360 px wide below these sizes means enlarge the prop or move the camera, not shrink the rule.

**Captions floating over a scene** (not printed on a prop) pass the size rule and still fail on a phone: ep01's thin condensed serif at ~40 px, pale on a pale backdrop or red on brown and teal, was unreadable at 360 px wide. They need contrast ≥ 4.5:1 against the pixels behind them (put a plate or scrim under the text rather than recolouring it), the Lottie flows' sans at weight ≥ 500, and, when the caption is the number the narration speaks, the largest text in the frame.

## 5. Before build
- Every beat has a visual change; no hold > 8 s; no more than 12 s of documents in a row.
- Every floating caption was read in a 360 px still and has ≥ 4.5:1 contrast.
- Every factual prop passed the truth pass; script changes were propagated into props (sync only copies narration).
- (After the timed build) `python3 tools/storyboard-md.py episodes/<ep> video/src/episodes/<id>.json` regenerated `storyboard.md` for review.

## NEVER
- Never use a board, a text card standing in for a mechanism, or decorative 3D (see `episode-brief`).
- Never render real hardware procedurally when licensed footage exists; the operator preferred real GPU footage.
- Never put image-generated text or numbers on screen; build them in code.
