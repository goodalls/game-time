const GamePiece = require('./GamePiece.js');
const Projectile = require('./Projectile.js');
const Keyboard = require('./Keyboard.js');
const projectile = new Projectile();
const keyboard = new Keyboard();

const playerImg = new Image();

playerImg.src = '../images/laptop.png';

module.exports = class Player extends GamePiece {
  constructor(x, y, h, w, speed = 5) {
    super(... arguments);
    this.isOnBoard = true;
    this.speed = speed;
  }

  draw(context) {
    context.fillStyle = 'blue';
    context.drawImage(playerImg, this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  } 
};