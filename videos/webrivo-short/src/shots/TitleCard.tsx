// Shot 03/06 — paper-title-card (adapted): one line pressed word-by-word onto
// paper (Anton caps; one accent word), sage underline sweep, Caveat sub-line.
// 54f per card, per the sequence breather rule.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Fonts, ramp } from '../theme';

export const DURATION = 55;

type Props = {
  line1: string;
  accent?: string; // accent word (stays line1 colour, gets underline)
  line2?: string;
  sub: string;
};

export const TitleCard: React.FC<Props> = ({ line1, accent, line2, sub }) => {
  const frame = useCurrentFrame();
  const fadeOut = ramp(frame, DURATION - 8, 8, EASE.smooth);

  type Word = { w: string; accent: boolean; br?: boolean };
  const words: Word[] = [
    ...line1.split(' ').map((w) => ({ w, accent: accent === w })),
    ...(line2 ? line2.split(' ').map((w) => ({ w, accent: accent === w, br: true })) : []),
  ];

  const underline = ramp(frame, 16, 18, EASE.smooth);
  const subT = ramp(frame, 12, 12, EASE.smooth);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.off,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `radial-gradient(1100px 750px at 50% 42%, ${C.white}, transparent 65%)`,
        opacity: 1 - fadeOut,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: FONT.display, fontSize: 148, lineHeight: 0.96,
            color: C.forest, letterSpacing: '0.005em',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.24em',
          }}
        >
          {words.map((x, i) => {
            const delay = 4 + i * 4;
            const t = ramp(frame, delay, 9, EASE.press);
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    display: 'inline-block', opacity: t,
                    transform: `scale(${1.28 - 0.28 * t})`,
                    filter: `blur(${(1 - t) * 7}px)`,
                    color: x.accent ? C.forest : undefined,
                  }}
                >
                  {x.w}
                </span>
                {x.br && <span style={{ flexBasis: '100%', height: 0 }} />}
              </React.Fragment>
            );
          })}
        </div>
        <div
          style={{
            height: 8, width: 260, margin: '34px auto 0', borderRadius: 4,
            background: C.sage, transform: `scaleX(${underline})`,
          }}
        />
        <div
          style={{
            fontFamily: FONT.hand, fontSize: 56, color: C.muted,
            marginTop: 26, opacity: subT,
          }}
        >
          {sub}
        </div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
