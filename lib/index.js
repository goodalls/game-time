const Player = require ('./Player.js');
const Projectile = require ('./Projectile.js');
const Keyboard = require ('./Keyboard.js');
const Game = require ('./Game.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const game = new Game();

const music = new Audio('../sounds/eight-bit.mp3');

music.volume = 0.2;

const projectile = new Projectile();
const player = new Player(300, 300, 50, 50);

let loadSceen = true;
let initiated = false; 
let delay = 0;

document.querySelector('#start-game').addEventListener('click', game.levels);
document.querySelector('#reset-game').addEventListener('click', game.resetGame);
 

// game loop 
function gameLoop() {
  
  if (loadSceen) {
    game.onLoad(context, canvas);
    arrowKeys();
    requestAnimationFrame(gameLoop);
  } else if (game.gameOver) {
    game.sounds(false);
    game.sounds('end');
    game.endGame(context);
  } else {

    music.addEventListener('ended', () => {
      this.currentTime = 0;
      this.play();
    }, false);
    music.play();

    delay++;
    
    if (delay >= 5) {
      delay = 0;
      arrowKeys();
    }

    if ( game.enemyArray.length === 0 ) {
      game.round ++;
      game.score += 100;
      game.levels(canvas);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    projectile.projectileCollision(game);
    player.playerCollision(game.enemyArray, context, player);
    keys();
    player.draw(context);
    game.enemyArray.forEach( (item)  => {
      item.draw(context);
    });
    projectile.move(context);
    requestAnimationFrame(gameLoop);
  }

  if (player.isDead) {
    game.gameOver = true;
    music.pause();
  }

}

requestAnimationFrame(gameLoop);

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
  if (keyboard.keyState[83] && player.y + (player.h / 2) < 800) {
    player.y += player.speed;
  }
  //68='D'
  if (keyboard.keyState[68] && player.x + (player.w / 2) < 800) {
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
    game.sounds('fire');
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
    game.sounds('fire');
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
    game.sounds('fire');
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
    game.sounds('fire');
  }

  //32='Space Bar'
  if (keyboard.keyState[32]) {
    if (!initiated) {
      loadSceen = false;
      initiated = true;
      game.levels(canvas);
    }
  }
}