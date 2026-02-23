import React from 'react';
import {Composition, Series, Audio, staticFile, Sequence} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';

// Scene durations (frames @ 30fps)
const DURATIONS = {
  s1: 90,   // 3s
  s2: 90,   // 3s
  s3: 120,  // 4s
  s4: 90,   // 3s
  s5: 90,   // 3s
};

const AUDIO_STARTS = {
  s1: 0,
  s2: DURATIONS.s1,
  s3: DURATIONS.s1 + DURATIONS.s2,
  s4: DURATIONS.s1 + DURATIONS.s2 + DURATIONS.s3,
  s5: DURATIONS.s1 + DURATIONS.s2 + DURATIONS.s3 + DURATIONS.s4
};

const TOTAL_FRAMES = Object.values(DURATIONS).reduce((a, b) => a + b, 0);

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="JustDoIt"
        component={JustDoIt}
        durationInFrames={TOTAL_FRAMES}
        width={1080}
        height={1920}
        fps={30}
      />
    </>
  );
};

const JustDoIt: React.FC = () => {
  return (
    <>
      <Series>
        <Series.Sequence durationInFrames={DURATIONS.s1}><Scene1 /></Series.Sequence>
        <Series.Sequence durationInFrames={DURATIONS.s2}><Scene2 /></Series.Sequence>
        <Series.Sequence durationInFrames={DURATIONS.s3}><Scene3 /></Series.Sequence>
        <Series.Sequence durationInFrames={DURATIONS.s4}><Scene4 /></Series.Sequence>
        <Series.Sequence durationInFrames={DURATIONS.s5}><Scene5 /></Series.Sequence>
      </Series>
      
      <Sequence from={AUDIO_STARTS.s1} durationInFrames={DURATIONS.s1}><Audio src={staticFile('voice-1.mp3')} /></Sequence>
      <Sequence from={AUDIO_STARTS.s2} durationInFrames={DURATIONS.s2}><Audio src={staticFile('voice-2.mp3')} /></Sequence>
      <Sequence from={AUDIO_STARTS.s3} durationInFrames={DURATIONS.s3}><Audio src={staticFile('voice-3.mp3')} /></Sequence>
      <Sequence from={AUDIO_STARTS.s4} durationInFrames={DURATIONS.s4}><Audio src={staticFile('voice-4.mp3')} /></Sequence>
      <Sequence from={AUDIO_STARTS.s5} durationInFrames={DURATIONS.s5}><Audio src={staticFile('voice-5.mp3')} /></Sequence>
    </>
  );
};
