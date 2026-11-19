// Shot 01 — street-drive open, 210f.
// We travel forward down a real street and pass shop fronts on both sides.
// The boutique and tailor come into view (and get a soft focus) exactly when
// the voice names them. Same DURATION/BEATS contract as before, so every
// pinned SFX cue keeps its timing.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp } from '../theme';

export const DURATION = 210;

// shot-local frames the audio pins to (keep contract)
export const BEATS = { hook: 12, out: 80, hotA: 104, hotB: 146, end: 203 };

/* ------------------------------------------------------------------ *
 * Perspective setup — all sizes are WORLD UNITS, projected to screen.
 * (The old version multiplied pixel-sized widths by the scale, which
 *  made each shop a giant blank wall off-screen. This version is sane.)
 * ------------------------------------------------------------------ */
const VP = { x: 540, y: 620 };          // horizon / vanishing point
const FOCAL = 700;                       // px per world unit at depth 1
const CAM_H = 2.2;                       // camera height in world units
const ROAD_HALF = 3.2;                   // half width of the road
const SHOP_W = 5.0;                      // shopfront width in world units
const SHOP_H = 6.4;                      // shopfront height in world units

type Item = 'shelves' | 'chairs' | 'flowers' | 'dresses' | 'cups' | 'fabric' | 'bread';
type Shop = {
  name: string;
  sub: string;
  side: -1 | 1;          // -1 left, +1 right of the road
  z: number;             // world distance from camera at frame 0
  awning: string;
  accent: string;
  item: Item;
  hot?: 0 | 1;           // which naming beat this shop belongs to
};

const SHOPS: Shop[] = [
  { name: 'GROCERY',  sub: 'daily needs',    side: -1, z: 6,  awning: '#8FA07E', accent: '#2F5A45', item: 'shelves' },
  { name: 'SALON',    sub: 'cuts & care',    side:  1, z: 12, awning: C.sage,    accent: C.muted,   item: 'chairs'  },
  { name: 'FLORIST',  sub: 'fresh blooms',  side: -1, z: 19, awning: '#C7D4B8', accent: '#5E7A5A', item: 'flowers' },
  { name: 'BOUTIQUE', sub: 'styles for you', side:  1, z: 50, awning: C.sage,    accent: C.forest,  item: 'dresses', hot: 0 },
  { name: 'CAFE',     sub: 'tea & snacks',   side: -1, z: 58, awning: '#B9C8A8', accent: '#4A6A52', item: 'cups'    },
  { name: 'TAILOR',   sub: 'perfect fit',    side: -1, z: 68, awning: '#D6DEC9', accent: C.forest,  item: 'fabric',  hot: 1 },
  { name: 'BAKERY',   sub: 'fresh daily',    side:  1, z: 76, awning: '#C4D0B6', accent: '#6B8260', item: 'bread'   },
];

// steady forward motion — predictable so the naming beats line up
const camZ = (f: number) => 0.35 * f;

/* ------------------------------------------------------------------ *
 * Window displays — drawn in the shopfront's fixed base coordinate space.
 * ------------------------------------------------------------------ */
