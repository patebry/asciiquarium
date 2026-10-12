/**
 * Castle entity - static background decoration
 * Positioned at bottom right of screen on the seabed
 */
const castleData = require('../data/ascii/castle');
const depth = require('../utils/depth');

/**
 * Add castle to the animation
 * Castle is a static background decoration with no movement
 */
function addCastle(anim) {
  // Castle dimensions: 35 chars wide, 13 rows tall
  const castleWidth = 35;
  const castleHeight = 13;

  // Position at bottom right of screen
  // x = screen width - castle width - 32 (matching Perl: width()-32)
  // y = screen height - castle height (bottom of screen)
  const x = anim.screen.width - 32;
  const y = anim.screen.height - castleHeight;

  // Create castle entity
  const castle = anim.newEntity({
    type: 'castle',
    shape: [castleData], // Single frame (not animated)
    position: [x, y, depth.castle],
    velocity: [0, 0], // No movement (completely static)
    physical: false, // Not physical (background decoration)
    dieOffscreen: false, // Never dies
    callback: null, // No per-frame callback needed
    deathCallback: null // Don't respawn
  });

  return castle;
}

module.exports = { addCastle };
