// Shot 05 — vertical-word-roll-blur-cycle (adapted): the process line
// "so we keep it simple" → BRIEF → BUILD → SHIP rolls through a masked window
// on forest, blur on the fast pass, each word stamps on its spoken beat.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 100;

const WORDS = ['BRIEF', 'BUILD', 'SHIP'];
const WINDOW_H = 240;

// word centres, pinned to "Brief, build, ship." (s5 at 1.52 / 1.95 / 2.35 s)
export const BEATS = { roll: [46, 58, 70], out: 88 };
const AT = BEATS.roll;
const TRANS = 10;

export const BriefBuildShip: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 0, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);

  // which word is centred, and how far the roll has travelled (float index)
  const seg = frame < AT[0] ? -1 : AT.reduce((k, a, i) => (frame >= a ? i : k), 0);
  const segT = seg <= 0 ? 0 : Math.min(1, (frame - AT[seg]) / TRANS);
  const easedSeg = segT * segT * (3 - 2 * segT);
  const progress = seg < 0 ? 0 : seg === 0 ? 0 : seg - 1 + easedSeg;
  const rolling = seg > 0 && segT < 1;

  // blur peaks mid-roll
  const blur = rolling ? 10 * Math.sin(segT * Math.PI) : 0;
  const lineH = WINDOW_H * 0.86;

  // SHIP stamp (lands with the last word)
  const stampT = ramp(frame, AT[2] + 4, 10, EASE.power4In);

  // the opening line, held while "so we keep it simple" is spoken
  const noteT = ramp(frame, 0, 10, EASE.out) * (1 - ramp(frame, AT[0] - 6, 8, EASE.smooth));

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      {/* paper texture bands (like the mask scene's tape paint) */}
      <div
        style={{
          position: 'absolute', left: -60, right: -60, top: 820, height: 300,
          background: `repeating-linear-gradient(180deg, ${C.sage} 0 26px, rgba(24,53,43,.06) 26px 28px)`,
          opacity: 0.25 * inT, transform: 'rotate(-3deg)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: FONT.hand, fontSize: 62, color: C.sage, opacity: inT, transform: `translateY(${(1 - inT) * 30}px)` }}>
          three moves, one site
        </div>

        <div
          style={{
            marginTop: 28, height: WINDOW_H, width: 900, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: noteT, transform: `translateY(${(1 - noteT) * 18}px)`,
              fontFamily: FONT.hand, fontSize: 92, lineHeight: 1.05, color: C.sage, textAlign: 'center',
            }}
          >
            so we keep<br />it simple.
          </div>

          <div
            style={{
              transform: `translateY(${lineH * (1 - progress)}px)`, filter: `blur(${blur}px)`,
              willChange: 'transform', opacity: ramp(frame, AT[0] - 4, 8, EASE.out),
            }}
          >
            {WORDS.map((w, i) => {
              const landedAt = AT[i];
              const landed = frame >= landedAt + (i === 2 ? 0 : 2);
              const impact = bell(frame, landedAt + (i === 0 ? 10 : 2), 4);
              return (
                <div
                  key={w}
                  style={{
                    height: lineH, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FONT.display, fontSize: 226, lineHeight: 1,
                    color: i === 2 ? C.off : C.sage,
                    opacity: landed ? 1 : 0.35,
                    transform: `scale(${landed ? 1 + impact * 0.05 : 1.18})`,
                  }}
                >
                  {w}
                </div>
              );
            })}
          </div>
          {/* mask edges */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: -2, height: 64, background: `linear-gradient(180deg, ${C.forest}, transparent)` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 64, background: `linear-gradient(0deg, ${C.forest}, transparent)` }} />
        </div>

        {/* progress ticks */}
        <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
          {WORDS.map((w, i) => (
            <div
              key={w}
              style={{
                width: i === 2 ? 74 : 34, height: 8, borderRadius: 4,
                background: frame >= AT[i] + 2 ? C.off : 'rgba(244,245,239,.28)',
              }}
            />
          ))}
        </div>

        {/* the stamp under SHIP */}
        <div
          style={{
            marginTop: 40, height: 60, display: 'flex', alignItems: 'center',
            fontFamily: FONT.hand, fontSize: 54, color: C.off,
            opacity: stampT, transform: `rotate(-3deg) scale(${0.86 + 0.14 * stampT})`,
          }}
        >
          you only pay monthly
        </div>
      </div>

      <Tape w={280} rot={-16} tone="clear" style={{ left: 96, top: 210, opacity: inT }} />
      <Tape w={240} rot={14} tone="clear" style={{ right: 84, bottom: 320, opacity: inT }} />
      <Daisy size={70} rot={-10} style={{ right: 120, top: 250, opacity: 0.9 * inT }} />
      <Grain opacity={0.12} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 1 - outT, background: `radial-gradient(ellipse 95% 85% at 50% 45%, transparent 55%, rgba(8,18,14,.5) 100%)` }} />
    </AbsoluteFill>
  );
};
