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
import { SHOTS, TOTAL_FRAMES, VO_LEAD } from './timeline';
import { BEATS as B1 } from './shots/BrandOpen';
import { BEATS as B2 } from './shots/HeroShot';
import { BEATS as B4 } from './shots/CollageDeal';
import { BEATS as B5 } from './shots/BriefBuildShip';
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
  'fs-449645.mp3': 0.15, // soft whoosh
  'fs-131359.mp3': 0.0,  // rolled paper slap
  'fs-278205.mp3': 0.03, // switch flip
  'fs-872341.mp3': 0.0,  // digital click
  'fs-878247.mp3': 0.0,  // glass ping
  'fs-630019.mp3': 0.33, // page turn
  'fs-859482.mp3': 2.28, // cinematic riser (peak far in — treat as land-at)
};

const CUES: Cue[] = [
  // S1 BrandOpen — film open, badge stamp, typewriter, exit lift
  { shot: 'Shot01BrandOpen', at: 0, file: 'fs-879272.mp3', vol: 0.32 },
  { shot: 'Shot01BrandOpen', at: B1.badge, file: 'fs-879272.mp3', vol: 0.55 },
  { shot: 'Shot01BrandOpen', at: B1.type, file: 'fs-630019.mp3', vol: 1.4 },
  { shot: 'Shot01BrandOpen', at: B1.out, file: 'fs-449645.mp3', vol: 0.6 },
  // S2 Hero — typing, result rows, the FOUND moment, the promise, exit
  { shot: 'Shot02Hero', at: 12, file: 'fs-872341.mp3', vol: 0.16 },
  { shot: 'Shot02Hero', at: 30, file: 'fs-872341.mp3', vol: 0.16 },
  { shot: 'Shot02Hero', at: 46, file: 'fs-872341.mp3', vol: 0.16 },
  { shot: 'Shot02Hero', at: 44, file: 'fs-879272.mp3', vol: 0.24 },
  { shot: 'Shot02Hero', at: 56, file: 'fs-879272.mp3', vol: 0.42 },
  { shot: 'Shot02Hero', at: 64, file: 'fs-878247.mp3', vol: 0.38 },
  { shot: 'Shot02Hero', at: B2.cardOut, file: 'fs-449645.mp3', vol: 0.5 },
  { shot: 'Shot02Hero', at: B2.badge, file: 'fs-879272.mp3', vol: 0.5 },
  { shot: 'Shot02Hero', at: B2.cta, file: 'fs-278205.mp3', vol: 0.28 },
  { shot: 'Shot02Hero', at: B2.stamp, file: 'fs-131359.mp3', vol: 0.5 },
  { shot: 'Shot02Hero', at: B2.out, file: 'fs-449645.mp3', vol: 0.7 },
  // S4 Collage — board lands, then the three problems land on the VO beats
  { shot: 'Shot04Collage', at: 4, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot04Collage', at: 14, file: 'fs-131359.mp3', vol: 0.65 },
  ...B4.land.map((at, k) => ({ shot: 'Shot04Collage', at, file: 'fs-131359.mp3', vol: 0.7 + 0.03 * k })),
  { shot: 'Shot04Collage', at: B4.land[3] + 6, file: 'fs-878247.mp3', vol: 0.35 },
  // S5 Process — word impacts, rolls, stamp, riser into the plans
  { shot: 'Shot05Process', at: 3, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot05Process', at: 10, file: 'fs-879272.mp3', vol: 0.35 },
  ...B5.roll.map((at) => ({ shot: 'Shot05Process', at, file: 'fs-278205.mp3', vol: 0.45 })),
  { shot: 'Shot05Process', at: B5.roll[2] + 6, file: 'fs-879272.mp3', vol: 0.3 },
  // riser starts under "SHIP" (abs 496) and peaks 2.28s later, exactly as the
  // three plan cards stand up (S7 local 40 = abs 564)
  { shot: 'Shot07Plans', at: 40, file: 'fs-859482.mp3', vol: 0.4 },
  // S7 Plans — the three real cards stand up, the price spotlight travels
  ...B7.pop.map((at) => ({ shot: 'Shot07Plans', at, file: 'fs-131359.mp3', vol: 0.7 })),
  ...B7.price.map(([a]) => ({ shot: 'Shot07Plans', at: a, file: 'fs-878247.mp3', vol: 0.4 })),
  { shot: 'Shot07Plans', at: B7.note, file: 'fs-278205.mp3', vol: 0.3 },
  { shot: 'Shot07Plans', at: B7.out, file: 'fs-449645.mp3', vol: 0.55 },
  // S8 Inclusions — three inclusion rows press in, then the note
  ...[16, 40, 64].map((at) => ({ shot: 'Shot08Inclusions', at: at + 8, file: 'fs-278205.mp3', vol: 0.35 })),
  { shot: 'Shot08Inclusions', at: B8.note, file: 'fs-878247.mp3', vol: 0.25 },
  // S9 Estimator — entry, digits settle, toggle flip, SAVE 10%, yearly settle
  { shot: 'Shot09Estimator', at: 0, file: 'fs-449645.mp3', vol: 0.55 },
  { shot: 'Shot09Estimator', at: B9.price, file: 'fs-872341.mp3', vol: 0.4 },
  { shot: 'Shot09Estimator', at: B9.flip, file: 'fs-278205.mp3', vol: 0.6 },
  { shot: 'Shot09Estimator', at: B9.save, file: 'fs-131359.mp3', vol: 0.55 },
  { shot: 'Shot09Estimator', at: B9.flip + 26, file: 'fs-872341.mp3', vol: 0.4 },
  // S10 Outro — three plan prints, wordmark, contact, final hold
  { shot: 'Shot10Outro', at: B10.badge, file: 'fs-879272.mp3', vol: 0.4 },
  ...[34, 44, 54].map((at) => ({ shot: 'Shot10Outro', at, file: 'fs-131359.mp3', vol: 0.6 })),
  { shot: 'Shot10Outro', at: B10.word + 22, file: 'fs-878247.mp3', vol: 0.35 },
  { shot: 'Shot10Outro', at: B10.contact, file: 'fs-630019.mp3', vol: 0.9 },
  { shot: 'Shot10Outro', at: B10.contact + 22, file: 'fs-872341.mp3', vol: 0.4 },
];

const VO = [
  { id: 's1', shot: 'Shot01BrandOpen' },
  { id: 's2', shot: 'Shot02Hero' },
  { id: 's4', shot: 'Shot04Collage' },
  { id: 's5', shot: 'Shot05Process' },
  { id: 's7', shot: 'Shot07Plans' },
  { id: 's8', shot: 'Shot08Inclusions' },
  { id: 's9', shot: 'Shot09Estimator' },
  { id: 's10', shot: 'Shot10Outro' },
].map((v) => ({ ...v, vol: 0.95, start: abs(v.shot, VO_LEAD), dur: SHOTS.find((s) => s.id === v.shot)!.dur }));

// BGM base gain, ducked under each VO line (0.14) with 8f ramps
const bgmGain = (f: number) => {
  const ducked = VO.some(({ start, dur }) => f >= start - 8 && f <= start + dur + 8);
  return ducked ? 0.14 : 0.32;
};

export const AudioTrack: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => (
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
        <Audio src={staticFile(`audio/vo/${v.id}.wav`)} volume={v.vol} />
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
