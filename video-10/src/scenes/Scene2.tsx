import React from 'react';
import {useCurrentFrame, interpolate, AbsoluteFill, staticFile, Audio} from 'remotion';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  const sandProgress = interpolate(frame, [0, 90], [0, 1], {
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
        opacity,
      }}
    >
      <Audio src={staticFile('voice-2.mp3')} />
      
      {/* Hourglass Container */}
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 180,
          marginBottom: 50,
        }}
      >
        {/* Top bulb */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 80,
            border: '3px solid #000000',
            borderRadius: '50% 50% 0 0',
            borderBottom: 'none',
            backgroundColor: 'transparent',
          }}
        />
        
        {/* Bottom bulb */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 80,
            border: '3px solid #000000',
            borderRadius: '0 0 50% 50%',
            borderTop: 'none',
            backgroundColor: 'transparent',
            overflow: 'hidden',
          }}
        >
          {/* Sand in bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: `${sandProgress * 70}%`,
              backgroundColor: '#87ceeb',
              borderRadius: '0 0 50% 50%',
            }}
          />
        </div>
        
        {/* Neck */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 20,
            backgroundColor: '#000000',
          }}
        />
        
        {/* Falling sand */}
        <div
          style={{
            position: 'absolute',
            top: 85,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 3,
            height: `${interpolate(sandProgress, [0, 1], [0, 70])}px`,
            backgroundColor: '#87ceeb',
            opacity: sandProgress < 0.9 ? 1 : interpolate(sandProgress, [0.9, 1], [1, 0]),
          }}
        />
        
        {/* Top sand depleting */}
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 94,
            height: 74,
            borderRadius: '50% 50% 0 0',
            backgroundColor: '#87ceeb',
            clipPath: `inset(${interpolate(sandProgress, [0, 1], [0, 100])}% 0 0 0)`,
          }}
        />
      </div>

      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          opacity: interpolate(progress, [0, 0.3], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 0.3], [20, 0])}px)`,
        }}
      >
        Your time is limited.
      </div>
    </AbsoluteFill>
  );
};
