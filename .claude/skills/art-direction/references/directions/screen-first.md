Model: claude-opus-5-5

# Screen-first

**Season-1 locked default** (`art-direction` §0): every season-1 episode uses this look. It is improved inside this file, never swapped per episode; a different look needs an explicit operator decision recorded in `LEARNINGS.md`.

Settled with the operator on ep03, 2026-11-15, after the cut-paper look read as dated. Evidence: `episodes/ep03-passkeys/look2/` (not in repo) (`01–06` stills, `sheet.jpg`, `old-vs-new.jpg`, `look2-example.mp4`, the approved motion reference; README there), code `video/src/proto/look2/`. First full use: `episodes/ep03-passkeys/storyboard.md` (not in repo), cut `out/ep03-passkeys-v4.mp4` (`reviews/video-qa-r4.md`).

## 1. Idea
Real-looking screens in one dark studio, filmed by a camera that travels between them: your phone, the other side's device, the thing the phone makes inside itself, and a browser window for each source. The operator approved the proof frames and the example track ("yes, rebuild the episode in this look"), with one warning: "our episode 1 v1 had a similar style of tables that i disliked" (see "What it must not become").
Fixed: screens and objects, never slides. Open: how a non-security topic (money, networks) maps its mechanism onto screens.

## 2. Anchors (fixed)
- **Palette, each colour a meaning:** field blue-charcoal (`#1E2733 → #141A23 → #0A0D12`, soft key light, vignette); brick red `#C8473F` = the attacker and danger; teal `#0F6B4F`/`#3FA383` = the protection working; amber `#F2B33D` = the one secret the viewer must not lose (ep03: only `mango@123`); UI white/grey for everything else. No other accent.
- **Type:** Inter for UI and labels; JetBrains Mono for values (codes, addresses, digits, keys).
- **The object that carries the episode:** a device the viewer owns (ep03: your phone at 86 % of frame height), plus one physical metaphor that lives inside it (ep03: the teal stamp in a glass layer pulled out of the phone, address engraved on its base).
- **Character:** none on screen. The other side is a device of his own, in a dark theme with a brick-red profile dot (ep03: the thief's laptop running the real site), never a panel or a dashboard. Every device of his carries a brick-red mark that tells it from yours at a glance: ep03 v3's thief phone was a lock screen identical to yours with only a faint bezel tint (QA r3 S4), fixed in v4 with a brick-red disc and bezel.

## 3. Colour over time
The field never changes colour; state is carried by objects (a teal disc, a brick-red underline, a teal check). Brick red and teal are each under ~10 % of the frame at any time; the loudest field is the white of a screen. An act keeps the same field; act changes are camera moves (to the doors), not colour washes. Open: whether a longer episode needs a second field tone.

## 4. Medium per mechanism
| Mechanism | How this look shows it | State |
|---|---|---|
| User-facing flow (sign in, recovery, settings) | the real-looking screen doing it: typing, a sheet rising, a toggle, a button pressed | proved (ep03 proof) |
| Attacker's side | his own device beside yours, showing the real site receiving what you gave (or nothing) | storyboarded ep03 |
| Physical-feeling process (a key, a signature) | one crafted object inside the device, pulled out on a glass layer with beams; it acts on cards and screens | proved (stamp) |
| Comparison of two values | the two values lifted out of their real places (the address bar, the engraving) and grown side by side, then put back | proved (frame 03) |
| Chapters / ways around | full-screen doors, only when they are the subject (operator on ep03 v2: "why are you constantly showing the doors?"): door n opens with one object and one short label inside, earlier doors already open beside it; the camera goes through the opening into the act | built ep03 v4; portal open |
| Evidence from a source | a browser window sliding in over the set, tab title = source tag, unaltered capture, brick-red marker | proved (frame 06) |
| A list of rules / what to do | each action done on the device in turn (the setting switched, the call declined), never a checklist | storyboarded ep03 |
| Real hardware, a place, a number with scale | open; a headline gap is shown on a scale that feels as large as it is (a timer against a calendar, not log bars; `storyboard` §1.2) | open |

## 5. Material and process
Vector screens (SVG/DOM): a phone with bezel, status bar and address bar; forms with aligned labels and fields; system sheets with drawn glyphs. A page's content fills the screen: ep03's "Try another way" and code pages left the lower half of the phone blank and were re-laid out with the block just above centre. Soft shadows under objects, light from inside an open door, an engraving glint. No paper, texture, grain or table. Screens never copy a real product's UI or logo; brand tiles are generic (`grocery`).

## 6. Motion
- One continuous world: every station has a fixed position; the camera moves between them (ease-in-out, log-scale zoom, 0.7–1.2 s). A move is an action: it starts on its word and stops. No drift, no idle animation; a rest stays fully still for up to 4 s, then something moves or the shot cuts (`storyboard` §1.2, *channel*).
- At rest the camera shows whole devices: one whole-phone framing (phone ~86–90 % of frame height), never a cropped close-up preset. Ep03's address-bar, form and sheet presets cut the phone in every group that used them; they were removed, and type inside the page was enlarged instead.
- One action per narrated change, landing on its word; then everything holds through the rest (breath ~1.6 s, scene tail ~2.2 s).
- No fades to hide neighbours: place stations so every framing excludes them. No cuts unless the reason is written in the storyboard's cut list; scene joins are invisible; doors are entered by pushing through the opening.
- Anti-slideshow: never cut to a new centred object; lift comparisons and evidence out of the set and put them back; nothing still for 4 s or more and no hold over 8 s, evidence included (`storyboard` §1.2).

## 7. Text on screen
Only UI text the screen would really show, plus owned labels (door labels, tab titles). No captions, headings or words floating over the field. The claim of a beat is in a large element when it is spoken: a pulled-out pill (128 px), door labels (58 px), a lifted value. Anything the viewer must read is at least 30 px letter height at 1080p (`storyboard` §4). Phone UI copy at the whole-phone framing may stay at 19–27 px only as background the narration does not claim (ep03 QA r3 S6 accepted it; the independent review scored legibility 2 of 5). A claim-bearing control (`Sign in with a passkey`, `Lost your phone?`) is lifted out of the phone and grown to at least 30 px letters, or the page is re-laid out so it reaches that size, not pushed into (the push-in presets broke whole objects, §6).

## 8. Real captures and footage
The capture PNG unaltered inside a plain browser window (light chrome, one tab whose title is the exact source tag); no address bar when a source address would break a channel rule (NIST's), and then none on any window of the episode. Marker: brick red at 0.42 opacity, multiply, behind the phrase, rectangles from `clippings.json`. Laid in one action, only the marker moves (the dimmed set behind it too: ep03 v4's phone swap under the NIST window, QA r4 N1), ≥ 2.5 s after the marker, ≤ 12 s on screen. A window slides in over a composed whole-object frame, never over a cropped phone. Wrap every clipping to a common width before sizing the windows: one long line rendered at a third of the others' size, and ep03's NIST clipping was re-wrapped to two lines as an image (`clippings.json` rectangles redone), never retyped. A capture whose own colours break §2 (ep03's FIDO capture: eight amber shields on teal, QA r3 S1) is the operator's call: accept it as the source's figure or recapture a crop of the marked lines. Open: a capture's own type is unreadable at 360 px; only a crop of the marked phrase fixes it.

## 9. What failed
- The proof's thief panel (`password —`, `code —`, `passkey answer nothing`): a list of rows on a dark card, the ep01 v1 pattern; replaced by the thief's own device doing the real thing.
- A fingerprint prompt on the fake site: accurate phones show no passkey there.
- Fading a neighbour out when the camera leaves it: the cure became a slideshow tell; space the world instead.
- Inherited from cut-paper and rejected again: doors on every stage; an amber slip pinned to things; torn labels; a settings card that says "deleted" while the narration says the app won't let you; a phone drawn as a shape with parts that do nothing (operator on ep03 v2: "this 'phone' is screwed. two rectangles that do nothing. code is out of alignment").
- Cropped close-up camera presets (§6) and a thin focus ring as a beat's only change (ep03 v4: it reads on a 25 px button at 1080p, may not at 360 px, and the blurred freeze detector still counted the span as one 8.03 s hold); make a cue's change a filled or pulsing state, not a hairline.

## What it must not become
The operator rejected these on ep01 (`episodes/ep01-password-storage/reviews/qa/shots-1.jpg`, `shots-2.jpg`: v1 "text, not visuals"; v2 "a slide deck with doodles"). A dark field makes each of them easy to slide back into:
- a number or statistic centred on the dark field (a stat card);
- a table or a list of rows: received/sent, before/after, settings as a card of facts, a checklist of what to do;
- a "Part one" / chapter title card, or a door used as a title card when it is not the subject;
- a bar chart or any chart;
- boxes joined by arrows (a flow diagram), including "phone → server → thief" as labelled boxes;
- a sentence over a small diagram; any frame that is text alone;
- a cut from one centred object to the next (keynote).
**Aim for instead** (`art-direction`, Aim for): a 3Blue1Brown-style mechanism shot (the one changing value lifted out of the phone, enlarged and lit, the set dimmed behind it); Kurzgesagt scale (a gap drawn as size or time you can feel); Fireship density (real screens at readable size, something new every few seconds, a sound on each); a ByteByteGo-style journey drawn as devices handing a request along, never boxes.
Mute test for every frame: "if I mute the narration, is something happening to an object, or am I reading?" If reading, it is one of the above.

## 10. How it is built
- Proof: `video/src/proto/look2/` (`theme.tsx` `C`/`F`/`Field`, `phone.tsx` `Phone`/`Address`/`SignInPage`/`PasskeySheet`, `stamp.tsx` `Stamp`/`GlassLayer`/`Mark`, `sets.tsx` `Comparison`/`Doors`/`Evidence`, `world.tsx` `Cam`/`CAMS`/`World`, `example.tsx` `camAt`). Episode code copies into `video/src/screen/<id>/` (ep03: `kit-needs.md`); the proof keeps rendering as the reference.
- One `World` with all stations and a state object; per-scene cue tables `[beat, word, kind, target, seconds, what]` in `storyboard.json` shot props, resolved to frames from `voice/words` (`word#n` as `sfxWord`).
- Checks: stills at every camera preset (no slivers at the frame edge), at each cue ± 0.5 s and at each beat's last frame, at full size and 360 px; a one-frame-per-second sheet (no two adjacent tiles alike outside rests); PSNR across scene joins and door portals.
- Gotchas: neighbours within ~960/z of a preset's centre appear cropped; a caret must not blink (rests must be still); zsh does not word-split `$n` in loops (Boat stills); `word#n` anchors are 0-based, and words that recur in a beat ("so", "delete", "stamp") resolved to the wrong occurrence twice in ep03; check every cue against `voice/words`.

## Open
Door portal (a nested-stage push) is unbuilt; the fallback is a matched cut at full fill. Evidence over the set vs a wall the camera visits. Non-security mechanisms (§4).
