# Asciiquarium

**Asciiquarium** is a fun and whimsical terminal-based aquarium simulation rendered in ASCII art. Watch fish, whales, sharks, and other marine creatures swim across your terminal in a delightful, retro-styled display.

> Kirk Baucom's original [Asciiquarium](https://robobunny.com/projects/asciiquarium/html/) project inspired this fork.

## Installation and Usage

You can run Asciiquarium directly using `npx` without needing to install it globally:

```bash
npx asciiquarium
```

Alternatively, you can install Asciiquarium globally using npm:

```bash
npm install -g asciiquarium
```

Then run the following command to start the simulation:

```bash
asciiquarium
```

### Keyboard Controls

- `q` - Quit
- `r` - Redraw screen
- `p` - Pause/unpause animation
- `Ctrl+C` - Quit

### Options

- `-c` or `--classic` - Use classic fish and monsters (old ASCII art from original)
- `-h` or `--help` - Show help message

## Node.js Rewrite (v2.0 Beta)

Version 2.0 introduces a **pure Node.js implementation** of asciiquarium! It needs only Node.js 18+ (no Perl or CPAN modules); its one npm dependency, `blessed`, installs automatically.

### Why the Rewrite?

The original Perl version required users to manually install:
- Perl 5.40+
- Term::Animation CPAN module

This created friction for users who just wanted to run `npx asciiquarium` and have it work. The Node.js version makes this a reality.

### Implementation Toggle

By default, the package still uses the Perl implementation for stability. To opt into the new Node.js version:

```bash
# Using environment variable
ASCIIQUARIUM_IMPL=node npx asciiquarium

# Or use the npm script
npm run start:node
```

### Feature Parity

The Node.js version is a **faithful port** with complete visual and behavioral fidelity:

- [x] All 18 fish variants (8 new + 10 old)
- [x] Shark with collision detection
- [x] Whale with animated water spout
- [x] Monster variants (new and classic)
- [x] Big fish (2 types)
- [x] Ship sailing across surface
- [x] Castle background decoration
- [x] Seaweed with wave animation
- [x] Bubbles spawning from fish
- [x] Blood splat effects
- [x] 10 FPS animation matching original
- [x] Color masking system (random colors, white eyes)
- [x] Classic mode (`-c` flag)
- [x] Environment with water surface

**Status:** All core entities are implemented. Visual regression testing is pending to ensure pixel-perfect match with Perl version.

### What's Implemented

**11 Entity Types:**
1. **Fish** - 18 variants with swimming animations
2. **Shark** - Predator with collision detection
3. **Whale** - Large creature with animated water spout
4. **Monster** - Sea monster with classic/new variants
5. **Big Fish** - Two large fish types
6. **Ship** - Sailing vessel on water surface
7. **Bubble** - Rising bubbles from fish
8. **Splat** - Blood splat collision effect
9. **Castle** - Static background decoration
10. **Seaweed** - Waving underwater plants
11. **Environment** - Water surface and background

**Features:**
- Full animation system with z-depth sorting
- Collision detection (sharks eat fish, bubbles pop at surface)
- Random object spawning chain
- Entity death/respawn callbacks
- Keyboard controls (quit, pause, redraw)
- Terminal resize handling
- Classic mode for nostalgic ASCII art

### Roadmap

- **v2.0.0-beta.1** (current): Opt-in Node.js version via flag, all entities complete
- **v2.0.0**: Visual regression testing complete, switch default to Node.js
- **v3.0.0**: Remove Perl entirely (full migration)

### Known Limitations

- Visual regression testing not yet complete (manual testing shows good fidelity)
- Performance not yet benchmarked against Perl version
- No formal test suite (unit/integration tests)

## Dependencies

### Node.js Version (v2.0+)
- Node.js v18 or later
- `blessed` library (installed automatically)

### Perl Version (v1.x)
- Perl version 5.40 or later
- `Term::Animation` CPAN module

## Contributing

Contributions are welcome! Areas of focus:
- Visual regression testing framework
- Performance optimization
- Cross-platform testing
- Bug reports and fixes

## License

This project is licensed under the GPL-2.0 License - see the [LICENSE](LICENSE) file for details.
