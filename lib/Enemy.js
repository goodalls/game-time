const GamePiece = require('./GamePiece.js');
//const Player = require('./Player.js');
//const Game = require('./Game.js');


module.exports = class Enemy extends GamePiece {
  constructor() {
    super(... arguments);
    this.targetY = null;
    this.targetX = null;
    this.hasArrived = false;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {

    context.fillStyle = 'magenta';
    context.fillRect(this.x, this.y, this.w, this.h);

  }

  move(){

//needs refactor to if inside player.w or .h collision detection.  
// if (this.y === this.targetY -1 || this.x === this.targetX -1) {
//   this.hasArrived = true;
//   console.log(this.hasArrived);
// }

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