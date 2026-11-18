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

68 cues, every one declared against a `BEATS` value exported by its shot file.
There is no whoosh in the mix: cuts are carried by the voice and by paper/click
transients. `local` is the shot-local frame, `abs` the film frame.

| # | shot | action | local | abs | file | vol |
|---|------|--------|------:|----:|------|----:|
| 1 | S1 | film open (paper) | 0 | 0 | fs-879272 low thud | 0.3 |
| 2 | S1 | first shop tag | 8 | 8 | fs-872341 click | 0.12 |
| 3 | S1 | shop tag | 40 | 40 | fs-872341 click | 0.13 |
| 4 | S1 | shop tag | 48 | 48 | fs-872341 click | 0.13 |
| 5 | S1 | shop tag | 56 | 56 | fs-872341 click | 0.13 |
| 6 | S1 | hook "EVERY SHOP" lands | 60 | 60 | fs-879272 low thud | 0.45 |
| 7 | S2 | glass pill drops in | 6 | 102 | fs-872341 click | 0.14 |
| 8 | S2 | dictation tick | 12 | 108 | fs-872341 click | 0.11 |
| 9 | S2 | dictation tick | 18 | 114 | fs-872341 click | 0.11 |
| 10 | S2 | dictation tick | 24 | 120 | fs-872341 click | 0.11 |
| 11 | S2 | dictation tick | 30 | 126 | fs-872341 click | 0.11 |
| 12 | S2 | dictation tick | 36 | 132 | fs-872341 click | 0.11 |
| 13 | S2 | query submits | 40 | 136 | fs-278205 switch | 0.22 |
| 14 | S2 | "another bakery" row | 46 | 142 | fs-879272 low thud | 0.22 |
| 15 | S2 | YOUR SHOP row lands | 58 | 154 | fs-879272 low thud | 0.4 |
| 16 | S2 | crop marks snap | 62 | 158 | fs-131359 paper slap | 0.3 |
| 17 | S2 | pen starts tracing | 66 | 162 | fs-630019 page turn | 0.35 |
| 18 | S2 | pen closes the ring | 90 | 186 | fs-878247 glass ping | 0.32 |
| 19 | S2 | FOUND row goes to ink | 94 | 190 | fs-131359 paper slap | 0.45 |
| 20 | S2 | "GET FOUND." lands | 104 | 200 | fs-879272 low thud | 0.5 |
| 21 | S2 | "GET CHOSEN." lands | 114 | 210 | fs-879272 low thud | 0.34 |
| 22 | S2 | "websites for main street" | 124 | 220 | fs-131359 paper slap | 0.4 |
| 23 | S4 | desk + wall in | 0 | 248 | fs-879272 low thud | 0.35 |
| 24 | S4 | stack presses down | 8 | 256 | fs-879272 low thud | 0.3 |
| 25 | S4 | stack pulls back | 18 | 266 | fs-872341 click | 0.18 |
| 26 | S4 | "a slow page" card deals | 34 | 282 | fs-131359 paper slap | 0.7 |
| 27 | S4 | "a pin three streets off" card | 74 | 322 | fs-131359 paper slap | 0.73 |
| 28 | S4 | third card picks up | 118 | 366 | fs-131359 paper slap | 0.4 |
| 29 | S4 | "a form nobody answers" card | 122 | 370 | fs-131359 paper slap | 0.76 |
| 30 | S4 | "they leave" turn card | 140 | 388 | fs-131359 paper slap | 0.79 |
| 31 | S4 | turn card ping | 146 | 394 | fs-878247 glass ping | 0.35 |
| 32 | S5 | headline in | 3 | 427 | fs-879272 low thud | 0.4 |
| 33 | S5 | "keep it simple" note | 10 | 434 | fs-879272 low thud | 0.35 |
| 34 | S5 | BRIEF rolls in | 46 | 470 | fs-278205 switch | 0.45 |
| 35 | S5 | BUILD rolls in | 58 | 482 | fs-278205 switch | 0.45 |
| 36 | S5 | SHIP rolls in | 70 | 494 | fs-278205 switch | 0.45 |
| 37 | S5 | SHIP stamp | 76 | 500 | fs-879272 low thud | 0.3 |
| 38 | S7 | card 1 pops onto the ring | 22 | 546 | fs-131359 paper slap | 0.7 |
| 39 | S7 | card 2 pops | 28 | 552 | fs-131359 paper slap | 0.7 |
| 40 | S7 | card 3 pops | 34 | 558 | fs-131359 paper slap | 0.7 |
| 41 | S7 | riser starts under "SHIP" (peaks as the ring assembles) | 40 | 564 | fs-859482 riser | 0.4 |
| 42 | S7 | ₹599 lights | 46 | 570 | fs-878247 glass ping | 0.4 |
| 43 | S7 | ring whips to 1,199 | 70 | 594 | fs-278205 switch | 0.3 |
| 44 | S7 | ₹1,199 lights | 78 | 602 | fs-878247 glass ping | 0.4 |
| 45 | S7 | ring whips to 2,199 | 82 | 606 | fs-278205 switch | 0.3 |
| 46 | S7 | ₹2,199 lights | 88 | 612 | fs-878247 glass ping | 0.4 |
| 47 | S7 | "everything handled" note | 120 | 644 | fs-278205 switch | 0.3 |
| 48 | S8 | HOSTING card lifts | 16 | 708 | fs-872341 click | 0.2 |
| 49 | S8 | MAINTENANCE card lifts | 40 | 732 | fs-872341 click | 0.2 |
| 50 | S8 | HOSTING drops back | 48 | 740 | fs-131359 paper slap | 0.3 |
| 51 | S8 | DOMAIN card lifts | 64 | 756 | fs-872341 click | 0.2 |
| 52 | S8 | MAINTENANCE drops back | 72 | 764 | fs-131359 paper slap | 0.3 |
| 53 | S8 | "in every plan" note | 74 | 766 | fs-878247 glass ping | 0.25 |
| 54 | S9 | room in / the bill | 0 | 812 | fs-879272 low thud | 0.32 |
| 55 | S9 | ₹1,199 digits settle | 34 | 846 | fs-872341 click | 0.2 |
| 56 | S9 | camera lands on the toggle | 56 | 868 | fs-872341 click | 0.3 |
| 57 | S9 | toggle flips YEARLY | 104 | 916 | fs-278205 switch | 0.6 |
| 58 | S9 | SAVE 10% stamp | 114 | 926 | fs-131359 paper slap | 0.55 |
| 59 | S9 | ₹12,948 digits settle | 118 | 930 | fs-872341 click | 0.2 |
| 60 | S9 | camera lands on the receipt | 138 | 950 | fs-879272 low thud | 0.4 |
| 61 | S9 | receipt note | 142 | 954 | fs-878247 glass ping | 0.22 |
| 62 | S10 | badge drops | 7 | 987 | fs-879272 low thud | 0.4 |
| 63 | S10 | plan print 1 | 26 | 1006 | fs-131359 paper slap | 0.6 |
| 64 | S10 | wordmark locks | 27 | 1007 | fs-878247 glass ping | 0.35 |
| 65 | S10 | plan print 2 | 34 | 1014 | fs-131359 paper slap | 0.6 |
| 66 | S10 | plan print 3 | 42 | 1022 | fs-131359 paper slap | 0.6 |
| 67 | S10 | sign-off scribble | 132 | 1112 | fs-630019 page turn | 0.9 |
| 68 | S10 | contact details in | 154 | 1134 | fs-872341 click | 0.4 |

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
| S1 | 9.6–87 | shop tags 9–21, hook 60 (holds to the cut) |
| S2 | 9.6–83.7 / 94.5–123 | pill 6, type 12, submit 40, rows 46/58, marks 62, pen 66–90, found 94, card out 98, head 104, sub 114, note 124 |
| S4 | 9.3–36.3 / 42.3–77.7 / 87.9–128.4 / 130.2–147 | cards 34 / 74 / 122 / turn 140, out 164 |
| S5 | 8.1–37.2 / 45.6–78.6 | BRIEF 46, BUILD 58, SHIP 70, stamp 76, out 88 |
| S7 | 9.6–34.5 / 45–79.8 / 79.8–108.9 / 118.8–147 | pops 22/28/34, ring 70 & 82, prices 46 / 78 / 88, note 120, out 154 |
| S8 | 9–42.6 / 50.4–93.6 | lifts 16 / 40 / 64, drops 48 / 72, note 74, out 106 |
| S9 | 9.3–39 / 50.1–97.2 / 103.8–147.6 | price 24, flip 104, SAVE 114, receipt 138, out 156 |
| S10 | 9.6–32.7 / 32.7–103.8 / 116.7–146.7 | badge 7, wordmark 5–17, prints 26/34/42, sign 118, contact 132 |

Measured on the delivered files (`scripts/verify-av.py`): both variants are
1156 frames / 38.592s, mean −22.2 dB (with BGM) and −23.0 dB (SFX only), peaks
−3.3 / −3.2 dB, and every VO line lands at +1.2…+1.5f — one uniform encoder
delay, no drift. Spot-listen cues 26–30 (collage deal), 38–41 (plan ring
assembles), 57–58 (estimator flip), 67 (final sign-off).
