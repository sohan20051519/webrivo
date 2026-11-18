// Shot 08 — element-body-moves: the three inclusions are physical cards on a
// tilted desk. Each one lifts off the paper in turn (the shadow stays on the
// desk, grows and softens, which is what proves the card left it), lands back
// with a two-frame squash — and the last one, the domain, stays up.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 120;

const ROWS = [
  { text: 'HOSTING', sub: 'fast, maintained, ours to worry about', num: '01', lift: 16, drop: 40 },
  { text: 'MAINTENANCE', sub: 'updates while you run the shop', num: '02', lift: 40, drop: 64 },
  { text: 'DOMAIN', sub: 'your .in, on us', num: '03', lift: 64, drop: 999 },
];

// pinned to "Hosting, maintenance, your domain — in every plan."
export const BEATS = { note: 74, out: 106 };

const CARD_W = 880;
const CARD_H = 250;
const STEP = 320;
const PLANE_TOP = 420;
const TILT = 20;      // deg — the desk leans away from the camera
const LIFT_Z = 120;   // px along the desk normal (~41px on screen at 20°)

export const Inclusions: React.FC = () => {
  const frame = useCurrentFrame();
  const bgIn = ramp(frame, 0, 12, EASE.out);
  const bgOut = ramp(frame, BEATS.out, 12, EASE.power4In);
  const tilt = TILT - 2 * ramp(frame, 0, DURATION, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 85% 60% at 50% 30%, rgba(221,227,213,.1), transparent 70%)` }} />

      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${(1 - bgIn) * 140 - bgOut * 2000}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 286, textAlign: 'center',
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 34,
            letterSpacing: '0.22em', color: C.sage, opacity: bgIn,
          }}
        >
          EVERY PLAN INCLUDES
        </div>

        {/* the desk */}
        <div
          style={{
            position: 'absolute', inset: 0, perspective: 1700, perspectiveOrigin: '50% 34%',
            opacity: bgIn,
          }}
        >
          <div
            style={{
              position: 'absolute', left: 100, top: PLANE_TOP, width: CARD_W, height: STEP * 2 + CARD_H + 60,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt}deg)`,
              transformOrigin: '50% 0%',
            }}
          >
            {ROWS.map((r, k) => {
              const rise = ramp(frame, r.lift, 10, EASE.out);
              const fall = ramp(frame, r.drop, 8, EASE.in);
              const up = rise * (1 - fall);
              const squash = bell(frame, r.drop + 8, 2);
              const impact = bell(frame, r.lift + 2, 4);
              const y = k * STEP;

              return (
                <div key={r.text} style={{ position: 'absolute', left: 0, top: y, width: CARD_W, height: CARD_H }}>
                  {/* contact shadow — stays on the desk, grows + softens + fades */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: 'rgba(8,20,16,.55)',
                      filter: `blur(${3 + 22 * up}px)`,
                      opacity: 0.32 - 0.18 * up,
                      transform: `translate(0px, ${2 + 8 * up}px)`,
                    }}
                  />
                  {/* ambient shadow — drifts away from the light as the card rises */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: 'rgba(8,20,16,.4)',
                      filter: `blur(${14 + 40 * up}px)`,
                      opacity: 0.09 + 0.13 * up,
                      transform: `translate(${22 * up}px, ${26 * up}px)`,
                    }}
                  />

                  {/* the card itself */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, width: CARD_W, height: CARD_H,
                      transformStyle: 'preserve-3d',
                      transform:
                        `translateZ(${LIFT_Z * up}px) ` +
                        `scale(${1 + 0.05 * up + 0.02 * impact}) ` +
                        `rotateX(${up * -2}deg)`,
                    }}
                  >
                    <div
                      style={{
                        width: CARD_W, height: CARD_H, boxSizing: 'border-box',
                        background: C.off, borderRadius: 10, padding: '28px 44px 30px',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        transform: `scaleY(${1 - 0.018 * squash})`,
                        transformOrigin: '50% 100%',
                        boxShadow: up > 0.02
                          ? `0 ${18 + 26 * up}px ${40 + 50 * up}px rgba(8,20,16,${0.3 + 0.18 * up})`
                          : 'none',
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <div style={{ fontFamily: FONT.display, fontSize: 104, lineHeight: 1, color: C.forest, letterSpacing: '0.01em' }}>
                          {r.text}
                        </div>
                        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, letterSpacing: '0.2em', color: C.muted }}>
                          {r.num}
                        </div>
                      </div>
                      <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: C.muted, marginTop: 8 }}>
                        {r.sub}
                      </div>
                      <Tape w={140} h={36} rot={-46} tone="clear" style={{ left: -52, top: -18 }} />
                      {impact > 0.01 ? (
                        <div
                          style={{
                            position: 'absolute', inset: -14, borderRadius: 14,
                            boxShadow: `0 0 0 4px rgba(221,227,213,${0.45 * impact})`,
                            opacity: impact,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 250, textAlign: 'center',
            fontFamily: FONT.hand, fontSize: 66, color: C.sage,
            opacity: ramp(frame, BEATS.note, 12, EASE.out),
          }}
        >
          even the ₹599 one.
        </div>
      </div>

      <Daisy size={64} rot={14} style={{ right: 110, top: 220, opacity: 0.9 * bgIn }} />
      <Tape w={300} rot={3} tone="sage" style={{ left: 60, top: 160, opacity: 0.5 * bgIn }} />
      <Grain opacity={0.12} />
    </AbsoluteFill>
  );
};
