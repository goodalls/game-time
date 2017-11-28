const Player = require ('./Player.js');
const Enemy = require ('./Enemy.js');
const Projectile = require ('./Projectile.js')

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const player = new Player(295, 295, 30, 30);

const gameOver = false;

function endGame() {
    context.font = '60px Helvetica';
    context.fillStyle = 'black';
    context.fillText('Game Over', 135, 300);
  }

  window.addEventListener('keydown', function(event, context){
  console.log('event.key')
  if (event.keyCode === 87){
    player.moveUp()
  }
  if (event.keyCode === 65){
    player.moveLeft()
  }
  if (event.keyCode === 83){
    player.moveDown()
  }
  if (event.keyCode === 68){
    player.moveRight()
  }
});

  // window.addEventListener('keydown', function(event, context){
//   console.log('event.key')
//   if (event.keyCode === 87){
//     console.log('W')
//     player.move()
//   }
// } );


// var keyBoard = function() {
//         var keyState = {};
//         window.onkeydown = function(e) {
//             keyState[e.keyCode] = true;
//         };
//         window.onkeyup = function(e) {
//             keyState[e.keyCode] = false;
//         };
//         this.isDown = function(keyCode) {
//             return keyState[keyCode] === true;
//         };
//         this.KEYS = {
//             W: 87,
//             A: 65,
//             S: 83,
//             D: 68,
//             LEFT: 37,
//             UP: 38,
//             RIGHT: 39,
//             DOWN: 40,
//         };
//     };



function gameLoop() {
  
  if (gameOver) {
    endGame();
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(context);
    requestAnimationFrame(gameLoop);
  }
  
  

}
requestAnimationFrame(gameLoop);
