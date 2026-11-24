#!/usr/bin/env python3
"""Quality ratchet: a stored best score per check, per channel, that a new episode may not drop below.

Usage:
  python3 tools/qa/ratchet.py check  <result.json>... [--channel main] [--store tools/qa/ratchet.json]
  python3 tools/qa/ratchet.py record <result.json>... --episode ep05 [--channel main] [--note "..."]
  python3 tools/qa/ratchet.py show [--channel main]

Inputs are the JSON results the other tools in tools/qa write (--out). Every metric that
carries "better": "lower" or "higher" is ratcheted under the name <tool>.<metric>; other
metrics are reported only.

check   exit 0 when every ratcheted metric is at or better than its stored best,
        1 when any is worse, 2 when any result is NOT CHECKED or unreadable, or a
        stored metric has no result in this run (a check that could not run is
        never a pass).
record  stores new bests from an episode whose results all PASS and none dropped.
        A drop, or a result that is not PASS, is refused unless --note carries the
        operator's sign-off in their words; the note is kept in the history.
        The agent never writes that note for the operator.
"""
import argparse
import datetime
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_STORE = os.path.join(HERE, "ratchet.json")


def load_store(path):
    if not os.path.exists(path):
        return {"version": 1, "channels": {}}
    with open(path) as f:
        return json.load(f)


def load_results(paths):
    results, problems = [], []
    for p in paths:
        try:
            with open(p) as f:
                r = json.load(f)
        except (OSError, ValueError) as e:
            problems.append(f"{p}: unreadable ({e})")
            continue
        if r.get("status") not in ("PASS", "FAIL"):
            problems.append(f"{p}: {r.get('tool', '?')} is {r.get('status', 'missing a status')}"
                            f" ({r.get('reason', 'no reason given')})")
        results.append((p, r))
    return results, problems


def compare(results, channel_store):
    rows, drops = [], []
    best = channel_store.get("metrics", {})
    for _, r in results:
        tool = r.get("tool", "unknown")
        for name, m in r.get("metrics", {}).items():
            better = m.get("better")
            value = m.get("value")
            if better not in ("lower", "higher") or value is None:
                continue
            key = f"{tool}.{name}"
            stored = best.get(key)
            if stored is None:
                rows.append((key, value, None, "new"))
                continue
            b = stored["best"]
            # Margin: a metric may carry its own "tolerance" (absolute); default 10% of the best,
            # so normal noise (a 1.2 s best still vs 1.5 s, transcription jitter) is not a drop.
            tol = m.get("tolerance", stored.get("tolerance", abs(b) * 0.10))
            worse = value > b + tol if better == "lower" else value < b - tol
            improved = value < b if better == "lower" else value > b
            state = "DROP" if worse else ("better" if improved else "equal")
            rows.append((key, value, b, state))
            if worse:
                drops.append(key)
    return rows, drops


def print_rows(rows):
    print(f"{'metric':48} {'this':>10} {'best':>10}  state")
    for key, value, b, state in rows:
        print(f"{key:48} {value!s:>10} {'-' if b is None else b!s:>10}  {state}")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("command", choices=["check", "record", "show"])
    ap.add_argument("results", nargs="*")
    ap.add_argument("--channel", default="main")
    ap.add_argument("--store", default=DEFAULT_STORE)
    ap.add_argument("--episode")
    ap.add_argument("--note", help="operator sign-off, in their words, for a drop or a non-PASS result")
    a = ap.parse_args()

    store = load_store(a.store)
    ch = store["channels"].setdefault(a.channel, {"metrics": {}, "history": []})

    if a.command == "show":
        print(json.dumps(ch, indent=2))
        return
    if not a.results:
        print("NOT CHECKED: no result files given")
        sys.exit(2)

    results, problems = load_results(a.results)
    rows, drops = compare(results, ch)
    seen = {k for k, _, _, _ in rows}
    for key in sorted(ch["metrics"]):
        if key not in seen:
            problems.append(f"{key}: stored best has no result in this run")
    print_rows(rows)
    for p in problems:
        print("NOT CHECKED:", p)
    for d in drops:
        print("DROP:", d, "is worse than the channel's best")

    if a.command == "check":
        if problems:
            sys.exit(2)
        sys.exit(1 if drops else 0)

    # record
    if not a.episode:
        print("record needs --episode")
        sys.exit(2)
    failing = [p for p, r in results if r.get("status") != "PASS"]
    if (drops or failing or problems) and not a.note:
        print("Refused: a drop, a failing or an unchecked result needs --note with the operator's sign-off.")
        sys.exit(1)
    today = datetime.date.today().isoformat()
    for key, value, b, state in rows:
        if state in ("new", "better"):
            better = next(m["better"] for _, r in results for n, m in r.get("metrics", {}).items()
                          if f"{r.get('tool', 'unknown')}.{n}" == key)
            ch["metrics"][key] = {"best": value, "better": better, "episode": a.episode, "date": today}
    ch["history"].append({"episode": a.episode, "date": today,
                          "values": {k: v for k, v, _, _ in rows},
                          "drops": drops, "not_pass": failing + problems, "note": a.note})
    with open(a.store, "w") as f:
        json.dump(store, f, indent=2)
        f.write("\n")
    print(f"Recorded {a.episode} in {a.store} (channel {a.channel}).")


if __name__ == "__main__":
    main()
