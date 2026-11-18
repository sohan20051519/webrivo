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
| 1 | S1 BrandOpen | film open | 0 | fs-879272 low thud | .32 |
| 2 | S1 | badge stamp | 30 | fs-879272 low thud | .55 |
| 3 | S1 | typewriter kicker starts | 44 | fs-630019 page turn | 1.4 |
| 4 | S1 | exit lift | 126 | fs-449645 whoosh | .6 |
| 5–7 | S2 Hero | search query typed (3 ticks) | 154/174/192 | fs-872341 click | .16 |
| 8 | S2 | "another bakery" row | 184 | fs-879272 thud | .24 |
| 9 | S2 | YOUR SHOP row lands | 200 | fs-879272 thud | .42 |
| 10 | S2 | FOUND pill | 206 | fs-878247 ping | .38 |
| 11 | S2 | search card lifts away | 224 | fs-449645 whoosh | .5 |
| 12 | S2 | headline lands | 242 | fs-879272 thud | .5 |
| 13 | S2 | subcopy in | 272 | fs-278205 switch | .28 |
| 14 | S2 | CTA pill | 298 | fs-131359 paper slap | .4 |
| 15 | S2 | stamp signs | 326 | fs-131359 paper slap | .5 |
| 16 | S2 | whip-up exit | 364 | fs-449645 whoosh | .7 |
| 17 | S3 Title | "MADE FOR MAIN STREET" lands | 388 | fs-879272 thud | .5 |
| 18 | S4 Collage | board appears | 439 | fs-879272 thud | .4 |
| 19–22 | S4 | problem cards land (14/47/92/124) | 449/482/527/559 | fs-131359 slap | .65–.75 |
| 23 | S4 | "ALL OF IT" turn | 565 | fs-878247 ping | .35 |
| 24 | S5 Process | headline in | 608 | fs-879272 thud | .4 |
| 25 | S5 | BRIEF impact | 615 | fs-879272 thud | .35 |
| 26–27 | S5 | roll → BUILD / SHIP | 645 / 685 | fs-278205 switch | .45 |
| 28 | S6 Title | "PICK YOUR PLAN" lands | 783 | fs-879272 thud | .5 |
| 29 | S6 | riser into first plan card (peaks f842) | 775 | fs-859482 riser | .4 |
| 30–32 | S7 Plans | cards deal at k×50 (842/892/942) | 842+ | fs-131359 slap | .7–.75 |
| 33 | S7 | BEST VALUE pill (card 2) | 896 | fs-878247 ping | .4 |
| 34 | S7 | exit | 998 | fs-449645 whoosh | .55 |
| 35–37 | S8 Inclusions | HOSTING / MAINTENANCE / DOMAIN | 1040/1074/1108 | fs-278205 switch | .35 |
| 38 | S9 Estimator | entry | 1160 | fs-449645 whoosh | .55 |
| 39 | S9 | monthly ₹1,199 settles | 1212 | fs-872341 click | .4 |
| 40 | S9 | toggle flips YEARLY −10% | 1230 | fs-278205 switch | .6 |
| 41 | S9 | SAVE 10% stamp | 1240 | fs-131359 slap | .55 |
| 42 | S9 | yearly ₹12,948 settles | 1266 | fs-872341 click | .4 |
| 43–45 | S10 Outro | 3 plan prints slap (1372/1388/1400) | — | fs-131359 slap | .55–.6 |
| 46 | S10 | contact chips | 1412 | fs-878247 ping | .35 |
| 47 | S10 | sign-off scribble | 1436 | fs-630019 page turn | .9 |
| 48 | S10 | contact details in | 1456 | fs-872341 click | .4 |

## Loudness

Volumes are multiplicative mix factors, not target LUFS. Hot sources (thud
−2.6 dBFS peak) are scaled down; quiet ones (page turn −31.8 dBFS RMS) scaled
up. Multi-track peaks checked after render; BGM sits under SFX.

## Voice-over (Kokoro-82M, local model, kokoro-js runtime)

Storytelling read, voice `af_heart` (highest measured pitch variance of the
available voices → least monotone), broadcast chain applied per line
(high-pass 85 Hz, presence +1.8 dB @3.1 kHz, 3:1 comp, loudnorm I=-19 TP=-3).
Pinned to the story beats; BGM ducks to 0.14 under every line (8f ramps).

| id | shot | start | dur (f) | line |
|----|------|------:|--------:|------|
| s1 | S1 BrandOpen | 24 | 90 | "Every great shop on this street has a story." |
| s2 | S2 Hero | 152 | 141 | "Right now, someone nearby is searching for yours. We make sure they find it." |
| s4 | S4 Collage | 440 | 163 | "A slow page. A pin three streets off. A form nobody answers. They leave." |
| s5 | S5 Process | 618 | 91 | "So we keep it simple. Brief, build, ship." |
| s7 | S7 Plans | 836 | 161 | "Three plans. Five ninety nine to twenty one ninety nine. Everything handled." |
| s8 | S8 Inclusions | 1016 | 108 | "Hosting, maintenance, your domain — in every plan." |
| s9 | S9 Estimator | 1170 | 162 | "No surprises. See the exact price up front — and save ten percent yearly." |
| s10 | S10 Outro | 1356 | 161 | "Webrivo. For the businesses that make a town feel like home. Let's get you found." |

No line mentions a delivery time — the film sells the outcome, not a deadline.

VO files: `public/audio/vo/s*.wav` (24 kHz mono, peak −3.0 to −4.1 dBFS).

Sync method: sentence boundaries measured from each VO file (10 ms energy,
−38 dBFS gate), then card/word/price beats pinned to those boundaries:

| shot | VO sentence starts (shot-local f) | visual beat |
|------|-----------------------------------|-------------|
| S2 | 22 / 106 | search card up / headline lands 110 |
| S4 | 10 / 47 / 92 / 122 | cards land 14 / 47 / 92 / 124 |
| S5 | 21 / 58 | BRIEF 0 → BUILD 40 → SHIP 80 |
| S7 | 16 / 52 / 125 | cards land 12 / 62 / 112 |
| S9 | 19 / 60 / 114 | flip 70, SAVE 10% 80 |
| S10 | 26 / 49 / 133 | wordmark 24–45, contact 116 |

After render: `ffprobe` audio stream present in both variants; spot-listen
cues 9–12 (collage deal), 20+21 (riser→plan), 31–33 (estimator flip), 40
(final stamp) against the timeline.
