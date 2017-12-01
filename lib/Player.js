const GamePiece = require('./GamePiece.js');
const Projectile = require('./Projectile.js')

module.exports = class Player extends GamePiece {
  constructor() {
    super(... arguments);
    this.isOnBoard = true;
  }

  draw(context) {

    context.fillStyle = 'blue';
    context.fillRect(this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  } 

  moveUp() {
    if (this.isOnBoard === true) {
      this.y -= 10;
    } else {
      this.y += 10;
      this.isOnBoard = true;
    }
  }

  moveDown() {
    if (this.isOnBoard === true) {
      this.y += 10;
    } else {
      this.y -= 10;
      this.isOnBoard = true;
    }
  } 

  moveLeft() {
    if (this.isOnBoard === true) {
      this.x -= 10;
    } else {
      this.x += 10;
      this.isOnBoard = true;
    }
  } 

  moveRight() { 
    if (this.isOnBoard === true) {
      this.x += 10;
    } else {
      this.x -= 10;
      this.isOnBoard = true;
    }
  }

  onBoard(canvas) {
    if (this.x + this.w / 2 > canvas.width || this.x - this.w / 2 < 0) {
      this.isOnBoard = false; 
    } else if (this.y + this.h > canvas.height || this.y - this.h < 0) {
      this.isOnBoard = false;
    } else {
      this.isOnBoard = true;
    }
  }
  fire(x,y,h,w,xd,yd,direction,speed){
    var shot = new Projectile(x,y,h,w,xd,yd,direction,speed).push(projectile.bullets);
  }
};
