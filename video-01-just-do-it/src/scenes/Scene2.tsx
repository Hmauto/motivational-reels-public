import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 2: "Stop making excuses."

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150}});
  const whiteGlow = interpolate(frame % 30, [0, 15, 30], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 20, [0, 10, 20], [0.5, 1, 0.5]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* White glow background */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 107, 53, ${0.15 * whiteGlow}), rgba(255, 255, 255, ${0.08 * whiteGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 600,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.25 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.3 + i * 0.08) + i * 36}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating white particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#fff',
          left: `${10 + i * 12}%`,
          top: `${15 + (i % 4) * 20}%`,
          opacity: brightPulse * 0.6,
          boxShadow: '0 0 20px rgba(255,255,255,0.8)',
          transform: `translateY(${Math.sin((frame + i * 30) * 0.1) * 25}px)`,
        }} />
      ))}
      
      {/* Big X mark for "Stop" */}
      <div style={{
        position: 'absolute',
        fontSize: 200,
        color: `rgba(233, 69, 96, ${0.15 * brightPulse})`,
        fontWeight: 900,
        opacity: 0.3,
        transform: `rotate(45deg) scale(${interpolate(frame % 40, [0, 20, 40], [0.9, 1.1, 0.9])})`,
      }}>
        ✕
      </div>
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#e94560',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 50px rgba(233, 69, 96, ${0.8 * brightPulse}), 0 0 100px rgba(255,255,255,${0.3 * whiteGlow})`,
        }}>
          Stop
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          marginTop: 12,
          opacity: spring({fps, frame: frame - 25, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 25, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.5 * whiteGlow})`,
        }}>
          making excuses.
        </div>
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        fontSize: 20,
        color: '#ff6b35',
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 700,
        textShadow: `0 0 20px rgba(255,107,53,${0.8 * brightPulse})`,
      }}>
        NO EXCUSES
      </div>
    </AbsoluteFill>
  );
};