const Display: React.FC<{ kind: Item; color: string }> = ({ kind, color }) => {
  const bar = (left: number, top: number, w: number, h: number, r = 2) => (
    <div key={`${left}-${top}`} style={{ position: 'absolute', left, top, width: w, height: h, borderRadius: r, background: color, opacity: 0.85 }} />
  );
  if (kind === 'shelves') {
    return <>{[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        {bar(10, (18 + i * 46) * 1, 150, 4)}
        {[0, 1, 2, 3].map((j) => bar(14 + j * 37, 6 + i * 46, 25, 19, 2))}
      </React.Fragment>
    ))}</>;
  }
  if (kind === 'chairs') {
    return <>{[0, 1].map((i) => (
      <React.Fragment key={i}>
        {bar(22 + i * 82, 20, 58, 44, 8)}
        {bar(22 + i * 82, 64, 8, 42)}
        {bar(72 + i * 82, 64, 8, 42)}
      </React.Fragment>
    ))}</>;
  }
  if (kind === 'flowers') {
    return <>{[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        {bar(26 + i * 40, 34, 5, 62)}
        <div key={`c${i}`} style={{ position: 'absolute', left: 16 + i * 40, top: 14, width: 30, height: 30, borderRadius: '50%', background: color, opacity: 0.9 }} />
      </React.Fragment>
    ))}</>;
  }
  if (kind === 'dresses') {
    return <>{bar(12, 10, 154, 5)}{[0, 1, 2].map((i) => (
      <div key={i} style={{ position: 'absolute', left: 20 + i * 50, top: 14, width: 34, height: 78, background: `linear-gradient(180deg, ${color} 0%, ${color} 38%, transparent 38%)`, clipPath: 'polygon(18% 0,82% 0,100% 100%,0 100%)', opacity: 0.85 }} />
    ))}</>;
  }
  if (kind === 'fabric') {
    return <>{[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: 'absolute', left: 14 + i * 42, top: 16, width: 32, height: 76, borderRadius: 14, background: `repeating-linear-gradient(90deg, ${color} 0 8px, rgba(255,255,255,.55) 8px 16px)`, opacity: 0.85 }} />
    ))}</>;
  }
  if (kind === 'cups') {
    return <>{[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        {bar(26 + i * 52, 28, 34, 42, 6)}
        {bar(64 + i * 52, 36, 16, 20, 8)}
      </React.Fragment>
    ))}</>;
  }
  return <>{[0, 1, 2, 3].map((i) => (
    <div key={i} style={{ position: 'absolute', left: 14 + i * 42, top: 52, width: 34, height: 34, borderRadius: '50% 50% 4px 4px', background: color, opacity: 0.85 }} />
  ))}</>;
};

/* ------------------------------------------------------------------ *
 * One shopfront. The facade is authored at a fixed base size (300x384)
 * and scaled as a whole, so borders/shadows/details never explode when
 * the camera gets close.
 * ------------------------------------------------------------------ */
const BASE_W = 300;
const BASE_H = 384;

const ShopFront: React.FC<{ shop: Shop; cz: number; hotA: number; hotB: number }> = ({ shop, cz, hotA, hotB }) => {
  const dz = shop.z - cz;
  if (dz < 2.2 || dz > 58) return null;

  const s = FOCAL / dz;
  const centerX = VP.x + shop.side * (ROAD_HALF + SHOP_W / 2) * s;
  const groundY = VP.y + CAM_H * s;
  const w = SHOP_W * s;
  const h = SHOP_H * s;
  const left = centerX - w / 2;
  const top = groundY - h;

  // fade in as it approaches from the distance, fade out as we pass it
  const alpha = ramp(58 - dz, 0, 12, EASE.out) * ramp(dz, 2.2, 1.6, EASE.smooth);
  const hot = shop.hot === 0 ? hotA : shop.hot === 1 ? hotB : 0;
  const focus = Math.max(hotA, hotB);
  const dim = focus > 0.01 && shop.hot === undefined ? 1 - 0.4 * focus : 1;
  const pop = 1 + 0.03 * hot;

  return (
    <div style={{ position: 'absolute', left, top, width: w, height: h, opacity: alpha * dim, transform: `scale(${pop})`, transformOrigin: 'center bottom' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: BASE_W, height: BASE_H, transform: `scale(${w / BASE_W})`, transformOrigin: 'top left' }}>
        {/* building shell */}
        <div style={{ position: 'absolute', inset: 0, background: C.white, borderRadius: 5, overflow: 'hidden', border: '2px solid rgba(24,53,43,.42)', boxShadow: `6px 14px 26px rgba(24,53,43,.30)${hot > 0.01 ? ', 0 0 32px 8px rgba(24,53,43,.32)' : ''}` }}>
          {/* upper wall with two windows */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54, background: '#EDEFE7', borderBottom: '1px solid rgba(24,53,43,.16)' }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 66 + i * 102, top: 13, width: 66, height: 29, background: C.sage, borderRadius: 2, border: '1px solid rgba(24,53,43,.2)' }} />
            ))}
          </div>

          {/* sign band — dark, high contrast, always readable */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 54, height: 54, background: shop.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `${hot > 0.01 ? 4 : 2}px solid ${hot > 0.01 ? C.forest : 'rgba(24,53,43,.35)'}` }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, letterSpacing: '0.08em', color: C.off, whiteSpace: 'nowrap' }}>
              {shop.name}
            </span>
          </div>

          {/* awning with scalloped edge */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 108, height: 31, background: `repeating-linear-gradient(90deg, ${shop.awning} 0 75px, #FFFFFF 75px 150px)`, borderBottom: '2px solid rgba(24,53,43,.22)' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: -5, height: 9, display: 'flex' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: i % 2 ? '#FFFFFF' : shop.awning, borderRadius: '0 0 6px 6px' }} />
              ))}
            </div>
          </div>

          {/* glass display window + door */}
          <div style={{ position: 'absolute', left: 15, right: 15, top: 154, height: 161, display: 'flex', gap: 9 }}>
            <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, rgba(221,227,213,.92), rgba(221,227,213,.55))', border: '2px solid rgba(24,53,43,.42)', overflow: 'hidden' }}>
              <Display kind={shop.item} color={shop.accent} />
              <div style={{ position: 'absolute', top: 0, left: '46%', width: 2, height: '100%', background: 'rgba(255,255,255,.5)' }} />
            </div>
            <div style={{ width: 78, position: 'relative', background: shop.accent, borderRadius: '4px 4px 0 0' }}>
              <div style={{ position: 'absolute', left: '18%', right: '18%', top: '8%', height: '42%', background: 'rgba(244,245,239,.32)', border: '2px solid rgba(244,245,239,.45)' }} />
              <div style={{ position: 'absolute', right: '18%', top: '58%', width: 8, height: 8, borderRadius: 99, background: C.off }} />
            </div>
          </div>

          {/* pavement label */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 15, textAlign: 'center', fontFamily: FONT.hand, fontSize: 24, color: C.muted, whiteSpace: 'nowrap' }}>
            {shop.sub}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ *
 * Opening composition
 * ------------------------------------------------------------------ */
