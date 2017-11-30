const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
//const Projectile = require ('./Projectile.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const enemyArray = []
const enemy = new Enemy(100, 100, 20, 20);
const player = new Player(285, 285, 30, 30);

let gameOver = false;

for (let i=0; i<5; i++){
  var x = Math.random() * 50;
  var y = Math.random() * canvas.height;
  enemyArray.push(new Enemy(x, y, 20, 20))
};

for (let i=0; i<5; i++){
  var x = (Math.random() * 50) + 550;
  var y = Math.random() * canvas.height;
  enemyArray.push(new Enemy(x, y, 20, 20))
};

console.log(enemyArray)
document.querySelector('#start-game').addEventListener('click', startGame)
function startGame(){
  gameOver = false;
  spawn()
}

function endGame() {
  context.font = '60px Helvetica';
  context.fillStyle = 'black';
  context.fillText('Game Over', 135, 300);
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
    console.log('loop')
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);

    enemyArray.forEach(function (enemy){
      enemy.targetX = player.x;
      enemy.targetY = player.y;
      enemy.draw(context)
      enemy.move();
    });

  requestAnimationFrame(gameLoop);
  }
}
requestAnimationFrame(gameLoop);