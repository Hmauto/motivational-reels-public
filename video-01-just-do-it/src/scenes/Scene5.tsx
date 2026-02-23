import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 5: "Make it happen."

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150}});
  const whiteGlow = interpolate(frame % 30, [0, 15, 30], [0.4, 1, 0.4]);
  const brightPulse = interpolate(frame % 25, [0, 12, 25], [0.6, 1, 0.6]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense white/golden glow background */}
      <div style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.2 * brightPulse}), rgba(255, 107, 53, ${0.15 * whiteGlow}), rgba(255, 255, 255, ${0.1 * whiteGlow}), transparent 70%)`,
        filter: 'blur(80px)',
        transform: `scale(${interpolate(frame % 35, [0, 17, 35], [1, 1.15, 1])})`,
      }} />
      
      {/* Rotating light rays */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 800,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.3 * brightPulse}), rgba(255,215,0,${0.2 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.35 + i * 0.04) + i * 18}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating golden/white particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5 + (i % 3),
          height: 5 + (i % 3),
          borderRadius: '50%',
          background: i % 2 === 0 ? '#ffd700' : '#fff',
          left: `${6 + i * 8}%`,
          top: `${8 + (i % 6) * 14}%`,
          opacity: brightPulse * (0.5 + (i % 4) * 0.1),
          boxShadow: `0 0 ${20 + i * 3}px rgba(255,215,0,${0.8 * brightPulse})`,
          transform: `translateY(${Math.sin((frame + i * 30) * 0.1) * 35}px) scale(${interpolate((frame + i * 15) % 30, [0, 15, 30], [0.6, 1.4, 0.6])})`,
        }} />
      ))}
      
      {/* Trophy icon background */}
      <div style={{
        position: 'absolute',
        fontSize: 250,
        opacity: 0.08 * brightPulse,
        filter: 'blur(3px)',
        transform: `scale(${interpolate(frame % 40, [0, 20, 40], [0.95, 1.05, 0.95])})`,
      }}>
        🏆
      </div>
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{
          fontSize: 84,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px) scale(${interpolate(textReveal, [0, 0.5, 1], [0.85, 1.08, 1])})`,
          textShadow: `0 0 60px rgba(255,255,255,${0.6 * whiteGlow}), 0 0 120px rgba(255,215,0,${0.4 * brightPulse})`,
          letterSpacing: '0.03em',
        }}>
          Make it
        </div>
        
        <div style={{
          fontSize: 96,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 10,
          opacity: spring({fps, frame: frame - 35, config: {damping: 100}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 100}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 100}}),
            [0, 0.5, 1],
            [0.8, 1.1, 1]
          )})`,
          textShadow: `0 0 80px rgba(255, 215, 0, ${0.9 * brightPulse}), 0 0 150px rgba(255,255,255,${0.5 * whiteGlow}), 0 0 200px rgba(255,215,0,${0.3 * brightPulse})`,
          letterSpacing: '0.05em',
        }}>
          happen.
        </div>
      </div>
      
      {/* Star burst */}
      <div style={{
        marginTop: 50,
        fontSize: 70,
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        transform: `rotate(${frame * 2}deg) scale(${interpolate(frame % 20, [0, 10, 20], [1, 1.2, 1])})`,
        filter: `drop-shadow(0 0 30px rgba(255,215,0,${0.8 * brightPulse}))`,
      }}>
        ✨
      </div>
      
      {/* Bottom CTA */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: 700,
        textShadow: '0 0 15px rgba(255,255,255,0.3)',
      }}>
        Start Today
      </div>
    </AbsoluteFill>
  );
};
