import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 3: "Champions aren't made in gyms" with training montage visuals

const TrainingMontageSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  return (
    <svg 
      width={350 * scale} 
      height={350 * scale} 
      viewBox="0 0 350 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${25 * intensity}px rgba(255, 215, 0, ${0.5 * intensity}))`,
      }}
    >
      {/* Background circle */}
      <circle cx="175" cy="175" r="160" fill="url(#bgCircleGradient)" opacity={0.3} />
      
      {/* Speed bag */}
      <ellipse cx="80" cy="100" rx="25" ry="35" fill="url(#bagGradient)" />
      <line x1="80" y1="65" x2="80" y2="30" stroke="#7f8c8d" strokeWidth="3" />
      
      {/* Jump rope */}
      <path 
        d="M250 80 Q290 120 250 160 Q210 120 250 80" 
        stroke="#e74c3c" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="250" cy="80" r="8" fill="#c0392b" />
      <circle cx="250" cy="160" r="8" fill="#c0392b" />
      
      {/* Dumbbells */}
      <g transform="translate(60, 220)">
        <rect x="20" y="10" width="60" height="12" rx="3" fill="#7f8c8d" />
        <rect x="0" y="0" width="20" height="32" rx="4" fill="#34495e" />
        <rect x="80" y="0" width="20" height="32" rx="4" fill="#34495e" />
        {/* Weight highlights */}
        <rect x="2" y="2" width="8" height="28" rx="2" fill="#5d6d7e" />
        <rect x="82" y="2" width="8" height="28" rx="2" fill="#5d6d7e" />
      </g>
      
      {/* Punching bag */}
      <ellipse cx="260" cy="260" rx="35" ry="60" fill="url(#heavyBagGradient)" />
      <line x1="260" y1="200" x2="260" y2="170" stroke="#7f8c8d" strokeWidth="4" />
      {/* Chains */}
      <line x1="255" y1="185" x2="250" y2="170" stroke="#95a5a6" strokeWidth="2" />
      <line x1="265" y1="185" x2="270" y2="170" stroke="#95a5a6" strokeWidth="2" />
      
      {/* Running shoes */}
      <g transform="translate(100, 280)">
        <path d="M0 20 Q10 5 30 10 L80 15 Q90 18 85 30 L10 35 Q0 35 0 20" fill="url(#shoeGradient)" />
        <path d="M10 22 L70 24" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" />
        {/* Laces */}
        <path d="M25 12 L35 18 M40 13 L50 19" stroke="#fff" strokeWidth="2" />
      </g>
      
      {/* Stopwatch */}
      <g transform="translate(150, 140)">
        <circle cx="0" cy="0" r="35" fill="url(#stopwatchGradient)" stroke="#ffd700" strokeWidth="3" />
        <circle cx="0" cy="0" r="28" fill="#1a1a2e" />
        {/* Clock hands */}
        <line x1="0" y1="0" x2="0" y2="-20" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2="15" y2="10" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="4" fill="#ffd700" />
        {/* Top button */}
        <rect x="-6" y="-42" width="12" height="8" rx="2" fill="#e74c3c" />
      </g>
      
      {/* Sweat drops */}
      <g opacity={intensity}>
        <ellipse cx="120" cy="80" rx="4" ry="6" fill="url(#sweatGradient)" />
        <ellipse cx="300" cy="200" rx="3" ry="5" fill="url(#sweatGradient)" />
        <ellipse cx="50" cy="280" rx="4" ry="6" fill="url(#sweatGradient)" />
      </g>
      
      {/* Motion lines */}
      <g opacity={0.4 * intensity}>
        <path d="M110 100 L130 95" stroke="#ffd700" strokeWidth="2" />
        <path d="M115 110 L135 105" stroke="#ffd700" strokeWidth="2" />
        <path d="M230 250 L210 245" stroke="#ffd700" strokeWidth="2" />
        <path d="M235 270 L215 265" stroke="#ffd700" strokeWidth="2" />
      </g>
      
      <defs>
        <radialGradient id="bgCircleGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
          <stop offset="100%" stopColor="rgba(255,215,0,0)" />
        </radialGradient>
        
        <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#5D3A1A" />
        </linearGradient>
        
        <linearGradient id="heavyBagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="50%" stopColor="#34495e" />
          <stop offset="100%" stopColor="#2c3e50" />
        </linearGradient>
        
        <linearGradient id="shoeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e74c3c" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>
        
        <linearGradient id="stopwatchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#d4ac0d" />
        </linearGradient>
        
        <radialGradient id="sweatGradient" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(173,216,230,0.4)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150, stiffness: 100}});
  const visualReveal = spring({fps, frame: frame - 35, config: {damping: 100, stiffness: 80}});
  
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
        marginTop: -160,
      }}>
        <div style={{
          fontSize: 38,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 40px rgba(255,215,0,${0.6 * goldGlow}), 0 0 80px rgba(231,76,60,${0.3 * brightPulse})`,
        }}>
          Champions aren't
        </div>
        
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 18, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 18, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.5 * brightPulse})`,
        }}>
          made in gyms
        </div>
        
        <div style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#e74c3c',
          textAlign: 'center',
          marginTop: 16,
          opacity: spring({fps, frame: frame - 35, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 30px rgba(231,76,60,${0.6 * brightPulse})`,
        }}>
          Champions are made from
        </div>
        
        <div style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 50, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 50, config: {damping: 120}}),
            [0, 1],
            [25, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 50, config: {damping: 120}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 50px rgba(255,215,0,${0.8 * brightPulse})`,
        }}>
          something they have
        </div>
        
        <div style={{
          fontSize: 42,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 65, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 65, config: {damping: 120}}),
            [0, 1],
            [20, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.6 * brightPulse})`,
        }}>
          deep inside them
        </div>
      </div>
      
      {/* Training Montage Visuals */}
      <div style={{
        marginTop: 60,
        opacity: visualReveal,
        transform: `translateY(${interpolate(visualReveal, [0, 1], [60, 0])}px) scale(${interpolate(visualReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <TrainingMontageSVG scale={0.9} intensity={brightPulse} />
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 18,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 80, config: {damping: 100}}),
        letterSpacing: '0.12em',
        fontWeight: 700,
        textShadow: `0 0 20px rgba(255,215,0,${0.7 * brightPulse})`,
      }}>
        A DESIRE. A DREAM. A VISION.
      </div>
    </AbsoluteFill>
  );
};
