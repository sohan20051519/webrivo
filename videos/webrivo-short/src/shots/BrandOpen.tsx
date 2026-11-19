// Shot 01 — street-drive open, 210f.
// A realistic-feeling street scene: we move along a road and pass shop fronts,
// so the film opens on real businesses on a real street. The camera advances
// down the road, boutique and tailor come into view as the voice names them.
// Same DURATION/BEATS contract as before (audio cues pinned to B1).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 210;

// shot-local frames the audio pins to (keep contract)
export const BEATS = { hook: 12, out: 80, hotA: 104, hotB: 146, end: 203 };

// world layout: camera moves forward along z; shops sit on left/right of road
// z = distance ahead of camera start. We choose positions so boutique arrives
// near hotA and tailor near hotB while earlier shops pass during the intro.
type Shop = {
  name: string;
  sub: string;
  side: 'left' | 'right';
  z: number; // world distance
  w: number;
  h: number;
  awning: string;
  accent: string;
  hot?: 0 | 1; // index into hot captions
};

const SHOPS: Shop[] = [
  { name: 'GROCERY', sub: 'daily needs', side: 'left', z: 18, w: 320, h: 360, awning: '#8FA07E', accent: '#2F5A45' },
  { name: 'SALON', sub: 'cuts & care', side: 'right', z: 26, w: 300, h: 340, awning: C.sage, accent: C.muted },
  { name: 'FLORIST', sub: 'fresh blooms', side: 'left', z: 34, w: 290, h: 330, awning: '#C7D4B8', accent: '#5E7A5A' },
  { name: 'BOUTIQUE', sub: 'styles for you', side: 'right', z: 44, w: 360, h: 380, awning: C.sage, accent: C.forest, hot: 0 },
  { name: 'CAFE', sub: 'tea & snacks', side: 'left', z: 52, w: 300, h: 340, awning: '#B9C8A8', accent: '#4A6A52' },
  { name: 'TAILOR', sub: 'perfect fit', side: 'left', z: 60, w: 340, h: 360, awning: '#D6DEC9', accent: C.forest, hot: 1 },
  { name: 'BAKERY', sub: 'fresh daily', side: 'right', z: 68, w: 300, h: 330, awning: '#C4D0B6', accent: '#6B8260' },
];

// camera travels forward over time (world units)
const camZ = (f: number) => {
  // ease in, cruise, then slow near end as we settle on tailor
  if (f <= 10) return 2 + 2 * ramp(f, 0, 10, EASE.out);
  if (f <= 90) return 4 + 22 * ramp(f, 10, 80, EASE.smooth);
  if (f <= 130) return 26 + 16 * ramp(f, 90, 40, EASE.smooth);
  if (f <= 160) return 42 + 12 * ramp(f, 130, 30, EASE.smooth);
  return 54 + 4 * ramp(f, 160, 50, EASE.smooth);
};

// project a world point (x lateral, y up, z depth from camera) to screen
// simple perspective: scale = fov / (z - camZ)
const VP = { x: 540, y: 520 }; // vanishing point
const FOV = 900;

const project = (wx: number, wy: number, wz: number, cz: number) => {
  const dz = Math.max(0.6, wz - cz);
  const s = FOV / dz;
  return { x: VP.x + wx * s, y: VP.y - wy * s, s, dz };
};

