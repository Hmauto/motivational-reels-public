# 🎬 Motivational Reels Generator

A complete Remotion-based system for generating AI-powered motivational video reels with voiceover, animations, and music.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate voiceovers (requires ElevenLabs API key)
./scripts/generate-voices.sh

# Build all videos
./scripts/build-all.sh

# Build single video
cd video-01-just-do-it && npm run build
```

## 📁 Repository Structure

```
motivational-reels/
├── video-01-just-do-it/          # "Yesterday you said tomorrow"
├── video-02-five-second/         # "5... 4... 3... 2... 1..."
├── video-03-impossible/          # "Impossible is nothing"
├── video-04-rock/                # "Be the hardest worker"
├── video-05-jobs/                # "Stay hungry, stay foolish"
├── video-06-goggins/             # "Callous your mind"
├── video-07-jocko/               # "Discipline equals freedom"
├── video-08-tony/                # "Raise your standards"
├── video-09-eric/                # "You owe you"
├── video-10-les/                 # "It's possible"
├── shared-music/                 # Background music tracks
├── scripts/                      # Automation scripts
└── templates/                    # Reusable components
```

## 🎨 Visual Features

All videos include:
- ✅ **White/bright glow effects** - Light rays, particles, text glows
- ✅ **Rotating light rays** - Dynamic background animations
- ✅ **Floating particles** - Sparkle effects with glow
- ✅ **Spring physics** - Natural, smooth animations
- ✅ **Bold typography** - 56-80px text with glow shadows
- ✅ **Iconic imagery** - Custom SVG illustrations
- ✅ **30fps, 1080x1920** - Vertical video format

## 🎭 Video Themes

| # | Video | Theme | Primary Color | Speaker Style |
|---|-------|-------|---------------|---------------|
| 1 | Just Do It | Action/No Excuses | Orange `#ff6b35` | Shia LaBeouf |
| 2 | Five Second Rule | Taking Action | Blue `#3b82f6` | Mel Robbins |
| 3 | Impossible | Breaking Limits | Gold `#ffd700` | Muhammad Ali |
| 4 | Rock | Hard Work | Red `#e94560` | Dwayne Johnson |
| 5 | Jobs | Following Passion | Purple `#8b5cf6` | Steve Jobs |
| 6 | Goggins | Mental Toughness | Dark Red `#7f1d1d` | David Goggins |
| 7 | Jocko | Discipline | Green `#22c55e` | Jocko Willink |
| 8 | Tony | High Standards | Pink `#ec4899` | Tony Robbins |
| 9 | Eric | Accountability | Yellow `#eab308` | Eric Thomas |
| 10 | Les | Possibility | Cyan `#06b6d4` | Les Brown |

## 🎵 Music

Background music should be:
- Epic orchestral motivation
- Cinematic inspirational
- 20-30% volume under voice

Recommended sources:
- YouTube Audio Library
- Epidemic Sound
- Artlist
- Free Music Archive

## 📝 Scripts

Each video follows this structure:

```
Scene 1 (3s): Hook - Attention grabbing statement
Scene 2 (3s): Problem - Relatable struggle
Scene 3 (4s): Turning Point - The realization
Scene 4 (3s): Solution - Call to action
Scene 5 (3s): Climax - Powerful closing
```

## 🔧 Customization

### Changing Colors
Edit the gradient and accent colors in each scene file:
```tsx
// In Scene1.tsx
background: 'linear-gradient(180deg, #0a0a0f 0%, #1a1a3e 100%)',
accentColor: '#ff6b35', // Change this
```

### Adding Voiceover
1. Get ElevenLabs API key
2. Run: `./scripts/generate-voices.sh`
3. Or manually add MP3 files to `public/voice-1.mp3` through `voice-5.mp3`

### Changing Text
Edit the script in each video's `src/scenes/SceneX.tsx`:
```tsx
<div style={{...}}>
  Your custom text here
</div>
```

## 🎯 Building Videos

### Build All Videos
```bash
./scripts/build-all.sh
```

### Build Single Video
```bash
cd video-01-just-do-it
npm install
npm run build
```

Output will be in `out/` directory.

## 📦 Dependencies

- [Remotion](https://remotion.dev) - React video generation
- React 18
- TypeScript 5
- FFmpeg (for audio mixing)

## 🔑 API Keys

Create `.env` file:
```
ELEVENLABS_API_KEY=your_key_here
```

## 📄 License

MIT - Feel free to use for personal or commercial projects.

## 🙏 Credits

Inspired by:
- Shia LaBeouf "Just Do It"
- Mel Robbins "The 5 Second Rule"
- Muhammad Ali
- Dwayne "The Rock" Johnson
- Steve Jobs
- David Goggins
- Jocko Willink
- Tony Robbins
- Eric Thomas
- Les Brown

---

**Created with ❤️ using Remotion**