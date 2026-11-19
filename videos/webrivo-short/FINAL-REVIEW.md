# Final review — webrivo-short (story-continuity rebuild)

Film: `out/webrivo-short.mp4` (VO+BGM+SFX) / `out/webrivo-short-sfxonly.mp4`
(same picture, `--props='{"bgm":false}'`).
1080×1920 · 30fps · **1918f (63.9s)**, nineteen spoken lines. Mode: autonomous
rebuild to fix story continuity and explain the business (English, problem-first).

## Story

- **Continuity fixed:** ② states the shop has **no website** ("NO WEBSITE — so this slot stays empty"). ③ now shows the cost of having *no* page — OFF MAP / NO PROOF / NO SLOTS — not symptoms of a bad site, then the sale goes to someone else. The contradiction is gone.
- **Business explained on screen:** ④ brief/build/ship; ⑤ one phone tour of the actual product — a landing page (hero, photos, services, hours+map, gallery, Call/WhatsApp), a booking system (date/time → confirmed), and a payment gateway (order → Pay → paid). ⑥ the owner's dashboard (bookings, revenue, visits, every rupee). ⑦ plans and what Premium adds. ⑧ hosting/maintenance/domain in every plan. ⑨ yearly saves 10%.
- **Spine:** invisible on a phone → the sale goes elsewhere → WebRivo gives it a page that gets found, takes bookings and takes payments, for a monthly fee with no setup cost. See `STORY.md`.

## P — product

- P1 ✓ positioning clear: websites for main-street businesses, found on a phone, with booking and payment built in.
- P2 ✓ plan ladder (₹599 / ₹1,199 / ₹2,199) and the estimator carry the price; ⑤⑥ show the product those plans buy.
- P3 ✓ facts only: ₹599/₹1,199/₹2,199 per month; yearly −10%; no setup fee, site built for you; hosting, maintenance, domain in every plan; Business = local SEO, GBP, WhatsApp & call; Premium = booking, payment gateway, admin + analytics dashboards. Contact: webrivo.official@gmail.com · +91 9113253753 · webrivo.site.
- P4 ✓ no delivery-time claim anywhere (the site's "live in 3 days" is not used).

## F — completeness & sync

- F1 ✓ problem → ①②③, process → ④, landing page → ⑤, booking → ⑤, payment → ⑤, dashboard → ⑥, plans → ⑦, inclusions → ⑧, estimator → ⑨, outro → ⑩.
- F2 ✓ 19 VO lines, every cut 0.5–1.1s after the previous spoken syllable; no music-only gaps.
- F3 ✓ every frame is a DOM UI component (no page screenshots). SFX pinned to each shot's `BEATS`; BGM ducks 0.32→0.14 under VO.

## V — visual direction

- V1 ✓ site tokens only (off #F4F5EF, sage #DDE3D5, muted #899982, forest #18352B, white, ink); Anton / Bricolage Grotesque / Caveat; tape + grain throughout.
- V2 ✓ shots rebuilt in the site palette (map, search/trace, dealt cards + turn panel, work docket, phone product tour, dashboard, cover-flow plans, desk lifts, 3D estimator, outro lockup).
- V3 ✓ no WebRivo branding before the outro.

## Delivery

| file | frames | duration | mean | max | worst VO lag |
|------|-------:|---------:|-----:|----:|-------------:|
| `out/webrivo-short.mp4` | 1918 | 63.979s | −22.6 dB | −2.5 dB | +1.0f |
| `out/webrivo-short-sfxonly.mp4` | 1918 | 63.979s | −23.6 dB | −3.0 dB | +1.0f |

All 19 VO lines verified at +1.0f lag, corr 0.795–0.962 (`scripts/verify-av.py`).