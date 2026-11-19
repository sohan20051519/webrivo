# webrivo-short — explainer film spec

## Goal
A 1080×1920, 30fps, ~64s short-form film that explains WebRivo as a studio that
gives main-street businesses a page that gets found, takes bookings and takes
payments — for a monthly fee with no setup cost. Problem-first, English VO.

Autonomous run, no check-ins. 2026-11-19.

## Inputs (source of truth)
- `components/TapeLanding.jsx`, `Calculator.jsx`, `Pricing.jsx`, `Services.jsx`
- Facts: ₹599 / ₹1,199 (Best value) / ₹2,199 per month; every plan includes
  hosting, maintenance, domain; estimator SAVE 10% (Business ₹12,948/yr);
  Business = local SEO, GBP, WhatsApp & call; Premium = booking, payment gateway,
  admin + analytics dashboards; no setup fee, site built for you.
  Contact: support@webrivo.in · webrivo.in.
- Look: off `#F4F5EF`, sage `#DDE3D5`, muted `#899982`, forest `#18352B`,
  white, ink `#202522`; Anton / Bricolage Grotesque / Caveat; tape + grain.
- No "live in 3 days" / delivery-time claim anywhere. No WebRivo branding
  before the outro. No page screenshots — DOM UI components only.

## Phase 1 — Audio
- VO: 19 lines, local Kokoro-82M (`af_heart`, `scripts/tts.mjs` +
  `scripts/vo-script.json`) with broadcast chain to `public/audio/vo/*.wav`.
- BGM: `house-vibez.mp3` (Mixkit), ducks 0.32→0.14 under VO. SFX: Freesound CC0
  cues pinned to shot `BEATS` in `src/AudioTrack.tsx`.

## Phase 2 — Shot list & voice-over

| # | voice-over | on screen | shot |
|---|------------|-----------|------|
| ① | "Every great shop on this street has a story." / "The bakery on the corner. The tailor three doors down." | printed town map; camera pushes into the bakery, then the tailor | Shot01BrandOpen |
| ② | "Right now, someone nearby is looking for exactly what you sell." / "They open their phone, and you're not there." | search page; **NO WEBSITE — so this slot stays empty**, circled in pen and stamped NOT FOUND | Shot02Search |
| ③ | "So the sale goes to someone else." / "Every time." | OFF MAP / NO PROOF / NO SLOTS dealt, then the dark **BUY FROM SOMEONE ELSE.** panel | Shot03Turn |
| ④ | "So we keep it simple. Brief, build, ship." | work-order docket 01 BRIEF / 02 BUILD / 03 SHIP | Shot04Process |
| ⑤ | "What you get is a landing page." / "Your photos, your services, and one tap to call." / "A booking system, so they pick a time instead of calling." / "A payment gateway, so they pay before they arrive." | one phone: landing page (hero, services, hours+map, gallery, Call/WhatsApp) → booking (date, time, Confirm → booked) → payment (order, Pay ₹640 → paid) | Shot05Product |
| ⑥ | "And a dashboard, so you see every booking, and every rupee." | owner dashboard: bookings, revenue, visits, rating, week chart, today's bookings | Shot06Dashboard |
| ⑦ | "Three plans. Five ninety nine to twenty one ninety nine a month." / "Bookings, payments and dashboards come with Premium." | real `.ht-prod` cover-flow, ₹599 → ₹1,199 → ₹2,199 | Shot07Plans |
| ⑧ | "Every plan includes hosting, maintenance, and your domain." | inclusion cards lifting off the desk | Shot08Inclusions |
| ⑨ | "Pay yearly, and you save ten percent." | 3D estimator: bill → yearly toggle → SAVE 10% receipt | Shot09Estimator |
| ⑩ | "Webrivo." / "For the businesses that make a town feel like home." / "Let's get you found." | badge, wordmark, sign-off, contact | Shot10Outro |

Transitions: hard cuts with a soft paper whip, no whoosh SFX; every cut lands
0.5–1.1s after the previous spoken syllable (no music-only scenes).

## Phase 3 — Frame timeline (30fps, 1918f)

| scene | shot id | from–to | frames |
|-------|---------|---------|-------:|
| ① the town (hook + walk) | Shot01BrandOpen | 0–209 | 210 |
| ② the search (no website) | Shot02Search | 210–419 | 210 |
| ③ the turn (sale goes elsewhere) | Shot03Turn | 420–559 | 140 |
| ④ the process (brief/build/ship) | Shot04Process | 560–663 | 104 |
| ⑤ the product (page + booking + payment) | Shot05Product | 664–1083 | 420 |
| ⑥ the dashboard (bookings & revenue) | Shot06Dashboard | 1084–1205 | 122 |
| ⑦ the three plans | Shot07Plans | 1206–1455 | 250 |
| ⑧ in every plan (inclusions) | Shot08Inclusions | 1456–1577 | 122 |
| ⑨ the estimator (yearly saves 10%) | Shot09Estimator | 1578–1681 | 104 |
| ⑩ the sign-off | Shot10Outro | 1682–1917 | 236 |

Total **1918f ≈ 63.9s**, 1080×1920. The table lives in `src/timeline.tsx` and is
shared by picture and sound.

## Phase 4 — Assets
- Plan card: `src/ui/PlanCard.tsx`, a 1:1 port of the site's `.ht-prod`.
- VO: `public/audio/vo/s*.wav` (Kokoro-82M af_heart), spec in
  `scripts/vo-script.json`.
- SFX: Freesound CC0 (`public/audio/sfx/`), BGM "House Vibez" (Mixkit).

## Phase 5–7 — Build, render, verify
- Components: `src/shots/*.tsx`, `src/timeline.tsx`, `src/AudioTrack.tsx`,
  `src/theme.tsx`, `src/ui/PlanCard.tsx`.
- Render: `npx remotion render src/index.ts WebRivoShort out/webrivo-short.mp4`
  and `--props='{"bgm":false}' -o out/webrivo-short-sfxonly.mp4`.
- Verify: `scripts/verify-av.py` (19 lines, worst |lag| 1.0f, corr 0.795–0.962),
  loudness −22.6/−2.5 dB (full) and −23.6/−3.0 dB (sfx-only), 1918 frames.

See `STORY.md`, `AUDIO-TIMELINE.md`, `FINAL-REVIEW.md` for the narrative,
pacing/VO table, and measured delivery.
