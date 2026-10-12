/**
 * Blood splat effect (when shark eats fish)
 */
const splatFrames = require('../data/ascii/splat');
const depth = require('../utils/depth');

/**
 * Add a blood splat effect
 */
function addSplat(deadEntity, anim, x, y, z) {
  // Create splat entity
  const splat = anim.newEntity({
    type: 'splat',
    shape: splatFrames.map(frame => ({
      body: frame,
      mask: frame.replace(/[^  \n]/g, 'R') // Red color
    })),
    position: [x - 4, y - 2, z - 2], // Offset from collision point
    velocity: [0, 0], // Stationary
    physical: false,
    dieOffscreen: false,
    dieFrame: 15 // Die after 15 frames (1.5 seconds at 10 FPS)
  });

  return splat;
}

module.exports = {
  addSplat
};
