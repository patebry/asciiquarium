/**
 * Main Asciiquarium application
 * Manages the animation loop and keyboard input
 */
const Screen = require('./engine/Screen');
const Animation = require('./engine/Animation');
const { addFish } = require('./entities/fish');
const { addShark } = require('./entities/shark');
const { addEnvironment } = require('./entities/environment');
const { addAllSeaweed } = require('./entities/seaweed');
const { randomObject } = require('./utils/random');

class Asciiquarium {
  constructor(options = {}) {
    this.classicMode = options.classic || false;
    this.screen = null;
    this.anim = null;
    this.running = false;
    this.paused = false;
    this.interval = null;
  }

  /**
   * Setup keyboard event handlers
   */
  setupKeyboard() {
    // q - quit
    this.screen.onKey(['q', 'Q'], () => {
      this.quit();
    });

    // Ctrl+C - quit
    this.screen.onKey(['C-c'], () => {
      this.quit();
    });

    // r - redraw
    this.screen.onKey(['r', 'R'], () => {
      this.redraw();
    });

    // p - pause
    this.screen.onKey(['p', 'P'], () => {
      this.togglePause();
    });

    // escape - quit
    this.screen.onKey(['escape'], () => {
      this.quit();
    });
  }

  /**
   * Initialize the aquarium with entities
   */
  init() {
    try {
      // Create screen and animation
      this.screen = new Screen();
      this.anim = new Animation(this.screen);
      this.anim.classicMode = this.classicMode;
      this.screen.onResize = () => this.handleResize();

      // Setup keyboard after screen is created
      this.setupKeyboard();

      // Add environment (water surface)
      addEnvironment(this.anim);

      // Add seaweed (background)
      addAllSeaweed(this.anim);

      // Calculate number of fish based on screen size
      // Formula from Perl: screen_size / 350
      const screenSize = (this.screen.height - 9) * this.screen.width;
      const fishCount = Math.max(1, Math.floor(screenSize / 350));

      // Add initial fish
      for (let i = 0; i < fishCount; i++) {
        addFish(null, this.anim, this.classicMode);
      }

      // Add one random large object to start
      randomObject(null, this.anim, this.classicMode);

    } catch (error) {
      console.error('Error initializing aquarium:', error);
      throw error;
    }
  }

  /**
   * Start the animation
   */
  start() {
    try {
      this.running = true;

      // Initial render
      this.anim.animate();
      this.screen.render();

      // 10 FPS animation loop (100ms per frame)
      // CRITICAL: Must match Perl's halfdelay(1)
      this.interval = setInterval(() => {
        try {
          if (!this.paused && this.running) {
            this.anim.animate();
          }
        } catch (error) {
          console.error('Animation error:', error);
          this.quit();
        }
      }, 100);

    } catch (error) {
      console.error('Error starting animation:', error);
      this.quit();
    }
  }

  /**
   * Stop the animation
   */
  stop() {
    this.running = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Redraw the screen
   */
  redraw() {
    if (this.screen && this.anim) {
      this.screen.clear();
      this.anim.animate();
    }
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    this.paused = !this.paused;
  }

  /**
   * Handle terminal resize
   */
  handleResize() {
    // On resize, redraw immediately
    this.redraw();
  }

  /**
   * Quit the application
   */
  quit() {
    try {
      this.stop();
      if (this.screen) {
        this.screen.destroy();
      }
    } catch (error) {
      // Ignore errors during cleanup
    } finally {
      process.exit(0);
    }
  }
}

module.exports = Asciiquarium;
