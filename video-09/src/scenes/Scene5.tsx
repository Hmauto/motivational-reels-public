import React from 'react';
import {useCurrentFrame, interpolate, AbsoluteFill, staticFile, Audio} from 'remotion';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const stampProgress = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkScale = interpolate(stampProgress, [0, 0.3, 0.5], [0, 1.2, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Audio src={staticFile('voice-5.mp3')} />
      
      {/* Checkmark and Success Stamp */}
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 150,
          marginBottom: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Circle background */}
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '4px solid #000000',
            opacity: interpolate(progress, [0, 0.3], [0, 1]),
            transform: `scale(${interpolate(progress, [0, 0.3], [0.8, 1])})`,
            boxShadow: '0 0 40px rgba(0,0,0,0.1)',
          }}
        />
        
        {/* Checkmark */}
        <svg
          width={60}
          height={50}
          viewBox="0 0 60 50"
          style={{
            position: 'absolute',
            transform: `scale(${checkScale})`,
            opacity: stampProgress > 0 ? 1 : 0,
          }}
        >
          <path
            d="M5 25 L20 40 L55 5"
            fill="none"
            stroke="#000000"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: interpolate(stampProgress, [0, 1], [100, 0]),
            }}
          />
        </svg>
        
        {/* Success stamp ring effect */}
        <div
          style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.1)',
            transform: `scale(${interpolate(stampProgress, [0.3, 1], [1, 1.3])})`,
            opacity: interpolate(stampProgress, [0.3, 1], [0.5, 0]),
          }}
        />
      </div>

      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 48,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          opacity: interpolate(progress, [0.2, 0.5], [0, 1]),
          transform: `translateY(${interpolate(progress, [0.2, 0.5], [20, 0])}px)`,
        }}
      >
        Everything else
        <br />
        is secondary.
      </div>
      
      {/* Final attribution */}
      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 20,
          fontWeight: 400,
          color: '#8b0000',
          marginTop: 60,
          letterSpacing: '0.15em',
          opacity: interpolate(progress, [0.5, 0.8], [0, 1]),
        }}
      >
        STAY HUNGRY · STAY FOOLISH
      </div>
    </AbsoluteFill>
  );
};
