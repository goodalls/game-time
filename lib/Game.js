const Player = require ('./Player.js');

const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

const player = new Player(295, 295, 30, 30);

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);