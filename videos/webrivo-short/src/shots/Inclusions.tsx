// Shot 08 — element-body-moves, 112f. The three inclusions are physical cards
// on a tilted desk. Each lifts off the paper on its own word (the contact
// shadow stays behind, softens and drifts — that is what proves the card left
// it), and the last one stays up. Full-bleed: the cards are almost as wide as
// the frame, so the words are unmissable on a phone.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 122;

const ROWS = [
  { text: 'HOSTING', sub: 'fast, maintained, ours to worry about', num: '01', lift: 14, drop: 38 },
  { text: 'MAINTENANCE', sub: 'updates while you run the shop', num: '02', lift: 38, drop: 62 },
  { text: 'DOMAIN', sub: 'your .in, on us', num: '03', lift: 62, drop: 999 },
];

// pinned to "Hosting, maintenance, your domain — in every plan."
export const BEATS = { lifts: [14, 38, 62], note: 88, out: 108 };

const CARD_W = 930;
const CARD_H = 300;
const STEP = 340;
const PLANE_TOP = 388;
const TILT = 18;
const LIFT_Z = 150;

const Icon: React.FC<{ k: number; up: number }> = ({ k, up }) => {
  const col = C.forest;
  const common = { stroke: col, strokeWidth: 5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={104} height={104} viewBox="0 0 48 48" style={{ flexShrink: 0, transform: `rotate(${-3 + 2 * up}deg)` }}>
      {k === 0 ? (
        <>
          <rect x="8" y="9" width="32" height="10" rx="3" {...common} />
          <rect x="8" y="23" width="32" height="10" rx="3" {...common} />
          <circle cx="14" cy="14" r="1.9" fill={col} />
          <circle cx="14" cy="28" r="1.9" fill={col} />
          <path d="M22 14h11M22 28h11" {...common} strokeWidth={3.4} />
        </>
      ) : k === 1 ? (
        <>
          <path d="M31 8a10 10 0 0 0-13.4 12.2L8.4 29.4a4 4 0 0 0 5.6 5.6l9.2-9.2A10 10 0 0 0 35.4 12l-6 6-4.2-4.2 5.8-5.8Z" {...common} />
        </>
      ) : (
        <>
          <circle cx="24" cy="24" r="15" {...common} />
          <path d="M9 24h30M24 9c4.6 4.2 7 9.4 7 15s-2.4 10.8-7 15c-4.6-4.2-7-9.4-7-15s2.4-10.8 7-15Z" {...common} strokeWidth={3.6} />
        </>
      )}
    </svg>
  );
};

export const Inclusions: React.FC = () => {
  const frame = useCurrentFrame();
  const bgIn = ramp(frame, 0, 12, EASE.out);
  const bgOut = ramp(frame, BEATS.out, 12, EASE.power4In);
  const tilt = TILT - 2 * ramp(frame, 0, DURATION, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 88% 62% at 50% 26%, rgba(221,227,213,.11), transparent 70%)` }} />

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - bgIn) * 150 - bgOut * 2100}px)` }}>
        <div
          style={{
            position: 'absolute', left: 56, right: 56, top: 210, display: 'flex',
            alignItems: 'baseline', justifyContent: 'space-between', opacity: bgIn,
          }}
        >
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: C.sage }}>
            08 — IN EVERY PLAN
          </div>
          <div style={{ fontFamily: FONT.hand, fontSize: 40, color: 'rgba(221,227,213,.65)' }}>all three</div>
        </div>

        {/* the desk */}
        <div style={{ position: 'absolute', inset: 0, perspective: 1900, perspectiveOrigin: '50% 30%', opacity: bgIn }}>
          <div
            style={{
              position: 'absolute', left: 75, top: PLANE_TOP, width: CARD_W, height: STEP * 2 + CARD_H + 40,
              transformStyle: 'preserve-3d', transformOrigin: '50% 0%',
              transform: `rotateX(${tilt}deg) translateY(${8 * ramp(frame, 20, 96, EASE.smooth)}px) scale(${1 + 0.018 * ramp(frame, 20, 110, EASE.smooth)})`,
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
                  {/* contact shadow — stays on the desk while the card leaves */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 12,
                      background: 'rgba(8,20,16,.6)',
                      filter: `blur(${4 + 26 * up}px)`,
                      opacity: 0.36 - 0.2 * up,
                      transform: `translate(0px, ${2 + 9 * up}px)`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 12,
                      background: 'rgba(8,20,16,.45)',
                      filter: `blur(${16 + 44 * up}px)`,
                      opacity: 0.1 + 0.14 * up,
                      transform: `translate(${24 * up}px, ${28 * up}px)`,
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute', inset: 0, width: CARD_W, height: CARD_H,
                      transformStyle: 'preserve-3d',
                      transform: `translateZ(${LIFT_Z * up}px) scale(${1 + 0.04 * up + 0.02 * impact}) rotateX(${up * -2}deg)`,
                    }}
                  >
                    <div
                      style={{
                        width: CARD_W, height: CARD_H, boxSizing: 'border-box',
                        background: C.off, borderRadius: 12, padding: '24px 40px',
                        display: 'flex', alignItems: 'center', gap: 34,
                        transform: `scaleY(${1 - 0.018 * squash})`, transformOrigin: '50% 100%',
                        boxShadow: up > 0.02
                          ? `0 ${18 + 28 * up}px ${44 + 54 * up}px rgba(8,20,16,${0.3 + 0.2 * up})`
                          : 'none',
                        position: 'relative',
                      }}
                    >
                      <Icon k={k} up={up} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: FONT.display, fontSize: 96, lineHeight: 1, color: C.forest, letterSpacing: '0.01em' }}>
                          {r.text}
                        </div>
                        <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 31, color: C.muted, marginTop: 10 }}>
                          {r.sub}
                        </div>
                      </div>
                      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 21, letterSpacing: '0.2em', color: C.muted, alignSelf: 'flex-start' }}>
                        {r.num}
                      </div>
                      <Tape w={150} h={38} rot={-46} tone="clear" style={{ left: -54, top: -20 }} />
                      {impact > 0.01 ? (
                        <div style={{ position: 'absolute', inset: -16, borderRadius: 16, boxShadow: `0 0 0 4px rgba(221,227,213,${0.45 * impact})`, opacity: impact }} />
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
            position: 'absolute', left: 0, right: 0, top: 1640, textAlign: 'center',
            fontFamily: FONT.hand, fontSize: 62, color: C.sage,
            opacity: ramp(frame, BEATS.note, 12, EASE.out),
          }}
        >
          even the ₹599 one.
        </div>
      </div>

      <Daisy size={60} rot={14} style={{ right: 68, top: 300, opacity: 0.9 * bgIn }} />
      <Tape w={300} rot={3} tone="sage" style={{ left: 40, top: 138, opacity: 0.45 * bgIn }} />
      <Grain opacity={0.12} />
    </AbsoluteFill>
  );
};
