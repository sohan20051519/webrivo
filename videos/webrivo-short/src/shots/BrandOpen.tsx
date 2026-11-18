// Shot 01 — dataviz-landscape-open, paper edition: the main street drawn as a
// printed town map. Sage side streets grow out of the paper and converge on one
// forest trunk, shop names surface along them (bakery, tailor, florist…), the
// camera flies low over the whole thing, and the hook lands in ink:
// EVERY SHOP / HAS A STORY. No brand mark, no wordmark — the film opens on the
// businesses, not on us.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp } from '../theme';

export const DURATION = 96;

// shot-local frames other files (audio cues) pin to
export const BEATS = { head: 60, out: 96 };

const VP = { x: 552, y: 430 };

// one trunk road running from the bottom of the sheet up into the distance
const TRUNK = 'M 540 1980 C 508 1720 568 1360 552 1060 C 542 900 556 700 560 470';

const TRUNK_Y = [1640, 1480, 1330, 1190, 1060, 945, 840, 748, 668, 600];

// side streets: each grows from off-frame and joins the trunk at its own height,
// alternating sides so the bundle reads as a town and not a river
const TRIBS = TRUNK_Y.map((ty, i) => {
  const left = i % 2 === 0;
  const sx = left ? -160 : 1240;
  const sy = ty + 250 + ((i * 7) % 4) * 90;
  const cx = VP.x + (left ? -200 : 200);
  const cy = ty + 190;
  return {
    d: `M ${sx} ${sy} Q ${cx} ${cy} 552 ${ty}`,
    delay: 6 + i * 3.2,
    op: 0.72 - i * 0.035,
  };
});

// shop names floating on the streets — the businesses this film is about
const SHOPS = [
  { t: 'BAKERY', n: '04', x: 96, y: 1170, rot: -4, at: 9, z: 1 },
  { t: 'TAILOR', n: '11', x: 606, y: 1052, rot: 3, at: 12, z: 1 },
  { t: 'FLORIST', n: '17', x: 74, y: 936, rot: -3, at: 15, z: 0 },
  { t: 'SALON', n: '23', x: 626, y: 822, rot: 5, at: 18, z: 1 },
  { t: 'CAFE', n: '08', x: 128, y: 712, rot: -2, at: 21, z: 0 },
];

const ShopTag: React.FC<{ s: typeof SHOPS[number]; frame: number; camY: number; headT: number }> = ({
  s, frame, camY, headT,
}) => {
  const t = ramp(frame, s.at, 9, EASE.outBack);
  const near = s.z === 1;
  const par = near ? 1.45 : 0.95;
  return (
    <div
      style={{
        position: 'absolute', left: s.x, top: s.y + camY * par,
        opacity: t * (0.92 - 0.45 * headT),
        transform: `translateY(${(1 - t) * 18}px) rotate(${s.rot}deg) scale(${(0.86 + 0.14 * t) * (near ? 1.06 : 1)})`,
        display: 'flex', alignItems: 'center', gap: 9,
      }}
    >
      <div
        style={{
          width: near ? 13 : 10, height: near ? 13 : 10, borderRadius: 99,
          background: C.forest, boxShadow: `0 0 0 4px rgba(221,227,213,${near ? 0.9 : 0.6})`,
        }}
      />
      <div
        style={{
          display: 'flex', alignItems: 'baseline', gap: 8,
          padding: near ? '12px 18px' : '10px 15px',
          borderRadius: 6,
          background: C.white,
          border: '1px solid rgba(24,53,43,.14)',
          boxShadow: '0 4px 12px rgba(24,53,43,.1)',
        }}
      >
        <span
          style={{
            fontFamily: FONT.sans, fontWeight: 700, fontSize: near ? 34 : 28,
            letterSpacing: '0.18em', color: C.forest,
          }}
        >
          {s.t}
        </span>
        <span
          style={{
            fontFamily: FONT.sans, fontWeight: 600, fontSize: near ? 23 : 19,
            letterSpacing: '0.08em', color: C.muted,
          }}
        >
          {s.n}
        </span>
      </div>
    </div>
  );
};

