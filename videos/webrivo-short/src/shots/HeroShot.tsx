// Shot 02 — the story beat: a customer three streets away is searching right
// now. A real search UI types "bakery near me", results resolve, and the
// customer lands on YOUR SHOP — then the promise takes the frame:
// GET FOUND. / GET CHOSEN. Built from UI components only (no screenshots).
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Badge, Fonts, ramp, bell } from '../theme';

export const DURATION = 240;

const QUERY = 'bakery near me';

// story beats (shot-local frames)
const TYPE_START = 12;
const TYPE_PER = 3.2;   // frames per character
const ROW_A = 42;       // "another bakery"
const ROW_B = 58;       // "your shop" — the found moment
const NOTE = 74;
const CARD_OUT = 92;    // search card leaves, promise takes the frame

const Magnifier: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={10.5} cy={10.5} r={6.5} stroke={color} strokeWidth={2.4} />
    <line x1={15.4} y1={15.4} x2={21} y2={21} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);

const Pin: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size * 1.33} viewBox="0 0 72 96">
    <path d="M36 0 C16 0 0 16 0 36 C0 62 36 96 36 96 C36 96 72 62 72 36 C72 16 56 0 36 0 Z" fill={color} />
    <circle cx={36} cy={36} r={12} fill={C.forest} />
  </svg>
);