const ShopFront: React.FC<{ shop: Shop; cz: number; frame: number; focus: number }> = ({ shop, cz, frame, focus }) => {
  const rel = shop.z - cz;
  if (rel < 1.2 || rel > 40) return null;
  const base = project(shop.side === 'left' ? -3.4 : 3.4, 0, shop.z, cz);
  const scale = base.s;
  const w = shop.w * scale;
  const h = shop.h * scale;
  const x = base.x + (shop.side === 'left' ? -w : 0);
  const y = base.y - h;
  const fadeIn = ramp(rel, 38, 8, EASE.out);
  const fadeOut = 1 - ramp(rel, 1.2, 1.6, EASE.smooth);
  const alpha = Math.max(0, Math.min(1, fadeIn * (0.25 + 0.75 * fadeOut)));
  const dim = focus > 0.01 && shop.hot === undefined ? 1 - 0.45 * focus : 1;
  const pop = shop.hot === 0 ? 1 + 0.04 * focus : shop.hot === 1 ? 1 + 0.04 * focus : 1;

  // window grid
  const cols = 2;
  const rows = 2;
  const pad = 18 * scale;
  const winW = (w - pad * 3) / cols;
  const winH = (h * 0.38 - pad * 2) / rows;

  return (
    <div
      style={{
        position: 'absolute', left: x, top: y, width: w, height: h,
        opacity: alpha * dim,
        transform: `scale(${pop})`,
        transformOrigin: shop.side === 'left' ? 'right bottom' : 'left bottom',
      }}
    >
      {/* building body */}
      <div style={{ position: 'absolute', inset: 0, background: C.white, borderRadius: 6 * scale, boxShadow: `0 ${8 * scale}px ${20 * scale}px rgba(24,53,43,${0.18 * alpha})`, overflow: 'hidden', border: `${Math.max(1, 1.5 * scale)}px solid rgba(24,53,43,.12)` }}>
        {/* awning */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: h * 0.22, background: shop.awning }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: Math.max(2, 6 * scale), background: 'rgba(24,53,43,.12)' }} />
          {/* scallops */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -Math.max(2, 8 * scale), height: Math.max(4, 14 * scale), display: 'flex' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ flex: 1, background: shop.awning, borderRadius: `0 0 ${8 * scale}px ${8 * scale}px` }} />
            ))}
          </div>
        </div>
        {/* sign */}
        <div style={{ position: 'absolute', left: pad, right: pad, top: h * 0.05, height: h * 0.12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: Math.max(10, 34 * scale), letterSpacing: '0.12em', color: shop.accent, textAlign: 'center', lineHeight: 1 }}>
            {shop.name}
          </div>
        </div>
        {/* windows */}
        <div style={{ position: 'absolute', left: pad, top: h * 0.28, width: w - pad * 2, height: h * 0.38, display: 'grid', gridTemplateColumns: `1fr 1fr`, gap: pad }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ background: 'linear-gradient(180deg, rgba(221,227,213,.85), rgba(221,227,213,.45))', borderRadius: 3 * scale, border: `${Math.max(1, 1.2 * scale)}px solid rgba(24,53,43,.12)`, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: Math.max(1, 1.5 * scale), background: 'rgba(24,53,43,.1)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: Math.max(1, 1.5 * scale), background: 'rgba(24,53,43,.1)' }} />
            </div>
          ))}
        </div>
        {/* door */}
        <div style={{ position: 'absolute', left: w * 0.38, bottom: 0, width: w * 0.24, height: h * 0.28, background: shop.accent, borderRadius: `${4 * scale}px ${4 * scale}px 0 0` }}>
          <div style={{ position: 'absolute', right: '18%', top: '52%', width: Math.max(2, 5 * scale), height: Math.max(2, 5 * scale), borderRadius: 99, background: 'rgba(244,245,239,.8)' }} />
        </div>
        {/* sub label on glass */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: h * 0.30, textAlign: 'center', fontFamily: FONT.hand, fontSize: Math.max(8, 22 * scale), color: C.muted, opacity: 0.9 }}>
          {shop.sub}
        </div>
      </div>
    </div>
  );
};

