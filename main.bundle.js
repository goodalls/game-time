/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(1);
	const Projectile = __webpack_require__(5);
	const Keyboard = __webpack_require__(6);
	const Game = __webpack_require__(3);
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const game = new Game();
	const player = new Player(400, 300, 50, 50);
	const music = new Audio('../sounds/eight-bit.mp3');
	let loadSceen = true;
	let initiated = false;
	let delay = 0;

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
	      let shoot = new Projectile(player, -1, //projectile.xd
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
	      let shoot = new Projectile(player, 0, /*projectile.xd = */
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
	      let shoot = new Projectile(player, 1, /*projectile.xd = */
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
	      let shoot = new Projectile(player, 0, /*projectile.xd = */
	      1, /*projectile.yd = */
	      'down' /*projectile.direction = */
	      );

	      game.bullets.push(shoot);
	      game.sounds('fire');
	    }
	  }
	};

	const movementKeys = {
	  87: () => {
	    if (player.y - player.h / 2 > 0) {
	      player.y -= player.speed;
	    }
	  },

	  65: () => {
	    if (player.x - player.w / 2 > 0) {
	      player.x -= player.speed;
	    }
	  },

	  83: () => {
	    if (player.y + player.h / 2 < 600) {
	      player.y += player.speed;
	    }
	  },

	  68: () => {
	    if (player.x + player.w / 2 < 800) {
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
	  Object.keys(movementKeys).forEach(keyCode => {
	    if (keyState[keyCode]) {
	      movementKeys[keyCode]();
	    }
	  });
	}

	function keyboardEventHandelerShooting(keyState) {
	  delay++;
	  Object.keys(arrowKeys).forEach(keyCode => {
	    if (keyState[keyCode]) {
	      if (delay >= 20) {
	        arrowKeys[keyCode]();
	        delay = 0;
	      }
	    }
	  });
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(2);
	const playerImg = new Image();
	const game = __webpack_require__(3);
	const Projectile = __webpack_require__(5);
	const player = __webpack_require__(1);

	// images
	playerImg.src = '../images/player2_160.png';

	//sounds
	const crash = new Audio('../sounds/crash.wav');

	crash.volume = 0.3;

	module.exports = class Player extends GamePiece {
	  constructor(x, y, h, w, speed = 3) {
	    super(x, y, h, w);
	    this.speed = speed;
	    this.isDead = false;
	  }

	  draw(context) {
	    context.drawImage(playerImg, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
	  }

	  playerCollision(array, context, player) {
	    array.forEach(item => {
	      item.targetX = player.x;
	      item.targetY = player.y;
	      item.seekPlayer();
	      if (item.x + item.w / 2 >= player.x - player.w / 2 && item.x - item.w / 2 <= player.x + player.w / 2 && item.y + item.h / 2 >= player.y - player.h / 2 && item.y - item.h / 2 <= player.y + player.h / 2) {
	        player.isDead = true;
	      }
	    });
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = class GamePiece {
	  constructor(x, y, w, h) {
	    this.x = x;
	    this.y = y;
	    this.w = w;
	    this.h = h;
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const Enemy = __webpack_require__(4);
	// const projectile = require('./Projectile.js')
	let highScore = JSON.parse(localStorage.getItem('score'));

	// images 
	const wasdImg = new Image();
	const arrowImg = new Image();

	wasdImg.src = '../images/wasd.png';
	arrowImg.src = '../images/arrow.png';

	module.exports = class Game {
	  constructor() {
	    this.enemyArray = [];
	    this.bullets = [];
	    this.gameOver = false;
	    this.loadScreen = true;
	    this.initiated = false;
	    this.round = 0;
	    this.delay = 0;
	    this.score = -100;
	  }

	  animate(context, canvas) {
	    if (this.enemyArray.length === 0) {
	      this.score += 100;
	      this.levels(canvas);
	    }
	    this.gameStats(context);
	    this.drawBullets(context);
	    this.bulletOnCanvas();
	    this.drawEnemies(context);
	    this.enemyColliding();
	    this.projectileCollision();
	  }

	  // load screen / end screen / reset  

	  resetGame() {
	    window.location.reload(true);
	  }

	  onLoad(context, canvas) {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    context.fillStyle = 'black';
	    context.font = '65px Aldrich';
	    context.fillText('Ducky\'s Demise', 142, 85);
	    context.font = '30px Aldrich';
	    context.fillText('use WASD keys to move', 220, 155);
	    context.drawImage(wasdImg, 340, 185, 125, 125);
	    context.fillText('use arrow keys to shoot', 215, 370);
	    context.drawImage(arrowImg, 340, 390, 125, 125);
	    context.fillText('press space bar to begin', 210, 550);
	  }

	  endGame(context) {

	    if (this.score > highScore) {
	      localStorage.setItem('score', JSON.stringify(this.score));
	    }

	    if (this.score > highScore) {
	      highScore = this.score;
	    }

	    context.fillStyle = 'black';
	    context.font = '70px Aldrich';
	    context.fillText('Game Over', 205, 200);
	    context.font = '40px Aldrich';
	    context.fillText(`Score This Game: ${this.score}`, 175, 300);
	    context.fillText(`Your All-Time High Score : ${highScore}`, 100, 400);
	  }

	  gameStats(context) {
	    context.fillStyle = 'black';
	    context.font = '22px Aldrich';
	    context.fillText(`Level: ${this.round}`, 15, 30);
	    context.fillText(`Score: ${this.score}`, 345, 30);
	    context.fillText(`Ducks: ${this.enemyArray.length}`, 690, 30);
	  }

	  levels(canvas) {
	    this.score += 100;
	    this.round += 1;
	    let spawnNumber = this.round * 0.5;

	    this.spawn(spawnNumber, canvas);
	  }

	  spawn(spawnNumber, canvas) {
	    for (let i = 0; i < spawnNumber; i++) {
	      let x1 = Math.random() * canvas.width;
	      let x2 = Math.random() * canvas.width;

	      let y1 = Math.random() * -400;
	      let y2 = Math.random() * 400 + canvas.width;

	      this.enemyArray.push(new Enemy(x1, y1, 30, 30), new Enemy(x2, y2, 30, 30), new Enemy(y1, x1, 30, 30), new Enemy(y2, x2, 30, 30));
	    }
	  }

	  // sound managment

	  sounds(sound) {
	    const sqeak = new Audio('../sounds/sqeak.wav');
	    const fireWeapon = new Audio('../sounds/shoot.wav');
	    const crash = new Audio('../sounds/crash.wav');

	    sqeak.volume = 0.2;
	    fireWeapon.volume = 0.4;
	    crash.volume = 0.3;

	    if (sound === 'fire') {
	      fireWeapon.play();
	    }

	    if (sound === 'end') {
	      crash.play();
	    }

	    if (sound === 'squeak') {
	      sqeak.play();
	    }
	  }

	  //enemy managment

	  drawEnemies(context) {
	    this.enemyArray.forEach(item => {
	      item.draw(context);
	    });
	  }

	  enemyColliding() {
	    this.enemyArray.forEach(enemy1 => {
	      this.enemyArray.forEach(enemy2 => {
	        if (enemy1 !== enemy2 && enemy1.x + enemy1.w >= enemy2.x - enemy2.w && enemy1.x - enemy1.w <= enemy2.x + enemy2.w && enemy1.y + enemy1.h >= enemy2.y - enemy2.h && enemy1.y - enemy1.h <= enemy2.y + enemy2.h) {
	          enemy1.colliding = true;
	          enemy2.colliding = true;
	          enemy1.x -= enemy1.dx;
	          enemy1.y += enemy1.dy;

	          enemy2.x += enemy2.dx;
	          enemy2.y -= enemy2.dy;
	        } else {
	          enemy1.colliding = false;
	          enemy2.colliding = false;
	        }
	      });
	    });
	  }

	  //Projectile Management

	  drawBullets(context) {
	    this.bullets.forEach(bullet => {
	      bullet.move(bullet);
	      bullet.draw(context);
	    });
	  }

	  bulletOnCanvas() {
	    this.bullets.forEach(function (bullet, index, array) {
	      if (bullet.x <= 0 || bullet.x >= 800) {
	        array.splice(index, 1);
	      }

	      if (bullet.y <= 0 || bullet.y >= 600) {
	        array.splice(index, 1);
	      }
	    });
	  }

	  projectileCollision() {
	    this.bullets.forEach((bullet, bulletIndex) => {
	      this.enemyArray.forEach((enemy, enemyIndex) => {
	        if (enemy.x + enemy.w / 2 >= bullet.x - bullet.w / 2 && enemy.x - enemy.w / 2 <= bullet.x + bullet.w / 2 && enemy.y + enemy.h / 2 >= bullet.y - bullet.h / 2 && enemy.y - enemy.h / 2 <= bullet.y + bullet.h / 2) {
	          this.enemyArray.splice(enemyIndex, 1);
	          this.sounds('squeak');
	          this.bullets.splice(bulletIndex, 1);
	          this.score += 10;
	        }
	      });
	    });
	  }

	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(2);
	const duckImg = new Image();

	duckImg.src = '../images/ducky.jpg';

	module.exports = class Enemy extends GamePiece {
	  constructor(x, y, w, h, speed) {
	    super(x, y, w, h);
	    this.targetY = null;
	    this.targetX = null;
	    this.dx = 0;
	    this.dy = 0;
	    this.colliding = false;
	    this.speed = speed;
	  }

	  draw(context) {
	    context.drawImage(duckImg, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
	  }

	  seekPlayer() {

	    const oppositeLine = this.targetY - this.y;
	    const adjacentLine = this.targetX - this.x;
	    const angle = Math.atan(oppositeLine / adjacentLine);

	    this.dx = Math.cos(angle);
	    this.dy = Math.sin(angle);

	    if (this.targetX < this.x) {
	      this.dy = -this.dy;
	      this.dx = -this.dx;
	    }

	    if (this.colliding === false) {
	      this.x += this.dx;
	      this.y += this.dy;
	    }
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const GamePiece = __webpack_require__(2);

	module.exports = class Projectile extends GamePiece {
	  constructor(player, xd, yd, direction, h = 10, w = 10, speed = 5) {
	    super(h, w);
	    this.x = player.x;
	    this.y = player.y;
	    this.h = h;
	    this.w = w;
	    this.xd = xd;
	    this.yd = yd;
	    this.direction = direction;
	    this.speed = speed;
	    this.bulletCollision = false;
	    this.one = Math.round(Math.random());
	  }

	  draw(context) {
	    let num = this.one;

	    context.font = '12px Aldrich';
	    context.fillText(num, this.x - 10, this.y - 10);
	  }

	  move(bullet) {
	    if (bullet.direction === 'up') {
	      bullet.y += bullet.yd * bullet.speed;
	    }

	    if (bullet.direction === 'down') {
	      bullet.y += bullet.yd * bullet.speed;
	    }

	    if (bullet.direction === 'left') {
	      bullet.x += bullet.xd * bullet.speed;
	    }

	    if (bullet.direction === 'right') {
	      bullet.x += bullet.xd * bullet.speed;
	    }
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const player = __webpack_require__(1);

	module.exports = class Keyboard {
	  constructor() {
	    this.keyState = {};

	    window.onkeydown = event => {
	      this.keyState[event.keyCode] = true;
	      if (Object.keys(this.Keys).map(Number).includes(event.keyCode)) {
	        event.preventDefault();
	      }
	    };

	    window.onkeyup = event => {
	      this.keyState[event.keyCode] = false;

	      if (Object.keys(this.Keys).map(Number).includes(event.keyCode)) {
	        event.preventDefault();
	      }
	    };

	    this.Keys = {
	      87: 'w',
	      65: 'a',
	      83: 's',
	      68: 'd',
	      32: 'space',
	      37: 'left arrow',
	      38: 'up arrow',
	      39: 'right arrow',
	      40: 'down arrow'
	    };
	  }
	};

/***/ })
/******/ ]);