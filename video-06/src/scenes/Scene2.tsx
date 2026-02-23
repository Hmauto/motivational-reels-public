import {useCurrentFrame, interpolate, spring} from 'remotion';

const MILITARY_GREEN = '#4a5d23';
const BLOOD_RED = '#8b0000';
const BLACK = '#0a0a0a';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  
  const handScale = spring({
    frame: frame - 10,
    fps: 30,
    config: {damping: 12, stiffness: 80}
  });
  
  const callusOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const textOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const grit = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${BLACK} 0%, ${MILITARY_GREEN}15 50%, ${BLACK} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Grit texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.15 * grit,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Hands with calluses */}
      <div
        style={{
          transform: `scale(${0.7 + handScale * 0.3})`,
          transition: 'transform 0.1s',
          position: 'relative'
        }}
      >
        <svg width="350" height="300" viewBox="0 0 350 300">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4a77d" />
              <stop offset="50%" stopColor="#a68b5b" />
              <stop offset="100%" stopColor="#8b7355" />
            </linearGradient>
            
            <linearGradient id="callusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8dcc8" />
              <stop offset="100%" stopColor="#d4c4a8" />
            </linearGradient>
          </defs>
          
          {/* Left hand */}
          <g transform="translate(30, 50)">
            {/* Palm */}
            <path
              d="M60 180 C40 160, 30 120, 40 80 C45 50, 60 30, 80 25 C100 20, 120 30, 130 50 C140 70, 135 100, 125 130 C115 160, 100 190, 80 200 C70 205, 65 195, 60 180"
              fill="url(#skinGrad)"
              stroke="#6b5344"
              strokeWidth="2"
            />
            
            {/* Fingers */}
            <ellipse cx="55" cy="60" rx="18" ry="35" fill="url(#skinGrad)" transform="rotate(-20, 55, 60)" />
            <ellipse cx="85" cy="45" rx="16" ry="40" fill="url(#skinGrad)" transform="rotate(-5, 85, 45)" />
            <ellipse cx="115" cy="50" rx="15" ry="38" fill="url(#skinGrad)" transform="rotate(10, 115, 50)" />
            <ellipse cx="140" cy="75" rx="14" ry="30" fill="url(#skinGrad)" transform="rotate(25, 140, 75)" />
            
            {/* Calluses - appear with animation */}
            <g opacity={callusOpacity}>
              {/* Palm callus */}
              <ellipse cx="75" cy="140" rx="25" ry="20" fill="url(#callusGrad)" opacity="0.9" />
              <ellipse cx="75" cy="140" rx="15" ry="12" fill="#f0e6d3" opacity="0.6" />
              
              {/* Finger calluses */}
              <ellipse cx="52" cy="35" rx="12" ry="8" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="85" cy="22" rx="10" ry="7" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="115" cy="28" rx="10" ry="7" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="140" cy="55" rx="9" ry="6" fill="url(#callusGrad)" opacity="0.8" />
              
              {/* Cracks/texture on calluses */}
              <path d="M65 135 L85 145" stroke="#b8a890" strokeWidth="1" opacity="0.5" />
              <path d="M70 145 L80 135" stroke="#b8a890" strokeWidth="1" opacity="0.5" />
            </g>
          </g>
          
          {/* Right hand */}
          <g transform="translate(180, 50)">
            {/* Palm */}
            <path
              d="M100 180 C120 160, 130 120, 120 80 C115 50, 100 30, 80 25 C60 20, 40 30, 30 50 C20 70, 25 100, 35 130 C45 160, 60 190, 80 200 C90 205, 95 195, 100 180"
              fill="url(#skinGrad)"
              stroke="#6b5344"
              strokeWidth="2"
            />
            
            {/* Fingers */}
            <ellipse cx="105" cy="60" rx="18" ry="35" fill="url(#skinGrad)" transform="rotate(20, 105, 60)" />
            <ellipse cx="75" cy="45" rx="16" ry="40" fill="url(#skinGrad)" transform="rotate(5, 75, 45)" />
            <ellipse cx="45" cy="50" rx="15" ry="38" fill="url(#skinGrad)" transform="rotate(-10, 45, 50)" />
            <ellipse cx="20" cy="75" rx="14" ry="30" fill="url(#skinGrad)" transform="rotate(-25, 20, 75)" />
            
            {/* Calluses - appear with animation */}
            <g opacity={callusOpacity}>
              {/* Palm callus */}
              <ellipse cx="85" cy="140" rx="25" ry="20" fill="url(#callusGrad)" opacity="0.9" />
              <ellipse cx="85" cy="140" rx="15" ry="12" fill="#f0e6d3" opacity="0.6" />
              
              {/* Finger calluses */}
              <ellipse cx="108" cy="35" rx="12" ry="8" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="75" cy="22" rx="10" ry="7" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="45" cy="28" rx="10" ry="7" fill="url(#callusGrad)" opacity="0.8" />
              <ellipse cx="20" cy="55" rx="9" ry="6" fill="url(#callusGrad)" opacity="0.8" />
              
              {/* Cracks/texture */}
              <path d="M75 135 L95 145" stroke="#b8a890" strokeWidth="1" opacity="0.5" />
              <path d="M80 145 L90 135" stroke="#b8a890" strokeWidth="1" opacity="0.5" />
            </g>
          </g>
        </svg>
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
            fontSize: '56px',
            fontWeight: '900',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            textShadow: `4px 4px 0 ${BLOOD_RED}, -2px -2px 0 ${MILITARY_GREEN}`,
            margin: 0,
            padding: '0 40px'
          }}
        >
          Callous your mind.
        </h1>
      </div>
    </div>
  );
};