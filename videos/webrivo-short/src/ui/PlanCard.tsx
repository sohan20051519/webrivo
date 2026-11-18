// The pricing card, ported 1:1 from the site (components/TapeLanding.jsx .ht-prod):
// washi tape at the top corners, tape-roll face, narrow uppercase name,
// description, price and the two actions. Business carries the "Best value"
// pill, Premium is the forest "Signature plan" card. Drawn at 700×880 so the
// film can scale it without changing any proportion.
import React from 'react';
import { C, FONT, Tape } from '../theme';

export type PlanKind = 'clear' | 'print' | 'masking';

export type Plan = {
  name: string;
  line: string;
  amount: string;
  freq: string;
  kind: PlanKind;
  tier?: 'business' | 'premium';
  badge?: string;
};

// verbatim from DEFAULT_PRODUCTS + TierBadge
export const PLANS: Plan[] = [
  { name: 'Basic', line: 'Starter site, hosting and domain included.', amount: '₹599', freq: '/mo', kind: 'clear' },
  {
    name: 'Business', line: '5-page site, SEO and domain included.', amount: '₹1,199', freq: '/mo',
    kind: 'print', tier: 'business', badge: 'Best value',
  },
  {
    name: 'Premium', line: 'Full suite with booking, admin and maps.', amount: '₹2,199', freq: '/mo',
    kind: 'masking', tier: 'premium', badge: 'Signature plan',
  },
];

const KIND_LABEL: Record<PlanKind, string> = { clear: 'SITE', print: 'SEO', masking: 'BRAND' };

// .ht-face palette per roll kind
const FACE: Record<PlanKind, { ring1: string; ring2: string; rim: string; lab: string; labink: string }> = {
  clear: { ring1: C.white, ring2: C.off, rim: C.sage, lab: C.forest, labink: C.off },
  print: { ring1: C.sage, ring2: 'rgba(244,245,239,.75)', rim: C.muted, lab: C.sage, labink: C.forest },
  masking: { ring1: C.white, ring2: C.sage, rim: C.muted, lab: C.forest, labink: C.off },
};

export const W = 700;
export const H = 880;

/** The roll of tape that sits above every plan name (site's Roll3D cap, straight on). */
const RollFace: React.FC<{ kind: PlanKind; size: number }> = ({ kind, size }) => {
  const p = FACE[kind];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%', position: 'relative',
        background:
          `radial-gradient(circle, transparent 0 30%, ${p.ring2} 30.5%, ${p.ring1} 34%, ${p.ring2} 62%, ${p.ring1} 97%, ${p.rim} 99%),` +
          `repeating-radial-gradient(circle, ${p.ring1} 0 1.2%, ${p.ring2} 1.4% 2.6%)`,
        boxShadow: '0 22px 44px rgba(24,53,43,.16), 0 3px 8px rgba(24,53,43,.1)',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: '27%', borderRadius: '50%',
          background: `radial-gradient(circle, ${C.white} 0 70%, ${C.off} 75%, ${C.sage} 88%, ${C.muted} 100%)`,
          boxShadow: 'inset 0 0 0 1px rgba(24,53,43,.16)',
        }}
      />
      <div
        style={{
          position: 'absolute', inset: '31%', borderRadius: '50%', background: p.lab, color: p.labink,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          lineHeight: 0.9, textAlign: 'center',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.5), inset 0 -3px 6px rgba(24,53,43,.16)',
        }}
      >
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: size * 0.1, letterSpacing: '0.02em' }}>WEBRIVO</span>
        <span
          style={{
            fontFamily: FONT.sans, fontWeight: 700, fontSize: size * 0.048, letterSpacing: '0.12em',
            textTransform: 'uppercase', marginTop: 3, opacity: 0.85,
          }}
        >
          {KIND_LABEL[kind]}
        </span>
      </div>
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background:
            'radial-gradient(60% 34% at 32% 18%, rgba(255,255,255,.45), transparent 70%),' +
            'radial-gradient(40% 20% at 70% 86%, rgba(255,255,255,.14), transparent)',
        }}
      />
    </div>
  );
};

