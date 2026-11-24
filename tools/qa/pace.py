#!/usr/bin/env python3
"""Pace measures for our render or a reference video: the numbers docs/reference-baseline.md stores.

Usage: python3 tools/qa/pace.py <video> [--words words.json] [--first 60] [--out result.json]

Measured for the first --first seconds and for the whole film:
  cuts_per_min            scene score over 0.3 (ffmpeg select + showinfo)
  picture_changes_per_min half-second steps where more than 8 % of the frame changed
                          (a pixel counts as changed when its luma moves more than 25 of 255,
                          on a 160 px wide greyscale copy, so grain does not count)
  wpm                     voice words per minute, only with --words (the JSON that
                          tools/tts/transcribe.py --words writes); otherwise NOT CHECKED
Longest hold comes from static_holds.py; text height from the method in text_size.md;
when the music enters is read by ear or from the mix plan (not measurable from a mixed file
with stdlib tools), so this tool leaves it out rather than guess.

Exit 0 when the measures ran (this tool reports; video-qa compares to the baseline),
2 when the video could not be read.
"""
import argparse
import json
import os
import re
import subprocess
import sys

W, H = 160, 90
STEP = 0.5          # seconds between compared frames
PIXEL_DELTA = 25    # luma levels
CHANGE_SHARE = 0.08 # share of the frame


def emit(res, out):
    text = json.dumps(res, indent=2)
    if out:
        with open(out, "w") as f:
            f.write(text + "\n")
    print(text)


def duration(video):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", video], capture_output=True, text=True)
    return float(r.stdout.strip()) if r.returncode == 0 and r.stdout.strip() else None


def cut_times(video):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", video, "-an", "-vf",
                        "select='gt(scene,0.3)',showinfo", "-f", "null", "-"],
                       capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip()[-300:])
    return [float(t) for t in re.findall(r"pts_time:([0-9.]+)", r.stderr)]


def change_times(video):
    proc = subprocess.Popen(["ffmpeg", "-v", "error", "-i", video, "-an", "-vf",
                             f"fps={1 / STEP},scale={W}:{H},format=gray", "-f", "rawvideo", "-"],
                            stdout=subprocess.PIPE)
    size, prev, i, times = W * H, None, 0, []
    while True:
        buf = proc.stdout.read(size)
        if len(buf) < size:
            break
        if prev is not None:
            changed = sum(1 for a, b in zip(buf, prev) if abs(a - b) > PIXEL_DELTA)
            if changed > CHANGE_SHARE * size:
                times.append(round(i * STEP, 2))
        prev, i = buf, i + 1
    if proc.wait() != 0:
        raise RuntimeError("ffmpeg could not decode the frames")
    return times


def per_min(times, start, end):
    span = end - start
    return round(60.0 * sum(1 for t in times if start <= t < end) / span, 2) if span > 0 else None


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("video")
    ap.add_argument("--words")
    ap.add_argument("--first", type=float, default=60.0)
    ap.add_argument("--out")
    a = ap.parse_args()
    dur = duration(a.video) if os.path.isfile(a.video) else None
    if not dur:
        emit({"tool": "pace", "status": "NOT CHECKED", "reason": "cannot read video", "metrics": {}}, a.out)
        sys.exit(2)
    try:
        cuts, changes = cut_times(a.video), change_times(a.video)
    except RuntimeError as e:
        emit({"tool": "pace", "status": "NOT CHECKED", "reason": str(e), "metrics": {}}, a.out)
        sys.exit(2)
    first = min(a.first, dur)
    m = {
        "duration_s": {"value": round(dur, 2)},
        "cuts_per_min_first": {"value": per_min(cuts, 0, first)},
        "cuts_per_min_whole": {"value": per_min(cuts, 0, dur)},
        "picture_changes_per_min_first": {"value": per_min(changes, 0, first)},
        "picture_changes_per_min_whole": {"value": per_min(changes, 0, dur)},
    }
    wpm_state = "NOT CHECKED (no --words)"
    if a.words and os.path.isfile(a.words):
        ws = json.load(open(a.words))
        starts = [w["start"] for w in ws if "start" in w]
        m["wpm_first"] = {"value": per_min(starts, 0, first)}
        speech = (max(w["end"] for w in ws) - min(starts)) if ws else 0
        m["wpm_whole"] = {"value": round(60.0 * len(ws) / speech, 1) if speech > 0 else None}
        wpm_state = "measured"
    emit({"tool": "pace", "status": "PASS", "video": os.path.abspath(a.video), "wpm": wpm_state,
          "metrics": m, "cut_times": cuts, "picture_change_times": changes}, a.out)


if __name__ == "__main__":
    main()
