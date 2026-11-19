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

# expected VO starts, from src/timeline.tsx (shot.from + vo.at)
VO = {
    "s1a": 2, "s1b": 88,
    "s2a": 212, "s2b": 334,
    "s4a": 422, "s4b": 560,
    "s5a": 660,
    "s7a": 764, "s7b": 902,
    "s8a": 964,
    "s9a": 1076, "s9b": 1178,
    "s10a": 1272, "s10b": 1319, "s10c": 1420,
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


def load_env(path):
    return envelope(decode(path))


def best_lag(mix_env, ref_env, expect_f, window=20):
    """Find the offset (in frames) that best correlates ref against mix."""
    best, best_k = -1e9, 0
    n = len(ref_env)
    for k in range(-window, window + 1):
        start = int(round((expect_f + k) / HOP_F))
        if start < 0 or start + n > len(mix_env):
            continue
        num = 0.0
        a = 0.0
        b = 0.0
        for i in range(n):
            x = mix_env[start + i]
            y = ref_env[i]
            num += x * y
            a += x * x
            b += y * y
        score = num / (math.sqrt(a * b) + 1e-9)
        if score > best:
            best, best_k = score, k
    return best_k, best


def main():
    dur = probe_duration(MP4)
    print(f"{MP4}: {dur:.3f}s")
    mix = load_env(MP4)
    lags = []
    print(f"{'line':4s} {'expect':>7s} {'lag(f)':>7s} {'corr':>6s}")
    for vid, expect in VO.items():
        ref = load_env(f"public/audio/vo/{vid}.wav")
        k, corr = best_lag(mix, ref, expect)
        lags.append(abs(k))
        print(f"{vid:4s} {expect:7.1f} {k:7.2f} {corr:6.3f}")
    if lags:
        print(f"worst |lag| = {max(lags):.2f}f")


if __name__ == "__main__":
    main()
