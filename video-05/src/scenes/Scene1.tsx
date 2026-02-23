import React from 'react';
import {useCurrentFrame, interpolate, AbsoluteFill, staticFile, Audio} from 'remotion';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <Audio src={staticFile('voice-1.mp3')} />
      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 72,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          opacity: interpolate(progress, [0, 0.3], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 0.3], [30, 0])}px)`,
          textShadow: '0 0 60px rgba(0,0,0,0.08)',
        }}
      >
        Stay hungry.
      </div>
      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 72,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          marginTop: 20,
          opacity: interpolate(progress, [0.2, 0.5], [0, 1]),
          transform: `translateY(${interpolate(progress, [0.2, 0.5], [30, 0])}px)`,
          textShadow: '0 0 60px rgba(0,0,0,0.08)',
        }}
      >
        Stay foolish.
      </div>
      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 24,
          fontWeight: 400,
          color: '#555555',
          marginTop: 60,
          letterSpacing: '0.1em',
          opacity: interpolate(progress, [0.4, 0.7], [0, 1]),
        }}
      >
        — Steve Jobs
      </div>
    </AbsoluteFill>
  );
};
