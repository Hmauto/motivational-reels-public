#!/bin/bash
# Build all motivational reel videos

set -e

echo "🎬 Building Motivational Reels..."
echo ""

for dir in video-*/; do
  if [ -d "$dir" ]; then
    echo "📁 Building $dir..."
    cd "$dir"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
      echo "  Installing dependencies..."
      npm install > /dev/null 2>&1
    fi
    
    # Build video
    echo "  Rendering video..."
    npm run build > /dev/null 2>&1 || echo "  ⚠️  Build failed for $dir"
    
    cd ..
    echo "  ✅ Done"
    echo ""
  fi
done

echo "🎉 All videos built!"
echo "Check each video's out/ directory for the rendered MP4."