# EP01 — package review r1

| Check | Result | Evidence |
|---|---|---|
| Title ≤ 60 chars, claim or puzzle | PASS | "Websites Don't Know Your Password" — 33 chars, a counter-intuitive claim. |
| Thumbnail adds an angle | PASS | `out/thumbnail.png`: "They can't read it." over a stored Argon2id row. The title says *websites* don't know; the thumbnail says *they* (the company) can't read it and shows what they store instead. |
| Feed size (168×94) | PASS | Headline legible at feed size; the hash row reads as a code strip, not text — acceptable as the focal object. Not ranked blind against real niche thumbnails (no human panel); do that before upload. |
| Promise kept in first 30 s | PASS | 0:00–0:19 answers "a well-run site doesn't keep a readable copy" and poses "what is it checking against?"; RockYou lands at 0:20. |
| Description | PASS | `out/description.md`: 2-line summary, 17 chapters from the build (`out/chapters.txt`, first at 0:00, all > 10 s apart), 11 source groups from the fact sheet, benchmark caveat, AI-narration credit. |
| Captions | PASS | `out/captions.srt` generated from the voice-timed build (script text, not Whisper), so spelling matches the script. |
| Disclosure | Not required | Animated diagrams + TTS narration of an original script; no realistic synthetic people or events. The description states "AI voice (Kokoro TTS)". Ticking YouTube's altered-content box is optional and harmless. |
| Inauthentic-content risk | Low for ep01 | Original research, computed hashes, specific narrative. Risk grows if later episodes reuse this exact template and voice unchanged — rotate templates per `docs/research/Script flow teardown.md`. |

**Before upload (human):** listen once end to end on headphones; rank the thumbnail against 5 real thumbnails; confirm the Kokoro licence note (Apache-2.0 model, voice usable commercially).
