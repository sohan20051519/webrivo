// Shot 05 — the work order, 104f.
// BRIEF → BUILD → SHIP is not a slide show: it is a single paper docket pinned
// to the board. The three steps are already printed on it when the cut lands,
// and each one lights up — number, rule, sketch and a stamped check — on the
// word it belongs to. One sheet, three moves, no empty frame.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 104;

// pinned to "Brief, build, ship." (s5a at 1.52 / 1.92 / 2.32 s)
export const BEATS = { roll: [46, 58, 70], out: 86 };

const SHEET = { x: 70, y: 186, w: 940, h: 1552 };
const ROW_H = 400;

type Step = { num: string; word: string; sub: string; sketch: 'pencil' | 'wire' | 'stamp' };

const STEPS: Step[] = [
  { num: '01', word: 'BRIEF', sub: 'the shop, the story', sketch: 'pencil' },
  { num: '02', word: 'BUILD', sub: 'design, words, pages', sketch: 'wire' },
  { num: '03', word: 'SHIP', sub: 'hosting and updates', sketch: 'stamp' },
];

// ── the little drawing at the end of each row ──────────────────────────────
const Sketch: React.FC<{ kind: Step['sketch']; p: number; frame: number }> = ({ kind, p, frame }) => {
  const box: React.CSSProperties = {
    width: 196, height: 176, borderRadius: 10, flexShrink: 0,
    background: 'rgba(221,227,213,.42)', position: 'relative',
    boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.1)',
  };
  if (kind === 'pencil') {
    // a line of writing being drawn, then a tick
    return (
      <div style={box}>
        <svg width={196} height={176} viewBox="0 0 196 176" style={{ position: 'absolute', inset: 0 }}>
          {[52, 78, 104, 130].map((y, i) => (
            <path
              key={y}
              d={`M 26 ${y} L ${i === 3 ? 118 : 166} ${y}`}
              stroke={C.forest} strokeWidth={4} strokeLinecap="round"
              pathLength={1} strokeDasharray={1}
              strokeDashoffset={1 - Math.max(0, Math.min(1, p * 1.6 - i * 0.2))}
              opacity={0.75}
            />
          ))}
          {/* the pencil */}
          <g transform={`rotate(38 ${26 + 150 * Math.max(0, Math.min(1, p))} ${60 + 90 * Math.max(0, Math.min(1, p))})`} opacity={p > 0.02 && p < 1 ? 1 : 0}>
            <rect x={154} y={96} width={13} height={54} rx={2} fill={C.forest} />
            <path d="M154 150 L160.5 166 L167 150 Z" fill={C.forest} />
          </g>
        </svg>
      </div>
    );
  }
  if (kind === 'wire') {
    // a page being blocked in
    return (
      <div style={box}>
        <svg width={196} height={176} viewBox="0 0 196 176" style={{ position: 'absolute', inset: 0 }}>
          <rect x={26} y={22} width={144} height={132} rx={6} fill="none" stroke={C.forest} strokeWidth={3.4}
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p * 1.5)} />
          <rect x={40} y={36} width={54} height={38} rx={3} fill={C.forest} opacity={0.85 * Math.min(1, Math.max(0, p * 2 - 0.5))} />
          {[86, 104, 122].map((y, i) => (
            <path key={y} d={`M 40 ${y} L ${i === 1 ? 116 : 156} ${y}`} stroke={C.forest} strokeWidth={4} strokeLinecap="round"
              opacity={0.6 * Math.min(1, Math.max(0, p * 2 - 0.7 - i * 0.15))} />
          ))}
        </svg>
      </div>
    );
  }
  // the ship stamp
  return (
    <div style={box}>
      <svg width={196} height={176} viewBox="0 0 196 176" style={{ position: 'absolute', inset: 0 }}>
        <circle cx={98} cy={84} r={52} fill="none" stroke={C.forest} strokeWidth={3.4} strokeDasharray="7 9"
          opacity={0.5 * Math.min(1, p * 2)} />
        <path d="M 74 84 L 92 102 L 124 66" fill="none" stroke={C.forest} strokeWidth={8} strokeLinecap="round"
          strokeLinejoin="round" pathLength={1} strokeDasharray={1}
          strokeDashoffset={1 - Math.min(1, Math.max(0, p * 1.7 - 0.35))} />
      </svg>
    </div>
  );
};

