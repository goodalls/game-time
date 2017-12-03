const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
//const Projectile = require ('./Projectile.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const enemyArray = [];
const player = new Player(300, 300, 30, 30);
let gameOver = false;
let loadSceen = true;


document.querySelector('#start-game').addEventListener('click', startGame);

function onLoad () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '60px Aldrich';
  context.fillStyle = 'black';
  context.fillText('Game Name', 123, 150);
  context.font = '30px Aldrich';
  context.fillText('press space bar to begin', 115, 300);
}

function startGame() {
  loadSceen = false;
  spawn();
}

function endGame() {
  context.font = '60px Aldrich';
  context.fillStyle = 'black';
  context.fillText('Game Over', 135, 100);
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

  if (event.keyCode === 32) {
    startGame();
  }
}

function gameLoop() {
  
  if (loadSceen) {
    onLoad();
    requestAnimationFrame(gameLoop);
  } 
  
  else if (gameOver) {
      endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    enemyHandler();
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);

function enemyHandler() {
  enemyArray.forEach(function (enemy) {
    enemy.targetX = player.x;
    enemy.targetY = player.y;

    enemy.draw(context);
    enemy.seekPlayer();

    if ( 
      enemy.x + enemy.w / 2 >= player.x - player.w / 2 &&
      enemy.x - enemy.w / 2 <= player.x + player.w / 2 &&
      enemy.y + enemy.h / 2 >= player.y - player.h / 2 && 
      enemy.y - enemy.h / 2 <= player.y + player.h / 2 ) {
      enemy.collision = true;
      gameOver = true;
    }
  });
}

function spawn() {
  for (let i = 0; i < 5; i ++) {
    let x = Math.random() * 50;
    let y = Math.random() * canvas.height;
      
    enemyArray.push(new Enemy(x, y, 20, 20));
  }
  for (let i = 0; i < 5; i ++) { 
    let x = (Math.random() * 50) + 550;
    let y = Math.random() * canvas.height;

    enemyArray.push(new Enemy(x, y, 20, 20));
  }
}