// Shot 02 — glass-pill-dictation-typing + draw-svg-trace.
// A frosted sage-glass pill drops in on the forest field and types the search
// ("boutique near me"); the light inside it drains as the words arrive. The
// results land, then a real pen traces the YOUR SHOP row (crop marks, closing
// flash, content goes to ink) and the promise takes the frame.
// Components only — no screenshots, no brand mark yet.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Fonts, ramp, bell } from '../theme';

export const DURATION = 152;

const QUERY = 'boutique near me';

// pinned to "Right now, someone nearby is searching for yours." / "We make sure
// they find it." — the pen closes in the gap, the promise lands on the second line
export const BEATS = {
  pill: 6,
  type: 12,
  submit: 40,
  rows: [46, 58],
  marks: 62,
  trace: 66,
  close: 90,
  found: 94,
  cardOut: 98,
  head: 104,
  sub: 114,
  note: 124,
  out: 140,
};

const TYPE_PER = 2;          // frames per character — dictation is even
const CARD_TOP = 600;
const CARD_L = 90;
const CARD_W = 900;
const ROW_H = 104;
const ROW_B_TOP = 26 + ROW_H + 14;
const TRACE_W = CARD_W - 52;
const TRACE_H = ROW_H;
const TRACE_R = 16;

// point on a rounded rect perimeter at p∈[0,1], clockwise from the top-left arc
const penPoint = (w: number, h: number, r: number, p: number) => {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI * r) / 2;
  const total = 2 * sw + 2 * sh + 4 * arc;
  let d = Math.max(0, Math.min(1, p)) * total;
  if (d <= sw) return { x: r + d, y: 0 };
  d -= sw;
  if (d <= arc) { const a = -Math.PI / 2 + d / r; return { x: w - r + r * Math.cos(a), y: r + r * Math.sin(a) }; }
  d -= arc;
  if (d <= sh) return { x: w, y: r + d };
  d -= sh;
  if (d <= arc) { const a = d / r; return { x: w - r + r * Math.cos(a), y: h - r + r * Math.sin(a) }; }
  d -= arc;
  if (d <= sw) return { x: w - r - d, y: h };
  d -= sw;
  if (d <= arc) { const a = Math.PI / 2 + d / r; return { x: r + r * Math.cos(a), y: h - r + r * Math.sin(a) }; }
  d -= arc;
  if (d <= sh) return { x: 0, y: h - r - d };
  d -= sh;
  const a = Math.PI + d / r;
  return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) };
};

const Magnifier: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={10.5} cy={10.5} r={6.5} stroke={color} strokeWidth={2.4} />
    <line x1={15.4} y1={15.4} x2={21} y2={21} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);

const Pin: React.FC<{ size: number; color: string; dot: string }> = ({ size, color, dot }) => (
  <svg width={size} height={size * 1.33} viewBox="0 0 72 96">
    <path d="M36 0 C16 0 0 16 0 36 C0 62 36 96 36 96 C36 96 72 62 72 36 C72 16 56 0 36 0 Z" fill={color} />
    <circle cx={36} cy={36} r={12} fill={dot} />
  </svg>
);

const Waveform: React.FC<{ frame: number; color: string }> = ({ frame, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 46 }}>
    {[30, 16, 24, 13, 20].map((h, i) => (
      <div
        key={i}
        style={{
          width: 5, borderRadius: 3, background: color,
          height: h + 2.4 * Math.sin(frame * 0.5 + i * 1.7),
          opacity: 0.85,
        }}
      />
    ))}
  </div>
);

const CropMarks: React.FC<{ p: number; spread: number; color: string }> = ({ p, spread, color }) => {
  const L = 22;
  const marks = [
    { x: -10 - spread, y: -10 - spread, sx: 1, sy: 1 },
    { x: TRACE_W + 10 + spread, y: -10 - spread, sx: -1, sy: 1 },
    { x: TRACE_W + 10 + spread, y: TRACE_H + 10 + spread, sx: -1, sy: -1 },
    { x: -10 - spread, y: TRACE_H + 10 + spread, sx: 1, sy: -1 },
  ];
  return (
    <>
      {marks.map((m, i) => {
        const t = ramp(p * 40, i * 2, 8, EASE.out);
        return (
          <div key={i} style={{ position: 'absolute', left: m.x, top: m.y, opacity: t }}>
            <div style={{ position: 'absolute', left: m.sx > 0 ? 0 : -L, top: 0, width: L, height: 2, background: color }} />
            <div style={{ position: 'absolute', left: 0, top: m.sy > 0 ? 0 : -L, width: 2, height: L, background: color }} />
          </div>
        );
      })}
    </>
  );
};

