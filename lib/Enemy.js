const GamePiece = require('./GamePiece.js');
const Game = require('./Game.js')
// const game = new Game();
const duckImg = new Image();

duckImg.src = '../images/ducky.jpg';

module.exports = class Enemy extends GamePiece {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.targetY = null;
    this.targetX = null;
    this.dx = 0;
    this.dy = 0;
    this.colliding = false;
  }

  draw(context) {
    context.drawImage(duckImg, this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  }

  seekPlayer() {

    const oppositeLine = this.targetY - this.y;
    const adjacentLine = this.targetX - this.x;
    const angle = Math.atan(oppositeLine / adjacentLine);

    this.dx = Math.cos(angle);
    this.dy = Math.sin(angle);

    if (this.targetX < this.x) {
      this.dy = -this.dy;
      this.dx = -this.dx;
    }

    if (this.colliding === false) {
      this.x += this.dx;
      this.y += this.dy; 
    } else if (this.colliding === true) {
      this.x -= this.dx;
      this.y += this.dy; 
    }
  }

};