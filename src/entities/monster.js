/**
 * Monster entity with new and old/classic variants
 */
const monsterNewData = require('../data/ascii/monster-new');
const monsterOldData = require('../data/ascii/monster-old');
const depth = require('../utils/depth');
const { randomObject, randInt } = require('../utils/random');

/**
 * Add a monster to the animation
 */
function addMonster(oldEntity, anim, classicMode) {
  // Choose monster variant based on classic mode
  const monsterData = classicMode ? monsterOldData : monsterNewData;
  const frameCount = classicMode ? 4 : 2;

  // Random direction (0 = right, 1 = left)
  const dir = randInt(0, 1);
  const monsterFrames = monsterData[dir];

  let speed = 2;
  let x;

  if (dir === 1) {
    // Left-facing - start offscreen right
    speed *= -1;
    x = anim.screen.width - 2;
  } else {
    // Right-facing - start offscreen left
    // New monster is -54, old monster is -64
    x = classicMode ? -64 : -54;
  }

  // Create monster entity
  // Position at y=2, depth 10
  const monsterEntity = anim.newEntity({
    type: 'monster',
    shape: monsterFrames,
    position: [x, 2, depth.monster],
    velocity: [speed, 0],
    physical: false,
    dieOffscreen: true,
    callback: monsterCallback,
    deathCallback: (monster, anim) => monsterDeath(monster, anim, classicMode)
  });

  return monsterEntity;
}

/**
 * Monster per-frame callback
 * Move monster and advance animation frame
 */
function monsterCallback(monster, anim) {
  monster.move();
  monster.nextFrame();
}

/**
 * Monster death callback
 * Spawn new random object
 */
function monsterDeath(monster, anim, classicMode) {
  // Spawn new random object to replace monster
  randomObject(monster, anim, classicMode);
}

module.exports = {
  addMonster,
  monsterCallback,
  monsterDeath
};