export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();

  // camera: low, slow fly-over of the map (no speed — this is the settle-in beat)
  const t = frame / DURATION;
  const camY = interpolate(t, [0, 1], [64, -54]);
  const camScale = interpolate(t, [0, 1], [1.07, 1.0]);
  const camX = interpolate(t, [0, 1], [-16, 14]);

  // trunk draws up from the bottom, then the side streets follow it in
  const trunkP = ramp(frame, -18, 46, EASE.smooth);
  const glow = ramp(frame, 6, 40, EASE.smooth);

  const headT = ramp(frame, BEATS.head, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 10, EASE.power4In);
  const ruleP = ramp(frame, BEATS.head + 14, 12, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.off, overflow: 'hidden' }}>
      <Fonts />

      {/* paper light + the haze the streets disappear into */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle 620px at ${VP.x}px ${VP.y}px, rgba(255,255,255,${0.95 * glow}), transparent 72%)`,
        }}
      />

      {/* ── the map ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translate(${camX}px, ${camY}px) scale(${camScale})`,
          transformOrigin: `${VP.x}px ${VP.y}px`,
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
          {/* far cross-streets — the grid the town sits on */}
          {[560, 700, 860, 1040, 1240].map((y, i) => {
            const p = ramp(frame, 4 + i * 2, 20, EASE.smooth);
            return (
              <line
                key={y} x1={-80} y1={y + camY * 0.5} x2={1160} y2={y + camY * 0.5}
                stroke={C.muted} strokeWidth={1.6} opacity={0.3 * p}
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p}
              />
            );
          })}

          {/* the trunk: sage casing, forest centre line */}
          <path
            d={TRUNK} fill="none" stroke={C.sage} strokeWidth={24} strokeLinecap="round"
            opacity={0.95} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trunkP}
          />
          <path
            d={TRUNK} fill="none" stroke={C.forest} strokeWidth={4.6} strokeLinecap="round"
            opacity={0.55} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trunkP}
          />

          {/* side streets */}
          {TRIBS.map((s, i) => {
            const p = ramp(frame, s.delay, 20, EASE.smooth);
            return (
              <path
                key={i} d={s.d} fill="none" stroke={C.muted} strokeWidth={3.6} strokeLinecap="round"
                opacity={s.op * p} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p}
              />
            );
          })}

          {/* little blocks of town, printed between the streets */}
          {[
            [150, 1060, 90, 62], [700, 1030, 74, 54], [430, 900, 66, 48],
            [120, 820, 78, 56], [790, 880, 60, 44], [470, 700, 54, 40],
            [40, 1180, 84, 58], [880, 1140, 70, 52], [250, 640, 62, 46],
            [700, 620, 58, 42], [60, 560, 54, 40], [860, 760, 62, 46],
            [400, 520, 48, 36], [620, 480, 44, 34],
          ].map(([x, y, w, h], i) => {
            const p = ramp(frame, 12 + i * 2.4, 16, EASE.out);
            return (
              <rect
                key={i} x={x} y={y + camY * 0.8} width={w} height={h} rx={3}
                fill="rgba(137,153,130,.14)" stroke={C.muted} strokeWidth={1.4} opacity={0.95 * p}
              />
            );
          })}

          {/* pulses running up the trunk toward the distance */}
          {[0, 1, 2].map((k) => {
            const ph = ((frame * 0.011 + k / 3) % 1);
            const y = 1980 - ph * 1500;
            return (
              <circle
                key={k} cx={552} cy={y} r={3.4} fill={C.forest}
                opacity={0.4 * Math.sin(ph * Math.PI) * trunkP}
              />
            );
          })}
        </svg>

        {/* shop names */}
        {SHOPS.map((s) => (
          <ShopTag key={s.t} s={s} frame={frame} camY={camY} headT={headT} />
        ))}

        {/* near-field streets: big, fast, out of focus — the depth cue */}
        <svg
          width={1080} height={1920} viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, filter: 'blur(8px)', opacity: 0.5 }}
        >
          {[
            'M -120 2100 C 180 1840 420 1760 720 1900',
            'M 1240 2060 C 900 1820 700 1700 380 1780',
          ].map((d, i) => {
            const p = ramp(frame, 10 + i * 6, 24, EASE.smooth);
            return (
              <path
                key={i} d={d} fill="none" stroke={C.muted} strokeWidth={i ? 12 : 17}
                strokeLinecap="round" transform={`translateY(${camY * 2.1}px)`}
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p}
              />
            );
          })}
        </svg>
      </div>

      {/* bottom scrim: paper, so the ink hook sits clean over the map */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 880,
          background: `linear-gradient(180deg, rgba(244,245,239,0) 0%, rgba(244,245,239,.88) 42%, ${C.off} 100%)`,
          opacity: headT,
        }}
      />

      {/* ── the hook ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1340, textAlign: 'center',
          opacity: headT * (1 - outT),
          transform: `translateY(${(1 - headT) * 46 - outT * 90}px)`,
        }}
      >
        <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 0.94, color: C.forest, letterSpacing: '0.005em' }}>
          EVERY SHOP
        </div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 6 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 0.94, color: C.forest }}>
            HAS A STORY.
          </span>
          <div
            style={{
              position: 'absolute', left: -6, bottom: 2, height: 14, borderRadius: 7,
              width: `${ruleP * 100}%`, background: C.sage,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 30, fontFamily: FONT.hand, fontSize: 54, color: C.muted,
            opacity: ramp(frame, BEATS.head + 10, 12, EASE.out),
          }}
        >
          and someone is looking for yours
        </div>
      </div>

      {/* printed-sheet dressing */}
      <Tape w={250} rot={-9} tone="sage" style={{ left: -40, top: 96, opacity: 0.55 * ramp(frame, 0, 12, EASE.out) }} />
      <Tape w={220} rot={7} tone="sage" style={{ right: -34, bottom: 420, opacity: 0.45 * ramp(frame, 6, 12, EASE.out) }} />

      <Grain opacity={0.1} />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 96% 80% at 50% 42%, transparent 56%, rgba(137,153,130,.28) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
