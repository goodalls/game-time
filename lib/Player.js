const GamePiece = require('./GamePiece.js');

module.exports = class Player extends GamePiece {
  constructor(x, y, w, h) {
    super(... arguments)
    this.isOnBoard = true;

  }

  draw(context) {
    context.fillRect(this.x, this.y, this.w, this.h);
  } 
  moveUp(){
    if (this.isOnBoard === true){
    this.y -= 10
    }
  };
  moveDown(){
    if(this.isOnBoard === true){
     this.y += 10
     } 
  }; 
  moveLeft(){
    if (this.isOnBoard === true){
    this.x -= 10
    }
  } 
  moveRight(){
    if (this.isOnBoard === true){
    this.x += 10
    }
  }
  onBoard(canvas){
    console.log(this)
  if (this.x + this.w > canvas.width || this.x - this.w < 0){
    return this.isOnBoard = false; 
  }
  else if (this.y + this.h > canvas.height || this.y - this.h < 0){
    return this.isOnBoard = false;
  } else{
    return this.isOnBoard = true;
  }
  }
  // move(context){
    
  //   this.window.addEventListener('keydown', function(e){
  //     if (e.keyCode === 87){
  //       this.y -= 10
  //     }
  //     if (e.keyCode === 65){
  //       this.y += 10
  //     }
  //     if (e.keyCode === 83){
  //       this.x -= 10
  //     }
  //     if (e.keyCode === 68){
  //       this.x += 10
  //     }});
  // };
  };

  // var KeyBoarder = function() {
  //       var keyState = {};
  //       window.onkeydown = function(e) {
  //           keyState[e.keyCode] = true;
  //       };
  //       window.onkeyup = function(e) {
  //           keyState[e.keyCode] = false;
  //       };
  //       this.isDown = function(keyCode) {
  //           return keyState[keyCode] === true;
  //       };
  //       this.KEYS = {
  //           LEFT: 37,
  //           RIGHT: 39,
  //           SPACE: 32
  //       };





