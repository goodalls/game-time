

module.exports = class Keyboard {
  constructor() {
    this.keyState = {};
    let self = this;

    window.onkeydown = function (event) {
      event.preventDefault()
      self.keyState[event.keyCode] = true;
    }

    window.onkeyup = function (event) {
      event.preventDefault()
      self.keyState[event.keyCode] = false;
    }

    this.isDown = function (keyCode) {
      return self.keyState[keyCode] === true;
    }
  }
}