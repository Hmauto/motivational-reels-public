import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 5: "Change your life in 5 seconds" with transformation glow

const TransformationGlow: React.FC<{intensity: number; frame: number}> = ({intensity, frame}) => {
  const pulseScale = interpolate(intensity, [0, 1], [0.8, 1.2]);
  const rotateSpeed = frame * 0.5;
  
  return (
    <svg 
      width={300} 
      height={300} 
      viewBox="0 0 300 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${50 * pulseScale}px rgba(155, 89, 182, ${0.9 * intensity})) 
                 drop-shadow(0 0 ${100 * pulseScale}px rgba(255, 255, 255, ${0.6 * intensity}))`,
      }}
    >
      {/* Outer rotating ring */}
      <g transform={`rotate(${rotateSpeed}, 150, 150)`}>
        <circle cx="150" cy="150" r="130" stroke="url(#glowGradient1)" strokeWidth="2" fill="none" opacity={0.6 * intensity} />
        {[...Array(12)].map((_, i) => (
          <line 
            key={i}
            x1={150 + 130 * Math.cos((i * 30 * Math.PI) / 180)}
            y1={150 + 130 * Math.sin((i * 30 * Math.PI) / 180)}
            x2={150 + 145 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={150 + 145 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.8 * intensity}
          />
        ))}
      </g>
      
      {/* Middle rotating ring (opposite direction) */}
      <g transform={`rotate(${-rotateSpeed * 0.7}, 150, 150)`}>
        <circle cx="150" cy="150" r="100" stroke="url(#glowGradient2)" strokeWidth="3" fill="none" opacity={0.7 * intensity} />
        {[...Array(8)].map((_, i) => (
          <circle 
            key={i}
            cx={150 + 100 * Math.cos((i * 45 * Math.PI) / 180)}
            cy={150 + 100 * Math.sin((i * 45 * Math.PI) / 180)}
            r="6"
            fill="#fff"
            opacity={0.9 * intensity}
          />
        ))}
      </g>
      
      {/* Inner glow */}
      <circle cx="150" cy="150" r="70" fill="url(#centerGlow)" opacity={0.8 * intensity} />
      
      {/* Central transformation symbol - butterfly/hourglass representing change */}
      <g transform="translate(150, 150)" opacity={intensity}>
        {/* Butterfly wings left */}
        <path 
          d="M-10 0 Q-40 -30 -50 -10 Q-55 10 -30 20 Q-50 40 -40 60 Q-20 50 -10 30"
          fill="url(#wingGradient)"
          stroke="#fff"
          strokeWidth="2"
        />
        {/* Butterfly wings right */}
        <path 
          d="M10 0 Q40 -30 50 -10 Q55 10 30 20 Q50 40 40 60 Q20 50 10 30"
          fill="url(#wingGradient)"
          stroke="#fff"
          strokeWidth="2"
        />
        {/* Body */}
        <ellipse cx="0" cy="15" rx="4" ry="25" fill="#fff" />
        {/* Antennae */}
        <path d="M-2 -10 Q-10 -25 -20 -30" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M2 -10 Q10 -25 20 -30" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      
      {/* Sparkles around */}
      {[...Array(6)].map((_, i) => (
        <g key={i} transform={`translate(${150 + 160 * Math.cos((i * 60 + frame) * Math.PI / 180)}, ${150 + 160 * Math.sin((i * 60 + frame) * Math.PI / 180)})`} opacity={0.7 * intensity}>
          <path d="M0 -8 L2 0 L0 8 L-2 0 Z" fill="#fff" />
          <path d="M-8 0 L0 2 L8 0 L0 -2 Z" fill="#fff" />
        </g>
      ))}
      
      {/* Gradients */}
      <defs>
        <linearGradient id="glowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#9b59b6" />
        </linearGradient>
        
        <linearGradient id="glowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="40%" stopColor="rgba(155,89,182,0.6)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d5f2" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#6c3483" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal1 = spring({fps, frame: frame - 10, config: {damping: 150, stiffness: 100}});
  const textReveal2 = spring({fps, frame: frame - 35, config: {damping: 150, stiffness: 100}});
  const glowReveal = spring({fps, frame: frame - 50, config: {damping: 80, stiffness: 60}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 30, [0, 15, 30], [0.4, 1, 0.4]);
  const brightPulse = interpolate(frame % 20, [0, 10, 20], [0.6, 1, 0.6]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a1e 50%, #2d0f3d 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense transformation glow background */}
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(155, 89, 182, ${0.4 * whiteGlow}), rgba(255, 255, 255, ${0.15 * whiteGlow}), rgba(155, 89, 182, ${0.1 * whiteGlow}), transparent 70%)`,
        filter: 'blur(80px)',
      }} />
      
      {/* White light rays */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 500,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.3 * brightPulse}), rgba(155,89,182,${0.25 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.2 + i * 0.05) + i * 30}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3 + (i % 4),
          height: 3 + (i % 4),
          borderRadius: '50%',
          background: '#fff',
          left: `${5 + i * 5}%`,
          top: `${5 + (i % 8) * 12}%`,
          opacity: brightPulse * (0.3 + Math.random() * 0.5),
          boxShadow: '0 0 15px rgba(255,255,255,0.9)',
          transform: `translateY(${Math.sin((frame + i * 20) * 0.08) * 35}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -60,
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal1,
          transform: `translateY(${interpolate(textReveal1, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.7 * whiteGlow}), 0 0 100px rgba(155,89,182,${0.5 * brightPulse})`,
        }}>
          Change your life
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#9b59b6',
          textAlign: 'center',
          marginTop: 10,
          opacity: textReveal2,
          transform: `translateY(${interpolate(textReveal2, [0, 1], [40, 0])}px) scale(${interpolate(textReveal2, [0, 0.5, 1], [0.9, 1.08, 1])})`,
          textShadow: `0 0 60px rgba(155, 89, 182, ${0.9 * brightPulse}), 0 0 120px rgba(255,255,255,${0.5 * whiteGlow})`,
        }}>
          in 5 seconds
        </div>
      </div>
      
      {/* Transformation glow illustration */}
      <div style={{
        marginTop: 40,
        opacity: glowReveal,
        transform: `scale(${interpolate(glowReveal, [0, 0.6, 1], [0.7, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <TransformationGlow intensity={brightPulse} frame={frame} />
      </div>
      
      {/* Final CTA text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 26,
        color: '#fff',
        opacity: spring({fps, frame: frame - 85, config: {damping: 100}}),
        letterSpacing: '0.2em',
        fontWeight: 900,
        textShadow: `0 0 40px rgba(155,89,182,${0.9 * brightPulse}), 0 0 80px rgba(255,255,255,${0.6 * whiteGlow})`,
      }}>
        START NOW
      </div>
    </AbsoluteFill>
  );
};
