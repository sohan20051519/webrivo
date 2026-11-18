# Audio timeline — webrivo-short

1080×1920 · 30fps · **1156f (38.5s)**. Scene components embed no audio; every
cue is declared in `src/AudioTrack.tsx` against the shot files' exported
`BEATS`, and resolved through `src/timeline.tsx`. Re-timing a shot moves its
sound with it. SFX `from` values compensate each file's measured 10ms-energy
peak so the peak lands on the action frame.

## Pacing rule

There are no music-only scenes. Every cut follows the previous spoken line by
0.3–1.3s, so the film never sits in silence:

| gap | from | to | length |
|-----|------|----|-------:|
| S1 → S2 | 89 | 108 | 19f (0.63s) |
| S2 → S4 | 221 | 259 | 38f (1.27s) |
| S4 → S5 | 397 | 434 | 37f (1.23s) |
| S5 → S7 | 505 | 536 | 31f (1.03s) |
| S7 → S8 | 673 | 703 | 30f (1.00s) |
| S8 → S9 | 788 | 823 | 35f (1.17s) |
| S9 → S10 | 962 | 992 | 30f (1.00s) |

≈30.0s of the 38.5s carries voice (78% density); the longest silence is the
1.27s "they leave" beat before the fix.

## BGM

`public/audio/bgm/house-vibez.mp3` — "House Vibez" by Lily J, Mixkit Stock
Music Free License (see `public/audio/ATTRIBUTION.md`).

- Starts at frame 9 with a 25f fade-in, 0.32 gain, ducks to 0.14 under every VO
  line (8f ramps), fades out over the last 36f (1111 → 1147).
- Beat grid (autocorrelation on onset envelope, no beat-synced editing):
  **122.4 BPM → beats at 10.8f + k×14.7f** from film start.
- Shot-cut alignment: 96 (−3.0f), 248 (+2.0f), 424 (+1.6f), 524 (−1.3f),
  692 (+5.0f), 812 (−7.3f), 980 (−1.0f).
- An SFX-only variant (`out/webrivo-short-sfxonly.mp4`, `--props='{"bgm":false}'`)
  is provided for BGM on/off comparison.

## SFX (all Freesound CC0 — credits in `public/audio/sfx/FREESOUND-CREDITS.md`)

| # | shot | action | frame (abs) | file | vol |
|---|------|--------|------------:|------|----:|
| 1 | S1 BrandOpen | film open | 0 | fs-879272 low thud | .32 |
| 2 | S1 | badge stamp | 18 | fs-879272 low thud | .55 |
| 3 | S1 | typewriter kicker | 36 | fs-630019 page turn | 1.4 |
| 4 | S1 | exit lift | 82 | fs-449645 whoosh | .6 |
| 5–7 | S2 Hero | query typed (3 ticks) | 108 / 126 / 142 | fs-872341 click | .16 |
| 8 | S2 | "another bakery" row | 140 | fs-879272 thud | .24 |
| 9 | S2 | YOUR SHOP row lands | 152 | fs-879272 thud | .42 |
| 10 | S2 | FOUND pill | 160 | fs-878247 ping | .38 |
| 11 | S2 | search card lifts away | 182 | fs-449645 whoosh | .5 |
| 12 | S2 | headline lands | 190 | fs-879272 thud | .5 |
| 13 | S2 | CTA pill | 208 | fs-278205 switch | .28 |
| 14 | S2 | stamp signs | 216 | fs-131359 paper slap | .5 |
| 15 | S2 | whip-up exit | 236 | fs-449645 whoosh | .7 |
| 16 | S4 Collage | board appears | 252 | fs-879272 thud | .4 |
| 17 | S4 | board tape press | 262 | fs-131359 slap | .65 |
| 18 | S4 | "a slow page" card | 282 | fs-131359 slap | .7 |
| 19 | S4 | "a pin three streets off" card | 322 | fs-131359 slap | .73 |
| 20 | S4 | "a form nobody answers" card | 370 | fs-131359 slap | .76 |
| 21 | S4 | "they leave" turn card | 388 | fs-131359 slap | .79 |
| 22 | S4 | turn card ping | 394 | fs-878247 ping | .35 |
| 23 | S5 Process | headline in | 427 | fs-879272 thud | .4 |
| 24 | S5 | "keep it simple" note | 434 | fs-879272 thud | .35 |
| 25 | S5 | BRIEF | 470 | fs-278205 switch | .45 |
| 26 | S5 | BUILD | 482 | fs-278205 switch | .45 |
| 27 | S5 | SHIP | 494 | fs-278205 switch | .45 |
| 28 | S5 | SHIP stamp | 500 | fs-879272 thud | .3 |
| 29 | S5 → S7 | riser starts (peaks 564 as the cards stand up) | 496 | fs-859482 riser | .4 |
| 30 | S7 Plans | card 1 stands up | 546 | fs-131359 slap | .7 |
| 31 | S7 | card 2 stands up | 552 | fs-131359 slap | .7 |
| 32 | S7 | card 3 stands up | 558 | fs-131359 slap | .7 |
| 33 | S7 | ₹599 lights | 570 | fs-878247 ping | .4 |
| 34 | S7 | ₹1,199 lights | 602 | fs-878247 ping | .4 |
| 35 | S7 | ₹2,199 lights | 612 | fs-878247 ping | .4 |
| 36 | S7 | "everything handled" note | 644 | fs-278205 switch | .3 |
| 37 | S7 | exit | 678 | fs-449645 whoosh | .55 |
| 38 | S8 Inclusions | HOSTING row | 716 | fs-278205 switch | .35 |
| 39 | S8 | MAINTENANCE row | 740 | fs-278205 switch | .35 |
| 40 | S8 | DOMAIN row | 764 | fs-278205 switch | .35 |
| 41 | S8 | "in every plan" note | 766 | fs-878247 ping | .25 |
| 42 | S9 Estimator | entry | 812 | fs-449645 whoosh | .55 |
| 43 | S9 | monthly ₹1,199 settles | 836 | fs-872341 click | .4 |
| 44 | S9 | toggle flips YEARLY −10% | 916 | fs-278205 switch | .6 |
| 45 | S9 | SAVE 10% stamp | 926 | fs-131359 slap | .55 |
| 46 | S9 | yearly ₹12,948 settles | 942 | fs-872341 click | .4 |
| 47 | S10 Outro | badge lands | 990 | fs-879272 thud | .4 |
| 48 | S10 | wordmark lock ping | 1010 | fs-878247 ping | .35 |
| 49 | S10 | plan print 1 | 1014 | fs-131359 slap | .6 |
| 50 | S10 | plan print 2 | 1024 | fs-131359 slap | .6 |
| 51 | S10 | plan print 3 | 1034 | fs-131359 slap | .6 |
| 52 | S10 | sign-off scribble | 1112 | fs-630019 page turn | .9 |
| 53 | S10 | contact details in | 1134 | fs-872341 click | .4 |

