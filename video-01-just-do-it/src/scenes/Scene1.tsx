import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

// Shia LaBeouf "Just Do It" inspired Scene 1
// Scene 1: "Yesterday you said tomorrow."

// Motivational Speaker SVG - Clenched fist pose
const MotivationalSpeakerSVG: React.FC<{scale?: number; intensity?: number}> = ({scale = 1, intensity = 0.5}) => {
  const pulse = interpolate(intensity, [0, 1], [0.9, 1.1]);
  
  return (
    <svg 
      width={320 * scale} 
      height={400 * scale} 
      viewBox="0 0 320 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 ${40 * pulse}px rgba(255, 107, 53, ${0.7 * intensity})) 
                 drop-shadow(0 0 ${80 * pulse}px rgba(255, 255, 255, ${0.4 * intensity}))`,
      }}
    >
      {/* Background burst */}
      <g opacity={0.3 * intensity}>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M160 200 L${160 + 120 * Math.cos((i * 30 * Math.PI) / 180)} ${200 + 120 * Math.sin((i * 30 * Math.PI) / 180)}`}
            stroke="url(#burstGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        ))}
      </g>
      
      {/* Body/Torso */}
      <path
        d="M110 180 
           Q100 250 95 350 
           L225 350 
           Q220 250 210 180 
           Q160 170 110 180"
        fill="url(#shirtGradient)"
      />
      
      {/* Shirt details */}
      <path
        d="M130 200 Q160 210 190 200"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Neck */}
      <rect x="135" y="140" width="50" height="45" fill="#f5d0c5" />
      
      {/* Neck muscles */}
      <path d="M135 160 Q145 175 135 185" stroke="#e5b5a0" strokeWidth="2" fill="none" />
      <path d="M185 160 Q175 175 185 185" stroke="#e5b5a0" strokeWidth="2" fill="none" />
      
      {/* Head */}
      <ellipse cx="160" cy="100" rx="55" ry="65" fill="#f5d0c5" />
      
      {/* Face - intense expression */}
      {/* Eyes - intense, focused */}
      <ellipse cx="140" cy="95" rx="12" ry="10" fill="#fff" />
      <ellipse cx="180" cy="95" rx="12" ry="10" fill="#fff" />
      <circle cx="142" cy="95" r="6" fill="#2d1b0e" />
      <circle cx="182" cy="95" r="6" fill="#2d1b0e" />
      <circle cx="144" cy="93" r="2" fill="#fff" />
      <circle cx="184" cy="93" r="2" fill="#fff" />
      
      {/* Eyebrows - intense/furrowed */}
      <path d="M125 80 Q140 85 152 82" stroke="#2d1b0e" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M168 82 Q180 85 195 80" stroke="#2d1b0e" strokeWidth="5" strokeLinecap="round" fill="none" />
      
      {/* Nose */}
      <path d="M160 105 L155 125 L165 125 Z" fill="#e5b5a0" />
      
      {/* Mouth - shouting/intense */}
      <path 
        d="M140 140 Q160 155 180 140 Q160 150 140 140"
        fill="#c97b7b"
        stroke="#a65d5d"
        strokeWidth="2"
      />
      
      {/* Teeth */}
      <rect x="150" y="142" width="8" height="6" fill="#fff" rx="1" />
      <rect x="162" y="142" width="8" height="6" fill="#fff" rx="1" />
      
      {/* Hair - messy, intense */}
      <path
        d="M105 90 
           Q95 60 110 40 
           Q130 15 160 15 
           Q190 15 210 40 
           Q225 60 215 90 
           Q210 70 200 55 
           Q180 35 160 35 
           Q140 35 120 55 
           Q110 70 105 90"
        fill="#2d1b0e"
      />
      
      {/* Hair texture */}
      <path d="M120 45 Q140 30 160 35" stroke="#1a0f08" strokeWidth="3" fill="none" />
      <path d="M160 35 Q180 30 200 45" stroke="#1a0f08" strokeWidth="3" fill="none" />
      
      {/* Left Arm - pointing/clenched */}
      <path
        d="M110 190 
           Q70 200 50 180 
           Q40 170 45 160 
           Q55 150 70 160 
           Q90 170 110 190"
        fill="#f5d0c5"
      />
      
      {/* Left hand - pointing finger */}
      <ellipse cx="45" cy="165" rx="20" ry="25" fill="#f5d0c5" />
      <rect x="25" y="150" width="15" height="35" fill="#f5d0c5" rx="7" />
      
      {/* Fingers */}
      <rect x="22" y="145" width="8" height="25" fill="#f5d0c5" rx="4" />
      <rect x="32" y="148" width="8" height="22" fill="#f5d0c5" rx="4" />
      <rect x="42" y="150" width="8" height="20" fill="#f5d0c5" rx="4" />
      
      {/* Right Arm - CLENCHED FIST (iconic) */}
      <path
        d="M210 190 
           Q250 180 280 160 
           Q300 140 290 120 
           Q280 100 260 110 
           Q240 120 230 140 
           Q220 160 210 190"
        fill="#f5d0c5"
      />
      
      {/* CLENCHED FIST - The iconic pose */}
      <g transform="translate(265, 115) rotate(-15)">
        {/* Fist body */}
        <rect x="0" y="0" width="50" height="55" fill="#f5d0c5" rx="10" />
        
        {/* Knuckles */}
        <ellipse cx="12" cy="15" rx="8" ry="10" fill="#e5b5a0" />
        <ellipse cx="28" cy="12" rx="8" ry="10" fill="#e5b5a0" />
        <ellipse cx="42" cy="15" rx="8" ry="10" fill="#e5b5a0" />
        <ellipse cx="15" cy="32" rx="8" ry="10" fill="#e5b5a0" />
        
        {/* Thumb wrapped around */}
        <ellipse cx="-5" cy="35" rx="10" ry="15" fill="#f5d0c5" transform="rotate(-20)" />
        
        {/* Fist highlight */}
        <ellipse cx="25" cy="25" rx="15" ry="12" fill="url(#fistGlow)" opacity={0.6 * intensity} />
      </g>
      
      {/* Muscle definition lines */}
      <path d="M115 200 Q130 220 125 250" stroke="#e5b5a0" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M205 200 Q190 220 195 250" stroke="#e5b5a0" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="50%" stopColor="#f7931e" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        
        <radialGradient id="fistGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        
        <linearGradient id="burstGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,107,53,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 8, config: {damping: 150, stiffness: 100}});
  const speakerReveal = spring({fps, frame: frame - 20, config: {damping: 100, stiffness: 80}});
  
  // White glow effects
  const whiteGlow = interpolate(frame % 35, [0, 17, 35], [0.3, 1, 0.3]);
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
      {/* Bright white/orange glow background */}
      <div style={{
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255, 107, 53, ${0.2 * whiteGlow}), rgba(255, 255, 255, ${0.1 * whiteGlow}), transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      
      {/* White light rays */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 4,
          height: 500,
          background: `linear-gradient(180deg, transparent, rgba(255,255,255,${0.3 * brightPulse}), rgba(255,107,53,${0.2 * brightPulse}), transparent)`,
          transform: `rotate(${frame * (0.25 + i * 0.1) + i * 30}deg)`,
          filter: 'blur(2px)',
        }} />
      ))}
      
      {/* Floating white sparks */}
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#fff',
          left: `${8 + i * 10}%`,
          top: `${10 + (i % 5) * 18}%`,
          opacity: brightPulse * (0.4 + Math.random() * 0.4),
          boxShadow: '0 0 15px rgba(255,255,255,0.9)',
          transform: `translateY(${Math.sin((frame + i * 25) * 0.1) * 30}px)`,
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
          fontSize: 56,
          fontWeight: 900,
          color: '#fff',
          textAlign: 'center',
          letterSpacing: '0.02em',
          opacity: textReveal,
          transform: `translateY(${interpolate(textReveal, [0, 1], [50, 0])}px)`,
          textShadow: `0 0 50px rgba(255,255,255,${0.6 * whiteGlow}), 0 0 100px rgba(255,107,53,${0.4 * brightPulse})`,
        }}>
          Yesterday
        </div>
        
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          color: '#ff6b35',
          textAlign: 'center',
          marginTop: 8,
          opacity: spring({fps, frame: frame - 25, config: {damping: 120}}),
          transform: `translateY(${interpolate(
            spring({fps, frame: frame - 25, config: {damping: 120}}),
            [0, 1],
            [40, 0]
          )}px) scale(${interpolate(
            spring({fps, frame: frame - 25, config: {damping: 120}}),
            [0, 0.5, 1],
            [0.9, 1.05, 1]
          )})`,
          textShadow: `0 0 60px rgba(255, 107, 53, ${0.8 * brightPulse}), 0 0 120px rgba(255,255,255,${0.4 * whiteGlow})`,
        }}>
          you said tomorrow.
        </div>
      </div>
      
      {/* Motivational Speaker Illustration */}
      <div style={{
        marginTop: 40,
        opacity: speakerReveal,
        transform: `translateY(${interpolate(speakerReveal, [0, 1], [60, 0])}px) scale(${interpolate(speakerReveal, [0, 0.6, 1], [0.8, 1.05, 1])})`,
        zIndex: 10,
      }}>
        <MotivationalSpeakerSVG scale={1.1} intensity={brightPulse} />
      </div>
      
      {/* Bottom urgency text */}
      <div style={{
        position: 'absolute',
        bottom: 70,
        fontSize: 22,
        color: '#ff6b35',
        opacity: spring({fps, frame: frame - 60, config: {damping: 100}}),
        letterSpacing: '0.15em',
        fontWeight: 800,
        textShadow: `0 0 25px rgba(255,107,53,${0.8 * brightPulse})`,
      }}>
        NO MORE EXCUSES
      </div>
    </AbsoluteFill>
  );
};
