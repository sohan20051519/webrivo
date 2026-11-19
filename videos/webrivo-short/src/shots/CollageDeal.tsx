// Shot 03 — deck-deal-flyin, full-frame edition, 140f.
// What a shop without a page costs: three cards dealt onto a studio wall —
// invisible, unproven, unreachable. Each is nearly the full width of the
// frame, so it reads on a phone. They slide away as one dark panel slams over
// the board: the sale goes to someone else. Every time.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 140;

// three cards land on the first line, the panel on "every time"
export const BEATS = { land: [12, 30, 48, 96], scroll: 78, out: 126 };

const CARD = { w: 968, h: 298, x: 56 };
const SLOT_Y = [296, 622, 948];
const TURN = { x: 56, y: 196, w: 968, h: 1360 };
const PILE = { x: 800, y: 1268 };

type Card = { num: string; title: string; kind: 'find' | 'trust' | 'book'; note: string };

const CARDS: Card[] = [
  { num: '01', title: 'OFF MAP', kind: 'find', note: 'not on the map' },
  { num: '02', title: 'NO PROOF', kind: 'trust', note: 'no photos yet' },
  { num: '03', title: 'NO SLOTS', kind: 'book', note: 'nothing to tap' },
];

// who they buy from instead — the panel's proof
const ELSE = [
  { name: 'Sunrise Bakery', meta: 'open now · 1.2 km · ★ 5.0' },
  { name: 'The Bread House', meta: 'opens 7 am · 2.8 km · ★ 4.0' },
];

// ── the picture inside each card ──────────────────────────────────────────
const Visual: React.FC<{ kind: Card['kind']; frame: number }> = ({ kind }) => {
  if (kind === 'find') {
    return (
      <div style={{ width: 372, height: 210, borderRadius: 10, background: C.sage, position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.12)' }}>
        {[30, 62].map((x) => (
          <div key={`v${x}`} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: 2, background: 'rgba(24,53,43,.12)' }} />
        ))}
        {[36, 70].map((y) => (
          <div key={`h${y}`} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: 2, background: 'rgba(24,53,43,.12)' }} />
        ))}
        {/* the map is there — the shop isn't on it */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', width: 78, height: 78, marginLeft: -39, marginTop: -39, borderRadius: '50%', border: `3px dashed ${C.forest}`, opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', fontFamily: FONT.hand, fontSize: 27, color: C.forest, opacity: 0.8, whiteSpace: 'nowrap' }}>no pin</div>
        <div style={{ position: 'absolute', left: 12, bottom: 10, fontFamily: FONT.sans, fontWeight: 800, fontSize: 15, letterSpacing: '0.14em', color: C.muted }}>0 RESULTS NEARBY</div>
      </div>
    );
  }
  if (kind === 'trust') {
    return (
      <div style={{ width: 372 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 78, borderRadius: 7, background: C.sage, boxShadow: 'inset 0 0 0 1.5px rgba(24,53,43,.1)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 24, height: 2, marginLeft: -12, marginTop: -1, background: 'rgba(24,53,43,.18)', transform: 'rotate(-45deg)' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 14 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width={26} height={26} viewBox="0 0 24 24"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z" fill="none" stroke={C.muted} strokeWidth="1.8" /></svg>
          ))}
          <span style={{ fontFamily: FONT.hand, fontSize: 28, color: C.muted, marginLeft: 8 }}>no reviews yet</span>
        </div>
      </div>
    );
  }
  if (kind === 'book') {
    return (
      <div style={{ width: 372 }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 16, letterSpacing: '0.16em', color: C.muted, marginBottom: 9 }}>PICK A TIME</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ height: 44, borderRadius: 7, border: '1.5px dashed rgba(24,53,43,.2)' }} />
          ))}
        </div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: FONT.hand, fontSize: 30, color: C.muted }}>nothing to tap</span>
          <div style={{ flex: 1, height: 2, background: 'rgba(24,53,43,.14)' }} />
        </div>
      </div>
    );
  }
  return null;
};

