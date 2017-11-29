const GamePiece = require('./GamePiece.js');
const Player = require('./player.js');
const Game = require('./Game/js');
const enemyArray = []

module.exports = class Enemy extends GamePiece {
  constructor(x, y, w, h) {
    super(... arguments);
    this.targetY = 295; //needs to be player.y;
    this.targetX = 295; //needs to be player.x;
    this.hasArrived = false;
    this.dx = 0;
    this.dy = 0;
  }

  draw(context) {
   enemyArray.forEach(function (){
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.w, this.h);
   });
  }
  
  
  spawn(){
     
    for (let i=0; i<10; i++){
      var this.x = Math.random() * canvas.width
      var this.y = Math.random() * canvas.height
      enemyArray.push(new Enemy(this.x, this.y, 20, 20));
  }

  move() {

    //needs refactor to if inside player.w or .h 
    // if (this.y === this.targetY -1 || this.x === this.targetX -1) {
    //   this.hasArrived = true;
    //   console.log(this.hasArrived);
    // }

    const oppositeLine = this.targetY - this.y;
    const adjacentLine = this.targetX - this.x;

    const angle = Math.atan(oppositeLine/adjacentLine);

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