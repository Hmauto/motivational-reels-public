import React from 'react';
import {useCurrentFrame, interpolate, AbsoluteFill, staticFile, Audio} from 'remotion';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: 'clamp',
  });

  const pulseProgress = (frame % 30) / 30;
  const pulseScale = 1 + Math.sin(pulseProgress * Math.PI * 2) * 0.1;

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
      <Audio src={staticFile('voice-4.mp3')} />
      
      {/* Heart and Lion Container */}
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 150,
          marginBottom: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Heart */}
        <div
          style={{
            position: 'relative',
            width: 80,
            height: 70,
            transform: `scale(${pulseScale})`,
            opacity: interpolate(progress, [0, 0.3], [0, 1]),
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 40,
              height: 60,
              backgroundColor: '#000000',
              borderRadius: '40px 40px 0 0',
              transform: 'rotate(-45deg)',
              left: 20,
              boxShadow: '0 0 30px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 40,
              height: 60,
              backgroundColor: '#000000',
              borderRadius: '40px 40px 0 0',
              transform: 'rotate(45deg)',
              left: 32,
              boxShadow: '0 0 30px rgba(0,0,0,0.15)',
            }}
          />
          
          {/* Pulse lines */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${1 + pulseProgress * 0.5})`,
              width: 100,
              height: 100,
              border: '2px solid rgba(0,0,0,0.1)',
              borderRadius: '50%',
              opacity: 1 - pulseProgress,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${1 + (pulseProgress > 0.5 ? (pulseProgress - 0.5) * 2 : 0) * 0.5})`,
              width: 100,
              height: 100,
              border: '2px solid rgba(0,0,0,0.08)',
              borderRadius: '50%',
              opacity: pulseProgress > 0.5 ? 1 - (pulseProgress - 0.5) * 2 : 0,
            }}
          />
        </div>

        {/* Lion - Courage symbol */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: `translateY(-50%) translateX(${interpolate(progress, [0.3, 0.6], [50, 0])}px)`,
            opacity: interpolate(progress, [0.3, 0.6], [0, 1]),
            fontSize: 60,
          }}
        >
          🦁
        </div>
      </div>

      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 40,
          fontWeight: 300,
          color: '#000000',
          textAlign: 'center',
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
          maxWidth: 800,
          padding: '0 40px',
          opacity: interpolate(progress, [0.1, 0.4], [0, 1]),
          transform: `translateY(${interpolate(progress, [0.1, 0.4], [20, 0])}px)`,
        }}
      >
        Have the courage
        <br />
        to follow your heart.
      </div>
    </AbsoluteFill>
  );
};
