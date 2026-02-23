import {useCurrentFrame, interpolate, spring} from 'remotion';

const MILITARY_GREEN = '#4a5d23';
const BLOOD_RED = '#8b0000';
const BLACK = '#0a0a0a';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / 90;
  
  const scale = spring({
    frame,
    fps: 30,
    config: {damping: 10, stiffness: 100}
  });
  
  const chainBreak = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at center, ${MILITARY_GREEN}22, ${BLACK})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${MILITARY_GREEN}11 10px,
            ${MILITARY_GREEN}11 20px
          )`,
          opacity: 0.3
        }}
      />
      
      {/* Brain with chains */}
      <div
        style={{
          transform: `scale(${0.8 + scale * 0.2})`,
          transition: 'transform 0.1s'
        }}
      >
        {/* Brain shape */}
        <svg width="300" height="280" viewBox="0 0 300 280">
          <defs>
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={MILITARY_GREEN} />
              <stop offset="100%" stopColor="#2d3a16" />
            </linearGradient>
          </defs>
          
          {/* Brain */}
          <path
            d="M150 20 C200 20, 260 60, 260 130 C260 200, 200 250, 150 260 C100 250, 40 200, 40 130 C40 60, 100 20, 150 20"
            fill="url(#brainGrad)"
            stroke={BLOOD_RED}
            strokeWidth="3"
          />
          
          {/* Brain folds */}
          <path
            d="M150 40 C180 40, 200 80, 150 120 C120 150, 80 120, 80 100"
            fill="none"
            stroke="#2d3a16"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M150 120 C180 150, 220 130, 220 110"
            fill="none"
            stroke="#2d3a16"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          <path
            d="M150 140 C120 170, 100 200, 150 240"
            fill="none"
            stroke="#2d3a16"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Chains */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: `translateX(-50%) translateY(${chainBreak * -50}px) rotate(${chainBreak * -15}deg)`,
            opacity: 1 - chainBreak * 0.5
          }}
        >
          <svg width="200" height="100" viewBox="0 0 200 100">
            {/* Chain links */}
            {[0, 1, 2, 3].map((i) => (
              <ellipse
                key={i}
                cx={50 + i * 35}
                cy={50 + (i % 2) * 10}
                rx="15"
                ry="25"
                fill="none"
                stroke="#666"
                strokeWidth="6"
                transform={`rotate(${i % 2 === 0 ? 0 : 90}, ${50 + i * 35}, ${50 + (i % 2) * 10})`}
              />
            ))}
          </svg>
        </div>
        
        {/* Breaking chain particles */}
        {chainBreak > 0.3 && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  background: BLOOD_RED,
                  borderRadius: '50%',
                  left: '50%',
                  top: '30%',
                  transform: `translate(-50%, -50%) translate(${Math.cos(i * 0.8) * chainBreak * 100}px, ${Math.sin(i * 0.8) * chainBreak * 100}px)`,
                  opacity: 1 - chainBreak
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${(1 - textOpacity) * 20}px)`
        }}
      >
        <h1
          style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '52px',
            fontWeight: '900',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textShadow: `4px 4px 0 ${BLOOD_RED}, -2px -2px 0 ${MILITARY_GREEN}`,
            margin: 0,
            padding: '0 40px'
          }}
        >
          Life is one big mind game.
        </h1>
      </div>
    </div>
  );
};