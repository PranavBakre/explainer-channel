"""Frame offsets of beats inside one shot, as tools/build-episode.ts lays them out.

Usage: python3 tools/beat-frames.py <episode-dir> S03_01 S03_02 S03_03
Prints each beat's start frame relative to the shot and the shot length (with the within-scene pause after the last beat;
a shot that ends its scene or act runs longer, and the episode's last shot carries a 2.5 s tail, so hold the last pose).
"""
import json, math, pathlib, sys

PAUSE_BEAT = 0.45
ep = pathlib.Path(sys.argv[1])
FPS = json.loads((ep / 'storyboard.json').read_text())['fps']
man = json.loads((ep / 'voice/lines/manifest.json').read_text())
sec = {m['id']: m['seconds'] for m in man}
t = 0
for b in sys.argv[2:]:
    print(f'{b} starts at frame {t} ({sec[b]:.2f} s of VO)')
    t += math.floor((sec[b] + PAUSE_BEAT) * FPS + 0.5)
print(f'shot length >= {t} frames')