export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const cz = camZ(frame);

  const hookT = ramp(frame, BEATS.hook, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  const ruleP = ramp(frame, BEATS.hook + 12, 12, EASE.smooth);
  const hotA = ramp(frame, BEATS.hotA - 10, 12, EASE.out) * (1 - ramp(frame, BEATS.hotB - 14, 10, EASE.smooth));
  const hotB = ramp(frame, BEATS.hotB - 6, 12, EASE.out);
  const focus = Math.max(hotA, hotB);
  const roadScroll = cz * 60;

  // subtle camera sway
  const sway = Math.sin(frame * 0.04) * 6;

  return (
    <AbsoluteFill style={{ backgroundColor: '#E8ECE1', overflow: 'hidden' }}>
      <Fonts />

      {/* sky */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 780, background: `linear-gradient(180deg, #D9E3D0 0%, #E8ECE1 70%, ${C.sage} 100%)` }} />
      {/* distant buildings silhouette */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 430, height: 160, opacity: 0.35 }}>
        <svg width={1080} height={160} viewBox="0 0 1080 160">
          {[40, 120, 210, 320, 420, 520, 640, 760, 860, 960, 1040].map((x, i) => {
            const h = 60 + ((i * 37) % 70);
            return <rect key={x} x={x} y={160 - h} width={50 + ((i * 23) % 40)} height={h} rx={2} fill={C.muted} opacity={0.5 + ((i % 3) * 0.15)} />;
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${sway}px)` }}>
        {/* road (perspective trapezoid) */}
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
          {/* ground */}
          <rect x={0} y={520} width={1080} height={1400} fill="#E3E8DC" />
          {/* road surface */}
          <polygon points={`${VP.x},${VP.y} -80,1980 ${VP.x + 40},${VP.y} 1160,1980`} fill="#C9D1C0" />
          {/* road edges */}
          <line x1={VP.x} y1={VP.y} x2={-40} y2={1980} stroke={C.muted} strokeWidth={10} opacity={0.5} />
          <line x1={VP.x} y1={VP.y} x2={1120} y2={1980} stroke={C.muted} strokeWidth={10} opacity={0.5} />
          {/* lane markings moving toward camera */}
          {Array.from({ length: 10 }).map((_, i) => {
            const t = ((roadScroll / 120) + i) % 10;
            const p = t / 10; // 0 far, 1 near
            const y = VP.y + (1920 - VP.y) * Math.pow(p, 1.6);
            const h = 20 + 80 * Math.pow(p, 1.4);
            const w = 4 + 18 * p;
            if (y > 1940) return null;
            return <rect key={i} x={VP.x - w / 2} y={y} width={w} height={h} rx={w / 2} fill={C.off} opacity={0.3 + 0.5 * p} />;
          })}
          {/* sidewalks */}
          <polygon points={`${VP.x},${VP.y} -80,1980 -220,1980 420,${VP.y + 60}`} fill={C.sage} opacity={0.55} />
          <polygon points={`${VP.x},${VP.y} 1160,1980 1300,1980 660,${VP.y + 60}`} fill={C.sage} opacity={0.55} />
        </svg>

        {/* shop fronts */}
        {SHOPS.map((shop) => (
          <ShopFront key={shop.name} shop={shop} cz={cz} frame={frame} focus={focus} />
        ))}
      </div>

      {/* street label / context */}
      <div style={{ position: 'absolute', left: 54, top: 110, opacity: 0.7 * ramp(frame, 0, 14, EASE.out), background: 'rgba(255,255,255,.78)', border: '1px solid rgba(24,53,43,.14)', borderRadius: 8, padding: '12px 18px' }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 13, letterSpacing: '0.26em', color: C.forest }}>MAIN STREET</div>
        <div style={{ fontFamily: FONT.hand, fontSize: 28, color: C.muted, marginTop: 2 }}>shops along the road</div>
      </div>

      {/* spotlight softening when focusing a shop */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle 520px at 540px 980px, rgba(244,245,239,0) 0%, rgba(244,245,239,.35) 55%, rgba(244,245,239,.6) 100%)`, opacity: focus }} />

      {/* the hook */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1216, textAlign: 'center',
          opacity: hookT * (1 - outT),
          transform: `translateY(${(1 - hookT) * 46 - outT * 120}px)`,
        }}
      >
        <div style={{ fontFamily: FONT.display, fontSize: 140, lineHeight: 0.94, color: C.forest, textShadow: '0 2px 0 rgba(244,245,239,.6)' }}>
          EVERY SHOP
        </div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 140, lineHeight: 0.94, color: C.forest, textShadow: '0 2px 0 rgba(244,245,239,.6)' }}>
            HAS A STORY.
          </span>
          <div style={{ position: 'absolute', left: -4, bottom: 4, height: 15, borderRadius: 8, width: `${ruleP * 100}%`, background: C.sage }} />
        </div>
      </div>

      {/* captions synced to s1b */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 236, textAlign: 'center', fontFamily: FONT.hand, fontSize: 64, color: C.forest, opacity: hotA, transform: `translateY(${(1 - hotA) * 20}px) rotate(-1.4deg)`, textShadow: '0 2px 10px rgba(244,245,239,.8)' }}>
        the boutique on the corner
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 236, textAlign: 'center', fontFamily: FONT.hand, fontSize: 64, color: C.forest, opacity: hotB, transform: `translateY(${(1 - hotB) * 20}px) rotate(1.2deg)`, textShadow: '0 2px 10px rgba(244,245,239,.8)' }}>
        the tailor three doors down
      </div>

      <Tape w={250} rot={-9} tone="sage" style={{ left: -40, top: 96, opacity: 0.45 * ramp(frame, 0, 12, EASE.out) }} />
      <Tape w={220} rot={7} tone="sage" style={{ right: -34, bottom: 420, opacity: 0.35 * ramp(frame, 6, 12, EASE.out) }} />

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 96% 82% at 50% 52%, transparent 54%, rgba(137,153,130,.25) 100%)` }} />
    </AbsoluteFill>
  );
};
