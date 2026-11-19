# WebRivo Explainer Short — Design Spec (video-shotcraft, mode: autonomous)

## Phase 0 — Product brief

- Product: WebRivo — a small studio that designs, builds, hosts and maintains
  websites for local businesses ("main street").
- Audience: local business owners scrolling a vertical feed → **1080×1920,
  30fps**, 50.2s.
- Narration: **yes** — fifteen spoken lines across the eight scenes (Kokoro-82M
  `af_heart`, local model, `kokoro-js`; full table in `AUDIO-TIMELINE.md`).
  SFX + BGM support the voice; they never carry information alone.
- Facts (site-derived, nothing invented): plans ₹599/mo Basic · ₹1,199/mo
  Business (Best value) · ₹2,199/mo Premium; every plan includes hosting,
  maintenance and a domain; estimator toggle Monthly/Yearly "SAVE 10%"
  (yearly = monthly × 12 × 0.9 → Business ₹12,948/yr); contact
  webrivo.official@gmail.com / +91 9113253753 / webrivo.site.
- Positioning: GET FOUND. GET CHOSEN. Process: BRIEF → BUILD → SHIP.
- **No delivery-time claim anywhere** (the site's "live in 3 days" seal and
  stamp are deliberately not used, on screen or in the voice-over).

## Phase 1 — Visual direction ("print shop, playful")

Tokens grown from `components/TapeLanding.jsx` — no new palette:

- `off #F4F5EF` paper · `sage #DDE3D5` tape · `muted #899982` ink shadow ·
  `forest #18352B` deep bg · `white #FFFFFF` · `ink #202522` text.
- Type: Anton (condensed display, uppercase) / Bricolage Grotesque (body, 75%
  stretch headings) / Caveat (hand notes).
- Material: matte paper, masking/washi tape strips, daisy stickers, riso grain
  (`--ht-noise`), subtle 2.5D camera.
- Motion personality (medium-high energy, playful print):
  - in/out `cubic-bezier(0.25,0.46,0.45,0.94)`, overshoot scale ~1.04
  - slam/impact power4.in, 4–6f impact frame
  - every landing holds ≥10f; the sign-off holds 58f.
- Everything on screen is a **DOM UI component**. No page screenshots, no
  bitmap captures.

## Phase 2 — Story → shot mapping

The film opens on the **shops, not the brand** — no WebRivo mark or wordmark
before the outro. The seven shot effects in the local video-shotcraft library
are all used, each rebuilt in the site's palette:

| # | Story beat | Shot card | Effect |
|---|------------|-----------|--------|
| ① | "Every great shop on this street has a story." / "The bakery on the corner. The tailor three doors down." | a printed town map fills the frame — blocks of buildings, a white main street with a dashed centre line, trees on the verges, a north arrow and legend; shop tags surface along it; then the camera pushes 2.3× into the bakery, then the tailor, and a hand caption names each | `dataviz-landscape-open` |
| ② | "Right now, someone nearby is looking for exactly what you sell." / "They open their phone, and you're not there." | a real search page: forest app header, white pill typing "bakery near me", a live suggestion list, then submit → tabs, a local-pack map with three pins, three organic results (stars, distance, snippet) — and the empty slot where your shop should be: “NO WEBSITE — so this slot stays empty”, circled in pen and stamped NOT FOUND | `glass-pill-dictation-typing` → `draw-svg-trace` |
| ④ | "A slow page. A pin three streets off. A form nobody answers." / "So they scroll on, and buy from someone else." | three near-full-width cards dealt from a deck onto the studio board (slow load bar, pin vs. your shop, unanswered enquiries), then one dark panel slams over the whole board — "BUY FROM / SOMEONE / ELSE." with the two shops they pick instead | `deck-deal-flyin` |
| ⑤ | "So we keep it simple. Brief, build, ship." | one paper work-order docket pinned to the board: BRIEF / BUILD / SHIP printed on it from the cut, each row lighting up on its word — number, sage bar, a drawn sketch and a DONE stamp | typography |
| ⑦ | "Three plans. Five ninety nine to twenty one ninety nine a month." / "Everything handled." | a cover-flow of the site's three real `.ht-prod` cards on a sage band — the front card is 700×880 (~65% of the frame width), the others fall back at 30° and 470px spacing; it whips 599 → 1,199 → 2,199 on the spoken numbers, with a price readout under it | `carousel-3d` |
| ⑧ | "Hosting, maintenance, your domain, in every plan." | three 930×300 inclusion cards with drawn icons lift off a tilted desk (contact shadow stays behind and drifts), the last one stays up | `element-body-moves` |
| ⑨ | "No surprises. The exact price up front." / "Pay yearly, and you save ten percent." | a 3D room: bill → toggle → yearly receipt, 944×690 each, with a station bar at the top and a perspective floor grid; the camera is the inverse of the station it looks at, so the world turns between them | `basic-3d-scene` |
| ⑩ | "Webrivo. For the businesses that make a town feel like home." | plan cards fly into a group photo, badge drops, WEBRIVO locks up, sign-off + real contact details | outro |

Transitions: hard cuts with a soft paper whip, no whoosh SFX; every cut lands
0.55–0.80s after the previous spoken word (no music-only scenes, no title
cards).

## Phase 3 — Frame timeline (30fps, 1506f)

| Shot | id | frames | dur |
|------|----|--------|-----|
| ① the town map | Shot01BrandOpen | 0–209 | 210 |
| ② the search (Google-style) | Shot02Hero | 210–419 | 210 |
| ④ the deals / why they leave | Shot04Collage | 420–657 | 238 |
| ⑤ the work order | Shot05Process | 658–761 | 104 |
| ⑦ plan carousel | Shot07Plans | 762–961 | 200 |
| ⑧ inclusions stack | Shot08Inclusions | 962–1073 | 112 |
| ⑨ estimator room | Shot09Estimator | 1074–1269 | 196 |
| ⑩ outro | Shot10Outro | 1270–1505 | 236 |

Total **1506f ≈ 50.2s**, 1080×1920. The table lives in `src/timeline.tsx` and is
shared by picture and sound.

Every shot is composed against the full 1080×1920 frame — cards run 930–968 px
wide, the map fills the paper, the search page runs edge to edge under a forest
app header, and each shot keeps a slow push or float through its hold so no
frame is frozen.

## Phase 4 — Assets

- Plan card: `src/ui/PlanCard.tsx`, a 1:1 port of the site's `.ht-prod`
  (washi tapes at 18%/7% and 84%/7%, tape roll face, badge, name, line, price,
  `Send request` + `Customize`, sage Business gradient, forest Premium).
- VO: `public/audio/vo/s*.wav`, regenerated by `scripts/tts.mjs`
  (+ `scripts/vo-script.json`) — local Kokoro-82M only.
- SFX: Freesound CC0 (manifest + credits in `public/audio/sfx/`), BGM
  "House Vibez" (Mixkit, `public/audio/ATTRIBUTION.md`).

## Phase 5–7

Per-shot Remotion comps registered from the timeline, `npx remotion still` QA
per shot (PIL ink-bbox / edge-clipping checks), full render, then the SFX pin
table in `src/AudioTrack.tsx` (both BGM / no-BGM deliverables) and the
independent review in `FINAL-REVIEW.md`.
