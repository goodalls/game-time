const GamePiece = require('./GamePiece.js');
const playerImg = new Image();

// images
playerImg.src = '../images/player2_160.png';

//sounds
const crash = new Audio('../sounds/crash.wav');

crash.volume = 0.3;

class Player extends GamePiece { 
  constructor(x, y, h, w, speed = 4) {
    super(x, y, h, w);
    this.isOnBoard = true;
    this.speed = speed;
    this.isDead = false;
  }

  draw(context) {
    context.drawImage(playerImg, this.x - (this.w / 2), this.y - (this.h / 2),
      this.w, this.h);
  }
  
  playerCollision(array, context, player) {
    array.forEach( (item) => {
      item.targetX = player.x;
      item.targetY = player.y;
      item.seekPlayer();
      if ( 
        item.x + item.w / 2 >= player.x - player.w / 2 &&
        item.x - item.w / 2 <= player.x + player.w / 2 &&
        item.y + item.h / 2 >= player.y - player.h / 2 && 
        item.y - item.h / 2 <= player.y + player.h / 2 ) {
        player.isDead = true;
      }
    });
  }
}

module.exports = Player;