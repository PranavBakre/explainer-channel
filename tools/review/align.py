"""Measure how well text sits inside its container on rendered frames.

Usage: align.py <video> <checks.json> [--crops DIR]
checks.json: [{"name", "frame", "region": [x0,y0,x1,y1], "box": "#hex", "ink": "#hex", "tol": 40}]
For each check, finds the container (pixels near `box`) and the text (pixels near `ink`) inside `region`,
then reports the text's offset from the container centre and its padding. Exits 1 if any check fails.
"""
import argparse, json, subprocess, sys
import numpy as np

MAX_OFFSET = 0.08  # of container height (vertical) / width (horizontal)


def frame(video, n, w=1920, h=1080):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'select=eq(n\\,{n})', '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w, 3).astype(int)


def near(img, hexc, tol):
    c = np.array([int(hexc[i:i + 2], 16) for i in (1, 3, 5)])
    return np.abs(img - c).sum(axis=2) <= tol


def bbox(mask):
    ys, xs = np.nonzero(mask)
    if len(xs) < 20:
        return None
    return xs.min(), ys.min(), xs.max(), ys.max()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video'); ap.add_argument('checks'); ap.add_argument('--crops')
    a = ap.parse_args()
    bad = 0
    cache = {}
    for c in json.load(open(a.checks)):
        img = cache.setdefault(c['frame'], frame(a.video, c['frame']))
        x0, y0, x1, y1 = c['region']
        sub = img[y0:y1, x0:x1]
        tol = c.get('tol', 40)
        box = bbox(near(sub, c['box'], tol))
        ink = None
        if box:
            # Look for text only inside the container, so a coloured border is not mistaken for text.
            m = c.get('inset', 3)
            inner = np.zeros(sub.shape[:2], bool)
            inner[box[1] + m:box[3] - m + 1, box[0] + m:box[2] - m + 1] = True
            ink = bbox(near(sub, c['ink'], c.get('ink_tol', tol)) & inner)
        if not box or not ink:
            print(f"FAIL {c['name']}: {'container' if not box else 'text'} not found"); bad += 1; continue
        bw, bh = box[2] - box[0], box[3] - box[1]
        dx = ((ink[0] + ink[2]) - (box[0] + box[2])) / 2
        dy = ((ink[1] + ink[3]) - (box[1] + box[3])) / 2
        pad = tuple(int(v) for v in (ink[0] - box[0], ink[1] - box[1], box[2] - ink[2], box[3] - ink[3]))
        inside = min(pad) > 3
        ok = inside and abs(dy) <= MAX_OFFSET * bh and (c.get('align') == 'left' or abs(dx) <= MAX_OFFSET * bw)
        bad += not ok
        print(f"{'ok  ' if ok else 'FAIL'} {c['name']} f{c['frame']}: box {bw}x{bh}, text offset dx={dx:+.0f}px dy={dy:+.0f}px, padding l/t/r/b={pad}{'' if inside else '  TEXT TOUCHES THE EDGE'}")
        if a.crops:
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{x1 - x0}x{y1 - y0}', '-i', '-', '-vf', 'scale=iw*3:-1:flags=neighbor',
                            f"{a.crops}/{c['name']}.png"], input=sub.astype(np.uint8).tobytes(), check=True)
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
