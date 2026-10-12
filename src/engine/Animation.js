/**
 * Animation - Entity manager and animation controller
 * Equivalent to Term::Animation in Perl
 */
const Entity = require('./Entity');

class Animation {
  constructor(screen) {
    this.screen = screen;
    this.entities = [];
    this.paused = false;
  }

  /**
   * Create a new entity
   */
  newEntity(options) {
    const entity = new Entity(options);
    this.entities.push(entity);
    return entity;
  }

  /**
   * Remove an entity
   */
  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }

  /**
   * Main animation step
   */
  animate() {
    if (this.paused) return;

    // Update all entities
    for (const entity of this.entities) {
      if (!entity.alive) continue;

      // Advance frame counter
      entity.frameCounter++;

      // Execute callback
      if (entity.callback) {
        entity.callback(entity, this, ...entity.callbackArgs);
      }

      // Check for death
      if (entity.shouldDie(this.screen.width, this.screen.height)) {
        entity.kill();
        this.runDeathCallback(entity);
      }

      // Advance animation frame
      entity.nextFrame();
    }

    // Check for collisions (only physical entities)
    const physicalEntities = this.entities.filter(e => e.alive && e.physical);
    for (let i = 0; i < physicalEntities.length; i++) {
      for (let j = i + 1; j < physicalEntities.length; j++) {
        const e1 = physicalEntities[i];
        const e2 = physicalEntities[j];

        if (e1.collidesWith(e2)) {
          // Notify both entities of collision
          if (e1.collisionCallback) {
            e1.collisionCallback(e1, this, [e2]);
          }
          if (e2.collisionCallback) {
            e2.collisionCallback(e2, this, [e1]);
          }
        }
      }
    }

    // Entities killed by callbacks or collisions (e.g. fish eaten by a shark)
    // still get their death callback before removal.
    for (const entity of [...this.entities]) {
      if (!entity.alive) this.runDeathCallback(entity);
    }

    // Remove dead entities
    this.entities = this.entities.filter(e => e.alive);

    this.render();
  }

  /**
   * Draw the current entities without advancing the animation
   */
  render() {
    this.screen.clear();

    // Sort entities by z-depth (higher z = draw first = background)
    const sortedEntities = [...this.entities].sort((a, b) => b.position[2] - a.position[2]);

    for (const entity of sortedEntities) {
      if (!entity.alive) continue;

      const [x, y] = entity.position;
      const currentShape = entity.getCurrentShape();

      if (typeof currentShape === 'string') {
        // Simple string - render without color
        this.screen.renderWithMask(x, y, currentShape, null);
      } else if (currentShape.body && currentShape.mask) {
        // Shape with color mask
        this.screen.renderWithMask(x, y, currentShape.body, currentShape.mask);
      }
    }

    this.screen.render();
  }

  /**
   * Run an entity's death callback at most once
   */
  runDeathCallback(entity) {
    if (entity.deathHandled) return;
    entity.deathHandled = true;
    if (entity.deathCallback) {
      entity.deathCallback(entity, this);
    }
  }

  /**
   * Get entities by type
   */
  getEntitiesByType(type) {
    return this.entities.filter(e => e.type === type && e.alive);
  }

  /**
   * Count entities by type
   */
  countEntitiesByType(type) {
    return this.getEntitiesByType(type).length;
  }

  /**
   * Pause animation
   */
  pause() {
    this.paused = true;
  }

  /**
   * Resume animation
   */
  resume() {
    this.paused = false;
  }

  /**
   * Toggle pause
   */
  togglePause() {
    this.paused = !this.paused;
  }
}

module.exports = Animation;
