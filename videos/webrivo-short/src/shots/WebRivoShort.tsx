// WebRivoShort — master timeline (1080×1920, 30fps)
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AudioTrack } from '../AudioTrack';
import { BrandOpen } from './BrandOpen';
import { HeroShot } from './HeroShot';
import { TitleCard } from './TitleCard';
import { CollageDeal } from './CollageDeal';
import { BriefBuildShip } from './BriefBuildShip';
import { PlanCards } from './PlanCards';
import { Inclusions } from './Inclusions';
import { Estimator } from './Estimator';
import { Outro } from './Outro';

export const SHOTS: { id: string; from: number; dur: number; comp: React.FC }[] = [
  { id: 'Shot01BrandOpen', from: 0, dur: 140, comp: BrandOpen },
  { id: 'Shot02Hero', from: 140, dur: 240, comp: HeroShot },
  { id: 'Shot03Title', from: 380, dur: 55, comp: () => <TitleCard line1="MADE FOR" line2="MAIN STREET" accent="STREET" sub="the studio wall" /> },
  { id: 'Shot04Collage', from: 435, dur: 170, comp: CollageDeal },
  { id: 'Shot05Process', from: 605, dur: 170, comp: BriefBuildShip },
  { id: 'Shot06Title', from: 775, dur: 55, comp: () => <TitleCard line1="PICK YOUR" line2="PLAN" accent="PLAN" sub="hosting · maintenance · domain" /> },
  { id: 'Shot07Plans', from: 830, dur: 180, comp: PlanCards },
  { id: 'Shot08Inclusions', from: 1010, dur: 150, comp: Inclusions },
  { id: 'Shot09Estimator', from: 1160, dur: 180, comp: Estimator },
  { id: 'Shot10Outro', from: 1340, dur: 220, comp: Outro },
];

export const TOTAL_FRAMES = SHOTS[SHOTS.length - 1].from + SHOTS[SHOTS.length - 1].dur; // 1560

export const WebRivoShort: React.FC<{ bgm?: boolean }> = ({ bgm = true }) => (
  <AbsoluteFill style={{ backgroundColor: '#F4F5EF', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
    <AudioTrack bgm={bgm} />
    {SHOTS.map((s) => (
      <Sequence key={s.id} from={s.from} durationInFrames={s.dur} name={s.id}>
        <s.comp />
      </Sequence>
    ))}
  </AbsoluteFill>
);
