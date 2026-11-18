"""A/V verification for webrivo-short: duration, loudness, and VO onset lag
(cross-correlation of each VO line against the rendered mix). Pure stdlib."""
import json
import math
import struct
import subprocess
import sys

MP4 = sys.argv[1] if len(sys.argv) > 1 else "out/webrivo-short.mp4"
FPS = 30.0
SR = 48000
HOP_MS = 10
HOP = SR * HOP_MS // 1000
HOP_F = HOP_MS / 1000 * FPS

# expected VO starts (shot.from + VO_LEAD), from src/timeline.tsx
VO = {
    "s1": 2, "s2": 98, "s4": 250, "s5": 426,
    "s7": 526, "s8": 694, "s9": 814, "s10": 982,
}


def decode(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR),
         "-f", "f32le", "-"], capture_output=True, check=True).stdout
    n = len(raw) // 4
    return struct.unpack(f"<{n}f", raw[: n * 4])


def envelope(x):
    env = []
    for i in range(0, len(x) - HOP + 1, HOP):
        s = 0.0
        for v in x[i: i + HOP]:
            s += v * v
        env.append(math.sqrt(s / HOP))
    return env


def probe_duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "json", path], capture_output=True, check=True).stdout
    return float(json.loads(out)["format"]["duration"])


def volumedetect(path):
    err = subprocess.run(
        ["ffmpeg", "-v", "info", "-i", path, "-af", "volumedetect",
         "-f", "null", "-"], capture_output=True, text=True).stderr
    keep = [l.split("] ")[-1] for l in err.splitlines()
            if "mean_volume" in l or "max_volume" in l]
    return " / ".join(keep)


def norm(v):
    return math.sqrt(sum(x * x for x in v))


def lag_frames(mix_env, vo_env, expect_f):
    exp = int(round(expect_f / HOP_F))
    span = len(vo_env)
    b = [v - sum(vo_env) / span for v in vo_env]
    nb = norm(b)
    best, best_lag = -2.0, exp
    for lag in range(exp - 45, exp + 45):
        seg = mix_env[lag: lag + span]
        if len(seg) < span:
            continue
        m = sum(seg) / span
        a = [v - m for v in seg]
        na = norm(a)
        if na == 0 or nb == 0:
            continue
        c = sum(p * q for p, q in zip(a, b)) / (na * nb)
        if c > best:
            best, best_lag = c, lag
    return (best_lag - exp) * HOP_F, best


mix_env = envelope(decode(MP4))
print(f"{MP4}: {probe_duration(MP4):.3f}s")
print("loudness:", volumedetect(MP4))

print(f"{'line':5s} {'expect':>7s} {'lag(f)':>7s} {'corr':>6s}")
worst = 0.0
for vid, start in VO.items():
    vo_env = envelope(decode(f"public/audio/vo/{vid}.wav"))
    lag, corr = lag_frames(mix_env, vo_env, start)
    worst = max(worst, abs(lag))
    print(f"{vid:5s} {start:7.1f} {lag:7.2f} {corr:6.3f}")
print(f"worst |lag| = {worst:.2f}f")
