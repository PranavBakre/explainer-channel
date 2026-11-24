# Cut-paper stop motion

**Reference only for season 1.** Screen-first is the locked season look (`art-direction` §0). Use this file for its lessons and failures; an episode uses this look only after an explicit operator decision recorded in `LEARNINGS.md`, never for one episode.

Settled with the operator on the ep01 redo, 2026-11-11. Evidence: `episodes/ep01-password-storage-r2/package/` (not in repo) (`thumb-peel.png`, `styleframes/compare.jpg`, `styleframes/paper-test-v4.mp4`, the accepted motion reference; `paper-test-v2-rejected.mp4` is what not to do).

## 1. Idea
Everything is cut paper lying on a table, shot from above and moved by hand a step at a time. The operator's reference: "Shaun the Sheep", meaning the handmade frame-by-frame feel of stop motion, not clay puppets.

## 2. Anchors (fixed)
- **Amber paper is the password** (and the marker highlight on evidence). Nothing else is amber.
- **Red paper means exposed**, teal means protected, per the channel palette. Black, white, cream and newsprint are neutral stock.
- Type: §7.
- **The character**, in a format that uses one (`script-writing` §2; not a concept video unless its brief needs one), is a cut-paper puppet of whoever the story follows: a head with paper-disc eyes and a name tag, reused across episodes. Its words sit on a paper slip beside the face, never on it, and it keeps its place in the frame (`storyboard` §1.2). It may blink or idle, including during breath rests (operator, 2026-11-13); that is the only motion a rest allows.
- Open: the props themselves. Each episode designs its own machine, board and cards in this material.

## 3. Colour over time
The table's paper colour is the state of the thing at risk, not a background choice.
| State | Field |
|---|---|
| Scenario, advice, ending | cream or kraft |
| Exposed (plain text, a fast verdict) | red |
| The mechanism and the attack | black |
| Protected (salt, slow hash) | deep teal |
Red is about a fifth of the runtime and lands where the thumbnail promised it. The operator rejected a solid red video: "all red will be too tiring".
There is no clock on the field. The operator's earlier "keep on regularly changing the background before it becomes monotonous" meant, in their words on 2026-11-13, "I meant dont make a ppt. the video has same bg but action keeps on happening in a flow". The field may hold for a whole act while actions follow one another on it (§6, `storyboard` §1.2); swapping the table inside an act needs its reason written in the storyboard, and a state change is one.

## 4. Medium per mechanism
| The mechanism is… | In cut paper |
|---|---|
| a physical-feeling process | a paper machine on the table that does the step on screen (a card feeds in, gears turn, a strip feeds out); one machine = one part of the system all episode |
| a user-facing flow | a whole paper phone on the table (§6 framing). Open: a full flow in paper is not yet proved |
| evidence from a source | a press clipping (§8) |
| a list of rules | each rule as what happens to the running example on the machine; the clipping only as proof |
| real hardware or a place | a black-and-white photo print on the table; machines we can draw (a laptop and its readout) are paper |

## 5. Material and process
- Photographed paper stock clipped to each piece's shape (`video/public/paper/{black,cream,white,amber,newsprint}.jpg`); edges slightly irregular, as cut by hand.
- Layers: a prop is several pieces stacked (body, inset panel, slot lips, window, gears), each with its own small shadow, offset down-right.
- On a black table shadows nearly vanish. A lighter mat under each station was tried in the rejected second test; not settled.
- Texture comes from the paper photographs only. No grain overlay, glow, gradient or bloom.

