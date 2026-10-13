# Release Notes - v2.0.0-beta.2

## Overview

v2.0.0-beta.2 adds a Node.js implementation of asciiquarium alongside the original Perl version. The Perl version remains the default; the Node.js version is opt-in for testing and feedback.

## Fixed in beta.2

- Startup no longer dumps a blessed terminfo error ("Error on xterm-256color.Setulc") into the terminal.

## What's New

- Node.js port of all 11 entity types: fish (18 variants), shark, whale, monster, big fish, ship, bubble, splat, castle, seaweed, and the water surface.
- 10 FPS animation loop, z-depth layering, color masks, and AABB collision (sharks eat small fish).
- Classic mode (`-c`) for the original fish and monster art.
- Keyboard controls: `q`, `Esc` or `Ctrl+C` to quit, `r` to redraw, `p` to pause.
- Terminal resize redraws the scene.

## Requirements

- Node.js 18 or later. The `blessed` terminal library is installed automatically as an npm dependency.
- macOS or Linux. Windows is not supported (the CLI entry point is a bash script).
- The default Perl implementation still needs Perl 5.40+ and `Term::Animation`.

## How to Use

```bash
# Node.js implementation
ASCIIQUARIUM_IMPL=node npx asciiquarium@beta

# Classic mode
ASCIIQUARIUM_IMPL=node npx asciiquarium@beta -c

# Perl implementation (default)
npx asciiquarium@beta
```

## Known Issues and Gaps

- No automated test suite; verification so far is manual plus a headless run of the animation engine.
- No side-by-side visual comparison with the Perl version yet; rendering may differ in places.
- Not yet benchmarked against Perl, and no long-running (24-hour) memory test.
- On resize, existing background elements (water surface, castle, seaweed) keep their original positions and widths.
- `blessed` may print terminfo warnings to stderr on some terminals.

## Reporting Issues

GitHub Issues: https://github.com/patebry/asciiquarium/issues

Please include your OS, terminal, `$TERM`, Node.js version, and a screenshot if the problem is visual.

## Roadmap

- **v2.0.0** - Make the Node.js version the default after visual comparison and beta feedback.
- **v3.0.0** - Remove the Perl version.
