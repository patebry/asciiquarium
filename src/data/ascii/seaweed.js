/**
 * Seaweed ASCII art with wave motion animation
 * Each seaweed randomly generates a height between 3 and 7 units
 * Two frames create wave motion: left lean '(' and right lean ')'
 */

/**
 * Generate seaweed frames for a given height
 * @param {number} height - Height of the seaweed (3-7)
 * @returns {Array} Array of two frames [leftLean, rightLean]
 */
function generateSeaweed(height) {
  // Frame 0: Left lean pattern
  let leftLean = '';
  for (let i = 1; i <= height; i++) {
    if (i % 2 === 1) {
      // Odd rows: left side
      leftLean += '(\n';
    } else {
      // Even rows: right side
      leftLean += ' )\n';
    }
  }

  // Frame 1: Right lean pattern (opposite of left)
  let rightLean = '';
  for (let i = 1; i <= height; i++) {
    if (i % 2 === 0) {
      // Even rows: left side
      rightLean += '(\n';
    } else {
      // Odd rows: right side
      rightLean += ' )\n';
    }
  }

  // Remove trailing newlines
  leftLean = leftLean.trimEnd();
  rightLean = rightLean.trimEnd();

  return [leftLean, rightLean];
}

module.exports = { generateSeaweed };
