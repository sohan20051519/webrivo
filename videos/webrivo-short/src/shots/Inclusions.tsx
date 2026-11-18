// Shot 08 — list-stack-press (adapted): HOSTING / MAINTENANCE / DOMAIN rows
// pressed onto paper one per beat (slam scale-in + press squash + impact ring),
// forest backdrop; closing hand note: "in every plan. even basic."
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 120;

const ROWS = [
  { text: 'HOSTING', sub: 'fast, maintained, ours to worry about', rot: -1.4, y: 640, at: 16 },
  { text: 'MAINTENANCE', sub: 'updates while you run the shop', rot: 1.1, y: 960, at: 40 },
  { text: 'DOMAIN', sub: 'your .in, on us', rot: -0.7, y: 1280, at: 64 },
];

// pinned to "Hosting, maintenance, your domain — in every plan."
export const BEATS = { note: 74, out: 106 };

export const Inclusions: React.FC = () => {
  const frame = useCurrentFrame();
  const bgIn = ramp(frame, 0, 12, EASE.out);
  const bgOut = ramp(frame, BEATS.out, 12, EASE.power4In);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - bgIn) * 140 - bgOut * 2000}px)` }}>
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center',
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 36, letterSpacing: '0.22em', color: C.sage,
            opacity: bgIn,
          }}
        >
          EVERY PLAN INCLUDES
        </div>

        {ROWS.map((r, k) => {
          const start = r.at;
          const t = ramp(frame, start, 10, EASE.power4In);
          const press = bell(frame, start + 8, 3);
          const impact = bell(frame, start + 8, 4);
          const opacity = t * (1 - bgOut);
          return (
            <div
              key={r.text}
              style={{
                position: 'absolute', left: 80, right: 80, top: r.y,
                opacity,
                transform: `scale(${(1.28 - 0.28 * t) * (1 + press * -0.02)}) rotate(${r.rot + impact * (k % 2 ? 0.6 : -0.6)}deg)`,
                transformOrigin: 'center',
              }}
            >
              <div
                style={{
                  background: C.off, borderRadius: 8, padding: '26px 44px 30px',
                  boxShadow: '0 22px 50px rgba(0,0,0,.4)', position: 'relative',
                }}
              >
                <div style={{ fontFamily: FONT.display, fontSize: 110, lineHeight: 1, color: C.forest, letterSpacing: '0.01em' }}>
                  {r.text}
                </div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: C.muted, marginTop: 10 }}>
                  {r.sub}
                </div>
                <Tape w={140} h={36} rot={-46} tone="clear" style={{ left: -52, top: -18 }} />
              </div>
              {impact > 0.01 ? (
                <div
                  style={{
                    position: 'absolute', inset: -18, borderRadius: 14,
                    boxShadow: `0 0 0 4px rgba(221,227,213,${0.5 * impact})`, opacity: impact,
                  }}
                />
              ) : null}
            </div>
          );
        })}

        <div
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 260, textAlign: 'center',
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
