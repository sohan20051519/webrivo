// Shot 02 — hero, built from UI components (no screenshot): the promise
// "GET FOUND. GET CHOSEN." lands on a forest field, then the supporting
// line + CTA settle; badge stamps; exits by whipping up.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Badge, Fonts, ramp, bell } from '../theme';

export const DURATION = 240;

export const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 0, 16, EASE.out);
  const outT = ramp(frame, 224, 16, EASE.power4In);

  const badgeT = ramp(frame, 12, 10, EASE.power4In);
  const badgeScale = 2.2 - 1.2 * badgeT;
  const badgeRot = -24 + 15 * badgeT;

  const headT = ramp(frame, 26, 14, EASE.power4In);
  const subT = ramp(frame, 52, 12, EASE.out);
  const ctaT = ramp(frame, 78, 12, EASE.power4In);
  const stampT = ramp(frame, 150, 14, EASE.power4In);
  const stampRot = 14 - 26 * stampT;

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      {/* field vignette */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 90% 70% at 50% 46%, rgba(221,227,213,.12), transparent 62%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 100% 90% at 50% 50%, transparent 40%, rgba(8,18,14,.7) 100%)` }} />

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - inT) * 320 - outT * 2500}px) rotate(${(1 - inT) * -6 + outT * 10}deg)`, transformOrigin: '540px 960px', opacity: 1 - outT }}>

        {/* badge */}
        <div style={{ position: 'absolute', left: 80, top: 150, transform: `scale(${badgeScale}) rotate(${badgeRot}deg)`, opacity: badgeT, transformOrigin: 'center' }}>
          <Badge size={132} tone="dark" />
        </div>

        {/* headline */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', opacity: headT, transform: `translateY(${(1 - headT) * 40}px)` }}>
          <div style={{ fontFamily: FONT.display, fontSize: 152, lineHeight: 0.92, color: C.off, letterSpacing: '0.01em' }}>GET FOUND.</div>
          <div style={{ fontFamily: FONT.display, fontSize: 152, lineHeight: 0.92, color: C.sage, letterSpacing: '0.01em', marginTop: 6 }}>GET CHOSEN.</div>
        </div>

        {/* subcopy */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', opacity: subT, transform: `translateY(${(1 - subT) * 24}px)` }}>
          <span style={{ fontFamily: FONT.hand, fontSize: 62, color: C.off }}>websites for main street</span>
          <span style={{ display: 'block', marginTop: 14, fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, letterSpacing: '0.22em', color: C.muted }}>HOSTING · MAINTENANCE · DOMAIN INCLUDED</span>
        </div>

        {/* CTA */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1040, textAlign: 'center', opacity: ctaT, transform: `scale(${0.85 + 0.15 * ctaT})` }}>
          <span style={{
            display: 'inline-block', background: C.sage, color: C.forest,
            fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, letterSpacing: '0.16em',
            padding: '20px 46px', borderRadius: 999, boxShadow: '0 14px 34px rgba(0,0,0,.35)',
          }}>
            START A PROJECT →
          </span>
        </div>

        {/* location pin */}
        <div style={{ position: 'absolute', right: 120, top: 300, opacity: 0.9 * inT, transform: 'rotate(12deg)' }}>
          <svg width={72} height={96} viewBox="0 0 72 96">
            <path d="M36 0 C16 0 0 16 0 36 C0 62 36 96 36 96 C36 96 72 62 72 36 C72 16 56 0 36 0 Z" fill={C.sage} />
            <circle cx={36} cy={36} r={12} fill={C.forest} />
          </svg>
        </div>

        {/* stamp */}
        <div style={{ position: 'absolute', right: 74, bottom: 170, opacity: stampT, transform: `rotate(${stampRot}deg) scale(${0.8 + 0.2 * stampT})`, transformOrigin: 'center' }}>
          <div style={{ fontFamily: FONT.hand, fontSize: 58, color: C.off, lineHeight: 1.05, textAlign: 'center' }}>
            built by hand,<br />in town
          </div>
        </div>

        {/* daisies */}
        <div style={{ position: 'absolute', left: 88, top: 250, transform: 'rotate(-14deg)', opacity: 0.9 }}>
          <DaisyInline size={64} />
        </div>
        <div style={{ position: 'absolute', right: 96, top: 640, transform: 'rotate(18deg)', opacity: 0.75 }}>
          <DaisyInline size={44} />
        </div>
      </div>

      <Tape w={200} rot={-40} tone="clear" style={{ left: -60, top: 140, opacity: inT }} />
      <Tape w={200} rot={40} tone="clear" style={{ right: -60, top: 140, opacity: inT }} />
      <Grain opacity={0.1} />
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