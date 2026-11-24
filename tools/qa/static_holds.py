#!/usr/bin/env python3
"""Measured static-hold and near-empty-frame check for a rendered video.

Usage: python3 tools/qa/static_holds.py <video.mp4> [--hold 4] [--empty 1] [--out result.json]

Gate (video-qa section 1): nothing still for --hold seconds or more (default 4),
nothing near-empty for --empty seconds or more (default 1).

Method (ffmpeg/ffprobe only, Python stdlib):
  1. Holds: freezedetect on a small, blurred copy (grain otherwise hides every hold),
     then each blurred hold is split wherever the largest per-pixel change between
     frames 0.1 s apart (lightly blurred) jumps well above that hold's own grain
     level, so a small real change (a button press, a focus ring) ends the hold.
  2. Near-empty: a frame is near-empty when the whole blurred frame is flat (the
     min-to-max spread of Y, U and V, from signalstats on the blurred copy, is at
     most --band levels each). Blur removes grain; any real element, even one small
     lifted pill on a dark field, breaks it. A black or blank frame counts as empty.

Prints a summary and writes JSON (status PASS, FAIL or NOT CHECKED, metrics, spans).
Exit 0 on PASS, 1 on FAIL, 2 on NOT CHECKED (the check could not run; never a pass).
"""
import argparse
import json
import os
import re
import statistics
import subprocess
import sys
import tempfile

FPS = 10  # analysis rate for the frame-difference and band scans
DETECT = 1.0  # detect stills from 1 s so the longest still is known even under the limit


def not_checked(reason, out):
    res = {"tool": "static_holds", "status": "NOT CHECKED", "reason": reason, "metrics": {}}
    emit(res, out)
    sys.exit(2)


def emit(res, out):
    text = json.dumps(res, indent=2)
    if out:
        with open(out, "w") as f:
            f.write(text + "\n")
    print(text)


def duration(video):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", video], capture_output=True, text=True)
    if r.returncode != 0 or not r.stdout.strip():
        raise RuntimeError("ffprobe could not read the duration: " + r.stderr.strip()[-300:])
    return float(r.stdout.strip())


def read_metadata(path, keys):
    """Parse an ffmpeg metadata=print file into a list of (t, {key: value})."""
    frames, cur, t = [], None, None
    with open(path) as f:
        for line in f:
            if line.startswith("frame:"):
                if cur is not None:
                    frames.append((t, cur))
                m = re.search(r"pts_time:([0-9.]+)", line)
                t = float(m.group(1)) if m else None
                cur = {}
            elif "=" in line and cur is not None:
                k, v = line.strip().split("=", 1)
                k = k.rsplit(".", 1)[-1]
                if k in keys:
                    try:
                        cur[k] = float(v)
                    except ValueError:
                        pass
    if cur is not None:
        frames.append((t, cur))
    return [(t, d) for t, d in frames if t is not None]


def run_ffmpeg(args):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats"] + args, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError("ffmpeg failed: " + r.stderr.strip()[-400:])
    return r.stderr


