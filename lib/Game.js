const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
//const Projectile = require ('./Projectile.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = new Player(295, 295, 30, 30);
const enemy = new Enemy(600, 300, 20, 20);
let gameOver = false;
//const enemyArray = [];

function endGame() {
  context.font = '60px Helvetica';
  context.fillStyle = 'black';
  context.fillText('Game Over', 135, 300);
}

function guideEnemy() {
  enemy.targetX = player.x;
  enemy.targetY = player.y;
}

function enemyCollsion() {
  if ( 
    // enemy right player left
    (Math.floor(enemy.x) + enemy.w / 2) >= (player.x - player.w / 2) &&

    // enemy left player right
    (Math.floor(enemy.x) - enemy.w / 2) <= (player.x + player.w / 2) &&

    // enemy top player bottom
    (Math.floor(enemy.y) - enemy.h / 2) <= (player.y + player.h / 2) &&

    // enemy bottom player top
    (Math.floor(enemy.y) + enemy.h / 2) >= (player.y - player.h / 2) ) { 

  // things we my need later below 
  // enemy.collision = true;
  // player.lives --;
  
    gameOver = true;
  }
}

window.addEventListener('keydown', keyBoard);
  
function keyBoard (event) {
  if (event.keyCode === 87) {
    player.moveUp();
    player.onBoard(canvas);
  }

  if (event.keyCode === 65) {
    player.moveLeft();
    player.onBoard(canvas);
  }
  
  if (event.keyCode === 83) {
    player.moveDown();
    player.onBoard(canvas);
  }
  
  if (event.keyCode === 68) {
    player.moveRight();
    player.onBoard(canvas);
  }
}

function gameLoop() {
  if (gameOver) {
    endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    enemy.draw(context);
    enemy.move();
    guideEnemy();
    enemyCollsion();
    requestAnimationFrame(gameLoop);
  }
}
requestAnimationFrame(gameLoop);