const GamePiece = require('./GamePiece.js');

module.exports = class Projectile extends GamePiece {
  constructor(x, y, h = 5, w = 5, xd, yd, direction, speed = 10) {
    super(... arguments);
    this.xd = xd;
    this.yd = yd;
    this.direction = direction;
    this.speed = speed;
    this.bullets = [];
  }

  draw(context) {
    this.bullets.forEach(function (value, index, array) {
      
      if ( value.x <= 0 || value.x >= 600) {
        array.splice(index, 1);
      }

      if ( value.y <= 0 || value.y >= 600) {
        array.splice(index, 1);
      }
      
      context.beginPath();
      context.fillRect(value.x, value.y, 5, 5);
      context.fill();
    });
  }

  move() {
    this.bullets.forEach(function (value, index) {
      if (value.direction === 'up') {
        value.y += (value.yd * value.speed);
      }

      if (value.direction === 'down') {
        value.y += (value.yd * value.speed);
      }

      if (value.direction === 'left') {
        value.x += (value.xd * value.speed);
      }

      if (value.direction === 'right') {
        value.x += (value.xd * value.speed);
      }
    });
  }
  

  shootUp() {
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

  shootDown() {

  }

  shootLeft() {

  }

  shootRight() {

  }
};
