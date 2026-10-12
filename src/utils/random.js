/**
 * Random object spawning utilities
 */

let randomObjectFunctions = [];

/**
 * Initialize random object spawners
 */
function initRandomObjects(classicMode) {
  const { addShip } = require('../entities/ship');
  const { addWhale } = require('../entities/whale');
  const { addMonster } = require('../entities/monster');
  const { addBigFish } = require('../entities/bigfish');
  const { addShark } = require('../entities/shark');

  randomObjectFunctions = [
    addShip,
    addWhale,
    addMonster,
    addBigFish,
    addShark
  ];
}

/**
 * Spawn a random large object
 * Used as death callback for large entities
 */
function randomObject(deadEntity, anim, classicMode) {
  if (randomObjectFunctions.length === 0) {
    initRandomObjects(classicMode);
  }

  const index = Math.floor(Math.random() * randomObjectFunctions.length);
  randomObjectFunctions[index](deadEntity, anim, classicMode);
}

/**
 * Get random integer between min and max (inclusive)
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random float between min and max
 */
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = {
  randomObject,
  randInt,
  randFloat
};
