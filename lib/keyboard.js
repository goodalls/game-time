module.exports = class Keyboard {
  constructor() {
    this.keyState = {};
    let self = this;

    window.onkeydown = function (event) {
      self.keyState[event.keyCode] = true;
      if ( Object.values(self.keys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    };

    window.onkeyup = function (event) {
      self.keyState[event.keyCode] = false;
      if ( Object.values(self.keys).includes(event.keyCode) ) {
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

    } 
  }
};