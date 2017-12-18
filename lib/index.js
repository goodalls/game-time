const Player = require('./Player.js');
const Projectile = require('./Projectile.js');
const Keyboard = require('./Keyboard.js');
const Game = require('./Game.js');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const game = new Game();
const player = new Player(400, 300, 50, 50);
const music = new Audio('../sounds/eight-bit.mp3');
let loadSceen = true;
let initiated = false;
let delay = 0


document.querySelector('#reset-game').addEventListener('click', game.resetGame);
document.querySelector('#start-game').addEventListener('click', function () {
  if (!initiated) {
    loadSceen = false;
    initiated = true;
    game.levels(canvas);
  }
});


// game loop 
function gameLoop() {

  if (loadSceen) {
    game.onLoad(context, canvas);
    // arrowKeys();
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

    keyboardEventHandelerMovement(keyboard.keyState);
    keyboardEventHandelerShooting(keyboard.keyState);

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

const arrowKeys = {
  37: () => {
    //37='left arrow'
    if (game.bullets.length < 5) {
      let shoot = new Projectile(
        player,
        -1, //projectile.xd
        0, //projectile.yd
        'left' //projectile.direction
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
  },

  38: () => {
    //up arrow
    if (game.bullets.length < 5) {
      let shoot = new Projectile(
        player,
        0, /*projectile.xd = */
        -1, /*projectile.yd = */
        'up' /*projectile.direction = */
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
  },

  39: () => {
    //right arrow
    if (game.bullets.length < 5) {
      let shoot = new Projectile(
        player,
        1, /*projectile.xd = */
        0, /*projectile.yd = */
        'right' /*projectile.direction = */
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
  },

  40: () => {
    //down arrow
    if (game.bullets.length < 5) {
      let shoot = new Projectile(
        player,
        0, /*projectile.xd = */
        1, /*projectile.yd = */
        'down' /*projectile.direction = */
      );

      game.bullets.push(shoot);
      game.sounds('fire');
    }
  },
}

const movementKeys = {
  87: () => {
    if (player.y - (player.h / 2) > 0) {
      player.y -= player.speed;
    }
  },

  65: () => {
    if (player.x - (player.w / 2) > 0) {
      player.x -= player.speed;
    }
  },

  83: () => {
    if (player.y + (player.h / 2) < 600) {
      player.y += player.speed;
    }
  },

  68: () => {
    if (player.x + (player.w / 2) < 800) {
      player.x += player.speed;
    }
  },

  32: () => {
    if (!game.initiated) {
      game.loadSceen = false;
      game.initiated = true;
      game.levels(canvas);
    }
  }
};

function keyboardEventHandelerMovement(keyState) {
  Object.keys(movementKeys).forEach((keyCode) => {
    if (keyState[keyCode]) {
      movementKeys[keyCode]();
    }
  });
}

function keyboardEventHandelerShooting(keyState) {
  delay++
  Object.keys(arrowKeys).forEach((keyCode) => {
    if (keyState[keyCode]) {
      if (delay >= 20) {
        arrowKeys[keyCode]();
        delay = 0;
      }
    }
  });
}