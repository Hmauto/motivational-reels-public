import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 4: "Don't think. Just launch." with rocket/fire

const LaunchRocketSVG: React.FC<{scale?: number; intensity?: number; frame: number}> = ({scale = 1, intensity = 0.5, frame}) => {
  const flameScale = interpolate(intensity, [0, 1], [0.9, 1.3]);
  const rocketShake = Math.sin(frame * 0.8) * 2;
  
  return (
    <svg 
      width={180 * scale} 
      height={350 * scale} 
      viewBox="0 0 180 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${40 * flameScale}px rgba(155, 89, 182, ${0.9 * intensity})) 
                 drop-shadow(0 0 ${80 * flameScale}px rgba(255, 107, 53, ${0.6 * intensity}))
                 drop-shadow(0 0 ${120 * flameScale}px rgba(255, 255, 255, ${0.4 * intensity}))`,
        transform: `translateX(${rocketShake}px)`,
      }}
    >
      {/* Large flames */}
      <g transform="translate(90, 280)">
        <ellipse cx="0" cy="30" rx="35" ry="60" fill="url(#flameGradient1)" opacity={0.95 * intensity} />
        <ellipse cx="0" cy="35" rx="28" ry="50" fill="url(#flameGradient2)" opacity={0.9 * intensity} />
        <ellipse cx="0" cy="40" rx="20" ry="40" fill="url(#flameGradient3)" opacity={0.85 * intensity} />
        <ellipse cx="0" cy="45" rx="12" ry="25" fill="#fff" opacity={0.9 * intensity} />
      </g>
      
      {/* Side flames */}
      <g transform="translate(50, 260)">
        <ellipse cx="0" cy="20" rx="15" ry="35" fill="url(#flameGradient1)" opacity={0.7 * intensity} transform="rotate(15)" />
      </g>
      <g transform="translate(130, 260)">
        <ellipse cx="0" cy="20" rx="15" ry="35" fill="url(#flameGradient1)" opacity={0.7 * intensity} transform="rotate(-15)" />
      </g>
      
      {/* Rocket body */}
      <path
        d="M90 20 
           Q130 60 130 160 
           L130 240 
           Q130 265 90 275 
           Q50 265 50 240 
           L50 160 
           Q50 60 90 20"
        fill="url(#rocketGradient)"
        stroke="#9b59b6"
        strokeWidth="3"
      />
      
      {/* Rocket nose tip */}
      <ellipse cx="90" cy="20" rx="40" ry="25" fill="url(#noseGradient)" />
      
      {/* Window/cockpit */}
      <circle cx="90" cy="90" r="22" fill="url(#windowGradient)" stroke="#9b59b6" strokeWidth="3" />
      <circle cx="90" cy="90" r="16" fill="#1a1a2e" />
      <circle cx="94" cy="86" r="4" fill="#fff" opacity="0.6" />
      
      {/* Side fins */}
      <path d="M50 190 L15 260 L50 240 Z" fill="url(#finGradient)" stroke="#9b59b6" strokeWidth="2" />
      <path d="M130 190 L165 260 L130 240 Z" fill="url(#finGradient)" stroke="#9b59b6" strokeWidth="2" />
      
      {/* Center fin */}
      <path d="M90 220 L90 280 L75 255 Z" fill="#9b59b6" />
      
      {/* Body stripe */}
      <rect x="50" y="140" width="80" height="12" fill="#9b59b6" opacity="0.8" />
      
      {/* Speed lines */}
      <g opacity={0.5 * intensity}>
        <line x1="20" y1="100" x2="20" y2="140" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <line x1="160" y1="120" x2="160" y2="160" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="180" x2="30" y2="210" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <line x1="150" y1="200" x2="150" y2="230" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5f2" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#6c3483" />
        </linearGradient>
        
        <linearGradient id="noseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#9b59b6" />
        </linearGradient>
        
        <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#9b59b6" />
        </linearGradient>
        
        <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#6c3483" />
        </linearGradient>
        
        <radialGradient id="flameGradient1" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="40%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <radialGradient id="flameGradient2" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="60%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <radialGradient id="flameGradient3" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#e74c3c" />
          <stop offset="100%" stopColor="#9b59b6" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal1 = spring({fps, frame: frame - 10, config: {damping: 150, stiffness: 100}});
  const textReveal2 = spring({fps, frame: frame - 30, config: {damping: 150, stiffness: 100}});
  const rocketReveal = spring({fps, frame: frame - 45, config: {damping: 80, stiffness: 60}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 25, [0, 12, 25], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 15, [0, 7, 15], [0.6, 1, 0.6]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a1e 50%, #2d0f3d 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense fire glow background */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 107, 53, ${0.25 * whiteGlow}), rgba(155, 89, 182, ${0.2 * whiteGlow}), rgba(255, 255, 255, ${0.05 * whiteGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* White light rays */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 500,
          background: `linear-gradient(180deg, transparent, rgba(255,107,53,${0.3 * brightPulse}), rgba(155,89,182,${0.25 * brightPulse}), rgba(255,255,255,${0.15 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.25 + i * 0.1) + i * 36}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating sparks */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3 + (i % 3),
          height: 3 + (i % 3),
          borderRadius: '50%',
          background: i % 3 === 0 ? '#ff6b35' : '#fff',
          left: `${5 + i * 6}%`,
          top: `${60 + (i % 4) * 12}%`,
          opacity: brightPulse * (0.4 + Math.random() * 0.4),
          boxShadow: i % 3 === 0 ? '0 0 15px rgba(255,107,53,0.9)' : '0 0 15px rgba(255,255,255,0.9)',
          transform: `translateY(${-frame * (2 + i * 0.5) % 200}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -80,
      }}>
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal1,
          transform: `translateY(${interpolate(textReveal1, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.6 * whiteGlow}), 0 0 100px rgba(155,89,182,${0.4 * brightPulse})`,
        }}>
          Don't think.
        </div>
        
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#ff6b35',
          textAlign: 'center',
          marginTop: 10,
          opacity: textReveal2,
          transform: `translateY(${interpolate(textReveal2, [0, 1], [40, 0])}px) scale(${interpolate(textReveal2, [0, 0.5, 1], [0.9, 1.1, 1])})`,
          textShadow: `0 0 60px rgba(255, 107, 53, ${0.9 * brightPulse}), 0 0 120px rgba(155,89,182,${0.5 * whiteGlow})`,
        }}>
          Just launch.
        </div>
      </div>
      
      {/* Launching rocket */}
      <div style={{
        marginTop: 30,
        opacity: rocketReveal,
        transform: `translateY(${interpolate(rocketReveal, [0, 1], [100, 0])}px)`,
        zIndex: 10,
      }}>
        <LaunchRocketSVG scale={1.1} intensity={brightPulse} frame={frame} />
      </div>
      
      {/* Bottom urgency text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 24,
        color: '#9b59b6',
        opacity: spring({fps, frame: frame - 80, config: {damping: 100}}),
        letterSpacing: '0.18em',
        fontWeight: 800,
        textShadow: `0 0 35px rgba(155,89,182,${0.9 * brightPulse})`,
      }}>
        IGNITE NOW
      </div>
    </AbsoluteFill>
  );
};
