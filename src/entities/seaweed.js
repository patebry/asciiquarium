/**
 * Seaweed entity (animated background)
 */
const { generateSeaweed } = require('../data/ascii/seaweed');
const depth = require('../utils/depth');
const { randFloat, randInt } = require('../utils/random');

/**
 * Add a seaweed to the animation
 * @param {Entity|null} oldSeaweed - Previous seaweed entity (for respawning)
 * @param {Animation} anim - Animation instance
 * @returns {Entity} The created seaweed entity
 */
function addSeaweed(oldSeaweed, anim) {
  // Random height between 3 and 7 (int(rand(4)) + 3)
  const height = randInt(3, 6);

  // Generate the two animation frames (wave motion)
  const [leftLean, rightLean] = generateSeaweed(height);

  // Create color masks (green color)
  const leftMask = leftLean.replace(/./g, 'g');
  const rightMask = rightLean.replace(/./g, 'g');

  // Random X position (1 to width-2)
  const x = randInt(1, anim.screen.width - 2);

  // Y position at bottom of screen
  const y = anim.screen.height - height;

  // Random animation speed (0.25 to 0.30)
  // This controls how fast the seaweed waves
  const animSpeed = randFloat(0.25, 0.30);

  // Die after 8-12 minutes (480-720 seconds)
  const dieTime = randInt(480000, 720000); // milliseconds

  // Create seaweed entity with two frames
  const seaweed = anim.newEntity({
    type: 'seaweed',
    shape: [
      { body: leftLean, mask: leftMask },
      { body: rightLean, mask: rightMask }
    ],
    position: [x, y, depth.seaweed],
    velocity: [0, 0], // Seaweed doesn't move
    physical: false,
    dieOffscreen: false,
    dieTime: dieTime,
    callback: seaweedCallback,
    callbackArgs: [animSpeed, 0], // [animSpeed, accumulator]
    deathCallback: (seaweed, anim) => addSeaweed(null, anim)
  });

  return seaweed;
}

/**
 * Seaweed per-frame callback
 * Controls animation speed by accumulating time
 * @param {Entity} seaweed - The seaweed entity
 * @param {Animation} anim - Animation instance
 * @param {number} animSpeed - Target animation speed (frames per tick)
 * @param {number} accumulator - Frame accumulator
 */
function seaweedCallback(seaweed, anim, animSpeed, accumulator) {
  // Add animation speed to accumulator
  accumulator += animSpeed;

  // If accumulator >= 1, we should advance to next frame
  if (accumulator >= 1.0) {
    accumulator -= 1.0;
    // The engine will call nextFrame() automatically after this callback,
    // so we don't need to call it manually
  } else {
    // Haven't accumulated enough - stay on current frame
    // Decrement currentFrame to counter the automatic nextFrame() call
    seaweed.currentFrame = (seaweed.currentFrame - 1 + seaweed.frameCount) % seaweed.frameCount;
  }

  // Update accumulator in callbackArgs for next frame
  seaweed.callbackArgs[1] = accumulator;
}

/**
 * Initialize all seaweed instances
 * Creates multiple seaweed across the bottom of the screen
 * @param {Animation} anim - Animation instance
 */
function addAllSeaweed(anim) {
  // Number of seaweed based on screen width (width / 15)
  const seaweedCount = Math.floor(anim.screen.width / 15);

  for (let i = 0; i < seaweedCount; i++) {
    addSeaweed(null, anim);
  }
}

module.exports = { addSeaweed, addAllSeaweed };
