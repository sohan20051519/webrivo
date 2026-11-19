import { registerRoot, Composition } from 'remotion';
import { WebRivoShort, SHOTS } from './shots/WebRivoShort';

const FPS = 30;

export const Root: React.FC = () => (
  <>
    <Composition
      id="WebRivoShort"
      component={WebRivoShort}
      defaultProps={{ bgm: true, voDir: 'audio/vo' }}
      durationInFrames={SHOTS.reduce((a, s) => a + s.dur, 0)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="WebRivoShortKn"
      component={WebRivoShort}
      defaultProps={{ bgm: true, voDir: 'audio/vo-kn' }}
      durationInFrames={SHOTS.reduce((a, s) => a + s.dur, 0)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    {SHOTS.map((s) => (
      <Composition
        key={s.id}
        id={s.id}
        component={s.comp}
        durationInFrames={s.dur}
        fps={FPS}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
