const GamePiece = require('./GamePiece.js');
const projectileImg = new Image();

projectileImg.src = '../images/002-js.svg';

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
    this.bullets = [];
    this.one = Math.round(Math.random());
  }

  // the function to splice at wall should be seperated from draw
  draw(context) {
    this.bullets.forEach(function (bullet, index, array) {

      if (bullet.x <= 0 || bullet.x >= 800) {
        array.splice(index, 1);
      }

      if (bullet.y <= 0 || bullet.y >= 800) {
        array.splice(index, 1);
      }
     let num = bullet.one
        context.font = '10px Aldrich';
        context.fillText( num, bullet.x - 10, bullet.y - 10);
      

    });
  }

  // collision managment 

  //losing this again once we go into the .forEach() 
  projectileCollision(game) {
    let self = this;
    
    this.bullets.forEach(function(bullet, bulletIndex) {
      game.enemyArray.forEach(function (enemy, enemyIndex) {
        if ( enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
          enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
          enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 && 
          enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2 ) {
          game.enemyArray.splice(enemyIndex, 1);
          //sound is breaking test, need to move it out
          //perhaps flip a boolean and elsewhere catch with if() 
          //then trigger sound
          game.sounds('squeak');
          self.bullets.splice(bulletIndex, 1);
          game.score += 10;
        }
      });
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