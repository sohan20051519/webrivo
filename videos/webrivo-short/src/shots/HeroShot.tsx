// Shot 02 — spotlight-hero-card (adapted): the real hero capture floats as a
// taped print on a forest board; the camera crashes in on "GET FOUND." and
// pulls back to the whole page under a tracking spotlight; a Caveat stamp
// signs off; exits by whipping up. Camera: translate(T = C − F·z) · scale(z),
// transformOrigin 0 0 — F (page px) lands dead-centre at every anchor.
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp } from '../theme';

export const DURATION = 240;

const PAGE_W = 1440;
const PAGE_H = 900;
const PRINT_W = 1620;
const PRINT_H = PRINT_W * (PAGE_H / PAGE_W); // 1012.5
const printLeft = (1080 - PRINT_W) / 2; // -270
const printTop = (1920 - PRINT_H) / 2;

// camera anchors: focus point in page CSS px + zoom.
// The headline is ~962 page px wide ≈ the whole visible width, so the opening
// frames it full-bleed (z≈1.04) and settles with a gentle drift — never clips mid-word.
const ANCH: { f: number; cx: number; cy: number; z: number; rot: number }[] = [
  { f: 0,   cx: 722, cy: 328, z: 1.04, rot: 1.4 },
  { f: 90,  cx: 722, cy: 400, z: 1.02, rot: 0.3 },
  { f: 170, cx: 720, cy: 430, z: 1.02, rot: 0 },
  { f: 240, cx: 720, cy: 440, z: 1.02, rot: 0 },
];
const hermite = (xs: number[], ys: number[]) => {
  const n = xs.length;
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x));
  const m = xs.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? 0 : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b;
    if (h > 9) { const k = 3 / Math.sqrt(h); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
  }
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (i < n - 2 && x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i];
    const t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
};
const P = ANCH.map((a) => a.f);
const CX = hermite(P, ANCH.map((a) => a.cx));
const CY = hermite(P, ANCH.map((a) => a.cy));
const Z = hermite(P, ANCH.map((a) => a.z));
const ROT = hermite(P, ANCH.map((a) => a.rot));

export const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const z = Z(frame);
  const cx = CX(frame);
  const cy = CY(frame);
  const rot = ROT(frame);

  const inT = ramp(frame, 0, 16, EASE.out);
  const outT = ramp(frame, 224, 16, EASE.power4In);

  // print-local focus point and camera translate
  const s0 = PRINT_W / PAGE_W; // page px → print px
  const Fx = cx * s0;
  const Fy = cy * s0;
  const Tx = PRINT_W / 2 - Fx * z;
  const Ty = PRINT_H / 2 - Fy * z;

  // spotlight hole tracks the focus on screen
  const screenX = printLeft + Fx + (1 - inT) * 0;
  const screenY = printTop + Fy + (1 - inT) * -200;
  const holeR = 200 + z * 260;

  const stampT = ramp(frame, 150, 14, EASE.power4In);
  const stampRot = 14 - 26 * stampT;

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      <AbsoluteFill style={{ transform: `translateY(${(1 - inT) * 320 - outT * 2500}px) rotate(${(1 - inT) * -6 + outT * 10}deg)`, transformOrigin: '540px 960px' }}>
        {/* the print */}
        <div
          style={{
            position: 'absolute', left: printLeft, top: printTop, width: PRINT_W, height: PRINT_H,
            transform: `rotate(${rot}deg)`, transformOrigin: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 12,
              boxShadow: '0 60px 160px rgba(0,0,0,.65), 0 14px 40px rgba(0,0,0,.5)',
            }}
          >
            <div
              style={{
                position: 'absolute', inset: 0,
                transform: `translate(${Tx}px, ${Ty}px) scale(${z})`,
                transformOrigin: '0 0',
              }}
            >
              <Img src={staticFile('captures/hero.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
          {/* tape corners */}
          <Tape w={200} rot={-40} tone="clear" style={{ left: -60, top: -14 }} />
          <Tape w={200} rot={40} tone="clear" style={{ right: -60, top: -14 }} />
          <Tape w={200} rot={40} tone="clear" style={{ left: -60, bottom: -14 }} />
          <Tape w={200} rot={-40} tone="clear" style={{ right: -60, bottom: -14 }} />
        </div>
      </AbsoluteFill>

      {/* spotlight */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at ${screenX}px ${screenY}px, transparent ${holeR * 0.55}px, rgba(16,34,27,.8) ${holeR}px)`,
          opacity: ramp(frame, 8, 6, EASE.out) * (1 - ramp(frame, 198, 24, EASE.smooth) * 0.85),
        }}
      />

      {/* Caveat stamp */}
      <div
        style={{
          position: 'absolute', right: 74, bottom: 170, opacity: stampT,
          transform: `rotate(${stampRot}deg) scale(${0.8 + 0.2 * stampT})`,
          transformOrigin: 'center',
        }}
      >
        <div style={{ fontFamily: FONT.hand, fontSize: 58, color: C.off, lineHeight: 1.05, textAlign: 'center' }}>
          built by hand,
          <br />
          in town
        </div>
      </div>

      {/* punch caption while the camera is tight */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 130, textAlign: 'center',
          opacity: ramp(frame, 26, 10, EASE.power4In) * (1 - ramp(frame, 96, 14, EASE.smooth)),
        }}
      >
        <span
          style={{
            display: 'inline-block', background: C.forest, color: C.off,
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, letterSpacing: '0.16em',
            padding: '14px 26px', borderRadius: 8, transform: 'rotate(-2deg)',
          }}
        >
          THE WHOLE JOB, ONE LINE
        </span>
      </div>

      {/* daisies */}
      <div style={{ position: 'absolute', left: 88, top: 250, transform: 'rotate(-14deg)', opacity: 0.9 }}>
        <DaisyInline size={64} />
      </div>
      <div style={{ position: 'absolute', right: 96, top: 640, transform: 'rotate(18deg)', opacity: 0.75 }}>
        <DaisyInline size={44} />
      </div>

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 80% at 50% 44%, transparent 55%, rgba(10,22,17,.55) 100%)' }} />
    </AbsoluteFill>
  );
};

const DaisyInline: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse key={i} cx="20" cy="9" rx="4.6" ry="8.4" fill={C.off} transform={`rotate(${i * 45} 20 20)`} />
    ))}
    <circle cx="20" cy="20" r="6" fill={C.sage} />
  </svg>
);
