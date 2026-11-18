// Shot 09 — estimator (pill-slot-cycle + DigitRoll): Monthly/Yearly segmented
// toggle (thumb slides on sage track), price rolls odometer-style
// ₹1,199/mo → ₹12,948/yr (the calculator's own math: 12 × 0.9), SAVE 10%
// stamp pops. Real numbers from components/Calculator.jsx.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 168;

// toggle flips on "and save ten percent yearly"; the monthly price is already
// on screen while "See the exact price up front" is spoken
const FLIP = 104;
export const BEATS = { price: 24, flip: FLIP, save: FLIP + 10, out: 156 };
const DIGITS = '0123456789';

const DigitColumn: React.FC<{ ch: string; delay: number; lineH: number; size: number; color: string }> = ({
  ch, delay, lineH, size, color,
}) => {
  const frame = useCurrentFrame();
  if (ch < '0' || ch > '9') {
    return <span style={{ fontSize: size, lineHeight: `${lineH}px`, color, fontFamily: FONT.display }}>{ch}</span>;
  }
  const target = DIGITS.indexOf(ch);
  const t = (() => {
    if (frame < delay) return 0;
    // two-stage roll: settle at the value's true digit after passing a full cycle
  const p = Math.min(1, (frame - delay) / 20);
    const eased = 1 - Math.pow(1 - p, 2.2);
    return eased;
  })();
  const offset = (10 + target) * t * lineH;
  return (
    <span style={{ display: 'inline-block', height: lineH }}>
      <span style={{ display: 'block', transform: `translateY(${-offset}px)` }}>
        {(DIGITS + DIGITS).split('').map((d, j) => (
          <span
            key={j}
            style={{
              display: 'block', fontSize: size, lineHeight: `${lineH}px`, color,
              fontFamily: FONT.display,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
};

const DigitRoll: React.FC<{ value: string; delay: number; color: string; size: number }> = ({
  value, delay, color, size,
}) => {
  const lineH = size * 1.12;
  return (
    <span style={{ display: 'inline-flex', overflow: 'hidden', height: lineH, verticalAlign: 'bottom', fontFamily: FONT.display }}>
      {value.split('').map((c, i) => (
        <DigitColumn key={i} ch={c} delay={delay + i * 2} lineH={lineH} size={size} color={color} />
      ))}
    </span>
  );
};

export const Estimator: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 0, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  const yearly = frame >= FLIP;

  const thumbT = ramp(frame, FLIP, 12, EASE.smooth);
  const saveT = ramp(frame, BEATS.save, 9, EASE.power4In);
  const saveBell = bell(frame, BEATS.save + 2, 5);

  return (
    <AbsoluteFill style={{ backgroundColor: C.off, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(1100px 900px at 50% 34%, ${C.white}, transparent 70%)`, opacity: inT }} />

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - inT) * 140 - outT * 2000}px)` }}>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center',
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, letterSpacing: '0.22em', color: C.muted,
          }}
        >
          THE ESTIMATOR
        </div>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 396, textAlign: 'center',
            fontFamily: FONT.display, fontSize: 118, color: C.forest, lineHeight: 1,
          }}
        >
          SEE THE PRICE FIRST
        </div>

        {/* segmented toggle */}
        <div
          style={{
            position: 'absolute', left: 90, right: 90, top: 640, height: 120, borderRadius: 999,
            background: C.sage, boxShadow: 'inset 0 3px 10px rgba(24,53,43,.25)',
          }}
        >
          {/* thumb */}
          <div
            style={{
              position: 'absolute', top: 10, bottom: 10, left: 10, width: 'calc(50% - 10px)',
              borderRadius: 999, background: C.forest, transform: `translateX(${thumbT * 100 * 1.02}%)`,
              boxShadow: '0 8px 22px rgba(24,53,43,.4)',
            }}
          />
          {['MONTHLY', 'YEARLY'].map((label, i) => (
            <div
              key={label}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: `${i * 50}%`, width: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, letterSpacing: '0.12em',
                color: (i === 0) !== yearly ? C.off : C.forest, opacity: (i === 0) !== yearly ? 1 : 0.65,
              }}
            >
              {label}
              {i === 1 && yearly ? (
                <span
                  style={{
                    fontFamily: FONT.sans, fontWeight: 800, fontSize: 24, letterSpacing: '0.08em',
                    background: C.off, color: C.forest, borderRadius: 999, padding: '6px 16px',
                    transform: `scale(${1 + saveBell * 0.18}) rotate(${saveBell * -3}deg)`,
                  }}
                >
                  SAVE 10%
                </span>
              ) : i === 1 ? (
                <span
                  style={{
                    fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, letterSpacing: '0.08em',
                    color: C.forest, opacity: 0.6 + saveT * 0,
                  }}
                >
                  −10%
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* price */}
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 880, textAlign: 'center',
            display: 'flex', alignItems: 'baseline', justifyContent: 'center',
          }}
        >
          <span
            key={yearly ? 'y' : 'm'}
            style={{ display: 'inline-flex', alignItems: 'baseline' }}
          >
            <DigitRoll value={yearly ? '₹12,948' : '₹1,199'} delay={yearly ? FLIP + 12 : BEATS.price} color={C.forest} size={190} />
            <span
              style={{
                fontFamily: FONT.display, fontSize: 84, color: C.muted, marginLeft: 18,
              }}
            >
              /{yearly ? 'yr' : 'mo'}
            </span>
          </span>
        </div>

        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center',
            fontFamily: FONT.sans, fontWeight: 600, fontSize: 36, color: C.muted,
            opacity: ramp(frame, yearly ? FLIP + 24 : 46, 12, EASE.out),
          }}
        >
          {yearly ? 'that’s a year, paid once' : 'the full price, up front — nothing hidden'}
        </div>

        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 1330, textAlign: 'center',
            fontFamily: FONT.hand, fontSize: 68, color: C.forest,
            opacity: ramp(frame, 28, 12, EASE.out),
          }}
        >
          no surprises. that’s the whole bill.
        </div>
      </div>

      <Tape w={280} rot={-8} tone="clear" style={{ left: 84, top: 210, opacity: inT }} />
      <Tape w={280} rot={10} tone="clear" style={{ right: 84, bottom: 250, opacity: inT }} />
      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
