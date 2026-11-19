// Shot 01 — dataviz-landscape-open (town edition), 210f.
// A printed town map: blocks of buildings, a white main street drawn over them,
// shop tags surfacing along it, the hook landing. Then the camera does what a
// map film should do — it pushes in and visits two of the shops while the voice
// names them ("the bakery at five", "the tailor who never misses a stitch").
// No brand mark, no wordmark: the film opens on the businesses, not on us.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 210;

// shot-local frames the audio pins to
export const BEATS = { hook: 62, out: 96, hotA: 104, hotB: 146, end: 203 };

const TRUNK = 'M 540 1980 C 508 1720 568 1360 552 1060 C 542 900 556 700 560 470';
const TRUNK_Y = [1640, 1480, 1330, 1190, 1060, 945, 840, 748, 668, 600];

const TRIBS = TRUNK_Y.map((ty, i) => {
  const left = i % 2 === 0;
  const sx = left ? -160 : 1240;
  const sy = ty + 250 + ((i * 7) % 4) * 90;
  const cx = 552 + (left ? -220 : 220);
  const cy = ty + 190;
  return {
    d: `M ${sx} ${sy} Q ${cx} ${cy} 552 ${ty}`,
    delay: -2 + i * 1.4,
    op: 0.9 - i * 0.03,
  };
});

// deterministic town blocks — dense enough that every zoom level has texture
const BLOCKS = (() => {
  const out: { x: number; y: number; w: number; h: number; tone: number; rot: number }[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const cols = [-110, 110, 330, 660, 900, 1020, -40, 200];
  for (let y = 250; y < 1820; y += 112) {
    for (const cx of cols) {
      const w = 110 + Math.floor(rnd() * 130);
      const h = 62 + Math.floor(rnd() * 48);
      const x = cx + Math.floor(rnd() * 46) - 20;
      const yy = y + Math.floor(rnd() * 46);
      // keep the main street and its verges clear
      if (x + w > 476 && x < 636) continue;
      out.push({ x, y: yy, w, h, tone: rnd(), rot: (rnd() - 0.5) * 1.6 });
    }
  }
  return out;
})();

// the shops this film is about — the two named in the voice are `hot`
const SHOPS = [
  { t: 'BAKERY', n: '04', x: 96, y: 1170, rot: -4, at: 8, near: true, hot: 0 },
  { t: 'TAILOR', n: '11', x: 606, y: 1052, rot: 3, at: 11, near: true, hot: 1 },
  { t: 'FLORIST', n: '17', x: 74, y: 936, rot: -3, at: 14, near: false, hot: -1 },
  { t: 'SALON', n: '23', x: 626, y: 822, rot: 5, at: 17, near: true, hot: -1 },
  { t: 'CAFE', n: '08', x: 128, y: 712, rot: -2, at: 20, near: false, hot: -1 },
];

const centre = (s: typeof SHOPS[number]) => ({ x: s.x + (s.near ? 120 : 105), y: s.y + 31 });
const BAKERY = centre(SHOPS[0]);
const TAILOR = centre(SHOPS[1]);

// camera keyframes: (scale, translate). A point p maps to p*s + t, so we solve
// t from the tag we want centred at (540, 900).
const at = (s: number, p: { x: number; y: number }, cx = 540, cy = 900) => ({
  s, x: cx - p.x * s, y: cy - p.y * s,
});
const CAM = [
  { f: 0, ...at(1.06, { x: 540, y: 960 }, 540, 960), y: 70 },
  { f: 96, s: 1.0, x: 8, y: -58 },
  { f: 122, ...at(2.32, BAKERY) },
  { f: 140, ...at(2.38, BAKERY) },
  { f: 172, ...at(2.3, TAILOR) },
  { f: 219, ...at(2.14, TAILOR) },
];

const camAt = (f: number) => {
  for (let i = 0; i < CAM.length - 1; i++) {
    const a = CAM[i];
    const b = CAM[i + 1];
    if (f <= b.f) {
      const u = ramp(f, a.f, b.f - a.f, EASE.smooth);
      return { s: a.s + (b.s - a.s) * u, x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
    }
  }
  const z = CAM[CAM.length - 1];
  return { s: z.s, x: z.x, y: z.y };
};

const ShopTag: React.FC<{ s: typeof SHOPS[number]; frame: number; hot: number }> = ({ s, frame, hot }) => {
  const t = ramp(frame, s.at, 9, EASE.outBack);
  const near = s.near;
  const pulse = hot * (0.6 + 0.4 * Math.cos((frame - BEATS.hotA) * 0.16));
  return (
    <div
      style={{
        position: 'absolute', left: s.x, top: s.y,
        opacity: t,
        transform: `translateY(${(1 - t) * 18}px) rotate(${s.rot}deg) scale(${(0.88 + 0.12 * t) * (near ? 1 : 0.92) * (1 + 0.06 * hot)})`,
        transformOrigin: 'left center',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      {/* halo behind the two shops the voice visits */}
      <div
        style={{
          position: 'absolute', left: -46, top: -34, width: 430, height: 132,
          borderRadius: 66, opacity: hot,
          background: `radial-gradient(ellipse at 40% 50%, rgba(221,227,213,${0.55 + 0.25 * pulse}) 0%, rgba(221,227,213,0) 70%)`,
        }}
      />
      <div
        style={{
          width: near ? 15 : 12, height: near ? 15 : 12, borderRadius: 99,
          background: C.forest, boxShadow: `0 0 0 4px rgba(244,245,239,${near ? 0.95 : 0.7})`,
          position: 'relative',
        }}
      />
      <div
        style={{
          display: 'flex', alignItems: 'baseline', gap: 10,
          padding: near ? '12px 18px' : '10px 15px',
          borderRadius: 6, position: 'relative',
          background: C.white,
          border: '1px solid rgba(24,53,43,.16)',
          boxShadow: hot > 0.02
            ? `0 ${8 + 18 * hot}px ${18 + 30 * hot}px rgba(24,53,43,${0.14 + 0.2 * hot})`
            : '0 4px 12px rgba(24,53,43,.12)',
        }}
      >
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: near ? 34 : 28, letterSpacing: '0.18em', color: C.forest }}>
          {s.t}
        </span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: near ? 23 : 19, letterSpacing: '0.08em', color: C.muted }}>
          {s.n}
        </span>
      </div>
    </div>
  );
};

