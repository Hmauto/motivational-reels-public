import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 3: "Your dreams won't chase themselves."

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150}});
  const whiteGlow = interpolate(frame % 35, [0, 17, 35], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 25, [0, 12, 25], [0.5, 1, 0.5]);
  
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
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 107, 53, ${0.2 * whiteGlow}), rgba(255, 255, 255, ${0.1 * whiteGlow}), transparent 70%)`,
        filter: 'blur(70px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 700,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.3 * brightPulse}), rgba(255,107,53,${0.2 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.25 + i * 0.06) + i * 30}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating white particles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5 + (i % 3),
          height: 5 + (i % 3),
          borderRadius: '50%',
          background: '#fff',
          left: `${8 + i * 9}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: brightPulse * 0.5,
          boxShadow: '0 0 15px rgba(255,255,255,0.9)',
          transform: `translateY(${Math.sin((frame + i * 25) * 0.08) * 30}px)`,
        }} />
      ))}
      
      {/* Dream cloud icon */}
      <div style={{
        position: 'absolute',
        fontSize: 150,
        opacity: 0.15 * brightPulse,
        filter: 'blur(2px)',
        transform: `translateY(-100px) scale(${interpolate(frame % 50, [0, 25, 50], [1, 1.1, 1])})`,
      }}>
        ☁️
      </div>
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        maxWidth: 900,
        padding: '0 40px',
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [35, 0])}px)`,
          textShadow: `0 0 30px rgba(255,255,255,${0.4 * whiteGlow})`,
        }}>
          Your dreams
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#ff6b35',
          textAlign: 'center',
          marginTop: 10,
          opacity: spring({fps, frame: frame - 30, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 30, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 50px rgba(255, 107, 53, ${0.8 * brightPulse}), 0 0 100px rgba(255,255,255,${0.3 * whiteGlow})`,
        }}>
          won't chase
        </div>
        
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          marginTop: 10,
          opacity: spring({fps, frame: frame - 50, config: {damping: 100}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 50, config: {damping: 100}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 50, config: {damping: 100}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 60px rgba(255,255,255,${0.6 * whiteGlow})`,
        }}>
          themselves.
        </div>
      </div>
      
      {/* Running person emoji */}
      <div style={{
        marginTop: 40,
        fontSize: 80,
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        transform: `translateX(${Math.sin(frame * 0.2) * 20}px)`,
        filter: `drop-shadow(0 10px 30px rgba(255,107,53,${0.5 * brightPulse}))`,
      }}>
        🏃
      </div>
    </AbsoluteFill>
  );
};
