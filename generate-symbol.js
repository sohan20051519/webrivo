const fs = require('fs');
const path = require('path');

function scallop(r, bump, n) {
  const f = (a, rr) => (60 + rr * Math.cos(a)).toFixed(2) + ' ' + (60 + rr * Math.sin(a)).toFixed(2);
  let d = 'M' + f(0, r);
  for (let i = 0; i < n; i++) {
    const a0 = i / n * Math.PI * 2;
    const a1 = (i + 1) / n * Math.PI * 2;
    d += ' Q' + f((a0 + a1) / 2, r + bump * 2) + ' ' + f(a1, r);
  }
  return d + 'Z';
}

const BADGE_OUT = scallop(51, 4.2, 14);
const BADGE_IN = scallop(46, 3.6, 14);

const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-labelledby="title">
  <title id="title">WebRivo symbol</title>
  <defs>
    <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#18352B" flood-opacity=".18"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <path fill="#F4F5EF" stroke="#DDE3D5" stroke-width="2.5" stroke-linejoin="round" d="${BADGE_OUT}"/>
    <path fill="#18352B" d="${BADGE_IN}"/>
    <circle cx="60" cy="60" r="37" fill="none" stroke="#DDE3D5" stroke-width="1.7" stroke-dasharray="2.5 4"/>
    <path fill="#F4F5EF" d="M28 46 42.5 81 60 48 77.5 81 92 46 80.5 40 72.5 61 60 36 47.5 61 39.5 40Z"/>
    <path d="M48 39 60 27 72 39" fill="none" stroke="#DDE3D5" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
`;

const outPath = path.resolve(__dirname, 'public', 'webrivo-symbol.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log('Wrote:', outPath);
console.log('OUT path:', BADGE_OUT.slice(0, 80) + '…');
