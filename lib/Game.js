const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = new Player(295, 295, 30, 30);
const enemy = new Enemy(100, 100, 20, 20);
const gameOver = false;
const enemyArray = [];

function endGame() {
    context.font = '60px Helvetica';
    context.fillStyle = 'black';
    context.fillText('Game Over', 135, 300);
  }

  window.addEventListener('keydown', function(event, context){
  if (event.keyCode === 87){
    player.moveUp();
  }
  if (event.keyCode === 65){
    player.moveLeft();
  }
  if (event.keyCode === 83){
    player.moveDown();
  }
  if (event.keyCode === 68){
    player.moveRight();
  }
});

function gameLoop() {
  if (gameOver) {
    endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    enemy.draw(context);
    enemy.move();
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);
