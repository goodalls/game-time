const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/Player');
const Enemy = require('../lib/Enemy');

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

  it('should have a default speed of 3', () => {
    assert.equal(player.speed, 3);
  });

  it('should be able to take an argument for speed', () => {
    player = new Player(300, 300, 30, 30, 10);

    assert.equal(player.speed, 10);
  });

  it('should have a defaults of isOnBoard set to true and isDead set to false ', () => {
    assert.equal(player.isOnBoard, true);
    assert.equal(player.isDead, false);
  });

  it('should have forEaches through an array and set item.targetX and item.targetY to player.x and player.y', () => {
    const enemyArray = [];
    enemy = new Enemy(200, 200, 20, 20);
    enemyArray.push(enemy);

    assert.equal(enemy.targetX, null);
    assert.equal(enemy.targetY, null);

    player.playerCollision(enemyArray, context, player);
  
    assert.equal(enemy.targetX, 300);
    assert.equal(enemy.targetY, 300);
  });

  it('should have detect collision of the player with the passed in array and then sets player.isDead to true', () => {
    const enemyArray = [];
    enemy = new Enemy(280, 280, 20, 20);
    enemyArray.push(enemy);

    assert.equal(player.isDead, false);

    player.playerCollision(enemyArray, context, player);

    assert.equal(player.isDead, true);
  });

});