export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = camAt(frame);

  const trunkP = ramp(frame, -18, 56, EASE.smooth);
  const gate = ramp(frame, 0, 18, EASE.out);
  const hookT = ramp(frame, BEATS.hook, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  const ruleP = ramp(frame, BEATS.hook + 12, 12, EASE.smooth);
  const chromeT = ramp(frame, 2, 16, EASE.out);

  const hotA = ramp(frame, BEATS.hotA - 10, 12, EASE.out) * (1 - ramp(frame, BEATS.hotB - 14, 10, EASE.smooth));
  const hotB = ramp(frame, BEATS.hotB - 6, 12, EASE.out);
  const hot = [hotA, hotB, 0, 0, 0];

  const focus = cam.s > 1.3 ? (hotB > 0.4 ? TAILOR : BAKERY) : null;
  const fx = focus ? focus.x * cam.s + cam.x : 540;
  const fy = focus ? focus.y * cam.s + cam.y : 900;
  const dim = Math.max(hotA, hotB);

  return (
    <AbsoluteFill style={{ backgroundColor: '#E8ECE1', overflow: 'hidden' }}>
      <Fonts />

      {/* map paper */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(130% 100% at 50% 34%, #EFF2E9 0%, #E7EBDF 62%, #DFE5D6 100%)` }} />

      {/* ── the map ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})`,
          transformOrigin: '0 0',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
          {/* blocks of town */}
          {BLOCKS.map((b, i) => {
            const p = ramp(frame, -8 + (i % 22) * 0.5, 12, EASE.out);
            const dark = b.tone > 0.72;
            return (
              <g key={i} opacity={p} transform={`rotate(${b.rot} ${b.x + b.w / 2} ${b.y + b.h / 2})`}>
                <rect
                  x={b.x} y={b.y} width={b.w} height={b.h} rx={2}
                  fill={dark ? '#B7C4A9' : '#D2DAC6'}
                  stroke={C.forest} strokeWidth={1.3} strokeOpacity={0.34}
                />
                {dark ? (
                  <path
                    d={`M ${b.x} ${b.y + b.h} L ${b.x} ${b.y} L ${b.x + b.w} ${b.y}`}
                    fill="none" stroke={C.muted} strokeWidth={2.4} strokeOpacity={0.45}
                  />
                ) : null}
              </g>
            );
          })}

          {/* the side streets, drawn as road shoulders + white tarmac */}
          {TRIBS.map((s, i) => {
            const p = ramp(frame, s.delay, 22, EASE.smooth);
            return (
              <g key={i} opacity={s.op}>
                <path d={s.d} fill="none" stroke={C.muted} strokeWidth={17} strokeOpacity={0.28} strokeLinecap="round"
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
                <path d={s.d} fill="none" stroke="#F7F8F2" strokeWidth={12} strokeLinecap="round"
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
              </g>
            );
          })}

          {/* the main street */}
          <path d={TRUNK} fill="none" stroke={C.muted} strokeWidth={40} strokeOpacity={0.22} strokeLinecap="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trunkP} />
          <path d={TRUNK} fill="none" stroke="#F9FAF4" strokeWidth={33} strokeLinecap="round"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trunkP} />
          <path d={TRUNK} fill="none" stroke={C.muted} strokeWidth={2.4} strokeOpacity={0.55} strokeLinecap="round"
            strokeDasharray="16 16" pathLength={1} strokeDashoffset={1 - trunkP} />

          {/* storefront footprints beside every tag, so a 2.3× push has structure */}
          {SHOPS.map((s) => (
            <g key={`b-${s.t}`} opacity={ramp(frame, s.at - 2, 12, EASE.out)}>
              <rect x={s.x - 26} y={s.y - 26} width={s.near ? 330 : 300} height={s.near ? 120 : 110} rx={4}
                fill="#E7EBDD" stroke={C.forest} strokeWidth={1.5} strokeOpacity={0.32} />
              <path d={`M ${s.x - 20} ${s.y - 2} h 76`} stroke={C.forest} strokeWidth={5} strokeOpacity={0.55} strokeLinecap="round" />
              <path d={`M ${s.x - 20} ${s.y + 12} h 54`} stroke={C.muted} strokeWidth={3.4} strokeOpacity={0.6} strokeLinecap="round" />
            </g>
          ))}

          {/* trees along the verges */}
          {Array.from({ length: 26 }).map((_, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const y = 420 + i * 58;
            const x = 540 + side * (78 + ((i * 37) % 42));
            const p = ramp(frame, 12 + (i % 9), 12, EASE.out);
            return <circle key={i} cx={x} cy={y} r={5.5} fill={C.sage} stroke={C.muted} strokeWidth={1.2} opacity={0.9 * p} />;
          })}
        </svg>

        {/* street name, printed along the road */}
        <div
          style={{
            position: 'absolute', left: 508, top: 1500, transform: 'rotate(-88deg)', transformOrigin: '0 0',
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 15, letterSpacing: '0.42em',
            color: C.forest, opacity: 0.5 * gate, whiteSpace: 'nowrap',
          }}
        >
          MAIN STREET
        </div>

        {SHOPS.map((s, i) => (
          <ShopTag key={s.t} s={s} frame={frame} hot={hot[i] * gate} />
        ))}
      </div>

      {/* map chrome — north arrow + legend, printed in the corners */}
      <div style={{ position: 'absolute', right: 54, top: 396, opacity: 0.62 * chromeT, textAlign: 'center' }}>
        <svg width={30} height={46} viewBox="0 0 30 46">
          <path d="M15 2 L26 44 L15 34 L4 44 Z" fill={C.forest} />
        </svg>
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 13, letterSpacing: '0.3em', color: C.forest, marginTop: 2 }}>N</div>
      </div>
      <div
        style={{
          position: 'absolute', left: 54, bottom: 210, opacity: 0.7 * chromeT,
          background: 'rgba(255,255,255,.72)', border: '1px solid rgba(24,53,43,.14)',
          borderRadius: 6, padding: '12px 16px',
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 13, letterSpacing: '0.26em', color: C.forest }}>TOWN CENTRE</div>
        <div style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted, marginTop: 2 }}>five shops, one street</div>
      </div>

      {/* the spotlight: everything but the visited shop goes soft */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle 560px at ${fx}px ${fy}px, rgba(244,245,239,0) 12%, rgba(244,245,239,.6) 54%, rgba(244,245,239,.88) 100%)`,
          opacity: dim * gate,
        }}
      />

      {/* ── the hook ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1216, textAlign: 'center',
          opacity: hookT * (1 - outT),
          transform: `translateY(${(1 - hookT) * 46 - outT * 120}px)`,
        }}
      >
        <div style={{ fontFamily: FONT.display, fontSize: 150, lineHeight: 0.94, color: C.forest }}>
          EVERY SHOP
        </div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 150, lineHeight: 0.94, color: C.forest }}>
            HAS A STORY.
          </span>
          <div style={{ position: 'absolute', left: -4, bottom: 4, height: 15, borderRadius: 8, width: `${ruleP * 100}%`, background: C.sage }} />
        </div>
      </div>

      {/* the two visited shops get a hand-written caption */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 236, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 70, color: C.forest,
          opacity: hotA, transform: `translateY(${(1 - hotA) * 20}px) rotate(-1.4deg)`,
        }}
      >
        opens at five
      </div>
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 236, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 70, color: C.forest,
          opacity: hotB, transform: `translateY(${(1 - hotB) * 20}px) rotate(1.2deg)`,
        }}
      >
        never misses a stitch
      </div>

      <Tape w={250} rot={-9} tone="sage" style={{ left: -40, top: 96, opacity: 0.55 * ramp(frame, 0, 12, EASE.out) }} />
      <Tape w={220} rot={7} tone="sage" style={{ right: -34, bottom: 420, opacity: 0.45 * ramp(frame, 6, 12, EASE.out) }} />

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 96% 82% at 50% 42%, transparent 54%, rgba(137,153,130,.3) 100%)` }} />
    </AbsoluteFill>
  );
};
