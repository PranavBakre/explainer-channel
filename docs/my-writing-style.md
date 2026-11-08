# My writing style: analysis and narration guide

Draft for review. Built from my own writing in Notion, Slack, and the prompts I type or dictate to Claude Code and Codex. Text that was clearly AI-drafted or AI-summarised was left out or flagged. Where a page mixes both, only the parts that read as mine are used as evidence.

---

## 1. Voice in brief

- **Direct and short.** Typed sentences have a median of 7 words. I open with the ask or the verdict ("this logic doesnt make sense") and skip warm-up, pleasantries and recap.
- **Concrete over abstract.** I name the real thing (Valkey, Cloud Run, GLiNER 0.6B, `res.write`) and keep the one number that matters, for example "Brought it down to 12 mins from 4 hrs."
- **I explain by contrast.** "Instead of X, Y" shows up in 220 of my prompts, and I often follow it with a "let's say…" scenario. I set up the default, then show why it breaks.
- **I hold opinions and say so.** "In my opinion" (85 prompts), "I am of the strong opinion", "Opine" (70). I also ask other people for theirs: "tell me your honest opinion".
- **Builder's pragmatism.** I care about cost, effort, what's in scope and what's deferred: "Future extension is ofcourse named playlist but thats not in scope for now."
- **Dry, deadpan humour, kept short.** "Design 1 is measles", "Basically it's farting", "When you spend 3 hours on a bug and the solution is to add a .png at the end", and XD at the end of a line.
- **Indian-English, informal register.** "acc to", "atleast", "ofcourse", "post event", "solve for", and "brother"/"bro"/"dude"/"sir" used as asides.
- **Occasional flashes of imagery.** These are rare, and they're my best lines: "Event is the Crescendo of a symphony. Not the symphony.", "Hosting becomes a rite of passage", "Is the high still there?"

---

## 2. Registers

| Register | Where | What it looks like |
|---|---|---|
| **A. Typed prompt / chat** | Claude/Codex prompts, Slack threads | Mostly lowercase (70% of prompts start lowercase), dropped apostrophes ("dont", "doesnt"), numbered decisions ("1. Standalone page / 2. … / 3. fair / 4. fair"), one-line corrections ("you flipped the colors bro"). Commands come before reasons. |
| **B. Dictated / voice** | Longer prompts from the last few months, some Slack | Full sentences, conversational, hedged reasoning: "What I meant was that let's see your startup is plateauing, so you need to build a new feature at that time…". Uses "Honestly I'm of the opinion", "Again wouldn't what you're saying lead to this". Has transcription slips. **This is the closest thing to my speaking voice.** |
| **C. Working docs (2024–25, clearly mine)** | Notion approach docs, payouts flow, self-review | Plain labels ("Approach:", "Why not a separate package:", "What can cause delays:"), numbered steps, short declaratives, the occasional typo ("Approch", "rellies"). Little decoration. Reasons stated flatly: "PR not merged in yet. Thus a fork of the package is in order." |
| **D. Polished docs (2026, AI-drafted, I edited)** | GCP migration, GitHub Actions cost approach, recent standups | Tighter and number-led. My edits push toward real product names, one key number, no filler, and a risk followed by its alternative and cost. Treat the *edits* as my taste, not the prose itself. |
| **E. Personal / reflective** | "Buildathon" note, self annual review | Shortest sentences, a bit of rhythm, honest self-critique: "Tempers a hot. I am hungry but I am time restricted." / "Fear of deploying big tasks." |

The main difference: A and C are clipped and functional. B and E carry personality: rhythm, scenarios, admissions. The narration voice should come from **B + E, edited with the discipline of D.**

---

## 3. Patterns with examples

### Sentence length and rhythm
- Short declaratives, and sometimes fragments in a row:
  - "Vibe code; Code works; Code doesnt work; Stress" (Notion, Buildathon note)
  - "Cool. At what point do we rate it platform ready?" (Slack)
- In dictated mode the sentences run longer and chain with "so", "because", "and then". (chat)

### Openings
- **The verdict first:** "this autosave is terrible." / "This is not what I intended." / "Love this design." (chat / Slack)
- **Context in one line, then the ask:** "Removing project deadlines. Do you have any idea or insight on why coursera keeps deadlines but allows you to extend them?" (Slack)
- **The goal as a heading in docs:** `Goal` / `Constraints` / `Subgoals`, or "Introduction: Currently access to the platform is governed by…" (Notion)

