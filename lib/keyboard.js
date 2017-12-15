const player = require ('./Player.js')

module.exports = class Keyboard {
  constructor() {
    this.keyState = {};

    window.onkeydown = (event) => {
      this.keyState[event.keyCode] = true;
      //player.gameKeys is not working
      if ( Object.keys(player.gameKeys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    }

    

    window.onkeyup = (event) => {
      this.keyState[event.keyCode] = false;
      //player.gameKeys is not working
      if ( Object.keys(player.gameKeys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    };
  }
};