// Central SFX pin table + BGM — scene components embed no audio.
// `from` offsets compensate each file's measured 10ms-energy peak so the
// peak lands on the pinned action frame (sound-design §4.6).
// SFX: Freesound CC0 (public/audio/sfx/audio-manifest.json).
// BGM: Mixkit Stock Music Free License (public/audio/ATTRIBUTION.md).
import React from 'react';
import { Audio, Sequence, interpolate, staticFile } from 'remotion';
import { SHOTS } from './shots/WebRivoShort';

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
  // S1 BrandOpen — badge stamp, typewriter, exit lift
  { shot: 'Shot01BrandOpen', at: 30, file: 'fs-879272.mp3', vol: 0.55 },
  { shot: 'Shot01BrandOpen', at: 44, file: 'fs-630019.mp3', vol: 1.4 },
  { shot: 'Shot01BrandOpen', at: 126, file: 'fs-449645.mp3', vol: 0.6 },
  // S2 Hero — camera crash-in tail, Caveat stamp, whip-up exit
  { shot: 'Shot02Hero', at: 140, file: 'fs-879272.mp3', vol: 0.3 },
  { shot: 'Shot02Hero', at: 164, file: 'fs-131359.mp3', vol: 0.45 },
  { shot: 'Shot02Hero', at: 224, file: 'fs-449645.mp3', vol: 0.7 },
  // S3 Title "MADE FOR MAIN STREET"
  { shot: 'Shot03Title', at: 8, file: 'fs-879272.mp3', vol: 0.5 },
  // S4 Collage — board lands, 4 cards dealt on the accelerated cue rhythm
  { shot: 'Shot04Collage', at: 4, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot04Collage', at: 48, file: 'fs-131359.mp3', vol: 0.65 },
  { shot: 'Shot04Collage', at: 52, file: 'fs-131359.mp3', vol: 0.7 },
  { shot: 'Shot04Collage', at: 56, file: 'fs-131359.mp3', vol: 0.7 },
  { shot: 'Shot04Collage', at: 59, file: 'fs-131359.mp3', vol: 0.6 },
  // S5 Process — word impacts, rolls, stamp + seal
  { shot: 'Shot05Process', at: 3, file: 'fs-879272.mp3', vol: 0.4 },
  { shot: 'Shot05Process', at: 10, file: 'fs-879272.mp3', vol: 0.35 },
  { shot: 'Shot05Process', at: 44, file: 'fs-278205.mp3', vol: 0.45 },
  { shot: 'Shot05Process', at: 46, file: 'fs-879272.mp3', vol: 0.3 },
  { shot: 'Shot05Process', at: 88, file: 'fs-278205.mp3', vol: 0.45 },
  { shot: 'Shot05Process', at: 92, file: 'fs-131359.mp3', vol: 0.5 },
  { shot: 'Shot05Process', at: 106, file: 'fs-878247.mp3', vol: 0.5 },
  // S6 Title "PICK YOUR PLAN" + riser into the first plan card
  { shot: 'Shot06Title', at: 8, file: 'fs-879272.mp3', vol: 0.5 },
  { shot: 'Shot06Title', at: 0, file: 'fs-859482.mp3', vol: 0.4 },
  // S7 Plans — cards deal at k*50, BEST VALUE pills stamp after k1/k2
  { shot: 'Shot07Plans', at: 12, file: 'fs-131359.mp3', vol: 0.7 },
  { shot: 'Shot07Plans', at: 62, file: 'fs-131359.mp3', vol: 0.7 },
  { shot: 'Shot07Plans', at: 66, file: 'fs-878247.mp3', vol: 0.4 },
  { shot: 'Shot07Plans', at: 112, file: 'fs-131359.mp3', vol: 0.75 },
  { shot: 'Shot07Plans', at: 168, file: 'fs-449645.mp3', vol: 0.55 },
  // S8 Inclusions — three inclusion rows press in
  { shot: 'Shot08Inclusions', at: 30, file: 'fs-278205.mp3', vol: 0.35 },
  { shot: 'Shot08Inclusions', at: 64, file: 'fs-278205.mp3', vol: 0.35 },
  { shot: 'Shot08Inclusions', at: 98, file: 'fs-278205.mp3', vol: 0.35 },
  // S9 Estimator — entry, digits settle, toggle flip, SAVE 10%, yearly settle
  { shot: 'Shot09Estimator', at: 0, file: 'fs-449645.mp3', vol: 0.55 },
  { shot: 'Shot09Estimator', at: 52, file: 'fs-872341.mp3', vol: 0.4 },
  { shot: 'Shot09Estimator', at: 70, file: 'fs-278205.mp3', vol: 0.6 },
  { shot: 'Shot09Estimator', at: 80, file: 'fs-131359.mp3', vol: 0.55 },
  { shot: 'Shot09Estimator', at: 106, file: 'fs-872341.mp3', vol: 0.4 },
  // S10 Outro — three plan prints, contact chips, sign-off, final stamp
  { shot: 'Shot10Outro', at: 32, file: 'fs-131359.mp3', vol: 0.6 },
  { shot: 'Shot10Outro', at: 44, file: 'fs-131359.mp3', vol: 0.55 },
  { shot: 'Shot10Outro', at: 56, file: 'fs-131359.mp3', vol: 0.6 },
  { shot: 'Shot10Outro', at: 72, file: 'fs-878247.mp3', vol: 0.35 },
  { shot: 'Shot10Outro', at: 96, file: 'fs-630019.mp3', vol: 0.9 },
  { shot: 'Shot10Outro', at: 116, file: 'fs-872341.mp3', vol: 0.4 },
];

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
    {bgm && (
      <Sequence from={9} name="bgm">
        {/* house-vibez ~122.4 BPM grid: beats land 10.8f + k*14.7f from film start */}
        <Audio
          src={BG}
          volume={(f: number) =>
            interpolate(f, [0, 25, 1511, 1551], [0, 0.32, 0.32, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      </Sequence>
    )}
  </>
);
