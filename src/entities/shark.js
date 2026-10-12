/**
 * Shark entity with invisible teeth collision hitbox
 */
const sharkData = require('../data/ascii/shark');
const depth = require('../utils/depth');
const { randomObject, randInt } = require('../utils/random');

/**
 * Add a shark to the animation
 */
function addShark(oldEntity, anim, classicMode) {
  // Random direction (0 = right, 1 = left)
  const dir = randInt(0, 1);
  const shark = sharkData[dir];

  let speed = 2;
  let x = -53; // Start offscreen left
  let teethX = -9;

  if (dir === 1) {
    // Left-facing - start offscreen right
    speed *= -1;
    x = anim.screen.width - 2;
    teethX = x + 9;
  }

  // Random Y position
  const maxY = anim.screen.height - (10 + 9);
  const y = randInt(9, maxY);
  const teethY = y + 7;

  // Create invisible "teeth" entity (the collision hitbox)
  const teeth = anim.newEntity({
    type: 'teeth',
    shape: ['*'], // Invisible single character
    position: [teethX, teethY, depth.shark + 1],
    velocity: [speed, 0],
    physical: true,
    // Spawns offscreen with the shark; teethCallback kills it once the shark is gone
    dieOffscreen: false,
    callback: teethCallback
  });

  // Create visible shark entity (non-physical)
  const sharkEntity = anim.newEntity({
    type: 'shark',
    shape: [shark],
    position: [x, y, depth.shark],
    velocity: [speed, 0],
    physical: false,
    dieOffscreen: true,
    callback: sharkCallback,
    callbackArgs: [teeth.id],
    deathCallback: (shark, anim) => sharkDeath(shark, anim, teeth.id, classicMode)
  });

  teeth.sharkId = sharkEntity.id;

  return sharkEntity;
}

/**
 * Shark per-frame callback
 * Move shark and keep teeth synchronized
 */
function sharkCallback(shark, anim, teethId) {
  shark.move();

  // Update teeth position to follow shark
  const teeth = anim.entities.find(e => e.id === teethId);
  if (teeth && teeth.alive) {
    // Teeth position is relative to shark
    const dir = shark.velocity[0] > 0 ? 0 : 1;
    if (dir === 0) {
      // Right-facing: teeth ahead of shark
      teeth.position[0] = shark.position[0] + 44;
      teeth.position[1] = shark.position[1] + 7;
    } else {
      // Left-facing: teeth ahead of shark
      teeth.position[0] = shark.position[0] + 9;
      teeth.position[1] = shark.position[1] + 7;
    }
  }
}

/**
 * Teeth per-frame callback
 */
function teethCallback(teeth, anim) {
  // Teeth movement is handled by shark callback
  // This just ensures teeth die if shark is gone
  const shark = anim.entities.find(e => e.id === teeth.sharkId);
  if (!shark || !shark.alive) {
    teeth.kill();
  }
}

/**
 * Shark death callback
 * Kill associated teeth and spawn new random object
 */
function sharkDeath(shark, anim, teethId, classicMode) {
  // Kill teeth
  const teeth = anim.entities.find(e => e.id === teethId);
  if (teeth && teeth.alive) {
    teeth.kill();
  }

  // Spawn new random object
  randomObject(shark, anim, classicMode);
}

module.exports = {
  addShark,
  sharkCallback,
  teethCallback,
  sharkDeath
};
