/**
 * Environment: water surface, castle, seabed decorations, etc.
 */
const depth = require('../utils/depth');
const { addCastle } = require('./castle');

function addEnvironment(anim) {
  // Add simple water line (static, no movement)
  const waterLine = '~'.repeat(anim.screen.width);

  for (let i = 0; i < 4; i++) {
    anim.newEntity({
      type: 'waterline',
      shape: [waterLine],
      position: [0, 6 + i, depth.water_line_segment],
      velocity: [0, 0], // Explicitly no movement
      physical: true,
      dieOffscreen: false,
      callback: null, // No per-frame callback
      deathCallback: null // Don't respawn
    });
  }

  // Add castle (static background decoration)
  addCastle(anim);
}

module.exports = { addEnvironment };
