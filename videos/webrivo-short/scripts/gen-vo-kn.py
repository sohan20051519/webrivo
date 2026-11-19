"""Generate mixed Kannada-English VO with edge-tts (one consistent accent).

Usage:
  /tmp/opencode/tts-venv/bin/python scripts/gen-vo-kn.py

Reads scripts/vo-script-kn.json, generates each line with the single
kn-IN-SapnaNeural voice (so English keywords get one consistent Kannada
accent), post-processes with the broadcast chain, trims silence, adds a
0.3s lead, and time-stretches to fit inside the line's window with no overlap.
"""
import asyncio
import json
import os
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts/vo-script-kn.json"
OUT = ROOT / "public/audio/vo-kn"
TMP = Path("/tmp/opencode/kn-vo")
TMP.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)

SR = 24000
LEAD = 0.30
GAP = 0.10
CHAIN = (
    "highpass=f=85,"
    "equalizer=f=260:t=q:w=1.2:g=-1.5,"
    "equalizer=f=3100:t=q:w=1.3:g=1.8,"
    "acompressor=threshold=0.09:ratio=3:attack=6:release=140:makeup=2,"
    "loudnorm=I=-19:TP=-3.0:LRA=7"
)


def run(*args):
    subprocess.run(args, check=True, capture_output=True)


def duration(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(path)], text=True)
    return float(out.strip())


async def main():
    spec = json.loads(SCRIPT.read_text(encoding="utf-8"))
    print(f"{'id':6s} {'raw':>6s} {'final':>6s} {'window':>7s} {'tempo':>6s}")
    for item in spec:
        vid = item["id"]
        win = float(item["window"])
        target = win - GAP
        raw_mp3 = TMP / f"{vid}.mp3"
        raw_wav = TMP / f"{vid}_raw.wav"
        proc = TMP / f"{vid}_proc.wav"
        trim = TMP / f"{vid}_trim.wav"
        final = OUT / f"{vid}.wav"

        await edge_tts.Communicate(item["text"], "kn-IN-SapnaNeural").save(str(raw_mp3))
        run("ffmpeg", "-v", "error", "-y", "-i", str(raw_mp3),
            "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", str(raw_wav))
        raw_dur = duration(raw_wav)

        # broadcast chain
        run("ffmpeg", "-v", "error", "-y", "-i", str(raw_wav),
            "-af", CHAIN, "-ar", str(SR), "-ac", "1",
            "-c:a", "pcm_s16le", str(proc))

        # trim leading/trailing silence, then add exact 0.30s lead
        run("ffmpeg", "-v", "error", "-y", "-i", str(proc),
            "-af", "silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,"
                   "areverse,silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse",
            "-ar", str(SR), "-ac", "1", "-c:a", "pcm_s16le", str(trim))

        speech = duration(trim)
        available = target - LEAD
        if speech > available:
            tempo = speech / available
            run("ffmpeg", "-v", "error", "-y", "-i", str(trim),
                "-af", f"atempo={tempo:.6f}", "-ar", str(SR), "-ac", "1",
                "-c:a", "pcm_s16le", str(trim.with_suffix(".sped.wav")))
            trim = trim.with_suffix(".sped.wav")
        else:
            tempo = 1.0

        # pad with 0.30s silence at the front, then ensure exact target length
        run("ffmpeg", "-v", "error", "-y",
            "-f", "lavfi", "-t", str(LEAD), "-i", f"anullsrc=r={SR}:cl=mono",
            "-i", str(trim),
            "-filter_complex", "[0:a][1:a]concat=n=2:v=0:a=1,apad",
            "-t", str(target), "-ar", str(SR), "-ac", "1",
            "-c:a", "pcm_s16le", str(final))

        print(f"{vid:6s} {raw_dur:6.2f} {duration(final):6.2f} {win:7.2f} {tempo:6.3f}")


if __name__ == "__main__":
    asyncio.run(main())
