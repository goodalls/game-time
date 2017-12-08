const GamePiece = require('./GamePiece.js');

module.exports = class Projectile extends GamePiece {
  constructor(x, y, h = 10, w = 10, xd, yd, direction, speed = 10) {
    super(x, y, h, w);
    this.h = h;
    this.w = w;
    this.xd = xd;
    this.yd = yd;
    this.direction = direction;
    this.speed = speed;
    this.bulletCollision = false;
    this.one = Math.round(Math.random());
  }

  // the function to splice at wall should be seperated from draw
  draw(context) {
    // game.bullets.forEach(function (bullet) {

    let num = this.one;

    context.font = '12px Aldrich';
    context.fillText(num, this.x - 10, this.y - 10);

    // });
  }

  move(bullet) {
    if (bullet.direction === 'up') {
      bullet.y += (bullet.yd * bullet.speed);
    }

    if (bullet.direction === 'down') {
      bullet.y += (bullet.yd * bullet.speed);
    }

    if (bullet.direction === 'left') {
      bullet.x += (bullet.xd * bullet.speed);
    }

    if (bullet.direction === 'right') {
      bullet.x += (bullet.xd * bullet.speed);
    }
  }
};