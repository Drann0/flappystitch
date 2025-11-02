# Custom Assets Guide

## How to Add Your Custom Bird

1. **Prepare your bird image:**
   - Recommended size: 40x40 to 60x60 pixels
   - Format: PNG with transparent background (best)
   - Name it: `custom-bird.png`

2. **Add to project:**
   - Place `custom-bird.png` in this folder (`client/public/`)
   - The game will automatically detect and use it

3. **Fallback:**
   - If no custom bird is provided, the game uses a default golden bird

## How to Add Background Music

1. **Prepare your music file:**
   - Format: MP3, OGG, or WAV
   - Name it: `game-music.mp3`

2. **Add to project:**
   - Place `game-music.mp3` in this folder (`client/public/`)
   - The audio will loop during gameplay

3. **Note:**
   - Players can mute/unmute using the audio button in-game
   - The audio starts when they first tap to play

## Current Setup

- ✅ Custom bird sprite support ready
- ✅ Background music integration ready
- 🎵 Add your `game-music.mp3` file here
- 🐦 Add your `custom-bird.png` file here

## Testing Your Assets

After adding your files:
1. Refresh the game page
2. Your bird should appear in the game
3. Music should play when you start
4. Use the mute button to toggle audio
