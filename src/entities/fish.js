/**
 * Fish entity spawning and management
 */
const { randColor } = require('../data/colors');
const depth = require('../utils/depth');
const { randFloat, randInt } = require('../utils/random');

// Lazy-loaded to avoid circular dependencies
let addBubble, addSplat;

/**
 * Add a fish to the animation
 */
function addFish(oldFish, anim, classicMode) {
  // Load appropriate fish set
  const fishImages = classicMode ?
    require('../data/ascii/fish-old') :
    require('../data/ascii/fish-new');

  // Random fish selection (Perl: int(rand($#fish_image/2)))
  const fishNum = randInt(0, fishImages.length - 1);
  const fishData = fishImages[fishNum];

  // Apply random colors to mask
  const colorMask = randColor(fishData.mask);

  // Speed: rand(2) + 0.25 -> range 0.25-2.25
  let speed = randFloat(0.25, 2.25);

  // Direction: odd fish numbers face left (negative speed)
  if (fishNum % 2 === 1) {
    speed *= -1;
  }

  // Random depth between fish_start (3) and fish_end (20)
  const z = randInt(depth.fish_start, depth.fish_end);

  // Calculate fish dimensions
  const lines = fishData.body.split('\n');
  const fishHeight = lines.length;
  const fishWidth = Math.max(...lines.map(line => line.length));

  // Random Y position (between 9 and screen.height - fish.height)
  const minY = 9;
  const maxY = Math.max(minY, anim.screen.height - fishHeight - 1);
  const y = randInt(minY, maxY);

  // X position based on direction
  let x;
  if (speed < 0) {
    // Swimming left - start at right edge
    x = anim.screen.width - 2;
  } else {
    // Swimming right - start at left edge
    x = 0;
  }

  // Create fish entity
  const fish = anim.newEntity({
    type: 'fish',
    shape: [{
      body: fishData.body,
      mask: colorMask
    }],
    position: [x, y, z],
    velocity: [speed, 0],
    physical: true,
    dieOffscreen: true,
    callback: fishCallback,
    collisionCallback: fishCollisionHandler,
    deathCallback: fishDeathCallback
  });

  return fish;
}

/**
 * Fish per-frame callback
 */
function fishCallback(fish, anim) {
  // Move fish
  fish.move();

  // 3% chance to spawn a bubble per frame
  if (Math.random() < 0.03) {
    if (!addBubble) {
      addBubble = require('./bubble').addBubble;
    }
    const [x, y, z] = fish.position;
    const { width, height } = fish.getDimensions();

    // Bubble spawns from fish center
    const bubbleX = x + Math.floor(width / 2);
    const bubbleY = y + Math.floor(height / 2);

    addBubble(null, anim, bubbleX, bubbleY);
  }
}

/**
 * Fish collision handler
 */
function fishCollisionHandler(fish, anim, collisions) {
  for (const other of collisions) {
    // Only small fish (height <= 5) get eaten by shark teeth
    if (other.type === 'teeth' && fish.getDimensions().height <= 5) {
      if (!addSplat) {
        addSplat = require('./splat').addSplat;
      }
      const [x, y, z] = fish.position;

      // Create blood splat at collision point
      addSplat(null, anim, other.position[0], other.position[1], z);

      // Kill fish
      fish.kill();
      break;
    }
  }
}

/**
 * Fish death callback
 */
function fishDeathCallback(fish, anim) {
  // Spawn a new fish to replace this one
  const classicMode = anim.classicMode || false;
  addFish(fish, anim, classicMode);
}

module.exports = {
  addFish,
  fishCallback,
  fishCollisionHandler,
  fishDeathCallback
};
