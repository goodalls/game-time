const GamePiece = require('./GamePiece.js');

module.exports = class Player extends GamePiece {
  constructor(x, y, w, h) {
    super(... arguments)
  }

  draw(context) {
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.w, this.h);
  }

  moveUp() {
    this.y -= 10;
  }

  moveDown(){
    this.y += 10;
  }

  moveLeft(){
    this.x -= 10;
  }

  moveRight(){
    this.x += 10;
  }
};
