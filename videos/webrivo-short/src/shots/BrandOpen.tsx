// Shot 01 — brand-ink-open (adapted): tape-crop marks → WEBRIVO letterpress
// glyph-by-glyph (scale 1.6→1 + blur→0, sage glint) → Caveat kicker typewriter
// → ≥1s hold → lift-out. Tuned params kept from the card's demo.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Badge, Fonts, ramp } from '../theme';

export const DURATION = 96;
// shot-local frames other files (audio cues) pin to
export const BEATS = { badge: 18, type: 36, out: 82 };
const WORD = 'WEBRIVO';

// main-street marquee: the businesses this studio builds for, drifting behind
// the wordmark (sets the story before a single line is spoken)
const TRADES = 'BAKERY · TAILOR · FLORIST · SALON · CAFE · PLUMBER · BOOKSHOP · STUDIO · PHARMACY · ELECTRICIAN · ';
const BAND_W = 1800;

const Marquee: React.FC<{
  frame: number; top: number; dir: 1 | -1; speed: number; size: number; opacity: number;
}> = ({ frame, top, dir, speed, size, opacity }) => {
  const t = (frame * speed) % BAND_W;
  const x = dir === 1 ? -BAND_W + t : -t;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top, overflow: 'hidden', opacity }}>
      <div
        style={{
          display: 'flex', width: 'max-content', whiteSpace: 'nowrap',
          transform: `translateX(${x}px)`,
          fontFamily: FONT.sans, fontWeight: 700, fontSize: size,
          letterSpacing: '0.18em', color: C.muted,
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i}>{TRADES}</span>
        ))}
      </div>
    </div>
  );
};

export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();

  // crop-mark draw-on (print-registration vibe), fades before the wordmark lands
  const vDraw = interpolate(frame, [0, 9], [100, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });
  const hDraw = interpolate(frame, [8, 18], [100, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });
  const markFade = interpolate(frame, [18, 28], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // badge: stamps in as the marks fade (scale 2.2 → 1, power4.in — site stamp move)
  const badgeT = ramp(frame, BEATS.badge, 10, EASE.power4In);
  const badgeScale = 2.2 - 1.2 * badgeT;
  const badgeRot = -24 + 15 * badgeT;

  // kicker typewriter (Caveat, hand-written)
  const KICK = 'websites for main street';
  const perChar = 0.95;
  const kickStart = BEATS.type;
  const kickChars = Math.floor(Math.max(0, frame - kickStart) / perChar);
  const kickDone = kickStart + KICK.length * perChar;
  const cursorOn = (() => {
    if (frame < kickStart) return false;
    if (frame < kickDone) return true;
    if (frame > 74) return false;
    return Math.floor((frame - kickDone) / 2) % 2 === 0;
  })();

  // hold the finished lockup, then lift+shrink+fade
  const out = ramp(frame, BEATS.out, 14, EASE.smooth);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.off,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `radial-gradient(1100px 750px at 50% 42%, ${C.white}, transparent 65%)`,
      }}
    >
      {/* main-street marquee bands — the story's setting */}
      <Marquee frame={frame} top={188} dir={1} speed={1.15} size={34} opacity={0.24 * (1 - out)} />
      <Marquee frame={frame} top={1600} dir={-1} speed={0.85} size={34} opacity={0.24 * (1 - out)} />

        <div style={{ textAlign: 'center', opacity: 1 - out, transform: `translateY(${-out * 40}px) scale(${1 - out * 0.12})` }}>
          {/* registration marks */}
          <svg width={72} height={72} viewBox="0 0 72 72" style={{ display: 'block', margin: '0 auto 4px', opacity: markFade }}>
          <line x1={36} y1={2} x2={36} y2={70} stroke={C.muted} strokeWidth={4} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={vDraw} />
          <line x1={2} y1={36} x2={70} y2={36} stroke={C.muted} strokeWidth={4} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={hDraw} />
        </svg>

        <div
          style={{
            display: 'inline-block', transform: `scale(${badgeScale}) rotate(${badgeRot}deg)`,
            opacity: badgeT, transformOrigin: 'center', margin: '0 auto 26px',
          }}
        >
          <Badge size={132} />
        </div>

        {/* wordmark: glyph-by-glyph letterpress */}
        <div
          style={{
            fontFamily: FONT.display, fontSize: 208, color: C.forest,
            letterSpacing: '0.01em', lineHeight: 1, whiteSpace: 'pre',
            display: 'flex', justifyContent: 'center',
          }}
        >
          {WORD.split('').map((ch, i) => {
            const delay = 12 + i * 3.2;
            const t = interpolate(frame, [delay, delay + 12], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.press,
            });
            const glintCenter = delay + 12;
            const glint = interpolate(frame, [glintCenter - 4, glintCenter, glintCenter + 4], [0, 1, 0], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  position: 'relative', display: 'inline-block', opacity: t,
                  transform: `scale(${1.6 - 0.6 * t})`, transformOrigin: 'center bottom',
                  filter: `blur(${(1 - t) * 6}px)`,
                }}
              >
                {ch}
                <span
                  style={{
                    position: 'absolute', left: '50%', bottom: -10, transform: 'translateX(-50%)',
                    width: `${glint * 100}%`, height: 6, background: C.sage, opacity: glint, borderRadius: 3,
                  }}
                />
              </span>
            );
          })}
        </div>

        {/* hand kicker + block cursor */}
        <div
          style={{
            fontFamily: FONT.hand, fontSize: 54, color: C.muted,
            marginTop: 30, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <span style={{ whiteSpace: 'pre' }}>{KICK.slice(0, kickChars)}</span>
          <span style={{ display: 'inline-block', width: 4, height: 48, marginLeft: 6, background: C.muted, opacity: cursorOn ? 0.85 : 0 }} />
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
