const Enemy = require('./Enemy.js');

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

  onLoad(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '60px Aldrich';
    context.fillStyle = 'black';
    context.fillText('Ducky\'s Demise', 65, 150);
    context.font = '30px Aldrich';
    context.fillText('press space bar to begin', 110, 300);
  }

  endGame(context) {
    context.font = '60px Aldrich';
    context.fillStyle = 'black';
    context.fillText('Game Over', 135, 100);
  }
  
  spawnHorizontal(input, canvas) {
  
    for (let i = 0; i < input; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * 50;
      
      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
    
    for (let i = 0; i < input; i++) {
      let x = Math.random() * canvas.width;
      let y = (Math.random() * 50) + 550;
      
      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
  }
  
  spawnVerticle(input, canvas) {

    for (let i = 0; i < input; i++) {
      let x = Math.random() * 50;
      let y = Math.random() * canvas.height;

      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }

    for (let i = 0; i < input; i++) {
      let x = (Math.random() * 50) + 550;
      let y = Math.random() * canvas.height;

      this.enemyArray.push(new Enemy(x, y, 30, 30));
    }
  }

  
};