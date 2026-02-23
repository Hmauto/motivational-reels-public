import React from 'react';
import {Sequence} from 'remotion';
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
    </>
  );
};
