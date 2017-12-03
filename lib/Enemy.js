const GamePiece = require('./GamePiece.js');

const duckImg = new Image();

duckImg.src = '../images/ducky.jpg';

module.exports = class Enemy extends GamePiece {
  constructor() {
    super(... arguments);
    this.targetY = null;
    this.targetX = null;
    this.dx = 0;
    this.dy = 0;
    this.enemyArray = [];
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
    
    this.x += this.dx;
    this.y += this.dy; 
  }
};