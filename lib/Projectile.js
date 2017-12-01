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
    context.fillRect(100, 100, 5, 5);
    context.fill();
  } 

  move(){
    // this.bullets
    // if (projectiles.direction === up) {
    //   this.x -= 10
    // }
  }

  shootUp(){
    // player.fire()
    // this.x
    // this.y -= 10;
    // this.h
    // this.w
    // this.xd = 
    // this.yd
    // this.direction = up
    // this.speed
    // this.bullets.push(this.projectile)
  }

  shootDown(){

  }

  shootLeft(){

  }

  shootRight(){

  }
};;