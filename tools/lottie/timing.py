"""Read the narration clock and remap authored Lottie keyframe times."""
import pathlib, re, subprocess


def beat_timing(*ids):
    root = pathlib.Path(__file__).resolve().parents[2]
    out = subprocess.check_output(['python3', str(root / 'tools/beat-frames.py'), *ids], text=True)
    return [int(n) for n in re.findall(r'starts at frame (\d+)', out)], int(re.search(r'length >= (\d+)', out)[1])


def retime(data, anchors):
    def time(t):
        if t >= 9999:
            return t
        a, b = next(((a, b) for a, b in zip(anchors, anchors[1:]) if t <= b[0]), anchors[-2:])
        return round(a[1] + (t - a[0]) * (b[1] - a[1]) / (b[0] - a[0]), 3)
    def walk(v):
        if isinstance(v, dict):
            for k, x in v.items():
                if k in ('t', 'ip', 'op', 'st') and isinstance(x, (int, float)):
                    v[k] = time(x)
                else:
                    walk(x)
        elif isinstance(v, list):
            for x in v:
                walk(x)
    walk(data)
    return data
