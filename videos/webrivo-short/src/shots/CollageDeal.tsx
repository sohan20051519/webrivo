// Shot 04 — deck-deal-flyin, full-frame edition, 238f.
// Three things lose a local customer, dealt as physical cards onto a studio
// wall. Each card is nearly the full width of the frame, so it reads on a
// phone without squinting: number, headline, hand note, and a picture of the
// failure. Then "so they scroll on" — the cards slide away and the turn card
// slams over the board: they buy from someone else.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 238;

// cards land on the words
export const BEATS = { land: [16, 52, 94, 190], scroll: 152, out: 226 };

const CARD = { w: 968, h: 298, x: 56 };
const SLOT_Y = [296, 622, 948];
const TURN_Y = 1336;
const PILE = { x: 800, y: 1268 };

type Card = { num: string; title: string; kind: 'load' | 'pin' | 'reply' | 'turn'; note: string; turn?: boolean };

const CARDS: Card[] = [
  { num: '01', title: 'SLOW PAGE', kind: 'load', note: 'still loading…' },
  { num: '02', title: 'WRONG PIN', kind: 'pin', note: 'three streets off' },
  { num: '03', title: 'NO REPLY', kind: 'reply', note: 'three days ago' },
  { num: '04', title: 'SO THEY BUY', kind: 'turn', note: 'from someone else.', turn: true },
];

// ── the picture inside each card ──────────────────────────────────────────
const Visual: React.FC<{ kind: Card['kind']; frame: number }> = ({ kind, frame }) => {
  if (kind === 'load') {
    const p = 17 + 7 * Math.sin(frame * 0.06);
    return (
      <div style={{ width: 372 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 600, fontSize: 21, color: C.muted, marginBottom: 9 }}>
          <span>0%</span><span style={{ color: C.forest }}>3.4s</span>
        </div>
        <div style={{ height: 20, borderRadius: 10, background: C.sage, overflow: 'hidden' }}>
          <div style={{ width: `${p}%`, height: '100%', borderRadius: 10, background: C.forest }} />
        </div>
        <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 56, borderRadius: 6, background: C.sage, opacity: 0.45 + 0.25 * Math.sin(frame * 0.1 + i) }} />
          ))}
        </div>
        <div style={{ marginTop: 10, height: 12, width: '62%', borderRadius: 6, background: C.sage, opacity: 0.55 }} />
      </div>
    );
  }
  if (kind === 'pin') {
    return (
      <div style={{ width: 372, height: 210, borderRadius: 10, background: C.sage, position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.12)' }}>
        {[25, 55, 82].map((x) => (
          <div key={`v${x}`} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: 2, background: 'rgba(24,53,43,.12)' }} />
        ))}
        {[34, 68].map((y) => (
          <div key={`h${y}`} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: 2, background: 'rgba(24,53,43,.12)' }} />
        ))}
        {/* where the shop really is */}
        <div style={{ position: 'absolute', left: '79%', top: '38%', width: 62, height: 62, marginLeft: -31, marginTop: -31, borderRadius: '50%', border: `2.5px dashed ${C.forest}`, opacity: 0.7 }} />
        <div style={{ position: 'absolute', left: '79%', top: '38%', transform: 'translate(-50%,-58%)', fontFamily: FONT.hand, fontSize: 24, color: C.forest, whiteSpace: 'nowrap' }}>your shop</div>
        {/* the pin customers get sent to */}
        <div style={{ position: 'absolute', left: '21%', top: '62%', transform: 'translate(-50%,-100%)' }}>
          <svg width={44} height={58} viewBox="0 0 72 96">
            <path d="M36 0 C16 0 0 16 0 36 C0 62 36 96 36 96 C36 96 72 62 72 36 C72 16 56 0 36 0 Z" fill={C.forest} />
            <circle cx={36} cy={36} r={12} fill={C.off} />
          </svg>
        </div>
        <div style={{ position: 'absolute', left: 10, top: 8, fontFamily: FONT.hand, fontSize: 25, color: C.forest }}>they end up here</div>
      </div>
    );
  }
  if (kind === 'reply') {
    return (
      <div style={{ width: 372 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.sage, borderRadius: 10, padding: '15px 16px', marginBottom: 11 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.forest }} />
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, color: C.forest }}>New enquiry</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted }}>3 days</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.sage, borderRadius: 10, padding: '15px 16px', opacity: 0.5 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.forest }} />
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, color: C.forest }}>New enquiry</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: FONT.hand, fontSize: 26, color: C.muted }}>6 days</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: FONT.hand, fontSize: 30, color: C.muted }}>unanswered</span>
          <div style={{ flex: 1, height: 2, background: 'rgba(24,53,43,.14)' }} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: 372, display: 'flex', flexDirection: 'column', gap: 11 }}>
      {['Sunrise Bakery', 'The Bread House'].map((n, i) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 13, background: i === 0 ? 'rgba(221,227,213,.22)' : 'rgba(221,227,213,.12)', border: '1px solid rgba(221,227,213,.24)', borderRadius: 10, padding: '14px 15px' }}>
          <div style={{ fontFamily: FONT.display, fontSize: 27, color: C.sage, width: 24 }}>{i + 1}</div>
          <div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: C.off }}>{n}</div>
            <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 18, color: 'rgba(221,227,213,.62)' }}>open now · 1.2 km</div>
          </div>
        </div>
      ))}
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: '0.16em', color: 'rgba(221,227,213,.5)', marginTop: 2 }}>
        NOT YOU
      </div>
    </div>
  );
};

