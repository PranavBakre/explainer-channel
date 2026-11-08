"""Render storyboard.md (human review) from storyboard.json + the built episode timing.

Usage: python3 tools/storyboard-md.py <episode-dir> <built-episode.json>
"""
import json, sys
from pathlib import Path

MOTION = {
    "ActTitle": "title rises in, accent rule draws left to right",
    "BigNumber": "number counts up over 1.3 s, ease-out",
    "TextStack": "lines rise 24 px and fade in on the word that names them",
    "DbTable": "rows fade in top to bottom; password cells re-scramble when the storage method changes",
    "HashMachine": "input fades in, algorithm box pulses amber, output scrambles then locks left to right",
    "KeyDiagram": "encrypt arrow first; red decrypt arrow and key turn red on the 'undone' line",
    "LookupTable": "scan bar steps down the table, matching row flashes red",
    "RaceBars": "bars grow left to right on a log scale, values fade in after each bar",
    "StatGrid": "figures rise in together",
    "FlowDiagram": "boxes and arrows build left to right, active box outlined",
    "QuoteCard": "quote rises in, key phrase in the accent colour",
    "CodeCard": "lines type in one by one",
    "Checklist": "items rise in, tick strokes draw",
    "SaltDiagram": "each user row fades in; salted hash scrambles then locks",
    "KAnonymity": "five-character prefix slides from device panel to service panel",
}
TRANSITION = {
    "cut": "cut (same idea continues)",
    "fade": "fade 0.6 s (next step in the same part)",
    "push": "push left (next link in the chain)",
    "zoom": "zoom in (go inside the mechanism)",
    "wipe": "amber wipe (new part)",
}

def on_screen(visual, p):
    if visual == "TextStack":
        return " / ".join(l["text"] for l in p["lines"])
    if visual == "ActTitle":
        return f'{p["act"]}: {p["title"]}'
    if visual == "BigNumber":
        return f'{p["value"]:,} — {p["label"]}'
    if visual in ("DbTable",):
        return f'table "{p["title"]}" ({", ".join(p["columns"])})' + (f' · caption: {p["variants"][-1].get("caption","")}' if p.get("variants") else "")
    if visual == "HashMachine":
        return " · ".join(f'{x["input"]} → {p["algo"]} → {x["output"][:12]}…' for x in p["pairs"]) + (f' · {p.get("caption","")}' if p.get("caption") else "")
    if visual == "StatGrid":
        return " · ".join(f'{i["value"]} {i["label"]}' for i in p["items"])
    if visual == "RaceBars":
        return " · ".join(f'{b["label"]} {b["display"]}' for b in p["bars"] if b.get("step", 0) >= 0)
    if visual == "FlowDiagram":
        return " → ".join(n["label"] for n in p["nodes"])
    if visual == "QuoteCard":
        return f'"{p["quote"]}" — {p["source"]}'
    if visual == "CodeCard":
        return p["code"].replace("\n", " ")
    if visual == "Checklist":
        return p["title"] + ": " + " / ".join(i["text"] for i in p["items"])
    if visual == "SaltDiagram":
        return " · ".join(f'{u["name"]}: {p["password"]}+{u["salt"]}' for u in p["users"])
    if visual == "KAnonymity":
        return f'{p["password"]} → SHA-1 {p["hash"][:5]}… sent'
    if visual == "KeyDiagram":
        return f'{p["plain"]} ⇄ {p["cipher"]} · {p["keyLabel"]}'
    if visual == "LookupTable":
        return p["title"]
    return ""

ep, built_path = Path(sys.argv[1]), Path(sys.argv[2])
sb = json.loads((ep / "storyboard.json").read_text())
built = json.loads(built_path.read_text())
fps = built["fps"]
bscenes = {s["id"]: s for s in built["scenes"]}
tc = lambda f: f"{int(f / fps // 60)}:{f / fps % 60:04.1f}"
out = [f"# Storyboard — {built['id']}", "",
       f"{len(sb['scenes'])} scenes · {sum(len(sh['beats']) for s in sb['scenes'] for sh in s['shots'])} narration beats · "
       f"{built['durationInFrames'] / fps / 60:.2f} min · {built['width']}×{built['height']} @ {fps} fps · voice Kokoro {sb['voice']}", "",
       "Generated from `storyboard.json` and the voice-timed build. Visuals are Remotion components (`video/src/components`).", ""]
for s in sb["scenes"]:
    b = bscenes[s["id"]]
    out += [f"## {s['id']} — {s.get('title') or 'continued'} · part {s['act']} · {tc(b['from'])}",
            f"Transition in: **{TRANSITION[s['transitionIn']]}**", "",
            "| Beat | Time | Shot | Narration | On screen | Motion | Sound |", "|---|---|---|---|---|---|---|"]
    for shot, bshot in zip(s["shots"], b["shots"]):
        for i, beat in enumerate(shot["beats"]):
            f = b["from"] + bshot["from"] + bshot["steps"][i]
            first = i == 0
            sfx = ", ".join(x["kind"] for x in bshot["sfx"] if x["at"] == bshot["steps"][i]) or ""
            out.append(f"| {beat['id']} | {tc(f)} | {shot['visual'] if first else '↳'} | {beat['vo']} | "
                       f"{on_screen(shot['visual'], shot['props']) if first else ''} | {MOTION.get(shot['visual'], '') if first else ''} | {sfx} |")
    out.append("")
out += ["## Sound", "", f"- Music bed: procedural two-chord ambient pad, volume {sb.get('musicVolume', 0.1)} under narration, 4 s fade in, 5 s fade out.",
        "- SFX: whoosh on part titles, low hit on the RockYou number, soft ticks on table changes and lookup match.", ""]
(ep / "storyboard.md").write_text("\n".join(out))
print("wrote", ep / "storyboard.md")
