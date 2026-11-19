// Shot 07 — carousel-3d, 200f. Not a ring of thumbnails: a cover-flow of the
// site's three real `.ht-prod` cards, so the middle card is nearly full width
// and the ones behind it fall away in perspective. It whips 599 → 1,199 →
// 2,199 exactly on the spoken numbers, and a readout under it names the plan.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';
import { PlanCard, PLANS, W, H } from '../ui/PlanCard';

export const DURATION = 250;

// pops, then a whip per spoken price; the Premium note lands on s10b at 136
export const BEATS = { pop: [12, 18, 24], move: [42, 64, 86], note: 150, out: 232 };

const SCALE = 1.02;
const GAP = 470;
const TILT = 30;

export const PlanCards: React.FC = () => {
  const frame = useCurrentFrame();

  // 0 → 1 → 2, eased, so the row turns rather than jumps
  const pos =
    frame < BEATS.move[0] ? 0
      : frame < BEATS.move[1] ? ramp(frame, BEATS.move[0], 16, EASE.smooth)
        : frame < BEATS.move[2] ? 1 + ramp(frame, BEATS.move[1], 16, EASE.smooth)
          : 2;

  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const headT = ramp(frame, 0, 14, EASE.out);
  const noteT = ramp(frame, BEATS.note, 12, EASE.out);
  const front = Math.round(pos);

  // the readout: value + label swap as the row turns
  const capAt = (k: number) => ramp(frame, BEATS.move[k] - 4, 10, EASE.out);
  const caps = [
    { price: '₹599', name: 'Basic', note: 'starter site' },
    { price: '₹1,199', name: 'Business', note: 'best value' },
    { price: '₹2,199', name: 'Premium', note: 'the full suite' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.off, overflow: 'hidden' }}>
      <Fonts />
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            `radial-gradient(120% 60% at 50% 34%, ${C.white}, transparent 68%),` +
            `linear-gradient(180deg, transparent 58%, rgba(221,227,213,.75) 100%)`,
        }}
      />

      {/* a sage band so the light cards have something to sit on */}
      <div
        style={{
          position: 'absolute', left: 20, right: 20, top: 300, height: 1180, borderRadius: 26,
          background: `linear-gradient(180deg, ${C.sage}, #D3DCC9)`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)',
          opacity: ramp(frame, 0, 14, EASE.out),
        }}
      />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-outT * 190}px)`, opacity: 1 - outT }}>
        {/* heading */}
        <div style={{ position: 'absolute', left: 56, right: 56, top: 116, opacity: headT, transform: `translateY(${(1 - headT) * 20}px)` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: 'rgba(24,53,43,.6)' }}>
              07 — THREE PLANS
            </div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.08em', color: 'rgba(24,53,43,.45)' }}>
              PER MONTH
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(24,53,43,.16)', marginTop: 18 }} />
        </div>

        {/* the carousel */}
        <div style={{ position: 'absolute', left: 540, top: 880, width: 0, height: 0, perspective: 2400 }}>
          <div style={{
            position: 'absolute', width: 0, height: 0, transformStyle: 'preserve-3d',
            transform: `translateY(${14 * ramp(frame, 20, 170, EASE.smooth)}px) scale(${1 + 0.055 * ramp(frame, 20, 186, EASE.smooth)}) rotate(${-0.6 * ramp(frame, 20, 186, EASE.smooth)}deg)`,
          }}>
            {PLANS.map((p, i) => {
              const d = i - pos;
              const ad = Math.abs(d);
              const pop = ramp(frame, BEATS.pop[i], 12, EASE.outBack);
              const z = 70 - ad * 240;
              const x = d * GAP;
              const ry = -d * TILT;
              const sc = SCALE * (1 - 0.1 * Math.min(1.6, ad)) * (0.9 + 0.1 * pop);
              const dim = Math.min(0.5, ad * 0.32);
              return (
                <div
                  key={p.name}
                  style={{
                    position: 'absolute',
                    left: -W / 2, top: -H / 2, width: W, height: H,
                    transformStyle: 'preserve-3d',
                    transform: `translate3d(${x}px, ${-8 * ad}px, ${z}px) rotateY(${ry}deg) scale(${sc})`,
                    opacity: pop * (1 - Math.max(0, ad - 1.4) * 0.5),
                    filter: dim > 0.01 ? `brightness(${1 - dim}) saturate(${1 - dim * 0.7})` : undefined,
                    zIndex: 10 - Math.round(ad * 2),
                  }}
                >
                  <PlanCard plan={p} />
                  {/* shadow on the wall behind the front card */}
                  <div
                    style={{
                      position: 'absolute', left: 30, right: 30, top: H - 26, height: 60,
                      borderRadius: '50%', background: 'rgba(24,53,43,.16)',
                      filter: 'blur(22px)', opacity: 1 - Math.min(1, ad),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* readout — big price, plan name, and the /mo */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1400, textAlign: 'center' }}>
          {caps.map((c, k) => {
            const t = capAt(k) * (k === front ? 1 : 0.0);
            const vis = k === 0 ? 1 - ramp(frame, BEATS.move[0] - 6, 8, EASE.smooth) : t;
            if (vis <= 0.001) return null;
            return (
              <div
                key={c.name}
                style={{
                  position: 'absolute', left: 0, right: 0, top: 0,
                  opacity: vis,
                  transform: `translateY(${(1 - vis) * 18}px)`,
                  display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 18,
                }}
              >
                <span style={{ fontFamily: FONT.display, fontSize: 96, lineHeight: 1, color: C.forest, letterSpacing: '0.01em' }}>
                  {c.price}
                </span>
                <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, letterSpacing: '0.18em', color: 'rgba(24,53,43,.55)' }}>
                  /MO
                </span>
                <span style={{ width: 2, height: 44, background: 'rgba(24,53,43,.2)', margin: '0 8px' }} />
                <span style={{ fontFamily: FONT.hand, fontSize: 52, color: C.muted }}>{c.note}</span>
              </div>
            );
          })}
        </div>

        {/* the note — what Premium adds */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 1560, textAlign: 'center',
            opacity: noteT, transform: `translateY(${(1 - noteT) * 20}px) rotate(-1deg)`,
          }}
        >
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, letterSpacing: '0.04em', color: C.forest }}>
            BOOKINGS · PAYMENTS · DASHBOARDS
          </span>
          <div style={{ fontFamily: FONT.hand, fontSize: 56, color: C.muted, marginTop: 2 }}>all of it, on premium</div>
        </div>

        {/* progress dots */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1722, display: 'flex', justifyContent: 'center', gap: 14 }}>
          {PLANS.map((p, i) => (
            <div key={p.name} style={{
              width: i === front ? 62 : 22, height: 8, borderRadius: 4,
              background: i === front ? C.forest : 'rgba(24,53,43,.22)',
            }} />
          ))}
        </div>

        <Tape w={230} rot={-8} style={{ left: 78, top: 236, opacity: 0.85 * headT }} />
        <Daisy size={58} rot={12} style={{ right: 92, top: 300, opacity: 0.9 * headT }} />
      </div>

      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
