#!/usr/bin/env python3
"""Spoken words vs script: diff a transcript of the render against the narration in script.md.

Usage:
  tools/tts/.venv/bin/python tools/tts/transcribe.py <video.mp4> > /tmp/transcript.txt
  python3 tools/qa/spoken_words.py episodes/<ep>/script.md /tmp/transcript.txt [--gap 4] [--out result.json]

Narration = every line under a "## S.." scene heading that is not an on-screen note ("> "),
a table row, a rule or a heading. Fact tags [F12] are dropped. Both sides are lower-cased
and stripped of punctuation, then compared word by word (difflib).

Gate: no run of --gap or more script words (default 4) missing or replaced in the
transcript. A run whose transcript side holds a digit is listed as "number, listen"
and not failed (Whisper writes "50 billion" for "fifty billion"); such runs and every
other listed run go to the human listen, never passed on the transcript alone.

Exit 0 PASS, 1 FAIL, 2 NOT CHECKED (missing or empty input; never a pass).
"""
import argparse
import difflib
import json
import os
import re
import sys


def emit(res, out):
    text = json.dumps(res, indent=2)
    if out:
        with open(out, "w") as f:
            f.write(text + "\n")
    print(text)


def not_checked(reason, out):
    emit({"tool": "spoken_words", "status": "NOT CHECKED", "reason": reason, "metrics": {}}, out)
    sys.exit(2)


def words(text):
    text = text.lower().replace("’", "'")
    text = re.sub(r"[^a-z0-9' ]+", " ", text)
    return [w.strip("'") for w in text.split() if w.strip("'")]


def narration(script_text):
    out, in_scene = [], False
    for line in script_text.splitlines():
        s = line.strip()
        if s.startswith("## "):
            in_scene = bool(re.match(r"## S\d", s))
            continue
        if not in_scene or not s or s.startswith((">", "|", "#", "---", "```")):
            continue
        out.append(re.sub(r"\[F\d+[^\]]*\]", "", s))
    return " ".join(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("script")
    ap.add_argument("transcript", help="plain text; the first line of transcribe.py output is used whole")
    ap.add_argument("--gap", type=int, default=4)
    ap.add_argument("--out")
    a = ap.parse_args()
    for p in (a.script, a.transcript):
        if not os.path.isfile(p):
            not_checked(f"no such file: {p}", a.out)
    ref = words(narration(open(a.script).read()))
    hyp = words(open(a.transcript).read())
    if not ref:
        not_checked("no narration found under '## S..' headings", a.out)
    if not hyp:
        not_checked("transcript is empty", a.out)

    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    matched = sum(b.size for b in sm.get_matching_blocks())
    runs = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal" or i2 - i1 == 0 and j2 - j1 < a.gap:
            continue
        said = " ".join(hyp[j1:j2])
        kind = "number, listen" if re.search(r"\d", said) else ("missing" if op == "delete" else op)
        runs.append({"kind": kind, "script": " ".join(ref[i1:i2]), "heard": said,
                     "script_words": i2 - i1, "script_word_index": i1})
    blocking = [r for r in runs if r["script_words"] >= a.gap and r["kind"] != "number, listen"]
    res = {
        "tool": "spoken_words",
        "status": "FAIL" if blocking else "PASS",
        "limits": {"gap_words": a.gap},
        "metrics": {
            "word_match_pct": {"value": round(100.0 * matched / len(ref), 2), "better": "higher"},
            "blocking_runs": {"value": len(blocking), "better": "lower"},
            "script_words": {"value": len(ref)},
            "transcript_words": {"value": len(hyp)},
        },
        "blocking": blocking,
        "listen": [r for r in runs if r not in blocking],
    }
    emit(res, a.out)
    sys.exit(1 if blocking else 0)


if __name__ == "__main__":
    main()
