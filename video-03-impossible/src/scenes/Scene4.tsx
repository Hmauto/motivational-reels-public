import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 4: "Suffer now, live as champion forever" with trophy/gold

const TrophySVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  return (
    <svg 
      width={280 * scale} 
      height={350 * scale} 
      viewBox="0 0 280 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${40 * intensity}px rgba(255, 215, 0, ${0.7 * intensity})) 
                 drop-shadow(0 0 ${80 * intensity}px rgba(255, 215, 0, ${0.4 * intensity}))`,
      }}
    >
      {/* Trophy cup body */}
      <path 
        d="M40 40 Q40 120 90 150 L90 170 L190 170 L190 150 Q240 120 240 40 L40 40" 
        fill="url(#trophyGradient)" 
      />
      
      {/* Trophy cup inner */}
      <ellipse cx="140" cy="40" rx="100" ry="15" fill="url(#trophyInnerGradient)" />
      
      {/* Trophy handles */}
      <path 
        d="M40 50 Q10 50 10 90 Q10 130 40 130" 
        stroke="url(#trophyGradient)" 
        strokeWidth="15" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M240 50 Q270 50 270 90 Q270 130 240 130" 
        stroke="url(#trophyGradient)" 
        strokeWidth="15" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Trophy stem */}
      <rect x="120" y="170" width="40" height="60" fill="url(#trophyGradient)" />
      
      {/* Decorative ring on stem */}
      <rect x="115" y="190" width="50" height="10" rx="2" fill="#d4ac0d" />
      
      {/* Trophy base */}
      <path d="M90 230 L190 230 L180 260 L100 260 Z" fill="url(#baseGradient)" />
      <rect x="80" y="260" width="120" height="25" rx="3" fill="url(#trophyGradient)" />
      <rect x="70" y="285" width="140" height="20" rx="3" fill="url(#baseGradient)" />
      
      {/* Gold shine/highlight on cup */}
      <ellipse cx="100" cy="80" rx="20" ry="40" fill="url(#shineGradient)" opacity={0.6 * intensity} />
      
      {/* Sparkles around trophy */}
      <g opacity={intensity}>
        <path d="M50 30 L55 40 L65 42 L55 45 L50 55 L45 45 L35 42 L45 40 Z" fill="#ffd700" />
        <path d="M230 60 L233 67 L240 69 L233 71 L230 78 L227 71 L220 69 L227 67 Z" fill="#ffd700" />
        <path d="M30 140 L33 147 L40 149 L33 151 L30 158 L27 151 L20 149 L27 147 Z" fill="#ffd700" />
        <path d="M250 120 L253 127 L260 129 L253 131 L250 138 L247 131 L240 129 L247 127 Z" fill="#ffd700" />
      </g>
      
      {/* Champion star on base */}
      <path 
        d="M140 270 L145 282 L158 282 L148 290 L152 302 L140 295 L128 302 L132 290 L122 282 L135 282 Z" 
        fill="#e74c3c"
      />
      
      {/* Rays behind trophy */}
      <g opacity={0.3 * intensity}>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M140 175 L${140 + 120 * Math.cos((i * 30 * Math.PI) / 180)} ${175 + 120 * Math.sin((i * 30 * Math.PI) / 180)}`}
            stroke="#ffd700"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </g>
      
      <defs>
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="30%" stopColor="#f1c40f" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="70%" stopColor="#d4ac0d" />
          <stop offset="100%" stopColor="#b7950b" />
        </linearGradient>
        
        <linearGradient id="trophyInnerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b7950b" />
          <stop offset="100%" stopColor="#7d6608" />
        </linearGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4ac0d" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#d4ac0d" />
        </linearGradient>
        
        <radialGradient id="shineGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150, stiffness: 100}});
  const trophyReveal = spring({fps, frame: frame - 40, config: {damping: 80, stiffness: 100}});
  
  // Gold glow effects
  const goldGlow = interpolate(frame % 35, [0, 17, 35], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 25, [0, 12, 25], [0.5, 1, 0.5]);
  
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
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.2 * goldGlow}), rgba(231, 76, 60, ${0.08 * goldGlow}), transparent 70%)`,
        filter: 'blur(100px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 700,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.25 * brightPulse}), rgba(231,76,60,${0.15 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.22 + i * 0.06) + i * 36}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating gold particles */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#ffd700',
          left: `${5 + i * 6.5}%`,
          top: `${5 + (i % 7) * 14}%`,
          opacity: brightPulse * (0.5 + Math.random() * 0.4),
          boxShadow: '0 0 20px rgba(255,215,0,0.9)',
          transform: `translateY(${Math.sin((frame + i * 20) * 0.1) * 45}px)`,
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
          fontSize: 42,
          fontWeight: 900,
          color: '#e74c3c',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 40px rgba(231,76,60,${0.6 * goldGlow}), 0 0 80px rgba(255,215,0,${0.3 * brightPulse})`,
        }}>
          I don't count my sit-ups.
        </div>
        
        <div style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          marginTop: 16,
          opacity: spring({fps, frame: frame - 25, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 25, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.5 * brightPulse})`,
        }}>
          I only start counting
        </div>
        
        <div style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 12,
          opacity: spring({fps, frame: frame - 40, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 40, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 50px rgba(255,215,0,${0.7 * brightPulse})`,
        }}>
          when it starts hurting
        </div>
      </div>
      
      {/* Trophy */}
      <div style={{
        marginTop: 50,
        opacity: trophyReveal,
        transform: `translateY(${interpolate(trophyReveal, [0, 1], [80, 0])}px) scale(${interpolate(trophyReveal, [0, 0.6, 1], [0.7, 1.08, 1])})`,
        zIndex: 10,
      }}>
        <TrophySVG scale={1.1} intensity={brightPulse} />
      </div>
      
      {/* Bottom quote */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 22,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        letterSpacing: '0.1em',
        fontWeight: 800,
        textShadow: `0 0 30px rgba(255,215,0,${0.8 * brightPulse})`,
        textAlign: 'center',
      }}>
        SUFFER NOW<br />
        <span style={{fontSize: 16, color: '#fff'}}>LIVE AS A CHAMPION FOREVER</span>
      </div>
    </AbsoluteFill>
  );
};