export const HeroShot: React.FC = () => {
  const frame = useCurrentFrame();

  const inT = ramp(frame, 0, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);

  // glass pill
  const pillT = ramp(frame, BEATS.pill, 20, EASE.press);
  const typed = Math.max(0, Math.min(QUERY.length, Math.floor((frame - BEATS.type) / TYPE_PER)));
  const caretOn = frame >= BEATS.pill + 2 && frame % 16 < 9 && frame < BEATS.type + QUERY.length * TYPE_PER + 8;
  // the light inside the pill drains as the words arrive
  const glow = 1 - ramp(frame, 10, 62, EASE.smooth);
  const submit = ramp(frame, BEATS.submit, 6, EASE.power4In);

  // results
  const cardT = ramp(frame, 42, 12, EASE.out);
  const rowA = ramp(frame, BEATS.rows[0], 10, EASE.out);
  const rowB = ramp(frame, BEATS.rows[1], 10, EASE.outBack);
  const foundT = ramp(frame, BEATS.found, 8, EASE.power4In);
  const cardOut = ramp(frame, BEATS.cardOut, 14, EASE.power4In);

  // the pen
  const markT = ramp(frame, BEATS.marks, 10, EASE.out);
  const traceP = ramp(frame, BEATS.trace, BEATS.close - BEATS.trace, EASE.smooth);
  const closeFlash = bell(frame, BEATS.close, 3);
  const pen = penPoint(TRACE_W, TRACE_H, TRACE_R, traceP);
  const tracing = frame >= BEATS.trace && frame <= BEATS.close + 2;

  // promise
  const headT = ramp(frame, BEATS.head, 11, EASE.power4In);
  const subT = ramp(frame, BEATS.sub, 11, EASE.out);
  const noteT = ramp(frame, BEATS.note, 12, EASE.out);
  const markW = ramp(frame, BEATS.sub + 8, 12, EASE.smooth);

  return (
    <AbsoluteFill style={{ backgroundColor: C.forest, overflow: 'hidden' }}>
      <Fonts />
      {/* field light + the warm pool the glass pill sits in */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 88% 62% at 50% 38%, rgba(221,227,213,.14), transparent 66%)` }} />
      <div
        style={{
          position: 'absolute', left: '50%', top: 470, width: 780, height: 420,
          marginLeft: -390, marginTop: -210, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(221,227,213,${0.15 + 0.45 * glow}), transparent 68%)`,
          opacity: 1 - cardOut,
        }}
      />

      {/* ── the search ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: Math.min(inT, 1 - cardOut),
          transform: `translateY(${cardOut * 300}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 306, textAlign: 'center',
            fontFamily: FONT.sans, fontWeight: 700, fontSize: 24,
            letterSpacing: '0.26em', color: C.sage, opacity: ramp(frame, 2, 12, EASE.out),
          }}
        >
          RIGHT NOW · THREE STREETS AWAY
        </div>

        {/* frosted glass pill — fixed width, the light lives inside it */}
        <div
          style={{
            position: 'absolute', left: CARD_L, top: 400, width: CARD_W, height: 140,
            borderRadius: 70, boxSizing: 'border-box', padding: '0 24px 0 54px',
            display: 'flex', alignItems: 'center', gap: 22,
            opacity: Math.min(1, pillT * 3),
            transform: `scale(${1.25 - 0.25 * pillT - 0.015 * submit})`,
            transformOrigin: 'center',
            filter: `blur(${(1 - pillT) * 6}px)`,
            background:
              `linear-gradient(90deg, rgba(244,245,239,${0.06 + 0.2 * glow}) 0%, rgba(221,227,213,${0.1 + 0.24 * glow}) 38%, rgba(221,227,213,${0.2 + 0.42 * glow}) 78%, rgba(221,227,213,${0.32 + 0.6 * glow}) 100%)`,
            backdropFilter: 'blur(26px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(26px) saturate(1.3)',
            border: '1.5px solid rgba(255,255,255,.22)',
            boxShadow:
              `0 26px 60px rgba(4,14,11,.5), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -14px 30px rgba(4,14,11,.22), 0 0 ${60 * glow}px rgba(221,227,213,${0.28 * glow})`,
          }}
        >
          <Magnifier size={38} color={C.off} />
          <div
            style={{
              flex: 1, textAlign: 'left', fontFamily: FONT.sans, fontWeight: 600,
              fontSize: 54, color: C.off, whiteSpace: 'pre', letterSpacing: '-0.01em',
            }}
          >
            {QUERY.slice(0, typed)}
            <span
              style={{
                display: 'inline-block', width: 3, height: 50, background: C.off,
                marginLeft: 4, opacity: caretOn ? 0.9 : 0, verticalAlign: '-8px',
              }}
            />
          </div>
          <div
            style={{
              width: 92, height: 92, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `rgba(221,227,213,${0.18 + 0.5 * glow})`,
              border: `1.5px solid rgba(221,227,213,${0.3 + 0.3 * glow})`,
            }}
          >
            <Waveform frame={frame} color={C.off} />
          </div>
        </div>

        {/* results card */}
        <div
          style={{
            position: 'absolute', left: CARD_L, top: CARD_TOP, width: CARD_W,
            boxSizing: 'border-box', padding: 26,
            background: C.off, borderRadius: 26,
            boxShadow: '0 50px 110px rgba(0,0,0,.5)',
            opacity: cardT,
            transform: `translateY(${(1 - cardT) * 40}px) scale(${0.97 + 0.03 * cardT})`,
          }}
        >
          {[
            { title: 'Another boutique', meta: '1.2 km · closed', t: rowA, hl: false },
            { title: 'YOUR SHOP', meta: '0.3 km · open now', t: rowB, hl: true },
          ].map((r, i) => (
            <div
              key={r.title}
              style={{
                position: 'relative', height: ROW_H, borderRadius: 16, marginTop: i ? 14 : 0,
                display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px',
                boxSizing: 'border-box',
                background: r.hl && foundT > 0.5 ? C.forest : i ? 'rgba(221,227,213,.55)' : C.white,
                border: r.hl && foundT > 0.5 ? '1px solid transparent' : '1px solid rgba(24,53,43,.08)',
                opacity: r.t,
                transform: `translateY(${(1 - r.t) * 24}px) scale(${0.97 + 0.03 * r.t})`,
                boxShadow: r.hl && foundT > 0.5 ? '0 18px 40px rgba(24,53,43,.28)' : 'none',
              }}
            >
              <div
                style={{
                  width: 54, height: 54, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: r.hl && foundT > 0.5 ? C.sage : C.off,
                  border: '1px solid rgba(24,53,43,.08)',
                }}
              >
                <Pin size={22} color={C.forest} dot={C.off} />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: FONT.sans, fontWeight: 800, fontSize: 34,
                    letterSpacing: '0.02em', lineHeight: 1.1,
                    color: r.hl && foundT > 0.5 ? C.off : C.forest,
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans, fontWeight: 600, fontSize: 22, marginTop: 4,
                    color: r.hl && foundT > 0.5 ? C.sage : C.muted,
                  }}
                >
                  {r.meta}
                </div>
              </div>
              {r.hl ? (
                <div
                  style={{
                    borderRadius: 999, background: C.sage, color: C.forest,
                    fontFamily: FONT.sans, fontWeight: 800, fontSize: 20,
                    letterSpacing: '0.14em', padding: '10px 18px',
                    opacity: foundT, transform: `scale(${0.6 + 0.4 * foundT})`,
                  }}
                >
                  FOUND
                </div>
              ) : null}
            </div>
          ))}

          {/* the pen: crop marks, the traced ring, the tip */}
          <div
            style={{
              position: 'absolute', left: 26, top: ROW_B_TOP, width: TRACE_W, height: TRACE_H,
              pointerEvents: 'none',
            }}
          >
            {frame >= BEATS.marks ? (
              <CropMarks
                p={markT}
                spread={(1 - markT) * 10 + ramp(frame, BEATS.close, 8, EASE.out) * 22}
                color={C.ink}
              />
            ) : null}
            <svg
              width={TRACE_W} height={TRACE_H} viewBox={`0 0 ${TRACE_W} ${TRACE_H}`}
              style={{ position: 'absolute', inset: 0, overflow: 'visible', opacity: 1 - ramp(frame, BEATS.found + 6, 10, EASE.smooth) }}
            >
              <rect
                x={0} y={0} width={TRACE_W} height={TRACE_H} rx={TRACE_R} fill="none"
                stroke={C.ink} strokeWidth={2.4 + 3.6 * closeFlash} strokeLinecap="round"
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - traceP}
              />
              <rect
                x={0} y={0} width={TRACE_W} height={TRACE_H} rx={TRACE_R} fill="none"
                stroke={C.ink} strokeWidth={7} strokeLinecap="round" opacity={0.22}
                pathLength={1} strokeDasharray="0.07 0.93" strokeDashoffset={-traceP}
              />
            </svg>
            {tracing ? (
              <div
                style={{
                  position: 'absolute', left: pen.x - 7, top: pen.y - 7,
                  width: 14, height: 14, borderRadius: '50%', background: C.ink,
                  boxShadow: '0 2px 6px rgba(24,53,43,.45)',
                }}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* ── the promise ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${(1 - inT) * 40 + outT * 120}px)`,
          opacity: 1 - outT,
        }}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: 590, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: FONT.display, fontSize: 156, lineHeight: 0.94, color: C.off,
              letterSpacing: '0.005em', opacity: headT,
              transform: `translateY(${(1 - headT) * 40}px)`,
            }}
          >
            GET FOUND.
          </div>
          <div
            style={{
              position: 'relative', display: 'inline-block', marginTop: 10,
              opacity: subT, transform: `translateY(${(1 - subT) * 34}px)`,
            }}
          >
            <div
              style={{
                position: 'absolute', left: -14, right: -14, top: '18%', bottom: '6%',
                background: C.sage, opacity: 0.9,
                transform: `scaleX(${markW})`, transformOrigin: 'left center',
              }}
            />
            <span style={{ position: 'relative', fontFamily: FONT.display, fontSize: 156, lineHeight: 0.94, color: C.forest }}>
              GET CHOSEN.
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: 990, textAlign: 'center',
            opacity: noteT, transform: `translateY(${(1 - noteT) * 18}px)`,
          }}
        >
          <span style={{ fontFamily: FONT.hand, fontSize: 64, color: C.sage }}>websites for main street</span>
          <span
            style={{
              display: 'block', marginTop: 18, fontFamily: FONT.sans, fontWeight: 600,
              fontSize: 26, letterSpacing: '0.2em', color: C.muted,
            }}
          >
            HOSTING · MAINTENANCE · DOMAIN INCLUDED
          </span>
        </div>

        <div
          style={{
            position: 'absolute', right: 74, bottom: 300,
            opacity: ramp(frame, BEATS.note + 6, 10, EASE.power4In),
            transform: `rotate(${14 - 26 * ramp(frame, BEATS.note + 6, 10, EASE.power4In)}deg)`,
          }}
        >
          <div style={{ fontFamily: FONT.hand, fontSize: 54, color: C.off, lineHeight: 1.05, textAlign: 'center' }}>
            built by hand,<br />in town
          </div>
        </div>
      </div>

      <Tape w={200} rot={-40} tone="clear" style={{ left: -60, top: 150, opacity: inT * 0.8 }} />
      <Tape w={200} rot={40} tone="clear" style={{ right: -60, top: 150, opacity: inT * 0.8 }} />
      <Grain opacity={0.1} />
    </AbsoluteFill>
  );
};
