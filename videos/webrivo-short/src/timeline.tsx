// Master timeline — shared by the picture (shots/WebRivoShort.tsx) and the
// sound (AudioTrack.tsx). Kept in its own module so audio can resolve cue
// frames without importing the composition that renders the audio.
//
// Pacing rule: every cut lands ~0.5–1.2s after the previous spoken word, so the
// film never sits in silence — there are no music-only scenes at all.
import React from 'react';
import { BrandOpen } from './shots/BrandOpen';
import { HeroShot } from './shots/HeroShot';
import { CollageDeal } from './shots/CollageDeal';
import { BriefBuildShip } from './shots/BriefBuildShip';
import { PlanCards } from './shots/PlanCards';
import { Inclusions } from './shots/Inclusions';
import { Estimator } from './shots/Estimator';
import { Outro } from './shots/Outro';

// Voice-over starts this many frames into each shot (the wav's own 0.3s lead
// silence lands the first syllable ~11f after the cut — see AUDIO-TIMELINE.md).
export const VO_LEAD = 2;

export const SHOTS: { id: string; from: number; dur: number; comp: React.FC }[] = [
  { id: 'Shot01BrandOpen', from: 0, dur: 96, comp: BrandOpen },
  { id: 'Shot02Hero', from: 96, dur: 152, comp: HeroShot },
  { id: 'Shot04Collage', from: 248, dur: 176, comp: CollageDeal },
  { id: 'Shot05Process', from: 424, dur: 100, comp: BriefBuildShip },
  { id: 'Shot07Plans', from: 524, dur: 168, comp: PlanCards },
  { id: 'Shot08Inclusions', from: 692, dur: 120, comp: Inclusions },
  { id: 'Shot09Estimator', from: 812, dur: 168, comp: Estimator },
  { id: 'Shot10Outro', from: 980, dur: 176, comp: Outro },
];

export const TOTAL_FRAMES = SHOTS[SHOTS.length - 1].from + SHOTS[SHOTS.length - 1].dur; // 1156

export const abs = (shotId: string, local: number) => {
  const s = SHOTS.find((x) => x.id === shotId);
  if (!s) throw new Error(`unknown shot ${shotId}`);
  return s.from + local;
};