## Loudness

Volumes are multiplicative mix factors, not target LUFS. Hot sources (thud
−2.6 dBFS peak) are scaled down; quiet ones (page turn −31.8 dBFS RMS) scaled
up. Multi-track peaks checked after render; BGM sits under SFX.

## Voice-over (Kokoro-82M, local model, kokoro-js runtime)

Storytelling read, voice `af_heart` (highest measured pitch variance of the
available voices → least monotone), broadcast chain applied per line
(high-pass 85 Hz, −1.5 dB @260 Hz, +1.8 dB @3.1 kHz, 3:1 comp,
loudnorm I=−19 TP=−3). Each line starts at `shot.from + VO_LEAD` (2f) so the
wav's own 0.30s lead silence lands the first syllable ~11f after the cut.

| id | shot | start | shot dur | line |
|----|------|------:|---------:|------|
| s1 | S1 BrandOpen | 2 | 96 | "Every great shop on this street has a story." |
| s2 | S2 Hero | 98 | 152 | "Right now, someone nearby is searching for yours. We make sure they find it." |
| s4 | S4 Collage | 250 | 176 | "A slow page. A pin three streets off. A form nobody answers. They leave." |
| s5 | S5 Process | 426 | 100 | "So we keep it simple. Brief, build, ship." |
| s7 | S7 Plans | 526 | 168 | "Three plans. Five ninety nine to twenty one ninety nine. Everything handled." |
| s8 | S8 Inclusions | 694 | 120 | "Hosting, maintenance, your domain — in every plan." |
| s9 | S9 Estimator | 814 | 168 | "No surprises. See the exact price up front — and save ten percent yearly." |
| s10 | S10 Outro | 982 | 176 | "Webrivo. For the businesses that make a town feel like home. Let's get you found." |

No line mentions a delivery time — the film sells the outcome, not a deadline.

VO files: `public/audio/vo/s*.wav` (24 kHz mono s16, peak −3.0 to −4.1 dBFS).

## Sync map

Sentence boundaries measured per VO file (20 ms energy envelope, peak−28 dBFS
gate), then every card / word / price beat pinned to those boundaries:

| shot | VO speech (shot-local f) | visual beats (shot-local f) |
|------|--------------------------|------------------------------|
| S1 | 9.6–87 | badge 18, type 36, exit 82 |
| S2 | 9.6–83.7 / 94.5–123 | card out 86, badge 94, head 97, sub 104, CTA 112, stamp 120 |
| S4 | 9.3–36.3 / 42.3–77.7 / 87.9–128.4 / 130.2–147 | cards 34 / 74 / 122 / turn 140 |
| S5 | 8.1–37.2 / 45.6–78.6 | note out 40, BRIEF 46, BUILD 58, SHIP 70 |
| S7 | 9.6–34.5 / 45–79.8 / 79.8–108.9 / 118.8–147 | cards 22/28/34, prices 46 / 78 / 88, note 120 |
| S8 | 9–42.6 / 50.4–93.6 | rows 16 / 40 / 64, note 74 |
| S9 | 9.3–39 / 50.1–97.2 / 103.8–147.6 | price 24, flip 104, SAVE 114 |
| S10 | 9.6–32.7 / 32.7–103.8 / 116.7–146.7 | badge 10, wordmark 8–20, prints 34/44/54, sign 118, contact 132 |

Measured on the delivered files (`scripts/verify-av.py`): both variants are
1156 frames / 38.592s, mean −21.9 dB (with BGM) and −22.7 dB (SFX only), peaks
−3.1 / −3.2 dB, and every VO line lands at +1.2…+1.5f — one uniform encoder
delay, no drift. Spot-listen cues 18–21 (collage deal), 29→30 (riser → plan
cards), 44–45 (estimator flip), 52 (final sign-off).