// ── one dealt card ────────────────────────────────────────────────────────
const DealCard: React.FC<{ card: Card; k: number; frame: number }> = ({ card, k, frame }) => {
  const land = BEATS.land[k];
  const cue = land - 12;
  const fly = interpolate(frame, [cue, cue + 10], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });
  const y = SLOT_Y[k];
  const dx = (PILE.x - CARD.x) * (1 - fly);
  const dy = (PILE.y - y) * (1 - fly);
  const rot = -9 * (1 - fly);
  const arc = Math.sin(fly * Math.PI) * 70;
  const landed = frame >= land;
  const impact = bell(frame, land, 4);
  const squash = bell(frame, land + 1, 2);
  // "so they scroll on" — the three problem cards begin to slide away
  const scroll = ramp(frame, BEATS.scroll, 24, EASE.smooth);

  return (
    <>
      <div
        style={{
          position: 'absolute', left: CARD.x, top: y, width: CARD.w, height: CARD.h,
          boxSizing: 'border-box', borderRadius: 16, overflow: 'hidden',
          padding: '30px 40px',
          display: 'flex', alignItems: 'center', gap: 30,
          background: C.white,
          border: '1px solid rgba(24,53,43,.1)',
          boxShadow: landed
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
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, letterSpacing: '0.2em', color: C.muted }}>
            {card.num}
          </span>
          <div style={{ width: 44, height: 3, background: C.muted, opacity: 0.5 }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: FONT.display, fontSize: 96, lineHeight: 0.94,
              color: C.forest, letterSpacing: '0.01em',
            }}
          >
            {card.title}
          </div>
          <div style={{ fontFamily: FONT.hand, fontSize: 44, color: C.muted, marginTop: 8 }}>{card.note}</div>
        </div>

        <Visual kind={card.kind} frame={frame} />
      </div>

      {/* the slap */}
      {landed && impact > 0.01 ? (
        <div
          style={{
            position: 'absolute', left: CARD.x - 20, top: y - 20, width: CARD.w + 40, height: CARD.h + 40,
            borderRadius: 22, pointerEvents: 'none',
            boxShadow: `0 0 0 4px rgba(24,53,43,${0.16 * impact})`,
            opacity: impact,
          }}
        />
      ) : null}
    </>
  );
};


