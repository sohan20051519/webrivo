// Shot 04 — deck-deal-flyin: the three things that lose a local customer —
// slow page, wrong pin, no reply — dealt onto the studio wall on the exact
// VO beats, then the turn: "so we fix ALL OF IT." 8f dive + 4f settle + press,
// flight ghosts, anticipation pull, camera settles wide.
import React from 'react';
import { AbsoluteFill, Img, Easing, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 176;

const BOARD = { w: 980, h: 1080 };
const boardX = (1080 - BOARD.w) / 2;
const boardY = 380;

type Card = {
  file?: string;        // capture PNG (2x)
  cssW: number; cssH: number; // CSS-px size of the capture (png = 2x)
  tx: number; ty: number;     // board-local target
  rot: number;
  pileX: number; pileY: number; // pile-local offset
  pileRot: number;
  render?: React.ReactNode;     // built-in card (no capture)
  plain?: boolean;              // no box chrome (round seal etc.)
};

const PILE = { x: 420, y: 1420 }; // screen coords of pile origin

const LABEL: React.CSSProperties = {
  fontFamily: FONT.sans, fontWeight: 700, fontSize: 17,
  letterSpacing: '0.2em', color: C.muted,
};

const CARDS: Card[] = [
  {
    // problem 01 — a page nobody waits for
    cssW: 430, cssH: 280,
    tx: 40, ty: 140, rot: -2.5, pileX: 300, pileY: 1000, pileRot: 8,
    render: (
      <div
        style={{
          width: 430, height: 280, background: C.white, borderRadius: 10,
          padding: '24px 30px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
      >
        <div style={LABEL}>PROBLEM 01</div>
        <div style={{ fontFamily: FONT.display, fontSize: 76, lineHeight: 0.95, color: C.forest }}>
          SLOW<br />PAGE
        </div>
        <div>
          <div style={{ fontFamily: FONT.hand, fontSize: 32, color: C.muted }}>still loading…</div>
          <div style={{ height: 12, borderRadius: 6, background: C.sage, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ width: '14%', height: '100%', background: C.forest }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    // problem 02 — the map pin lands three streets off
    cssW: 430, cssH: 280,
    tx: 510, ty: 180, rot: 2.8, pileX: 380, pileY: 1070, pileRot: -11,
    render: (
      <div
        style={{
          width: 430, height: 280, background: '#EDEFE6', borderRadius: 10,
          padding: '24px 30px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.08)',
        }}
      >
        <div style={LABEL}>PROBLEM 02</div>
        <div
          style={{
            position: 'relative', height: 118, borderRadius: 8, overflow: 'hidden',
            background: C.sage, boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.1)',
          }}
        >
          {[24, 58, 92].map((x) => (
            <div key={`v${x}`} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: 1, background: 'rgba(24,53,43,.12)' }} />
          ))}
          {[30, 70].map((y) => (
            <div key={`h${y}`} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: 1, background: 'rgba(24,53,43,.12)' }} />
          ))}
          {/* where they actually are */}
          <div
            style={{
              position: 'absolute', left: '76%', top: '38%', width: 46, height: 46,
              marginLeft: -23, marginTop: -23, borderRadius: '50%',
              border: `2px dashed ${C.forest}`, opacity: 0.7,
            }}
          />
          {/* the wrong pin */}
          <div style={{ position: 'absolute', left: '24%', top: '52%', transform: 'translate(-50%,-100%)' }}>
            <svg width={34} height={45} viewBox="0 0 72 96">
              <path d="M36 0 C16 0 0 16 0 36 C0 62 36 96 36 96 C36 96 72 62 72 36 C72 16 56 0 36 0 Z" fill={C.forest} />
              <circle cx={36} cy={36} r={12} fill={C.sage} />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONT.display, fontSize: 46, color: C.forest, lineHeight: 1 }}>WRONG PIN</div>
          <div style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted }}>3 streets off</div>
        </div>
      </div>
    ),
  },
  {
    // problem 03 — the enquiry that never gets answered
    cssW: 400, cssH: 260,
    tx: 60, ty: 480, rot: 1.6, pileX: 240, pileY: 1110, pileRot: 14,
    render: (
      <div
        style={{
          width: 400, height: 260, background: C.white, borderRadius: 10,
          padding: '24px 30px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
      >
        <div style={LABEL}>PROBLEM 03</div>
        <div style={{ fontFamily: FONT.display, fontSize: 74, lineHeight: 0.95, color: C.forest }}>NO REPLY</div>
        <div>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: C.sage, borderRadius: 8, padding: '10px 14px',
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 5, background: C.forest }} />
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 20, color: C.forest }}>
              New enquiry
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted }}>3 days ago</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    // the turn — this is what we fix
    cssW: 460, cssH: 300,
    tx: 470, ty: 620, rot: -3, pileX: 420, pileY: 1010, pileRot: -6,
    render: (
      <div
        style={{
          width: 460, height: 300, background: C.forest, color: C.off,
          borderRadius: 10, padding: '28px 34px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2,
        }}
      >
        <span style={{ fontFamily: FONT.hand, fontSize: 46, color: C.sage }}>so we fix</span>
        <span style={{ fontFamily: FONT.display, fontSize: 76, lineHeight: 0.95 }}>ALL OF IT.</span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: '0.2em', color: C.muted, marginTop: 10 }}>
          ONE STUDIO · ONE BILL
        </span>
      </div>
    ),
  },
];

