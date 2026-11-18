// Shot 04 — deck-deal-flyin (adapted): real collage cutouts (story card, to-do
// note, "live in 3 days" seal) dealt from a pile onto a paper board with the
// card's hard-accelerated cue rhythm (cue = 36 + 4k − 0.0792·k(k−1), 8f dive +
// 4f settle + press), flight ghosts, anticipation beat, camera pulls up.
// The 4th card is the offer: "your site." — no invented work shown.
import React from 'react';
import { AbsoluteFill, Img, Easing, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 170;

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

const CARDS: Card[] = [
  {
    // capture's clip box starts mid-seal (site seal overlaps the card top),
    // so it sits low enough that its opaque top strip clears the headline
    // pile coords are board-relative; boardX/boardY offset puts the dealt
    // pile on screen at ~(300–560, 1380–1560) — over the pile shadow
    file: 'story-card.png', cssW: 563, cssH: 437,
    tx: 90, ty: 120, rot: -2.2, pileX: 300, pileY: 1000, pileRot: 8,
  },
  {
    file: 'todo-note.png', cssW: 317, cssH: 307,
    tx: 120, ty: 640, rot: 2.8, pileX: 380, pileY: 1070, pileRot: -11,
  },
  {
    // built-in seal covers the baked clipped seal in the story-card capture
    cssW: 170, cssH: 170, plain: true,
    tx: 522, ty: 103, rot: 10, pileX: 470, pileY: 1020, pileRot: 4,
    render: (
      <div
        style={{
          width: 170, height: 170, borderRadius: '50%', background: C.forest,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative', filter: 'drop-shadow(0 10px 22px rgba(24,53,43,.4))',
        }}
      >
        <div style={{ position: 'absolute', inset: 9, border: '2px dashed rgba(244,245,239,.45)', borderRadius: '50%' }} />
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 19, letterSpacing: '0.14em', color: C.sage }}>LIVE IN</span>
        <span style={{ fontFamily: FONT.display, fontSize: 44, lineHeight: 1.05, color: C.off }}>3 DAYS</span>
        <span style={{ fontFamily: FONT.hand, fontSize: 26, color: C.sage, marginTop: 2 }}>*per site</span>
      </div>
    ),
  },
  {
    // the offer card — hand lettered
    cssW: 360, cssH: 300,
    tx: 480, ty: 700, rot: -5, pileX: 240, pileY: 1110, pileRot: 14,
    render: (
      <div
        style={{
          width: 360, height: 300, background: C.forest, color: C.off,
          borderRadius: 10, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: FONT.sans,
        }}
      >
        <span style={{ fontFamily: FONT.hand, fontSize: 64, color: C.sage }}>yours could be</span>
        <span style={{ fontFamily: FONT.display, fontSize: 96, lineHeight: 1 }}>NEXT</span>
      </div>
    ),
  },
];

// tuned deal rhythm from the card
const cue = (k: number) => 36 + 4 * k - 0.0792 * k * (k - 1);
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
      {showGhost ? (
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
  return z1 + (z2 - z1) * t + (f > 120 ? 0.012 * ramp(f, 120, 40, EASE.smooth) : 0);
};

export const CollageDeal: React.FC = () => {
  const frame = useCurrentFrame();
  const antT = ramp(frame, 26, 10, EASE.out);
  const camZ = camZAt(frame);
  const inT = ramp(frame, 0, 14, EASE.out);
  const outT = ramp(frame, 156, 14, EASE.power4In);

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
        <Tape w={230} rot={-8} style={{ left: boardX + 700, top: boardY - 24, opacity: ramp(frame, 120, 10, EASE.out) }} />
        <Daisy size={64} rot={-12} style={{ left: boardX + 60, top: boardY - 40, opacity: 0.95 * ramp(frame, 126, 10, EASE.out) }} />
      </div>

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 95% 85% at 50% 45%, transparent 60%, rgba(24,53,43,.3) 100%)` }} />
    </AbsoluteFill>
  );
};
