import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 4: "Just do it. Right now."

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150}});
  const whiteGlow = interpolate(frame % 25, [0, 12, 25], [0.4, 1, 0.4]);
  const brightPulse = interpolate(frame % 20, [0, 10, 20], [0.6, 1, 0.6]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense white glow background */}
      <div style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 107, 53, ${0.3 * whiteGlow}), rgba(255, 255, 255, ${0.15 * whiteGlow}), transparent 70%)`,
        filter: 'blur(80px)',
        transform: `scale(${interpolate(frame % 30, [0, 15, 30], [1, 1.2, 1])})`,
      }} />
      
      {/* Fast rotating light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 800,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.35 * brightPulse}), rgba(255,107,53,${0.25 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.4 + i * 0.05) + i * 22.5}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Explosive white particles */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4 + (i % 4),
          height: 4 + (i % 4),
          borderRadius: '50%',
          background: '#fff',
          left: `${5 + i * 6}%`,
          top: `${5 + (i % 6) * 15}%`,
          opacity: brightPulse * (0.6 + Math.random() * 0.3),
          boxShadow: `0 0 ${20 + i * 2}px rgba(255,255,255,0.9)`,
          transform: `translateY(${Math.sin((frame + i * 20) * 0.15) * 40}px) scale(${interpolate((frame + i * 10) % 25, [0, 12, 25], [0.5, 1.5, 0.5])})`,
        }} />
      ))}
      
      {/* Main text - EPIC */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: 90,
          fontWeight: 900,
          color: '#ff6b35',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px) scale(${interpolate(textReveal, [0, 0.5, 1], [0.8, 1.1, 1])})`,
          textShadow: `0 0 80px rgba(255, 107, 53, ${0.9 * brightPulse}), 0 0 150px rgba(255,255,255,${0.5 * whiteGlow}), 0 0 200px rgba(255,107,53,${0.3 * brightPulse})`,
          letterSpacing: '0.05em',
        }}>
          Just do it.
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          marginTop: 20,
          opacity: spring({fps, frame: frame - 40, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 40, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.6 * whiteGlow})`,
        }}>
          Right now.
        </div>
      </div>
      
      {/* Lightning bolt effect */}
      <div style={{
        position: 'absolute',
        fontSize: 300,
        color: `rgba(255, 215, 0, ${0.1 * brightPulse})`,
        opacity: 0.2,
        filter: 'blur(5px)',
        transform: `rotate(-15deg) scale(${interpolate(frame % 20, [0, 10, 20], [0.9, 1.1, 0.9])})`,
      }}>
        ⚡
      </div>
    </AbsoluteFill>
  );
};
