/**
 * Ship entity - sails across the water surface
 */
const shipData = require('../data/ascii/ship');
const depth = require('../utils/depth');
const { randomObject, randInt } = require('../utils/random');

/**
 * Add a ship to the animation
 */
function addShip(oldEntity, anim, classicMode) {
  // Random direction (0 = right, 1 = left)
  const dir = randInt(0, 1);
  const ship = shipData[dir];

  let speed = 1; // Slow speed across surface
  let x;

  if (dir === 1) {
    // Left-facing - start offscreen right
    speed *= -1;
    x = anim.screen.width - 2;
  } else {
    // Right-facing - start offscreen left
    x = -24; // Ship is 24 characters wide
  }

  // Create ship entity
  // Position at y=0 (water surface), depth 2 (ship depth, above most entities)
  const shipEntity = anim.newEntity({
    type: 'ship',
    shape: [ship],
    position: [x, 0, depth.ship], // depth.ship = 2
    velocity: [speed, 0],
    physical: false,
    dieOffscreen: true,
    callback: shipCallback,
    deathCallback: (ship, anim) => shipDeath(ship, anim, classicMode)
  });

  return shipEntity;
}

/**
 * Ship per-frame callback
 * Move ship across the water
 */
function shipCallback(ship, anim) {
  ship.move();
}

/**
 * Ship death callback
 * Spawn new random object when ship leaves screen
 */
function shipDeath(ship, anim, classicMode) {
  // Spawn new random object to replace ship
  randomObject(ship, anim, classicMode);
}

module.exports = {
  addShip,
  shipCallback,
  shipDeath
};
