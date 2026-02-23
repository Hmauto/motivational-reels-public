import {Sequence, Audio} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';

export const Root: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={90}>
        <Scene1 />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Scene2 />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <Scene3 />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <Scene4 />
      </Sequence>
      <Sequence from={360} durationInFrames={90}>
        <Scene5 />
      </Sequence>
      
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" startFrom={0} volume={0} />
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" startFrom={90} volume={0} />
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" startFrom={180} volume={0} />
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" startFrom={270} volume={0} />
      <Audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" startFrom={360} volume={0} />
    </>
  );
};