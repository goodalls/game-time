const player = require ('./Player.js')

module.exports = class Keyboard {
  constructor() {
    this.keyState = {};

    window.onkeydown = (event) => {
      this.keyState[event.keyCode] = true;
      if ( Object.keys(this.Keys).map(Number).includes(event.keyCode) ) {
        event.preventDefault();
      }
    }

    

    window.onkeyup = (event) => {
      this.keyState[event.keyCode] = false;
      if ( Object.keys(this.Keys).map(Number).includes(event.keyCode) ) {
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
      40: 'down arrow',
    };
  }
};