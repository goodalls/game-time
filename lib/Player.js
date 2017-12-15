const GamePiece = require('./GamePiece.js');
const playerImg = new Image();
const game = require('./Game.js')
const Projectile = require('./Projectile.js')
const player = require('./Player.js')

// images
playerImg.src = '../images/player2_160.png';

//sounds
const crash = new Audio('../sounds/crash.wav');

crash.volume = 0.3;

module.exports = class Player extends GamePiece {
  constructor(x, y, h, w, speed = 3) {
    super(x, y, h, w);
    this.speed = speed;
    this.isDead = false;
    this.gameKeys = {
      37: () => {
        //37='left arrow'
        if (game.bullets.length < 5) {
          let shoot = new Projectile(
            player,
            -1, //projectile.xd
            0, //projectile.yd
            'left' //projectile.direction
          );

          game.bullets.push(shoot);
          game.sounds('fire');
        }
      },

      38: () => {
        //up arrow
        if (game.bullets.length < 5) {
          let shoot = new Projectile(
            player,
            0, /*projectile.xd = */
            -1, /*projectile.yd = */
            'up' /*projectile.direction = */
          );

          game.bullets.push(shoot);
          game.sounds('fire');
        }
      },

      39: () => {
        //right arrow
        if (game.bullets.length < 5) {
          let shoot = new Projectile(
            player,
            1, /*projectile.xd = */
            0, /*projectile.yd = */
            'right' /*projectile.direction = */
          );

          game.bullets.push(shoot);
          game.sounds('fire');
        }
      },

      40: () => {
        //down arrow
        if (game.bullets.length < 5) {
          let shoot = new Projectile(
            player,
            0, /*projectile.xd = */
            1, /*projectile.yd = */
            'down' /*projectile.direction = */
          );

          game.bullets.push(shoot);
          game.sounds('fire');
        }
      },

      87: () => {
        if (this.y - (this.h / 2) > 0) {
          this.y -= this.speed;
        }
      },

      65: () => {
        if (this.x - (this.w / 2) > 0) {
          this.x -= this.speed;
        }
      },

      83: () => {
        if (this.y + (this.h / 2) < 600) {
          this.y += this.speed;
        }
      },

      68: () => {
        if (this.x + (this.w / 2) < 800) {
          this.x += this.speed;
        }
      },

      32: (canvas) => {
        if (!game.initiated) {
          game.loadSceen = false;
          game.initiated = true;
          game.levels(canvas);
        }
      }
    };
  }

  draw(context) {
    context.drawImage(playerImg, this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  }

  playerCollision(array, context, player) {
    array.forEach((item) => {
      item.targetX = player.x;
      item.targetY = player.y;
      item.seekPlayer();
      if (
        item.x + item.w / 2 >= player.x - player.w / 2 &&
        item.x - item.w / 2 <= player.x + player.w / 2 &&
        item.y + item.h / 2 >= player.y - player.h / 2 &&
        item.y - item.h / 2 <= player.y + player.h / 2) {
        player.isDead = true;
      }
    });
  }
};