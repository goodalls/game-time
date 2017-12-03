const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js');
const Keyboard = require ('./keyboard.js')
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const projectile = new Projectile();
const enemyArray = [];
const player = new Player(300, 300, 30, 30);
let gameOver = false;
let loadSceen = true;


document.querySelector('#start-game').addEventListener('click', startGame);

function onLoad () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '60px Aldrich';
  context.fillStyle = 'black';
  context.fillText('Ducky\'s Demise', 65, 150);
  context.font = '30px Aldrich';
  context.fillText('press space bar to begin', 110, 300);
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

let keyboard = new Keyboard();

function keys () {
  //87='W'
  if (keyboard.keyState[87] && player.y - (player.h / 2) > 0) {
    player.y -= player.speed;
  }
  //65='A'
  if (keyboard.keyState[65] && player.x - (player.w / 2) > 0) {
    player.x -= player.speed;
  }
  //83='S'
  if (keyboard.keyState[83] && player.y + (player.h / 2) < 600) {
    player.y += player.speed;
  }
  //68='D'
  if (keyboard.keyState[68] && player.x + (player.w / 2) < 600) {
    player.x += player.speed;
  }
}

function arrowKeys() {
  //37='left arrow'
  if (keyboard.keyState[37]) {
    let shoot = new Projectile( 
      player.x,
      player.y, 
      /*projectile.h = */5,
      /*projectile.w = */5,
      /*projectile.xd = */-1,
      /*projectile.yd = */0,
      /*projectile.direction = */'left',
      /*projectile.speed = */5);

    projectile.bullets.push(shoot);
  }
  //38='Up Arrow'
  if (keyboard.keyState[38]) {
    let shoot = new Projectile( 
      player.x,
      player.y, 
      /*projectile.h = */5,
      /*projectile.w = */5,
      /*projectile.xd = */0,
      /*projectile.yd = */-1,
      /*projectile.direction = */'up',
      /*projectile.speed = */5);

    projectile.bullets.push(shoot);
  }
  //39='Right Arrow'
  if (keyboard.keyState[39]) {
    let shoot = new Projectile( 
      player.x,
      player.y, 
      /*projectile.h = */5,
      /*projectile.w = */5,
      /*projectile.xd = */1,
      /*projectile.yd = */0,
      /*projectile.direction = */'right',
      /*projectile.speed = */5);

    projectile.bullets.push(shoot);
  }

  //40='Down Arrow'
  if (keyboard.keyState[40]) {
    let shoot = new Projectile( 
      player.x,
      player.y, 
      /*projectile.h = */5,
      /*projectile.w = */5,
      /*projectile.xd = */0,
      /*projectile.yd = */1,
      /*projectile.direction = */'down',
      /*projectile.speed = */5);

    projectile.bullets.push(shoot);
  }

  //32='Space Bar'
  if (keyboard.keyState[32]) {
    startGame();
  }
}

let delay = 0;

function gameLoop() {
  if (loadSceen) {
    onLoad();
    arrowKeys();
    requestAnimationFrame(gameLoop);
  } else if (gameOver) {
    endGame();
  } else {
    delay++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (delay >= 10) {
      delay = 0;
      arrowKeys();
    }
    collisionHandler();
    enemyHandler();
    keys();
    player.draw(context);
    projectile.move(context);

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

function collisionHandler() {
  projectile.bullets.forEach(function(bullet, bulletIndex) {
    enemyArray.forEach(function (enemy, enemyIndex) {
      if ( enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
        enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
        enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 && 
        enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2 ) {
        enemyArray.splice(enemyIndex, 1);
        projectile.bullets.splice(bulletIndex, 1);
      }
    });
  });
}

