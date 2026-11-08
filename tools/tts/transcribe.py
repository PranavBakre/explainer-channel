"""Transcribe audio with faster-whisper; print text and word timestamps as JSON.

Usage: transcribe.py <audio> [--model base.en] [--words out.json]
"""
import argparse, json, subprocess
import numpy as np
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument("audio"); ap.add_argument("--model", default="base.en"); ap.add_argument("--words")
a = ap.parse_args()
m = WhisperModel(a.model, device="cpu", compute_type="int8")
# PyAV in this env rejects faster-whisper's open() kwargs, so decode with ffmpeg instead.
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", a.audio, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
segs, _ = m.transcribe(np.frombuffer(pcm, np.float32), word_timestamps=True, beam_size=5)
words, text = [], []
for s in segs:
    text.append(s.text.strip())
    for w in s.words or []:
        words.append({"w": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})
print(" ".join(text))
if a.words:
    open(a.words, "w").write(json.dumps(words))
