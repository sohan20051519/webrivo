# Audio timeline — webrivo-short

1080×1920 · 30fps · 1560f (52s). Scene components embed no audio; everything is
pinned here and rendered by `src/AudioTrack.tsx`. SFX `from` values compensate
each file's measured 10ms-energy peak so the peak lands on the action frame.

## BGM

`public/audio/bgm/house-vibez.mp3` — "House Vibez" by Lily J, Mixkit Stock
Music Free License (see `public/audio/ATTRIBUTION.md`).

- Starts at frame 9 with 25f fade-in, 0.32 gain, fade-out over the last 40f.
- Beat grid (autocorrelation on onset envelope, no beat-synced editing):
  **122.4 BPM → beats at 10.8f + k×14.7f** from film start.
- Shot-cut alignment within ±2.6f: 380, 435, 775, 1010, 1160. Off-grid (~6f):
  605, 1340 (both follow a soft thud + whoosh, not beat events).
- An SFX-only variant (`out/webrivo-short-sfxonly.mp4`, `--props='{"bgm":false}'`)
  is provided for BGM on/off comparison.

## SFX (all Freesound CC0 — credits in `public/audio/sfx/FREESOUND-CREDITS.md`)

| # | shot | action | frame (abs) | file | vol |
|---|------|--------|------------:|------|----:|
| 1 | S1 BrandOpen | badge stamp | 30 | fs-879272 low thud | .55 |
| 2 | S1 | typewriter kicker starts | 44 | fs-630019 page turn | 1.4 |
| 3 | S1 | exit lift | 126 | fs-449645 whoosh | .6 |
| 4 | S2 Hero | camera crash-in tail | 140 | fs-879272 thud | .3 |
| 5 | S2 | Caveat stamp signs | 164 | fs-131359 paper slap | .45 |
| 6 | S2 | whip-up exit | 224 | fs-449645 whoosh | .7 |
| 7 | S3 Title | "MADE FOR MAIN STREET" lands | 388 | fs-879272 thud | .5 |
| 8 | S4 Collage | board appears | 439 | fs-879272 thud | .4 |
| 9–12 | S4 | 4 cards dealt (cue rhythm 48/52/56/59) | 483+ | fs-131359 slap | .6–.7 |
| 13 | S5 Process | headline in | 608 | fs-879272 thud | .4 |
| 14 | S5 | BRIEF impact | 615 | fs-879272 thud | .35 |
| 15–16 | S5 | roll → BUILD / SHIP | 649 / 693 | fs-278205 switch + fs-879272 | .45/.3 |
| 17 | S5 | "3 DAYS" stamp | 697 | fs-131359 slap | .5 |
| 18 | S5 | dashed seal | 711 | fs-878247 glass ping | .5 |
| 19 | S6 Title | "PICK YOUR PLAN" lands | 783 | fs-879272 thud | .5 |
| 20 | S6 | riser into first plan card (peaks f842) | 775 | fs-859482 riser | .4 |
| 21–23 | S7 Plans | cards deal at k×50 (842/892/942) | 842+ | fs-131359 slap | .7–.75 |
| 24 | S7 | BEST VALUE pill (card 2) | 896 | fs-878247 ping | .4 |
| 25 | S7 | exit | 998 | fs-449645 whoosh | .55 |
| 26–28 | S8 Inclusions | HOSTING / MAINTENANCE / DOMAIN | 1040/1074/1108 | fs-278205 switch | .35 |
| 29 | S9 Estimator | entry | 1160 | fs-449645 whoosh | .55 |
| 30 | S9 | monthly ₹1,199 settles | 1212 | fs-872341 click | .4 |
| 31 | S9 | toggle flips YEARLY −10% | 1230 | fs-278205 switch | .6 |
| 32 | S9 | SAVE 10% stamp | 1240 | fs-131359 slap | .55 |
| 33 | S9 | yearly ₹12,948 settles | 1266 | fs-872341 click | .4 |
| 34–36 | S10 Outro | 3 plan prints slap (1372/1388/1400) | — | fs-131359 slap | .55–.6 |
| 37 | S10 | contact chips | 1412 | fs-878247 ping | .35 |
| 38 | S10 | sign-off scribble | 1436 | fs-630019 page turn | .9 |
| 39 | S10 | contact details in | 1456 | fs-872341 click | .4 |

## Loudness

Volumes are multiplicative mix factors, not target LUFS. Hot sources (thud
−2.6 dBFS peak) are scaled down; quiet ones (page turn −31.8 dBFS RMS) scaled
up. Multi-track peaks checked after render; BGM sits under SFX.

## Verification

After render: `ffprobe` audio stream present in both variants; spot-listen
cues 9–12 (collage deal), 20+21 (riser→plan), 31–33 (estimator flip), 40
(final stamp) against the timeline.
