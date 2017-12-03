const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/Player');

global.Audio = class {};
global.Image = class {};

beforeEach( () => {
  player = new Player(300, 300, 30, 30);
});

describe('Player unit testing', () => {
  
  it('should instantiate a player', () => {
      assert.isObject(player); 
  });

  it('should take arguments for x, y, h and w', () => {
    assert.equal(player.x, 300);
    assert.equal(player.y, 300);
    assert.equal(player.h, 30);
    assert.equal(player.w, 30);
  });

  it('should have a default speed of 5', () => {
    assert.equal(player.speed, 5);
  });

  it('should be able to take an argument for speed', () => {
    player = new Player(300, 300, 30, 30, 10);

    assert.equal(player.speed, 10);
  });

  it('should have a default of isOnBoard set to true ', () => {
    assert.equal(player.isOnBoard, true);
  });

});