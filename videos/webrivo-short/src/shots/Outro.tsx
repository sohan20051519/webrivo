// Shot 10 — outro-group-photo-launch + logo-shrink-wordmark-lockup (adapted):
// everything the film showed gathers around the wordmark — badge, the three
// plan cards, tape & daisies — then WEBRIVO locks up with the sign-off and
// real contact details. ≥60f hold before the end.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Badge, Fonts, ramp, bell } from '../theme';

export const DURATION = 220;

const PLANS = [
  { tier: 'BASIC', price: '₹599', x: 84, y: 1030, rot: -7, start: 26 },
  { tier: 'BUSINESS', price: '₹1,199', x: 415, y: 1075, rot: 2, start: 38, best: true },
  { tier: 'PREMIUM', price: '₹2,199', x: 746, y: 1030, rot: 7, start: 50 },
];

const MiniPlan: React.FC<{ tier: string; price: string; best?: boolean }> = ({ tier, price, best }) => (
  <div
    style={{
      width: 250, height: 339, background: C.white, borderRadius: 12,
      padding: '22px 20px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 20px 40px rgba(0,0,0,.35)',
      border: best ? `3px solid ${C.sage}` : '1px solid rgba(24,53,43,.1)',
      position: 'relative',
    }}
  >
    {best ? (
      <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%) rotate(-6deg)', background: C.sage, color: C.forest, fontFamily: FONT.sans, fontWeight: 800, fontSize: 14, letterSpacing: '0.14em', padding: '4px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>
        BEST VALUE
      </div>
    ) : null}
    <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: '0.2em', color: C.muted }}>{tier}</div>
    <div>
      <div style={{ fontFamily: FONT.display, fontSize: 58, lineHeight: 0.95, color: C.forest }}>{price}</div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 14, color: C.muted, marginTop: 4 }}>/ month</div>
    </div>
    <div style={{ fontFamily: FONT.hand, fontSize: 22, color: C.forest, lineHeight: 1.3 }}>hosting<br />maintenance<br />domain</div>
  </div>
);

const WORD = 'WEBRIVO';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 0, 12, EASE.out);

  const signT = ramp(frame, 96, 12, EASE.out);
  const contactT = ramp(frame, 116, 14, EASE.out);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      {/* group photo: elements fly in and settle */}
      {PLANS.map((g) => {
        const t = ramp(frame, g.start, 14, EASE.power4In);
        const impact = bell(frame, g.start + 12, 4);
        return (
          <div
            key={g.tier}
            style={{
              position: 'absolute', left: g.x, top: g.y, width: 250, height: 339,
              opacity: t,
              transform: `translateY(${(1 - t) * -900}px) rotate(${g.rot + (1 - t) * 22}deg) scale(${(1 + (1 - t) * 0.35) * (1 + impact * 0.03)})`,
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.5))',
            }}
          >
            <MiniPlan tier={g.tier} price={g.price} best={g.best} />
          </div>
        );
      })}

      {/* badge drops in above the wordmark */}
      <div
        style={{
          position: 'absolute', left: '50%', top: 470, transform: `translateX(-50%) scale(${2.2 - 1.2 * ramp(frame, 12, 10, EASE.power4In)}) rotate(${-24 + 24 * ramp(frame, 12, 10, EASE.power4In)}deg)`,
          opacity: ramp(frame, 12, 10, EASE.power4In),
        }}
      >
        <Badge size={140} tone="dark" />
      </div>

      {/* wordmark lockup: letterpress per glyph */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center',
        }}
      >
        {WORD.split('').map((ch, i) => {
          const delay = 24 + i * 3;
          const t = ramp(frame, delay, 12, EASE.press);
          const glintCenter = delay + 12;
          const glint = (() => {
            const d = Math.abs(frame - glintCenter);
            return d < 4 ? 1 - d / 4 : 0;
          })();
          return (
            <span
              key={i}
              style={{
                display: 'inline-block', opacity: t,
                transform: `scale(${1.6 - 0.6 * t})`, transformOrigin: 'center bottom',
                filter: `blur(${(1 - t) * 6}px)`,
                fontFamily: FONT.display, fontSize: 168, lineHeight: 1, color: C.off,
                position: 'relative',
              }}
            >
              {ch}
              <span
                style={{
                  position: 'absolute', left: '50%', bottom: -8, transform: 'translateX(-50%)',
                  width: `${glint * 100}%`, height: 6, background: C.sage, opacity: glint, borderRadius: 3,
                }}
              />
            </span>
          );
        })}
      </div>

      {/* sign-off + contact */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 920, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 88, color: C.sage, opacity: signT,
          transform: `translateY(${(1 - signT) * 24}px) rotate(-1.5deg)`,
        }}
      >
        get found. get chosen.
      </div>
      <div
        style={{
          position: 'absolute', left: 120, right: 120, top: 1560, opacity: contactT,
          transform: `translateY(${(1 - contactT) * 30}px)`,
        }}
      >
        <div
          style={{
            background: C.off, borderRadius: 12, padding: '34px 40px',
            boxShadow: '0 30px 70px rgba(0,0,0,.5)', textAlign: 'center', position: 'relative',
          }}
        >
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 38, color: C.forest, letterSpacing: '0.04em' }}>
            webrivo.official@gmail.com
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 34, color: C.muted, marginTop: 12 }}>
            +91 9113253753 · webrivo.site
          </div>
          <Tape w={150} h={38} rot={-44} tone="clear" style={{ left: -50, top: -20 }} />
          <Tape w={150} h={38} rot={44} tone="clear" style={{ right: -50, top: -20 }} />
        </div>
      </div>

      <Tape w={320} rot={-6} tone="sage" style={{ left: -40, top: 170, opacity: 0.55 * inT }} />
      <Tape w={320} rot={5} tone="sage" style={{ right: -40, bottom: 190, opacity: 0.55 * inT }} />
      <Daisy size={72} rot={-12} style={{ left: 100, top: 620, opacity: 0.95 * ramp(frame, 40, 10, EASE.out) }} />
      <Daisy size={52} rot={20} style={{ right: 110, top: 900, opacity: 0.85 * ramp(frame, 58, 10, EASE.out) }} />
      <Grain opacity={0.12} />
    </AbsoluteFill>
  );
};
