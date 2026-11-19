// Shot 09 — basic-3d-scene: the price lives in a small 3D room. The camera is
// always the exact inverse of the card it is looking at, so flying between
// stations turns the whole world with it. The bill → the toggle → the yearly
// receipt (that card lies on its side, so the camera has to roll upright to
// read it). Real numbers from the site's calculator.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 196;

// toggle flips on "pay yearly"; the monthly price is already on screen while
// "the exact price up front" is spoken
const FLIP = 116;
export const BEATS = { price: 22, flip: FLIP, save: FLIP + 20, receipt: 162, out: 180 };

const DIGITS = '0123456789';

// ── stations: each card's own pose in the room ─────────────────────────────
type Pose = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number };
const ST: Pose[] = [
  { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 1 },
  { x: 1180, y: -130, z: -500, rx: 0, ry: -34, rz: 0, s: 1 },
  { x: 2260, y: 260, z: -520, rx: 4, ry: -8, rz: 0, s: 1 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mixPose = (a: Pose, b: Pose, t: number, hop: number): Pose => ({
  x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t),
  rx: lerp(a.rx, b.rx, t), ry: lerp(a.ry, b.ry, t), rz: lerp(a.rz, b.rz, t),
  s: lerp(a.s, b.s, t) * hop,
});

// which station the camera is on, as a float (for focus falloff)
const stationAt = (f: number) => {
  if (f <= 44) return 0;
  if (f < 66) return ramp(f, 44, 22, EASE.smooth);
  if (f <= 130) return 1;
  if (f < 154) return 1 + ramp(f, 130, 24, EASE.smooth);
  return 2;
};

const poseAt = (f: number): Pose => {
  if (f <= 44) return { ...ST[0], s: ST[0].s * (1 - 0.015 * ramp(f, 0, 44, EASE.smooth)) };
  if (f < 66) {
    const u = ramp(f, 44, 22, EASE.smooth);
    return mixPose(ST[0], ST[1], u, 1 + 0.22 * Math.sin(u * Math.PI));
  }
  if (f <= 130) return { ...ST[1], s: ST[1].s * (1 - 0.02 * ramp(f, 66, 64, EASE.smooth)) };
  if (f < 154) {
    const u = ramp(f, 130, 24, EASE.smooth);
    return mixPose(ST[1], ST[2], u, 1 + 0.22 * Math.sin(u * Math.PI));
  }
  return { ...ST[2], s: ST[2].s * (1 - 0.02 * ramp(f, 154, 24, EASE.smooth)) };
};

const poseTransform = (p: Pose) =>
  `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateZ(${p.rz}deg) rotateY(${p.ry}deg) rotateX(${p.rx}deg) scale(${p.s})`;

const camTransform = (p: Pose) =>
  `scale(${1 / p.s}) rotateZ(${-p.rz}deg) rotateY(${-p.ry}deg) rotateX(${-p.rx}deg) translate3d(${-p.x}px, ${-p.y}px, ${-p.z}px)`;

// dust hanging in the room — parallax comes entirely from the camera
const MOTES = Array.from({ length: 26 }).map((_, i) => ({
  x: (((i * 37) % 17) - 8) * 190 + 900,
  y: (((i * 53) % 13) - 6) * 120,
  z: (((i * 29) % 11) - 5) * 170,
  r: 2 + (i % 3),
  o: 0.1 + (i % 4) * 0.06,
}));

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
    const p = Math.min(1, (frame - delay) / 20);
    return 1 - Math.pow(1 - p, 2.2);
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
              fontFamily: FONT.display, fontVariantNumeric: 'tabular-nums',
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

const CardShell: React.FC<{ children: React.ReactNode; tone?: 'paper' | 'forest' }> = ({
  children, tone = 'paper',
}) => (
  <div
    style={{
      width: 944, height: 690, boxSizing: 'border-box', borderRadius: 22, padding: '52px 60px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: tone === 'forest' ? C.forest : C.white,
      border: tone === 'forest' ? 'none' : '1px solid rgba(137,153,130,.45)',
      boxShadow: '0 40px 90px -30px rgba(24,53,43,.45), 0 0 0 1px rgba(255,255,255,.6)',
      position: 'relative',
    }}
  >
    {children}
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <div
    style={{
      fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, letterSpacing: '0.24em',
      color: dark ? 'rgba(221,227,213,.7)' : C.muted, textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

export const Estimator: React.FC = () => {
  const frame = useCurrentFrame();
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  const cam = poseAt(frame);
  const station = stationAt(frame);

  const yearly = frame >= FLIP;
  const thumbT = ramp(frame, FLIP, 12, EASE.smooth);
  const saveT = ramp(frame, BEATS.save, 9, EASE.power4In);
  const saveBell = bell(frame, BEATS.save + 2, 5);

  const focus = (k: number) => {
    const d = Math.abs(station - k);
    return { opacity: 0.28 + 0.72 * Math.max(0, 1 - d), blur: 6 * Math.min(1, d) };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.off, overflow: 'hidden' }}>
      <Fonts />
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            `radial-gradient(1100px 900px at 50% 34%, ${C.white}, transparent 72%),` +
            `linear-gradient(180deg, transparent 60%, rgba(221,227,213,.55) 100%)`,
        }}
      />

      <div
        style={{
          position: 'absolute', left: 56, right: 56, top: 150,
          opacity: ramp(frame, 0, 12, EASE.out) * (1 - outT),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: 'rgba(24,53,43,.55)' }}>
            05 — THE ESTIMATOR
          </div>
          <div style={{ fontFamily: FONT.hand, fontSize: 40, color: C.muted }}>one price, all in</div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          {['THE BILL', 'THE TOGGLE', 'THE YEAR'].map((t, k) => {
            const on = Math.abs(station - k) < 0.5;
            return (
              <div
                key={t}
                style={{
                  borderRadius: 999, padding: '12px 22px',
                  background: on ? C.forest : 'rgba(24,53,43,.07)',
                  color: on ? C.off : 'rgba(24,53,43,.55)',
                  fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, letterSpacing: '0.16em',
                  transform: `scale(${on ? 1 : 0.96})`,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
      </div>

      {/* the floor of the room */}
      <div
        style={{
          position: 'absolute', left: -240, right: -240, bottom: -140, height: 560,
          transform: 'perspective(760px) rotateX(64deg)', transformOrigin: '50% 0%',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(24,53,43,.12) 0 2px, transparent 2px 96px),' +
            'repeating-linear-gradient(0deg, rgba(24,53,43,.12) 0 2px, transparent 2px 96px)',
          opacity: 0.7 * (1 - outT),
        }}
      />

      {/* ── the room ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', left: 540, top: 946, width: 0, height: 0,
          perspective: 1550,
          transform: `translateY(${-outT * 1800}px)`,
        }}
      >
        <div style={{ position: 'absolute', width: 0, height: 0, transformStyle: 'preserve-3d', transform: camTransform(cam) }}>
          {/* dust */}
          {MOTES.map((m, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', width: m.r * 2, height: m.r * 2, borderRadius: '50%',
                background: C.muted, opacity: m.o,
                transform: `translate3d(${m.x}px, ${m.y}px, ${m.z}px)`,
              }}
            />
          ))}

          {/* ST1 — the bill */}
          <div
            style={{
              position: 'absolute', left: -472, top: -345, width: 944, height: 690,
              transformStyle: 'preserve-3d', transform: poseTransform(ST[0]),
              opacity: focus(0).opacity, filter: `blur(${focus(0).blur}px)`,
            }}
          >
            <CardShell>
              <Kicker>the bill</Kicker>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 14 }}>
                <DigitRoll value="₹1,199" delay={BEATS.price + 2} color={C.forest} size={206} />
                <span style={{ fontFamily: FONT.display, fontSize: 74, color: C.muted, marginLeft: 14 }}>/mo</span>
              </div>
              <div style={{ height: 2, background: 'rgba(24,53,43,.12)', margin: '22px 0 20px' }} />
              <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 34, color: C.forest }}>
                the full price, up front — nothing hidden
              </div>
              <Tape w={150} h={38} rot={-44} tone="clear" style={{ left: -48, top: -18 }} />
            </CardShell>
          </div>

          {/* ST2 — the toggle */}
          <div
            style={{
              position: 'absolute', left: -472, top: -345, width: 944, height: 690,
              transformStyle: 'preserve-3d', transform: poseTransform(ST[1]),
              opacity: focus(1).opacity, filter: `blur(${focus(1).blur}px)`,
            }}
          >
            <CardShell>
              <Kicker>monthly or yearly</Kicker>
              <div
                style={{
                  position: 'relative', marginTop: 22, height: 104, borderRadius: 999,
                  background: C.sage, boxShadow: 'inset 0 3px 10px rgba(24,53,43,.22)',
                }}
              >
                <div
                  style={{
                    position: 'absolute', top: 9, bottom: 9, left: 9, width: 'calc(50% - 9px)',
                    borderRadius: 999, background: C.forest,
                    transform: `translateX(${thumbT * 100 * 1.02}%)`,
                    boxShadow: '0 8px 22px rgba(24,53,43,.4)',
                  }}
                />
                {['MONTHLY', 'YEARLY'].map((label, i) => (
                  <div
                    key={label}
                    style={{
                      position: 'absolute', top: 0, bottom: 0, left: `${i * 50}%`, width: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, letterSpacing: '0.12em',
                      color: (i === 0) !== yearly ? C.off : C.forest,
                      opacity: (i === 0) !== yearly ? 1 : 0.6,
                    }}
                  >
                    {label}
                    {i === 1 ? (
                      <span
                        style={{
                          fontFamily: FONT.sans, fontWeight: 800, fontSize: 20, letterSpacing: '0.08em',
                          background: yearly ? C.off : 'rgba(24,53,43,.1)',
                          color: C.forest, borderRadius: 999, padding: '5px 12px',
                          opacity: yearly ? 1 : 0.55,
                          transform: `scale(${1 + saveBell * 0.16}) rotate(${saveBell * -3}deg)`,
                        }}
                      >
                        SAVE 10%
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginTop: 26 }}>
                <span key={yearly ? 'y' : 'm'} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                  <DigitRoll
                    value={yearly ? '₹12,948' : '₹1,199'}
                    delay={yearly ? FLIP + 2 : BEATS.price + 2}
                    color={C.forest}
                    size={158}
                  />
                  <span style={{ fontFamily: FONT.display, fontSize: 60, color: C.muted, marginLeft: 12 }}>
                    /{yearly ? 'yr' : 'mo'}
                  </span>
                </span>
              </div>
              <div
                style={{
                  fontFamily: FONT.hand, fontSize: 44, color: C.muted, textAlign: 'center',
                  marginTop: 4, opacity: saveT,
                }}
              >
                ten percent off, every year
              </div>
            </CardShell>
          </div>

          {/* ST3 — the yearly receipt, lying on its side */}
          <div
            style={{
              position: 'absolute', left: -472, top: -345, width: 944, height: 690,
              transformStyle: 'preserve-3d', transform: poseTransform(ST[2]),
              opacity: focus(2).opacity, filter: `blur(${focus(2).blur}px)`,
            }}
          >
            <CardShell tone="forest">
              <Kicker dark>the yearly bill</Kicker>
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 10 }}>
                <span style={{ fontFamily: FONT.display, fontSize: 176, lineHeight: 1, color: C.off }}>₹12,948</span>
                <span style={{ fontFamily: FONT.display, fontSize: 64, color: C.sage, marginLeft: 12 }}>/yr</span>
              </div>
              <div style={{ height: 2, background: 'rgba(221,227,213,.28)', margin: '20px 0 18px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: C.sage }}>
                <span>₹1,199 × 12 months</span>
                <span style={{ color: C.off }}>− 10% yearly</span>
              </div>
              <div style={{ fontFamily: FONT.hand, fontSize: 44, color: C.off, marginTop: 16 }}>
                that’s a year, paid once
              </div>
              <Tape w={150} h={38} rot={-44} tone="clear" style={{ left: -48, top: -18 }} />
            </CardShell>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute', left: 0, right: 0, top: 1566, textAlign: 'center',
          fontFamily: FONT.hand, fontSize: 62, color: C.forest,
          opacity: ramp(frame, BEATS.save + 6, 12, EASE.out) * (1 - outT),
        }}
      >
        no surprises. that’s the whole bill.
      </div>

      <Tape w={280} rot={-8} tone="clear" style={{ left: 84, top: 250, opacity: 0.9 * ramp(frame, 0, 12, EASE.out) }} />
      <Tape w={280} rot={10} tone="clear" style={{ right: 84, bottom: 280, opacity: 0.9 * ramp(frame, 0, 12, EASE.out) }} />
      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
