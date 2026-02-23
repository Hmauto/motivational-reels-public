import {useCurrentFrame, interpolate, spring} from 'remotion';

const MILITARY_GREEN = '#4a5d23';
const BLOOD_RED = '#8b0000';
const BLACK = '#0a0a0a';
const STORM_GRAY = '#2a2a2a';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  
  const stormIntensity = interpolate(frame, [0, 90], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const figurePush = spring({
    frame: frame - 20,
    fps: 30,
    config: {damping: 15, stiffness: 40}
  });
  
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const lightningFlash = interpolate(frame, [40, 45, 50, 55, 60], [0, 1, 0, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${STORM_GRAY} 0%, ${BLACK} 60%, ${MILITARY_GREEN}30 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Storm clouds */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, ${STORM_GRAY} 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 70% 15%, #3a3a3a 0%, transparent 60%),
            radial-gradient(ellipse 70% 45% at 50% 25%, ${STORM_GRAY} 0%, transparent 65%)
          `,
          opacity: 0.7 + stormIntensity * 0.3
        }}
      />
      
      {/* Lightning flash overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          opacity: lightningFlash * 0.3,
          pointerEvents: 'none'
        }}
      />
      
      {/* Rain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden'
        }}
      >
        {[...Array(30)].map((_, i) => {
          const delay = i * 3;
          const x = (i * 37) % 100;
          const speed = 1 + (i % 3) * 0.5;
          const y = ((frame * speed + delay * 10) % 120) - 20;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: '2px',
                height: '25px',
                background: `linear-gradient(180deg, transparent, #88aaff${Math.floor(stormIntensity * 99).toString(16).padStart(2, '0')})`,
                transform: 'rotate(15deg)',
                opacity: 0.4 + stormIntensity * 0.4
              }}
            />
          );
        })}
      </div>
      
      {/* Lightning bolt */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '20%',
          opacity: lightningFlash,
          transform: 'scale(1.5)'
        }}
      >
        <svg width="100" height="200" viewBox="0 0 100 200">
          <path
            d="M60 0 L30 80 L50 80 L20 200 L70 90 L45 90 L80 0 Z"
            fill="#fff"
            stroke="#88aaff"
            strokeWidth="2"
          />
        </svg>
      </div>
      
      {/* Figure pushing forward */}
      <div
        style={{
          position: 'relative',
          transform: `translateX(${figurePush * 30}px)`,
          transition: 'transform 0.1s'
        }}
      >
        <svg width="200" height="280" viewBox="0 0 200 280">
          <defs>
            <linearGradient id="figureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={MILITARY_GREEN} />
              <stop offset="100%" stopColor="#2d3a16" />
            </linearGradient>
          </defs>
          
          {/* Silhouette figure leaning into wind */}
          <g transform="translate(50, 20)">
            {/* Body - leaning forward */}
            <path
              d="M50 240 L45 180 L40 120 L55 80 L70 75 L85 80 L90 120 L85 180 L80 240 Z"
              fill="url(#figureGrad)"
              stroke={BLOOD_RED}
              strokeWidth="2"
            />
            
            {/* Head */}
            <circle cx="65" cy="55" r="25" fill="url(#figureGrad)" stroke={BLOOD_RED} strokeWidth="2" />
            
            {/* Arms - pushing forward */}
            <path
              d="M40 130 L20 140 L5 135"
              fill="none"
              stroke="url(#figureGrad)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            
            <path
              d="M90 130 L110 125 L125 120"
              fill="none"
              stroke="url(#figureGrad)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            
            {/* Legs - striding forward */}
            <path
              d="M50 240 L35 280 L20 280"
              fill="none"
              stroke="url(#figureGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            <path
              d="M80 240 L95 275 L115 270"
              fill="none"
              stroke="url(#figureGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            {/* Determination lines */}
            <path
              d="M30 50 L10 45"
              stroke={BLOOD_RED}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={stormIntensity}
            />
            
            <path
              d="M30 60 L8 58"
              stroke={BLOOD_RED}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={stormIntensity}
            />
            
            <path
              d="M30 70 L12 72"
              stroke={BLOOD_RED}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={stormIntensity}
            />
          </g>
        </svg>
      </div>
      
      {/* Wind lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}
      >
        {[...Array(8)].map((_, i) => {
          const y = 30 + i * 20;
          const offset = (frame * 3 + i * 50) % 200;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${offset}px`,
                top: `${y}%`,
                width: '80px',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${MILITARY_GREEN}66, transparent)`,
                opacity: 0.3 + stormIntensity * 0.4
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
          transform: `translateY(${(1 - textOpacity) * 20}px)`
        }}
      >
        <h1
          style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '64px',
            fontWeight: '900',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            textShadow: `4px 4px 0 ${BLOOD_RED}, -2px -2px 0 ${MILITARY_GREEN}, 0 0 ${30 * stormIntensity}px ${BLOOD_RED}`,
            margin: 0,
            padding: '0 40px'
          }}
        >
          Embrace the suck.
        </h1>
      </div>
    </div>
  );
};