## 6. Motion
- Pieces move in steps, 12 per second, with a tiny jitter while moving (≤ 1.5 px, ≤ 0.4°) and none at rest. The camera is smooth at 30 fps.
- Not a slideshow (operator: "don't make it a slideshow"): the mechanism happens on screen (a card feeds in, gears turn, a strip feeds out, a flap flips, a sticker peels); one table per act with the camera travelling between stations instead of cutting between plates. Travel goes left to right ("because you are moving ahead"; an upward travel was rejected) and follows something being produced, such as the strip's leading end.
- Something happens on every beat, on its word; then the picture rests. After a thing the viewer must read lands, nothing moves for at least 1.2 s.
- **Breathing pauses** (operator on the first full cut: "I am missing breathing pauses… each chapter should ideally have a breathing pause"). Every chapter ends on about 2 s of silence over its settled last picture, and holds one more still beat of about 1.5 s after its key reveal. Build support: `pauseScene` / `pauseAct` in `storyboard.json`, `pause` on a beat. The first cut had neither, because the builders were told that something must move every 2 s; that rule fills the rests and is withdrawn.
- **Framing: whole objects, with table around them.** A phone, machine, board or card is shown complete; the camera does not crop the object it is about. On the first full cut the builders had been told to make the active piece span at least 60 % of frame height and to push in for 72 px text, and the operator's verdict was "the content is too zoomed in… phone doesn't fit fully. the previous version was better". The earlier framing (phone about a quarter of the width, drawer about a third, bare table beside it) is the reference. When text is too small to read, enlarge the piece or bring a large copy of the value to the camera; do not zoom until the object is cut. A push-in is for a clipping's sentence, not for props.
- **Content is produced by an action on screen, never just present.** A hash comes out of the machine on the strip as it feeds; a tag is dropped; a clipping is placed. Nothing that matters is already on the table when the camera arrives: in the second test the LinkedIn clipping was in place before the camera got there, and the operator's verdict was "it was just there".
- **One instance of each thing.** A second hash on the same strip read as a duplicate, even though it was a different password's hash.
- Open: reading order on a strip that feeds sideways (the line emerges last characters first). Untested fix: feed it like a receipt, line by line.

## 7. Text on screen
- Instrument Serif for big words and verdicts, Inter 700 on paper tags, JetBrains Mono 700 for passwords and hashes, all near-black ink (`#141414`) printed on a paper surface.
- No floating captions: every word sits on a tag, card, strip or board. The phone-size and contrast rules in `storyboard` §4 apply to the printed word against its paper.
- Too small to read → enlarge the piece or bring a large copy of the value to the camera (§6 framing), never shrink the rule.

## 8. Real captures and footage
- A web capture becomes a press clipping: greyscale with slightly raised contrast, multiplied over newsprint, cut as a slightly rotated piece, taped at two corners, never over the quoted sentence. The words are the unaltered capture.
- The quoted sentence gets an amber marker stroke drawn left to right; source and date sit on a small white tag.
- Clippings sit on cream or black, never on red.
- **Reading comes first** (operator: "for the news pages, too many items move. so i am not able to focus on the text at all"). Order: the clipping is laid in one action, already framed so the sentence reads; full stop; the marker is drawn on the spoken word and is the only thing moving; hold at least 2.5 s. No tag lands or lifts and the camera does not move while the text is on screen; a summary slip comes after the hold or not at all.
- Footage becomes a black-and-white photo print on the table. Machines we can draw (the laptop and its readout) are paper.

## 9. What failed
- Painted 3D props on pastel walls with caption pills (see `painted-props-3d.md`).
- A sentence set above a small diagram on flat ink.
- A front-on sign with a number on it: readable, nothing to look at.
- Second motion test (five changes in one round): the operator called it worse than the first because the clipping was already in place and a second hash sat on the strip. Kept from it, in the operator's words "the back failure on the hash paper": the strip is pushed back into the slot and springs out, which sells "no way back" as an action.

## 10. How it is built
- Helpers: `video/src/paper/paper.tsx` (`Piece`, `roughen`, `rectPath`, `gearPath`, `stepOf`, `STEP_RATE`); the test scene is `video/src/paper/PaperTest.tsx`, composition `paper-test`.
- Style frames and thumbnails: generated plate with blank surfaces + type in code (`video/src/thumbs/StyleFrames.tsx`, `ThumbGen.tsx`). The style block that produced consistent plates: "a flat graphic scene built entirely from layered cut paper, photographed straight on in soft even light; visible paper tooth, crisp hand-cut edges, small soft shadows between layers, screenprint-flat colours; palette: <field>, white, black, one amber accent; no text, letters, numbers, logos, people or hands; blank surfaces stay blank".
- Stock: one plain-sheet photograph per colour, generated as "a flat, evenly lit, straight-on photograph of a single plain sheet of <paper>, uniform from corner to corner, no vignette, no objects".
- Checks: one-frame-per-second sheet where every beat shows its action and each chapter shows its two rests; 360 px stills readable; the operator watches motion.

## Open
- Not yet proved: a full act's colour changes, the phone flows in paper, a teal-field shot, the character puppet (prove it in the pilot of the first episode that uses one, `storyboard` §1.6).
