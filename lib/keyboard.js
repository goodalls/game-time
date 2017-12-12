const player = require ('./Player.js')

module.exports = class Keyboard {
  constructor() {
    this.keyState = {};

    window.onkeydown = (event) => {
      this.keyState[event.keyCode] = true;
      if ( Object.values(this.gameKeys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    }

    

    window.onkeyup = (event) => {
      this.keyState[event.keyCode] = false;
      if ( Object.values(this.gameKeys).includes(event.keyCode) ) {
        event.preventDefault();
      }
    };

    this.gameKeys = {
      37: () => {

      },

      38: () => {

      },

      39: () => {

      },

      40: () => {

      },

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
      }
    };
  }
};