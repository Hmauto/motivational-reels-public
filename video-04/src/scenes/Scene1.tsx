import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 1: "4 AM. The world sleeps." - Alarm clock, dark theme, gold/blue colors

const AlarmClockSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulse = interpolate(intensity, [0, 1], [0.95, 1.05]);
  
  return (
    <svg 
      width={280 * scale} 
      height={280 * scale} 
      viewBox="0 0 280 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${30 * pulse}px rgba(255, 215, 0, ${0.6 * intensity})) 
                 drop-shadow(0 0 ${60 * pulse}px rgba(0, 212, 255, ${0.4 * intensity}))`,
      }}
    >
      {/* Outer ring glow */}
      <circle cx="140" cy="140" r="130" fill="url(#outerGlow)" opacity={0.3 * intensity} />
      
      {/* Clock body */}
      <circle cx="140" cy="140" r="120" fill="url(#clockGradient)" stroke="#ffd700" strokeWidth="4" />
      
      {/* Inner ring */}
      <circle cx="140" cy="140" r="110" fill="#0a0a0f" stroke="#00d4ff" strokeWidth="2" />
      
      {/* Clock face ticks */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1={140 + 95 * Math.cos((i * 30 - 90) * Math.PI / 180)}
          y1={140 + 95 * Math.sin((i * 30 - 90) * Math.PI / 180)}
          x2={140 + 85 * Math.cos((i * 30 - 90) * Math.PI / 180)}
          y2={140 + 85 * Math.sin((i * 30 - 90) * Math.PI / 180)}
          stroke="#ffd700"
          strokeWidth={i % 3 === 0 ? 4 : 2}
          strokeLinecap="round"
        />
      ))}
      
      {/* Hour hand - pointing to 4 */}
      <line
        x1="140"
        y1="140"
        x2={140 + 60 * Math.cos(120 * Math.PI / 180)}
        y2={140 + 60 * Math.sin(120 * Math.PI / 180)}
        stroke="#ffd700"
        strokeWidth="8"
        strokeLinecap="round"
      />
      
      {/* Minute hand - pointing to 12 */}
      <line
        x1="140"
        y1="140"
        x2="140"
        y2="85"
        stroke="#00d4ff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle cx="140" cy="140" r="12" fill="#ffd700" />
      <circle cx="140" cy="140" r="6" fill="#00d4ff" />
      
      {/* Alarm bells */}
      <ellipse cx="60" cy="60" rx="35" ry="25" fill="url(#bellGradient)" transform="rotate(-45 60 60)" />
      <ellipse cx="220" cy="60" rx="35" ry="25" fill="url(#bellGradient)" transform="rotate(45 220 60)" />
      
      {/* Bell highlights */}
      <ellipse cx="55" cy="55" rx="15" ry="8" fill="url(#bellHighlight)" transform="rotate(-45 55 55)" opacity={0.6 * intensity} />
      <ellipse cx="225" cy="55" rx="15" ry="8" fill="url(#bellHighlight)" transform="rotate(45 225 55)" opacity={0.6 * intensity} />
      
      {/* Legs */}
      <path d="M70 220 L50 250" stroke="#ffd700" strokeWidth="6" strokeLinecap="round" />
      <path d="M210 220 L230 250" stroke="#ffd700" strokeWidth="6" strokeLinecap="round" />
      
      {/* "4 AM" text on clock */}
      <text x="140" y="180" textAnchor="middle" fill="#00d4ff" fontSize="24" fontWeight="bold" fontFamily="Arial">4 AM</text>
      
      <defs>
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 215, 0, 0.5)" />
          <stop offset="50%" stopColor="rgba(0, 212, 255, 0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#0a0a0f" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
        
        <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#ffed4a" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        
        <radialGradient id="bellHighlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150, stiffness: 100}});
  const clockReveal = spring({fps, frame: frame - 20, config: {damping: 100, stiffness: 80}});
  
  // Gold/blue glow effects
  const goldGlow = interpolate(frame % 35, [0, 17, 35], [0.3, 1, 0.3]);
  const bluePulse = interpolate(frame % 25, [0, 12, 25], [0.5, 1, 0.5]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Dark night background with subtle glow */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(0, 212, 255, ${0.1 * bluePulse}), rgba(255, 215, 0, ${0.05 * goldGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* Rotating light rays - gold and blue */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 500,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.2 * goldGlow}), rgba(0,212,255,${0.15 * bluePulse}), transparent)`,
          transform: `rotate(${frame * (0.2 + i * 0.08) + i * 30}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating particles - gold and blue */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: i % 2 === 0 ? '#ffd700' : '#00d4ff',
          left: `${8 + i * 9}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: (i % 2 === 0 ? goldGlow : bluePulse) * (0.4 + Math.random() * 0.3),
          boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(255,215,0,0.9)' : 'rgba(0,212,255,0.9)'}`,
          transform: `translateY(${Math.sin((frame + i * 25) * 0.08) * 25}px)`,
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
          fontSize: 72,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 50px rgba(255,215,0,${0.7 * goldGlow}), 0 0 100px rgba(0,212,255,${0.3 * bluePulse})`,
        }}>
          4 AM.
        </div>
        
        <div style={{
          fontSize: 42,
          fontWeight: 700,
          color: '#00d4ff',
          textAlign: 'center',
          marginTop: 16,
          opacity: spring({fps, frame: frame - 30, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 30, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(0, 212, 255, ${0.8 * bluePulse})`,
        }}>
          The world sleeps.
        </div>
      </div>
      
      {/* Alarm Clock Illustration */}
      <div style={{
        marginTop: 50,
        opacity: clockReveal,
        transform: `translateY(${interpolate(clockReveal, [0, 1], [60, 0])}px) scale(${interpolate(clockReveal, [0, 0.6, 1], [0.8, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <AlarmClockSVG scale={1.2} intensity={goldGlow} />
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 20,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        letterSpacing: '0.2em',
        fontWeight: 800,
        textShadow: `0 0 25px rgba(255,215,0,${0.8 * goldGlow})`,
      }}>
        TIME TO RISE
      </div>
    </AbsoluteFill>
  );
};
