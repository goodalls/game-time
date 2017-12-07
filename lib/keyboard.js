module.exports = class Keyboard {
  constructor() {
    this.keyState = {};

    window.onkeydown = (event) => {
      this.keyState[event.keyCode] = true;
      if ( Object.values(this.keys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    };

    window.onkeyup = (event) => {
      this.keyState[event.keyCode] = false;
      if ( Object.values(this.keys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    };

    this.keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      W: 87,
      A: 65,
      S: 83,
      D: 68,
    };
  }
};