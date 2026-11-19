// Central SFX pin table + BGM — scene components embed no audio.
// Every cue is written in shot-local frames and resolved through SHOTS, and the
// beat numbers come from the shot files themselves, so re-timing a picture
// moves its sound with it.
// `from` offsets compensate each file's measured 10ms-energy peak so the
// peak lands on the pinned action frame (sound-design §4.6).
// SFX: Freesound CC0 (public/audio/sfx/audio-manifest.json).
// BGM: Mixkit Stock Music Free License (public/audio/ATTRIBUTION.md).
import React from 'react';
import { Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SHOTS, TOTAL_FRAMES } from './timeline';
import { BEATS as B1 } from './shots/BrandOpen';
import { BEATS as B2 } from './shots/SearchShot';
import { BEATS as B3 } from './shots/CollageDeal';
import { BEATS as B4 } from './shots/BriefBuildShip';
import { BEATS as B5 } from './shots/SiteTour';
import { BEATS as B6 } from './shots/Dashboard';
import { BEATS as B7 } from './shots/PlanCards';
import { BEATS as B8 } from './shots/Inclusions';
import { BEATS as B9 } from './shots/Estimator';
import { BEATS as B10 } from './shots/Outro';

const S = (f: string) => staticFile(`audio/sfx/${f}`);
const BG = staticFile('audio/bgm/house-vibez.mp3');

// shot-local action frame -> absolute frame
const abs = (shotId: string, local: number) => {
  const s = SHOTS.find((x) => x.id === shotId);
  if (!s) throw new Error(`unknown shot ${shotId}`);
  return s.from + local;
};

type Cue = { shot: string; at: number; file: string; vol: number };

// peak time (s) per source, from audio-manifest.json analysis
const PEAK: Record<string, number> = {
  'fs-879272.mp3': 0.01, // low thud
  'fs-131359.mp3': 0.0,  // rolled paper slap
  'fs-278205.mp3': 0.03, // switch flip
  'fs-872341.mp3': 0.0,  // digital click
  'fs-878247.mp3': 0.0,  // glass ping
  'fs-630019.mp3': 0.33, // page turn
  'fs-859482.mp3': 2.28, // cinematic riser (peak far in — treat as land-at)
};

