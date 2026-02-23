import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 3: "While they sleep, you work." - Split screen comparison

const SleepingFigureSVG: React.FC<{scale?: number}> = ({scale = 1}) => (
  <svg width={120 * scale} height={80 * scale} viewBox="0 0 120 80" fill="none">
    {/* Bed */}
    <rect x="10" y="40" width="100" height="35" rx="5" fill="#1a1a2e" stroke="#333" strokeWidth="2" />
    {/* Pillow */}
    <ellipse cx="30" cy="50" rx="15" ry="10" fill="#2a2a3e" />
    {/* Sleeping person */}
    <ellipse cx="45" cy="52" rx="12" ry="8" fill="#0a0a0f" />
    {/* Zzz */}
    <text x="70" y="35" fill="#00d4ff" fontSize="20" fontWeight="bold" opacity="0.7">Z</text>
    <text x="85" y="25" fill="#00d4ff" fontSize="16" fontWeight="bold" opacity="0.5">z</text>
    <text x="98" y="18" fill="#00d4ff" fontSize="12" fontWeight="bold" opacity="0.3">z</text>
  </svg>
);

const WorkingFigureSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => (
  <svg width={120 * scale} height={80 * scale} viewBox="0 0 120 80" fill="none">
    {/* Gym floor */}
    <rect x="5" y="60" width="110" height="15" rx="3" fill="#1a1a2e" stroke="#ffd700" strokeWidth="2" />
    {/* Weight plate */}
    <circle cx="30" cy="50" r="18" fill="#0a0a0f" stroke="#ffd700" strokeWidth="3" />
    <circle cx="30" cy="50" r="6" fill="#1a1a2e" />
    {/* Person lifting */}
    <ellipse cx="75" cy="45" rx="15" ry="20" fill="#0a0a0f" />
    <circle cx="75" cy="25" r="12" fill="#0a0a0f" />
    {/* Arms up */}
    <path d="M65 35 L50 20" stroke="#ffd700" strokeWidth="4" strokeLinecap="round" />
    <path d="M85 35 L100 20" stroke="#ffd700" strokeWidth="4" strokeLinecap="round" />
    {/* Dumbbells in hands */}
    <rect x="42" y="15" width="16" height="6" fill="#ffd700" rx="2" />
    <rect x="92" y="15" width="16" height="6" fill="#ffd700" rx="2" />
    {/* Sweat drops */}
    <circle cx="90" cy="30" r="3" fill="#00d4ff" opacity={0.7 * intensity} />
    <circle cx="95" cy="38" r="2" fill="#00d4ff" opacity={0.5 * intensity} />
  </svg>
);

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150}});
  const splitReveal = spring({fps, frame: frame - 30, config: {damping: 100}});
  
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
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 215, 0, ${0.15 * goldGlow}), rgba(0, 212, 255, ${0.1 * bluePulse}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* Rotating light rays */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 600,
          background: `linear-gradient(180deg, transparent, rgba(255,215,0,${0.2 * goldGlow}), rgba(0,212,255,${0.15 * bluePulse}), transparent)`,
          transform: `rotate(${frame * (0.25 + i * 0.06) + i * 30}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: i % 2 === 0 ? '#ffd700' : '#00d4ff',
          left: `${8 + i * 9}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: (i % 2 === 0 ? goldGlow : bluePulse) * 0.5,
          boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(255,215,0,0.9)' : 'rgba(0,212,255,0.9)'}`,
          transform: `translateY(${Math.sin((frame + i * 25) * 0.08) * 30}px)`,
        }} />
      ))}
      
      {/* Main text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginTop: -100,
      }}>
        <div style={{
          fontSize: 52,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [35, 0])}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.4 * goldGlow})`,
        }}>
          While they
        </div>
        
        <div style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#00d4ff',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 25, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 25, config: {damping: 120}}),
            [0, 1],
            [30, 0]
          )}px)`,
          textShadow: `0 0 50px rgba(0, 212, 255, ${0.8 * bluePulse})`,
        }}>
          sleep,
        </div>
        
        <div style={{
          fontSize: 64,
          fontWeight: 900,
          color: '#ffd700',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 45, config: {damping: 100}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 45, config: {damping: 100}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 45, config: {damping: 100}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 60px rgba(255, 215, 0, ${0.9 * goldGlow})`,
        }}>
          you work.
        </div>
      </div>
      
      {/* Split screen comparison */}
      <div style={{
        display: 'flex',
        gap: 40,
        marginTop: 50,
        opacity: splitReveal,
        transform: `translateY(${interpolate(splitReveal, [0, 1], [40, 0])}px)`,
        zIndex: 10,
      }}>
        {/* Left side - Sleeping */}
        <div style={{
          width: 200,
          height: 180,
          background: 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)',
          borderRadius: 16,
          border: '2px solid #333',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 30px rgba(0,212,255,${0.2 * bluePulse})`,
        }}>
          <div style={{
            fontSize: 16,
            color: '#00d4ff',
            marginBottom: 15,
            fontWeight: 700,
            letterSpacing: '0.1em',
          }}>
            THEM
          </div>
          <SleepingFigureSVG scale={1.5} />
          <div style={{
            fontSize: 14,
            color: '#666',
            marginTop: 10,
          }}>
            Sleeping
          </div>
        </div>
        
        {/* VS divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#ffd700',
            textShadow: `0 0 20px rgba(255,215,0,${0.8 * goldGlow})`,
          }}>
            VS
          </div>
        </div>
        
        {/* Right side - Working */}
        <div style={{
          width: 200,
          height: 180,
          background: 'linear-gradient(180deg, #1a1510 0%, #0a0a0f 100%)',
          borderRadius: 16,
          border: '2px solid #ffd700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 40px rgba(255,215,0,${0.4 * goldGlow})`,
        }}>
          <div style={{
            fontSize: 16,
            color: '#ffd700',
            marginBottom: 15,
            fontWeight: 700,
            letterSpacing: '0.1em',
          }}>
            YOU
          </div>
          <WorkingFigureSVG scale={1.5} intensity={goldGlow} />
          <div style={{
            fontSize: 14,
            color: '#ffd700',
            marginTop: 10,
            fontWeight: 600,
          }}>
            Grinding
          </div>
        </div>
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 20,
        color: '#ffd700',
        opacity: spring({fps, frame: frame - 80, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 800,
        textShadow: `0 0 25px rgba(255,215,0,${0.8 * goldGlow})`,
      }}>
        SEPARATE YOURSELF
      </div>
    </AbsoluteFill>
  );
};
