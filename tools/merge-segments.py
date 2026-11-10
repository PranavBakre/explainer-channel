"""Join the segment storyboards into storyboard.json and check every narration line appears once, in order, verbatim.

Usage: python3 tools/merge-segments.py <episode-dir>
Segments are scene arrays in <episode-dir>/segments/*.json; storyboard.json supplies the top-level fields.
"""
import json, pathlib, sys

ep = pathlib.Path(sys.argv[1])
base = json.loads((ep / 'storyboard.json').read_text())
lines = json.loads((ep / 'voice/lines.json').read_text())
scenes = []
for seg in sorted((ep / 'segments').glob('*.json')):
    scenes += json.loads(seg.read_text())
scenes.sort(key=lambda sc: int(sc['id'][1:]))
beats = [b for sc in scenes for sh in sc['shots'] for b in sh['beats']]
want = [(l['id'], l['text']) for l in lines]
got = [(b['id'], b['vo']) for b in beats]
if got != want:
    for i, (g, w) in enumerate(zip(got + [None] * len(want), want + [None] * len(got))):
        if g != w:
            sys.exit(f'beat {i}: storyboard has {g}, narration has {w}')
(ep / 'storyboard.json').write_text(json.dumps({**base, 'scenes': scenes}, indent=2, ensure_ascii=False) + '\n')
print(f'{len(scenes)} scenes, {sum(len(sc["shots"]) for sc in scenes)} shots, {len(beats)} beats')
