// Shot 07 — the plans, shown as the site actually shows them: the three real
// .ht-prod cards (src/ui/PlanCard.tsx) side by side, washi tape and all.
// Each card springs up while "Three plans." is spoken, then a price spotlight
// travels 599 → 1,199 → 2,199 exactly as the voice says the range, with a big
// readout under the row so the numbers are legible at phone size.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Fonts, Tape, ramp } from '../theme';
import { PlanCard, PLANS, W as CARD_W, H as CARD_H } from '../ui/PlanCard';

export const DURATION = 168;

const SCALE = 0.47;
const CW = CARD_W * SCALE;
const CH = CARD_H * SCALE;
const GAP = 22;
const ROW_W = CW * 3 + GAP * 2;
const ROW_X = (1080 - ROW_W) / 2;
const ROW_Y = 470;

// price spotlight windows, pinned to "Five ninety nine / to / twenty one ninety nine"
export const BEATS = {
  pop: [22, 28, 34],
  price: [[46, 78], [78, 88], [88, 118]] as [number, number][],
  note: 120,
  out: 154,
};

// how lit card k is at this frame (fast in, slower out)
const litAt = (frame: number, k: number) => {
  const [a, b] = BEATS.price[k];
  return ramp(frame, a, 4, EASE.out) * (1 - ramp(frame, b - 3, 5, EASE.smooth));
};

export const PlanCards: React.FC = () => {
  const frame = useCurrentFrame();
  const headT = ramp(frame, 0, 12, EASE.out);
  const noteT = ramp(frame, BEATS.note, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const drift = 1 + 0.02 * ramp(frame, 0, DURATION, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(1200px 1000px at 50% 34%, rgba(244,245,239,.9), transparent 72%)`,
        }}
      />

      {/* header */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 214, textAlign: 'center',
          opacity: headT, transform: `translateY(${(1 - headT) * 26 - outT * 60}px)`,
        }}
      >
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, letterSpacing: '0.24em', color: 'rgba(24,53,43,.55)' }}>
          04 — THE PLANS
        </div>
        <div style={{ fontFamily: FONT.display, fontSize: 100, lineHeight: 1, color: C.forest, marginTop: 10 }}>
          THREE WAYS IN
        </div>
      </div>

      {/* the row of real plan cards */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: ROW_Y,
          transform: `translateY(${-outT * 1900}px) scale(${drift})`,
          transformOrigin: '540px 700px',
        }}
      >
        {PLANS.map((plan, k) => {
          const pop = ramp(frame, BEATS.pop[k], 14, EASE.outBack);
          const lit = litAt(frame, k);
          const hero = k === 1;
          return (
            <div
              key={plan.name}
              style={{
                position: 'absolute', left: ROW_X + k * (CW + GAP), top: 0, width: CW, height: CH,
                opacity: Math.min(1, pop * 1.4),
                transform: `translateY(${(1 - pop) * 120}px) scale(${0.94 + 0.06 * pop + 0.045 * lit})`,
                transformOrigin: '50% 100%',
                filter: `drop-shadow(0 ${26 + 18 * lit}px ${54 + 30 * lit}px rgba(24,53,43,${0.18 + 0.14 * lit}))`,
              }}
            >
              {/* the spotlight behind the card */}
              <div
                style={{
                  position: 'absolute', left: -26, right: -26, top: -30, bottom: -26,
                  borderRadius: 26, opacity: lit,
                  background: `radial-gradient(70% 60% at 50% 42%, rgba(255,255,255,.95), rgba(255,255,255,0) 72%)`,
                }}
              />
              <div
                style={{
                  position: 'absolute', inset: -4, borderRadius: 14, opacity: lit,
                  boxShadow: `0 0 0 3px rgba(24,53,43,${0.35 * lit}), 0 0 0 12px rgba(244,245,239,${0.5 * lit})`,
                }}
              />
              {hero ? (
                <div
                  style={{
                    position: 'absolute', left: '50%', bottom: -30, transform: 'translateX(-50%) rotate(-2deg)',
                    fontFamily: FONT.hand, fontSize: 32, color: 'rgba(24,53,43,.72)', whiteSpace: 'nowrap',
                    opacity: 0.6 + 0.4 * lit,
                  }}
                >
                  most picked
                </div>
              ) : null}
              <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
                <PlanCard plan={plan} />
              </div>
            </div>
          );
        })}
      </div>

      {/* big readout: the price being spoken */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1030, height: 340, textAlign: 'center' }}>
        {PLANS.map((plan, k) => {
          const lit = litAt(frame, k);
          return (
            <div
              key={`cap${plan.name}`}
              style={{
                position: 'absolute', left: 0, right: 0, top: 0, opacity: lit,
                transform: `translateY(${(1 - lit) * 18}px) scale(${0.96 + 0.04 * lit})`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <span style={{ fontFamily: FONT.display, fontSize: 190, lineHeight: 1, color: C.forest, letterSpacing: '-0.01em' }}>
                  {plan.amount}
                </span>
                <span style={{ fontFamily: FONT.display, fontSize: 76, color: C.muted, marginLeft: 12 }}>
                  /mo
                </span>
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, letterSpacing: '0.24em', color: C.muted, textTransform: 'uppercase', marginTop: 14 }}>
                {plan.name} plan
              </div>
            </div>
          );
        })}
      </div>

      {/* the promise under the price */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1420, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 66, color: C.forest, opacity: noteT,
          transform: `translateY(${(1 - noteT) * 16}px) rotate(-0.8deg)`,
        }}
      >
        everything handled. one bill.
      </div>

      <Tape w={300} rot={-8} tone="clear" style={{ left: 54, top: 190, opacity: 0.9 * headT }} />
      <Tape w={280} rot={9} tone="clear" style={{ right: 58, top: 300, opacity: 0.9 * headT }} />
      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