const Btn: React.FC<{ children: React.ReactNode; ghost?: boolean; style?: React.CSSProperties }> = ({
  children, ghost, style,
}) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 999, padding: '15px 24px', fontFamily: FONT.sans, fontWeight: 700,
      fontSize: 22, letterSpacing: '0.01em', whiteSpace: 'nowrap',
      border: '2px solid transparent', ...style,
    }}
  >
    {children}
  </div>
);

export const PlanCard: React.FC<{ plan: Plan; tapes?: boolean }> = ({ plan, tapes = true }) => {
  const business = plan.tier === 'business';
  const premium = plan.tier === 'premium';

  const surface: React.CSSProperties = premium
    ? {
        background: `radial-gradient(ellipse at 50% 0%, rgba(221,227,213,.3) 0%, transparent 65%), ${C.forest}`,
        color: C.off, border: 'none',
        boxShadow: '0 34px 80px -30px rgba(9,20,16,.55), 0 0 0 2px rgba(221,227,213,.15)',
      }
    : business
      ? {
          background: `linear-gradient(172deg, ${C.white} 0%, #F8F9F5 60%, ${C.sage} 100%)`,
          color: C.forest, border: '2px solid rgba(137,153,130,.55)',
          boxShadow: '0 22px 54px -22px rgba(24,53,43,.3), inset 0 2px 0 rgba(255,255,255,.9)',
        }
      : {
          background: C.white, color: C.forest, border: '2px solid rgba(137,153,130,.55)',
          boxShadow: '0 22px 54px -22px rgba(24,53,43,.28)',
        };

  return (
    <div
      style={{
        width: W, height: H, boxSizing: 'border-box', position: 'relative',
        display: 'flex', flexDirection: 'column',
        padding: '55px 48px 40px', borderRadius: 8, ...surface,
      }}
    >
      {plan.badge ? (
        <div
          style={{
            position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
            background: premium ? C.off : C.muted, color: premium ? C.forest : C.white,
            fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '7px 26px', borderRadius: 999, whiteSpace: 'nowrap',
            boxShadow: '0 6px 18px rgba(24,53,43,.22)',
          }}
        >
          {plan.badge}
        </div>
      ) : null}

      {tapes ? (
        <>
          <Tape
            w={W * 0.36} h={40} rot={-28} tone="sage"
            style={{ left: '18%', top: '7%', transform: 'translate(-50%,-50%) rotate(-28deg)' }}
          />
          <Tape
            w={W * 0.3} h={40} rot={22} tone="sage"
            style={{ left: '84%', top: '7%', transform: 'translate(-50%,-50%) rotate(22deg)' }}
          />
        </>
      ) : null}

      <div style={{ height: 332, margin: '11px 0 26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RollFace kind={plan.kind} size={316} />
      </div>

      <div
        style={{
          fontFamily: FONT.sans, fontWeight: 800, fontSize: 77, lineHeight: 0.9,
          textTransform: 'uppercase', letterSpacing: '-0.01em',
          ...(business
            ? {
                background: `linear-gradient(135deg, ${C.forest} 0%, ${C.muted} 100%)`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }
            : premium
              ? {
                  background: `linear-gradient(135deg, ${C.off} 0%, ${C.sage} 100%)`,
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                }
              : {}),
        }}
      >
        {plan.name}
      </div>

      <div
        style={{
          fontFamily: FONT.sans, fontSize: 26, lineHeight: 1.5, fontWeight: 400,
          margin: '16px 0 30px', flex: 1,
          color: premium ? 'rgba(221,227,213,.72)' : 'rgba(24,53,43,.7)',
        }}
      >
        {plan.line}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 30 }}>
        <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1, color: premium ? C.sage : C.forest }}>
          {plan.amount}
        </span>
        <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, marginLeft: 4, color: premium ? 'rgba(221,227,213,.72)' : C.muted }}>
          {plan.freq}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Btn
          style={{
            background: premium ? C.off : business ? C.muted : C.forest,
            color: premium ? C.forest : C.off,
            borderColor: premium ? C.off : business ? C.muted : C.forest,
          }}
        >
          Send request
        </Btn>
        <div />
        <Btn
          ghost
          style={{
            gridColumn: '1 / -1',
            background: 'transparent',
            color: premium ? C.off : C.forest,
            borderColor: premium ? 'rgba(221,227,213,.36)' : 'rgba(137,153,130,.55)',
          }}
        >
          Customize
        </Btn>
      </div>
    </div>
  );
};
