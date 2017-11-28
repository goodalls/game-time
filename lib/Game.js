const Player = require ('./Player.js');

const Enemy = require ('./Enemy.js');

const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

const player = new Player(295, 295, 30, 30);

const gameOver = true;

function gameLoop() {
  
  if (gameOver) {
    endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    requestAnimationFrame(gameLoop);
  }
  
  function endGame() {
    context.font = '60px Helvetica';
    context.fillStyle = 'black';
    context.fillText('Game Over', 135, 300);
  }

}
requestAnimationFrame(gameLoop);
