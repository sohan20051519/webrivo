# Final review — webrivo-short (independent pass, autonomous mode)

Film: `out/webrivo-short.mp4` (SFX+BGM) / `out/webrivo-short-sfxonly.mp4`.
1080×1920 · 30fps · 1560f. Mode: autonomous free creation.

## P — product

- P1 ✓ positioning clear: small-studio websites for local businesses, live in 3 days.
- P2 ✓ plan ladder (₹599/₹1,199/₹2,199) + estimator are the two longest informational beats.
- P3 ✓ no invented claims; every price/offer line traced to TapeLanding.jsx / Calculator.jsx
  (₹12,948/yr = 1199×12×0.9 site math; SAVE 10%; webrivo.official@gmail.com, +91 9113253753).

## F — completeness

- F1 ✓ plans → S7 (3 cards), inclusions → S8 (hosting/maintenance/domain), estimator → S9
  (toggle, ₹1,199/mo → ₹12,948/yr, SAVE 10%), brand/story → S1–S4, process → S5 (BRIEF→BUILD→SHIP).
- F2 ✓ no repeated taglines; each shot carries new information.
- F3 ✓ real page captures used for hero/plans; states readable at rest.

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
- B4 ✓ no unapproved deletions (invented "SIGNATURE PLAN" stamp removed as non-site copy).

## D — data safety

- D1–D5 ✓ real site captures only, public prices/contact, no keys/personal/clients.

## A — audio

- A1 ✓ house-vibez BGM at 0.32 gain, fades 25f/40f, SFX stay audible on top.
- A2 ✓ 40 cues pinned to action frames (AUDIO-TIMELINE.md); render-verified onsets within ±2.5f.
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

## Voice-over (added)

- Kokoro-82M (local model `~/.cache/explainroo/models/.../Kokoro-82M-v1.0-ONNX`,
  runtime `kokoro-js`), voice `am_michael`, 8 lines, 3.05–5.92s each.
- All 8 within their shot windows; BGM ducked to 0.14 gain under each line.
- VO peak −3.4 to −5.7 dBFS → mixed at 0.95 (no clipping, track peak −3.8 dB).
- S2 hero reframed (full-bleed headline, no mid-word clip) and S4 pile repositioned
  to bottom-left over the pile shadow after review of the opening sequence.

- Q ✓ text sharp at rest; deterministic renders (no Date.now/Math.random); grain deterministic;
  fonts loaded via module-scope FontFace + delayRender with 30s race fallback
  (the earlier full-render timeout was fixed this way); collage seal rebuilt in-theme after the
  dirty seal cutout was found; plan-1 capture's baked badge cropped.