const Step: React.FC<{ s: Step; i: number; frame: number }> = ({ s, i, frame }) => {
  const at = BEATS.roll[i];
  const lit = ramp(frame, at, 10, EASE.out);
  const impact = bell(frame, at, 4);
  const enter = ramp(frame, -6 + i * 4, 14, EASE.out);
  const y = i * ROW_H;
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, top: y, height: ROW_H,
        opacity: 0.55 + 0.45 * lit,
        transform: `translateY(${(1 - enter) * 22}px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 26, height: '100%' }}>
        {/* number + its rule */}
        <div style={{ width: 92, flexShrink: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 58, lineHeight: 1, color: lit > 0.5 ? C.forest : 'rgba(24,53,43,.4)', transform: `scale(${1 + impact * 0.06})`, transformOrigin: 'left center' }}>
            {s.num}
          </span>
          <div style={{ width: 46, height: 4, borderRadius: 2, background: C.forest, opacity: 0.25 + 0.55 * lit }} />
        </div>

        {/* the word + what it means */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 0.92, color: C.forest, letterSpacing: '0.005em' }}>
            {s.word}
          </div>
          <div style={{ fontFamily: FONT.hand, fontSize: 36, color: lit > 0.5 ? C.forest : C.muted, marginTop: 8 }}>
            {s.sub}
          </div>
          {/* the sage bar that fills on the word */}
          <div style={{ marginTop: 16, height: 9, width: 236, borderRadius: 5, background: 'rgba(24,53,43,.12)' }}>
            <div style={{ height: '100%', width: `${lit * 100}%`, borderRadius: 5, background: C.forest }} />
          </div>
        </div>

        <Sketch kind={s.sketch} p={lit} frame={frame} />
      </div>

      {/* the stamped check, in the corner the eye already finished reading */}
      <div
        style={{
          position: 'absolute', right: 10, bottom: 24,
          opacity: ramp(frame, at + 4, 8, EASE.outBack),
          transform: `rotate(${-7}deg) scale(${0.7 + 0.3 * ramp(frame, at + 4, 8, EASE.outBack)})`,
        }}
      >
        <div style={{ background: C.forest, borderRadius: 7, padding: '6px 13px', fontFamily: FONT.sans, fontWeight: 800, fontSize: 17, letterSpacing: '0.2em', color: C.off, boxShadow: '0 3px 0 rgba(24,53,43,.25)' }}>
          DONE
        </div>
      </div>

      {i < 2 ? (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'repeating-linear-gradient(90deg, rgba(24,53,43,.26) 0 12px, transparent 12px 24px)' }} />
      ) : null}
    </div>
  );
};

export const BriefBuildShip: React.FC = () => {
  const frame = useCurrentFrame();
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);
  // the docket is already on the table when the cut lands — it only settles a
  // few pixels, so the shot never opens on bare forest
  const inT = ramp(frame, 0, 10, EASE.out);
  // a slow push: the docket is being pushed across the table toward you
  const push = 1 + 0.02 * ramp(frame, 0, DURATION, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(80% 60% at 50% 34%, rgba(221,227,213,.1), rgba(24,53,43,0) 70%)` }} />

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - inT) * 22 - outT * 210}px) scale(${push})`, opacity: 1 - 0.2 * outT }}>
        {/* the sheet of paper everything is printed on */}
        <div
          style={{
            position: 'absolute', left: SHEET.x, top: SHEET.y, width: SHEET.w, height: SHEET.h,
            boxSizing: 'border-box', padding: '46px 46px 40px',
            background: C.off, borderRadius: 16,
            boxShadow: '0 40px 90px rgba(0,0,0,.45), inset 0 0 0 1px rgba(24,53,43,.08)',
          }}
        >
          {/* perforated top edge */}
          <div style={{ position: 'absolute', left: 28, right: 28, top: 20, height: 2, background: 'repeating-linear-gradient(90deg, rgba(24,53,43,.22) 0 10px, transparent 10px 20px)' }} />

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, letterSpacing: '0.24em', color: 'rgba(24,53,43,.55)' }}>
              WORK ORDER
            </span>
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 20, letterSpacing: '0.2em', color: 'rgba(24,53,43,.4)' }}>
              № 04
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ fontFamily: FONT.display, fontSize: 96, lineHeight: 0.95, color: C.forest }}>
              THREE MOVES
            </div>
            <div style={{ fontFamily: FONT.hand, fontSize: 46, color: C.muted, marginBottom: 4 }}>one site.</div>
          </div>
          <div style={{ height: 2, background: 'rgba(24,53,43,.2)', marginTop: 18 }} />

          <div style={{ position: 'relative', marginTop: 26, height: ROW_H * 3 }}>
            {STEPS.map((s, i) => (
              <Step key={s.word} s={s} i={i} frame={frame} />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 34 }}>
            <span style={{ fontFamily: FONT.hand, fontSize: 44, color: C.forest }}>that&rsquo;s the whole process</span>
            <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: '0.22em', color: 'rgba(24,53,43,.45)' }}>
              HOSTED · MAINTAINED · YOURS
            </span>
          </div>
        </div>

        <Tape w={260} rot={-7} tone="sage" style={{ left: 84, top: 158, opacity: 0.95 * inT }} />
        <Tape w={210} rot={6} tone="sage" style={{ right: 70, top: 172, opacity: 0.85 * inT }} />
        <Daisy size={78} rot={-14} style={{ right: 58, top: 1720, opacity: 0.95 * ramp(frame, 22, 12, EASE.out) }} />
      </div>

      <Grain opacity={0.09} />
    </AbsoluteFill>
  );
};
