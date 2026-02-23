import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 1: "5... 4... 3... 2... 1..." countdown with rocket launch visual

const RocketSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const flamePulse = interpolate(intensity, [0, 1], [0.8, 1.2]);
  
  return (
    <svg 
      width={200 * scale} 
      height={300 * scale} 
      viewBox="0 0 200 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${30 * flamePulse}px rgba(155, 89, 182, ${0.8 * intensity})) 
                 drop-shadow(0 0 ${60 * flamePulse}px rgba(255, 255, 255, ${0.5 * intensity}))`,
      }}
    >
      {/* Rocket flames */}
      <g transform="translate(100, 260)">
        <ellipse cx="0" cy="20" rx="25" ry="40" fill="url(#flameGradient1)" opacity={0.9 * intensity} />
        <ellipse cx="0" cy="25" rx="18" ry="35" fill="url(#flameGradient2)" opacity={0.8 * intensity} />
        <ellipse cx="0" cy="30" rx="12" ry="25" fill="#fff" opacity={0.9 * intensity} />
      </g>
      
      {/* Rocket body */}
      <path
        d="M100 20 
           Q140 60 140 160 
           L140 220 
           Q140 240 100 250 
           Q60 240 60 220 
           L60 160 
           Q60 60 100 20"
        fill="url(#rocketGradient)"
        stroke="#9b59b6"
        strokeWidth="3"
      />
      
      {/* Rocket nose tip */}
      <ellipse cx="100" cy="20" rx="40" ry="25" fill="url(#noseGradient)" />
      
      {/* Window/cockpit */}
      <circle cx="100" cy="100" r="25" fill="url(#windowGradient)" stroke="#9b59b6" strokeWidth="3" />
      <circle cx="100" cy="100" r="18" fill="#1a1a2e" />
      <circle cx="105" cy="95" r="5" fill="#fff" opacity="0.6" />
      
      {/* Side fins */}
      <path d="M60 180 L30 240 L60 220 Z" fill="url(#finGradient)" stroke="#9b59b6" strokeWidth="2" />
      <path d="M140 180 L170 240 L140 220 Z" fill="url(#finGradient)" stroke="#9b59b6" strokeWidth="2" />
      
      {/* Center fin */}
      <path d="M100 200 L100 260 L85 240 Z" fill="#9b59b6" />
      
      {/* Body stripe */}
      <rect x="60" y="140" width="80" height="10" fill="#9b59b6" opacity="0.8" />
      
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
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <radialGradient id="flameGradient2" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#f39c12" />
          <stop offset="100%" stopColor="#9b59b6" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Countdown logic: 5... 4... 3... 2... 1... over 120 frames
  const countdownNumber = Math.max(1, 6 - Math.floor(frame / 20));
  const countdownProgress = (frame % 20) / 20;
  
  const numberSpring = spring({fps, frame: frame % 20, config: {damping: 100, stiffness: 150}});
  const rocketSpring = spring({fps, frame: frame - 40, config: {damping: 80, stiffness: 60}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 30, [0, 15, 30], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 20, [0, 10, 20], [0.5, 1, 0.5]);
  
  // Rocket shake effect during countdown
  const shakeX = Math.sin(frame * 0.5) * (countdownNumber <= 2 ? 3 : 1);
  const shakeY = Math.cos(frame * 0.7) * (countdownNumber <= 2 ? 3 : 1);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a1e 50%, #2d0f3d 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Purple glow background */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(155, 89, 182, ${0.3 * whiteGlow}), rgba(255, 255, 255, ${0.1 * whiteGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* White light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 400,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.25 * brightPulse}), rgba(155,89,182,${0.2 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.2 + i * 0.08) + i * 45}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#fff',
          left: `${5 + i * 8}%`,
          top: `${8 + (i % 6) * 15}%`,
          opacity: brightPulse * (0.3 + Math.random() * 0.4),
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          transform: `translateY(${Math.sin((frame + i * 30) * 0.08) * 25}px)`,
        }} />
      ))}
      
      {/* Countdown number */}
      <div style={{
        fontSize: 140,
        fontWeight: 900,
        color: '#fff',
        textAlign: 'center',
        zIndex: 10,
        opacity: numberSpring,
        transform: `scale(${interpolate(numberSpring, [0, 0.5, 1], [0.5, 1.2, 1])}) translateY(${interpolate(numberSpring, [0, 1], [-30, 0])}px)`,
        textShadow: `0 0 60px rgba(155, 89, 182, ${0.9 * whiteGlow}), 0 0 120px rgba(255,255,255,${0.5 * brightPulse})`,
      }}>
        {countdownNumber}
      </div>
      
      {/* Dots after number */}
      <div style={{
        fontSize: 60,
        fontWeight: 700,
        color: '#9b59b6',
        marginTop: -20,
        opacity: numberSpring * 0.8,
        letterSpacing: '0.3em',
        textShadow: `0 0 30px rgba(155, 89, 182, ${0.8 * brightPulse})`,
      }}>
        ...
      </div>
      
      {/* Rocket */}
      <div style={{
        marginTop: 30,
        opacity: rocketSpring,
        transform: `translateY(${interpolate(rocketSpring, [0, 1], [80, 0])}px) translateX(${shakeX}px) translateY(${shakeY}px)`,
        zIndex: 10,
      }}>
        <RocketSVG scale={1} intensity={brightPulse} />
      </div>
      
      {/* Launch text at end */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        fontSize: 28,
        color: '#fff',
        opacity: spring({fps, frame: frame - 90, config: {damping: 100}}),
        letterSpacing: '0.2em',
        fontWeight: 800,
        textShadow: `0 0 40px rgba(155,89,182,${0.9 * brightPulse}), 0 0 80px rgba(255,255,255,${0.5 * whiteGlow})`,
      }}>
        GET READY
      </div>
    </AbsoluteFill>
  );
};