// cards land on the story beats (VO names each problem in turn):
// "A slow page." / "A pin three streets off." / "A form nobody answers." / "They leave."
export const BEATS = { land: [34, 74, 122, 140], out: 164 };
const LAND = BEATS.land;
const cue = (k: number) => LAND[k] - 12;
const DIVE_EASE = EASE.smooth;
const SETTLE_EASE = Easing.bezier(0.3, 0, 0.25, 1.15);

const DealCard: React.FC<{ card: Card; k: number; frame: number; antT: number; camZ: number }> = ({
  card, k, frame, antT, camZ,
}) => {
  const c = cue(k);
  const diveT = interpolate(frame, [c, c + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: DIVE_EASE });
  const settleT = interpolate(frame, [c + 8, c + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SETTLE_EASE });
  const dx = (card.pileX - card.tx) * (1 - diveT);
  const dy = (card.pileY - card.ty) * (1 - diveT);
  const rotFlight = card.pileRot * (1 - diveT);
  const arc = Math.sin(diveT * Math.PI) * 90;
  const dealScale = 1 + Math.sin(diveT * Math.PI) * 0.06;
  const press = interpolate(frame, [c + 10, c + 11, c + 12], [1, 0.995, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = dealScale * press;
  const isLanded = frame >= c + 12;
  const inPile = frame < c;
  const antDy = inPile ? 26 * antT : 0;
  const antPull = inPile ? -18 * antT : 0;

  const w = card.file ? card.cssW : (card.render ? card.cssW : 0);
  const h = card.file ? card.cssH : (card.render ? card.cssH : 0);
  const chrome = !card.plain;

  const shadow = isLanded
    ? `0 4px 12px rgba(24,53,43,.22)`
    : inPile
      ? '0 1px 3px rgba(24,53,43,.35)'
      : `0 ${30 - 22 * settleT}px ${60 - 44 * settleT}px rgba(24,53,43,${(0.32 - 0.2 * settleT).toFixed(3)})`;

  const showGhost = diveT > 0.02 && diveT < 0.98;
  const gx = (card.pileX - card.tx) * 0.06;
  const gy = (card.pileY - card.ty) * 0.06;

  return (
    <>
      {showGhost && card.file ? (
        <div
          style={{
            position: 'absolute', left: boardX + card.tx, top: boardY + card.ty, width: w, height: h,
            transform: `translate(${dx + gx}px, ${dy + gy}px) rotate(${rotFlight}deg) scale(${scale})`,
            opacity: 0.25 * (1 - diveT), filter: 'blur(6px)', borderRadius: 12, overflow: 'hidden',
          }}
        >
          {card.file
            ? <Img src={staticFile(`captures/${card.file}`)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill' }} />
            : card.render}
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute', left: boardX + card.tx, top: boardY + card.ty, width: w, height: h,
          transform: isLanded
            ? `rotate(${card.rot}deg)`
            : inPile
              ? `translate(${card.pileX - card.tx + antPull}px, ${card.pileY - card.ty + antDy}px) rotate(${card.pileRot}deg)`
              : `translate(${dx}px, ${dy + arc}px) rotate(${rotFlight}deg) scale(${scale})`,
          boxShadow: chrome ? shadow : 'none',
          borderRadius: chrome ? 12 : 0,
          overflow: chrome ? 'hidden' : 'visible',
        }}
      >
        {card.file
          ? <Img src={staticFile(`captures/${card.file}`)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill' }} />
          : card.render}
      </div>
      {/* impact flick when it lands */}
      {bell(frame, c + 11, 3) > 0 ? (
        <div
          style={{
            position: 'absolute', left: boardX + card.tx - 20, top: boardY + card.ty - 20,
            width: w + 40, height: h + 40, borderRadius: 16,
            boxShadow: `0 0 0 3px rgba(183,197,178,${0.4 * bell(frame, c + 11, 3)})`,
            opacity: 0.5 * bell(frame, c + 11, 3),
          }}
        />
      ) : null}
    </>
  );
};

// camera: board nearly fills the frame → gentle settle to whole board (1.22 → 1.0)
const camZAt = (f: number) => {
  const z1 = 1.22, z2 = 1.0;
  const t = ramp(f, 34, 70, EASE.smooth);
  return z1 + (z2 - z1) * t + (f > 140 ? 0.012 * ramp(f, 140, 24, EASE.smooth) : 0);
};

export const CollageDeal: React.FC = () => {
  const frame = useCurrentFrame();
  const antT = ramp(frame, 26, 10, EASE.out);
  const camZ = camZAt(frame);
  const inT = ramp(frame, 0, 14, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      {/* paper light */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(90% 60% at 50% 26%, rgba(244,245,239,.7), transparent 72%), radial-gradient(70% 50% at 18% 86%, rgba(244,245,239,.45), transparent 72%)` }} />

      {/* camera wrapper */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transform: `translateY(${(1 - inT) * 220 - outT * 2200}px) scale(${camZ})`,
          transformOrigin: '540px 920px',
        }}
      >
        {/* the board */}
        <div
          style={{
            position: 'absolute', left: boardX, top: boardY, width: BOARD.w, height: BOARD.h,
            background: C.off, borderRadius: 14, boxShadow: '0 40px 110px rgba(24,53,43,.35), 0 8px 26px rgba(24,53,43,.18)',
          }}
        >
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 110,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT.display, fontSize: 64, color: C.forest, letterSpacing: '0.02em',
            }}
          >
            THE STUDIO WALL
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 104, height: 2, background: 'rgba(24,53,43,.12)', margin: '0 60px' }} />
        </div>

        {/* pile stack under the incoming cards (a shadow blob) */}
        <div
          style={{
            position: 'absolute', left: PILE.x - 140, top: PILE.y - 60, width: 420, height: 320,
            background: 'rgba(24,53,43,.16)', borderRadius: 30, filter: 'blur(24px)',
            opacity: 1 - ramp(frame, 60, 40, EASE.smooth),
          }}
        />

        {CARDS.map((card, k) => (
          <DealCard key={k} card={card} k={k} frame={frame} antT={antT} camZ={camZ} />
        ))}

        {/* tape + daisy dressing once board is full */}
        <Tape w={230} rot={-8} style={{ left: boardX + 700, top: boardY - 24, opacity: ramp(frame, 116, 10, EASE.out) }} />
        <Daisy size={64} rot={-12} style={{ left: boardX + 60, top: boardY - 40, opacity: 0.95 * ramp(frame, 122, 10, EASE.out) }} />
      </div>

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 95% 85% at 50% 45%, transparent 60%, rgba(24,53,43,.3) 100%)` }} />
    </AbsoluteFill>
  );
};