### How I explain
- **Contrast with the default:** "Instead of firing one single API with all the details in one go, it is firing for every user individually. That basically exploded." (chat)
- **A worked scenario:** "An event got approved, then the host uploaded more invoices, the event should fallback to approval pending." (Slack)
- **Cause → effect → consequence, with nothing extra:** "If the editor is empty, a new paragraph node is created by default… For one system, the updates vanish, for the other, the updates duplicate." (Notion, 2024)
- **Analogies from games and culture:** the karma discussion used Valorant rank stigma and GTA Online inflation (captured in an AI-summarised note, but they're my references). The symphony line above is another.
- **Options as a table with pros, cons and effort:** "make a table with pros cons and dev effort" (chat). In my docs: "There are 2 approaches over here, both of which have their pros and cons listed." (Notion)

### Vocabulary
- Recurring words: *essentially, basically, solve for, figure out, instead of, fair, the idea is, scope / descoped, iteration, V1/V2, go live, high-level*.
- Builder jargon used without explaining it: *GTM, ICP, KT, FE/BE, PR, flag, CRON*.
- Teaching principle written in caps: **"DON'T PREACH — just TEACH"**. Closing line I planned for a workshop: "You are not masters of AI — this was an introduction." Alternative: "Now you know what you don't know." (Notion, workshop notes; the second line may have come from AI expansion, so confirm)

### Humour
- Deadpan, one line, usually at my own expense or a system's: "I was on the wrong. github account XD", "Junior and friday have now started speaking with each other XD", "Trying to copy Natasamrat." (Slack)
- Blunt comparisons: "Design 1 is measles / Design 3 is mixing three different design systems into 1". (Slack)
- I never build a joke up. It lands as an aside.

### Indian-English and cultural markers
- "acc to me", "atleast", "ofcourse", "May be we…", "post approval / post event / post payment" (post used as a preposition), "solve for", "sans notifications", "Happy Dhanatrayodashi", "Brother, there is no registration flow…".
- I don't write Hinglish in text. The one Hindi passage came from a dictation mistranslation ("I did not intend to speak Hindi"). Marathi cultural references show up now and then (Natasamrat).

### Punctuation and formatting
- **Numbered lists everywhere**, including inline in chat ("1. … / 2. … / 3. fair").
- Few em dashes in my own writing. A heavy em-dash page is a sign of AI drafting.
- Lowercase sentence starts, dropped apostrophes, double "??" when exasperated ("two statuses?? wouldnt that cause the same problem?").
- `PS:` for afterthoughts (52 prompts). Caps for hard rules: "DO NOT BREAK MOBILE UI", "DO NOT COMMIT IMAGES".
- XD instead of emoji or "lol".

### What I cut
- Filler purpose clauses ("that runs our apps", "for our servers"), effort estimates, open questions that aren't real decisions, trial-run items. (Stated in my approach-doc feedback.)
- Plain-language paraphrase that loses the real name: "private network" was rejected, "VPC in GCP Mumbai with Cloud NAT" was kept.
- Over-complication: "started simple then suddenly went too complicated" (chat), "Overcomplicated Solutions" (self-review).

### What I emphasise
- **Cost and effort** ("I dont want to spike my middleware costs cause it will run on every route").
- **Scope:** what's in, what's out, what's V2.
- **The user's actual experience:** "the feedback has been very negative with members having difficulty with starting consumption." (Notion)
- **Honest trade-offs**, and admitting when I was wrong: "Should have implemented with direct API calls vs CRONJOB." (self-review)

### Recurring phrases
"essentially", "basically", "in my opinion", "Opine", "let's say", "instead of", "solve for", "figure out", "fair", "the whole idea is", "what I want to do is", "Let's discuss", "ask me questions", "brother", "XD".

---

## 4. Keep vs. won't translate

### Strengths to keep
1. **Verdict first.** Good for retention, since the first 10 seconds carry the claim.
2. **Contrast-based explanation** ("instead of X, Y"). This is the core teaching move.
3. **Real names plus one number.** Credible and specific, and it doesn't drown the listener in data.
4. **Scenarios** ("let's say your startup is plateauing…"). These are easy to picture.
5. **Honest trade-offs and admitted mistakes.** They build trust and set the channel apart from hype.
6. **Short deadpan asides.** A bit of personality without turning into a comedy bit.
7. **"Don't preach, just teach."**

### Habits that won't work in spoken narration
| Habit | Why it fails on audio |
|---|---|
| Numbered and nested lists | A listener can't see "3.b". Say them in order as sentences and keep it to three items at most. |
| Unexplained jargon (GTM, ICP, FE/BE, CRON) | Fine for a team, but it loses a general tech audience. Define each term once, in plain words, the first time it appears. |
| Lowercase, dropped apostrophes, "??", XD | Text-only signals. A TTS voice or narrator flattens them. Get the tone from word choice instead. |
| Very clipped fragments ("Code works; Code doesnt work; Stress") | Good as a one-off rhythm beat. As the main style it sounds robotic in AI voiceover. |
| Command voice ("Find it and raise a PR") | Fits prompting. On screen it reads as bossy. Narration should address the viewer as a peer, not an agent. |
| Tables and pros/cons grids | Need an on-screen graphic. Say it as "the upside is… the cost is…". |
| Dense numbers | One number per idea, rounded and said the way people speak ("about four hours", not "3.8 hrs"). |
| "brother", "sir", "dude" | They're aimed at a specific person. One "look," or "honestly," gives the same warmth without addressing someone. |

---

## 5. Narration voice guide (YouTube, 140–160 wpm)

**Pace math.** 150 wpm ≈ 2.5 words a second. A 60-second segment is about 150 words. An 8-minute video is about 1,200 words.

### Rules
1. **Open with the verdict or the surprise in one sentence.** No "Hey guys, welcome back." Example: "Most apps don't actually store your password."
2. **Use the contrast move in every concept.** State the naive way, show where it breaks, then give the real way: "Instead of X, systems do Y, because Z."
3. **Run one scenario through the whole video.** "Let's say you're running a food-delivery app at 8 PM on a Friday." Come back to it every time a new term appears.
4. **Real names, one number.** Say "Cloudflare", "Postgres", "Redis", not "a caching layer". Give one memorable number per idea, rounded for speech.
5. **Define jargon once, in eight words or fewer, the first time.** "A CDN, basically a copy of your site sitting closer to you."
6. **Sentences of 6–14 words, most of them.** Allow a 3-word punch line after a longer setup. Avoid any sentence you couldn't say in one breath.
7. **Three items, max.** Say them as plain sentences in order. No nesting.
8. **Allowed tics, used sparingly:** "essentially" or "basically" once a minute at most; "honestly" to mark an opinion; "let's say" to start a scenario; "in my opinion" when taking a side. Cut the rest.
9. **Take a side.** End each section with a clear take: what you'd use, when it's overkill, what it costs.
10. **Name the trade-off without a signpost.** Show what breaks inside the scenario ("Change your logo, and someone in Mumbai sees the old one for an hour"). Never announce it with "the catch is" or "but here's the thing".
11. **Humour is one deadpan line per two minutes.** Make it self-deprecating or poke at the system, then move on. No setup, no "haha".
12. **Images only when they earn their place.** One strong metaphor per video, like the symphony line. Don't stack metaphors.
13. **Indian context is welcome.** Use rupees, UPI, IRCTC Tatkal, Swiggy at dinner time, Mumbai local trains. Keep the English neutral: no "acc to" or "atleast" in the script, but "solve for" and "let's say" are fine.
14. **Don't preach, just teach.** No "you should", "it's crucial", "in today's fast-paced world". Show the mechanism and let the viewer reach the conclusion.
15. **Close with what they now know, plus what they don't.** For example: "That's the basics. Now you know what you don't know."
16. **Write for the ear.** Read every line aloud. If you'd trip over it, rewrite it. Spell numbers the way they're said ("two hundred milliseconds").

### Banned (reads as AI-explainer)
"In today's digital world", "Let's dive in", "game-changer", "seamless", "robust", "unlock", "delve", "It's important to note", "In conclusion", "Whether you're a beginner or an expert", stacked rhetorical questions, three-adjective lists, and more than one em-dash aside per paragraph.

### Banned (overused YouTube patterns)
- Signposted reveals: "The catch?", "The catch is…", "Here's the thing", "Here's the kicker", "But there's a problem", "Spoiler:", "It turns out…".
- Hype openers: "Here's a trick most people miss", "What if I told you", "Nobody talks about this".
- Aphorism closers: "That's the whole game", "That's where the real work is", "And that changes everything", "X in, Y out" twists on old sayings.
- An "Honestly," bolted onto a punchline to make it sound candid.
- A section that ends on a slogan. End on a concrete consequence or a take instead.

### Before / after examples

**Example 1: What is a CDN**

*Before (generic AI explainer, ~95 words):*
> In today's fast-paced digital world, website speed is more important than ever. That's where Content Delivery Networks, or CDNs, come in. A CDN is a geographically distributed network of servers that work together to deliver content to users quickly and efficiently. By caching content at edge locations closer to users, CDNs significantly reduce latency and improve load times. This not only enhances user experience but also reduces the load on origin servers. Whether you're running a small blog or a large e-commerce platform, leveraging a CDN can be a game-changer for your website's performance.

*After (my voice, ~110 words, ~45 seconds):*
> Your website lives on one server. Let's say it's in Virginia. You're in Pune. Every image you load travels halfway around the world and back. That's slow, and it's slow every single time.
> A CDN fixes this. Instead of everyone fetching from Virginia, copies of your files sit in cities near your users. Mumbai, Chennai, Singapore. Cloudflare and CloudFront are the big ones.
> First request, the copy gets made. Every request after that comes from next door.
> Copies go stale, though. Change your logo, and someone in Mumbai might see the old one for an hour. For a logo, fine. For a stock price, not fine.

**Example 2: Fine-tuning a small model**

*Before (generic AI explainer, ~85 words):*
> Fine-tuning is a powerful technique that allows you to adapt a pre-trained language model to your specific use case. By training the model on a smaller, task-specific dataset, you can significantly improve its performance on specialized tasks. This approach is particularly valuable for businesses looking to leverage AI while reducing costs. It's important to note that fine-tuning requires high-quality data. In this video, we'll dive deep into the fine-tuning process and explore how you can unlock the full potential of AI for your organisation.

*After (my voice, ~115 words, ~45 seconds):*
> You can use ChatGPT to train a model that does one of ChatGPT's jobs, on your laptop, for free.
> Let's say you want to pull company names out of job posts. A big model does it fine, but you pay for every call. A small model, around six hundred million parameters, runs on your laptop for free. Out of the box, though, it misses things.
> So you ask ChatGPT to write a hundred labelled examples. You fine-tune the small model on those. Twenty minutes later it catches what it missed.
> Whether this works depends on those hundred examples. If ten are labelled wrong, the small model learns the mistakes and makes them just as confidently. Most of your time goes into checking examples, not training.

---

## 6. Style prompt (paste into script prompts, ~220 words)

```
Write the narration in Pranav's voice: a product engineer explaining tech to smart non-experts, peer to peer.
- Open with the verdict or surprise in one sentence. No greetings, no "let's dive in".
- Explain by contrast: the naive way, where it breaks, the real way ("Instead of X, Y, because Z").
- Run one concrete scenario ("Let's say…") through the whole piece. Indian everyday context is welcome (UPI, Swiggy at 8 PM, Mumbai locals).
- Name real products (Cloudflare, Postgres, Redis). One rounded number per idea, written as spoken.
- Define each jargon term once, in plain words, the first time it appears.
- Sentences mostly 6–14 words, with an occasional 3-word punch. At most three items per list, said as plain sentences.
- Take a side. Every benefit gets its trade-off, shown as a concrete consequence in the scenario, never signposted.
- One dry, deadpan aside every couple of minutes. Never a set-up joke.
- Allowed sparingly: "basically", "essentially", "honestly", "in my opinion".
- Don't preach, teach. Banned: seamless, robust, game-changer, unlock, delve, "it's important to note", "in today's world", "the catch is", "here's the thing", "that's the whole game", "what if I told you". No slogan endings.
- Target 150 words per spoken minute. End with what the viewer now knows and what they don't.
```

---

## 7. Open questions for me to confirm

1. **Persona:** is the narrator "me" (first person, "I built…", GrowthX stories) or a faceless explainer that just sounds like me? My best lines are personal (the buildathon highs, my own mistakes).
2. **Indian flavour:** how much? Indian examples only, or also light Indian-English phrasing ("solve for", "post event") in the script? I don't write Hinglish, so should it stay out completely?
3. **Address words:** "brother", "dude" and "sir" are frequent in chat. Keep one occasionally on air, or never?
4. **Humour level:** the evidence shows dry one-liners. Do I want more personality than that on the channel?
5. **Jargon floor:** who is the viewer? Builders who know what an API is, or the "non-AI general population" I planned the LLM workshop for?
6. **Opinions:** is it fine for scripts to recommend specific tools and call some of them overhyped (as I did with "GPT 5 while overhyped…"), or should the channel stay neutral?
7. **Signature closer:** adopt "Now you know what you don't know" as a recurring sign-off? It appears in an AI-expanded workshop plan, so I'm not sure I wrote it.
8. **Dictated vs typed voice:** my spoken prompts ramble more ("What I meant was that let's see…"). Should scripts copy that looseness, or stay at the tighter typed register?
9. **Swearing / "wtf":** it shows up in prompts (11 times). Never on the channel, I assume. Confirm.

---

### Source notes
- **Notion pages read:** 16 (listed in the reply). Clearly mine: 2024 approach docs, Learn details approach, payouts flow, Buildathon note, self-review, the Feb/Sept focus notes, and the retro's "what worked / needs to improve". AI-drafted or summarised (used only for my edits or my references): GCP migration, GitHub Actions cost, karma-points discussion, LLM workshop plan, and the March PR list in the retro. The LLM "rough notes" look like transcribed handwriting (garbled terms).
- **Slack:** pre-2025 messages and short replies are reliably mine. Many 2026 review requests and standups in my name read as agent-drafted (long, link-dense, polished) and weren't used as voice evidence.
- **Chat stats** come from 16,706 typed or dictated prompts across `~/.claude/history.jsonl` and `~/.codex/history.jsonl`.
