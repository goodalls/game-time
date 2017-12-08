const GamePiece = require('./GamePiece.js');

module.exports = class Projectile extends GamePiece {
  constructor(player, xd, yd, direction, h = 10, w = 10, speed = 5) {
    super(h, w);
    this.x = player.x
    this.y = player.y
    this.h = h;
    this.w = w;
    this.xd = xd;
    this.yd = yd;
    this.direction = direction;
    this.speed = speed;
    this.bulletCollision = false;
    this.one = Math.round(Math.random());
  }

  draw(context) {
    let num = this.one;

    context.font = '12px Aldrich';
    context.fillText(num, this.x - 10, this.y - 10);
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