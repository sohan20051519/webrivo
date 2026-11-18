# Final review — webrivo-short (independent pass, autonomous mode)

Film: `out/webrivo-short.mp4` (SFX+BGM) / `out/webrivo-short-sfxonly.mp4`.
1080×1920 · 30fps · 1560f. Mode: autonomous free creation.

## P — product

- P1 ✓ positioning clear: a small studio building websites for main-street businesses.
- P2 ✓ plan ladder (₹599/₹1,199/₹2,199) + estimator are the two longest informational beats.
- P3 ✓ no invented claims; every price/offer line traced to TapeLanding.jsx / Calculator.jsx
  (₹12,948/yr = 1199×12×0.9 site math; SAVE 10%; webrivo.official@gmail.com, +91 9113253753).

## F — completeness

- F1 ✓ plans → S7 (3 cards), inclusions → S8 (hosting/maintenance/domain), estimator → S9
  (toggle, ₹1,199/mo → ₹12,948/yr, SAVE 10%), brand/story → S1–S4, process → S5 (BRIEF→BUILD→SHIP).
- F2 ✓ no repeated taglines; each shot carries new information.
- F3 ✓ every frame is a DOM UI component (no page screenshots); states readable at rest.

## V — visual direction

- V1 ✓ site tokens only (off #F4F5EF, sage, muted, forest #18352B, ink); Anton/Bricolage/Caveat;
  tape + grain material throughout.
- V2 ✓ hard-accelerated deals, press-easing stamps, holds ≥0.5s after batches.
- V3 ✓ no drift to Ink Press/neon; paper-studio look consistent.
- V4 ✓ no forbidden styles.

## B — storyboard

- B1 ✓ order/durations match SPEC.md (10 shots, 1560f).
- B2 ✓ actions/captures/SFX align with AUDIO-TIMELINE.md.
- B3 ✓ WEBRIVO hold ≥1s (S1: badge f30 → exit f126 ≈ 3.2s); end card static ≥3.5s.
- B5 ✓ story arc: hook (S1) → the search (S2) → what loses the customer (S4) → the fix (S5)
  → offer (S7) → what's included (S8) → no surprises (S9) → sign-off (S10).
- B4 ✓ no unapproved deletions (invented "SIGNATURE PLAN" stamp removed as non-site copy).

## D — data safety

- D1–D5 ✓ public prices/contact only, no keys/personal/clients; the illustrative search/map
  UI uses generic labels ("Another bakery", "Your shop"), not real client data.

## A — audio

- A1 ✓ house-vibez BGM at 0.32 gain, fades 25f/40f, SFX stay audible on top.
- A2 ✓ 48 cues pinned to action frames (AUDIO-TIMELINE.md), 12 of them on the new
  S2 search beats; render-verified onsets within ±2.5f.
- A3 ✓ beat grid 122.4 BPM measured from source; cuts 380/435/775/1010/1160 within ±2.6f;
  605/1340 within ~6f (follow soft thud/whoosh, not beat events).
- A4 ✓ riser→plan1 impact→pill sparkle arc at 775→842→896.
- A5 ✓ no sample outlives its action by more than design (riser 90f is the planned 68f pre-land).
- A6 ✓ page turn (−31.8 dBFS) given 1.4/0.9 gain, verified audible in render (peak 0.43 at f1428).
- A7 ✓ foley/space realism: paper slaps, switch clicks, low thud; glass ping used only for
  highlight moments; no notification bleeps.
- A8 ✓ both variants from one timeline (`--props {"bgm":false}`), frame-identical picture.
- A9 ✓ source peak lag compensated per file (measured 10ms-energy peaks in manifest);
  output offset measured post-render (+1.3–2.0f, encoder delay scale) — no systematic drift.
- A10 ✓ 8/8 SFX from Freesound, all CC0, manifest + credits shipped; Remotion reads local files.

## Voice-over

- Kokoro-82M (local model `~/.cache/explainroo/models/.../Kokoro-82M-v1.0-ONNX`,
  runtime `kokoro-js`), voice `af_heart` — picked after measuring pitch variance
  across 5 available voices (sd 42.1 Hz, the most expressive of the set).
- Broadcast chain per line: high-pass 85 Hz, +1.8 dB presence @3.1 kHz, 3:1 comp,
  loudnorm I=-19 TP=-3 → peak −3.0…−4.1 dBFS, mixed at 0.95 (no clipping).
- 8 lines, 3.0–5.4 s, all inside their shot windows; BGM ducked to 0.14 under each.
- Sync by measurement: sentence boundaries detected in each VO file, then the
  card/word/price beats pinned to them (S4 cards 14/47/92/124 vs VO 10/47/92/122;
  S7 cards 12/62/112 vs "three plans / five ninety nine / twenty one ninety nine";
  S10 wordmark 24–45 on the spoken "Webrivo").
- Script is story-first and outcome-first: no delivery-time claim anywhere.

## Q — technical

- Q1 ✓ text sharp at rest; deterministic renders (no Date.now / Math.random);
  grain deterministic (fixed SVG turbulence).
- Q2 ✓ fonts loaded via module-scope FontFace + delayRender, 30 s race fallback.
- Q3 ✓ no frame-edge clipping: measured ink bbox on every rebuilt shot
  (hero card x 100–978; S4 board content inside the board; brand wordmark 782–1122).
- Q4 ✓ layout is structured on a 1080-wide grid with 80–120 px margins; the hero
  search card is a flex column, so its rows/notes reflow instead of overlapping.
