# Audio timeline — webrivo-short

1080×1920 · 30fps · **1918f (63.9s)**. Scene components embed no audio; every
cue is declared in `src/AudioTrack.tsx` against the shot files' exported
`BEATS`, and resolved through `src/timeline.tsx`. Re-timing a shot moves its
sound with it. SFX `from` values compensate each file's measured 10ms-energy
peak so the peak lands on the action frame.

## Voice-over

Nineteen lines, all local Kokoro-82M (`af_heart`) through the same broadcast
chain (highpass 85 Hz, −1.5 dB @260 Hz, +1.8 dB @3.1 kHz, compressor,
`loudnorm I=-19 TP=-3`), 24 kHz mono s16, written to `public/audio/vo/`.
Each wav keeps ~0.3s of lead silence, so `VO_LEAD = 2` puts the first syllable
~11f after the cut. Spoken length is the gated (−35 dB) speech span, not the
file length.

The Kannada version (`public/audio/vo-kn/`) uses one consistent neural voice
(`kn-IN-SapnaNeural` via edge-tts) so mixed English keywords never switch
accent; `scripts/gen-vo-kn.py` regenerates it from `scripts/vo-script-kn.json`.

| line | scene | text | local | abs | spoken |
|------|:-----:|------|------:|----:|-------:|
| s1a | ① | Every great shop on this street has a story. | 2 | 2 | 2.17s (65f) |
| s1b | ① | The boutique on the corner. The tailor three doors down. | 88 | 88 | 3.00s (90f) |
| s2a | ② | Right now, someone nearby is looking for exactly what you sell. | 2 | 212 | 3.20s (96f) |
| s2b | ② | They open their phone, and you're not there. | 124 | 334 | 1.90s (57f) |
| s4a | ③ | So the sale goes to someone else. | 2 | 422 | 1.53s (46f) |
| s4b | ③ | Every time. | 88 | 508 | 0.70s (21f) |
| s5a | ④ | So we keep it simple. Brief, build, ship. | 2 | 562 | 2.30s (69f) |
| s6a | ⑤ | What you get is a landing page. | 2 | 666 | 1.57s (47f) |
| s6b | ⑤ | Your photos, your services, and one tap to call. | 72 | 736 | 2.67s (80f) |
| s7a | ⑤ | A booking system, so they pick a time instead of calling. | 178 | 842 | 2.87s (86f) |
| s8a | ⑤ | A payment gateway, so they pay before they arrive. | 290 | 954 | 2.67s (80f) |
| s9a | ⑥ | And a dashboard, so you see every booking, and every rupee. | 2 | 1086 | 3.03s (91f) |
| s10a | ⑦ | Three plans. Five ninety nine to twenty one ninety nine a month. | 2 | 1208 | 3.63s (109f) |
| s10b | ⑦ | Bookings, payments and dashboards come with Premium. | 136 | 1342 | 2.70s (81f) |
| s11a | ⑧ | Every plan includes hosting, maintenance, and your domain. | 2 | 1458 | 3.17s (95f) |
| s11b | ⑨ | Pay yearly, and you save ten percent. | 2 | 1580 | 2.07s (62f) |
| s12a | ⑩ | Webrivo. | 2 | 1684 | 0.63s (19f) |
| s12b | ⑩ | For the businesses that make a town feel like home. | 44 | 1726 | 2.50s (75f) |
| s12c | ⑩ | Let's get you found. | 142 | 1824 | 0.97s (29f) |

≈43.3s of the 63.9s carries speech (68% density).

## Pacing rule

There are no music-only scenes. Every cut lands 0.5–1.1s after the last
spoken syllable of the shot it leaves, so the film never sits in silence:

| cut | speech ends (abs) | next shot | gap |
|-----|------------------:|----------:|----:|
| ① → ② | 178 | 210 | 32f (1.07s) |
| ② → ③ | 391 | 420 | 29f (0.97s) |
| ③ → ④ | 529 | 560 | 31f (1.03s) |
| ④ → ⑤ | 631 | 664 | 33f (1.10s) |
| ⑤ → ⑥ | 1034 | 1084 | 50f (1.67s) |
| ⑥ → ⑦ | 1177 | 1206 | 29f (0.97s) |
| ⑦ → ⑧ | 1423 | 1456 | 33f (1.10s) |
| ⑧ → ⑨ | 1553 | 1578 | 25f (0.83s) |
| ⑨ → ⑩ | 1642 | 1682 | 40f (1.33s) |

## BGM

`public/audio/bgm/house-vibez.mp3` — "House Vibez" by Lily J, Mixkit Stock
Music Free License (see `public/audio/ATTRIBUTION.md`).

- Starts at frame 9 with a 25f fade-in, 0.32 gain, ducks to 0.14 under every VO
  line (8f ramps), fades out over the last 36f (1873 → 1909).
- Beat grid (autocorrelation on onset envelope, no beat-synced editing):
  **122.4 BPM → beats at 10.8f + k×14.7f** from film start.
- Cuts are voice-led, not beat-snapped; the voice carries the cut.
- An SFX-only variant (`out/webrivo-short-sfxonly.mp4`, `--props='{"bgm":false}'`)
  is provided for BGM on/off comparison.

## SFX (all Freesound CC0 — credits in `public/audio/sfx/FREESOUND-CREDITS.md`)

Cues are declared against `BEATS` exported by each shot file in
`src/AudioTrack.tsx` (shot-local → absolute via `timeline.tsx`). No whoosh;
cuts are carried by voice and paper/click transients. Highlights:
- ① map draw ticks, hook thud, camera-move page turns and hits.
- ② typing clicks, submit switch, result thuds, slot slap, pen trace, NOT FOUND ping.
- ③ three card slaps, riser under the build-up, panel slam + ping, page-turn scroll-away.
- ④ docket thud and brief/build/ship switch hits.
- ⑤ page-in thud, call tap, booking sheet turn/taps/confirm/ping, payment sheet turn/press/ping.
- ⑥ dashboard window thud, stat/row ticks, paid ping.
- ⑦ cover-flow slaps, per-price whip + ping, Premium note switch.
- ⑧ inclusion lifts/ticks and settle slaps.
- ⑨ estimator bill/toggle/receipt thuds, SAVE 10% slap + ping.
- ⑩ badge thud, three plan slaps, wordmark ping, sign/page turn, contact click.

## Loudness & sync

Rendered and verified on 2026-11-19 (`scripts/verify-av.py`, −35 dB gate,
cross-correlation of each VO wav against the mix):

| file | frames | duration | mean | max | worst VO lag |
|------|-------:|---------:|-----:|----:|-------------:|
| `out/webrivo-short.mp4` | 1918 | 63.979s | −22.6 dB | −2.5 dB | +1.0f |
| `out/webrivo-short-sfxonly.mp4` | 1918 | 63.979s | −23.6 dB | −3.0 dB | +1.0f |

All 19 lines land at +1.0f (corr 0.795–0.962). No line delayed by reverb tails
or BGM; the duck (0.32 → 0.14, 8f ramps) keeps the voice clear.
