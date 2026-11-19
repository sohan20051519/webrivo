// Shot 02 — glass-pill-dictation-typing + draw-svg-trace, 210f.
// The search shot, built as a real results page: phone status bar, a rounded
// search field that types itself, the All / Maps / Images / Shopping tabs, a
// local-pack map with three pins, three organic results — and then the thing
// the whole film is about: the slot where YOUR shop should be, empty, traced
// in pen. Full-bleed, DOM only, no screenshots.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Fonts, ramp, bell } from '../theme';

export const DURATION = 210;

export const BEATS = {
  chrome: 2,
  type: 14,
  submit: 58,
  map: 66,
  rows: [74, 86, 98],
  slot: 120,
  trace: 130,
  close: 168,
  note: 172,
  out: 196,
};

const QUERY = 'boutique near me';
const SUGGEST = [
  'boutique near me',
  'boutique near me open now',
  'ladies kurta set',
  'saree shop main street',
  'ethnic wear boutique',
  'bridal blouse stitching',
];
const TYPE_PER = 3.1;

const Magnifier: React.FC<{ size: number; color: string; w?: number }> = ({ size, color, w = 2.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={10.5} cy={10.5} r={6.6} stroke={color} strokeWidth={w} />
    <line x1={15.6} y1={15.6} x2={21} y2={21} stroke={color} strokeWidth={w} strokeLinecap="round" />
  </svg>
);

const Mic: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={9} y={2.5} width={6} height={11} rx={3} stroke={color} strokeWidth={2} />
    <path d="M5 11a7 7 0 0 0 14 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <line x1={12} y1={18} x2={12} y2={21.5} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

const Lens: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3.5 8V5.5A2 2 0 0 1 5.5 3.5H8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <path d="M16 3.5h2.5a2 2 0 0 1 2 2V8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <path d="M20.5 16v2.5a2 2 0 0 1-2 2H16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <path d="M8 20.5H5.5a2 2 0 0 1-2-2V16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <circle cx={12} cy={12} r={3.2} stroke={color} strokeWidth={2} />
  </svg>
);

const Stars: React.FC<{ n: number; size: number }> = ({ n, size }) => (
  <span style={{ display: 'inline-flex', gap: 2 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z"
          fill={i < n ? C.muted : 'none'}
          stroke={C.muted}
          strokeWidth={1.4}
        />
      </svg>
    ))}
  </span>
);

type Row = { name: string; url: string; snippet: string; stars: number; reviews: number; dist: string };

const ROWS: Row[] = [
  { name: 'Silk & Stitch — ethnic wear, main street', url: 'silkandstitch.in › collection', snippet: 'Sarees, kurtas and custom blouses. Open from 10 am. Visit our store.', stars: 5, reviews: 214, dist: '1.2 km' },
  { name: 'Urban Loom', url: 'urbanloom.in › boutique', snippet: 'Contemporary ethnic and fusion wear. Closed now — opens tomorrow at 11 am.', stars: 4, reviews: 96, dist: '2.8 km' },
  { name: 'The Drapery', url: 'thedrapery.shop › styles', snippet: 'Ready-to-wear kurtas and dupattas. Delivery within 5 km.', stars: 4, reviews: 41, dist: '3.1 km' },
];

const PINS = [
  { x: 232, y: 190, label: 'Silk & Stitch' },
  { x: 470, y: 268, label: 'Urban Loom' },
  { x: 700, y: 150, label: 'The Drapery' },
];

// rough hand-drawn rectangle around the empty slot
const rough = (w: number, h: number) =>
  `M 2 ${h * 0.28} C 0 ${h * 0.2} 6 4 ${w * 0.16} 2 ` +
  `S ${w * 0.55} -2 ${w * 0.72} 3 S ${w - 4} 2 ${w - 2} ${h * 0.3} ` +
  `S ${w + 2} ${h * 0.72} ${w - 6} ${h - 4} ` +
  `S ${w * 0.5} ${h + 2} ${w * 0.3} ${h - 2} S 4 ${h + 1} 2 ${h * 0.7} Z`;

