const Player = require ('./Player.js');
const Projectile = require ('./Projectile.js');
const Keyboard = require ('./Keyboard.js');
const Game = require ('./Game.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const game = new Game();
const player = new Player(400, 300, 50, 50);
const music = new Audio('../sounds/eight-bit.mp3');
let loadSceen = true;
let initiated = false; 
let delay = 0;

document.querySelector('#start-game').addEventListener('click', function () {
  if (!initiated) {
    loadSceen = false;
    initiated = true;
    game.levels(canvas);
  }
});

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
    music.volume = 0.2;
    music.play();

    delay++;    
    if (delay >= 10) {
      delay = 0;
      arrowKeys();
    }
    keyboardEventHandeler(keyboard.keyState);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    game.animate(context, canvas);
    
    player.playerCollision(game.enemyArray, context, player);
    player.draw(context);
    
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

function keyboardEventHandeler(keyState) {
  Object.keys(player.gameKeys).forEach((keyCode)=> {
    if (keyState[keyCode] === true) {
      player.gameKeys[keyCode]();
    }
  });
}

function arrowKeys() {

  if (game.bullets.length < 5) {
    //37='left arrow'
    if (keyboard.keyState[37]) {
      let shoot = new Projectile(
        player,
        -1, //projectile.xd
        0, //projectile.yd
        'left' //projectile.direction
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
    //38='Up Arrow'
    if (keyboard.keyState[38]) {
      let shoot = new Projectile(
        player,       
        0, /*projectile.xd = */ 
        -1, /*projectile.yd = */ 
        'up' /*projectile.direction = */ 
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
    //39='Right Arrow'
    if (keyboard.keyState[39]) {
      let shoot = new Projectile(
        player,
        1, /*projectile.xd = */ 
        0, /*projectile.yd = */ 
        'right' /*projectile.direction = */ 
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }

    //40='Down Arrow'
    if (keyboard.keyState[40]) {
      let shoot = new Projectile(
        player, 
        0, /*projectile.xd = */
        1, /*projectile.yd = */ 
        'down' /*projectile.direction = */ 
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
  }
}

