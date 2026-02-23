import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 3: "Count backward. Move immediately." with action arrows

const ActionArrow: React.FC<{rotation: number; delay: number; frame: number; fps: number; intensity: number}> = ({rotation, delay, frame, fps, intensity}) => {
  const arrowSpring = spring({fps, frame: frame - delay, config: {damping: 80, stiffness: 100}});
  
  return (
    <div style={{
      position: 'absolute',
      opacity: arrowSpring * intensity,
      transform: `rotate(${rotation}deg) translateX(${interpolate(arrowSpring, [0, 1], [-100, 0])}px) scale(${interpolate(arrowSpring, [0, 0.5, 1], [0.5, 1.1, 1])})`,
    }}>
      <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
        <path d="M0 20 L60 20 L50 10 M60 20 L50 30" stroke="url(#arrowGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b59b6" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const NumbersSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  return (
    <svg 
      width={300 * scale} 
      height={120 * scale} 
      viewBox="0 0 300 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${20 * intensity}px rgba(155, 89, 182, ${0.8 * intensity})) 
                 drop-shadow(0 0 ${40 * intensity}px rgba(255, 255, 255, ${0.4 * intensity}))`,
      }}
    >
      {/* 5 */}
      <text x="30" y="80" fontSize="60" fontWeight="900" fill="#fff" opacity={0.9}>5</text>
      
      {/* Arrow between 5 and 4 */}
      <path d="M60 60 L80 60 L75 55 M80 60 L75 65" stroke="#9b59b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 4 */}
      <text x="95" y="80" fontSize="60" fontWeight="900" fill="#fff" opacity={0.9}>4</text>
      
      {/* Arrow between 4 and 3 */}
      <path d="M125 60 L145 60 L140 55 M145 60 L140 65" stroke="#9b59b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 3 */}
      <text x="160" y="80" fontSize="60" fontWeight="900" fill="#fff" opacity={0.9}>3</text>
      
      {/* Arrow between 3 and 2 */}
      <path d="M190 60 L210 60 L205 55 M210 60 L205 65" stroke="#9b59b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 2 */}
      <text x="225" y="80" fontSize="60" fontWeight="900" fill="#fff" opacity={0.9}>2</text>
      
      {/* Arrow between 2 and 1 */}
      <path d="M255 60 L275 60 L270 55 M275 60 L270 65" stroke="#9b59b6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* 1 */}
      <text x="285" y="80" fontSize="60" fontWeight="900" fill="#e74c3c" opacity={1}>1</text>
      
      {/* Glow effect on 1 */}
      <circle cx="300" cy="65" r="35" fill="url(#numberGlow)" opacity={0.5 * intensity} />
      
      <defs>
        <radialGradient id="numberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(231, 76, 60, 0.8)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal1 = spring({fps, frame: frame - 10, config: {damping: 150, stiffness: 100}});
  const textReveal2 = spring({fps, frame: frame - 35, config: {damping: 150, stiffness: 100}});
  const numbersReveal = spring({fps, frame: frame - 50, config: {damping: 100, stiffness: 80}});
  const arrowsReveal = spring({fps, frame: frame - 70, config: {damping: 100, stiffness: 60}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 30, [0, 15, 30], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 20, [0, 10, 20], [0.5, 1, 0.5]);
  
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
        background: `radial-gradient(circle, rgba(155, 89, 182, ${0.25 * whiteGlow}), rgba(255, 255, 255, ${0.08 * whiteGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* White light rays */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 400,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.22 * brightPulse}), rgba(155,89,182,${0.18 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.18 + i * 0.08) + i * 45}deg)`,
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
          left: `${6 + i * 8}%`,
          top: `${8 + (i % 6) * 16}%`,
          opacity: brightPulse * (0.3 + Math.random() * 0.4),
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          transform: `translateY(${Math.sin((frame + i * 30) * 0.09) * 28}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -40,
      }}>
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal1,
          transform: `translateY(${interpolate(textReveal1, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.6 * whiteGlow}), 0 0 100px rgba(155,89,182,${0.4 * brightPulse})`,
        }}>
          Count backward.
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#9b59b6',
          textAlign: 'center',
          marginTop: 12,
          opacity: textReveal2,
          transform: `translateY(${interpolate(textReveal2, [0, 1], [40, 0])}px) scale(${interpolate(textReveal2, [0, 0.5, 1], [0.9, 1.05, 1])})`,
          textShadow: `0 0 60px rgba(155, 89, 182, ${0.8 * brightPulse}), 0 0 120px rgba(255,255,255,${0.4 * whiteGlow})`,
        }}>
          Move immediately.
        </div>
      </div>
      
      {/* Countdown numbers */}
      <div style={{
        marginTop: 50,
        opacity: numbersReveal,
        transform: `translateY(${interpolate(numbersReveal, [0, 1], [40, 0])}px)`,
        zIndex: 10,
      }}>
        <NumbersSVG scale={1.2} intensity={brightPulse} />
      </div>
      
      {/* Action arrows radiating outward */}
      <div style={{
        position: 'absolute',
        width: 200,
        height: 200,
        opacity: arrowsReveal,
        zIndex: 5,
      }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `rotate(${rotation}deg) translateX(120px)`,
          }}>
            <ActionArrow 
              rotation={0} 
              delay={70 + i * 5} 
              frame={frame} 
              fps={fps} 
              intensity={brightPulse}
            />
          </div>
        ))}
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 22,
        color: '#fff',
        opacity: spring({fps, frame: frame - 90, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 800,
        textShadow: `0 0 30px rgba(155,89,182,${0.8 * brightPulse})`,
      }}>
        5-4-3-2-1 → GO
      </div>
    </AbsoluteFill>
  );
};
