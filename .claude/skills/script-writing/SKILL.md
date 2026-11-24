---
name: script-writing
description: Write or revise the narration script (script.md) for a long-form explainer from the fact sheet and brief — architecture choice, word budget, spoken-form writing for Kokoro TTS, fact tags and on-screen notes. Use when drafting a script, rewriting scenes after a script-review or visual review, changing a claim, or fixing a line the TTS mispronounces.
---

# Script writing

Inputs: `factsheet.md` (VERIFIED facts only), `brief.md`, `docs/my-writing-style.md` §§5–6 (binding). Output: `episodes/<ep>/script.md`.

## 1. Pick the architecture
Read only the chosen template's section of `docs/research/Script flow teardown.md` (its beat sheet and example videos), not the whole file.
| Topic type | Template |
|---|---|
| Concept explainer | Problem chain: naive way → where it breaks → the fix → where *that* breaks … |
| Incident, known cause | Primer-before-failure |
| Incident, cause hunted | Detective investigation |
| How a big system works | Scale tension + numbered mechanisms |
| What if X failed | Timeline scenario + reality check |
Pick by topic first; the row is the episode's **format**, named in `brief.md`. The first row is the *concept video* (ep01, ep02); the two incident rows are the *story formats*, told through someone. Rotating templates across episodes is a house preference against looking templated; it does not make an episode original. Originality is the angle and the take, judged in review.

## 2. Budget
Estimate running time from a word count at **145 words a minute**, pauses included: spoken words ÷ final duration of the shipped episodes (ep02: 1,113 words in 458.4 s = 146; ep01 r3: 1,206 in 502.4 s = 144). It replaces the style guide's 150 wpm pace math for every estimate made before a voice exists (scene times, the cold listener's narration, the review's Pace row); once a voice exists, use its measured times. So 8 min ≈ 1,160 words, 10 min ≈ 1,450. Write a beat table first: beat · job · % runtime · word budget · open loop planted/closed · take · light line. Re-hook every 60–120 s by opening the next question, not by announcing it.

