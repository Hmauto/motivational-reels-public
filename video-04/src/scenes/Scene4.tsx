import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 4: "No excuses. Only results." - Gym equipment, muscle flex

const GymEquipmentSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulse = interpolate(intensity, [0, 1], [0.95, 1.05]);
  
  return (
    <svg 
      width={320 * scale} 
      height={280 * scale} 
      viewBox="0 0 320 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${30 * pulse}px rgba(255, 215, 0, ${0.5 * intensity}))`,
      }}
    >
      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="50%" stopColor="#666" />
          <stop offset="100%" stopColor="#444" />
        </linearGradient>
        
        <linearGradient id="weightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#2a2a3e" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
        
        <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#ffed4a" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      </defs>
      
      {/* Barbell bar */}
      <rect x="20" y="130" width="280" height="20" fill="url(#barGradient)" rx="3" />
      
      {/* Left weights - 45lb plates */}
      <g>
        <rect x="5" y="90" width="20" height="100" rx="3" fill="url(#weightGradient)" stroke="url(#goldRim)" strokeWidth="2" />
        <rect x="28" y="95" width="15" height="90" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
        <text x="15" y="148" fill="#ffd700" fontSize="14" fontWeight="bold" textAnchor="middle">45</text>
      </g>
      
      {/* Right weights - 45lb plates */}
      <g>
        <rect x="295" y="90" width="20" height="100" rx="3" fill="url(#weightGradient)" stroke="url(#goldRim)" strokeWidth="2" />
        <rect x="277" y="95" width="15" height="90" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
        <text x="305" y="148" fill="#ffd700" fontSize="14" fontWeight="bold" textAnchor="middle">45</text>
      </g>
      
      {/* Muscle flex arms behind bar */}
      <g fill="#0a0a0f" stroke="#ffd700" strokeWidth="2">
        {/* Left arm bicep */}
        <ellipse cx="80" cy="180" rx="35" ry="25" />
        <ellipse cx="80" cy="180" rx="25" ry="18" fill="none" stroke="#00d4ff" strokeWidth="1" opacity={0.5 * intensity} />
        
        {/* Right arm bicep */}
        <ellipse cx="240" cy="180" rx="35" ry="25" />
        <ellipse cx="240" cy="180" rx="25" ry="18" fill="none" stroke="#00d4ff" strokeWidth="1" opacity={0.5 * intensity} />
      </g>
      
      {/* Muscle definition lines */}
      <path d="M60 170 Q80 185 100 170" stroke="#ffd700" strokeWidth="2" fill="none" opacity={0.6 * intensity} />
      <path d="M220 170 Q240 185 260 170" stroke="#ffd700" strokeWidth="2" fill="none" opacity={0.6 * intensity} />
      
      {/* Dumbbells at bottom */}
      <g>
        <rect x="60" y="230" width="80" height="12" fill="url(#barGradient)" rx="2" />
        <rect x="50" y="215" width="18" height="42" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
        <rect x="132" y="215" width="18" height="42" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
      </g>
      
      <g>
        <rect x="180" y="230" width="80" height="12" fill="url(#barGradient)" rx="2" />
        <rect x="170" y="215" width="18" height="42" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
        <rect x="252" y="215" width="18" height="42" rx="3" fill="url(#weightGradient)" stroke="#ffd700" strokeWidth="1.5" />
      </g>
      
      {/* Sweat drops */}
      <circle cx="70" cy="200" r="4" fill="#00d4ff" opacity={0.7 * intensity} />
      <circle cx="250" cy="205" r="3" fill="#00d4ff" opacity={0.5 * intensity} />
      <circle cx="85" cy="215" r="2" fill="#00d4ff" opacity={0.4 * intensity} />
    </svg>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150}});
  const equipmentReveal = spring({fps, frame: frame - 25, config: {damping: 100, stiffness: 80}});
  
  // Gold/blue glow effects
  const goldGlow = interpolate(frame % 25, [0, 12, 25], [0.4, 1, 0.4]);
  const bluePulse = interpolate(frame % 20, [0, 10, 20], [0.6, 1, 0.6]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense gold glow background */}
      <div style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.25 * goldGlow}), rgba(0, 212, 255, ${0.1 * bluePulse}), transparent 70%)`,
        filter: 'blur(80px)',
        transform: `scale(${interpolate(frame % 30, [0, 15, 30], [1, 1.2, 1])})`,
      }} />
      
      {/* Fast rotating light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 700,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.3 * goldGlow}), rgba(0,212,255,${0.2 * bluePulse}), transparent)`,
          transform: `rotate(${frame * (0.35 + i * 0.05) + i * 22.5}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Explosive particles */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4 + (i % 4),
          height: 4 + (i % 4),
          borderRadius: '50%',
          background: i % 2 === 0 ? '#ffd700' : '#00d4ff',
          left: `${5 + i * 6}%`,
          top: `${5 + (i % 6) * 15}%`,
          opacity: (i % 2 === 0 ? goldGlow : bluePulse) * (0.5 + Math.random() * 0.3),
          boxShadow: `0 0 ${20 + i * 2}px ${i % 2 === 0 ? 'rgba(255,215,0,0.9)' : 'rgba(0,212,255,0.9)'}`,
          transform: `translateY(${Math.sin((frame + i * 20) * 0.12) * 40}px) scale(${interpolate((frame + i * 10) % 25, [0, 12, 25], [0.5, 1.5, 0.5])})`,
        }} />
      ))}
      
      {/* Main text - EPIC */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -60,
      }}>
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#e94560',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px) scale(${interpolate(textReveal, [0, 0.5, 1], [0.8, 1.1, 1])})`,
          textShadow: `0 0 60px rgba(233, 69, 96, ${0.9 * goldGlow}), 0 0 120px rgba(255,215,0,${0.4 * goldGlow})`,
          letterSpacing: '0.05em',
        }}>
          No excuses.
        </div>
        
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 16,
          opacity: spring({fps, frame: frame - 35, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px)`,
          textShadow: `0 0 70px rgba(255, 215, 0, ${0.9 * goldGlow}), 0 0 140px rgba(0,212,255,${0.3 * bluePulse})`,
        }}>
          Only results.
        </div>
      </div>
      
      {/* Gym Equipment Illustration */}
      <div style={{
        marginTop: 50,
        opacity: equipmentReveal,
        transform: `translateY(${interpolate(equipmentReveal, [0, 1], [50, 0])}px) scale(${interpolate(equipmentReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <GymEquipmentSVG scale={1.1} intensity={goldGlow} />
      </div>
      
      {/* Lightning effect */}
      <div style={{
        position: 'absolute',
        fontSize: 250,
        color: `rgba(255, 215, 0, ${0.1 * goldGlow})`,
        opacity: 0.2,
        filter: 'blur(5px)',
        transform: `rotate(-15deg) scale(${interpolate(frame % 20, [0, 10, 20], [0.9, 1.1, 0.9])})`,
      }}>
        ⚡
      </div>
    </AbsoluteFill>
  );
};
