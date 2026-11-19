#!/usr/bin/env python3
\"\"\"Quick numeric QA: sample frames from key ranges and report ink/motion bboxes.
Usage: python3 scripts/qa-ranges.py [mp4]\"\"\"
import subprocess, sys, tempfile, os
from pathlib import Path

MP4 = sys.argv[1] if len(sys.argv) > 1 else "out/webrivo-short.mp4"
# (name, start, end, step, crop or None) — sample a few frames per range
RANGES = [
    ("turn-cards", 432, 480, 6, None),
    ("turn-panel", 500, 560, 6, (56, 196, 1024, 1556)),
    ("product-page", 670, 760, 10, None),
    ("product-booking", 860, 940, 10, None),
    ("product-payment", 970, 1040, 10, None),
    ("dashboard", 1090, 1200, 10, None),
]

def ink_bbox(path, crop=None):
    try:
        from PIL import Image
        import numpy as np
    except Exception:
        return None, None
    im = Image.open(path)
    if crop: im = im.crop(crop)
    a = np.array(im.convert('L')).astype(int)
    m = a < 90
    ink = float(m.mean())
    if not m.any(): return ink, None
    ys, xs = np.where(m)
    return ink, (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))

for name, start, end, step, crop in RANGES:
    print(f"\n== {name} {start}-{end} ==")
    for f in range(start, end + 1, step):
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tf:
            out = tf.name
        try:
            subprocess.run(["ffmpeg","-v","error","-y","-i",MP4,"-vf",f"select=eq(n\\,{f})","-frames:v","1",out], check=True)
            ink, bb = ink_bbox(out, crop)
            print(f"  f{f}: ink={ink if ink is not None else 'n/a'} bbox={bb}")
        finally:
            try: os.unlink(out)
            except: pass
