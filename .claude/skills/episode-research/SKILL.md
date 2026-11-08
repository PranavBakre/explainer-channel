---
name: episode-research
description: Build the sourced fact sheet for an explainer episode before any script is written. Use when starting a new episode, when a script needs a new fact, or when a reviewer flags an unsourced claim.
---

# Episode research

Output: `episodes/<ep>/factsheet.md`. The script may only use facts from it.

1. **Pick the question, not the topic.** Write the one question the video answers ("Why don't websites store your password?"). Every fact must serve it.
2. **Primary sources first.** Standards (NIST, RFCs, OWASP), the original paper, the company's own statement or regulator filing, benchmark tool output. Press only when contemporaneous and named.
3. **One fact per line**: script-ready claim · exact figure · source title + URL + date · `VERIFIED` (you opened it and it says this) or `UNVERIFIED`.
4. **Compute what you can.** Hash outputs, arithmetic (keyspace ÷ rate) — run it locally and paste the command.
5. **Misconceptions.** List 3–5 wrong beliefs viewers hold, each with a correcting source. The script opens on one of them (misconception-first doubles learning — `docs/research/Tech explainer YouTube playbook.md`).
6. **"Do not say" list.** Tempting claims that are wrong, outdated or unsourced.

Never round a sourced number in a way that changes it; say "about" and keep the exact figure in the fact sheet.
