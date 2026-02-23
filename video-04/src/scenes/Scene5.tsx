import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 5: "Be the hardest worker." - Trophy, gold glow

const TrophySVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulse = interpolate(intensity, [0, 1], [0.95, 1.08]);
  
  return (
    <svg 
      width={280 * scale} 
      height={320 * scale} 
      viewBox="0 0 280 320" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${50 * pulse}px rgba(255, 215, 0, ${0.8 * intensity})) 
                 drop-shadow(0 0 ${100 * pulse}px rgba(255, 215, 0, ${0.4 * intensity}))`,
      }}
    >
      <defs>
        <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="30%" stopColor="#ffed4a" />
          <stop offset="50%" stopColor="#fff5a0" />
          <stop offset="70%" stopColor="#ffed4a" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
        
        <linearGradient id="trophyDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="50%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        
        <radialGradient id="trophyGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="50%" stopColor="rgba(255,215,0,0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      
      {/* Trophy base */}
      <rect x="100" y="280" width="80" height="25" rx="3" fill="url(#trophyDark)" />
      <rect x="90" y="260" width="100" height="20" rx="3" fill="url(#trophyGold)" />
      
      {/* Trophy stem */}
      <path d="M125 260 L125 200 L155 200 L155 260 Z" fill="url(#trophyGold)" />
      <path d="M130 260 L130 200 L150 200 L150 260 Z" fill="url(#trophyDark)" opacity="0.3" />
      
      {/* Trophy cup bottom */}
      <path d="M80 200 Q140 230 200 200 L190 180 Q140 200 90 180 Z" fill="url(#trophyGold)" />
      
      {/* Trophy cup body */}
      <path d="M60 80 Q60 180 140 180 Q220 180 220 80 L200 80 Q200 160 140 160 Q80 160 80 80 Z" fill="url(#trophyGold)" />
      
      {/* Trophy cup rim */}
      <ellipse cx="140" cy="80" rx="80" ry="15" fill="url(#trophyGold)" stroke="#b8860b" strokeWidth="2" />
      <ellipse cx="140" cy="80" rx="70" ry="10" fill="#0a0a0f" />
      
      {/* Left handle */}
      <path d="M60 90 Q30 90 30 120 Q30 150 65 150" stroke="url(#trophyGold)" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M60 90 Q35 90 35 120 Q35 145 62 145" stroke="url(#trophyDark)" strokeWidth="6" fill="none" strokeLinecap="round" />
      
      {/* Right handle */}
      <path d="M220 90 Q250 90 250 120 Q250 150 215 150" stroke="url(#trophyGold)" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M220 90 Q245 90 245 120 Q245 145 218 145" stroke="url(#trophyDark)" strokeWidth="6" fill="none" strokeLinecap="round" />
      
      {/* Trophy highlight */}
      <ellipse cx="110" cy="100" rx="20" ry="40" fill="url(#trophyGlow)" opacity={0.6 * intensity} transform="rotate(-20 110 100)" />
      
      {/* Star on trophy */}
      <polygon points="140,110 145,125 160,125 148,135 153,150 140,140 127,150 132,135 120,125 135,125" fill="#fff" opacity={0.9 * intensity} />
      
      {/* Base plaque text */}
      <rect x="105" y="265" width="70" height="12" rx="2" fill="#0a0a0f" />
      <text x="140" y="274" fill="#ffd700" fontSize="8" fontWeight="bold" textAnchor="middle">CHAMPION</text>
    </svg>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150}});
  const trophyReveal = spring({fps, frame: frame - 30, config: {damping: 100, stiffness: 80}});
  
  // Gold glow effects
  const goldGlow = interpolate(frame % 30, [0, 15, 30], [0.5, 1, 0.5]);
  const brightPulse = interpolate(frame % 25, [0, 12, 25], [0.7, 1, 0.7]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #1a1510 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Intense golden glow background */}
      <div style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.35 * brightPulse}), rgba(255, 107, 53, ${0.15 * goldGlow}), transparent 70%)`,
        filter: 'blur(80px)',
        transform: `scale(${interpolate(frame % 35, [0, 17, 35], [1, 1.2, 1])})`,
      }} />
      
      {/* Rotating golden light rays */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 800,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.35 * brightPulse}), rgba(255,255,255,${0.2 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.4 + i * 0.04) + i * 15}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating golden particles */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5 + (i % 4),
          height: 5 + (i % 4),
          borderRadius: '50%',
          background: i % 3 === 0 ? '#fff' : '#ffd700',
          left: `${5 + i * 6}%`,
          top: `${5 + (i % 7) * 13}%`,
          opacity: brightPulse * (0.6 + (i % 4) * 0.1),
          boxShadow: `0 0 ${25 + i * 3}px rgba(255,215,0,${0.9 * brightPulse})`,
          transform: `translateY(${Math.sin((frame + i * 25) * 0.1) * 40}px) scale(${interpolate((frame + i * 12) % 30, [0, 15, 30], [0.6, 1.5, 0.6])})`,
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
          fontSize: 48,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px) scale(${interpolate(textReveal, [0, 0.5, 1], [0.85, 1.08, 1])})`,
          textShadow: `0 0 50px rgba(255,255,255,${0.6 * brightPulse}), 0 0 100px rgba(255,215,0,${0.4 * brightPulse})`,
          letterSpacing: '0.03em',
        }}>
          Be the
        </div>
        
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 10,
          opacity: spring({fps, frame: frame - 35, config: {damping: 100}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 100}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 35, config: {damping: 100}}),
            [0, 0.5, 1],
            [0.8, 1.1, 1]
          )})`,
          textShadow: `0 0 80px rgba(255, 215, 0, ${0.95 * brightPulse}), 0 0 150px rgba(255,255,255,${0.5 * brightPulse}), 0 0 200px rgba(255,215,0,${0.3 * brightPulse})`,
          letterSpacing: '0.05em',
        }}>
          hardest worker.
        </div>
      </div>
      
      {/* Trophy Illustration */}
      <div style={{
        marginTop: 50,
        opacity: trophyReveal,
        transform: `translateY(${interpolate(trophyReveal, [0, 1], [50, 0])}px) scale(${interpolate(trophyReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <TrophySVG scale={1.3} intensity={brightPulse} />
      </div>
      
      {/* Star burst */}
      <div style={{
        marginTop: 40,
        fontSize: 60,
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        transform: `rotate(${frame * 2}deg) scale(${interpolate(frame % 20, [0, 10, 20], [1, 1.2, 1])})`,
        filter: `drop-shadow(0 0 40px rgba(255,215,0,${0.9 * brightPulse}))`,
      }}>
        ✨
      </div>
      
      {/* Bottom CTA */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        fontSize: 18,
        color: 'rgba(255, 215, 0, 0.9)',
        opacity: spring({fps, frame: frame - 70, config: {damping: 100}}),
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontWeight: 800,
        textShadow: `0 0 20px rgba(255,215,0,${0.8 * brightPulse})`,
      }}>
        Rise and Grind
      </div>
    </AbsoluteFill>
  );
};
