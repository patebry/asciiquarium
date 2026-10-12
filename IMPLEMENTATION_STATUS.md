# Node.js Implementation Status

**Version:** v2.0.0-beta.1 (opt-in via `ASCIIQUARIUM_IMPL=node`; Perl remains the default)

## Implemented

- **Engine:** entity manager with z-depth sorting, per-frame callbacks, AABB collision, death callbacks, pause, resize redraw, keyboard input (`blessed`).
- **Entities:** fish (8 new + 10 classic variants), shark with teeth hitbox, bubble, splat, whale with spout, monster (new and classic), big fish (2 types), ship, castle, seaweed, water surface.
- **Behavior:** random large-object spawn chain, fish respawn, bubbles rise and pop at the surface, classic mode (`-c`).

## Not Yet Done

- Automated tests (unit, integration).
- Visual comparison against the Perl version.
- Performance benchmark against Perl and a long-running memory test.
- Cross-platform validation beyond macOS; Windows is unsupported.
- Re-laying out background elements (water surface, castle, seaweed) on terminal resize.

## Fixed Before Beta

- Bubbles never moved, so they never reached the surface and accumulated without bound (memory growth and slowing frames).
- Each key handler was registered twice, so `p` toggled pause twice and had no effect.
- Terminal resize did not trigger a redraw.

## Criteria for v2.0.0 Stable

1. Visual comparison with the Perl version shows no significant differences.
2. No memory growth in a long-running test.
3. No critical issues reported by beta users.
4. Performance comparable to the Perl version.
