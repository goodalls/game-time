const GamePiece = require('./GamePiece.js');

module.exports = class Projectile extends GamePiece {
  constructor() {
    super(... arguments);
    this.xd = 0
    this.yd = 0
    this.direction = 0
    this.speed = 0
    this.bullets = []
  }

 draw(context) {
  context.beginPath();
    context.arc(100, 100, 5, 0, Math.PI * 2, false);
    context.fill();
  } 

  move(){
    // this.bullets
    // if (projectiles.direction === up) {
    //   this.x -= 10
    // }
  }

  shootUp(){
    //make a new bullet at location of player and send it in the direction of the button pressed.
    // add that bullet obj. to the bullets array 
  }

  shootDown(){

  }

  shootLeft(){

  }

  shootRight(){

  }
};;