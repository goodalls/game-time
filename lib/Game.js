const Enemy = require('./Enemy');
// const projectile = require('./Projectile.js')
let highScore = JSON.parse(localStorage.getItem('score'));

// images 
const wasdImg = new Image();
const arrowImg = new Image();

wasdImg.src = '../images/wasd.png';
arrowImg.src = '../images/arrow.png';

module.exports = class Game {
  constructor() {
    this.enemyArray = [];
    this.bullets = [];
    this.gameOver = false;
    this.loadScreen = true;
    this.initiated = false;
    this.round = 0;
    this.delay = 0;
    this.score = -100;
  }

  animate(context, canvas) {
    if (this.enemyArray.length === 0) {
      this.score += 100;
      this.levels(canvas);
    }
    this.gameStats(context);   
    this.enemyColliding();
    this.drawBullets(context);
    this.bulletOnCanvas();
    this.projectileCollision();
  }

  // load screen / end screen / reset  
  
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
    
    if (this.score > highScore) {
      localStorage.setItem('score', JSON.stringify(this.score));
    }

    if (this.score > highScore) {
      highScore = this.score;
    }

    context.fillStyle = 'black';
    context.font = '70px Aldrich';
    context.fillText('Game Over', 205, 200);
    context.font = '40px Aldrich';
    context.fillText(`Score This Game: ${this.score}`, 175, 300);
    context.fillText(`Your All-Time High Score : ${highScore}`, 100, 400);
  }

  gameStats(context) {
    context.fillStyle = 'black';
    context.font = '22px Aldrich';
    context.fillText(`Level: ${this.round}`, 15, 30);
    context.fillText(`Score: ${this.score}`, 345, 30);
    context.fillText(`Ducks: ${this.enemyArray.length}`, 690, 30);
  }

  levels(canvas) {
    this.score += 100;
    this.round += 1;
    let spawnNumber = this.round * 0.5;
   
    this.spawn(spawnNumber, canvas);
  }

  spawn(spawnNumber, canvas) {
    for (let i = 0; i < spawnNumber; i++) {
      let x1 = Math.random() * canvas.width;
      let x2 = Math.random() * canvas.width;

      let y1 = Math.random() * -400;
      let y2 = Math.random() * 400 + canvas.width;

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
    const fireWeapon = new Audio('../sounds/shoot.wav');
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

  //enemy managment

  drawEnemies(context) {
    this.enemyArray.forEach( (item)  => {
      item.draw(context);
    });
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
          enemy1.x -= enemy1.dx;
          enemy1.y += enemy1.dy;

          enemy2.x += enemy2.dx;
          enemy2.y -= enemy2.dy;  
        } else {
          enemy1.colliding = false;
          enemy2.colliding = false;
        }
      });
    });
  }

  //Projectile Management

  drawBullets(context) {
    this.bullets.forEach((bullet) => {
      bullet.move(bullet)
      bullet.draw(context);
    })
  }

  bulletOnCanvas() {
    this.bullets.forEach(function (bullet, index, array) {
      if (bullet.x <= 0 || bullet.x >= 800) {
        array.splice(index, 1);
      }

      if (bullet.y <= 0 || bullet.y >= 600) {
        array.splice(index, 1);
      }
    });
  }

  projectileCollision() {
    this.bullets.forEach((bullet, bulletIndex) => {
      this.enemyArray.forEach((enemy, enemyIndex) => {
        if (enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
          enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
          enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 &&
          enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2) {
          this.enemyArray.splice(enemyIndex, 1);
          this.sounds('squeak');
          this.bullets.splice(bulletIndex, 1);
          this.score += 10;
        }
      });
    });
  }

};