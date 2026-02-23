import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 2: "Champions rise before the sun." - Sunrise, silhouette lifting weights

const WeightlifterSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulse = interpolate(intensity, [0, 1], [0.95, 1.05]);
  
  return (
    <svg 
      width={300 * scale} 
      height={350 * scale} 
      viewBox="0 0 300 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${40 * pulse}px rgba(255, 215, 0, ${0.5 * intensity}))`,
      }}
    >
      {/* Sunrise gradient background behind silhouette */}
      <defs>
        <linearGradient id="sunriseGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="40%" stopColor="#ffd700" />
          <stop offset="70%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0a0a0f" />
        </linearGradient>
        
        <linearGradient id="barbellGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#ffed4a" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      </defs>
      
      {/* Sun arc */}
      <path
        d="M50 280 Q150 180 250 280"
        stroke="url(#sunriseGradient)"
        strokeWidth="40"
        fill="none"
        opacity={0.6 * intensity}
        strokeLinecap="round"
      />
      
      {/* Weightlifter silhouette */}
      <g fill="#0a0a0f">
        {/* Left leg */}
        <path d="M110 280 L100 340 L125 340 L130 280 Z" />
        {/* Right leg */}
        <path d="M170 280 L175 340 L200 340 L190 280 Z" />
        {/* Torso */}
        <path d="M115 280 L110 180 L190 180 L185 280 Z" />
        {/* Chest/shoulders */}
        <ellipse cx="150" cy="170" rx="55" ry="25" />
        {/* Head */}
        <circle cx="150" cy="130" r="25" />
        {/* Left arm */}
        <path d="M105 175 L70 150 L60 160 L95 190 Z" />
        {/* Right arm */}
        <path d="M195 175 L230 150 L240 160 L205 190 Z" />
      </g>
      
      {/* Barbell */}
      <rect x="20" y="145" width="260" height="12" fill="url(#barbellGradient)" rx="2" />
      
      {/* Left weights */}
      <rect x="10" y="125" width="15" height="52" fill="#ffd700" rx="2" />
      <rect x="28" y="130" width="12" height="42" fill="#ffd700" rx="2" />
      
      {/* Right weights */}
      <rect x="275" y="125" width="15" height="52" fill="#ffd700" rx="2" />
      <rect x="260" y="130" width="12" height="42" fill="#ffd700" rx="2" />
      
      {/* Muscle definition highlights */}
      <path d="M125 200 Q150 210 175 200" stroke="#ffd700" strokeWidth="2" fill="none" opacity={0.5 * intensity} />
      <path d="M120 240 Q150 250 180 240" stroke="#ffd700" strokeWidth="2" fill="none" opacity={0.5 * intensity} />
      
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1={150 + 80 * Math.cos((i * 45 - 90) * Math.PI / 180)}
          y1={280 + 80 * Math.sin((i * 45 - 90) * Math.PI / 180)}
          x2={150 + 120 * Math.cos((i * 45 - 90) * Math.PI / 180)}
          y2={280 + 120 * Math.sin((i * 45 - 90) * Math.PI / 180)}
          stroke="#ffd700"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.4 * intensity}
        />
      ))}
    </svg>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150}});
  const lifterReveal = spring({fps, frame: frame - 25, config: {damping: 100, stiffness: 80}});
  
  // Gold/blue glow effects
  const goldGlow = interpolate(frame % 30, [0, 15, 30], [0.3, 1, 0.3]);
  const bluePulse = interpolate(frame % 20, [0, 10, 20], [0.5, 1, 0.5]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 40%, #1a1510 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Sunrise glow background */}
      <div style={{
        position: 'absolute',
        width: 800,
        height: 600,
        bottom: 0,
        background: `radial-gradient(ellipse at center bottom, rgba(255, 107, 53, ${0.25 * goldGlow}), rgba(255, 215, 0, ${0.15 * goldGlow}), transparent 70%)`,
        filter: 'blur(40px)',
      }} />
      
      {/* Rotating light rays - sunrise colors */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 600,
          bottom: 0,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.25 * goldGlow}), rgba(255,107,53,${0.15 * goldGlow}), transparent)`,
          transform: `rotate(${frame * (0.15 + i * 0.05) + i * 22.5}deg)`,
          transformOrigin: 'bottom center',
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: i % 3 === 0 ? '#ffd700' : (i % 3 === 1 ? '#ff6b35' : '#00d4ff'),
          left: `${5 + i * 8}%`,
          top: `${10 + (i % 6) * 15}%`,
          opacity: goldGlow * 0.5,
          boxShadow: `0 0 20px rgba(255,215,0,0.8)`,
          transform: `translateY(${Math.sin((frame + i * 30) * 0.08) * 30}px)`,
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
          fontWeight: 800,
          color: '#ffd700',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 50px rgba(255,215,0,${0.8 * goldGlow}), 0 0 100px rgba(255,107,53,${0.4 * goldGlow})`,
        }}>
          Champions rise
        </div>
        
        <div style={{
          fontSize: 42,
          fontWeight: 700,
          color: '#00d4ff',
          textAlign: 'center',
          marginTop: 12,
          opacity: spring({fps, frame: frame - 30, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 30, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(0, 212, 255, ${0.7 * bluePulse})`,
        }}>
          before the sun.
        </div>
      </div>
      
      {/* Weightlifter Illustration */}
      <div style={{
        marginTop: 50,
        opacity: lifterReveal,
        transform: `translateY(${interpolate(lifterReveal, [0, 1], [50, 0])}px) scale(${interpolate(lifterReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <WeightlifterSVG scale={1.3} intensity={goldGlow} />
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 20,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 800,
        textShadow: `0 0 25px rgba(255,215,0,${0.8 * goldGlow})`,
      }}>
        BE THE CHAMPION
      </div>
    </AbsoluteFill>
  );
};
