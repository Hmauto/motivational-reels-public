import {useCurrentFrame, interpolate, spring} from 'remotion';

const MILITARY_GREEN = '#4a5d23';
const BLOOD_RED = '#8b0000';
const BLACK = '#0a0a0a';
const GOLD = '#c9a227';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  
  const tridentScale = spring({
    frame: frame - 10,
    fps: 30,
    config: {damping: 10, stiffness: 70}
  });
  
  const glowPulse = interpolate(frame, [0, 45, 90], [0.5, 1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const textOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const particles = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at center, ${MILITARY_GREEN}25 0%, ${BLACK} 80%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Camouflage pattern background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 30% 20% at 20% 30%, ${MILITARY_GREEN}22 0%, transparent 70%),
            radial-gradient(ellipse 25% 15% at 70% 20%, ${MILITARY_GREEN}18 0%, transparent 70%),
            radial-gradient(ellipse 35% 25% at 50% 60%, ${MILITARY_GREEN}15 0%, transparent 70%),
            radial-gradient(ellipse 20% 30% at 80% 80%, ${MILITARY_GREEN}20 0%, transparent 70%),
            radial-gradient(ellipse 40% 20% at 30% 80%, ${MILITARY_GREEN}12 0%, transparent 70%)
          `,
          opacity: 0.6
        }}
      />
      
      {/* Navy SEAL Trident */}
      <div
        style={{
          transform: `scale(${0.6 + tridentScale * 0.4})`,
          transition: 'transform 0.1s',
          filter: `drop-shadow(0 0 ${20 * glowPulse}px ${GOLD}88)`
        }}
      >
        <svg width="280" height="320" viewBox="0 0 280 320">
          <defs>
            <linearGradient id="tridentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={GOLD} />
              <stop offset="50%" stopColor="#e8d5a3" />
              <stop offset="100%" stopColor="#a08020" />
            </linearGradient>
            
            <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="50%" stopColor={GOLD} />
              <stop offset="100%" stopColor="#a08020" />
            </linearGradient>
          </defs>
          
          {/* Anchor shank */}
          <rect x="130" y="80" width="20" height="200" fill="url(#tridentGrad)" stroke="#8b6914" strokeWidth="1" />
          
          {/* Anchor ring at top */}
          <circle cx="140" cy="50" r="30" fill="none" stroke="url(#tridentGrad)" strokeWidth="12" />
          
          {/* Anchor flukes (arms) */}
          <path
            d="M130 200 Q80 220, 40 180 L25 200 Q70 250, 130 240"
            fill="url(#tridentGrad)"
            stroke="#8b6914"
            strokeWidth="1"
          />
          
          <path
            d="M150 200 Q200 220, 240 180 L255 200 Q210 250, 150 240"
            fill="url(#tridentGrad)"
            stroke="#8b6914"
            strokeWidth="1"
          />
          
          {/* Anchor stock (crossbar) */}
          <rect x="50" y="140" width="180" height="16" rx="3" fill="url(#tridentGrad)" stroke="#8b6914" strokeWidth="1" />
          
          {/* Eagle wings */}
          <path
            d="M140 100 Q100 90, 60 110 Q40 120, 30 140 Q50 135, 80 130 Q110 125, 140 120"
            fill={MILITARY_GREEN}
            stroke={GOLD}
            strokeWidth="2"
          />
          
          <path
            d="M140 100 Q180 90, 220 110 Q240 120, 250 140 Q230 135, 200 130 Q170 125, 140 120"
            fill={MILITARY_GREEN}
            stroke={GOLD}
            strokeWidth="2"
          />
          
          {/* Eagle head */}
          <path
            d="M140 100 L135 70 L140 55 L145 70 Z"
            fill={MILITARY_GREEN}
            stroke={GOLD}
            strokeWidth="2"
          />
          
          <circle cx="140" cy="65" r="8" fill={GOLD} />
          
          <circle cx="142" cy="63" r="3" fill={BLACK} />
          
          {/* Trident spear tips */}
          <path
            d="M60 110 L55 40 L50 50 L45 40 L40 50 L35 40 L30 115"
            fill="url(#bladeGrad)"
            stroke="#666"
            strokeWidth="1"
          />
          
          <path
            d="M220 110 L225 40 L230 50 L235 40 L240 50 L245 40 L250 115"
            fill="url(#bladeGrad)"
            stroke="#666"
            strokeWidth="1"
          />
          
          {/* Center spear/flintlock pistol */}
          <path
            d="M140 120 L135 30 L140 20 L145 30 L140 120"
            fill="url(#bladeGrad)"
            stroke="#666"
            strokeWidth="1"
          />
          
          {/* Decorative details */}
          <circle cx="140" cy="148" r="12" fill={BLOOD_RED} stroke={GOLD} strokeWidth="2" />
          
          <text x="140" y="153" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">⚓</text>
        </svg>
      </div>
      
      {/* Particle effects */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}
      >
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 80 + particles * 60;
          const x = 50 + Math.cos(angle) * distance;
          const y = 40 + Math.sin(angle) * distance * 0.6;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: '6px',
                height: '6px',
                background: GOLD,
                borderRadius: '50%',
                opacity: particles * 0.8,
                boxShadow: `0 0 10px ${GOLD}`
              }}
            />
          );
        })}
      </div>
      
      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${(1 - textOpacity) * 20}px)`,
          padding: '0 40px'
        }}
      >
        <h1
          style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '42px',
            fontWeight: '900',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textShadow: `4px 4px 0 ${BLOOD_RED}, -2px -2px 0 ${MILITARY_GREEN}, 0 0 ${20 * glowPulse}px ${GOLD}`,
            margin: 0,
            lineHeight: 1.3
          }}
        >
          Become uncommon
          <br />
          amongst uncommon.
        </h1>
      </div>
    </div>
  );
};