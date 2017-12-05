const Enemy = require('./Enemy.js');

// images 
const wasdImg = new Image();
const arrowImg = new Image();

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
    this.score = 0;
 
  }

  // load screen / end screen / reset  
  
  resetGame() {
    window.location.reload(true);
  }

  onLoad(context, canvas) {
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
    context.fillStyle = 'black';
    context.font = '60px Aldrich';
    context.fillText('Game Over', 135, 100);

    context.fillText(`Score: ${this.score}`, 135, 200);
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

  sounds(sound) {
    //sounds
    const music = new Audio('../sounds/eight-bit.mp3');
    const sqeak = new Audio('../sounds/sqeak.wav');
    const fireWeapon = new Audio('../sounds/shoot-two.wav');
    const crash = new Audio('../sounds/crash.wav');

    music.volume = 0.2;
    sqeak.volume = 0.2;
    fireWeapon.volume = 0.4;
    crash.volume = 0.3;

    if (sound === 'fire') {
      fireWeapon.play();
    }
    if (sound === 'end') {
      music.pause();
      crash.play();
    }
    if (sound === 'begin') {
      music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
      }, false);
      music.play();
    }
    if (sound === 'squeak') {
      sqeak.play();
    }
  }
};