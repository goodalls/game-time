module.exports = class Keyboard {
  constructor() {
    this.keyState = {};
    let self = this;

    window.onkeydown = function (event) {
      event.preventDefault();
      self.keyState[event.keyCode] = true;
    };

    window.onkeyup = function (event) {
      event.preventDefault();
      self.keyState[event.keyCode] = false;
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