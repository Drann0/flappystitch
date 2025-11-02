# Flappy Bird Game Website Design Guidelines

## Design Approach

**Reference-Based Approach**: Retro arcade game aesthetic inspired by classic Flappy Bird with modern polish. Think pixel-perfect precision meets contemporary web design - clean interfaces with playful, game-inspired elements.

## Core Design Principles

1. **Retro Gaming Aesthetic**: Embrace the classic 8-bit/16-bit era visual language with modern refinement
2. **Focus Over Flourish**: Minimal distractions - the game is the star
3. **Immediate Clarity**: Every UI element should communicate its purpose instantly
4. **Playful Precision**: Crisp edges, clear hierarchy, deliberate spacing

---

## Typography

**Font System** (via Google Fonts CDN):
- **Primary**: 'Press Start 2P' - pixel-style font for headings, labels, scores (retro gaming feel)
- **Secondary**: 'Inter' or 'Roboto' - clean sans-serif for instructions and smaller text (legibility)

**Hierarchy**:
- Game Title/Logo: text-4xl to text-6xl, Press Start 2P, tracking-wider
- Code Input Label: text-xl, Press Start 2P
- Instructions/Help Text: text-sm to text-base, Inter/Roboto
- Score Display: text-3xl to text-5xl, Press Start 2P, tabular-nums
- Buttons: text-lg, Press Start 2P for primary actions, Inter for secondary

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** (p-2, m-4, gap-6, space-y-8, etc.)

**Page 1 - Code Entry**:
- Centered layout with max-w-md container
- Full viewport height (min-h-screen) with flexbox centering
- Card-based design with generous padding (p-8 to p-12)
- Input field prominence with clear visual focus states

**Page 2 - Game Canvas**:
- Canvas-centered layout (mx-auto)
- Fixed game dimensions (e.g., 400x600px or 375x667px for mobile-friendly)
- UI elements positioned outside or overlaying canvas edges
- Score counter: top-right or top-center positioning
- Game over overlay: full canvas coverage with backdrop blur

---

## Component Library

### Page 1: Code Entry Screen

**Main Container**:
- Centered card with subtle elevation (shadow-2xl)
- Rounded corners (rounded-2xl)
- Backdrop effect or solid background treatment
- Padding: p-8 md:p-12

**Game Title/Logo**:
- Large, attention-grabbing typography
- Optional pixel-art style decorative elements (e.g., 8-bit bird icon from Font Awesome or Material Icons)
- Margin below: mb-8 to mb-12

**Code Input Section**:
- Label above input: "Enter Access Code" or similar
- Input field: Large text size (text-xl), centered text, rounded-lg, border-2
- Focus states: Enhanced border, subtle glow effect (ring-4)
- Padding: px-6 py-4
- Margin: my-6

**Submit Button**:
- Full width or centered, prominent size
- Pixel-style borders or retro arcade button aesthetic
- Padding: px-8 py-4
- Hover state: slight transform or shadow increase
- Clear visual feedback on click

**Error/Success Messages**:
- Small text below input (text-sm)
- Color-coded feedback (avoid color mentions per guidelines, but position for error state)

### Page 2: Game Interface

**Game Canvas**:
- Fixed dimensions canvas element
- Crisp pixel rendering (image-rendering: pixelated or crisp-edges in CSS)
- Border treatment (border-4) for retro arcade frame look
- Centered: mx-auto

**Score Display (Overlay on Canvas)**:
- Positioned: top-center or top-right of canvas
- Large, readable typography (text-4xl)
- Slight text shadow for legibility over dynamic backgrounds
- Padding: p-4

**Control Instructions (Below Canvas)**:
- Small, unobtrusive text (text-sm)
- Centered alignment
- Margin: mt-4
- Example: "Press SPACE or Click to Flap"

**Game Over Overlay**:
- Full canvas overlay with backdrop-blur effect
- Centered content vertically and horizontally
- Display: Final score (text-5xl), high score (text-xl)
- Restart button (px-8 py-4, prominent)
- Return to menu button (px-6 py-3, secondary)
- Spacing between elements: space-y-6

**Audio Control (Optional but Recommended)**:
- Small icon button (w-10 h-10) positioned top-left of canvas
- Mute/unmute toggle
- Icon from Heroicons or Font Awesome (volume-up/volume-off)

---

## Icons

**Library**: Heroicons via CDN (outline and solid variants)

**Usage**:
- Lock icon for code entry screen
- Play/pause icons for audio controls
- Trophy icon for high score display
- Refresh icon for restart button

---

## Animations

**Use Sparingly**:
- Page transition: Fade-in effect (duration-300, ease-in-out)
- Code input focus: Subtle scale or glow animation
- Button interactions: Micro-transforms (scale-105 on hover)
- Game over overlay: Fade-in with backdrop blur
- NO complex animations during gameplay to maintain performance

---

## Responsive Considerations

- Canvas scales appropriately for mobile (max-width constraints)
- Code entry page: Single column, full mobile optimization
- Touch controls: Tap anywhere on canvas to flap on mobile
- Minimum touch target sizes: 48px x 48px for buttons

---

## Accessibility

- High contrast between text and backgrounds
- Clear focus indicators on all interactive elements (ring-2 ring-offset-2)
- Keyboard navigation: Enter to submit code, Space to play/flap
- Alt text for all decorative icons
- ARIA labels for game state changes (score updates, game over)

---

## Images

**No large hero images required** - this is a game interface focused on the canvas.

**Custom Bird Asset**:
- User provides custom bird sprite
- Display size: approximately 40x40px to 60x60px within game canvas
- Sprite should support animation frames if desired (flapping wings)

**Background Treatment**:
- Page 1: Subtle pattern or gradient (non-distracting)
- Page 2 (Game Canvas): Custom background within canvas (sky gradient, clouds, parallax layers)
- Consider pixel-art cloud sprites or simple geometric patterns

---

## Content Strategy

**Page 1**:
- Title/Logo
- Brief tagline or flavor text (e.g., "Tap to Fly, Dodge to Survive")
- Code input with clear label
- Submit button
- Optional: High score teaser or instruction preview

**Page 2**:
- Game canvas (primary focus)
- Live score counter
- Control instructions (subtle, below canvas)
- Game over state with scores and replay options
- Background music player (user-provided audio file)

---

## Key Differentiators

- **Pixel-Perfect Retro UI**: Not generic modern design - embrace the arcade aesthetic
- **Clean Game Focus**: No marketing fluff, pure gaming experience
- **Dual-Purpose Design**: Code gate adds exclusivity/mystery, game delivers on promise
- **Audio Integration**: Background music enhances immersion (loop, volume control)
- **Score Persistence**: Display current and high scores prominently

This design balances nostalgic gaming charm with contemporary usability, creating an engaging, focused experience that respects the classic Flappy Bird aesthetic while feeling fresh and polished.