// Shot 07 — plan cards (product-card-progressive-assemble / deck-deal hybrid):
// the three REAL plan cutouts take the stage one at a time — hard in from the
// right, beat, hard out left; kickers name the tier; Business gets the
// "BEST VALUE" stamp. Prices live inside the captures (₹599/₹1,199/₹2,199).
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 180;

const PLANS = [
  { file: 'plan-0.png', w: 376.97, h: 510.38, kicker: '01 — BASIC', cropTop: 0 },
  { file: 'plan-1.png', w: 376.97, h: 510.38, kicker: '02 — BUSINESS', stamp: 'BEST VALUE', cropTop: 40 },
  { file: 'plan-2.png', w: 376.97, h: 510.38, kicker: '03 — PREMIUM', cropTop: 0 },
];
const CARD_W = 620;
const STEP = 50;

export const PlanCards: React.FC = () => {
  const frame = useCurrentFrame();
  const bgIn = ramp(frame, 0, 12, EASE.out);
  const bgOut = ramp(frame, 168, 12, EASE.power4In);

  return (
    <AbsoluteFill style={{ backgroundColor: C.off, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(1100px 900px at 50% 30%, ${C.white}, transparent 70%)`, opacity: bgIn }} />

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - bgIn) * 160 - bgOut * 2000}px)` }}>
        {PLANS.map((p, k) => {
          const start = k * STEP;
          const last = k === PLANS.length - 1;
          const enterT = ramp(frame, start + (k === 0 ? 6 : 0), 12, EASE.power4In);
          const exitT = last ? 0 : ramp(frame, start + STEP - 12, 12, EASE.power4In);
          const impact = bell(frame, start + (k === 0 ? 14 : 12), 4);
          const x = (1 - enterT) * 760 - exitT * 820;
          const rot = (1 - enterT) * 10 - exitT * 12;
          const scale = 1 + impact * 0.04;
          const opacity = Math.min(enterT, 1 - exitT);
          return (
            <React.Fragment key={k}>
              {/* kicker */}
              <div
                style={{
                  position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                  fontFamily: FONT.sans, fontWeight: 700, fontSize: 40, letterSpacing: '0.2em',
                  color: C.muted, opacity: opacity * (1 - ramp(frame, start + STEP - 24, 10, EASE.smooth) * (last ? 0 : 1)),
                }}
              >
                {p.kicker}
              </div>
              {/* stamp */}
              {p.stamp ? (
                <div
                  style={{
                    position: 'absolute', left: '50%', top: 560, transform: `translateX(-50%) rotate(-7deg) scale(${0.7 + 0.3 * ramp(frame, start + 8, 8, EASE.power4In)})`,
                    opacity: opacity * ramp(frame, start + 8, 8, EASE.power4In),
                    background: C.sage, color: C.forest, borderRadius: 999, padding: '12px 30px',
                    fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, letterSpacing: '0.14em',
                    boxShadow: '0 6px 16px rgba(24,53,43,.25)',
                  }}
                >
                  {p.stamp}
                </div>
              ) : null}
              {/* card */}
              <div
                style={{
                  position: 'absolute', left: (1080 - CARD_W) / 2, top: 660, width: CARD_W,
                  height: CARD_W * (p.h / p.w), opacity,
                  transform: `translateX(${x}px) rotate(${rot}deg) scale(${scale})`,
                  transformOrigin: 'center bottom',
                  filter: 'drop-shadow(0 40px 90px rgba(24,53,43,.4))',
                  overflow: 'hidden',
                }}
              >
                {/* cropTop hides capture artefacts (plan-1's clipped baked badge) */}
                <Img
                  src={staticFile(`captures/${p.file}`)}
                  style={{
                    position: 'absolute', left: 0, width: '100%',
                    height: `${100 + (p.cropTop / p.h) * 100}%`,
                    objectFit: 'fill', top: `-${(p.cropTop / p.h) * 100}%`,
                  }}
                />
              </div>
            </React.Fragment>
          );
        })}

        {/* every-plan note */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 210, textAlign: 'center',
            fontFamily: FONT.hand, fontSize: 64, color: C.forest,
            opacity: ramp(frame, 150, 12, EASE.out),
          }}
        >
          hosting + domain + updates, in all three
        </div>
      </div>

      <Tape w={260} rot={-10} tone="clear" style={{ left: 90, top: 200, opacity: bgIn }} />
      <Tape w={260} rot={12} tone="clear" style={{ right: 90, bottom: 260, opacity: bgIn }} />
      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
