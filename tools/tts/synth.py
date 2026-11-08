"""Synthesize narration lines with Kokoro (ONNX).

Usage: synth.py <lines.json> <out_dir> [--voice af_heart] [--speed 1.0]
lines.json: [{"id": "s01_l01", "text": "..."}]
Writes <id>.wav per line and manifest.json with durations.
"""
import argparse, json, pathlib, re
import soundfile as sf
from kokoro_onnx import Kokoro

MODELS = pathlib.Path(__file__).resolve().parent.parent / "tts-models"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lines"); ap.add_argument("out")
    ap.add_argument("--voice", default="af_heart"); ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--lexicon", help="JSON map of word -> spoken spelling")
    a = ap.parse_args()
    lex = json.loads(pathlib.Path(a.lexicon).read_text()) if a.lexicon else {}
    k = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
    manifest = []
    for line in json.loads(pathlib.Path(a.lines).read_text()):
        text = line["text"]
        for word, spoken in lex.items():
            text = re.sub(rf"\b{re.escape(word)}\b", spoken, text)
        samples, sr = k.create(text, voice=a.voice, speed=a.speed, lang="en-us")
        path = out / f"{line['id']}.wav"
        sf.write(path, samples, sr)
        dur = len(samples) / sr
        words = len(line["text"].split())
        manifest.append({"id": line["id"], "text": line["text"], "spoken": text, "file": path.name,
                         "seconds": round(dur, 3), "wpm": round(words / dur * 60, 1)})
        print(f"{line['id']}: {dur:.2f}s {manifest[-1]['wpm']} wpm")
    (out / "manifest.json").write_text(json.dumps(manifest, indent=2))

if __name__ == "__main__":
    main()
