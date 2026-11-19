// Shot 05 — the product tour, 420f. One phone, one shop: the landing page you
// get, then the booking sheet, then the payment sheet, all on the same screen
// so the viewer never loses the thread. A step chip in the corner says which
// part of the product is live, because the whole point of this shot is to
// explain the business: page, bookings, payments.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, EASE, Grain, Tape, Daisy, Fonts, ramp, bell } from '../theme';

export const DURATION = 420;

// pinned to the four lines this shot carries (timeline `vo`, local frames)
export const BEATS = {
  page: 0,
  call: 130,     // "your photos, your services, and one tap to call"
  booking: 182,  // "a booking system, so they pick a time instead of calling"
  day: 206,
  slot: 226,
  confirm: 246,
  booked: 262,
  pay: 296,      // "a payment gateway, so they pay before they arrive"
  press: 330,
  paid: 352,
  out: 400,
};

const PHONE = { x: 178, y: 236, w: 724, h: 1456 };
const SCREEN = { w: PHONE.w - 24, h: PHONE.h - 24 };

// ── small building blocks ───────────────────────────────────────────────────
const Pill: React.FC<{
  label: string; w?: number; h?: number; bg: string; fg: string;
  border?: string; fs?: number; icon?: 'phone' | 'chat' | 'card';
}> = ({ label, w = 300, h = 84, bg, fg, border, fs = 28, icon }) => (
  <div
    style={{
      width: w, height: h, borderRadius: h / 2, background: bg, color: fg,
      border: border ? `2px solid ${border}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      fontFamily: FONT.sans, fontWeight: 800, fontSize: fs, letterSpacing: '0.02em',
      boxSizing: 'border-box',
    }}
  >
    {icon === 'phone' ? (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.6v3A2.5 2.5 0 0 1 17 20.5C10 20.5 3.5 14 3.5 7A2.5 2.5 0 0 1 5 3.5Z" fill={fg} />
      </svg>
    ) : icon === 'chat' ? (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M4 4.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-5 4v-4H4A1.5 1.5 0 0 1 2.5 15V6A1.5 1.5 0 0 1 4 4.5Z" fill={fg} />
      </svg>
    ) : null}
    {label}
  </div>
);

const Tick: React.FC<{ s: number; p: number; color?: string }> = ({ s, p, color = C.forest }) => (
  <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="3" opacity={0.25} />
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="5" fill="none"
      pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, p * 1.15)}
      transform="rotate(-90 50 50)" strokeLinecap="round" />
    <path d="M30 52 L44 66 L72 36" stroke={color} strokeWidth="7" strokeLinecap="round"
      strokeLinejoin="round" pathLength={1} strokeDasharray={1}
      strokeDashoffset={1 - Math.max(0, Math.min(1, p * 1.4 - 0.35))} />
  </svg>
);

// ── the page on the phone ──────────────────────────────────────────────────
const Page: React.FC<{ frame: number }> = ({ frame }) => {
  const scroll = -360 * ramp(frame, 72, 100, EASE.smooth);
  const inT = ramp(frame, 0, 14, EASE.out);
  const callT = ramp(frame, BEATS.call, 10, EASE.out);
  const tap = bell(frame, BEATS.call + 12, 6);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: inT }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${scroll}px)` }}>
        {/* shop header */}
        <div style={{ height: 104, background: C.forest, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', boxSizing: 'border-box' }}>
          <span style={{ fontFamily: FONT.display, fontSize: 34, letterSpacing: '0.05em', color: C.off }}>RIYA&rsquo;S BOUTIQUE</span>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, letterSpacing: '0.2em', color: 'rgba(221,227,213,.72)' }}>MENU</span>
        </div>

        {/* hero */}
        <div style={{ height: 560, background: C.sage, padding: '38px 38px 0', boxSizing: 'border-box', position: 'relative' }}>
          <div style={{ fontFamily: FONT.hand, fontSize: 34, color: C.muted }}>since 1998</div>
          <div style={{ fontFamily: FONT.display, fontSize: 82, lineHeight: 0.92, color: C.forest, marginTop: 6 }}>
            HANDPICKED<br />STYLES FOR YOU.
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 24, color: 'rgba(32,37,34,.72)', marginTop: 14 }}>
            Sarees, kurtas and custom fits.
          </div>
          {/* the photo: the shop, abstracted, bleeding to both edges */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 196, background: `linear-gradient(140deg, ${C.forest}, #2F5A45)`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 60, bottom: 24, width: 150, height: 92, borderRadius: '75px 75px 10px 10px', background: 'rgba(221,227,213,.3)' }} />
            <div style={{ position: 'absolute', left: 236, bottom: 24, width: 96, height: 96, borderRadius: 48, background: 'rgba(221,227,213,.18)' }} />
            <div style={{ position: 'absolute', right: 46, bottom: 30, width: 190, height: 120, borderRadius: 8, background: 'rgba(221,227,213,.12)' }} />
            <div style={{ position: 'absolute', left: 22, top: 16, fontFamily: FONT.sans, fontWeight: 700, fontSize: 14, letterSpacing: '0.18em', color: 'rgba(221,227,213,.6)' }}>THE BOUTIQUE</div>
          </div>
        </div>

        {/* services */}
        <div style={{ background: C.white, padding: '34px 32px 38px', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, letterSpacing: '0.22em', color: C.muted }}>WHAT WE OFFER</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {[
              { t: 'SAREES', s: 'handpicked edits' },
              { t: 'KURTAS', s: 'everyday & festive' },
              { t: 'CUSTOM', s: 'stitched to fit' },
            ].map((x) => (
              <div key={x.t} style={{ flex: 1, background: 'rgba(221,227,213,.55)', borderRadius: 12, padding: '18px 16px', boxSizing: 'border-box' }}>
                <div style={{ fontFamily: FONT.display, fontSize: 30, color: C.forest }}>{x.t}</div>
                <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 17, color: 'rgba(32,37,34,.6)', marginTop: 4 }}>{x.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* hours + map */}
        <div style={{ background: C.off, padding: '30px 32px', boxSizing: 'border-box', display: 'flex', gap: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, letterSpacing: '0.22em', color: C.muted }}>OPEN</div>
            {[['Mon – Fri', '6am – 9pm'], ['Saturday', '6am – 10pm'], ['Sunday', '6am – 2pm']].map(([d, h]) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 600, fontSize: 19, color: C.forest, marginTop: 10 }}>
                <span>{d}</span><span style={{ color: C.muted }}>{h}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 260, height: 178, borderRadius: 12, background: C.sage, position: 'relative', overflow: 'hidden' }}>
            {[42, 86, 130].map((y) => (
              <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 3, background: 'rgba(137,153,130,.5)' }} />
            ))}
            {[70, 150].map((x) => (
              <div key={x} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 3, background: 'rgba(137,153,130,.4)' }} />
            ))}
            <div style={{ position: 'absolute', left: 148, top: 62 }}>
              <svg width={44} height={54} viewBox="0 0 34 42"><path d="M0 15C0 6 7 0 17 0s17 6 17 15c0 10-17 27-17 27S0 25 0 15Z" transform="scale(.8)" fill={C.forest} /><circle cx="13.6" cy="12" r="5" fill={C.sage} /></svg>
            </div>
          </div>
        </div>

        {/* gallery */}
        <div style={{ background: C.white, padding: '26px 32px 32px', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[C.sage, '#CBD5C1', '#E4E8DD', '#D3DCC9'].map((bg, i) => (
              <div key={i} style={{ height: 190, borderRadius: 10, background: bg, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 18, bottom: 16, width: 90, height: 52, borderRadius: '44px 44px 6px 6px', background: 'rgba(24,53,43,.18)' }} />
                <div style={{ position: 'absolute', right: 14, top: 14, width: 10, height: 10, borderRadius: 5, background: 'rgba(24,53,43,.2)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sticky action bar — call / WhatsApp on every scroll position */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: 'rgba(244,245,239,.96)', boxShadow: '0 -14px 30px rgba(24,53,43,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, paddingBottom: 26, boxSizing: 'border-box' }}>
        <Pill label="Call" icon="phone" w={310} h={84} bg={C.forest} fg={C.off} fs={28} />
        <Pill label="WhatsApp" icon="chat" w={310} h={84} bg={C.sage} fg={C.forest} fs={26} />
      </div>

      {/* the pen ring + the tap that lands on "one tap to call" */}
      <div style={{ position: 'absolute', left: 34, bottom: 38, width: 330, height: 106, borderRadius: 56, border: `4px solid ${C.forest}`, opacity: callT * 0.55, transform: `rotate(-2deg) scale(${0.9 + 0.1 * callT})` }} />
      <div style={{ position: 'absolute', right: 22, bottom: 186, opacity: callT, transform: `rotate(-6deg) translateY(${(1 - callT) * 10}px)` }}>
        <span style={{ fontFamily: FONT.hand, fontSize: 44, color: C.forest }}>one tap</span>
      </div>
      {tap > 0.02 ? (
        <div style={{ position: 'absolute', left: 176, bottom: 66, width: 96, height: 96, marginLeft: -48, marginBottom: -48, borderRadius: 48, border: `4px solid ${C.forest}`, opacity: 0.5 * tap, transform: `scale(${0.6 + 0.6 * (1 - tap)})` }} />
      ) : null}
    </div>
  );
};

// ── the booking sheet ──────────────────────────────────────────────────────
const Booking: React.FC<{ frame: number }> = ({ frame }) => {
  const inT = ramp(frame, BEATS.booking, 14, EASE.out);
  const booked = frame >= BEATS.booked;
  const confirmT = ramp(frame, BEATS.booked, 10, EASE.outBack);
  const press = bell(frame, BEATS.confirm + 4, 5);
  const days = ['17', '18', '19', '20', '21', '22', '23'];
  const times = ['10:30', '11:30', '12:00', '1:00'];

  if (inT <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 1010,
        background: C.white, borderRadius: '34px 34px 0 0',
        boxShadow: '0 -20px 60px rgba(24,53,43,.28)',
        transform: `translateY(${(1 - inT) * 260}px)`,
        padding: '40px 38px 34px', boxSizing: 'border-box', overflow: 'hidden',
      }}
    >
      <div style={{ width: 80, height: 8, borderRadius: 4, background: 'rgba(24,53,43,.18)', margin: '0 auto' }} />
      {booked ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, transform: `scale(${0.94 + 0.06 * confirmT})` }}>
          <Tick s={190} p={ramp(frame, BEATS.booked, 14, EASE.out)} />
          <div style={{ fontFamily: FONT.display, fontSize: 72, lineHeight: 1, color: C.forest, marginTop: 26 }}>SAT, 11:30</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: C.forest, marginTop: 10 }}>You&rsquo;re booked.</div>
          <div style={{ fontFamily: FONT.hand, fontSize: 44, color: C.muted, marginTop: 14 }}>no phone call, no waiting</div>
          <div style={{ marginTop: 34, width: '100%', background: 'rgba(221,227,213,.5)', borderRadius: 14, padding: '22px 24px', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 21, color: 'rgba(32,37,34,.7)' }}>A confirmation goes to the customer, and the booking lands on your dashboard.</div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 34 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 62, color: C.forest }}>BOOK A FITTING</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke={C.muted} strokeWidth="2.6" strokeLinecap="round" /></svg>
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 24, color: C.muted, marginTop: 6 }}>November 2026</div>

          <div style={{ display: 'flex', gap: 8, marginTop: 26 }}>
            {days.map((d, i) => {
              const on = i === 5 && frame >= BEATS.day;
              return (
                <div key={d} style={{
                  flex: 1, height: 108, borderRadius: 12, textAlign: 'center', paddingTop: 16, boxSizing: 'border-box',
                  background: on ? C.forest : 'rgba(221,227,213,.45)',
                  color: on ? C.off : C.forest,
                  transform: `translateY(${on ? -4 : 0}px)`,
                }}>
                  <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: '0.1em', opacity: 0.75 }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 34, marginTop: 2 }}>{d}</div>
                </div>
              );
            })}
          </div>

          <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, letterSpacing: '0.2em', color: C.muted, marginTop: 34 }}>PICK A TIME</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            {times.map((t, i) => {
              const on = i === 1 && frame >= BEATS.slot;
              return (
                <div key={t} style={{
                  height: 82, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT.sans, fontWeight: 700, fontSize: 28,
                  background: on ? C.forest : 'rgba(244,245,239,1)',
                  border: on ? 'none' : '1px solid rgba(24,53,43,.16)',
                  color: on ? C.off : C.forest,
                }}>{t}</div>
              );
            })}
          </div>

          <div style={{
            marginTop: 30, height: 96, borderRadius: 48, background: C.forest, color: C.off,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, letterSpacing: '0.04em',
            transform: `scale(${1 - 0.04 * press})`,
            opacity: frame >= BEATS.slot ? 1 : 0.45,
          }}>Confirm booking</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 19, color: 'rgba(32,37,34,.5)', textAlign: 'center', marginTop: 14 }}>
            A confirmation goes out on WhatsApp.
          </div>
        </>
      )}
    </div>
  );
};

