// Shot 06 — the dashboard, 122f. The same shop, now from the owner's side: one
// window that shows the bookings as they land and the money as it comes in.
// This is the "what you actually get" half of the pitch, so the numbers are
// the site's own language: bookings, revenue, visits, rating.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 122;

// pinned to "and a dashboard, so you see every booking, and every rupee"
export const BEATS = { win: 0, stats: [16, 22, 28, 34], chart: 44, rows: [64, 70, 76], chips: 82, out: 104 };

const WIN = { x: 44, y: 300, w: 992, h: 1290 };

const STATS = [
  { k: 'BOOKINGS', v: '128', d: '+ 12 this week' },
  { k: 'REVENUE', v: '₹48,200', d: '+ ₹6,400' },
  { k: 'VISITS', v: '3,240', d: 'from search' },
  { k: 'RATING', v: '4.9', d: '214 reviews' },
];

const ROWS = [
  { t: '11:30', n: 'Anita R.', w: 'Table for 2', s: 'PAID' },
  { t: '12:00', n: 'Rahul M.', w: 'Birthday cake', s: 'PAID' },
  { t: '12:30', n: 'Meera K.', w: 'Table for 4', s: 'NEW' },
];

const BARS = [42, 58, 47, 72, 66, 88, 61];

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const winT = ramp(frame, BEATS.win, 14, EASE.out);
  const grow = ramp(frame, BEATS.chart, 24, EASE.smooth);
  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const push = 1 + 0.02 * ramp(frame, 0, DURATION, EASE.smooth);
  const paidBell = bell(frame, BEATS.chips, 7);

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(85% 55% at 50% 24%, rgba(244,245,239,.95), transparent 74%)` }} />

      <div style={{ position: 'absolute', left: 56, right: 56, top: 104, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: 'rgba(24,53,43,.6)' }}>06 — YOUR SIDE OF IT</span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, letterSpacing: '0.16em', color: C.forest }}>LIVE · THIS WEEK</span>
      </div>

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-outT * 170}px) scale(${push})`, opacity: 1 - outT }}>
        <div
          style={{
            position: 'absolute', left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h,
            borderRadius: 20, overflow: 'hidden', background: C.off,
            boxShadow: '0 46px 90px rgba(24,53,43,.34)',
            opacity: winT, transform: `translateY(${(1 - winT) * 26}px)`,
          }}
        >
          {/* window chrome */}
          <div style={{ height: 82, background: C.forest, display: 'flex', alignItems: 'center', padding: '0 26px', gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: 7, background: 'rgba(221,227,213,.38)' }} />
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 18, color: 'rgba(221,227,213,.62)', background: 'rgba(244,245,239,.1)', borderRadius: 999, padding: '8px 22px' }}>
              annasbakery.webrivo.site / dashboard
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ width: 30, height: 30, borderRadius: 15, background: C.sage }} />
          </div>

          <div style={{ display: 'flex', height: WIN.h - 82 }}>
            {/* rail */}
            <div style={{ width: 96, background: 'rgba(221,227,213,.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 34, gap: 26 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: i === 1 ? C.forest : 'rgba(24,53,43,.12)',
                }} />
              ))}
            </div>

            {/* body */}
            <div style={{ flex: 1, padding: '34px 36px 0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: FONT.display, fontSize: 52, color: C.forest }}>GOOD MORNING, ANNA</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: '0.16em', color: C.muted }}>NOV 17–23</div>
              </div>

              {/* stats */}
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                {STATS.map((s, i) => {
                  const t = ramp(frame, BEATS.stats[i], 12, EASE.out);
                  return (
                    <div key={s.k} style={{
                      flex: 1, background: i === 1 ? C.forest : 'rgba(244,245,239,.95)',
                      border: i === 1 ? 'none' : '1px solid rgba(24,53,43,.1)',
                      borderRadius: 12, padding: '16px 16px 14px', boxSizing: 'border-box',
                      opacity: t, transform: `translateY(${(1 - t) * 16}px)`,
                    }}>
                      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 14, letterSpacing: '0.16em', color: i === 1 ? 'rgba(221,227,213,.7)' : C.muted }}>{s.k}</div>
                      <div style={{ fontFamily: FONT.display, fontSize: 42, lineHeight: 1.1, color: i === 1 ? C.off : C.forest, marginTop: 4 }}>{s.v}</div>
                      <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 15, color: i === 1 ? C.sage : 'rgba(32,37,34,.5)' }}>{s.d}</div>
                    </div>
                  );
                })}
              </div>

              {/* the week, as bars */}
              <div style={{ marginTop: 28, background: 'rgba(244,245,239,.95)', border: '1px solid rgba(24,53,43,.1)', borderRadius: 12, padding: '20px 22px 16px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 16, letterSpacing: '0.18em', color: C.muted }}>VISITS FROM SEARCH</span>
                  <span style={{ fontFamily: FONT.hand, fontSize: 32, color: C.muted }}>up 24%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 190, marginTop: 16 }}>
                  {BARS.map((h, i) => {
                    const t = ramp(frame, BEATS.chart + i * 3, 16, EASE.out);
                    return (
                      <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <div style={{
                          width: '100%', borderRadius: '6px 6px 2px 2px',
                          height: `${h * t}%`,
                          background: i === 5 ? C.forest : 'rgba(137,153,130,.55)',
                        }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 14, color: C.muted }}>{d}</div>
                  ))}
                </div>
              </div>

              {/* bookings, as they land */}
              <div style={{ marginTop: 24, background: 'rgba(244,245,239,.95)', border: '1px solid rgba(24,53,43,.1)', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid rgba(24,53,43,.1)' }}>
                  <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 16, letterSpacing: '0.18em', color: C.muted }}>TODAY&rsquo;S BOOKINGS</span>
                  <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 15, color: C.muted }}>3 new</span>
                </div>
                {ROWS.map((r, i) => {
                  const t = ramp(frame, BEATS.rows[i], 10, EASE.out);
                  const chip = ramp(frame, BEATS.chips + i * 3, 8, EASE.outBack);
                  return (
                    <div key={r.n} style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: '14px 22px',
                      borderBottom: i < 2 ? '1px solid rgba(24,53,43,.07)' : 'none',
                      opacity: t, transform: `translateX(${(1 - t) * 16}px)`,
                    }}>
                      <span style={{ fontFamily: FONT.display, fontSize: 26, color: C.forest, width: 82 }}>{r.t}</span>
                      <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 21, color: C.forest, flex: 1 }}>{r.n}</span>
                      <span style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 19, color: 'rgba(32,37,34,.6)', flex: 1 }}>{r.w}</span>
                      <span style={{
                        fontFamily: FONT.sans, fontWeight: 800, fontSize: 14, letterSpacing: '0.12em',
                        color: r.s === 'PAID' ? C.off : C.forest,
                        background: r.s === 'PAID' ? C.forest : 'rgba(221,227,213,.9)',
                        borderRadius: 999, padding: '7px 14px',
                        transform: `scale(${0.8 + 0.2 * chip})`, opacity: chip,
                      }}>{r.s}</span>
                    </div>
                  );
                })}
              </div>

              {/* the two things the voice names, underlined in pen */}
              <div style={{ position: 'absolute', right: 64, top: 268, opacity: ramp(frame, 86, 10, EASE.out), transform: 'rotate(-4deg)' }}>
                <span style={{ fontFamily: FONT.hand, fontSize: 38, color: C.forest }}>every rupee</span>
              </div>
              <div style={{ position: 'absolute', right: 60, top: 872, opacity: ramp(frame, 62, 10, EASE.out), transform: 'rotate(-3deg)' }}>
                <span style={{ fontFamily: FONT.hand, fontSize: 38, color: C.forest }}>every booking</span>
              </div>
            </div>
          </div>
        </div>

        {paidBell > 0.02 ? (
          <div style={{
            position: 'absolute', left: WIN.x - 20, top: WIN.y - 20, width: WIN.w + 40, height: WIN.h + 40,
            borderRadius: 26, pointerEvents: 'none', opacity: paidBell,
            boxShadow: `0 0 0 6px rgba(24,53,43,${0.14 * paidBell})`,
          }} />
        ) : null}

        <Tape w={230} rot={-8} style={{ left: 92, top: 262, opacity: 0.88 * winT }} />
        <Daisy size={58} rot={12} style={{ right: 78, top: 318, opacity: 0.9 * winT }} />
      </div>

      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};
