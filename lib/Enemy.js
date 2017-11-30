const GamePiece = require('./GamePiece.js');

module.exports = class Enemy extends GamePiece {
  constructor() {
    super(... arguments);
    this.targetY = null;
    this.targetX = null;
    this.collision = false;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(this.x - (this.w / 2), this.y - (this.h / 2),
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