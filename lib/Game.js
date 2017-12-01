const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const projectile = new Projectile();
const enemyArray = [];
const player = new Player(300, 300, 30, 30);
let gameOver = false;

console.log(projectile.bullets)

document.querySelector('#start-game').addEventListener('click', startGame);
function startGame() {
  //gameOver = false;
  spawn();
}

function endGame() {
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '60px Helvetica';
  context.fillStyle = 'black';
  context.fillText('Game Over', 135, 100);
}

window.addEventListener('keydown', keyBoard);

function keyBoard (event) {
  event.preventDefault()
//87='W'
if (event.keyCode === 87) {
  player.moveUp();
  player.onBoard(canvas);
}
//65='A'
if (event.keyCode === 65) {
  player.moveLeft();
  player.onBoard(canvas);
}
//83='S'
if (event.keyCode === 83) {
  player.moveDown();
  player.onBoard(canvas);
}
//68='D'
if (event.keyCode === 68) {
  player.moveRight();
  player.onBoard(canvas);
}
//37='left arrow'
if (event.keyCode === 37) {
  projectile.shootLeft();
  player.fire();
}
//38='Up Arrow'
if (event.keyCode === 38) {
  let shoot = new Projectile( 
    player.x,
    player.y, 
    projectile.h = 5,
    projectile.w = 5,
    projectile.xd = 0,
    projectile.yd = 10,
    projectile.direction = 'up',
    projectile.speed = 5);
  
  projectile.bullets.push(shoot)
}
//39='Right Arrow'
if (event.keyCode === 39) {
  projectile.shootRight();
  player.fire();
}
//40='Down Arrow'
if (event.keyCode === 40) {
  projectile.shootDown();
  player.fire();
}
//32='Space Bar'
  if (event.keyCode === 32) {
    startGame();
  }
}

function gameLoop() {
  if (gameOver) {
    endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    
    projectile.draw(context);
    projectile.move();
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