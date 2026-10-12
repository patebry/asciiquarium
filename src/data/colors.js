/**
 * Color utilities for ASCII art rendering
 */

/**
 * Apply random colors to a color mask
 * Digits 1-9 become random colors, 4 always becomes W (white) for eyes
 *
 * @param {string} colorMask - Color mask with digits 1-9
 * @returns {string} Mask with color codes (c, C, r, R, y, Y, b, B, g, G, m, M, W)
 */
function randColor(colorMask) {
  const colors = ['c', 'C', 'r', 'R', 'y', 'Y', 'b', 'B', 'g', 'G', 'm', 'M'];

  // First, replace all 4s with W (white eyes)
  let result = colorMask.replace(/4/g, 'W');

  // Then replace each digit 1-9 with a random color
  for (let i = 1; i <= 9; i++) {
    if (i === 4) continue; // Already handled

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const regex = new RegExp(i.toString(), 'g');
    result = result.replace(regex, randomColor);
  }

  return result;
}

/**
 * Get a random color code
 */
function getRandomColor() {
  const colors = ['c', 'C', 'r', 'R', 'y', 'Y', 'b', 'B', 'g', 'G', 'm', 'M'];
  return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = {
  randColor,
  getRandomColor
};