const ResultRow: React.FC<{
  title: string; meta: string; hl?: boolean; found?: boolean; t: number;
}> = ({ title, meta, hl, found, t }) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', gap: 18,
      background: hl ? C.forest : 'rgba(221,227,213,.45)',
      borderRadius: 16, padding: '20px 24px',
      transform: `translateY(${(1 - t) * 26}px) scale(${0.97 + 0.03 * t})`,
      opacity: t,
      boxShadow: hl ? '0 18px 40px rgba(24,53,43,.35)' : 'none',
      border: hl ? 'none' : `1px solid rgba(24,53,43,.08)`,
    }}
  >
    <div
      style={{
        width: 54, height: 54, borderRadius: 12, flexShrink: 0,
        background: hl ? C.sage : 'rgba(255,255,255,.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Pin size={22} color={hl ? C.forest : C.muted} />
    </div>
    <div style={{ flex: 1, textAlign: 'left' }}>
      <div
        style={{
          fontFamily: hl ? FONT.display : FONT.sans,
          fontWeight: hl ? 400 : 700,
          fontSize: hl ? 42 : 30,
          letterSpacing: hl ? '0.02em' : '0.01em',
          color: hl ? C.off : C.forest,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONT.sans, fontWeight: 600, fontSize: 22,
          color: hl ? C.sage : C.muted, marginTop: 4,
        }}
      >
        {meta}
      </div>
    </div>
    {found ? (
      <div
        style={{
          background: C.sage, color: C.forest, borderRadius: 999,
          fontFamily: FONT.sans, fontWeight: 800, fontSize: 20,
          letterSpacing: '0.14em', padding: '10px 18px',
          transform: `scale(${0.6 + 0.4 * t})`,
        }}
      >
        FOUND
      </div>
    ) : null}
  </div>
);

export const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();

  const inT = ramp(frame, 0, 14, EASE.out);
  const outT = ramp(frame, 224, 16, EASE.power4In);

  // search card
  const cardT = ramp(frame, 0, 12, EASE.out);
  const cardOut = ramp(frame, CARD_OUT, 14, EASE.power4In);
  const typed = Math.max(0, Math.min(QUERY.length, Math.floor((frame - TYPE_START) / TYPE_PER)));
  const caretOn = frame % 16 < 9 && frame < TYPE_START + QUERY.length * TYPE_PER + 10;
  const rowAT = ramp(frame, ROW_A, 10, EASE.out);
  const rowBT = ramp(frame, ROW_B, 10, EASE.outBack);
  const foundT = ramp(frame, ROW_B + 8, 8, EASE.power4In);
  const noteT = ramp(frame, NOTE, 10, EASE.out);

  // promise
  const badgeT = ramp(frame, 104, 10, EASE.power4In);
  const badgeScale = 2.2 - 1.2 * badgeT;
  const badgeRot = -24 + 15 * badgeT;
  const headT = ramp(frame, 110, 12, EASE.power4In);
  const subT = ramp(frame, 136, 12, EASE.out);
  const ctaT = ramp(frame, 162, 12, EASE.power4In);
  const stampT = ramp(frame, 188, 12, EASE.power4In);
  const stampRot = 14 - 26 * stampT;

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      {/* field light */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 90% 70% at 50% 46%, rgba(221,227,213,.12), transparent 62%)` }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 100% 90% at 50% 50%, transparent 40%, rgba(8,18,14,.72) 100%)` }} />

      {/* ── story beat: the search ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 560,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14,
          opacity: Math.min(cardT, 1 - cardOut),
          transform: `translateY(${(1 - cardT) * 30}px)`,
        }}
      >
        <Pin size={16} color={C.sage} />
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, letterSpacing: '0.26em', color: C.sage }}>
          RIGHT NOW · THREE STREETS AWAY
        </span>
      </div>

      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 640,
          display: 'flex', justifyContent: 'center',
          opacity: Math.min(cardT, 1 - cardOut),
          transform: `translateY(${(1 - cardT) * 60 - cardOut * 220}px) scale(${1 - cardOut * 0.08})`,
        }}
      >
        <div
          style={{
            width: 880, boxSizing: 'border-box', background: C.off, borderRadius: 26,
            padding: '30px 30px 26px', boxShadow: '0 50px 110px rgba(0,0,0,.55)',
          }}
        >
          {/* search field */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: C.sage, borderRadius: 16, padding: '22px 26px',
            }}
          >
            <Magnifier size={34} color={C.forest} />
            <div style={{ flex: 1, textAlign: 'left', fontFamily: FONT.sans, fontWeight: 600, fontSize: 38, color: C.forest, whiteSpace: 'pre' }}>
              {QUERY.slice(0, typed)}
              <span style={{ display: 'inline-block', width: 3, height: 36, background: C.forest, marginLeft: 3, opacity: caretOn ? 0.9 : 0, verticalAlign: '-4px' }} />
            </div>
          </div>

          {/* results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            <ResultRow title="Another bakery" meta="1.2 km · closed" t={rowAT} />
            <ResultRow title="YOUR SHOP" meta="0.3 km · open now" hl t={rowBT} found={foundT > 0.5} />
          </div>

          {/* hand note */}
          <div
            style={{
              fontFamily: FONT.hand, fontSize: 40, color: C.muted,
              textAlign: 'right', marginTop: 14, opacity: noteT,
              transform: `rotate(-1.4deg) translateY(${(1 - noteT) * 10}px)`,
            }}
          >
            this is the moment they pick you
          </div>
        </div>
      </div>

      {/* ── promise ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${(1 - inT) * 320 - outT * 2500}px) rotate(${(1 - inT) * -6 + outT * 10}deg)`,
          transformOrigin: '540px 960px', opacity: 1 - outT,
        }}
      >
        {/* badge */}
        <div style={{ position: 'absolute', left: 80, top: 140, transform: `scale(${badgeScale}) rotate(${badgeRot}deg)`, opacity: badgeT, transformOrigin: 'center' }}>
          <Badge size={132} tone="dark" />
        </div>

        {/* headline */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', opacity: headT, transform: `translateY(${(1 - headT) * 44}px)` }}>
          <div style={{ fontFamily: FONT.display, fontSize: 150, lineHeight: 0.92, color: C.off, letterSpacing: '0.01em' }}>GET FOUND.</div>
          <div style={{ fontFamily: FONT.display, fontSize: 150, lineHeight: 0.92, color: C.sage, letterSpacing: '0.01em', marginTop: 8 }}>GET CHOSEN.</div>
        </div>

        {/* subcopy */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', opacity: subT, transform: `translateY(${(1 - subT) * 24}px)` }}>
          <span style={{ fontFamily: FONT.hand, fontSize: 64, color: C.off }}>websites for main street</span>
          <span style={{ display: 'block', marginTop: 16, fontFamily: FONT.sans, fontWeight: 600, fontSize: 28, letterSpacing: '0.2em', color: C.muted }}>HOSTING · MAINTENANCE · DOMAIN INCLUDED</span>
        </div>

        {/* CTA */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1010, textAlign: 'center', opacity: ctaT, transform: `scale(${0.85 + 0.15 * ctaT})` }}>
          <span
            style={{
              display: 'inline-block', background: C.sage, color: C.forest,
              fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, letterSpacing: '0.16em',
              padding: '20px 46px', borderRadius: 999, boxShadow: '0 14px 34px rgba(0,0,0,.35)',
            }}
          >
            START A PROJECT →
          </span>
        </div>

        {/* stamp */}
        <div style={{ position: 'absolute', right: 74, bottom: 200, opacity: stampT, transform: `rotate(${stampRot}deg) scale(${0.8 + 0.2 * stampT})`, transformOrigin: 'center' }}>
          <div style={{ fontFamily: FONT.hand, fontSize: 56, color: C.off, lineHeight: 1.05, textAlign: 'center' }}>
            built by hand,<br />in town
          </div>
        </div>

        {/* daisies */}
        <div style={{ position: 'absolute', left: 84, top: 1660, transform: 'rotate(-14deg)', opacity: 0.85 * headT }}>
          <DaisyInline size={62} />
        </div>
        <div style={{ position: 'absolute', right: 96, top: 296, transform: 'rotate(18deg)', opacity: 0.7 * headT }}>
          <DaisyInline size={42} />
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