// ── one dealt card ────────────────────────────────────────────────────────
const DealCard: React.FC<{ card: Card; k: number; frame: number }> = ({ card, k, frame }) => {
  const land = BEATS.land[k];
  const cue = land - 12;
  const fly = interpolate(frame, [cue, cue + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });
  const y = card.turn ? TURN_Y : SLOT_Y[k];
  const h = card.turn ? 420 : CARD.h;
  const from = card.turn ? { x: 56, y: 1590 } : PILE;
  const dx = (from.x - CARD.x) * (1 - fly);
  const dy = (from.y - y) * (1 - fly);
  const rot = (card.turn ? 5 : -9) * (1 - fly);
  const arc = Math.sin(fly * Math.PI) * (card.turn ? 40 : 70);
  const landed = frame >= land;
  const impact = bell(frame, land, 4);
  const squash = bell(frame, land + 1, 2);
  // "so they scroll on" — the three problem cards begin to slide away
  const scroll = k < 3 ? ramp(frame, BEATS.scroll, 24, EASE.smooth) : 0;

  return (
    <>
      <div
        style={{
          position: 'absolute', left: CARD.x, top: y, width: CARD.w, height: h,
          boxSizing: 'border-box', borderRadius: 16, overflow: 'hidden',
          padding: card.turn ? '34px 42px' : '30px 40px',
          display: 'flex', alignItems: 'center', gap: 30,
          background: card.turn ? C.forest : C.white,
          border: card.turn ? 'none' : '1px solid rgba(24,53,43,.1)',
          boxShadow: card.turn
            ? '0 34px 70px rgba(24,53,43,.34)'
            : landed
              ? `0 ${6 + 12 * impact}px ${18 + 30 * impact}px rgba(24,53,43,${0.14 + 0.1 * impact})`
              : '0 30px 60px rgba(24,53,43,.3)',
          transform: landed
            ? `translateY(${scroll * -34}px) rotate(${scroll * -1.6}deg) scale(${1 - 0.007 * squash})`
            : `translate(${dx}px, ${dy + arc}px) rotate(${rot}deg) scale(${1 + Math.sin(fly * Math.PI) * 0.05})`,
          transformOrigin: '50% 50%',
          opacity: frame >= cue ? 1 - 0.4 * scroll : 0,
        }}
      >
        {/* index + rule */}
        <div style={{ width: 92, flexShrink: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 2 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, letterSpacing: '0.2em', color: card.turn ? C.sage : C.muted }}>
            {card.num}
          </span>
          <div style={{ width: 44, height: 3, background: card.turn ? C.sage : C.muted, opacity: 0.5 }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT.display, fontSize: card.turn ? 92 : 96, lineHeight: 0.94,
              color: card.turn ? C.off : C.forest, letterSpacing: '0.01em',
            }}
          >
            {card.title}
          </div>
          {card.turn ? (
            <>
              <div style={{ fontFamily: FONT.display, fontSize: 92, lineHeight: 1.02, color: C.sage }}>{card.note}</div>
              <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 19, letterSpacing: '0.22em', color: 'rgba(221,227,213,.62)', marginTop: 14 }}>
                EVERY. SINGLE. TIME.
              </div>
            </>
          ) : (
            <div style={{ fontFamily: FONT.hand, fontSize: 44, color: C.muted, marginTop: 8 }}>{card.note}</div>
          )}
        </div>

        <Visual kind={card.kind} frame={frame} />
      </div>

      {/* the slap */}
      {landed && impact > 0.01 ? (
        <div
          style={{
            position: 'absolute', left: CARD.x - 20, top: y - 20, width: CARD.w + 40, height: h + 40,
            borderRadius: 22, pointerEvents: 'none',
            boxShadow: `0 0 0 4px rgba(24,53,43,${0.16 * impact})`,
            opacity: impact,
          }}
        />
      ) : null}
    </>
  );
};

