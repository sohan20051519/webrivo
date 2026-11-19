# Audio timeline — webrivo-short

1080×1920 · 30fps · **1506f (50.2s)**. Scene components embed no audio; every
cue is declared in `src/AudioTrack.tsx` against the shot files' exported
`BEATS`, and resolved through `src/timeline.tsx`. Re-timing a shot moves its
sound with it. SFX `from` values compensate each file's measured 10ms-energy
peak so the peak lands on the action frame.

## Voice-over

Fifteen lines, all local Kokoro-82M (`af_heart`) through the same broadcast
chain (highpass 85 Hz, −1.5 dB @260 Hz, +1.8 dB @3.1 kHz, compressor,
`loudnorm I=-19 TP=-3`), 24 kHz mono s16, written to `public/audio/vo/`.
Each wav keeps ~0.3s of lead silence, so `VO_LEAD = 2` puts the first syllable
~11f after the cut. Spoken length is the gated (−28 dB) speech span, not the
file length.

| line | scene | text | local | abs | spoken |
|------|:-----:|------|------:|----:|-------:|
| s1a | ① | Every great shop on this street has a story. | 2 | 2 | 2.17s (65f) |
| s1b | ① | The bakery on the corner. The tailor three doors down. | 88 | 88 | 2.99s (90f) |
| s2a | ② | Right now, someone nearby is looking for exactly what you sell. | 2 | 212 | 3.22s (97f) |
| s2b | ② | They open their phone, and you're not there. | 124 | 334 | 1.89s (57f) |
| s4a | ④ | A slow page. A pin three streets off. A form nobody answers. | 2 | 422 | 3.95s (119f) |
| s4b | ④ | So they scroll on, and buy from someone else. | 140 | 560 | 2.33s (70f) |
| s5a | ⑤ | So we keep it simple. Brief, build, ship. | 2 | 660 | 2.35s (71f) |
| s7a | ⑦ | Three plans. Five ninety nine to twenty one ninety nine a month. | 2 | 764 | 3.79s (114f) |
| s7b | ⑦ | Everything handled. | 140 | 902 | 1.03s (31f) |
| s8a | ⑧ | Hosting, maintenance, your domain, in every plan. | 2 | 964 | 2.79s (84f) |
| s9a | ⑨ | No surprises. The exact price up front. | 2 | 1076 | 2.60s (78f) |
| s9b | ⑨ | Pay yearly, and you save ten percent. | 104 | 1178 | 2.10s (63f) |
| s10a | ⑩ | Webrivo. | 2 | 1272 | 0.63s (19f) |
| s10b | ⑩ | For the businesses that make a town feel like home. | 49 | 1319 | 2.51s (75f) |
| s10c | ⑩ | Let's get you found. | 150 | 1420 | 1.00s (30f) |

≈35.4s of the 50.2s carries speech (70% density).

## Pacing rule

There are no music-only scenes. Every cut lands 0.55–0.80s after the last
spoken syllable of the shot it leaves, so the film never sits in silence:

| cut | speech ends (abs) | next shot | gap |
|-----|------------------:|-----------|----:|
| ① → ② | 187 | 210 | 23f (0.77s) |
| ② → ④ | 401 | 420 | 19f (0.63s) |
| ④ → ⑤ | 639 | 658 | 19f (0.63s) |
| ⑤ → ⑦ | 739 | 762 | 23f (0.77s) |
| ⑦ → ⑧ | 943 | 962 | 19f (0.63s) |
| ⑧ → ⑨ | 1057 | 1074 | 17f (0.57s) |
| ⑨ → ⑩ | 1250 | 1270 | 20f (0.67s) |

## BGM

`public/audio/bgm/house-vibez.mp3` — "House Vibez" by Lily J, Mixkit Stock
Music Free License (see `public/audio/ATTRIBUTION.md`).

- Starts at frame 9 with a 25f fade-in, 0.32 gain, ducks to 0.14 under every VO
  line (8f ramps), fades out over the last 36f (1461 → 1497).
