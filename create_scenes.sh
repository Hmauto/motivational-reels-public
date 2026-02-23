#!/bin/bash

# Create scenes for videos 7-10 using a template approach

for video_num in 07 08 09 10; do
  dir="video-$video_num/src/scenes"
  mkdir -p "$dir"
  
  for scene in 1 2 3 4 5; do
    cat > "$dir/Scene$scene.tsx" << 'EOF'
import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {AbsoluteFill} from 'remotion';

export const SceneSCENE_NUM: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const textReveal = spring({fps, frame: frame - 5, config: {damping: 150}});
  const whiteGlow = interpolate(frame % 25, [0, 12, 25], [0.4, 1, 0.4]);
  
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: \`radial-gradient(circle, rgba(255,215,0,\${0.2 * whiteGlow}), transparent 70%)\`,
        filter: 'blur(100px)',
      }} />
      
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 2,
          height: 700,
          background: \`linear-gradient(180deg, transparent, rgba(255,255,255,\${0.3 * whiteGlow}), transparent)\`,
          transform: \`rotate(\${frame * 0.3 + i * 45}deg)\`,
        }} />
      ))}
      
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        color: '#fff',
        textAlign: 'center',
        opacity: textReveal,
        textShadow: \`0 0 60px rgba(255,255,255,\${0.6 * whiteGlow})\`,
      }}>
        Scene SCENE_NUM
      </div>
    </AbsoluteFill>
  );
};
EOF
    sed -i "s/SCENE_NUM/$scene/g" "$dir/Scene$scene.tsx"
  done
  echo "Created scenes for video-$video_num"
done
