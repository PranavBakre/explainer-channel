# EP01 — revision 5 closure check (Codex)

**PASS.** Revision 4's sole remaining factual defect is resolved. Checked revision 5 S02 and S12 against the supplied F23–F24; this is a targeted closure check, not a fresh source audit or full script review.

| Check | Result | Evidence |
|---|---|---|
| S02 benchmark scope | PASS | “every eight-character password of lowercase letters and digits” matches F24's 36^8 space. “One modern graphics card” and “in some of those formats, in under a minute” match the single RTX 4090 estimates for MD5 (17.19 s) and SHA-1 (55.71 s). The historical-breach speed implication remains removed. |
| S12 benchmark payoff | PASS | One RTX 4090 running hashcat; approximately 164/50/22 billion guesses per second match F23. Approximately 2.8 trillion candidates and 17 s / under a minute / about two minutes match F24's 17.19 / 55.71 / 128.38 s; the on-screen 56 s also matches. |

The figures remain idealized exhaustive-search estimates at the cited benchmark rates, not measured breach-cracking times. Prior review qualifications and other rubric assessments are carried forward unchanged.