- Beat grid (autocorrelation on onset envelope, no beat-synced editing):
  **122.4 BPM → beats at 10.8f + k×14.7f** from film start.
- Shot-cut alignment (cut minus nearest beat): 210 (−6.6f), 420 (−2.4f),
  658 (+0.4f), 762 (+1.5f), 962 (−4.3f), 1074 (+4.8f), 1270 (−5.0f) — no cut
  is beat-synced on purpose; the voice carries the cut.
- An SFX-only variant (`out/webrivo-short-sfxonly.mp4`, `--props='{"bgm":false}'`)
  is provided for BGM on/off comparison.

## SFX (all Freesound CC0 — credits in `public/audio/sfx/FREESOUND-CREDITS.md`)

76 cues, every one declared against a `BEATS` value exported by its shot file.
There is no whoosh in the mix: cuts are carried by the voice and by paper/click
transients. The riser is the only long tail — it starts in ⑤ and peaks exactly
on the first frame of ⑦, under the carousel assembling.

| # | shot | local | abs | file | vol |
|---|:----:|------:|----:|------|----:|
| 1 | ① | 0 | 0 | fs-879272 low thud | 0.3 |
| 2 | ① | 8 | 8 | fs-872341 click | 0.13 |
| 3 | ① | 11 | 11 | fs-872341 click | 0.13 |
| 4 | ① | 14 | 14 | fs-872341 click | 0.13 |
| 5 | ① | 17 | 17 | fs-872341 click | 0.13 |
| 6 | ① | 20 | 20 | fs-872341 click | 0.13 |
| 7 | ① | 62 | 62 | fs-879272 low thud | 0.45 |
| 8 | ① | 98 | 98 | fs-630019 page turn | 0.34 |
| 9 | ① | 104 | 104 | fs-879272 low thud | 0.3 |
| 10 | ① | 140 | 140 | fs-630019 page turn | 0.3 |
| 11 | ① | 152 | 152 | fs-879272 low thud | 0.3 |
| 12 | ② | 2 | 212 | fs-872341 click | 0.14 |
| 13 | ② | 18 | 230 | fs-872341 click | 0.1 |
| 14 | ② | 22 | 234 | fs-872341 click | 0.1 |
| 15 | ② | 26 | 238 | fs-872341 click | 0.1 |
| 16 | ② | 30 | 242 | fs-872341 click | 0.1 |
| 17 | ② | 34 | 246 | fs-872341 click | 0.1 |
| 18 | ② | 38 | 250 | fs-872341 click | 0.1 |
| 19 | ② | 42 | 254 | fs-872341 click | 0.1 |
| 20 | ② | 46 | 258 | fs-872341 click | 0.1 |
| 21 | ② | 58 | 268 | fs-278205 switch | 0.24 |
| 22 | ② | 66 | 276 | fs-879272 low thud | 0.24 |
| 23 | ② | 74 | 284 | fs-879272 low thud | 0.18 |
| 24 | ② | 86 | 296 | fs-879272 low thud | 0.23 |
| 25 | ② | 98 | 308 | fs-879272 low thud | 0.28 |
| 26 | ② | 120 | 330 | fs-131359 paper slap | 0.44 |
| 27 | ② | 130 | 340 | fs-630019 page turn | 0.34 |
| 28 | ② | 168 | 378 | fs-878247 glass ping | 0.34 |
| 29 | ② | 172 | 382 | fs-872341 click | 0.26 |
| 30 | ④ | 0 | 420 | fs-879272 low thud | 0.35 |
| 31 | ④ | 8 | 428 | fs-879272 low thud | 0.3 |
| 32 | ④ | 10 | 430 | fs-872341 click | 0.18 |
| 33 | ④ | 16 | 436 | fs-131359 paper slap | 0.72 |
| 34 | ④ | 52 | 472 | fs-131359 paper slap | 0.72 |
| 35 | ④ | 94 | 514 | fs-131359 paper slap | 0.72 |
| 36 | ④ | 152 | 572 | fs-630019 page turn | 0.4 |
| 37 | ④ | 190 | 610 | fs-131359 paper slap | 0.85 |
| 38 | ④ | 196 | 616 | fs-878247 glass ping | 0.34 |
| 39 | ⑤ | 2 | 660 | fs-879272 low thud | 0.4 |
| 40 | ⑤ | 9 | 667 | fs-879272 low thud | 0.34 |
| 41 | ⑤ | 34 | 692 | fs-859482 riser | 0.4 |
| 42 | ⑤ | 46 | 704 | fs-278205 switch | 0.45 |
| 43 | ⑤ | 58 | 716 | fs-278205 switch | 0.45 |
| 44 | ⑤ | 70 | 728 | fs-278205 switch | 0.45 |
| 45 | ⑤ | 76 | 734 | fs-879272 low thud | 0.3 |
| 46 | ⑦ | 18 | 780 | fs-131359 paper slap | 0.7 |
| 47 | ⑦ | 24 | 786 | fs-131359 paper slap | 0.7 |
| 48 | ⑦ | 30 | 792 | fs-131359 paper slap | 0.7 |
| 49 | ⑦ | 50 | 812 | fs-278205 switch | 0.34 |
| 50 | ⑦ | 52 | 814 | fs-878247 glass ping | 0.4 |
| 51 | ⑦ | 72 | 834 | fs-278205 switch | 0.34 |
| 52 | ⑦ | 74 | 836 | fs-878247 glass ping | 0.4 |
| 53 | ⑦ | 92 | 854 | fs-278205 switch | 0.34 |
| 54 | ⑦ | 94 | 856 | fs-878247 glass ping | 0.4 |
| 55 | ⑦ | 150 | 912 | fs-278205 switch | 0.3 |
| 56 | ⑧ | 14 | 976 | fs-872341 click | 0.22 |
| 57 | ⑧ | 44 | 1006 | fs-872341 click | 0.22 |
| 58 | ⑧ | 44 | 1006 | fs-131359 paper slap | 0.28 |
| 59 | ⑧ | 74 | 1036 | fs-872341 click | 0.22 |
| 60 | ⑧ | 74 | 1036 | fs-131359 paper slap | 0.28 |
| 61 | ⑧ | 92 | 1054 | fs-878247 glass ping | 0.25 |
| 62 | ⑨ | 0 | 1074 | fs-879272 low thud | 0.32 |
| 63 | ⑨ | 26 | 1100 | fs-872341 click | 0.2 |
| 64 | ⑨ | 66 | 1140 | fs-872341 click | 0.3 |
| 65 | ⑨ | 116 | 1190 | fs-278205 switch | 0.6 |
| 66 | ⑨ | 120 | 1194 | fs-872341 click | 0.2 |
| 67 | ⑨ | 136 | 1210 | fs-131359 paper slap | 0.55 |
| 68 | ⑨ | 162 | 1236 | fs-879272 low thud | 0.4 |
| 69 | ⑨ | 166 | 1240 | fs-878247 glass ping | 0.22 |
| 70 | ⑩ | 4 | 1274 | fs-879272 low thud | 0.4 |
| 71 | ⑩ | 10 | 1280 | fs-131359 paper slap | 0.6 |
| 72 | ⑩ | 15 | 1285 | fs-131359 paper slap | 0.6 |
| 73 | ⑩ | 20 | 1290 | fs-131359 paper slap | 0.6 |
| 74 | ⑩ | 26 | 1296 | fs-878247 glass ping | 0.35 |
| 75 | ⑩ | 158 | 1428 | fs-630019 page turn | 0.9 |
| 76 | ⑩ | 178 | 1448 | fs-872341 click | 0.4 |

## Verification

`python3 scripts/verify-av.py out/webrivo-short.mp4` cross-correlates each VO
line's 10ms energy envelope against the rendered mix over ±20f and prints the
measured lag. It also prints duration and integrated loudness for both variants.
