/**
 * Big fish entity with two size types
 * Type 1: 15 lines tall (classic big fish)
 * Type 2: 13 lines tall (alternative big fish)
 */
const bigfishData = require('../data/ascii/bigfish');
const depth = require('../utils/depth');
const { randomObject, randInt } = require('../utils/random');
const { randColor } = require('../data/colors');

/**
 * Add a big fish to the animation
 */
function addBigFish(oldEntity, anim, classicMode) {
  // Choose type based on classic mode
  let fishType;
  if (classicMode) {
    // Classic mode: always use type 1
    fishType = 'type1';
  } else {
    // New mode: 2/3 chance for type 2, 1/3 chance for type 1
    fishType = randInt(0, 2) > 0 ? 'type2' : 'type1';
  }

  const fishData = bigfishData[fishType];

  // Random direction (0 = right, 1 = left)
  const dir = randInt(0, 1);
  const fish = fishData[dir];

  // Determine speed and starting position based on type
  let speed;
  let x;
  let minHeight;

  if (fishType === 'type1') {
    // Type 1: 15 lines tall, speed 3
    speed = 3;
    minHeight = 15;
    if (dir === 1) {
      // Left-facing - start offscreen right
      speed *= -1;
      x = anim.screen.width - 1;
    } else {
      // Right-facing - start offscreen left
      x = -34;
    }
  } else {
    // Type 2: 13 lines tall, speed 2.5
    speed = 2.5;
    minHeight = 14; // Account for slight extra space
    if (dir === 1) {
      // Left-facing - start offscreen right
      speed *= -1;
      x = anim.screen.width - 1;
    } else {
      // Right-facing - start offscreen left
      x = -33;
    }
  }

  // Random Y position (between water surface at 9 and bottom minus fish height)
  const maxHeight = 9;
  const bottomHeight = anim.screen.height - minHeight;
  const y = randInt(maxHeight, bottomHeight - 1);

  // Apply random colors to the mask
  const colorMask = randColor(fish.mask);

  // Create big fish entity
  const bigfishEntity = anim.newEntity({
    type: 'bigfish',
    shape: [{
      body: fish.body,
      mask: colorMask
    }],
    position: [x, y, depth.shark], // Use shark depth (same as Perl)
    velocity: [speed, 0],
    physical: false,
    dieOffscreen: true,
    callback: bigfishCallback,
    deathCallback: (bigfish, anim) => bigfishDeath(bigfish, anim, classicMode)
  });

  return bigfishEntity;
}

/**
 * Big fish per-frame callback
 * Move big fish
 */
function bigfishCallback(bigfish, anim) {
  bigfish.move();
}

/**
 * Big fish death callback
 * Spawn new random object
 */
function bigfishDeath(bigfish, anim, classicMode) {
  // Spawn new random object to replace big fish
  randomObject(bigfish, anim, classicMode);
}

module.exports = {
  addBigFish,
  bigfishCallback,
  bigfishDeath
};
