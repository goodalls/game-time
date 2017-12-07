const Enemy = require('./Enemy.js');

// images 
const wasdImg = new Image();
const arrowImg = new Image();

let highScore = JSON.parse(localStorage.getItem('score'));



wasdImg.src = '../images/wasd.png';
arrowImg.src = '../images/arrow.png';

module.exports = class Game {
  constructor() {
    this.enemyArray = [];
    this.gameOver = false;
    this.loadScreen = true;
    this.initiated = false;
    this.round = 0;
    this.delay = 0;
    this.score = -100;
  }

  // load screen / end screen / reset  
  animate() {

  }
  
  resetGame() {
    window.location.reload(true);
  }

  onLoad(context, canvas) {
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
  
    context.font = '65px Aldrich';
    context.fillText('Ducky\'s Demise', 142, 85);
    
    context.font = '30px Aldrich';
  
    context.fillText('use WASD keys to move', 220, 155);
    context.drawImage(wasdImg, 340, 185, 125, 125);
  
    context.fillText('use arrow keys to shoot', 215, 370);
    context.drawImage(arrowImg, 340, 390, 125, 125);
    
    context.fillText('press space bar to begin', 210, 550);
  }

  endGame(context) {
    if ( this.score > JSON.parse( localStorage.getItem( 'score' )) ) {
      localStorage.setItem('score', JSON.stringify(this.score));
    }

    if (this.score > highScore) {
      highScore = this.score;
    }

    context.fillStyle = 'black';
    context.font = '70px Aldrich';
    context.fillText('Game Over', 205, 200);

    context.font = '40px Aldrich';

    context.fillText(`Score this game: ${this.score}`, 175, 300);
    
    context.fillText(`Your All-Time High Score : ${highScore}`, 50, 400);
  }

  gameStats(context) {
    context.fillStyle = 'black';
    context.font = '22px Aldrich';

    context.fillText(`Level: ${this.round}`, 15, 25);
    context.fillText(`Score: ${this.score}`, 345, 25);
    context.fillText(`Ducks: ${this.enemyArray.length}`, 690, 25);
  }

  levels(canvas) {
    
    this.score += 100;
    this.round += 1;
    var spawnNumber = this.round * 0.5;
   
    this.spawn(spawnNumber, canvas);
  }

  spawn(spawnNumber, canvas) {
    for (let i = 0; i < spawnNumber; i++) {
      let x1 = Math.random() * canvas.width;
      let x2 = Math.random() * canvas.width;

      let y1 = Math.random() * -50;
      let y2 = Math.random() * 50 + canvas.width;

      this.enemyArray.push(
        new Enemy(x1, y1, 30, 30),
        new Enemy(x2, y2, 30, 30),
        new Enemy(y1, x1, 30, 30),
        new Enemy(y2, x2, 30, 30)
      );
    }
  }
  
  // sound managment

  sounds(sound) {
    const sqeak = new Audio('../sounds/sqeak.wav');
    const fireWeapon = new Audio('../sounds/shoot-two.wav');
    const crash = new Audio('../sounds/crash.wav');

    sqeak.volume = 0.2;
    fireWeapon.volume = 0.4;
    crash.volume = 0.3;

    if (sound === 'fire') {
      fireWeapon.play();
    }

    if (sound === 'end') {
      crash.play();
    }

    if (sound === 'squeak') {
      sqeak.play();
    }
  }

  enemyColliding() {
    this.enemyArray.forEach( (enemy1) => {
      this.enemyArray.forEach( (enemy2) => {
        if ( enemy1 !== enemy2 && 
          enemy1.x + enemy1.w >= enemy2.x - enemy2.w &&
          enemy1.x - enemy1.w <= enemy2.x + enemy2.w &&
          enemy1.y + enemy1.h >= enemy2.y - enemy2.h && 
          enemy1.y - enemy1.h <= enemy2.y + enemy2.h ) {
          enemy1.colliding = true;
          enemy2.colliding = true;
        } else {
          enemy1.colliding = false;
          enemy2.colliding = false;
        }
      });
    });
  }
};

