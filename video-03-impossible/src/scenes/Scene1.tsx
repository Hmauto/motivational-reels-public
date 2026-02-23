import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 1: "Impossible is just a word" with boxing glove breaking through text

const BoxingGloveSVG: React.FC<{scale?: number; intensity?: number; breakthrough?: number}> = ({scale = 1, intensity = 0.5, breakthrough = 0}) => {
  return (
    <svg 
      width={280 * scale} 
      height={320 * scale} 
      viewBox="0 0 280 320" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${30 * intensity}px rgba(255, 215, 0, ${0.6 * intensity})) 
                 drop-shadow(0 0 ${60 * intensity}px rgba(231, 76, 60, ${0.4 * intensity}))`,
        transform: `translateY(${-50 * breakthrough}px) rotate(${-10 * breakthrough}deg)`,
      }}
    >
      {/* Glove main body */}
      <ellipse cx="140" cy="180" rx="90" ry="110" fill="url(#gloveGradient)" />
      
      {/* Glove thumb */}
      <ellipse cx="70" cy="140" rx="35" ry="50" fill="url(#gloveGradient)" transform="rotate(-20 70 140)" />
      
      {/* Glove wrist/cuff */}
      <rect x="80" y="260" width="120" height="50" rx="10" fill="url(#cuffGradient)" />
      
      {/* Laces on glove */}
      <path d="M100 280 L180 280" stroke="#c0392b" strokeWidth="3" />
      <path d="M105 290 L175 290" stroke="#c0392b" strokeWidth="3" />
      <path d="M110 300 L170 300" stroke="#c0392b" strokeWidth="3" />
      
      {/* Highlight/shine on glove */}
      <ellipse cx="160" cy="150" rx="25" ry="35" fill="url(#highlightGradient)" opacity={0.6 * intensity} />
      
      {/* Impact burst behind glove */}
      <g opacity={breakthrough}>
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d={`M140 180 L${140 + 100 * Math.cos((i * 45 * Math.PI) / 180)} ${180 + 100 * Math.sin((i * 45 * Math.PI) / 180)}`}
            stroke="#ffd700"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.8}
          />
        ))}
      </g>
      
      {/* Cracks around impact */}
      <g opacity={breakthrough * 0.7}>
        <path d="M50 100 L70 120" stroke="#fff" strokeWidth="3" />
        <path d="M220 90 L200 115" stroke="#fff" strokeWidth="3" />
        <path d="M240 180 L215 190" stroke="#fff" strokeWidth="3" />
        <path d="M30 200 L55 210" stroke="#fff" strokeWidth="3" />
      </g>
      
      <defs>
        <linearGradient id="gloveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e74c3c" />
          <stop offset="50%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#922b21" />
        </linearGradient>
        
        <linearGradient id="cuffGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#f1c40f" />
          <stop offset="100%" stopColor="#d4ac0d" />
        </linearGradient>
        
        <radialGradient id="highlightGradient" cx="50%" cy="50%" r="50%">
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
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150, stiffness: 100}});
  const gloveReveal = spring({fps, frame: frame - 40, config: {damping: 80, stiffness: 120}});
  const breakthrough = spring({fps, frame: frame - 50, config: {damping: 60, stiffness: 200}});
  
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
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.15 * goldGlow}), rgba(231, 76, 60, ${0.08 * goldGlow}), transparent 70%)`,
        filter: 'blur(80px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 600,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.25 * brightPulse}), rgba(231,76,60,${0.15 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.2 + i * 0.08) + i * 45}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating gold particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#ffd700',
          left: `${5 + i * 8}%`,
          top: `${8 + (i % 6) * 15}%`,
          opacity: brightPulse * (0.5 + Math.random() * 0.4),
          boxShadow: '0 0 20px rgba(255,215,0,0.9)',
          transform: `translateY(${Math.sin((frame + i * 30) * 0.08) * 40}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -150,
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 40px rgba(255,215,0,${0.6 * goldGlow}), 0 0 80px rgba(231,76,60,${0.4 * brightPulse})`,
        }}>
          IMPOSSIBLE
        </div>
        
        <div style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 12,
          opacity: spring({fps, frame: frame - 20, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 20, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px)`,
          textShadow: `0 0 50px rgba(255, 215, 0, ${0.8 * brightPulse})`,
        }}>
          is just a word
        </div>
        
        <div style={{
          fontSize: 28,
          fontWeight: 600,
          color: '#e74c3c',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 35, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 30px rgba(231, 76, 60, ${0.6 * brightPulse})`,
        }}>
          thrown around by small minds
        </div>
      </div>
      
      {/* Boxing Glove */}
      <div style={{
        marginTop: 60,
        opacity: gloveReveal,
        transform: `translateY(${interpolate(gloveReveal, [0, 1], [80, 0])}px) scale(${interpolate(gloveReveal, [0, 0.6, 1], [0.7, 1.1, 1])})`,
        zIndex: 10,
      }}>
        <BoxingGloveSVG scale={1.2} intensity={brightPulse} breakthrough={breakthrough} />
      </div>
      
      {/* Bottom quote attribution */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 20,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        letterSpacing: '0.12em',
        fontWeight: 700,
        textShadow: `0 0 25px rgba(255,215,0,${0.8 * brightPulse})`,
      }}>
        — MUHAMMAD ALI
      </div>
    </AbsoluteFill>
  );
};
