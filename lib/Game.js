

module.exports = class Game {
constructor() {

}

colliding (b1, b2) {
  if( b1.x + b1.w / 2 >= b2.x - b2.w / 2 &&
      b1.x - b1.w / 2 <= b2.x + b2.w / 2 &&
      b1.y + b1.h / 2 >= b2.y - b2.h / 2 && 
      b1.y - b1.h / 2 <= b2.y + b2.h / 2 ) {
      this.colliding = true;
      // enemyArray.splice(enemy, 1);
    }
}