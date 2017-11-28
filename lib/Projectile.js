const GamePiece = require('./GamePiece.js');

module.exports = class Projectile extends GamePiece {
  constructor(x, y, w, h) {
    super(... arguments);
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.w, this.h);
  } 
}