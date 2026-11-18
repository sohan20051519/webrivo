// Shot 04 — deck-deal-flyin, studio-wall edition.
// The three things that lose a local customer are physical cards in a stack on
// the desk. The camera opens low and close on the stack (the board behind it in
// shadow), the stack pulls back in an anticipation beat, then each card is dealt
// onto the wall on its own spoken line. The light opens from the stack outward.
// Last card is the turn: "so we fix ALL OF IT."
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 176;

const BOARD = { w: 980, h: 1080 };
const boardX = (1080 - BOARD.w) / 2;
const boardY = 380;

type Card = {
  cssW: number;
  cssH: number;
  tx: number;
  ty: number;
  rot: number;
  pileX: number;
  pileY: number;
  pileRot: number;
  render: React.ReactNode;
};

// the stack sits on the desk at the bottom-right, half in frame
const PILE = { x: 700, y: 1290 };

const LABEL: React.CSSProperties = {
  fontFamily: FONT.sans, fontWeight: 700, fontSize: 17,
  letterSpacing: '0.2em', color: C.muted,
};

const CARDS: Card[] = [
  {
    // problem 01 — a page nobody waits for
    cssW: 430, cssH: 280,
    tx: 40, ty: 140, rot: -2.5, pileX: 620, pileY: 1270, pileRot: 8,
    render: (
      <div
        style={{
          width: 430, height: 280, background: C.white, borderRadius: 10,
          padding: '24px 30px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.08)',
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
    tx: 510, ty: 180, rot: 2.8, pileX: 700, pileY: 1280, pileRot: -11,
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
    tx: 60, ty: 480, rot: 1.6, pileX: 660, pileY: 1290, pileRot: 14,
    render: (
      <div
        style={{
          width: 400, height: 260, background: C.white, borderRadius: 10,
          padding: '24px 30px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.08)',
        }}
      >
        <div style={LABEL}>PROBLEM 03</div>
        <div style={{ fontFamily: FONT.display, fontSize: 74, lineHeight: 0.95, color: C.forest }}>NO REPLY</div>
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
    ),
  },
  {
    // the turn — this is what we fix
    cssW: 460, cssH: 300,
    tx: 470, ty: 620, rot: -3, pileX: 690, pileY: 1260, pileRot: -6,
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
const SETTLE_EASE = EASE.press;

// the stack: physical height, deterministic jitter, one card back per layer
const BACKS = Array.from({ length: 9 }).map((_, k) => ({
  x: (((k * 7) % 9) - 4) * 2.4,
  y: -k * 3,
  rot: (((k * 5) % 7) - 3) * 0.9,
  op: 1 - k * 0.03,
}));

const DealCard: React.FC<{ card: Card; k: number; frame: number; antT: number }> = ({
  card, k, frame, antT,
}) => {
  const c = cue(k);
  const diveT = interpolate(frame, [c, c + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: DIVE_EASE });
  const settleT = interpolate(frame, [c + 8, c + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SETTLE_EASE });
  const dx = (card.pileX - boardX - card.tx) * (1 - diveT);
  const dy = (card.pileY - boardY - card.ty) * (1 - diveT);
  const rotFlight = card.pileRot * (1 - diveT);
  const arc = Math.sin(diveT * Math.PI) * 90;
  const dealScale = 1 + Math.sin(diveT * Math.PI) * 0.06;
  const press = interpolate(frame, [c + 10, c + 11, c + 12], [1, 0.995, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = dealScale * press;
  const isLanded = frame >= c + 12;
  const inPile = frame < c;
  const antDy = inPile ? 26 * antT : 0;
  const antPull = inPile ? -18 * antT : 0;

  const w = card.cssW;
  const h = card.cssH;

  const shadow = isLanded
    ? '0 4px 12px rgba(24,53,43,.22)'
    : inPile
      ? '0 1px 3px rgba(24,53,43,.35)'
      : `0 ${30 - 22 * settleT}px ${60 - 44 * settleT}px rgba(24,53,43,${(0.32 - 0.2 * settleT).toFixed(3)})`;

  const showGhost = diveT > 0.02 && diveT < 0.98;
  const gx = (card.pileX - boardX - card.tx) * 0.06;
  const gy = (card.pileY - boardY - card.ty) * 0.06;

  return (
    <>
      {showGhost ? (
        <div
          style={{
            position: 'absolute', left: card.tx, top: card.ty, width: w, height: h,
            transform: `translate(${dx + gx}px, ${dy + gy}px) rotate(${rotFlight}deg) scale(${scale})`,
            opacity: 0.25 * (1 - diveT), filter: 'blur(6px)', borderRadius: 12, overflow: 'hidden',
          }}
        >
          {card.render}
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute', left: card.tx, top: card.ty, width: w, height: h,
          transform: isLanded
            ? `rotate(${card.rot}deg)`
            : inPile
              ? `translate(${card.pileX - boardX - card.tx + antPull}px, ${card.pileY - boardY - card.ty + antDy}px) rotate(${card.pileRot}deg)`
              : `translate(${dx}px, ${dy + arc}px) rotate(${rotFlight}deg) scale(${scale})`,
          boxShadow: shadow,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {card.render}
      </div>
      {/* impact flick when it lands */}
      {bell(frame, c + 11, 3) > 0 ? (
        <div
          style={{
            position: 'absolute', left: card.tx - 20, top: card.ty - 20,
            width: w + 40, height: h + 40, borderRadius: 16,
            boxShadow: `0 0 0 3px rgba(137,153,130,${0.45 * bell(frame, c + 11, 3)})`,
            opacity: 0.5 * bell(frame, c + 11, 3),
          }}
        />
      ) : null}
    </>
  );
};

export const CollageDeal: React.FC = () => {
  const frame = useCurrentFrame();

  // anticipation: the stack presses down and the top card pulls back, once,
  // just before the first card leaves the pile (first deal cue is f22)
  const antT = frame < 20
    ? ramp(frame, 10, 8, EASE.out)
    : Math.max(0, 1 - (frame - 20) / 2);

  // camera: close, low and tilted on the stack → rises and settles on the wall
  const camT = ramp(frame, 0, 46, EASE.smooth);
  const rx = 34 - 15 * camT;
  const rz = 5 - 5 * camT;
  const z = 1.42 - 0.42 * camT + 0.02 * ramp(frame, 140, 30, EASE.smooth);

  const inT = ramp(frame, 0, 12, EASE.out);
  const outT = ramp(frame, BEATS.out, 12, EASE.power4In);

  // light opens outward from the stack and reveals the wall
  const lightR = interpolate(frame, [6, 38], [0, 1500], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });

  const landed = LAND.filter((l) => frame >= l - 10).length;

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />

      {/* desk: paper light + a wide brushed band, sage on sage */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            `radial-gradient(90% 62% at 50% 24%, rgba(244,245,239,.85), transparent 70%),` +
            `radial-gradient(70% 50% at 18% 88%, rgba(244,245,239,.55), transparent 72%),` +
            `repeating-linear-gradient(104deg, rgba(24,53,43,.035) 0 2px, transparent 2px 7px)`,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, perspective: 1500, perspectiveOrigin: '50% 60%' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            transform: `translateY(${(1 - inT) * 160 - outT * 2200}px) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${z})`,
            transformOrigin: '540px 1180px',
          }}
        >
          {/* the wall */}
          <div
            style={{
              position: 'absolute', left: boardX, top: boardY, width: BOARD.w, height: BOARD.h,
              background: C.off, borderRadius: 14,
              boxShadow: '0 40px 110px rgba(24,53,43,.32), 0 8px 26px rgba(24,53,43,.16)',
            }}
          >
            <div
              style={{
                position: 'absolute', left: 0, right: 0, top: 0, height: 110,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT.display, fontSize: 60, color: C.forest, letterSpacing: '0.02em',
              }}
            >
              THE STUDIO WALL
            </div>
            <div style={{ position: 'absolute', left: 60, right: 60, top: 104, height: 2, background: 'rgba(24,53,43,.12)' }} />

            {/* the wall is in shadow until the light reaches it from the stack */}
            <div
              style={{
                position: 'absolute', inset: 0, borderRadius: 14,
                background: `radial-gradient(circle ${lightR}px at ${PILE.x - boardX}px ${PILE.y - boardY}px, rgba(24,53,43,0) 0%, rgba(24,53,43,0) 42%, rgba(24,53,43,.55) 100%)`,
              }}
            />
          </div>

          {/* the stack, sitting in front of the wall */}
          <div
            style={{
              position: 'absolute', left: PILE.x, top: PILE.y, width: 320, height: 210,
              transform: `translate(${-160}px, ${48 * antT}px)`,
            }}
          >
            {BACKS.map((b, k) => (
              <div
                key={k}
                style={{
                  position: 'absolute', left: b.x, top: b.y, width: 320, height: 210,
                  borderRadius: 9, background: C.sage,
                  border: '1px solid rgba(24,53,43,.16)',
                  boxShadow: k === 0 ? '0 10px 22px rgba(24,53,43,.28)' : '0 1px 2px rgba(24,53,43,.14)',
                  opacity: b.op,
                  transform: `rotate(${b.rot + (k === 0 ? antT * -3 : 0)}deg) translateX(${k === 0 ? antT * -30 : 0}px)`,
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(255,255,255,.5) 0 2px, transparent 2px 9px)',
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute', left: 130, top: 84, width: 60, height: 42,
                border: `2px dashed rgba(24,53,43,.28)`, borderRadius: 6,
              }}
            />
          </div>

          {/* cards deal onto the wall */}
          <div style={{ position: 'absolute', left: boardX, top: boardY, width: BOARD.w, height: BOARD.h }}>
            {CARDS.map((card, k) => (
              <DealCard key={k} card={card} k={k} frame={frame} antT={antT} />
            ))}
          </div>

          {/* tape + daisy once the wall is full */}
          <Tape w={230} rot={-8} style={{ left: boardX + 700, top: boardY - 24, opacity: ramp(frame, 116, 10, EASE.out) }} />
          <Daisy size={64} rot={-12} style={{ left: boardX + 60, top: boardY - 40, opacity: 0.95 * ramp(frame, 122, 10, EASE.out) }} />
        </div>
      </div>

      {/* mono count of problems on the wall */}
      <div
        style={{
          position: 'absolute', left: 64, bottom: 150,
          display: 'flex', alignItems: 'center', gap: 16,
          opacity: ramp(frame, 20, 10, EASE.out) * (1 - outT),
        }}
      >
        <div style={{ width: 44, height: 2, background: C.forest, opacity: 0.5 }} />
        <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, letterSpacing: '0.22em', color: C.forest, opacity: 0.62 }}>
          PROBLEMS ON THE WALL
        </div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, letterSpacing: '0.1em', color: C.forest }}>
          {String(Math.min(landed, 3)).padStart(2, '0')}
          <span style={{ opacity: 0.4 }}> / 03</span>
        </div>
      </div>

      <Grain opacity={0.1} />
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 95% 85% at 50% 45%, transparent 58%, rgba(24,53,43,.26) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
