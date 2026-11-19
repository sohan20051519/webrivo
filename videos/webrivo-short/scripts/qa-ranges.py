#!/usr/bin/env python3
"""Numeric QA for the rebuilt shots: decode ranges of the delivered mp4 and
report ink extents + frame-to-frame change, so clipping / dead windows show up
without a human looking at a picture.

usage: python3 scripts/qa-ranges.py out/webrivo-short.mp4
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image

RANGES = {
    '② search': (210, 420),
    '④ deals': (420, 658),
    '⑤ docket': (658, 762),
}


def frames(path, a, b, step):
    d = tempfile.mkdtemp(prefix='qa-')
    subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', path, '-vf', f'select=between(n\\,{a}\\,{b})*not(mod(n-{a}\\,{step}))',
         '-vsync', '0', os.path.join(d, '%04d.png')], check=True)
    out = []
    for f in sorted(os.listdir(d)):
        out.append((int(f[:4]), np.asarray(Image.open(os.path.join(d, f)).convert('L'), dtype=np.float32)))
    return out


def main():
    path = sys.argv[1]
    for name, (a, b) in RANGES.items():
        seq = frames(path, a, b, 5)
        print(f'\n{name}  {a}-{b}  ({len(seq)} samples)')
        prev = None
        for k, img in seq:
            # ink = anything that differs from the row's own median (bands of text)
            med = np.median(img, axis=1, keepdims=True)
            ink = (np.abs(img - med) > 16)
            rows = np.where(ink.mean(axis=1) > 0.01)[0]
            cols = np.where(ink.mean(axis=0) > 0.01)[0]
            d = '-' if prev is None else f'{np.abs(img - prev).mean():.2f}'
            bbox = f'{rows[0]}-{rows[-1]} x {cols[0]}-{cols[-1]}' if len(rows) and len(cols) else 'EMPTY'
            print(f'  f{a + (k - 1) * 5:5d}  ink {bbox:24s} Δ {d}')
            prev = img


if __name__ == '__main__':
    main()
