# Final review — webrivo-short (independent pass, autonomous mode)

Film: `out/webrivo-short.mp4` (VO+BGM+SFX) / `out/webrivo-short-sfxonly.mp4`
(same picture, `--props='{"bgm":false}'`).
1080×1920 · 30fps · **1506f (50.2s)**, fifteen spoken lines. Mode: autonomous
free creation.

## P — product

- P1 ✓ positioning clear: a small studio building websites for main-street
  businesses, told as "someone is searching for your shop right now".
- P2 ✓ plan ladder (₹599 / ₹1,199 / ₹2,199) and the estimator are the two
  longest informational beats (200f / 196f), and both sit in the second half so
  the film sells after it has earned attention.
- P3 ✓ no invented claims; every price/offer line traced to
  `components/TapeLanding.jsx` / `Calculator.jsx` (₹12,948/yr = 1199×12×0.9,
  SAVE 10%, webrivo.official@gmail.com, +91 9113253753, webrivo.site).
- P4 ✓ no delivery-time claim anywhere — the site's "live in 3 days" seal and
  mask stamp are not used on screen or in the voice-over.

## F — completeness

- F1 ✓ plans → ⑦ (the site's three real `.ht-prod` cards in a cover-flow),
  inclusions → ⑧ (hosting / maintenance / domain), estimator → ⑨ (toggle,
  ₹1,199/mo → ₹12,948/yr, SAVE 10%), brand/story → ①–④, process → ⑤
  (BRIEF→BUILD→SHIP).
- F2 ✓ no repeated taglines; each shot carries new information.
- F3 ✓ every frame is a DOM UI component (no page screenshots); states readable
  at rest.

## V — visual direction

- V1 ✓ site tokens only (off #F4F5EF, sage, muted, forest #18352B, ink);
  Anton / Bricolage Grotesque / Caveat; tape + grain material throughout.
- V2 ✓ hard-accelerated deals, press-easing stamps, holds ≥10f after batches.
- V3 ✓ no drift to Ink Press/neon; paper-studio look consistent.
- V4 ✓ no forbidden styles.
- V5 ✓ all seven library effects are used and each was rebuilt in the site's
  palette rather than shipped as the demo's dark/lime look:
  `dataviz-landscape-open` (① the town map), `glass-pill-dictation-typing` +
  `draw-svg-trace` (② the search page), `deck-deal-flyin` (④ the dealt cards),
  `carousel-3d` (⑦ the cover-flow, real `.ht-prod` cards), `element-body-moves`
  (⑧ the lifted inclusion cards), `basic-3d-scene` (⑨ the estimator room).

## B — storyboard

- B1 ✓ order/durations match SPEC.md (8 shots, 1506f).
- B2 ✓ actions/SFX align with AUDIO-TIMELINE.md.
- B3 ✓ the film is de-branded until the last shot: ① opens on the shops
  (BAKERY / TAILOR / FLORIST / SALON / CAFE on a printed town map) and the
  camera pushes into the bakery and then the tailor while the voice names them;
  no mark or wordmark anywhere before ⑩. WEBRIVO locks up on the spoken
  "Webrivo." (letters land 6–28f, VO 1272–1302), three mini plan prints drop
  under it, then a slow 4.5% push keeps the 47f end hold alive instead of
  freezing.
- B5 ✓ story arc: hook (①) → the search and the empty slot (②) → what loses the
  customer (④) → the fix (⑤) → offer (⑦) → what's included (⑧) → no surprises (⑨) →
  sign-off (⑩). No music-only scenes, no title cards.
- B4 ✓ no unapproved deletions (invented "SIGNATURE PLAN" stamp removed as
  non-site copy).

## D — data safety

- D1–D5 ✓ public prices/contact only, no keys/personal/clients; the
  illustrative search/map UI is a generic page ("bakery near me", three
  anonymised listings, an empty ad slot), not a real Google screenshot and not
  real client data.

## A — audio

- A1 ✓ house-vibez BGM at 0.32 gain, 25f fade-in, fade-out 1461→1497, ducked to
  0.14 under each VO line.
- A2 ✓ 76 cues pinned to `BEATS` exported by the shot files (AUDIO-TIMELINE.md);
  render-verified VO onsets at +1.0f on all fifteen lines (a uniform encoder
  delay — no drift). No whoosh in the mix — cuts are carried by voice and
  paper/click transients.
- A3 ✓ beat grid 122.4 BPM measured from source; cut-minus-nearest-beat is
  −6.6 / −2.4 / +0.4 / +1.5 / −4.3 / +4.8 / −5.0f at 210/420/658/762/962/1074/
  1270 — no cut is beat-synced on purpose, the voice carries the cut.
- A4 ✓ riser→carousel arc: the riser starts 692 under "SHIP" (⑤ 34) and peaks
  exactly on the first frame of ⑦ (762) as the cover-flow assembles; the three
  cards whip 599 → 1,199 → 2,199 at 812/834/854 on the spoken numbers.
- A5 ✓ no sample outlives its action by more than design (riser 68f pre-land is
  the planned build).
- A6 ✓ page turn (−31.8 dBFS) given 1.4 / 0.9 gain, verified audible in render.
- A7 ✓ foley/space realism: paper slaps, switch clicks, low thud; glass ping only
  for highlight moments; no notification bleeps.
- A8 ✓ both variants from one timeline, frame-identical picture.
- A9 ✓ source peak lag compensated per file (measured 10ms-energy peaks in
  manifest); output offset measured post-render (+1.0f on all 15 lines, i.e. AAC
  encoder delay, not drift).
- A10 ✓ 8/8 SFX from Freesound, all CC0, manifest + credits shipped.

## Voice-over

- Kokoro-82M (local model `~/.cache/explainroo/models/.../Kokoro-82M-v1.0-ONNX`,
  runtime `kokoro-js`), voice `af_heart` — the most expressive of the available
  voices by measured pitch variance.
- Broadcast chain per line: high-pass 85 Hz, −1.5 dB @260 Hz, +1.8 dB presence
  @3.1 kHz, 3:1 comp, loudnorm I=−19 TP=−3 → peak −3.0…−4.1 dBFS, mixed at 0.95.
- fifteen lines, 0.6–3.9s of speech each, placed by the timeline's `vo` table;
  the wavs keep ~0.30s of lead silence, so the first syllable lands ~11f after
  the cut.
- Sync by measurement: speech onsets and ends detected in each of the fifteen
  VO files (10ms energy, −35 dB gate), then every action beat pinned to them
  (④ cards 16/52/94 on "slow page / pin / form", turn panel 190 on "someone
  else"; ⑦ prices 50/72/92 on "five … to … twenty one ninety nine"; ⑨ flip 116
  on "yearly", SAVE 10% 136, receipt 162).
- Pacing: no cut lands more than 0.77s after the last syllable; ≈70% of the
  film carries voice.

## Q — technical

- Q1 ✓ text sharp at rest; deterministic renders (no Date.now / Math.random);
  grain deterministic (fixed SVG turbulence).
- Q2 ✓ fonts loaded via module-scope FontFace + delayRender, 30 s race fallback.
- Q3 ✓ no frame-edge clipping on any element that must stay whole: measured
  ink bbox on every rebuilt shot (σ-bands per row/column on the rendered PNGs)
  — turn panel 56–1024 × 196–1556 with 27px of bottom clearance under the
  rotated stamp, work-order sheet 70–1010 × 186–1738, estimator 55–1024,
  inclusions cards 75–1005 with 120px of lift headroom, outro lockup 419–827
  with the contact card 1552–1780. The ⑦ cover-flow is the only element allowed
  past the edge, and it does so as a stack (deliberate).
- Q4 ✓ layout is structured on a 1080-wide grid; the search page, plan cards and
  inclusion cards are flex columns, so rows/notes reflow instead of overlapping.

## Render verification (measured, not assumed)

`scripts/verify-av.py` (stdlib only) decodes each deliverable and cross-
correlates every VO line against the mix:

| file | frames | duration | mean vol | max vol | worst VO lag |
|------|-------:|---------:|---------:|--------:|-------------:|
| `out/webrivo-short.mp4` | 1506 | 50.261s | −22.3 dB | −4.1 dB | +1.0f |
| `out/webrivo-short-sfxonly.mp4` | 1506 | 50.261s | −23.3 dB | −3.6 dB | +1.0f |

The two variants carry the same picture: the only difference is `bgm:false`,
and a frame-level comparison at 300 and 1000 shows mean |Δ| of 0.16–0.31/255
(x264 thread noise, no editorial difference). Stills checked with PIL ink-bbox /
edge-clipping probes (this pass had no image input, so every shot was verified
numerically: per-band palette classification, ink bounding boxes, card/readout
clearance, per-row/column ink bands). Frames sampled every 15 across the whole
film for blank-frame and jump detection; the rebuilt ranges were sampled every
5f (`scripts/qa-ranges.py`), which is how ⑤'s old fade-from-forest opening was
caught — the docket is now printed on frame 0 and only settles, so no shot opens
on a bare frame. ⑤ also carries a 2.8% dolly across its 104f.
