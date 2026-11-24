"""Synthesize narration lines with ElevenLabs, several takes per line, each levelled to -18 LUFS.

Usage:
  synth_elevenlabs.py <lines.json> <out_dir> [--takes 3] [--model eleven_multilingual_v2]
                      [--only S01_02 S03_01] [--dictionary <id>:<version>] [--force]
  synth_elevenlabs.py <lines.json> <out_dir> --pick S01_02=2 S03_01=3

Env: ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID (never put either in a file in this repo).
lines.json: [{"id": "S01_01", "text": "...", "spoken": "..."}]; "spoken" is optional and is
what the voice is sent (case changes only, e.g. "pin" for PIN; voice-narration §2).

Each line is voiced with the line before and after it as context (previous_text / next_text).
Takes go to <out_dir>/takes/<id>.t<n>.wav (mono 24 kHz, edges trimmed, -18 LUFS). <out_dir>/<id>.wav is the
picked take (take 1 until --pick changes it). manifest.json keeps synth.py's fields
(id, text, spoken, file, seconds, wpm) plus "take" and "takes", in lines.json order.
--only re-voices those ids and keeps every other manifest entry. --pick calls no API.
Existing take files are kept (they cost credits) unless --force.
"""
import argparse, json, os, pathlib, shutil, subprocess, sys, tempfile, time, urllib.error, urllib.request, wave

API = "https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=pcm_24000"
RATE = 24000
TARGET_LUFS = -18.0
TARGET_TP = -1.5
# Leading and trailing silence trimmed to about 0.1 s and 0.15 s (voice-narration §5 edges); nothing inside a line.
TRIM = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.1,areverse,"
        "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.15,areverse,")


def request_audio(key, voice, body):
    data = json.dumps(body).encode()
    req = urllib.request.Request(API.format(voice=voice), data=data, method="POST",
                                 headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/pcm"})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:300]
            if e.code in (429, 500, 502, 503) and attempt < 4:
                time.sleep(2 ** attempt * 3)
                continue
            sys.exit(f"ElevenLabs HTTP {e.code}: {msg}")
        except urllib.error.URLError as e:
            if attempt < 4:
                time.sleep(2 ** attempt * 3)
                continue
            sys.exit(f"ElevenLabs request failed: {e.reason}")


def write_pcm(path, pcm):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(pcm)


def level(src, dst):
    """Trim edge silence, then two-pass ffmpeg loudnorm to TARGET_LUFS, linear gain, mono 24 kHz 16-bit."""
    first = TRIM + f"loudnorm=I={TARGET_LUFS}:TP={TARGET_TP}:LRA=11:print_format=json"
    out = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(src), "-af", first, "-f", "null", "-"],
                         capture_output=True, text=True, check=True).stderr
    m = json.loads(out[out.rindex("{"):out.rindex("}") + 1])
    second = (TRIM + f"loudnorm=I={TARGET_LUFS}:TP={TARGET_TP}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}"
              f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", second, "-ar", str(RATE), "-ac", "1",
                    "-c:a", "pcm_s16le", str(dst)], check=True)


def seconds_of(path):
    with wave.open(str(path), "rb") as w:
        return w.getnframes() / w.getframerate()


def entry(line, out, take, takes):
    path = out / f"{line['id']}.wav"
    dur = seconds_of(path)
    words = len(line["text"].split())
    return {"id": line["id"], "text": line["text"], "spoken": line.get("spoken", line["text"]), "file": path.name,
            "seconds": round(dur, 3), "wpm": round(words / dur * 60, 1), "take": take, "takes": takes}