// ── the turn: one dark panel over the whole board ────────────────────────
const TurnPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const land = BEATS.land[3];
  // the panel is pressed onto the wall: it arrives already in place, oversized
  // and turned, and settles on the word. No travel, so nothing pops in at the
  // frame edge while the last cards are still leaving.
  const cue = land - 18;
  const fly = interpolate(frame, [cue, land - 2], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.smooth,
  });
  const landed = frame >= land;
  const impact = bell(frame, land, 4);
  const lift = (1 - fly) * 54;

  return (
    <>
      <div
        style={{
          position: 'absolute', left: TURN.x, top: TURN.y, width: TURN.w, height: TURN.h,
          boxSizing: 'border-box', borderRadius: 22, overflow: 'hidden',
          padding: '52px 58px', display: 'flex', flexDirection: 'column',
          background: C.forest,
          boxShadow: landed
            ? `0 ${34 + 20 * impact}px ${80 + 30 * impact}px rgba(24,53,43,.42)`
            : '0 40px 90px rgba(24,53,43,.4)',
          opacity: ramp(frame, cue, 5, EASE.out),
          transform: landed
            ? `scale(${1 - 0.007 * impact})`
            : `translateY(${lift}px) rotate(${2.4 * (1 - fly)}deg) scale(${1 + 0.1 * (1 - fly)})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* a light in the top-left corner so the panel is printed, not flat */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 46% at 18% 6%, rgba(221,227,213,.14), rgba(24,53,43,0) 68%)' }} />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 21, letterSpacing: '0.22em', color: 'rgba(221,227,213,.62)' }}>
            03 — THE TURN
          </span>
          <span style={{ fontFamily: FONT.hand, fontSize: 40, color: 'rgba(221,227,213,.8)' }}>every time</span>
        </div>

        <div style={{ position: 'relative', fontFamily: FONT.hand, fontSize: 76, color: C.sage, marginTop: 30 }}>
          so they scroll on,
        </div>
        <div style={{ position: 'relative', fontFamily: FONT.display, fontSize: 196, lineHeight: 0.92, color: C.off, marginTop: 8 }}>
          BUY FROM<br />SOMEONE<br />ELSE.
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ position: 'relative', height: 2, background: 'repeating-linear-gradient(90deg, rgba(221,227,213,.34) 0 12px, transparent 12px 24px)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26 }}>
          {ELSE.map((r, i) => (
            <div
              key={r.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 18,
                background: 'rgba(221,227,213,.1)', border: '1px solid rgba(221,227,213,.2)',
                borderRadius: 12, padding: '0 22px', height: 116,
                opacity: ramp(frame, land + 6 + i * 5, 10, EASE.out),
                transform: `translateY(${(1 - ramp(frame, land + 6 + i * 5, 10, EASE.out)) * 16}px)`,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 22, background: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, color: C.forest }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.off, whiteSpace: 'nowrap' }}>{r.name}</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 21, color: 'rgba(221,227,213,.66)', marginTop: 2 }}>{r.meta}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 26 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 19, letterSpacing: '0.22em', color: 'rgba(221,227,213,.55)' }}>
            NOT YOU. NOT ONCE.
          </span>
          <div style={{ border: `3px solid ${C.sage}`, borderRadius: 9, padding: '8px 18px', transform: 'rotate(-6deg)' }}>
            <span style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: '0.08em', color: C.sage }}>SOMEONE ELSE</span>
          </div>
        </div>
      </div>

      {/* the slam */}
      {landed && impact > 0.01 ? (
        <div
          style={{
            position: 'absolute', left: TURN.x - 22, top: TURN.y - 22, width: TURN.w + 44, height: TURN.h + 44,
            borderRadius: 28, pointerEvents: 'none',
            boxShadow: `0 0 0 5px rgba(24,53,43,${0.18 * impact})`,
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
  const push = 1 + 0.024 * ramp(frame, 12, 132, EASE.smooth);

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
              03 — WHAT'S MISSING
            </div>
            <div style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: '0.06em', color: C.forest }}>
              {String(Math.min(3, dealt)).padStart(2, '0')} <span style={{ color: 'rgba(24,53,43,.35)' }}>/ 03</span>
            </div>
          </div>
          <div style={{ height: 2, background: 'rgba(24,53,43,.18)', marginTop: 18 }} />
        </div>

        {/* the deck, top-right of the turn card area, behind everything dealt */}
        <div style={{ position: 'absolute', left: PILE.x, top: PILE.y, width: 260, height: 172, opacity: ramp(frame, 0, 12, EASE.out) * (1 - ramp(frame, 70, 8, EASE.smooth)) }}>
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
        <TurnPanel frame={frame} />

        {/* a big printed 03 under the board, so the deal never reads as empty */}
        <div
          style={{
            position: 'absolute', right: 44, bottom: 96,
            fontFamily: FONT.display, fontSize: 320, lineHeight: 0.8,
            color: 'rgba(24,53,43,.07)', letterSpacing: '-0.02em',
            opacity: ramp(frame, 0, 16, EASE.out),
          }}
        >
          03
        </div>

        {/* wall dressing — it belongs to the wall, so it clears out before the
            turn panel lands over it */}
        <Tape w={250} rot={-8} style={{ left: 640, top: 236, opacity: 0.92 * ramp(frame, 30, 10, EASE.out) * (1 - ramp(frame, 68, 7, EASE.smooth)) }} />
        <Daisy size={64} rot={-12} style={{ left: 44, top: 244, opacity: 0.95 * ramp(frame, 44, 10, EASE.out) * (1 - ramp(frame, 68, 7, EASE.smooth)) }} />
      </div>

      <Grain opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 95% 88% at 50% 45%, transparent 62%, rgba(24,53,43,.22) 100%)` }} />
    </AbsoluteFill>
  );
};
