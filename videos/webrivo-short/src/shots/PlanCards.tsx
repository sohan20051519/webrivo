// Shot 07 — carousel-3d, plan edition.
// The three real .ht-prod cards (src/ui/PlanCard.tsx) on a ring: each card only
// orbits on Y and always faces outward, double-faced so it never mirrors. The
// ring steps 599 → 1,199 → 2,199 as the voice reads the range, and the big
// readout under it names the price that is being spoken.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Fonts, Tape, ramp } from '../theme';
import { PlanCard, PLANS, W as CARD_W, H as CARD_H } from '../ui/PlanCard';

export const DURATION = 168;

const SCALE = 0.62;
const CW = CARD_W * SCALE;
const CH = CARD_H * SCALE;
const RADIUS = 700;
const RING = { x: 540, y: 940 };
const N = 3;

// price spotlight windows, pinned to "Five ninety nine / to / twenty one ninety nine"
export const BEATS = {
  pop: [22, 28, 34],
  price: [[46, 78], [78, 88], [88, 118]] as [number, number][],
  note: 120,
  out: 154,
};

// ring angle: a slow idle drift plus two deliberate 120° steps
const angleAt = (frame: number) => {
  const a1 = ramp(frame, 70, 10, EASE.smooth);
  const a2 = ramp(frame, 82, 10, EASE.smooth);
  return 120 * a1 + 120 * a2 + 0.03 * frame;
};

// how lit card k is at this frame (fast in, slower out)
const litAt = (frame: number, k: number) => {
  const [a, b] = BEATS.price[k];
  return ramp(frame, a, 4, EASE.out) * (1 - ramp(frame, b - 3, 5, EASE.smooth));
};

const CardFace: React.FC<{ k: number }> = ({ k }) => (
  <div
    style={{
      position: 'absolute', inset: 0, width: CW, height: CH,
      borderRadius: 6, overflow: 'hidden', background: C.white,
      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    }}
  >
    <div style={{ transform: `scale(${SCALE})`, transformOrigin: 'top left' }}>
      <PlanCard plan={PLANS[k]} />
    </div>
  </div>
);

export const PlanCards: React.FC = () => {
  const frame = useCurrentFrame();
  const headT = ramp(frame, 0, 12, EASE.out);
  const noteT = ramp(frame, BEATS.note, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const drift = 1 + 0.02 * ramp(frame, 0, DURATION, EASE.smooth);

  const angle = angleAt(frame);
  // travelling fast → a touch of blur so the 120° step reads as a whip
  const whip = Math.max(
    Math.abs(angle - angleAt(frame - 1)),
    Math.abs(angleAt(frame + 1) - angle)
  );
  const blur = Math.min(7, Math.max(0, (whip - 2.2) * 0.7));

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(1200px 1000px at 50% 32%, rgba(244,245,239,.92), transparent 72%)`,
        }}
      />

      {/* header */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 208, textAlign: 'center',
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

      {/* ground: the ring's reflective disc + a tick ring */}
      <div
        style={{
          position: 'absolute', left: '50%', top: 1196, width: 980, height: 190,
          marginLeft: -490, borderRadius: '50%',
          background: `radial-gradient(ellipse at 50% 30%, rgba(24,53,43,.16), transparent 68%)`,
          filter: 'blur(18px)',
          opacity: headT * (1 - outT),
        }}
      />
      <div
        style={{
          position: 'absolute', left: '50%', top: 1190, width: 900, height: 150,
          marginLeft: -450, borderRadius: '50%',
          border: '1px dashed rgba(24,53,43,.2)',
          transform: `rotateX(72deg) rotateZ(${-angle}deg)`,
          opacity: headT * (1 - outT),
        }}
      />

      {/* the ring */}
      <div
        style={{
          position: 'absolute', left: RING.x, top: RING.y, width: 0, height: 0,
          perspective: 2400,
          transform: `translateY(${-outT * 1900}px) scale(${drift})`,
        }}
      >
        <div
          style={{
            position: 'absolute', width: 0, height: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-RADIUS}px) rotateX(-9deg) rotateY(${-angle}deg)`,
            filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
          }}
        >
          {PLANS.map((plan, k) => {
            const pop = ramp(frame, BEATS.pop[k], 14, EASE.outBack);
            const lit = litAt(frame, k);
            const d = (((k * 120 - angle) % 360) + 540) % 360 - 180; // -180..180
            const behind = (1 - Math.cos((d * Math.PI) / 180)) / 2;   // 0 front, 1 back
            const hl = Math.max(0, 1 - Math.abs(d) / 26);
            return (
              <div
                key={plan.name}
                style={{
                  position: 'absolute', left: -CW / 2, top: -CH / 2, width: CW, height: CH,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${k * 120}deg) translateZ(${RADIUS + 44 * hl}px) scale(${0.9 + 0.1 * pop})`,
                  opacity: Math.min(1, pop * 1.4),
                }}
              >
                <CardFace k={k} />
                {/* the back is the same face, turned round, so it never mirrors */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <CardFace k={k} />
                </div>

                {/* air perspective: the far side of the ring recedes into the paper */}
                <div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 6,
                    background: C.sage, opacity: 0.86 * behind, pointerEvents: 'none',
                  }}
                />
                {/* the lit card gets a printed ring and a spotlight */}
                <div
                  style={{
                    position: 'absolute', inset: -3, borderRadius: 10, pointerEvents: 'none',
                    opacity: Math.max(hl, lit),
                    boxShadow: `0 0 0 3px rgba(24,53,43,${0.4 * Math.max(hl, lit)}), 0 30px 70px rgba(24,53,43,${0.22 * lit})`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute', left: '50%', bottom: -34, transform: 'translateX(-50%)',
                    fontFamily: FONT.hand, fontSize: 30, color: C.forest, whiteSpace: 'nowrap',
                    opacity: plan.tier === 'business' ? 0.5 + 0.5 * lit : 0,
                  }}
                >
                  most picked
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* big readout: the price being spoken */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1352, height: 300, textAlign: 'center' }}>
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
                <span style={{ fontFamily: FONT.display, fontSize: 172, lineHeight: 1, color: C.forest, letterSpacing: '-0.01em' }}>
                  {plan.amount}
                </span>
                <span style={{ fontFamily: FONT.display, fontSize: 68, color: C.muted, marginLeft: 12 }}>
                  /mo
                </span>
              </div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, letterSpacing: '0.24em', color: C.muted, textTransform: 'uppercase', marginTop: 10 }}>
                {plan.name} plan
              </div>
            </div>
          );
        })}
      </div>

      {/* the promise under the price */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1648, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 58, color: C.forest, opacity: noteT,
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
