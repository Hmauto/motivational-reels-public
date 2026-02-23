import {Composition, registerRoot} from 'remotion';
import {Root} from './Root';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Root}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
  );
};

registerRoot(RemotionRoot);
