const Player = require ('./Player.js');
//const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js');
const Keyboard = require ('./Keyboard.js')
const Game = require ('./Game.js')
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const game = new Game();

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

// const enemyArray = [];
let gameOver = false;
let loadSceen = true;
// let round = 0;
let initiated = false; 
let delay = 0;

document.querySelector('#start-game').addEventListener('click', roundZero);
document.querySelector('#reset-game').addEventListener('click', game.resetGame);
// game loop 

// game loop 
function gameLoop() {
  if (loadSceen) {
    game.onLoad(context, canvas);
    arrowKeys();
    requestAnimationFrame(gameLoop);
  } else if (gameOver) {
    game.endGame();
  } else {
    delay++;
    
    if (delay >= 5) {
      delay = 0;
      arrowKeys();
    }

    if (game.round === 0 && game.enemyArray.length === 0) {
      game.round ++;
      roundOne(canvas);
    }

    if (game.round === 1 && game.enemyArray.length === 0) {
      game.round ++;
      roundTwo(canvas);
    }

    if (game.round === 2 && game.enemyArray.length === 0) {
      roundThree(canvas);
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


// game.round / scorekeeping

// Need to be able to increase enemy speed and delay game.
// Eneimies can spawn on player. 
// Need to move player to center or enemies off canvas when new round starts

function roundZero() {
  loadSceen = false;
  initiated = true;
  game.spawnHorizontal(3, canvas);  
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  music.play();
}

// myAudio = new Audio('someSound.ogg'); 


function roundOne() {
  game.spawnHorizontal(3, canvas);
  game.spawnVerticle(3, canvas);
}

function roundTwo() {
  game.spawnHorizontal(7, canvas);
  game.spawnVerticle(7, canvas);
}

function roundThree() {
  game.spawnHorizontal(11, canvas);
  game.spawnVerticle(11, canvas);
}

// function spawnVerticle(input) {

//   for (let i = 0; i < input; i ++) {
//     let x = Math.random() * 50;
//     let y = Math.random() * canvas.height;

//     enemyArray.push(new Enemy(x, y, 30, 30));
//   }

//   for (let i = 0; i < input; i ++) { 
//     let x = (Math.random() * 50) + 550;
//     let y = Math.random() * canvas.height;

//     enemyArray.push(new Enemy(x, y, 30, 30));
//   }
// }

// function spawnHorizontal(input) {

//   for (let i = 0; i < input; i ++) {
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * 50;

//     enemyArray.push(new Enemy(x, y, 30, 30));
//   }

//   for (let i = 0; i < input; i ++) { 
//     let x = Math.random() * canvas.width;
//     let y = (Math.random() * 50) + 550;

//     enemyArray.push(new Enemy(x, y, 30, 30));
//   }

// }


// collision managment 

function enemyHandler() {
  game.enemyArray.forEach(function (enemy) {
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
    game.enemyArray.forEach(function (enemy, enemyIndex) {
      if ( enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 &&
        enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 &&
        enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 && 
        enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2 ) {
        game.enemyArray.splice(enemyIndex, 1);
        sqeak.play();
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
      roundZero(canvas);
      initiated = true;
    }
  }
}