def blurred_holds(video, hold, dur, meta_path):
    vf = (f"scale=320:-2,gblur=sigma=2,freezedetect=n=0.002:d={hold},"
          f"fps={FPS},signalstats,metadata=mode=print:file={meta_path}")
    err = run_ffmpeg(["-i", video, "-an", "-vf", vf, "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"freeze_start: ([0-9.]+)", err)]
    ends = [float(x) for x in re.findall(r"freeze_end: ([0-9.]+)", err)]
    spans = []
    for i, s in enumerate(starts):
        e = ends[i] if i < len(ends) else dur  # a hold running to the end has no freeze_end
        spans.append((s, e))
    return spans


def raw_differences(video, meta_path):
    """Largest per-pixel change between frames 0.1 s apart (light blur only)."""
    vf = (f"fps={FPS},scale=320:-2,gblur=sigma=1,tblend=all_mode=difference,"
          f"signalstats,metadata=mode=print:file={meta_path}")
    run_ffmpeg(["-i", video, "-an", "-vf", vf, "-f", "null", "-"])
    return [(t, d.get("YMAX", 0.0)) for t, d in read_metadata(meta_path, {"YMAX"})]


def split_hold(span, diffs, hold):
    """Split one blurred hold at real changes the blur hid; return sub-holds >= hold."""
    s, e = span
    inside = [(t, d) for t, d in diffs if s < t <= e]
    if len(inside) < 3:
        return [(s, e, False)] if e - s >= hold else []
    grain = statistics.median(d for _, d in inside)
    spike = max(3 * grain, grain + 8.0)
    cuts = [t for t, d in inside if d > spike]
    pieces, last = [], s
    for c in cuts:
        pieces.append((last, c))
        last = c
    pieces.append((last, e))
    split = len(cuts) > 0
    return [(a, b, split) for a, b in pieces if b - a >= hold]


def empty_spans(frames, band, minimum):
    spans, start, prev = [], None, None
    step = 1.0 / FPS
    for t, d in frames:
        try:
            empty = all(d[f"{c}MAX"] - d[f"{c}MIN"] <= band for c in "YUV")
        except KeyError:
            empty = False
        if empty and start is None:
            start = t
        if not empty and start is not None:
            spans.append((start, t))
            start = None
        prev = t
    if start is not None and prev is not None:
        spans.append((start, prev + step))
    return [(a, b) for a, b in spans if b - a >= minimum]


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("video")
    ap.add_argument("--hold", type=float, default=4.0, help="longest allowed still, seconds")
    ap.add_argument("--empty", type=float, default=1.0, help="longest allowed near-empty run, seconds")
    ap.add_argument("--band", type=float, default=16.0, help="min-to-max spread on the blurred frame (8-bit levels) that counts as empty; a small element on a flat field breaks it")
    ap.add_argument("--out", help="write the result JSON here too")
    a = ap.parse_args()

    if not os.path.isfile(a.video):
        not_checked(f"no such file: {a.video}", a.out)
    try:
        dur = duration(a.video)
        with tempfile.TemporaryDirectory() as tmp:
            blur_meta = os.path.join(tmp, "blur.txt")
            raw_meta = os.path.join(tmp, "raw.txt")
            spans = blurred_holds(a.video, DETECT, dur, blur_meta)
            band_frames = read_metadata(blur_meta, {f"{c}{k}" for c in "YUV" for k in ("MIN", "MAX")})
            diffs = raw_differences(a.video, raw_meta)
    except (RuntimeError, OSError) as e:
        not_checked(str(e), a.out)
    if not band_frames or not diffs:
        not_checked("ffmpeg produced no frame statistics", a.out)

    stills = []
    for span in spans:
        for s, e, split in split_hold(span, diffs, DETECT):
            stills.append({"start": round(s, 2), "end": round(e, 2), "seconds": round(e - s, 2),
                           "split_from_blurred_hold": split})
    holds = [h for h in stills if h["seconds"] >= a.hold]
    empties = [{"start": round(s, 2), "end": round(e, 2), "seconds": round(e - s, 2)}
               for s, e in empty_spans(band_frames, a.band, a.empty)]

    longest = max([h["seconds"] for h in stills] + [0.0])
    longest_empty = max([e["seconds"] for e in empties] + [0.0])
    status = "FAIL" if holds or empties else "PASS"
    res = {
        "tool": "static_holds",
        "video": os.path.abspath(a.video),
        "status": status,
        "limits": {"hold_s": a.hold, "empty_s": a.empty, "band_levels": a.band},
        "metrics": {
            "holds_over_limit": {"value": len(holds), "better": "lower"},
            "near_empty_over_limit": {"value": len(empties), "better": "lower"},
            "longest_still_s": {"value": longest, "better": "lower"},
            "stills_1s_plus": {"value": len(stills)},
            "longest_near_empty_over_limit_s": {"value": longest_empty},
        },
        "holds": holds,
        "stills_under_limit": [h for h in stills if h["seconds"] < a.hold],
        "near_empty": empties,
        "note": "Open frames 0.5 s either side of every listed span before calling it; "
                "a planned rest under the limit is not listed.",
    }
    emit(res, a.out)
    sys.exit(0 if status == "PASS" else 1)


if __name__ == "__main__":
    main()