const SLOT_W = 900;
const SLOT_H = 168;

export const SearchShot: React.FC = () => {
  const frame = useCurrentFrame();

  const chromeT = ramp(frame, -10, 14, EASE.out);
  const typed = Math.max(0, Math.min(QUERY.length, Math.floor((frame - BEATS.type) / TYPE_PER)));
  const caretOn = frame >= BEATS.type - 4 && frame < BEATS.type + QUERY.length * TYPE_PER + 6 && frame % 16 < 9;
  const submit = ramp(frame, BEATS.submit, 8, EASE.power4In);
  const mapT = ramp(frame, BEATS.map, 14, EASE.out);
  const slotT = ramp(frame, BEATS.slot, 12, EASE.out);
  const traceT = ramp(frame, BEATS.trace, BEATS.close - BEATS.trace, EASE.smooth);
  const closeFlash = bell(frame, BEATS.close, 3);
  const noteT = ramp(frame, BEATS.note, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);

  return (
    <AbsoluteFill style={{ backgroundColor: C.white, overflow: 'hidden' }}>
      <Fonts />

      {/* the whole page lifts away at the cut */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-outT * 160}px)`, opacity: 1 - outT * 0.6 }}>

        {/* ── app header: the field and tabs sit on forest, like the app's
               coloured top bar — it also gives the page a real top third ── */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: 380,
            background: C.forest, borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
            opacity: chromeT, transform: `translateY(${(1 - chromeT) * -30}px)`,
          }}
        />

        {/* ── phone status bar ──────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 62, right: 62, top: 46, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            opacity: chromeT,
          }}
        >
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.off }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 5, height: 8 + i * 5, borderRadius: 2, background: C.off, opacity: 0.85 }} />
            ))}
            <div style={{ width: 34, height: 17, borderRadius: 4, border: `2px solid ${C.off}`, opacity: 0.85, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 2, width: 22, borderRadius: 2, background: C.off }} />
            </div>
          </div>
        </div>

        {/* ── search field ──────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 56, top: 122, width: 968, height: 132,
            borderRadius: 66, boxSizing: 'border-box', padding: '0 30px 0 38px',
            display: 'flex', alignItems: 'center', gap: 22,
            background: C.white,
            border: '2px solid rgba(24,53,43,.08)',
            boxShadow: '0 10px 30px rgba(8,20,16,.35)',
            opacity: chromeT,
            transform: `translateY(${(1 - chromeT) * -40}px) scale(${1 - 0.03 * submit})`,
          }}
        >
          <Magnifier size={40} color={C.muted} w={2.4} />
          <div style={{ flex: 1, fontSize: 46, color: C.forest, fontWeight: 500, whiteSpace: 'pre', fontFamily: FONT.sans }}>
            {QUERY.slice(0, typed)}
            <span style={{ display: 'inline-block', width: 3, height: 44, background: C.forest, marginLeft: 3, opacity: caretOn ? 0.9 : 0, verticalAlign: '-7px' }} />
          </div>
          <Mic size={34} color={C.forest} />
          <Lens size={34} color={C.forest} />
        </div>

        {/* ── tabs ──────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 40, right: 40, top: 290, height: 62,
            display: 'flex', alignItems: 'flex-end', gap: 44,
            opacity: ramp(frame, BEATS.submit + 6, 10, EASE.out), transform: `translateY(${(1 - ramp(frame, BEATS.submit + 6, 10, EASE.out)) * -16}px)`,
          }}
        >
          {['All', 'Maps', 'Images', 'Shopping'].map((t, i) => (
            <div key={t} style={{ position: 'relative', paddingBottom: 14 }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: i === 0 ? 800 : 600, fontSize: 30, color: i === 0 ? C.white : 'rgba(221,227,213,.7)' }}>
                {t}
              </span>
              {i === 0 ? <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, borderRadius: 3, background: C.white }} /> : null}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 26, color: 'rgba(221,227,213,.72)', paddingBottom: 14 }}>Tools</span>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 352, height: 1.5, background: 'rgba(221,227,213,.22)', opacity: ramp(frame, BEATS.submit + 6, 10, EASE.out) }} />

        {/* ── suggestions while the query is being typed ─────────────────── */}
        <div
          style={{
            position: 'absolute', left: 56, top: 258, width: 968, zIndex: 4,
            transform: `translateY(${-38 * ramp(frame, 58, 8, EASE.power4In)}px)`,
            opacity: ramp(frame, 16, 8, EASE.out) * (1 - ramp(frame, 58, 8, EASE.smooth)),
            filter: 'drop-shadow(0 26px 44px rgba(8,20,16,.35))',
          }}
        >
          {SUGGEST.map((q, i) => {
            const t = ramp(frame, 16 + i * 3, 9, EASE.out);
            const hot = i === 0;
            return (
              <div
                key={q}
                style={{
                  height: 94, display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px',
                  borderBottom: i < SUGGEST.length - 1 ? '1px solid rgba(24,53,43,.08)' : 'none',
                  background: hot ? C.sage : C.white,
                  borderRadius: i === 0 ? '26px 26px 0 0' : i === SUGGEST.length - 1 ? '0 0 26px 26px' : 0,
                  opacity: t, transform: `translateY(${(1 - t) * -10}px)`,
                }}
              >
                <Magnifier size={30} color={hot ? C.forest : C.muted} w={2.2} />
                <span style={{ fontFamily: FONT.sans, fontWeight: hot ? 700 : 500, fontSize: 34, color: hot ? C.forest : 'rgba(32,37,34,.8)', flex: 1 }}>
                  {q}
                </span>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M18 6H10M18 6v8" stroke={C.muted} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );
          })}
        </div>


        {/* ── the local pack: a map with three pins ─────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 40, top: 380, width: 1000, height: 372,
            borderRadius: 16, overflow: 'hidden', background: C.sage,
            border: '1px solid rgba(24,53,43,.12)',
            opacity: mapT, transform: `translateY(${(1 - mapT) * 26}px)`,
          }}
        >
          <svg width={1000} height={372} viewBox="0 0 1000 372" style={{ position: 'absolute', inset: 0 }}>
            {[70, 150, 230, 310].map((y) => (
              <line key={y} x1={0} y1={y} x2={1000} y2={y} stroke={C.muted} strokeWidth={3} opacity={0.4} />
            ))}
            {[120, 330, 540, 760, 900].map((x) => (
              <line key={x} x1={x} y1={0} x2={x} y2={372} stroke={C.muted} strokeWidth={3} opacity={0.32} />
            ))}
            <path d="M 0 250 C 220 210 330 300 520 260 S 820 180 1000 230" fill="none" stroke={C.muted} strokeWidth={10} opacity={0.55} />
            <path d="M 300 0 C 340 120 300 240 340 372" fill="none" stroke={C.muted} strokeWidth={8} opacity={0.45} />
            {PINS.map((p, i) => {
              const t = ramp(frame, BEATS.map + 8 + i * 4, 10, EASE.outBack);
              return (
                <g key={p.label} transform={`translate(${p.x} ${p.y}) scale(${t})`}>
                  <circle cx={0} cy={0} r={26} fill="rgba(24,53,43,.12)" />
                  <path d="M 0 -34 C -15 -34 -26 -23 -26 -9 C -26 10 0 34 0 34 C 0 34 26 10 26 -9 C 26 -23 15 -34 0 -34 Z" fill={C.forest} />
                  <circle cx={0} cy={-9} r={9} fill={C.sage} />
                  <text x={0} y={-48} textAnchor="middle" fontFamily={FONT.sans} fontWeight={700} fontSize={19} fill={C.forest}>
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div style={{ position: 'absolute', left: 18, top: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.92)', borderRadius: 999, padding: '8px 16px' }}>
            <Magnifier size={20} color={C.forest} w={2.6} />
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, color: C.forest }}>boutiques · this area</span>
          </div>
        </div>

        {/* ── result count ──────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: 62, top: 778, fontFamily: FONT.sans, fontWeight: 500, fontSize: 22,
            color: C.muted, opacity: ramp(frame, 76, 12, EASE.out),
          }}
        >
          About 1,24,000 results (0.31 seconds)
        </div>

        {/* ── organic results ───────────────────────────────────────────── */}
        {ROWS.map((r, i) => {
          const t = ramp(frame, BEATS.rows[i], 12, EASE.out);
          return (
            <div
              key={r.name}
              style={{
                position: 'absolute', left: 62, right: 62, top: 826 + i * 168,
                opacity: t, transform: `translateY(${(1 - t) * 22}px)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, color: C.forest }}>{r.name[0]}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 21, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.url}
                  </div>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.forest, lineHeight: 1.15 }}>
                    {r.name}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                <Stars n={r.stars} size={17} />
                <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 21, color: C.muted }}>
                  {r.reviews} reviews · {r.dist}
                </span>
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 400, fontSize: 24, color: 'rgba(32,37,34,.78)', marginTop: 4, lineHeight: 1.35 }}>
                {r.snippet}
              </div>
            </div>
          );
        })}

        {/* ── the empty slot where your shop should be ──────────────────── */}
        <div
          style={{
            position: 'absolute', left: 62, top: 1350, width: SLOT_W, height: SLOT_H,
            borderRadius: 14, boxSizing: 'border-box',
            border: `2px dashed rgba(137,153,130,${0.5 + 0.3 * slotT})`,
            background: 'rgba(221,227,213,.22)',
            opacity: slotT, transform: `translateY(${(1 - slotT) * 24}px)`,
            display: 'flex', alignItems: 'center', paddingLeft: 30, gap: 18,
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 20, border: `2px dashed ${C.muted}`, opacity: 0.6 }} />
          <div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, letterSpacing: '0.01em', color: 'rgba(24,53,43,.68)' }}>NO WEBSITE.</div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 23, color: 'rgba(24,53,43,.5)', marginTop: 5 }}>
              so this slot stays empty
            </div>
          </div>

          {/* the pen */}
          <svg
            width={SLOT_W} height={SLOT_H}
            style={{ position: 'absolute', left: -6, top: -6, overflow: 'visible' }}
          >
            <path
              d={rough(SLOT_W + 12, SLOT_H + 12)}
              fill="none"
              stroke={C.forest}
              strokeWidth={3.4 + 4 * closeFlash}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - traceT}
              opacity={1 - 0.25 * ramp(frame, BEATS.note + 10, 10, EASE.smooth)}
            />
          </svg>
        </div>

        {/* hand note + stamp */}
        <div
          style={{
            position: 'absolute', left: 120, top: 1540, display: 'flex', alignItems: 'center', gap: 22,
            opacity: noteT, transform: `translateY(${(1 - noteT) * 16}px) rotate(-1.6deg)`,
          }}
        >
          <span style={{ fontFamily: FONT.hand, fontSize: 58, color: C.forest }}>where&rsquo;s yours?</span>
          <div
            style={{
              borderRadius: 999, background: C.forest, color: C.off,
              fontFamily: FONT.sans, fontWeight: 800, fontSize: 20, letterSpacing: '0.16em',
              padding: '10px 18px', transform: `scale(${0.8 + 0.2 * noteT}) rotate(1.5deg)`,
            }}
          >
            NOT FOUND
          </div>
        </div>

        {/* related searches — keeps the page full to the bottom */}
        <div style={{ position: 'absolute', left: 62, right: 62, top: 1648, opacity: ramp(frame, 104, 14, EASE.out) }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, letterSpacing: '0.14em', color: C.muted }}>RELATED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14 }}>
            {['boutique near me open now', 'saree shop main street', 'kurta set near me'].map((q) => (
              <div key={q} style={{ borderRadius: 999, background: '#EDEFE6', border: '1px solid rgba(24,53,43,.1)', padding: '14px 22px', fontFamily: FONT.sans, fontWeight: 600, fontSize: 24, color: C.forest }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* home indicator — this is a phone, not a slide */}
      <div style={{ position: 'absolute', left: '50%', bottom: 26, width: 300, height: 9, marginLeft: -150, borderRadius: 5, background: 'rgba(24,53,43,.28)' }} />

      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