export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const cz = camZ(frame);

  const hookT = ramp(frame, BEATS.hook, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  const ruleP = ramp(frame, BEATS.hook + 12, 12, EASE.smooth);
  const hotA = ramp(frame, BEATS.hotA - 12, 12, EASE.out) * (1 - ramp(frame, BEATS.hotB - 14, 10, EASE.smooth));
  const hotB = ramp(frame, BEATS.hotB - 8, 12, EASE.out);

  const sway = Math.sin(frame * 0.04) * 7;

  // road dashes, flowed by the camera position (world spacing = 5 units)
  const dashOffset = cz % 5;
  const dashes: { y: number; z: number }[] = [];
  for (let k = 1; k <= 15; k++) {
    const z = k * 5 - dashOffset;
    if (z < 1.2) continue;
    const y = VP.y + CAM_H * FOCAL / z;
    if (y > 1910) continue;
    dashes.push({ y, z });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#E8ECE1', overflow: 'hidden' }}>
      <Fonts />

      {/* sky */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: VP.y + 30, background: 'linear-gradient(180deg, #D7E2CF 0%, #E8ECE1 62%, #DFE6D7 100%)' }} />
      {/* soft clouds */}
      {[{ x: 180, y: 150, w: 260 }, { x: 760, y: 96, w: 210 }, { x: 500, y: 260, w: 170 }].map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.w * 0.3, borderRadius: 99, background: 'rgba(255,255,255,.55)', filter: 'blur(2px)', transform: `translateX(${sway * 0.25}px)` }} />
      ))}
      {/* distant town along the horizon */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: VP.y - 86, height: 90, opacity: 0.32 }}>
        <svg width={1080} height={90} viewBox="0 0 1080 90">
          {[30, 110, 190, 280, 370, 460, 560, 660, 760, 850, 950, 1030].map((x, i) => {
            const hh = 34 + ((i * 29) % 46);
            return <rect key={x} x={x} y={90 - hh} width={44 + ((i * 19) % 34)} height={hh} rx={2} fill={C.muted} opacity={0.6 + (i % 3) * 0.12} />;
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${sway}px)` }}>
        {/* ground + road + sidewalks */}
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
          <rect x={0} y={VP.y} width={1080} height={1920 - VP.y} fill="#E3E8DC" />
          {/* sidewalks */}
          <polygon points={`${VP.x},${VP.y} -260,1920 70,1920 ${VP.x - 12},${VP.y}`} fill={C.sage} opacity={0.75} />
          <polygon points={`${VP.x},${VP.y} 1010,1920 1340,1920 ${VP.x + 12},${VP.y}`} fill={C.sage} opacity={0.75} />
          {/* road */}
          <polygon points={`${VP.x - 8},${VP.y} 70,1920 1010,1920 ${VP.x + 8},${VP.y}`} fill="#C9D1C0" />
          {/* curbs */}
          <line x1={VP.x - 8} y1={VP.y} x2={70} y2={1920} stroke={C.muted} strokeWidth={8} opacity={0.55} />
          <line x1={VP.x + 8} y1={VP.y} x2={1010} y2={1920} stroke={C.muted} strokeWidth={8} opacity={0.55} />
          {/* moving centre dashes */}
          {dashes.map((d, i) => {
            const s = FOCAL / d.z;
            const dh = Math.min(150, Math.max(8, 2.2 * s));
            const dw = Math.min(20, Math.max(3, 0.25 * s));
            return <rect key={i} x={VP.x - dw / 2} y={d.y} width={dw} height={dh} rx={dw / 2} fill={C.off} opacity={0.32 + Math.min(0.55, s / 90)} />;
          })}
        </svg>

        {/* shopfronts on both sides of the road */}
        {SHOPS.map((shop) => (
          <ShopFront key={shop.name} shop={shop} cz={cz} hotA={hotA} hotB={hotB} />
        ))}
      </div>

      {/* street context label */}
      <div style={{ position: 'absolute', left: 48, top: 92, display: 'flex', alignItems: 'center', gap: 14, opacity: 0.82 * ramp(frame, 0, 14, EASE.out), background: 'rgba(255,255,255,.82)', border: '1px solid rgba(24,53,43,.14)', borderRadius: 10, padding: '10px 18px' }}>
        <div style={{ width: 12, height: 12, borderRadius: 99, background: C.forest }} />
        <div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 14, letterSpacing: '0.24em', color: C.forest }}>MAIN STREET</div>
          <div style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted, marginTop: 1 }}>shops along the road</div>
        </div>
      </div>

      {/* the hook — sits on the road, below the shopfronts */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1290, textAlign: 'center', opacity: hookT * (1 - outT), transform: `translateY(${(1 - hookT) * 46 - outT * 120}px)` }}>
        <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 0.94, color: C.forest, textShadow: '0 3px 0 rgba(244,245,239,.75)' }}>EVERY SHOP</div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 0.94, color: C.forest, textShadow: '0 3px 0 rgba(244,245,239,.75)' }}>HAS A STORY.</span>
          <div style={{ position: 'absolute', left: -4, bottom: 4, height: 15, borderRadius: 8, width: `${ruleP * 100}%`, background: C.sage }} />
        </div>
      </div>

      {/* captions synced to s1b */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 250, textAlign: 'center', fontFamily: FONT.hand, fontSize: 66, color: C.forest, opacity: hotA, transform: `translateY(${(1 - hotA) * 20}px) rotate(-1.4deg)`, textShadow: '0 2px 12px rgba(244,245,239,.9)' }}>
        the boutique on the corner
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 250, textAlign: 'center', fontFamily: FONT.hand, fontSize: 66, color: C.forest, opacity: hotB, transform: `translateY(${(1 - hotB) * 20}px) rotate(1.2deg)`, textShadow: '0 2px 12px rgba(244,245,239,.9)' }}>
        the tailor three doors down
      </div>

      <Tape w={250} rot={-9} tone="sage" style={{ left: -40, top: 96, opacity: 0.4 * ramp(frame, 0, 12, EASE.out) }} />
      <Tape w={220} rot={7} tone="sage" style={{ right: -34, bottom: 430, opacity: 0.3 * ramp(frame, 6, 12, EASE.out) }} />

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 96% 82% at 50% 52%, transparent 54%, rgba(137,153,130,.25) 100%)' }} />
    </AbsoluteFill>
  );
};
