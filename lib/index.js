const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js');
const Keyboard = require ('./Keyboard.js')
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


// images 
const wasdImg = new Image();
const arrowImg = new Image();

wasdImg.src = '../images/wasd.png';
arrowImg.src = '../images/arrow.png';

//sounds
const music = new Audio('../sounds/eight-bit.mp3');
const sqeak = new Audio('../sounds/sqeak.wav');
const fireWeapon = new Audio('../sounds/shoot-two.wav');
const crash = new Audio('../sounds/crash.wav');

music.volume = 0.2;
sqeak.volume = 0.2;
fireWeapon.volume = 0.4;
crash.volume = 0.3;

const projectile = new Projectile();
const player = new Player(300, 300, 60, 60);

const enemyArray = [];
let gameOver = false;
let loadSceen = true;
let round = 0;
let initiated = false; 
let delay = 0;

document.querySelector('#start-game').addEventListener('click', roundZero);
document.querySelector('#reset-game').addEventListener('click', resetGame);

// game loop 
function gameLoop() {
  if (loadSceen) {
    onLoad();
    arrowKeys();
    requestAnimationFrame(gameLoop);
  } else if (gameOver) {
    endGame();
  } else {
    delay++;
    
    if (delay >= 5) {
      delay = 0;
      arrowKeys();
    }

    if (round === 0 && enemyArray.length === 0) {
      round ++;
      roundOne();
    }

    if (round === 1 && enemyArray.length === 0) {
      round ++;
      roundTwo();
    }

    if (round === 2 && enemyArray.length === 0) {
      roundThree();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    collisionHandler();
    enemyHandler();
    keys();
    player.draw(context);
    projectile.move(context);
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);


// round / scorekeeping

// need to be able to increase enemy speed and delay round start in the future
// eneimies can spawn on player, need to move player to center or eneimies off
// canvas when new round starts

function roundZero() {
  loadSceen = false;
  initiated = true;
  spawnHorizontal(3);
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  music.play();
}

// myAudio = new Audio('someSound.ogg'); 


function roundOne() {
  spawnHorizontal(3);
  spawnVerticle(3);
}

function roundTwo() {
  spawnHorizontal(7);
  spawnVerticle(7);
}

function roundThree() {
  spawnHorizontal(11);
  spawnVerticle(11);
}

function spawnVerticle(input) {

  for (let i = 0; i < input; i ++) {
    let x = Math.random() * 50;
    let y = Math.random() * canvas.height;

    enemyArray.push(new Enemy(x, y, 30, 30));
  }

  for (let i = 0; i < input; i ++) { 
    let x = (Math.random() * 50) + 550;
    let y = Math.random() * canvas.height;

    enemyArray.push(new Enemy(x, y, 30, 30));
  }

}

function spawnHorizontal(input) {

  for (let i = 0; i < input; i ++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * 50;

    enemyArray.push(new Enemy(x, y, 30, 30));
  }

  for (let i = 0; i < input; i ++) { 
    let x = Math.random() * canvas.width;
    let y = (Math.random() * 50) + 550;

    enemyArray.push(new Enemy(x, y, 30, 30));
  }

}


// collision managment 

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
      music.pause();
      crash.play();
    }
  });
}

function collisionHandler() {
  projectile.bullets.forEach(function(bullet, bulletIndex) {
    enemyArray.forEach(function (enemy, enemyIndex) {
      if ( enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
        enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
        enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 && 
        enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2 ) {
        sqeak.play();
        enemyArray.splice(enemyIndex, 1);
        projectile.bullets.splice(bulletIndex, 1);
      }
    });
  });
}


// keyboard event listening and managment

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
      /*projectile.speed = */5
    );

    projectile.bullets.push(shoot);
    fireWeapon.play();
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
    fireWeapon.play();
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
      /*projectile.speed = */5
    );

    projectile.bullets.push(shoot);
    fireWeapon.play();
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
      /*projectile.speed = */5
    );

    projectile.bullets.push(shoot);
    fireWeapon.play();
  }

  //32='Space Bar'
  if (keyboard.keyState[32]) {
    if (!initiated) {
      roundZero();
      initiated = true;
    }
  }
}

// load screen / end screen 

function endGame() {
  context.font = '60px Aldrich';
  context.fillStyle = 'black';
  context.fillText('Game Over', 135, 100);
}

function onLoad () {
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

//built in JavaScript to refresh page
function resetGame () {
  onLoad();
  gameOver = false;
  loadSceen = true;
  round = 0;
  initiated = false; 
  gameLoop();
}