def save(out, lines, manifest):
    order = {l["id"]: i for i, l in enumerate(lines)}
    rows = sorted(manifest.values(), key=lambda e: order.get(e["id"], len(order)))
    (out / "manifest.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lines"); ap.add_argument("out")
    ap.add_argument("--takes", type=int, default=3)
    ap.add_argument("--model", default="eleven_multilingual_v2")
    ap.add_argument("--only", nargs="+", help="voice only these ids; other manifest entries are kept")
    ap.add_argument("--dictionary", action="append", default=[], help="pronunciation dictionary <id>:<version> (up to 3)")
    ap.add_argument("--stability", type=float, default=0.5)
    ap.add_argument("--similarity", type=float, default=0.75)
    ap.add_argument("--style", type=float, default=0.0)
    ap.add_argument("--force", action="store_true", help="re-voice takes that already exist")
    ap.add_argument("--pick", nargs="+", metavar="ID=TAKE", help="set the picked take per line; no API call")
    a = ap.parse_args()

    lines = json.loads(pathlib.Path(a.lines).read_text())
    out = pathlib.Path(a.out); takes_dir = out / "takes"
    takes_dir.mkdir(parents=True, exist_ok=True)
    mpath = out / "manifest.json"
    manifest = {e["id"]: e for e in json.loads(mpath.read_text())} if mpath.exists() else {}
    by_id = {l["id"]: l for l in lines}

    if a.pick:
        for item in a.pick:
            lid, n = item.split("=")
            src = takes_dir / f"{lid}.t{n}.wav"
            if lid not in by_id or not src.exists():
                sys.exit(f"no take {src}")
            shutil.copyfile(src, out / f"{lid}.wav")
            found = sorted(p.name for p in takes_dir.glob(f"{lid}.t*.wav"))
            manifest[lid] = entry(by_id[lid], out, int(n), found)
            print(f"{lid}: take {n}, {manifest[lid]['seconds']}s {manifest[lid]['wpm']} wpm")
        save(out, lines, manifest)
        return

    key = os.environ.get("ELEVENLABS_API_KEY"); voice = os.environ.get("ELEVENLABS_VOICE_ID")
    if not key or not voice:
        sys.exit("set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in the environment")
    if len(a.dictionary) > 3:
        sys.exit("ElevenLabs takes at most 3 pronunciation dictionaries")
    unknown = set(a.only or []) - set(by_id)
    if unknown:
        sys.exit(f"ids not in {a.lines}: {sorted(unknown)}")

    for i, line in enumerate(lines):
        if a.only and line["id"] not in a.only:
            continue
        body = {"text": line.get("spoken", line["text"]), "model_id": a.model,
                "voice_settings": {"stability": a.stability, "similarity_boost": a.similarity,
                                   "style": a.style, "use_speaker_boost": True}}
        if i > 0:
            body["previous_text"] = lines[i - 1].get("spoken", lines[i - 1]["text"])
        if i + 1 < len(lines):
            body["next_text"] = lines[i + 1].get("spoken", lines[i + 1]["text"])
        if a.dictionary:
            body["pronunciation_dictionary_locators"] = [
                {"pronunciation_dictionary_id": d.split(":")[0], "version_id": d.split(":")[1]} for d in a.dictionary]
        names = []
        for n in range(1, a.takes + 1):
            dst = takes_dir / f"{line['id']}.t{n}.wav"
            names.append(dst.name)
            if dst.exists() and not a.force:
                continue
            with tempfile.TemporaryDirectory() as tmp:
                raw = pathlib.Path(tmp) / "raw.wav"
                write_pcm(raw, request_audio(key, voice, body))
                level(raw, dst)
        old = manifest.get(line["id"], {})
        take = old.get("take", 1) if not a.force and old.get("take", 1) <= a.takes else 1
        shutil.copyfile(takes_dir / f"{line['id']}.t{take}.wav", out / f"{line['id']}.wav")
        manifest[line["id"]] = entry(line, out, take, names)
        save(out, lines, manifest)  # after every line, so a stopped run keeps what it paid for
        print(f"{line['id']}: {a.takes} takes, take {take} {manifest[line['id']]['seconds']}s {manifest[line['id']]['wpm']} wpm")


if __name__ == "__main__":
    main()
