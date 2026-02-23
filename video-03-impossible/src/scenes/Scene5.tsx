import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 5: "What's your impossible?" with question mark transforming to checkmark

const QuestionToCheckSVG: React.FC<{scale?: number; intensity?: number; transformProgress?: number}> = ({scale = 1, intensity = 0.5, transformProgress = 0}) => {
  // transformProgress: 0 = question mark, 1 = checkmark
  const questionOpacity = 1 - transformProgress;
  const checkOpacity = transformProgress;
  
  return (
    <svg 
      width={300 * scale} 
      height={350 * scale} 
      viewBox="0 0 300 350" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${40 * intensity}px rgba(255, 215, 0, ${0.6 * intensity})) 
                 drop-shadow(0 0 ${80 * intensity}px rgba(46, 204, 113, ${0.4 * intensity * checkOpacity}))`,
      }}
    >
      {/* Question Mark */}
      <g opacity={questionOpacity} style={{
        transform: `scale(${1 - transformProgress * 0.3}) rotate(${transformProgress * 45}deg)`,
        transformOrigin: '150px 150px',
      }}>
        {/* Question mark curve */}
        <path 
          d="M100 120 Q100 60 150 60 Q200 60 200 100 Q200 140 150 160 L150 200" 
          stroke="url(#questionGradient)" 
          strokeWidth="25" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Question mark dot */}
        <circle cx="150" cy="240" r="18" fill="url(#questionGradient)" />
        
        {/* Glow effect */}
        <path 
          d="M100 120 Q100 60 150 60 Q200 60 200 100 Q200 140 150 160 L150 200" 
          stroke="#ffd700" 
          strokeWidth="35" 
          fill="none"
          strokeLinecap="round"
          opacity={0.3 * intensity}
          filter="blur(10px)"
        />
      </g>
      
      {/* Checkmark */}
      <g opacity={checkOpacity} style={{
        transform: `scale(${0.7 + transformProgress * 0.3}) rotate(${-45 + transformProgress * 45}deg)`,
        transformOrigin: '150px 175px',
      }}>
        {/* Checkmark path */}
        <path 
          d="M80 180 L130 230 L220 120" 
          stroke="url(#checkGradient)" 
          strokeWidth="30" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Glow effect */}
        <path 
          d="M80 180 L130 230 L220 120" 
          stroke="#2ecc71" 
          strokeWidth="45" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.4 * intensity}
          filter="blur(15px)"
        />
        
        {/* Success sparkles */}
        <g opacity={intensity}>
          <circle cx="80" cy="180" r="8" fill="#2ecc71" />
          <circle cx="130" cy="230" r="10" fill="#2ecc71" />
          <circle cx="220" cy="120" r="8" fill="#2ecc71" />
        </g>
      </g>
      
      {/* Transform particles */}
      <g opacity={transformProgress * intensity}>
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={150 + 80 * Math.cos((i * 45 * Math.PI) / 180) * transformProgress}
            cy={175 + 80 * Math.sin((i * 45 * Math.PI) / 180) * transformProgress}
            r={4 * transformProgress}
            fill="#ffd700"
            opacity={0.8}
          />
        ))}
      </g>
      
      <defs>
        <linearGradient id="questionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#f1c40f" />
          <stop offset="100%" stopColor="#e74c3c" />
        </linearGradient>
        
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2ecc71" />
          <stop offset="50%" stopColor="#27ae60" />
          <stop offset="100%" stopColor="#ffd700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150, stiffness: 100}});
  const visualReveal = spring({fps, frame: frame - 30, config: {damping: 100, stiffness: 80}});
  const transformProgress = spring({fps, frame: frame - 70, config: {damping: 60, stiffness: 100}});
  
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
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.15 * goldGlow}), rgba(46, 204, 113, ${0.08 * goldGlow * transformProgress}), transparent 70%)`,
        filter: 'blur(80px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 600,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.22 * brightPulse}), rgba(46,204,113,${0.12 * brightPulse * transformProgress}), transparent)`,
          transform: `rotate(${frame * (0.2 + i * 0.08) + i * 45}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating gold/green particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: transformProgress > 0.5 ? '#2ecc71' : '#ffd700',
          left: `${6 + i * 8}%`,
          top: `${8 + (i % 6) * 16}%`,
          opacity: brightPulse * (0.5 + Math.random() * 0.4),
          boxShadow: `0 0 20px ${transformProgress > 0.5 ? 'rgba(46,204,113,0.9)' : 'rgba(255,215,0,0.9)'}`,
          transform: `translateY(${Math.sin((frame + i * 25) * 0.08) * 40}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -140,
      }}>
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.5 * goldGlow}), 0 0 100px rgba(255,215,0,${0.3 * brightPulse})`,
        }}>
          What's your
        </div>
        
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 20, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 20, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 20, config: {damping: 120}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 60px rgba(255, 215, 0, ${0.8 * brightPulse})`,
        }}>
          IMPOSSIBLE?
        </div>
        
        <div style={{
          fontSize: 28,
          fontWeight: 700,
          color: transformProgress > 0.5 ? '#2ecc71' : '#e74c3c',
          textAlign: 'center',
          marginTop: 20,
          opacity: spring({fps, frame: frame - 85, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 85, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 40px ${transformProgress > 0.5 ? 'rgba(46,204,113,' : 'rgba(231,76,60,'}${0.7 * brightPulse})`,
        }}>
          {transformProgress > 0.5 ? 'Make it POSSIBLE.' : 'Time to prove them wrong.'}
        </div>
      </div>
      
      {/* Question to Checkmark Visual */}
      <div style={{
        marginTop: 50,
        opacity: visualReveal,
        transform: `translateY(${interpolate(visualReveal, [0, 1], [60, 0])}px) scale(${interpolate(visualReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <QuestionToCheckSVG scale={1.1} intensity={brightPulse} transformProgress={transformProgress} />
      </div>
      
      {/* Bottom CTA */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 24,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 95, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 800,
        textShadow: `0 0 30px rgba(255,215,0,${0.8 * brightPulse})`,
        textAlign: 'center',
      }}>
        IMPOSSIBLE IS NOTHING
      </div>
    </AbsoluteFill>
  );
};
