const GamePiece = require('./GamePiece.js');
const projectileImg = new Image();

projectileImg.src = '../images/binary.png';

module.exports = class Projectile extends GamePiece {
  constructor(x, y, h = 5, w = 5, xd, yd, direction, speed = 10) {
    super(...arguments);
    this.h = h;
    this.w = w;
    this.xd = xd;
    this.yd = yd;
    this.direction = direction;
    this.speed = speed;
    this.bulletCollision = false;
    this.bullets = [];
  }

  draw(context) {
    this.bullets.forEach(function (bullet, index, array) {

      if (bullet.x <= 0 || bullet.x >= 600) {
        array.splice(index, 1);
      }

      if (bullet.y <= 0 || bullet.y >= 600) {
        array.splice(index, 1);
      }

      context.beginPath();
      context.fillStyle = 'black';

      context.fillRect(bullet.x, bullet.y, bullet.h, bullet.w);
      //context.drawImage(projectileImg,
      // bullet.x, bullet.y, bullet.h, bullet.w);
      context.fill();
    });
  }

  move(context) {
    this.bullets.forEach(function (bullet) {
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

    });
    this.draw(context);
  }
};