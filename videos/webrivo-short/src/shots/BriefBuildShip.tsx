// Shot 05 — vertical-word-roll-blur-cycle (adapted): the process line
// BRIEF → BUILD → SHIP rolls through a masked window on forest, blur on the
// fast pass, each word stamps on a beat.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 170;

const WORDS = ['BRIEF', 'BUILD', 'SHIP'];
const WINDOW_H = 240;

export const BriefBuildShip: React.FC = () => {
  const frame = useCurrentFrame();
  const inT = ramp(frame, 0, 12, EASE.out);
  const outT = ramp(frame, 156, 14, EASE.power4In);

  // roll position: word i is centred & held during segment i ([i*STEP,(i+1)*STEP));
  // at each segment start it rolls in from the previous word over TRANS frames
  const STEP = 44;
  const TRANS = 14;
  const seg = Math.min(WORDS.length - 1, Math.floor(frame / STEP));
  const segT = seg === 0 ? 1 : Math.min(1, (frame - seg * STEP) / TRANS);
  const easedSeg = segT * segT * (3 - 2 * segT);
  const progress = Math.max(0, seg - 1 + easedSeg);
  const rolling = seg > 0 && segT < 1;

  // blur peaks mid-roll
  const blur = rolling ? 10 * Math.sin(segT * Math.PI) : 0;
  const lineH = WINDOW_H * 0.86;

  // SHIP stamp (SHIP lands when segment 2 begins)
  const rollEnd = (WORDS.length - 1) * STEP;
  const stampT = ramp(frame, rollEnd + 4, 10, EASE.power4In);

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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ transform: `translateY(${lineH * (1 - progress)}px)`, filter: `blur(${blur}px)`, willChange: 'transform' }}>
            {WORDS.map((w, i) => {
              const landedAt = i * STEP;
              const landed = frame >= landedAt + (i === 2 ? 0 : 2);
              const impact = bell(frame, landedAt + (i === 0 ? 10 : 2), 4);
              const t = landed ? 1 : 0;
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
                background: frame >= i * STEP + (i === 2 ? 2 : 2) ? C.off : 'rgba(244,245,239,.28)',
              }}
            />
          ))}
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
