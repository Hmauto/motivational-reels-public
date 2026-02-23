import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Scene 2: "Your brain kills ideas in 5 seconds" with brain/neuron graphics

const BrainSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulseScale = interpolate(intensity, [0, 1], [0.95, 1.05]);
  
  return (
    <svg 
      width={280 * scale} 
      height={280 * scale} 
      viewBox="0 0 280 280" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${25 * pulseScale}px rgba(155, 89, 182, ${0.7 * intensity})) 
                 drop-shadow(0 0 ${50 * pulseScale}px rgba(255, 255, 255, ${0.3 * intensity}))`,
        transform: `scale(${pulseScale})`,
      }}
    >
      {/* Brain outline - left hemisphere */}
      <path
        d="M140 40 
           Q90 40 60 80 
           Q30 120 40 170 
           Q50 220 100 240 
           Q120 250 140 250"
        fill="url(#brainGradient)"
        stroke="#9b59b6"
        strokeWidth="3"
        opacity="0.9"
      />
      
      {/* Brain outline - right hemisphere */}
      <path
        d="M140 40 
           Q190 40 220 80 
           Q250 120 240 170 
           Q230 220 180 240 
           Q160 250 140 250"
        fill="url(#brainGradient)"
        stroke="#9b59b6"
        strokeWidth="3"
        opacity="0.9"
      />
      
      {/* Brain folds - left */}
      <path d="M70 90 Q90 110 80 140" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M55 130 Q75 150 65 180" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M85 170 Q100 190 90 220" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M110 80 Q120 110 105 130" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      
      {/* Brain folds - right */}
      <path d="M210 90 Q190 110 200 140" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M225 130 Q205 150 215 180" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M195 170 Q180 190 190 220" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M170 80 Q160 110 175 130" stroke="#6c3483" strokeWidth="2" fill="none" opacity="0.6" />
      
      {/* Center line */}
      <path d="M140 40 Q135 140 140 250" stroke="#9b59b6" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Neuron connections - pulsing */}
      <g opacity={0.7 * intensity}>
        {/* Neuron 1 */}
        <circle cx="100" cy="100" r="8" fill="#fff" />
        <line x1="100" y1="100" x2="140" y2="120" stroke="#9b59b6" strokeWidth="2" />
        
        {/* Neuron 2 */}
        <circle cx="180" cy="100" r="8" fill="#fff" />
        <line x1="180" y1="100" x2="140" y2="120" stroke="#9b59b6" strokeWidth="2" />
        
        {/* Neuron 3 - center */}
        <circle cx="140" cy="120" r="10" fill="url(#neuronGlow)" />
        <line x1="140" y1="120" x2="120" y2="170" stroke="#9b59b6" strokeWidth="2" />
        <line x1="140" y1="120" x2="160" y2="170" stroke="#9b59b6" strokeWidth="2" />
        
        {/* Neuron 4 */}
        <circle cx="120" cy="170" r="6" fill="#fff" />
        <line x1="120" y1="170" x2="100" y2="200" stroke="#9b59b6" strokeWidth="2" />
        
        {/* Neuron 5 */}
        <circle cx="160" cy="170" r="6" fill="#fff" />
        <line x1="160" y1="170" x2="180" y2="200" stroke="#9b59b6" strokeWidth="2" />
        
        {/* Neuron 6 */}
        <circle cx="100" cy="200" r="5" fill="#fff" />
        <circle cx="180" cy="200" r="5" fill="#fff" />
      </g>
      
      {/* X mark - representing killed ideas */}
      <g opacity={0.8 * intensity} transform="translate(220, 60)">
        <line x1="0" y1="0" x2="30" y2="30" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" y1="0" x2="0" y2="30" stroke="#e74c3c" strokeWidth="4" strokeLinecap="round" />
        <circle cx="15" cy="15" r="20" stroke="#e74c3c" strokeWidth="2" fill="none" opacity="0.5" />
      </g>
      
      {/* Lightning bolts - representing the 5 second kill */}
      <g opacity={0.6 * intensity}>
        <path d="M40 60 L50 80 L45 85 L60 100" stroke="#f39c12" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M240 60 L230 80 L235 85 L220 100" stroke="#f39c12" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      
      {/* Gradients */}
      <defs>
        <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8d5f2" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="#4a235a" />
        </radialGradient>
        
        <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="50%" stopColor="#9b59b6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal1 = spring({fps, frame: frame - 10, config: {damping: 150, stiffness: 100}});
  const textReveal2 = spring({fps, frame: frame - 35, config: {damping: 150, stiffness: 100}});
  const brainReveal = spring({fps, frame: frame - 50, config: {damping: 100, stiffness: 80}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 35, [0, 17, 35], [0.3, 1, 0.3]);
  const brightPulse = interpolate(frame % 25, [0, 12, 25], [0.5, 1, 0.5]);
  
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
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 450,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.2 * brightPulse}), rgba(155,89,182,${0.15 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.15 + i * 0.1) + i * 60}deg)`,
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
          background: '#fff',
          left: `${8 + i * 9}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: brightPulse * (0.3 + Math.random() * 0.4),
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          transform: `translateY(${Math.sin((frame + i * 25) * 0.1) * 30}px)`,
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
          fontSize: 42,
          fontWeight: 800,
          color: '#fff',
          textAlign: 'center',
          opacity: textReveal1,
          transform: `translateY(${interpolate(textReveal1, [0, 1], [40, 0])}px)`,
          textShadow: `0 0 40px rgba(255,255,255,${0.5 * whiteGlow}), 0 0 80px rgba(155,89,182,${0.4 * brightPulse})`,
        }}>
          Your brain
        </div>
        
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: '#9b59b6',
          textAlign: 'center',
          marginTop: 8,
          opacity: textReveal2,
          transform: `translateY(${interpolate(textReveal2, [0, 1], [40, 0])}px) scale(${interpolate(textReveal2, [0, 0.5, 1], [0.9, 1.05, 1])})`,
          textShadow: `0 0 50px rgba(155, 89, 182, ${0.8 * brightPulse}), 0 0 100px rgba(255,255,255,${0.3 * whiteGlow})`,
        }}>
          kills ideas
        </div>
        
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: '#e74c3c',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 55, config: {damping: 120}}),
          transform: `translateY(${interpolate(spring({fps, frame: frame - 55, config: {damping: 120}}), [0, 1], [30, 0])}px)`,
          textShadow: `0 0 40px rgba(231, 76, 60, ${0.7 * brightPulse})`,
        }}>
          in 5 seconds
        </div>
      </div>
      
      {/* Brain illustration */}
      <div style={{
        marginTop: 40,
        opacity: brainReveal,
        transform: `translateY(${interpolate(brainReveal, [0, 1], [50, 0])}px) scale(${interpolate(brainReveal, [0, 0.6, 1], [0.85, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <BrainSVG scale={1} intensity={brightPulse} />
      </div>
      
      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 20,
        color: '#9b59b6',
        opacity: spring({fps, frame: frame - 80, config: {damping: 100}}),
        letterSpacing: '0.12em',
        fontWeight: 700,
        textShadow: `0 0 20px rgba(155,89,182,${0.7 * brightPulse})`,
      }}>
        DON'T LET IT WIN
      </div>
    </AbsoluteFill>
  );
};
