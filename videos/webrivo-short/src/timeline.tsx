// Master timeline — shared by the picture (shots/WebRivoShort.tsx) and the
// sound (AudioTrack.tsx). Kept in its own module so audio can resolve cue
// frames without importing the composition that renders the audio.
//
// Pacing rule: every cut lands ~0.4–1.1s after the previous spoken word, so the
// film never sits in silence — there are no music-only scenes at all.
import React from 'react';
import { BrandOpen } from './shots/BrandOpen';
import { SearchShot } from './shots/SearchShot';
import { CollageDeal } from './shots/CollageDeal';
import { BriefBuildShip } from './shots/BriefBuildShip';
import { PlanCards } from './shots/PlanCards';
import { Inclusions } from './shots/Inclusions';
import { Estimator } from './shots/Estimator';
import { Outro } from './shots/Outro';

// Voice-over starts this many frames into each shot (the wav's own 0.3s lead
// silence lands the first syllable ~11f after the cut — see AUDIO-TIMELINE.md).
export const VO_LEAD = 2;

// 1506f = 50.2s. Shots are sized to the lines they carry: `vo` lists the wav
// ids and their shot-local start frames (mapped in AudioTrack from the same
// numbers).
export const SHOTS: {
  id: string;
  from: number;
  dur: number;
  comp: React.FC;
  vo: { id: string; at: number }[];
}[] = [
  { id: 'Shot01BrandOpen', from: 0, dur: 210, comp: BrandOpen,
    vo: [{ id: 's1a', at: 2 }, { id: 's1b', at: 88 }] },
  { id: 'Shot02Hero', from: 210, dur: 210, comp: SearchShot,
    vo: [{ id: 's2a', at: 2 }, { id: 's2b', at: 124 }] },
  { id: 'Shot04Collage', from: 420, dur: 238, comp: CollageDeal,
    vo: [{ id: 's4a', at: 2 }, { id: 's4b', at: 140 }] },
  { id: 'Shot05Process', from: 658, dur: 104, comp: BriefBuildShip,
    vo: [{ id: 's5a', at: 2 }] },
  { id: 'Shot07Plans', from: 762, dur: 200, comp: PlanCards,
    vo: [{ id: 's7a', at: 2 }, { id: 's7b', at: 140 }] },
  { id: 'Shot08Inclusions', from: 962, dur: 112, comp: Inclusions,
    vo: [{ id: 's8a', at: 2 }] },
  { id: 'Shot09Estimator', from: 1074, dur: 196, comp: Estimator,
    vo: [{ id: 's9a', at: 2 }, { id: 's9b', at: 104 }] },
  { id: 'Shot10Outro', from: 1270, dur: 236, comp: Outro,
    vo: [{ id: 's10a', at: 2 }, { id: 's10b', at: 49 }, { id: 's10c', at: 150 }] },
];

export const TOTAL_FRAMES = SHOTS[SHOTS.length - 1].from + SHOTS[SHOTS.length - 1].dur; // 1506

export const abs = (shotId: string, local: number) => {
  const s = SHOTS.find((x) => x.id === shotId);
  if (!s) throw new Error(`unknown shot ${shotId}`);
  return s.from + local;
};

// every voiced frame, flattened — the audio mix and the verify script both
// read this instead of hard-coding start frames twice
export const VO_LINES = SHOTS.flatMap((s) =>
  s.vo.map((v) => ({ id: v.id, shot: s.id, start: s.from + v.at }))
);
