"""Frame offsets of beats inside one shot, as tools/build-episode.ts lays them out.

Usage: python3 tools/beat-frames.py S03_01 S03_02 S03_03
Prints each beat's start frame relative to the shot and the shot length (with the within-scene pause after the last beat;
a shot that ends its scene runs 8-23 frames longer, so hold the last pose).
"""
import json, pathlib, sys

FPS, PAUSE_BEAT = 30, 0.45
man = json.loads((pathlib.Path(__file__).parent.parent / 'episodes/ep01-password-storage/voice/lines/manifest.json').read_text())
sec = {m['id']: m['seconds'] for m in man}
t = 0
for b in sys.argv[1:]:
    print(f'{b} starts at frame {t} ({sec[b]:.2f} s of VO)')
    t += round((sec[b] + PAUSE_BEAT) * FPS)
print(f'shot length >= {t} frames')
