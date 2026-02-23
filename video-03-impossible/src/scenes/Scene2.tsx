import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 2: "They told Ali he couldn't win" with vintage boxing ring

const BoxingRingSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  return (
    <svg 
      width={400 * scale} 
      height={300 * scale} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${20 * intensity}px rgba(255, 215, 0, ${0.4 * intensity}))`,
      }}
    >
      {/* Ring canvas/mat */}
      <rect x="50" y="150" width="300" height="100" fill="url(#canvasGradient)" />
      
      {/* Ring ropes - back */}
      <line x1="20" y1="100" x2="380" y2="100" stroke="#e74c3c" strokeWidth="4" />
      <line x1="25" y1="115" x2="375" y2="115" stroke="#e74c3c" strokeWidth="4" />
      <line x1="30" y1="130" x2="370" y2="130" stroke="#e74c3c" strokeWidth="4" />
      
      {/* Corner posts */}
      <rect x="15" y="80" width="15" height="120" fill="url(#postGradient)" />
      <rect x="370" y="80" width="15" height="120" fill="url(#postGradient)" />
      
      {/* Ring ropes - front (perspective) */}
      <line x1="30" y1="180" x2="370" y2="180" stroke="#c0392b" strokeWidth="5" />
      <line x1="35" y1="200" x2="365" y2="200" stroke="#c0392b" strokeWidth="5" />
      <line x1="40" y1="220" x2="360" y2="220" stroke="#c0392b" strokeWidth="5" />
      
      {/* Turnbuckle covers */}
      <rect x="12" y="95" width="8" height="12" fill="#ffd700" />
      <rect x="12" y="110" width="8" height="12" fill="#ffd700" />
      <rect x="12" y="125" width="8" height="12" fill="#ffd700" />
      <rect x="380" y="95" width="8" height="12" fill="#ffd700" />
      <rect x="380" y="110" width="8" height="12" fill="#ffd700" />
      <rect x="380" y="125" width="8" height="12" fill="#ffd700" />
      
      {/* Vintage spotlight effect */}
      <ellipse cx="200" cy="180" rx="100" ry="40" fill="url(#spotlightGradient)" opacity={0.5 * intensity} />
      
      {/* Crowd silhouettes in background */}
      <g opacity={0.3}>
        {[...Array(15)].map((_, i) => (
          <ellipse 
            key={i} 
            cx={30 + i * 25} 
            cy={70 + Math.sin(i * 0.5) * 10} 
            rx="8" 
            ry="15" 
            fill="#2c3e50" 
          />
        ))}
      </g>
      
      <defs>
        <linearGradient id="canvasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34495e" />
          <stop offset="100%" stopColor="#2c3e50" />
        </linearGradient>
        
        <linearGradient id="postGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7f8c8d" />
          <stop offset="50%" stopColor="#95a5a6" />
          <stop offset="100%" stopColor="#7f8c8d" />
        </linearGradient>
        
        <radialGradient id="spotlightGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,215,0,0.6)" />
          <stop offset="100%" stopColor="rgba(255,215,0,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150, stiffness: 100}});
  const ringReveal = spring({fps, frame: frame - 30, config: {damping: 100, stiffness: 80}});
  
  // Gold glow effects
  const goldGlow = interpolate(frame % 40, [0, 20, 40], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 30, [0, 15, 30], [0.5, 1, 0.5]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Gold glow background */}
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.12 * goldGlow}), rgba(231, 76, 60, ${0.06 * goldGlow}), transparent 70%)`,
        filter: 'blur(80px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 600,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.2 * brightPulse}), rgba(231,76,60,${0.12 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.18 + i * 0.07) + i * 45}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating gold particles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#ffd700',
          left: `${8 + i * 9}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: brightPulse * (0.4 + Math.random() * 0.4),
          boxShadow: '0 0 18px rgba(255,215,0,0.8)',
          transform: `translateY(${Math.sin((frame + i * 25) * 0.09) * 35}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -180,
      }}>
        <div style={{
          fontSize: 42,
          fontWeight: 900,
          color: '#e74c3c',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 40px rgba(231,76,60,${0.6 * goldGlow}), 0 0 80px rgba(255,215,0,${0.3 * brightPulse})`,
        }}>
          They told Ali
        </div>
        
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 12,
          opacity: spring({fps, frame: frame - 20, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 20, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 20, config: {damping: 120}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 60px rgba(255, 215, 0, ${0.8 * brightPulse})`,
        }}>
          he couldn't win
        </div>
        
        <div style={{
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          textAlign: 'center',
          marginTop: 16,
          opacity: spring({fps, frame: frame - 40, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 40, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 30px rgba(255,255,255,${0.5 * brightPulse})`,
        }}>
          They were wrong.
        </div>
      </div>
      
      {/* Boxing Ring */}
      <div style={{
        marginTop: 80,
        opacity: ringReveal,
        transform: `translateY(${interpolate(ringReveal, [0, 1], [60, 0])}px) scale(${interpolate(ringReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <BoxingRingSVG scale={1.1} intensity={brightPulse} />
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 18,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 700,
        textShadow: `0 0 20px rgba(255,215,0,${0.7 * brightPulse})`,
      }}>
        HE PROVED THEM ALL WRONG
      </div>
    </AbsoluteFill>
  );
};
