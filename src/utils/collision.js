/**
 * Collision detection utilities
 * (Currently handled by individual entity collision callbacks)
 */

/**
 * Check AABB collision between two entities
 */
function checkCollision(entity1, entity2) {
  if (!entity1.physical || !entity2.physical) {
    return false;
  }

  const box1 = entity1.getCollisionBox();
  const box2 = entity2.getCollisionBox();

  if (!box1 || !box2) {
    return false;
  }

  return !(box1.x2 < box2.x1 ||
           box1.x1 > box2.x2 ||
           box1.y2 < box2.y1 ||
           box1.y1 > box2.y2);
}

module.exports = {
  checkCollision
};
