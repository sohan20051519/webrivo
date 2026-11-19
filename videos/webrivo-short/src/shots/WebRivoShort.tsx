// WebRivoShort — master composition (1080×1920, 30fps)
// 1918f ≈ 63.9s. Each cut is snapped near the BGM grid (122.4 BPM → 9 + k·14.7f)
// and every shot is sized to its own voice-over line: the next picture starts
// ~0.4–1.0s after the last spoken word, so the film never sits in silence.
// The shot table itself lives in src/timeline.tsx (shared with the audio mix).
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AudioTrack } from '../AudioTrack';
import { SHOTS } from '../timeline';

export { SHOTS, TOTAL_FRAMES, VO_LEAD } from '../timeline';

export const WebRivoShort: React.FC<{ bgm?: boolean; voDir?: string }> = ({ bgm = true, voDir = 'audio/vo' }) => (
  <AbsoluteFill style={{ backgroundColor: '#F4F5EF', fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}>
    <AudioTrack bgm={bgm} voDir={voDir} />
    {SHOTS.map((s) => (
      <Sequence key={s.id} from={s.from} durationInFrames={s.dur} name={s.id}>
        <s.comp />
      </Sequence>
    ))}
  </AbsoluteFill>
);
