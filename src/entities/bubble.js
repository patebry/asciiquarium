/**
 * Bubble entity
 */
const bubbleFrames = require('../data/ascii/bubble');
const depth = require('../utils/depth');

/**
 * Add a bubble to the animation
 */
function addBubble(fish, anim, x = null, y = null) {
  // If spawned from fish, calculate position
  let bubbleX, bubbleY, bubbleZ;

  if (fish && x === null && y === null) {
    const [fishX, fishY, fishZ] = fish.position;
    const { width, height } = fish.getDimensions();

    // Position bubble at fish center
    bubbleX = fishX + Math.floor(width / 2);
    bubbleY = fishY + Math.floor(height / 2);
    bubbleZ = fishZ - 1; // Bubble goes on top of fish
  } else {
    // Manual position provided
    bubbleX = x;
    bubbleY = y;
    bubbleZ = depth.bubble;
  }

  // Create bubble entity
  const bubble = anim.newEntity({
    type: 'bubble',
    shape: bubbleFrames.map(frame => ({
      body: frame,
      mask: frame.replace(/./g, 'C') // Cyan color
    })),
    position: [bubbleX, bubbleY, bubbleZ],
    velocity: [0, -1], // Float upward
    physical: true,
    dieOffscreen: true,
    callback: bubbleCallback,
    collisionCallback: bubbleCollisionHandler
  });

  return bubble;
}

function bubbleCallback(bubble) {
  bubble.move();
}

/**
 * Bubble collision handler
 * Bubbles die when they hit the water surface
 */
function bubbleCollisionHandler(bubble, anim, collisions) {
  for (const other of collisions) {
    if (other.type === 'waterline') {
      bubble.kill();
      break;
    }
  }
}

module.exports = {
  addBubble,
  bubbleCollisionHandler
};
