/**
 * Z-depth constants for entity layering
 * Range: 0 (foreground) to 22 (background)
 * Higher z-value = rendered first = appears behind
 */
module.exports = {
  // Foreground (closest to viewer)
  bubble: 0,
  splat: 1,

  // Fish layer
  fish_start: 3,
  fish_end: 20,

  // Large entities
  shark: 5,
  whale: 7,
  monster: 10,
  bigfish: 12,

  // Mid-ground
  ship: 2,

  // Background
  seaweed: 21,
  castle: 22,
  water_line_segment: 22,
  water_gap: 22
};
