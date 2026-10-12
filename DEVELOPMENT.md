# Asciiquarium Development Guide

## Quick Start

### Running the Node.js version

```bash
# Install dependencies
npm install

# Run with Node.js implementation
npm run start:node

# Run with Perl implementation (original)
npm run start:perl

# Or use environment variable directly
ASCIIQUARIUM_IMPL=node npm start
```

### Development Workflow

1. **Make changes** to files in `src/`
2. **Test immediately** with `npm run start:node`
3. **No build step required** - Node.js runs directly

### Project Structure

```
asciiquarium/
├── asciiquarium              # Original Perl script (DO NOT MODIFY)
├── run.sh                    # Feature flag dispatcher
├── package.json              # NPM configuration
├── src/                      # Node.js implementation
│   ├── index.js             # CLI entry point
│   ├── asciiquarium.js      # Main application class
│   ├── engine/              # Core animation engine
│   │   ├── Animation.js     # Entity manager
│   │   ├── Entity.js        # Entity lifecycle
│   │   └── Screen.js        # Blessed wrapper
│   ├── entities/            # Entity implementations
│   │   ├── fish.js          # Fish spawning
│   │   ├── shark.js         # Shark with teeth
│   │   ├── bubble.js        # Bubble animation
│   │   ├── splat.js         # Blood splat
│   │   └── ...              # More entities
│   ├── data/
│   │   ├── ascii/           # ASCII art data
│   │   └── colors.js        # Color utilities
│   └── utils/               # Helpers
│       ├── depth.js         # Z-depth constants
│       ├── collision.js     # Collision detection
│       └── random.js        # Random spawning
```

## Adding New Entities

### Step 1: Extract ASCII Art from Perl

Find the entity in the Perl source:

```bash
grep -A 50 "sub add_whale" asciiquarium
```

### Step 2: Create ASCII Art Data File

Create `src/data/ascii/whale.js`:

```javascript
module.exports = [
  {
    body: `ASCII art here`,
    mask: `Color mask here`
  }
];
```

### Step 3: Create Entity Module

Create `src/entities/whale.js`:

```javascript
const whaleData = require('../data/ascii/whale');
const depth = require('../utils/depth');
const { randomObject } = require('../utils/random');

function addWhale(oldEntity, anim, classicMode) {
  // Spawning logic
  const whale = anim.newEntity({
    type: 'whale',
    shape: whaleData,
    position: [x, y, depth.whale],
    velocity: [speed, 0],
    callback: whaleCallback,
    deathCallback: (e, a) => randomObject(e, a, classicMode)
  });

  return whale;
}

function whaleCallback(whale, anim) {
  whale.move();
  // Per-frame logic
}

module.exports = { addWhale };
```

### Step 4: Add to Random Object Pool

Update `src/utils/random.js` to include the new entity in the randomObjectFunctions array.

## Color Mask System

The color mask uses digits 1-9 to represent different parts of the entity:

- **1-9**: Random colors (chosen from: c, C, r, R, y, Y, b, B, g, G, m, M)
- **4**: Always becomes W (white) - used for eyes

Example:
```javascript
{
  body: `>=_('>`,
  mask: `663745`
}
```

This becomes: body color (6), body (6), tail (3), mouth (7), eye (4 → W), mouth (5)

## Animation Timing

**CRITICAL**: The animation loop must run at exactly **10 FPS** (100ms per frame) to match the Perl version.

```javascript
setInterval(() => {
  if (!this.paused) {
    this.anim.animate();
  }
}, 100);  // 100ms = 10 FPS
```

## Z-Depth Layering

Entities are rendered in order of **decreasing z-depth** (higher z = background):

- **0-2**: Foreground (bubbles, splats, ship)
- **3-20**: Fish layer (random depths for variety)
- **21-22**: Background (seaweed, castle, water surface)

See `src/utils/depth.js` for all depth constants.

## Collision Detection

Physical entities can collide. Two systems:

### 1. Entity-to-Entity Collision

```javascript
const fish = anim.newEntity({
  physical: true,
  collisionCallback: (entity, anim, collisions) => {
    // Handle collision
  }
});
```

### 2. Invisible Hitboxes

The shark uses this pattern:

```javascript
// Visible shark (non-physical)
const shark = anim.newEntity({
  type: 'shark',
  physical: false
});

// Invisible teeth (physical hitbox)
const teeth = anim.newEntity({
  type: 'teeth',
  shape: '*',  // Single invisible character
  physical: true
});
```

## Testing

### Manual Testing

Run both versions side-by-side:

```bash
# Terminal 1: Perl version
ASCIIQUARIUM_IMPL=perl npm start

# Terminal 2: Node.js version
ASCIIQUARIUM_IMPL=node npm start
```

Compare visually for pixel-perfect match.

### Keyboard Controls

- **q**: Quit
- **r**: Redraw (useful for testing)
- **p**: Pause/unpause (useful for inspecting frame)

### Debug Tips

1. **Check entity count**: Add logging to `Animation.animate()`
2. **Check collisions**: Log in `collisionCallback`
3. **Check death conditions**: Log in `entity.shouldDie()`
4. **Check rendering**: Add borders to entities temporarily

## Common Issues

### Fish not appearing?

- Check depth is between `depth.fish_start` (3) and `depth.fish_end` (20)
- Check Y position is between 9 and `screen.height`
- Check entity isn't dying immediately offscreen

### Collisions not working?

- Ensure both entities have `physical: true`
- Check collision boxes with `entity.getCollisionBox()`
- Verify z-depth difference isn't too large (depth range in Perl)

### Colors wrong?

- Check mask digits are 1-9 (and 4 for eyes)
- Verify `randColor()` is called on the mask
- Check color map in `Screen.js`

### Performance issues?

- Profile with `node --inspect`
- Check entity count with `anim.entities.length`
- Optimize `Screen.renderWithMask()` if needed

## Release Checklist

Before marking a version ready:

- [ ] All entities implemented
- [ ] Visual regression tests pass
- [ ] No console errors or warnings
- [ ] No memory leaks (24-hour test)
- [ ] Cross-platform testing (macOS, Linux)
- [ ] README updated
- [ ] IMPLEMENTATION_STATUS.md updated
- [ ] Version bumped in package.json and src/index.js

## Git Workflow

```bash
# Make changes
git add .
git commit -m "feat: add whale entity with animated spout"

# Push to branch
git push origin node-rewrite

# Create PR when ready
```

## Questions?

- Check `IMPLEMENTATION_STATUS.md` for current progress
- Review Perl source for reference behavior
- Open an issue on GitHub for bugs
