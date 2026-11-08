"""Copy narration from script.md into storyboard.json beats, keeping each shot's beat count.

Usage: python3 tools/sync-storyboard-vo.py <episode-dir>
Fails if a scene's line count no longer matches its storyboard beats, so structure changes are deliberate.
"""
import json, re, sys
from pathlib import Path

ep = Path(sys.argv[1])
script = (ep / "script.md").read_text()
lines = {}
for m in re.finditer(r"^## (S\d\d) — .*?\n(.*?)(?=^## |\Z)", script, re.S | re.M):
    body = [re.sub(r"\s*\[F\d+\]", "", l).strip() for l in m.group(2).split("\n")]
    lines[m.group(1)] = [l for l in body if l and not l.startswith(">")]
sb = json.loads((ep / "storyboard.json").read_text())
changed = 0
for scene in sb["scenes"]:
    src = lines[scene["id"]]
    beats = [b for shot in scene["shots"] for b in shot["beats"]]
    if len(beats) != len(src):
        sys.exit(f"{scene['id']}: script has {len(src)} lines, storyboard has {len(beats)} beats")
    for b, text in zip(beats, src):
        if b["vo"] != text:
            b["vo"] = text
            changed += 1
(ep / "storyboard.json").write_text(json.dumps(sb, indent=1, ensure_ascii=False))
print(f"{changed} beats updated")