export const CollageDeal: React.FC = () => {
  const frame = useCurrentFrame();
  const headT = ramp(frame, 0, 14, EASE.out);
  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const push = 1 + 0.024 * ramp(frame, 18, 230, EASE.smooth);

  // the stack the cards come off — it thins out as they are dealt
  const dealt = BEATS.land.filter((l) => frame >= l - 12).length;
  const pileH = 9 - dealt * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      <div
        style={{
          position: 'absolute', inset: 0,
          background:
            `radial-gradient(90% 62% at 50% 14%, rgba(244,245,239,.92), transparent 70%),` +
            `repeating-linear-gradient(104deg, rgba(24,53,43,.03) 0 2px, transparent 2px 8px)`,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, transform: `scale(${push}) translateY(${-outT * 170}px)`, opacity: 1 - outT }}>
        {/* heading */}
        <div style={{ position: 'absolute', left: 56, right: 56, top: 128, opacity: headT, transform: `translateY(${(1 - headT) * 20}px)` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: 'rgba(24,53,43,.6)' }}>
              02 — WHY THEY LEAVE
            </div>
            <div style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: '0.06em', color: C.forest }}>
              {String(Math.min(3, dealt)).padStart(2, '0')} <span style={{ color: 'rgba(24,53,43,.35)' }}>/ 03</span>
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(24,53,43,.18)', marginTop: 18 }} />
        </div>

        {/* the deck, top-right of the turn card area, behind everything dealt */}
        <div style={{ position: 'absolute', left: PILE.x, top: PILE.y, width: 260, height: 172, opacity: ramp(frame, 0, 12, EASE.out) * (1 - ramp(frame, 176, 10, EASE.smooth)) }}>
          {Array.from({ length: Math.max(0, pileH) }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', left: (i % 5) * 2, top: -i * 3, width: 260, height: 172,
                borderRadius: 12, background: C.off, border: '1px solid rgba(24,53,43,.16)',
                boxShadow: i === 0 ? '0 14px 26px rgba(24,53,43,.22)' : '0 1px 2px rgba(24,53,43,.1)',
                transform: `rotate(${(i % 3) - 1}deg)`,
                backgroundImage: 'repeating-linear-gradient(135deg, rgba(221,227,213,.9) 0 3px, transparent 3px 10px)',
              }}
            />
          ))}
        </div>

        {CARDS.map((c, k) => (
          <DealCard key={c.num} card={c} k={k} frame={frame} />
        ))}

        {/* "so they scroll on" — the cards leave toward the bottom edge */}
        <div
          style={{
            position: 'absolute', left: 56, top: 1258,
            opacity: ramp(frame, BEATS.scroll + 4, 14, EASE.out) * (1 - ramp(frame, 184, 10, EASE.smooth)),
            display: 'flex', alignItems: 'center', gap: 16,
          }}
        >
          <span style={{ fontFamily: FONT.hand, fontSize: 58, color: C.forest }}>so they scroll on</span>
          <svg width={58} height={32} viewBox="0 0 54 30" fill="none">
            <path d="M2 15h46m0 0l-10-9m10 9l-10 9" stroke={C.forest} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* a big printed 02 under the board, so the deal never reads as empty */}
        <div
          style={{
            position: 'absolute', right: 44, bottom: 96,
            fontFamily: FONT.display, fontSize: 320, lineHeight: 0.8,
            color: 'rgba(24,53,43,.07)', letterSpacing: '-0.02em',
            opacity: ramp(frame, 0, 16, EASE.out),
          }}
        >
          02
        </div>

        <Tape w={250} rot={-8} style={{ left: 640, top: 236, opacity: 0.92 * ramp(frame, 30, 10, EASE.out) }} />
        <Daisy size={64} rot={-12} style={{ left: 44, top: 244, opacity: 0.95 * ramp(frame, 44, 10, EASE.out) }} />
      </div>

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 95% 88% at 50% 45%, transparent 62%, rgba(24,53,43,.22) 100%)` }} />
    </AbsoluteFill>
  );
};
