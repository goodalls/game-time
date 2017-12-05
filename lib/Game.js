const Enemy = require('./Enemy.js');
const canvas = document.getElementById('canvas');

// images 
const wasdImg = new Image();
const arrowImg = new Image();

wasdImg.src = '../images/wasd.png';
arrowImg.src = '../images/arrow.png';

module.exports = class Game {
  constructor() {
    this.enemyArray = [];
    this.gameOver = false;
    this.loadSceen = true;
    this.round = 0;
    this.initiated = false;
    this.delay = 0;
  }

  // load screen / end screen / reset  
  resetGame() {
    window.location.reload(true);
  }

  onLoad (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
  
    context.font = '65px Aldrich';
    context.fillText('Ducky\'s Demise', 42, 85);
    
    context.font = '30px Aldrich';
  
    context.fillText('use WASD keys to move', 120, 155);
    context.drawImage(wasdImg, 230, 185, 125, 125);
  
    context.fillText('use arrow keys to shoot', 110, 370);
    context.drawImage(arrowImg, 230, 390, 125, 125);
    
    context.fillText('press space bar to begin', 110, 550);
  }

  endGame(context) {
    context.font = '60px Aldrich';
    context.fillStyle = 'black';
    context.fillText('Game Over', 135, 100);
  }
  
  spawnHorizontal(input, canvas) {
  
    for (let i = 0; i < input; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * -50;
      
      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
    
    for (let i = 0; i < input; i++) {
      let x = Math.random() * canvas.width;
      let y = (Math.random() * 50) + 600;
      
      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
  }
  
  spawnVerticle(input, canvas) {

    for (let i = 0; i < input; i++) {
      let x = Math.random() * -50;
      let y = Math.random() * canvas.height;

      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }

    for (let i = 0; i < input; i++) {
      let x = (Math.random() * 50) + 600;
      let y = Math.random() * canvas.height;

      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
  }

  // roundZero(canvas) {
  //   this.loadSceen = false;
  //   this.initiated = true;
  //   this.spawnHorizontal(3, canvas);
  // }

  // roundOne(canvas) {
  //   this.spawnHorizontal(3, canvas);
  //   this.spawnVerticle(3, canvas);
  // }

  // roundTwo(canvas) {
  //   this.spawnHorizontal(7, canvas);
  //   this.spawnVerticle(7, canvas);
  // }

  // roundThree(canvas) {
  //   this.spawnHorizontal(11, canvas);
  //   this.spawnVerticle(11, canvas);
  // }
  
};