// ── the payment sheet ──────────────────────────────────────────────────────
const Payment: React.FC<{ frame: number }> = ({ frame }) => {
  const inT = ramp(frame, BEATS.pay, 14, EASE.out);
  const paid = frame >= BEATS.paid;
  const paidT = ramp(frame, BEATS.paid, 12, EASE.outBack);
  const press = bell(frame, BEATS.press + 4, 5);
  const dots = Math.floor((frame - BEATS.press - 6) / 4) % 3;

  if (inT <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 1010,
        background: C.forest, borderRadius: '34px 34px 0 0',
        boxShadow: '0 -22px 60px rgba(0,0,0,.35)',
        transform: `translateY(${(1 - inT) * 260}px)`,
        padding: '40px 38px 34px', boxSizing: 'border-box', overflow: 'hidden',
      }}
    >
      <div style={{ width: 80, height: 8, borderRadius: 4, background: 'rgba(221,227,213,.3)', margin: '0 auto' }} />
      {paid ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 66, transform: `scale(${0.94 + 0.06 * paidT})` }}>
          <div style={{ width: 190, height: 190 }}>
            <Tick s={190} p={ramp(frame, BEATS.paid, 14, EASE.out)} color={C.sage} />
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 78, lineHeight: 1, color: C.off, marginTop: 24 }}>PAID ₹640</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.sage, marginTop: 12 }}>Order confirmed &middot; pick up 11:30</div>
          <div style={{ fontFamily: FONT.hand, fontSize: 44, color: 'rgba(221,227,213,.75)', marginTop: 16 }}>paid before they arrive</div>
        </div>
      ) : (
        <>
          <div style={{ fontFamily: FONT.display, fontSize: 62, color: C.off, marginTop: 34 }}>YOUR ORDER</div>
          <div style={{ marginTop: 30 }}>
            {[['Cotton kurta set × 1', '₹240'], ['Silk dupatta × 1', '₹400']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(221,227,213,.16)' }}>
                <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 27, color: 'rgba(244,245,239,.86)' }}>{l}</span>
                <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 27, color: C.off }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 22 }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, letterSpacing: '0.18em', color: 'rgba(221,227,213,.6)' }}>TOTAL</span>
              <span style={{ fontFamily: FONT.display, fontSize: 52, color: C.off, lineHeight: 1 }}>₹640</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            {['UPI', 'CARD', 'NETBANKING'].map((m) => (
              <div key={m} style={{ flex: 1, height: 66, borderRadius: 10, border: '1px solid rgba(221,227,213,.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: '0.12em', color: 'rgba(221,227,213,.72)' }}>{m}</div>
            ))}
          </div>

          <div style={{
            marginTop: 30, height: 96, borderRadius: 48, background: C.sage, color: C.forest,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, letterSpacing: '0.04em',
            transform: `scale(${1 - 0.04 * press})`,
          }}>
            {frame >= BEATS.press + 6 ? `Paying${'.'.repeat(dots + 1)}` : 'Pay ₹640'}
          </div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 500, fontSize: 19, color: 'rgba(221,227,213,.55)', textAlign: 'center', marginTop: 14 }}>
            Secure checkout &middot; money reaches you, not a middleman
          </div>
        </>
      )}
    </div>
  );
};

