#!/usr/bin/env python3
"""Measured loudness check (EBU R128 via ffmpeg ebur128) for a rendered video or audio file.

Usage: python3 tools/qa/loudness.py <file> [--target -14] [--tolerance 1] [--peak -1] [--out result.json]

Gate (video-qa section 1): integrated loudness -14 LUFS (within --tolerance LU),
true peak at most -1 dBTP. Loudness range (LRA) is reported, not gated.

Writes JSON with status PASS, FAIL or NOT CHECKED.
Exit 0 on PASS, 1 on FAIL, 2 on NOT CHECKED (no audio, or ffmpeg failed; never a pass).
"""
import argparse
import json
import os
import re
import subprocess
import sys


def emit(res, out):
    text = json.dumps(res, indent=2)
    if out:
        with open(out, "w") as f:
            f.write(text + "\n")
    print(text)


def not_checked(reason, out):
    emit({"tool": "loudness", "status": "NOT CHECKED", "reason": reason, "metrics": {}}, out)
    sys.exit(2)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("file")
    ap.add_argument("--target", type=float, default=-14.0, help="integrated LUFS")
    ap.add_argument("--tolerance", type=float, default=1.0, help="allowed LU either side of the target")
    ap.add_argument("--peak", type=float, default=-1.0, help="highest allowed true peak, dBTP")
    ap.add_argument("--out", help="write the result JSON here too")
    a = ap.parse_args()

    if not os.path.isfile(a.file):
        not_checked(f"no such file: {a.file}", a.out)
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries",
                            "stream=index", "-of", "csv=p=0", a.file], capture_output=True, text=True)
    if probe.returncode != 0 or not probe.stdout.strip():
        not_checked("no audio stream found", a.out)

    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", a.file, "-vn",
                        "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
    if r.returncode != 0:
        not_checked("ffmpeg failed: " + r.stderr.strip()[-300:], a.out)
    summary = r.stderr[r.stderr.rfind("Summary:"):] if "Summary:" in r.stderr else ""
    i = re.search(r"I:\s+(-?[0-9.]+|-inf) LUFS", summary)
    lra = re.search(r"LRA:\s+(-?[0-9.]+) LU", summary)
    tp = re.search(r"True peak:\s+Peak:\s+(-?[0-9.]+|-inf) dBFS", summary)
    if not i or not tp:
        not_checked("could not read the ebur128 summary", a.out)
    if i.group(1) == "-inf":
        not_checked("integrated loudness is -inf (silent file)", a.out)

    integrated = float(i.group(1))
    peak = float("-inf") if tp.group(1) == "-inf" else float(tp.group(1))
    problems = []
    if abs(integrated - a.target) > a.tolerance:
        problems.append(f"integrated {integrated} LUFS is outside {a.target} +/- {a.tolerance}")
    if peak > a.peak:
        problems.append(f"true peak {peak} dBTP is above {a.peak}")
    res = {
        "tool": "loudness",
        "file": os.path.abspath(a.file),
        "status": "FAIL" if problems else "PASS",
        "limits": {"target_lufs": a.target, "tolerance_lu": a.tolerance, "max_true_peak_dbtp": a.peak},
        "metrics": {
            "integrated_lufs": {"value": integrated},
            "true_peak_dbtp": {"value": peak},
            "loudness_range_lu": {"value": float(lra.group(1)) if lra else None},
            "integrated_error_lu": {"value": round(abs(integrated - a.target), 2)},
        },
        "problems": problems,
    }
    emit(res, a.out)
    sys.exit(0 if not problems else 1)


if __name__ == "__main__":
    main()
