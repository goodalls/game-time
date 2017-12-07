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
  draw(context, game) {
    game.bullets.forEach(function (bullet) {

      let num = bullet.one;

      context.font = '12px Aldrich';
      context.fillText(num, bullet.x - 10, bullet.y - 10);

    });
  }

  bulletOnCanvas(game) {
    game.bullets.forEach(function (bullet, index, array) {
      if (bullet.x <= 0 || bullet.x >= 800) {
        array.splice(index, 1);
      }

      if (bullet.y <= 0 || bullet.y >= 800) {
        array.splice(index, 1);
      }
    });
  }

  // collision managment 
  projectileCollision(game) {
    game.bullets.forEach((bullet, bulletIndex) => {
      game.enemyArray.forEach((enemy, enemyIndex) => {
        if (enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
          enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
          enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 &&
          enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2) {
          game.enemyArray.splice(enemyIndex, 1);
          game.sounds('squeak');
          game.bullets.splice(bulletIndex, 1);
          game.score += 10;
        }
      });
    });
  }

  move(game) {
    game.bullets.forEach(function (bullet) {

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
  }
};