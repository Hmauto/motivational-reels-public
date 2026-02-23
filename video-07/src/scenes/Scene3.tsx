import React from 'react';
import {useCurrentFrame, interpolate, AbsoluteFill, staticFile, Audio} from 'remotion';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  const pathProgress = interpolate(frame, [0, 90], [0, 1], {
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
      <Audio src={staticFile('voice-3.mp3')} />
      
      {/* Diverging Paths Visualization */}
      <div
        style={{
          position: 'relative',
          width: 300,
          height: 150,
          marginBottom: 50,
        }}
      >
        {/* Starting point */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#000000',
          }}
        />
        
        {/* Left path - someone else's life */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            width: `${interpolate(pathProgress, [0, 1], [0, 120])}px`,
            height: 3,
            backgroundColor: '#cccccc',
            transformOrigin: 'left center',
            transform: 'rotate(-25deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 55,
            left: `${50 - interpolate(pathProgress, [0, 1], [0, 25])}%`,
            opacity: interpolate(pathProgress, [0.5, 1], [0, 0.4]),
            fontSize: 14,
            color: '#1e3a5f',
            fontFamily: '-apple-system, sans-serif',
          }}
        >
          Their path
        </div>
        
        {/* Right path - your life */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            width: `${interpolate(pathProgress, [0, 1], [0, 120])}px`,
            height: 3,
            backgroundColor: '#000000',
            transformOrigin: 'left center',
            transform: 'rotate(25deg)',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 55,
            right: `${50 - interpolate(pathProgress, [0, 1], [0, 25])}%`,
            opacity: interpolate(pathProgress, [0.5, 1], [0, 1]),
            fontSize: 14,
            color: '#000000',
            fontFamily: '-apple-system, sans-serif',
            fontWeight: 500,
          }}
        >
          Your path
        </div>
        
        {/* Arrow on your path */}
        <div
          style={{
            position: 'absolute',
            bottom: 52,
            right: `${50 - interpolate(pathProgress, [0.3, 1], [0, 20])}%`,
            width: 0,
            height: 0,
            borderLeft: '8px solid #000000',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            opacity: interpolate(pathProgress, [0.3, 0.6], [0, 1]),
            transform: 'rotate(25deg)',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 42,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
          maxWidth: 800,
          padding: '0 40px',
          opacity: interpolate(progress, [0, 0.3], [0, 1]),
          transform: `translateY(${interpolate(progress, [0, 0.3], [20, 0])}px)`,
        }}
      >
        Don't waste it living
        <br />
        someone else's life.
      </div>
    </AbsoluteFill>
  );
};
