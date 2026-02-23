#!/bin/bash
# Generate voiceovers using ElevenLabs API

set -e

ELEVENLABS_API_KEY="${ELEVENLABS_API_KEY:-}"
VOICE_ID="${VOICE_ID:-pNInz6obpgDQGcFmaJgB}"  # Adam - deep, powerful voice

if [ -z "$ELEVENLABS_API_KEY" ]; then
  echo "⚠️  ELEVENLABS_API_KEY not set"
  echo "Set it with: export ELEVENLABS_API_KEY=your_key"
  exit 1
fi

# Voice scripts for each video
declare -A SCRIPTS
declare -A VOICE_FILES

# Video 1: Just Do It
SCRIPTS[video-01-just-do-it-1]="Yesterday you said tomorrow."
SCRIPTS[video-01-just-do-it-2]="Stop making excuses."
SCRIPTS[video-01-just-do-it-3]="Your dreams won't chase themselves."
SCRIPTS[video-01-just-do-it-4]="Just do it. Right now."
SCRIPTS[video-01-just-do-it-5]="Make it happen."

# Video 2: Five Second Rule
SCRIPTS[video-02-five-second-1]="Five... Four... Three... Two... One..."
SCRIPTS[video-02-five-second-2]="If you don't move in five seconds..."
SCRIPTS[video-02-five-second-3]="Your brain will kill the idea."
SCRIPTS[video-02-five-second-4]="Count down. Take action."
SCRIPTS[video-02-five-second-5]="Change your life."

# Video 3: Impossible
SCRIPTS[video-03-impossible-1]="Impossible is just a word."
SCRIPTS[video-03-impossible-2]="Limits exist only in your mind."
SCRIPTS[video-03-impossible-3]="Champions aren't made in gyms."
SCRIPTS[video-03-impossible-4]="They're made from something deep inside."
SCRIPTS[video-03-impossible-5]="Impossible is nothing."

echo "🎙️  Generating voiceovers with ElevenLabs..."
echo ""

for key in "${!SCRIPTS[@]}"; do
  video=$(echo "$key" | cut -d'-' -f1-3)
  scene=$(echo "$key" | cut -d'-' -f4)
  text="${SCRIPTS[$key]}"
  output_dir="$video/public"
  output_file="$output_dir/voice-$scene.mp3"
  
  mkdir -p "$output_dir"
  
  echo "📢 $video - Scene $scene"
  echo "   Text: \"$text\""
  
  # Generate voice using ElevenLabs API
  curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" \
    -H "Accept: audio/mpeg" \
    -H "Content-Type: application/json" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -d "{
      \"text\": \"$text\",
      \"model_id\": \"eleven_monolingual_v1\",
      \"voice_settings\": {
        \"stability\": 0.5,
        \"similarity_boost\": 0.75
      }
    }" \
    --output "$output_file" 2>/dev/null
  
  if [ -f "$output_file" ]; then
    echo "   ✅ Saved to $output_file"
  else
    echo "   ❌ Failed to generate"
  fi
  echo ""
done

echo "🎉 Voice generation complete!"