# Final review — webrivo-short (independent pass, autonomous mode)

Film: `out/webrivo-short.mp4` (VO+BGM+SFX) / `out/webrivo-short-sfxonly.mp4`
(same picture, `--props='{"bgm":false}'`).
1080×1920 · 30fps · **1156f (38.5s)**. Mode: autonomous free creation.

## P — product

- P1 ✓ positioning clear: a small studio building websites for main-street
  businesses, told as "someone is searching for your shop right now".
- P2 ✓ plan ladder (₹599 / ₹1,199 / ₹2,199) and the estimator are the two
  longest informational beats (168f each).
- P3 ✓ no invented claims; every price/offer line traced to
  `components/TapeLanding.jsx` / `Calculator.jsx` (₹12,948/yr = 1199×12×0.9,
  SAVE 10%, webrivo.official@gmail.com, +91 9113253753, webrivo.site).
- P4 ✓ no delivery-time claim anywhere — the site's "live in 3 days" seal and
  mask stamp are not used on screen or in the voice-over.

## F — completeness

- F1 ✓ plans → S7 (the site's three real `.ht-prod` cards), inclusions → S8
  (hosting / maintenance / domain), estimator → S9 (toggle, ₹1,199/mo →
  ₹12,948/yr, SAVE 10%), brand/story → S1–S4, process → S5 (BRIEF→BUILD→SHIP).
- F2 ✓ no repeated taglines; each shot carries new information.
- F3 ✓ every frame is a DOM UI component (no page screenshots); states readable
  at rest.

## V — visual direction

- V1 ✓ site tokens only (off #F4F5EF, sage, muted, forest #18352B, ink);
  Anton / Bricolage Grotesque / Caveat; tape + grain material throughout.
- V2 ✓ hard-accelerated deals, press-easing stamps, holds ≥10f after batches.
- V3 ✓ no drift to Ink Press/neon; paper-studio look consistent.
- V4 ✓ no forbidden styles.

## B — storyboard

- B1 ✓ order/durations match SPEC.md (8 shots, 1156f).
- B2 ✓ actions/SFX align with AUDIO-TIMELINE.md.
- B3 ✓ WEBRIVO wordmark locks up on the spoken "Webrivo." (letters 8–30 on VO
  9.6–32.7); end card static 44f (1.5s).
- B5 ✓ story arc: hook (S1) → the search (S2) → what loses the customer (S4) →
  the fix (S5) → offer (S7) → what's included (S8) → no surprises (S9) →
  sign-off (S10). No music-only scenes, no title cards.
- B4 ✓ no unapproved deletions (invented "SIGNATURE PLAN" stamp removed as
  non-site copy).

## D — data safety

- D1–D5 ✓ public prices/contact only, no keys/personal/clients; the
  illustrative search/map UI uses generic labels ("Another bakery",
  "Your shop"), not real client data.

## A — audio

- A1 ✓ house-vibez BGM at 0.32 gain, 25f fade-in, fade-out 1111→1147, ducked to
  0.14 under each VO line.
- A2 ✓ 53 cues pinned to action frames (AUDIO-TIMELINE.md); render-verified VO
  onsets at +1.2–1.5f (a uniform encoder delay — no per-line drift).
- A3 ✓ beat grid 122.4 BPM measured from source; cuts 96/248/424/524/692/980
  within ±3f except 692 (+5) and 812 (−7.3), which follow the VO sentence
  starts rather than the grid.
- A4 ✓ riser→cards arc: riser starts 496 under "SHIP", peaks 564 exactly as the
  three plan cards stand up (546/552/558).
- A5 ✓ no sample outlives its action by more than design (riser 68f pre-land is
  the planned build).
- A6 ✓ page turn (−31.8 dBFS) given 1.4 / 0.9 gain, verified audible in render.
- A7 ✓ foley/space realism: paper slaps, switch clicks, low thud; glass ping only
  for highlight moments; no notification bleeps.
- A8 ✓ both variants from one timeline, frame-identical picture.
- A9 ✓ source peak lag compensated per file (measured 10ms-energy peaks in
  manifest); output offset measured post-render (+1.2–1.5f on all 8 lines, i.e.
  AAC encoder delay, not drift).
- A10 ✓ 8/8 SFX from Freesound, all CC0, manifest + credits shipped.

## Voice-over

- Kokoro-82M (local model `~/.cache/explainroo/models/.../Kokoro-82M-v1.0-ONNX`,
  runtime `kokoro-js`), voice `af_heart` — the most expressive of the available
  voices by measured pitch variance.
- Broadcast chain per line: high-pass 85 Hz, −1.5 dB @260 Hz, +1.8 dB presence
  @3.1 kHz, 3:1 comp, loudnorm I=−19 TP=−3 → peak −3.0…−4.1 dBFS, mixed at 0.95.
- 8 lines, 3.0–5.4 s, each starting `shot.from + 2` so the wav's 0.30s lead
  silence lands the first syllable ~11f after the cut.
- Sync by measurement: sentence boundaries detected in each VO file, then the
  card/word/price beats pinned to them (S4 cards 34/74/122/140 on
  "slow page / pin / form / they leave"; S7 prices 46/78/88 on "five … to …
  twenty one ninety nine"; S9 flip 104 on "save ten percent yearly").
- Pacing: no line is followed by more than 1.27s of silence; ≈78% of the film
  carries voice.

## Q — technical

- Q1 ✓ text sharp at rest; deterministic renders (no Date.now / Math.random);
  grain deterministic (fixed SVG turbulence).
- Q2 ✓ fonts loaded via module-scope FontFace + delayRender, 30 s race fallback.
- Q3 ✓ no frame-edge clipping: measured ink bbox on every rebuilt shot (plan row
  24–1056 with 24px side margins; estimator panel 88–996; outro contact 120–960).
- Q4 ✓ layout is structured on a 1080-wide grid; the hero search card and the
  plan cards are flex columns, so rows/notes reflow instead of overlapping.

## Render verification (measured, not assumed)

`scripts/verify-av.py` (stdlib only) decodes each deliverable and cross-
correlates every VO line against the mix:

| file | frames | duration | mean vol | max vol | worst VO lag |
|------|-------:|---------:|---------:|--------:|-------------:|
| `out/webrivo-short.mp4` | 1156 | 38.592s | −21.9 dB | −3.1 dB | +1.5f |
| `out/webrivo-short-sfxonly.mp4` | 1156 | 38.592s | −22.7 dB | −3.2 dB | +1.5f |

Picture is frame-identical between the two variants; the only difference is
`bgm:false`. Stills checked with PIL ink-bbox / edge-clipping probes at
f40, 88, 120, 200, 290, 330, 392, 420, 460–510, 540–660, 700, 760, 830, 920,
950, 1000, 1030, 1120, 1150.