export const SiteTour: React.FC = () => {
  const frame = useCurrentFrame();
  const outT = ramp(frame, BEATS.out, 14, EASE.power4In);
  const push = 1 + 0.02 * ramp(frame, 0, DURATION, EASE.smooth);
  const step = frame < BEATS.booking ? 0 : frame < BEATS.pay ? 1 : 2;
  const stepT = ramp(frame, step === 0 ? 0 : step === 1 ? BEATS.booking : BEATS.pay, 10, EASE.out);
  const stepLabel = ['01 · THE PAGE', '02 · BOOKING', '03 · PAYMENT'][step];

  return (
    <AbsoluteFill style={{ backgroundColor: C.sage, overflow: 'hidden' }}>
      <Fonts />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(80% 55% at 50% 26%, rgba(244,245,239,.95), transparent 72%)` }} />

      {/* scene label + where we are in the tour */}
      <div style={{ position: 'absolute', left: 56, right: 56, top: 104, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, letterSpacing: '0.24em', color: 'rgba(24,53,43,.6)' }}>05 — WHAT YOU GET</span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 21, letterSpacing: '0.16em', color: C.forest, background: 'rgba(244,245,239,.95)', borderRadius: 999, padding: '10px 20px', transform: `translateY(${(1 - stepT) * 6}px)` }}>
          {stepLabel}
        </span>
      </div>

      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-outT * 180}px) scale(${push})`, opacity: 1 - outT }}>
        {/* the phone */}
        <div
          style={{
            position: 'absolute', left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h,
            borderRadius: 58, background: C.forest, padding: 12, boxSizing: 'border-box',
            boxShadow: '0 46px 90px rgba(24,53,43,.4), inset 0 0 0 2px rgba(244,245,239,.12)',
          }}
        >
          <div style={{ position: 'absolute', left: '50%', top: 26, width: 128, height: 26, marginLeft: -64, borderRadius: 13, background: C.forest, zIndex: 5 }} />
          <div style={{ position: 'relative', width: SCREEN.w, height: SCREEN.h, borderRadius: 46, overflow: 'hidden', background: C.off }}>
            <Page frame={frame} />
            <Booking frame={frame} />
            <Payment frame={frame} />
            {/* home indicator */}
            <div style={{ position: 'absolute', left: '50%', bottom: 14, width: 240, height: 8, marginLeft: -120, borderRadius: 4, background: 'rgba(24,53,43,.25)' }} />
          </div>
        </div>

        <Tape w={240} rot={-7} style={{ left: 84, top: 196, opacity: 0.9 * ramp(frame, 0, 12, EASE.out) }} />
        <Daisy size={62} rot={-10} style={{ right: 66, top: 250, opacity: 0.95 * ramp(frame, 8, 12, EASE.out) }} />
      </div>

      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};
