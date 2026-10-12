/**
 * Entity - Represents an animated entity in the aquarium
 * Equivalent to Term::Animation::Entity in Perl
 */
class Entity {
  constructor(options = {}) {
    this.id = Entity.nextId++;
    this.type = options.type || 'generic';
    this.shape = options.shape || []; // Array of frames (strings or {body, mask} objects)
    this.position = options.position || [0, 0, 0]; // [x, y, z]
    this.velocity = options.velocity || [0, 0]; // [dx, dy] per frame
    this.physical = options.physical !== undefined ? options.physical : false;
    this.callback = options.callback || null;
    this.callbackArgs = options.callbackArgs || [];
    this.deathCallback = options.deathCallback || null;
    this.collisionCallback = options.collisionCallback || null;

    // Animation state
    this.currentFrame = 0;
    this.frameCount = Array.isArray(this.shape) ? this.shape.length : 1;

    // Death conditions
    this.dieOffscreen = options.dieOffscreen !== undefined ? options.dieOffscreen : true;
    this.dieTime = options.dieTime || null; // Die after X milliseconds
    this.dieFrame = options.dieFrame || null; // Die after X animation frames
    this.deathCheck = options.deathCheck || null; // Custom death check function

    // Internal state
    this.alive = true;
    this.frameCounter = 0;
    this.birthTime = Date.now();

    // Cached dimensions
    this._cachedDimensions = null;
  }

  static nextId = 1;

  /**
   * Get the current frame's shape
   */
  getCurrentShape() {
    if (!Array.isArray(this.shape)) {
      return this.shape;
    }
    return this.shape[this.currentFrame % this.frameCount];
  }

  /**
   * Get entity dimensions (width, height)
   */
  getDimensions() {
    if (this._cachedDimensions) {
      return this._cachedDimensions;
    }

    const currentShape = this.getCurrentShape();
    let body = typeof currentShape === 'string' ? currentShape : currentShape.body;

    const lines = body.split('\n');
    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));

    this._cachedDimensions = { width, height };
    return this._cachedDimensions;
  }

  /**
   * Advance to next animation frame
   */
  nextFrame() {
    this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    this._cachedDimensions = null; // Invalidate cache
  }

  /**
   * Move entity by velocity
   */
  move() {
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
  }

  /**
   * Check if entity should die
   */
  shouldDie(screenWidth, screenHeight) {
    // Time-based death
    if (this.dieTime && (Date.now() - this.birthTime) >= this.dieTime) {
      return true;
    }

    // Frame-based death
    if (this.dieFrame && this.frameCounter >= this.dieFrame) {
      return true;
    }

    // Custom death check
    if (this.deathCheck && this.deathCheck(this)) {
      return true;
    }

    // Offscreen death
    if (this.dieOffscreen) {
      const { width, height } = this.getDimensions();
      const [x, y] = this.position;

      if (x + width < 0 || x > screenWidth ||
          y + height < 0 || y > screenHeight) {
        return true;
      }
    }

    return false;
  }

  /**
   * Kill this entity
   */
  kill() {
    this.alive = false;
  }

  /**
   * Get AABB collision box (if physical)
   */
  getCollisionBox() {
    if (!this.physical) {
      return null;
    }

    const { width, height } = this.getDimensions();
    const [x, y] = this.position;

    return {
      x1: x,
      y1: y,
      x2: x + width,
      y2: y + height
    };
  }

  /**
   * Check AABB collision with another entity
   */
  collidesWith(other) {
    if (!this.physical || !other.physical) {
      return false;
    }

    const box1 = this.getCollisionBox();
    const box2 = other.getCollisionBox();

    if (!box1 || !box2) {
      return false;
    }

    return !(box1.x2 < box2.x1 ||
             box1.x1 > box2.x2 ||
             box1.y2 < box2.y1 ||
             box1.y1 > box2.y2);
  }
}

module.exports = Entity;
