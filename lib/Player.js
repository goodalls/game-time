const GamePiece = require('./GamePiece.js');

module.exports = class Player extends GamePiece {
  constructor(x, y, h, w, speed = 5) {
    super(... arguments);
    this.isOnBoard = true;
    this.speed = speed;
  }

  draw(context) {

    context.fillStyle = 'blue';
    context.fillRect(this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  } 
};
