# WebRivo Explainer Short — Design Spec (video-shotcraft, mode: autonomous)

## Phase 0 — Product brief
- Product: WebRivo — a web agency that designs, builds, hosts and maintains websites for local small businesses ("Main Street").
- Audience: local business owners scrolling social feeds → **vertical 1080×1920, 30fps** ("scroll-stopping"), ~50s.
- Voice: no narration; kinetic type + SFX + BGM carry the film.
- Facts (site-derived, no invention): plans ₹599/mo Basic · ₹1,199/mo Business (Best value) · ₹2,199/mo Premium; every plan includes hosting, maintenance, domain; estimator toggle Monthly/Yearly "SAVE 10%"; contact webrivo.official@gmail.com / +91 9113253753.
- Positioning line: GET FOUND. GET CHOSEN. Process: BRIEF → BUILD → SHIP.

## Phase 1 — Visual direction (chosen: "print shop亲和活泼")
Tokens grown from TapeLanding (no new palette):
- `off #F4F5EF` paper · `sage #DDE3D5` tape · `muted #899982` ink shadow · `forest #18352B` deep bg · `white #FFFFFF` · `ink #202522` text.
- Type: Anton (condensed display, uppercase) / Bricolage Grotesque (body, 75% stretch headings) / Caveat (hand notes).
- Material: matte paper, masking-tape strips, daisy stickers, riso grain (--ht-noise), subtle 2.5D camera.
- Motion personality (energy: medium-high / tone: playful-print):
  - in/out: `cubic-bezier(0.25,0.46,0.45,0.94)`, overshoot scale ~1.04
  - slam/impact: power4.in, 4–6f impact frame
  - hold floor: every landing ≥24f rest; sign-off hold ≥60f.

## Phase 2 — Feature → shot mapping
| # | Feature (site) | Shot card | Style |
|---|----------------|-----------|-------|
| ① | Brand mark | brand-ink-open (tape-press adaptation) | opening |
| ② | Hero "GET FOUND. GET CHOSEN." | spotlight-hero-card | opening/hero |
| ③ | Breather | paper-title-card "MADE FOR MAIN STREET" | typography |
| ④ | Work collage | deck-deal-flyin (dealt paper cards) | ui-entrance |
| ⑤ | Process BRIEF·BUILD·SHIP | vertical-word-roll-blur-cycle (tape roller bg) | typography |
| ⑥ | Breather | paper-title-card "PICK YOUR PLAN" | typography |
| ⑦ | Plans ₹599/₹1,199/₹2,199 | product-card-progressive-assemble | ui-entrance |
| ⑧ | Hosting·Maintenance·Domain in every plan | list-stack-press | ui-entrance |
| ⑨ | Estimator SAVE 10% toggle | pill-slot-cycle + DigitRoll (2,199→1,979 math check) | typography/data |
| ⑩ | Sign-off | outro-group-photo-launch → logo-shrink-wordmark-lockup | outro |

Transitions: print-texture / tear-streak between paper scenes, whip cuts on beats.

## Phase 3 — Frame timeline (30fps)
| Shot | frames | dur |
|------|--------|-----|
| ① brand-open | 0–139 | 140 |
| ② hero | 140–379 | 240 |
| ③ title "MAIN STREET" | 380–433 | 54 |
| ④ collage deal | 434–603 | 170 |
| ⑤ BRIEF BUILD SHIP | 604–773 | 170 |
| ⑥ title "PICK YOUR PLAN" | 774–827 | 54 |
| ⑦ plan cards | 828–1007 | 180 |
| ⑧ inclusions stack | 1008–1157 | 150 |
| ⑨ estimator | 1158–1337 | 180 |
| ⑩ outro | 1338–1557 | 220 |
Total 1558f ≈ 51.9s. Format: 1080×1920.

## Phase 4 — Capture
Real TapeLanding page via headless Chrome @2x: full-page hero, shop grid, estimator, footer; element cutouts (plan cards ×3, hero copy, collage cards, badge SVG) + layout.json.

## Phase 5–7
Per-shot Remotion comps, `npx remotion still` QA per shot, full render, then Freesound SFX + BGM (both BGM / no-BGM deliverables), independent final review.