// exported so scripts can regenerate the AUDIO-TIMELINE.md cue table
export const CUES: Cue[] = [
  // S1 map — film open, streets draw, shop tags surface, the hook lands, then
  // the camera actually visits the boutique and the tailor
  { shot: 'Shot01BrandOpen', at: 0, file: 'fs-879272.mp3', vol: 0.3 },
  ...[8, 11, 14, 17, 20].map((at) => ({ shot: 'Shot01BrandOpen', at, file: 'fs-872341.mp3', vol: 0.13 })),
  { shot: 'Shot01BrandOpen', at: B1.hook, file: 'fs-879272.mp3', vol: 0.45 },
  { shot: 'Shot01BrandOpen', at: 98, file: 'fs-630019.mp3', vol: 0.34 },
  { shot: 'Shot01BrandOpen', at: B1.hotA, file: 'fs-879272.mp3', vol: 0.3 },
  { shot: 'Shot01BrandOpen', at: B1.hotB - 6, file: 'fs-630019.mp3', vol: 0.3 },
  { shot: 'Shot01BrandOpen', at: B1.hotB + 6, file: 'fs-879272.mp3', vol: 0.3 },

  // S2 the search — chrome in, the field types, submit, the map and rows land,
  // then the empty slot and the pen circle it
  { shot: 'Shot02Search', at: B2.chrome, file: 'fs-872341.mp3', vol: 0.14 },
  ...[18, 22, 26, 30, 34, 38, 42, 46].map((at) => ({ shot: 'Shot02Search', at, file: 'fs-872341.mp3', vol: 0.1 })),
  { shot: 'Shot02Search', at: B2.submit, file: 'fs-278205.mp3', vol: 0.24 },
  { shot: 'Shot02Search', at: B2.map, file: 'fs-879272.mp3', vol: 0.24 },
  ...B2.rows.map((at, k) => ({ shot: 'Shot02Search', at, file: 'fs-879272.mp3', vol: 0.18 + 0.05 * k })),
  { shot: 'Shot02Search', at: B2.slot, file: 'fs-131359.mp3', vol: 0.44 },
  { shot: 'Shot02Search', at: B2.trace, file: 'fs-630019.mp3', vol: 0.34 },
  { shot: 'Shot02Search', at: B2.close, file: 'fs-878247.mp3', vol: 0.34 },
  { shot: 'Shot02Search', at: B2.note, file: 'fs-872341.mp3', vol: 0.26 },

  // S3 the turn — three cards dealt, a riser under them, the panel slams
  { shot: 'Shot03Turn', at: 0, file: 'fs-879272.mp3', vol: 0.34 },
  { shot: 'Shot03Turn', at: 6, file: 'fs-872341.mp3', vol: 0.18 },
  ...B3.land.slice(0, 3).map((at) => ({ shot: 'Shot03Turn', at, file: 'fs-131359.mp3', vol: 0.72 })),
  // peaks 2.28s in — right on the panel
  { shot: 'Shot03Turn', at: B3.land[3] - 68, file: 'fs-859482.mp3', vol: 0.3 },
  { shot: 'Shot03Turn', at: B3.land[3], file: 'fs-131359.mp3', vol: 0.85 },
  { shot: 'Shot03Turn', at: B3.land[3] + 6, file: 'fs-878247.mp3', vol: 0.34 },
  { shot: 'Shot03Turn', at: B3.scroll, file: 'fs-630019.mp3', vol: 0.4 },

  // S4 process — the docket prints, each row lights on brief / build / ship
  { shot: 'Shot04Process', at: 2, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot04Process', at: 9, file: 'fs-879272.mp3', vol: 0.34 },
  ...B4.roll.map((at) => ({ shot: 'Shot04Process', at, file: 'fs-278205.mp3', vol: 0.45 })),
  { shot: 'Shot04Process', at: B4.roll[2] + 6, file: 'fs-879272.mp3', vol: 0.3 },

  // S5 product — one phone: the page loads, Call taps, booking confirms,
  // payment clears
  { shot: 'Shot05Product', at: 0, file: 'fs-879272.mp3', vol: 0.35 },
  { shot: 'Shot05Product', at: 8, file: 'fs-872341.mp3', vol: 0.16 },
  { shot: 'Shot05Product', at: B5.call + 12, file: 'fs-872341.mp3', vol: 0.22 },
  { shot: 'Shot05Product', at: B5.booking, file: 'fs-630019.mp3', vol: 0.45 },
  { shot: 'Shot05Product', at: B5.day, file: 'fs-872341.mp3', vol: 0.18 },
  { shot: 'Shot05Product', at: B5.slot, file: 'fs-872341.mp3', vol: 0.22 },
  { shot: 'Shot05Product', at: B5.confirm, file: 'fs-879272.mp3', vol: 0.34 },
  { shot: 'Shot05Product', at: B5.booked, file: 'fs-878247.mp3', vol: 0.34 },
  { shot: 'Shot05Product', at: B5.pay, file: 'fs-630019.mp3', vol: 0.45 },
  { shot: 'Shot05Product', at: B5.press, file: 'fs-872341.mp3', vol: 0.24 },
  { shot: 'Shot05Product', at: B5.paid, file: 'fs-878247.mp3', vol: 0.4 },

  // S6 dashboard — the window, the four stats, the week, the bookings
  { shot: 'Shot06Dashboard', at: B6.win, file: 'fs-879272.mp3', vol: 0.34 },
  ...B6.stats.map((at) => ({ shot: 'Shot06Dashboard', at, file: 'fs-872341.mp3', vol: 0.14 })),
  { shot: 'Shot06Dashboard', at: B6.chart, file: 'fs-872341.mp3', vol: 0.16 },
  ...B6.rows.map((at) => ({ shot: 'Shot06Dashboard', at, file: 'fs-872341.mp3', vol: 0.14 })),
  { shot: 'Shot06Dashboard', at: B6.chips + 2, file: 'fs-878247.mp3', vol: 0.2 },

  // S7 plans — cards pop in, the row whips on each spoken price, Premium note
  ...B7.pop.map((at) => ({ shot: 'Shot07Plans', at, file: 'fs-131359.mp3', vol: 0.7 })),
  ...B7.move.map((at) => ({ shot: 'Shot07Plans', at, file: 'fs-278205.mp3', vol: 0.34 })),
  ...B7.move.map((at) => ({ shot: 'Shot07Plans', at: at + 2, file: 'fs-878247.mp3', vol: 0.4 })),
  { shot: 'Shot07Plans', at: B7.note, file: 'fs-278205.mp3', vol: 0.3 },

  // S8 inclusions — each card lifts off the desk, the previous one drops back
  ...B8.lifts.map((at) => ({ shot: 'Shot08Inclusions', at, file: 'fs-872341.mp3', vol: 0.22 })),
  ...[38, 62].map((at) => ({ shot: 'Shot08Inclusions', at, file: 'fs-131359.mp3', vol: 0.28 })),
  { shot: 'Shot08Inclusions', at: B8.note, file: 'fs-878247.mp3', vol: 0.25 },

  // S9 estimator — the bill, the toggle, SAVE 10%, the yearly receipt
  { shot: 'Shot09Estimator', at: 0, file: 'fs-879272.mp3', vol: 0.32 },
  { shot: 'Shot09Estimator', at: B9.price + 4, file: 'fs-872341.mp3', vol: 0.2 },
  { shot: 'Shot09Estimator', at: B9.flip, file: 'fs-278205.mp3', vol: 0.6 },
  { shot: 'Shot09Estimator', at: B9.flip + 4, file: 'fs-872341.mp3', vol: 0.2 },
  { shot: 'Shot09Estimator', at: B9.receipt, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot09Estimator', at: B9.save, file: 'fs-131359.mp3', vol: 0.55 },
  { shot: 'Shot09Estimator', at: B9.save + 4, file: 'fs-878247.mp3', vol: 0.22 },

  // S10 outro — three plan prints, the badge, the wordmark, contact, hold
  { shot: 'Shot10Outro', at: B10.badge, file: 'fs-879272.mp3', vol: 0.4 },
  ...[10, 15, 20].map((at) => ({ shot: 'Shot10Outro', at, file: 'fs-131359.mp3', vol: 0.6 })),
  { shot: 'Shot10Outro', at: B10.word + 20, file: 'fs-878247.mp3', vol: 0.35 },
  { shot: 'Shot10Outro', at: B10.sign, file: 'fs-630019.mp3', vol: 0.9 },
  { shot: 'Shot10Outro', at: B10.contact, file: 'fs-872341.mp3', vol: 0.4 },
];

// one entry per spoken wav, placed by the same `vo` table the picture uses
const VO = SHOTS.flatMap((s) =>
  s.vo.map((v) => ({
    id: v.id,
    start: s.from + v.at,
    vol: 0.95,
    dur: Math.ceil((s.dur - v.at) * 1.2),
  }))
);

// BGM base gain, ducked under each VO line (0.14) with 8f ramps
const bgmGain = (f: number) => {
  const speaking = SHOTS.some((s) =>
    s.vo.some((v) => f >= s.from + v.at - 8 && f <= s.from + v.at + s.dur + 8)
  );
  return speaking ? 0.14 : 0.32;
};

export const AudioTrack: React.FC<{ bgm?: boolean; voDir?: string }> = ({ bgm = true, voDir = 'audio/vo' }) => (
  <>
    {CUES.map((c, i) => {
      const action = abs(c.shot, c.at);
      const from = Math.max(0, Math.round(action - (PEAK[c.file] ?? 0) * 30));
      return (
        <Sequence key={i} from={from} name={`sfx:${c.file}`}>
          <Audio src={S(c.file)} volume={c.vol} />
        </Sequence>
      );
    })}
    {VO.map((v) => (
      <Sequence key={`vo-${v.id}`} from={v.start} name={`vo:${v.id}`}>
        <Audio src={staticFile(`${voDir}/${v.id}.wav`)} volume={v.vol} />
      </Sequence>
    ))}
    {bgm && (
      <Sequence from={9} name="bgm">
        <Audio
          src={BG}
          volume={(f: number) => {
            const base = interpolate(f, [0, 25, TOTAL_FRAMES - 45, TOTAL_FRAMES - 9], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return base * bgmGain(f + 9);
          }}
        />
      </Sequence>
    )}
  </>
);
