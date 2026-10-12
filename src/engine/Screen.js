/**
 * Screen - Terminal renderer using blessed
 * Wrapper around blessed with color mask support
 */
const blessed = require('blessed');

class Screen {
  constructor() {
    this.screen = blessed.screen({
      smartCSR: false,  // Disable smart cursor to prevent glitches
      fullUnicode: true,
      forceUnicode: true
    });

    // Hide cursor
    this.screen.program.hideCursor();

    // Create main rendering box
    this.box = blessed.box({
      parent: this.screen,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      tags: true,
      keys: true,
      input: true,
      style: {
        fg: 'white',
        bg: 'black'
      }
    });

    this.width = this.screen.width;
    this.height = this.screen.height;

    // 2D buffer for rendering
    this.buffer = [];
    this.initBuffer();

    // Focus the box to ensure it receives input
    this.box.focus();

    // Setup resize handler
    this.screen.on('resize', () => {
      this.width = this.screen.width;
      this.height = this.screen.height;
      this.initBuffer();
      if (this.onResize) {
        this.onResize(this.width, this.height);
      }
    });
  }

  /**
   * Initialize the character buffer
   */
  initBuffer() {
    this.buffer = [];
    for (let y = 0; y < this.height; y++) {
      this.buffer[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.buffer[y][x] = { char: ' ', color: null };
      }
    }
  }

  /**
   * Clear the screen buffer
   */
  clear() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.buffer[y][x] = { char: ' ', color: null };
      }
    }
  }

  /**
   * Render text at position with color mask
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} body - Text to render (may contain newlines)
   * @param {string} mask - Color mask (same dimensions as body)
   */
  renderWithMask(x, y, body, mask) {
    const bodyLines = body.split('\n');
    const maskLines = mask ? mask.split('\n') : [];

    for (let i = 0; i < bodyLines.length; i++) {
      const line = bodyLines[i];
      const maskLine = maskLines[i] || '';

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const colorCode = maskLine[j] || '';

        // '?' is Term::Animation's transparency placeholder in the Perl art
        if (char === ' ' || char === '?') continue;

        const screenX = Math.floor(x + j);
        const screenY = Math.floor(y + i);

        // Bounds check
        if (screenX < 0 || screenX >= this.width ||
            screenY < 0 || screenY >= this.height) {
          continue;
        }

        // Store character and color in buffer
        this.buffer[screenY][screenX] = {
          char: char,
          color: colorCode
        };
      }
    }
  }

  /**
   * Apply color code to character
   */
  applyColor(char, colorCode) {
    if (!colorCode) return char;

    const colorMap = {
      'c': 'cyan',
      'C': 'cyan',
      'r': 'red',
      'R': 'red',
      'y': 'yellow',
      'Y': 'yellow',
      'b': 'blue',
      'B': 'blue',
      'g': 'green',
      'G': 'green',
      'm': 'magenta',
      'M': 'magenta',
      'W': 'white'
    };

    const color = colorMap[colorCode];
    if (!color) return char;

    return `{${color}-fg}${char}{/}`;
  }

  /**
   * Render the screen buffer to blessed
   */
  render() {
    // Build the complete screen content
    const lines = [];

    // Render all buffer lines to match blessed box dimensions
    const maxLines = Math.min(this.height, this.buffer.length);

    for (let y = 0; y < maxLines; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = this.buffer[y][x];
        if (cell.color) {
          line += this.applyColor(cell.char, cell.color);
        } else {
          line += cell.char;
        }
      }
      lines.push(line);
    }

    // Set content and render (no trailing newline)
    this.box.setContent(lines.join('\n'));
    this.screen.render();
  }

  /**
   * Destroy the screen
   */
  destroy() {
    this.screen.destroy();
  }

  /**
   * Setup keyboard handler
   */
  onKey(keys, callback) {
    this.screen.key(keys, callback);
  }
}

module.exports = Screen;