The table must show, before any prose is written. A rule that names a format applies only when the brief names that format; the references behind it disagree across video types, so it is evidence for that format, not a channel law:
- **Ten-rule notes.** In `script.md`'s header, go through the ten rules in `research/reference-mouSkcAltqM.md` §9 ("The ten rules run against ep02"; Linus' own words are in §4's beat outline) for this episode's format: per rule, what it would bring and change in this episode, or why it does not fit a learning-first video of this format. They are an entertainment-first studio's house advice (operator, 2026-11-13: "LTT is more entertainment focused with a little learning sprinkled"), so each is a candidate, not a standard. Candidates to weigh there: a takeaway end card (rules 1, 8; `storyboard` §2), cutting narration that only describes the picture (rule 9), asking in the viewer's voice rather than "I'm glad you asked" (rule 5). `script-review` §3b checks only that adopted items were done.
- **Story formats: someone the viewer can see.** Name who the story follows; they are an on-screen character from the first beat (`storyboard` §1.2 draws them). Evidence: the faceless incident reference's robot cast (`research/reference-Jktv8v8ICpk.md` §3). A concept video uses one only when its brief says the story needs it (operator, 2026-11-13: "yes if there is a need for a character. our two videos were concept videos").
- **Open inside the story.** The first 10 s are the fact sheet's most startling hook candidate as one concrete case, and the title's promise is said by 0:30 (every format); a question title is asked and answered in a word there (ep03: "So can a fake page fool a passkey?" at 0:28.8, answered by 0:32.0). Story formats play the case through as a cold open (the incident reference's 100 s; ACI); a concept video follows the hook with its first concrete model (Veritasium).
- **When to give the answer depends on the promise.** If the brief promises something the viewer does (season 1's security thread), the answer comes by about 0:45 and only why it is surprising waits. Our own evidence: ep02 answered at 6:42 and the cold viewer left at 1:09 (the entertainment clip's rule 3 points the same way). Otherwise the title is paid at about 60 %, as every narrative architecture in the teardown does. The references disagree on purpose (`research/reference-mouSkcAltqM.md` §10). Concept videos and story formats plan a reveal that reframes what came before (Veritasium's Collatz at 85 %, the incident reference at 61 %).
- **The ending is written first** and pays something off (the reveal, or one picture of the whole system); it never restates the board or ends on a list. Ep02 ended on its score and a list of habits, and the cold viewer left at 6:17. **No next-episode teaser** (operator on ep03 v2, 2026-11-15: "Don't do this up next please."): the episode ends on its payoff line.
- **Every episode stands alone, watchable in any order** (operator on ep03 v2, 2026-11-15: "These videos should ideally be watchable in any order even though a linear is preferred."). No "last episode", "like last time", "again" or "we're back to…"; state each idea the episode needs in its own words (ep03: "Last episode, the same page took your password…" became what a fake page normally does). A season's running example (narrator, app, password, addresses) may recur, but it is introduced each time as if new; the brief's Viewer line says "has not seen any other episode".
- **The viewer knows where they are.** Count or name the parts aloud as each starts ("way in number three: the fake page") and on screen (`storyboard` §2 chapters). Ep02's board rows stayed unnamed until reached.
- **Each act voices the objection or misconception it answers**, as the viewer or the character would say it ("But can't they just…?"). Evidence: the misconception research in `docs/research/Tech explainer YouTube playbook.md`, and ep02's cold viewer asking what an authenticator changes when you approve the fraud yourself, which the script never voiced.
- **Write for the brief's viewer, heard once.** No technical term, product, organisation, abbreviation or database word (MD5, hash, salt, table, column, second factor, OWASP, NIST) before it has been introduced in plain words; name a thing by what it does first ("an outdated method"), give its name when the viewer can place it. The hook counts: the ep01 redo opened on "a site stores passwords with M D five" and "it depends on one column", and the operator rejected it; the first cut's "a row with your email on it, and next to it…" was right. A redo without its own `brief.md` copies the Viewer line into the script header before writing.
- **Promise only what the sources let the viewer do.** A "what to do about each" promise needs a viewer-level action in the fact sheet for every part; ep03's door two had none, Payoff scored 2 until the promise was narrowed, and three listeners in a row (1,047 to 919 words) left at that door however much was cut. When listeners keep leaving at a limit, look for the missing action in `episode-research`, not in the word count.
- **The template is a menu, not a checklist.** Mark in the table the beat where the running example's story resolves (its answer, or its reveal where the answer came early). Every beat after it is either "what do I do" or the ending; a later template beat (a test on a new case, where it still breaks) stays only if it is told as one of those, and is cut otherwise. The ep01 redo answered `mango@123` at 5:00 and then placed a second prediction exercise, a how-it-works detour inside the advice and a fourth company example; a cold listener left at the first of them.
- **Tell a mechanism once.** A later beat that replays an attack or flow the viewer has already seen loses them once they can predict it: ep03's door one retold the opening's password-and-code relay and the video's cold viewer left there (2:49). Refer back in a clause and spend the beat on what is new.
- **One line and one number per dated example.** The name, the year and the one figure that answers the episode's question; a second figure or a side detail is a new beat that must earn its own job. Ep01's Adobe beat ran three lines (the breach, the user count, the hints) on a point already made.
- **A take closing every section** (style guide rule 9) and **one deadpan line per two minutes** (rule 11). Ep01 had neither for ten minutes and read as a fact-check, not a narrator.
- **The running example's verdict** in the last act: what the final design means for that exact example, from a computed fact. Ep01 carried `mango@123` for ten minutes and never said how long it would last.

## 3. Writing rules beyond the style guide
- **The script is the TTS input.** Write every line exactly as spoken; on-screen text and captions get the written form from `voice/written.json`. Never fix pronunciation with a hidden lexicon: the script, the review and the audio then disagree.
  - Initialisms: spaced letters ("N I S T", "M D five"), **except a lone letter A**, which Kokoro reads as the article "uh": write it fused ("SHA two fifty-six", never "S H A").
  - Symbols and names as said, in the operator's form (ep01: "@" → "at the rate", not "at sign").
  - Article + noun pairs can fuse into another word ("a salt" → "assault"); reword ("That string is the salt").
  - Letter-name runs ("A to F") stay ambiguous after respelling; reword instead ("a jumble of digits and letters").
  - Acronyms said as a word keep their written form in the script and are listed in the header's Spoken forms with how they are synthesised (ep03 v2 said PIN as "P I N"; it is synthesised as lowercase "pin", `voice-narration` §2).
  - **Heteronym scan before voice.** Search the narration for words with two pronunciations and reword any that context does not settle: live/lives (ep03 v2: "My page lives at…" came out as human lives), read, lead, close, use, used to, record, minute, present, object, wind, tear. Write "sits at", "stay on", "shut", "give". List the scan in the header's Spoken forms; a transcript check cannot catch these.
- **Claims keep their source's scope.** Teasers, comparisons and recaps inherit the exact conditions of their fact (charset, length, hardware, date, "SHALL NOT" vs "should not"). An accurate payoff does not repair an overbroad tease. A cut for pace is a claim change: ep03 r4's cuts widened three claims in one round ("break into the app" lost the stolen copy of the stamp, "fake-page attacks" replaced the survey's measured "phishing", "usually" added a prevalence), so re-read every shortened fact line against its sheet entry and get a closure check before the next listener run. A scenario's choice is not advice: ep03's recovery-by-text scenario became general advice about email recovery; scope advice with "can". When a line must be short, an on-screen clipping may carry the source's attribution and qualifier (ep03: NIST's "potential weakness" on screen, the spoken attribution cut).
- **Size the caveat to the viewer.** A measurement's scope gets one plain clause ("we timed it on a laptop"), never a methods comparison. The ep01 redo spent two beats on graphics card versus laptop core and bcrypt cost five versus ten; correct, and the operator cut them: this viewer wants what a machine they can picture does, not benchmark fairness. The rigour stays in the fact sheet.
- **No "in my opinion" on a claim the video has shown** (operator on ep03 v2, 2026-11-15: "Drop in my opinions for things that make complete sense."). State it plainly. If a claim really is only the narrator's judgement, reword it to what the sources support instead of hedging it (ep03: "In my opinion, the way back in is now the weakest door" became "So the way back in stays open, and adding a passkey doesn't touch it.").
- **Keep scope by naming the case, not by hedging.** Say the conditions once as plain nouns ("one RTX 4090, every eight-character password of lowercase letters and digits, seventeen seconds"). Phrases that point at a condition without saying it ("in some of those formats", "at the tested setting", "in a common library's format") are reviewer language: name the thing, or move the condition to the `> on-screen` source label.
- **A mechanism is explained only when the story asks for it** (every format except primer-before-failure, whose primer comes first by design, as in Mentour and Manley). A beat that defines or explains is asked for at that moment ("but how could it…?") and answered on the same picture; never a "first, what X is" step back. Ep02's 1:08 and 3:50 step-backs were both cold-viewer click-aways.
- **Facts belong to the brief's audience.** No developer-side fact (key storage, protocol names) in a consumer episode, even a VERIFIED one; ep02's RFC key-storage line was the 3:52 click-away.
- One running example (a person, a password, a payment) carried through the whole episode; return to it whenever a new term appears.
- One rounded number per idea, spoken as words, and at most one new number per paragraph. When a source gives competing counts (accounts, records, active users), speak the one that answers the episode's question and put the rest on screen.
- A list of rules (a standard, a guideline) is at most three spoken items, each told as what happens to the running example, not read out as clauses.
- Define jargon once in ≤8 words.

## 4. Format
```
## S<nn> — <beat name>
One narration line per paragraph (one or two sentences: each becomes a beat). [F<n>]
> on-screen: <exact text or number that must appear, with its fact id>
```
`tools/sync-storyboard-vo.py` reads these paragraphs and strips `[F<n>]` tags; keep one paragraph per storyboard beat.

**Script and brief agree before review.** Where the script departs from `brief.md` (scene count, reveal position, length, colour script), update the brief in the same step. A new length goes into the brief as one binding figure, a word range or a minute range, never both (880 words is about 6:04 against a stated 6:15); ep03's r6 reviewer refused a verbal acceptance and reopened Pace, and r7 passed once brief §1 held 880–980 words. Re-read both files after every edit; an edit that failed is retried until the re-read shows it (the ep03 dry run left a nine-scene brief beside a ten-scene script after two failed edits).

## 5. Revising after a review
1. List every changed claim, number or term.
2. `rg -n "<old wording or value>" episodes/<ep> video/src tools/lottie` and update every hit in the same change: storyboard or segment props, TSX literals in `video/src/segments/**` (ep01's recap hard-coded a ciphertext), Lottie generators, `voice/written.json`. Narration sync does not touch on-screen props (ep01 kept "every short password" in visuals after the script was fixed).
3. Bring `brief.md` into line (§4), then send the diff and the changed-claim list to `script-review` (rubric review, cold listener §3a, ten-rule notes §3b); only a passing script is voiced.
4. Then re-voice with `voice-narration` §6 (it branches on no storyboard / single storyboard / segments) and re-run `video-qa` on the affected shots. Earlier video and package passes are void for anything these inputs feed.

## NEVER
- Never use a fact that is UNVERIFIED or missing from the sheet; add it via `episode-research` first.
- Never write signposted reveals or slogans: "the catch is", "here's the thing", "it turns out", "what if I told you", "that's the whole game"; the style guide's own rule became a tic in ep01.
- Never open with a greeting or "let's dive in"; the first sentence puts the viewer inside the case (§2).
- Never reference visuals the viewer may not see ("as you can see") without a storyboard cue.
- Never end on "smash that like" or a next-episode line; end on what the viewer now knows and one thing they can do.
