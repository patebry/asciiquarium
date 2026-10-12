/**
 * Whale entity with animated water spout
 */
const whaleData = require('../data/ascii/whale');
const depth = require('../utils/depth');
const { randomObject, randInt } = require('../utils/random');

/**
 * Water spout animation frames (7 frames)
 */
const waterSpout = [
  // Frame 0
  `

   :`,
  // Frame 1
  `
   :
   :`,
  // Frame 2
  `  . .
  -:-
   :`,
  // Frame 3
  `  . .
 .-:-.
   :`,
  // Frame 4
  `  . .
'.-:-.\\\`
'  :  '`,
  // Frame 5
  `
 .- -.
;  :  ;`,
  // Frame 6
  `

;     ;`
];

/**
 * Add a whale to the animation
 */
function addWhale(oldEntity, anim, classicMode) {
  // Random direction (0 = right, 1 = left)
  const dir = randInt(0, 1);
  const whale = whaleData[dir];

  let speed = 1;
  let x;
  let spoutAlign;

  if (dir === 1) {
    // Left-facing - start offscreen right
    spoutAlign = 1;
    speed *= -1;
    x = anim.screen.width - 2;
  } else {
    // Right-facing - start offscreen left
    spoutAlign = 11;
    x = -18;
  }

  // Build animation frames
  const whaleFrames = [];

  // First 5 frames: no water spout (just 2 blank lines + whale body)
  for (let i = 0; i < 5; i++) {
    whaleFrames.push({
      body: '\n\n' + whale.body,
      mask: whale.mask
    });
  }

  // Next 7 frames: animated water spout
  for (const spoutFrame of waterSpout) {
    // Align the spout horizontally
    const alignedSpout = spoutFrame.split('\n')
      .map(line => ' '.repeat(spoutAlign) + line)
      .join('\n');

    // Combine spout and whale body
    const combinedBody = alignedSpout + whale.body;

    whaleFrames.push({
      body: combinedBody,
      mask: whale.mask
    });
  }

  // Create whale entity
  // Position at y=0 (water surface), depth 5 (water_gap2 in Perl)
  const whaleEntity = anim.newEntity({
    type: 'whale',
    shape: whaleFrames,
    position: [x, 0, 5], // water_gap2 depth = 5
    velocity: [speed, 0],
    physical: false,
    dieOffscreen: true,
    callback: whaleCallback,
    deathCallback: (whale, anim) => whaleDeath(whale, anim, classicMode)
  });

  return whaleEntity;
}

/**
 * Whale per-frame callback
 * Move whale and advance animation frame
 */
function whaleCallback(whale, anim) {
  whale.move();
  whale.nextFrame();
}

/**
 * Whale death callback
 * Spawn new random object
 */
function whaleDeath(whale, anim, classicMode) {
  // Spawn new random object to replace whale
  randomObject(whale, anim, classicMode);
}

module.exports = {
  addWhale,
  whaleCallback,
  whaleDeath
};
