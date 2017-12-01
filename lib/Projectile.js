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
this.bullets.forEach(function (value, index) {
  // if(value.x <= 0 || value.x >= 600){this.bullets.splice(index, 1)}
  // if(value.y <= 0 || value.y >= 600){this.bullets.splice(index, 1)}
  context.beginPath();
  context.fillRect(value.x, value.y, 5, 5);
  context.fill();
  });
};

  move(){
    console.log(this.bullets)
    this.bullets.forEach(function (value, index){
      value.y -= 10
    if (value.direction === 'up') {value.y -= value.yd};
    });
  };
  

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