// Webrivo design tokens — grown from components/TapeLanding.jsx (no invented colours/type)
import React from 'react';
import { continueRender, delayRender, Easing, interpolate, staticFile } from 'remotion';

export const C = {
  off: '#F4F5EF',
  sage: '#DDE3D5',
  muted: '#899982',
  forest: '#18352B',
  white: '#FFFFFF',
  ink: '#202522',
};

export const FONT = {
  display: "'Anton', 'Arial Narrow', sans-serif",
  sans: "'Bricolage Grotesque', system-ui, sans-serif",
  hand: "'Caveat', 'Segoe Print', cursive",
};

// Same fractal-noise grain the site uses (feTurbulence, deterministic)
export const NOISE = (() => {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>` +
    `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/>` +
    `<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter>` +
    `<rect width='180' height='180' filter='url(%23n)'/></svg>`;
  return `url("data:image/svg+xml;utf8,${svg}")`;
})();

// Motion personality: medium-high energy / playful print
export const EASE = {
  out: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  outBack: Easing.bezier(0.34, 1.3, 0.64, 1), // overshoot ~1.04
  in: Easing.bezier(0.7, 0, 0.84, 0),
  power4In: Easing.bezier(0.32, 0, 0.67, 0),
  smooth: Easing.bezier(0.4, 0, 0.2, 1),
  press: Easing.bezier(0.2, 0.7, 0.25, 1),
};

export const ramp = (
  frame: number,
  start: number,
  dur: number,
  easing: (n: number) => number = EASE.out
) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** 0→1→0 bell around a centre frame (for impacts / stamps) */
export const bell = (frame: number, center: number, half: number) =>
  interpolate(frame, [center - half, center, center + half], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Load webfonts at module scope (works in stills & renders, deterministic)
const FONT_URLS: { family: string; url: string; weight: string }[] = [
  { family: 'Anton', url: 'fonts/Anton-latin.woff2', weight: '400' },
  { family: 'Bricolage Grotesque', url: 'fonts/BricolageGrotesque-latin.woff2', weight: '400' },
  { family: 'Bricolage Grotesque', url: 'fonts/BricolageGrotesque-latin-ext.woff2', weight: '400' },
  { family: 'Caveat', url: 'fonts/Caveat-600-latin.woff2', weight: '600' },
];

if (typeof document !== 'undefined') {
  // Local woff2 files: load best-effort but never stall a render.
  const handle = delayRender('webfonts', { timeoutInMilliseconds: 120000 });
  let cleared = false;
  const clear = () => {
    if (!cleared) {
      cleared = true;
      continueRender(handle);
    }
  };
  Promise.all(
    FONT_URLS.map(async (f) => {
      const ff = new FontFace(f.family, `url(${staticFile(f.url)})`, { weight: f.weight });
      const loaded = await ff.load();
      document.fonts.add(loaded);
    })
  ).then(clear, clear);
  // fonts are local — clear quickly so renders never hang; fallbacks apply if late
  setTimeout(clear, 1500);
}

export const Fonts: React.FC = () => null;

/** Film grain overlay — multiply, like the site's ::before layers */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: NOISE,
      backgroundSize: '180px 180px',
      opacity,
      mixBlendMode: 'multiply',
    }}
  />
);

// ── Brand badge (verbatim geometry from TapeLanding.jsx) ────────────────
function scallop(r: number, bump: number, n: number) {
  const f = (a: number, rr: number) =>
    (60 + rr * Math.cos(a)).toFixed(2) + ' ' + (60 + rr * Math.sin(a)).toFixed(2);
  let d = 'M' + f(0, r);
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    d += ' Q' + f((a0 + a1) / 2, r + bump * 2) + ' ' + f(a1, r);
  }
  return d + 'Z';
}
const BADGE_OUT = scallop(51, 4.2, 14);
const BADGE_IN = scallop(46, 3.6, 14);

export const Badge: React.FC<{ size: number; tone?: 'light' | 'dark' }> = ({
  size,
  tone = 'light',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    style={{
      display: 'block',
      overflow: 'visible',
      filter: 'drop-shadow(0 5px 7px rgba(24,53,43,.18))',
    }}
  >
    <path d={BADGE_OUT} fill={C.off} stroke={C.sage} strokeWidth={2.5} />
    <path d={BADGE_IN} fill={tone === 'light' ? C.forest : C.white} />
    <circle cx="60" cy="60" r="38" fill="none" stroke={C.sage} strokeWidth={1.6} strokeDasharray="2.5 4" />
    <path d="M29 47 42.5 81 60 48 77.5 81 91 47 80.5 41 72.5 61 60 36 47.5 61 39.5 41Z" fill={tone === 'light' ? C.off : C.forest} />
    <path d="M47 39 60 26l13 13" fill="none" stroke={C.sage} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Masking-tape strip — matte sage with dotted print, like the plan cards' tape */
export const Tape: React.FC<{
  w: number;
  h?: number;
  rot?: number;
  tone?: 'sage' | 'clear';
  style?: React.CSSProperties;
}> = ({ w, h = 44, rot = -4, tone = 'sage', style }) => (
  <div
    style={{
      position: 'absolute',
      width: w,
      height: h,
      borderRadius: 3,
      opacity: tone === 'sage' ? 0.92 : 0.65,
      backgroundImage:
        tone === 'sage'
          ? `radial-gradient(${C.white} 12%, transparent 13%), radial-gradient(${C.white} 12%, transparent 13%), linear-gradient(180deg, ${C.sage}, ${C.sage})`
          : `linear-gradient(180deg, rgba(255,255,255,.85), rgba(221,227,213,.75))`,
      backgroundSize: '26px 26px, 26px 26px, 100% 100%',
      backgroundPosition: '0 0, 13px 13px, 0 0',
      boxShadow: '0 2px 6px rgba(24,53,43,.18)',
      transform: `rotate(${rot}deg)`,
      clipPath:
        'polygon(0.8% 6%, 4% 0%, 96% 3%, 99.4% 10%, 98.6% 50%, 100% 92%, 95% 100%, 3% 97%, 0.4% 90%, 1.2% 48%)',
      ...style,
    }}
  />
);

/** Daisy sticker (site's confetti daisies) */
export const Daisy: React.FC<{ size: number; rot?: number; style?: React.CSSProperties }> = ({
  size,
  rot = 0,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ position: 'absolute', transform: `rotate(${rot}deg)`, ...style }}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse
        key={i}
        cx="20"
        cy="9"
        rx="4.6"
        ry="8.4"
        fill={C.off}
        transform={`rotate(${i * 45} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="6" fill={C.forest} />
  </svg>
);
