import {useCurrentFrame, interpolate, spring} from 'remotion';

const MILITARY_GREEN = '#4a5d23';
const BLOOD_RED = '#8b0000';
const BLACK = '#0a0a0a';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  
  const batteryPulse = spring({
    frame,
    fps: 30,
    config: {damping: 8, stiffness: 60}
  });
  
  const chargeLevel = interpolate(frame, [20, 70], [10, 40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  
  const glowIntensity = interpolate(frame, [20, 90], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at center, ${MILITARY_GREEN}20 0%, ${BLACK} 70%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, ${MILITARY_GREEN}15 1px, transparent 1px),
            linear-gradient(180deg, ${MILITARY_GREEN}15 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }}
      />
      
      {/* Battery container */}
      <div
        style={{
          position: 'relative',
          transform: `scale(${0.9 + batteryPulse * 0.1})`,
          transition: 'transform 0.1s'
        }}
      >
        {/* Battery outline */}
        <div
          style={{
            width: '280px',
            height: '140px',
            border: `6px solid ${MILITARY_GREEN}`,
            borderRadius: '20px',
            position: 'relative',
            background: `${BLACK}88`,
            boxShadow: `0 0 ${30 * glowIntensity}px ${MILITARY_GREEN}44`
          }}
        >
          {/* Battery positive terminal */}
          <div
            style={{
              position: 'absolute',
              right: '-18px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '50px',
              background: MILITARY_GREEN,
              borderRadius: '0 8px 8px 0'
            }}
          />
          
          {/* Battery fill */}
          <div
            style={{
              position: 'absolute',
              left: '8px',
              top: '8px',
              bottom: '8px',
              width: `${chargeLevel * 2.5}px`,
              maxWidth: '256px',
              background: `linear-gradient(180deg, ${BLOOD_RED} 0%, #5a0000 100%)`,
              borderRadius: '12px',
              transition: 'width 0.1s',
              boxShadow: `inset 0 0 20px ${BLOOD_RED}66, 0 0 ${20 * glowIntensity}px ${BLOOD_RED}66`
            }}
          >
            {/* Charge stripes */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 15px,
                  ${BLACK}33 15px,
                  ${BLACK}33 20px
                )`,
                borderRadius: '12px'
              }}
            />
          </div>
          
          {/* 40% text inside battery */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                fontSize: '72px',
                fontWeight: '900',
                color: '#fff',
                textShadow: `0 0 ${15 * glowIntensity}px ${BLOOD_RED}`,
                letterSpacing: '2px'
              }}
            >
              40%
            </span>
          </div>
        </div>
        
        {/* Lightning bolt icon */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translateX(160px)`,
            opacity: glowIntensity
          }}
        >
          <svg width="60" height="80" viewBox="0 0 60 80">
            <path
              d="M35 0 L15 35 L30 35 L20 80 L50 30 L32 30 L45 0 Z"
              fill={BLOOD_RED}
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      
      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${(1 - textOpacity) * 20}px)`,
          padding: '0 60px'
        }}
      >
        <h1
          style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '44px',
            fontWeight: '900',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: `4px 4px 0 ${BLOOD_RED}, -2px -2px 0 ${MILITARY_GREEN}`,
            margin: 0,
            lineHeight: 1.3
          }}
        >
          When you think you're done,
          <br />
          you're only at 40%.
        </h1>
      </div>
    </div>
  );
};