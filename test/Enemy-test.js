global.Image = class {};
global.Audio = class {};

const chai = require('chai');
const assert = chai.assert;
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');


beforeEach( () => {
  enemy = new Enemy(300, 300, 20, 20);
});

describe('Enemy unit testing', () => {

  it('should instantiate an enemy', ()=> {
    assert.isObject(enemy);
  });

  it('should take aruguments for x, y, h, and w', () => {
    assert.equal(enemy.x, 300);
    assert.equal(enemy.y, 300);
    assert.equal(enemy.h, 20);
    assert.equal(enemy.w, 20);
  });

  it('should have defaults of targetY and targetX set to null', () => {
    assert.equal(enemy.targetY, null);
    assert.equal(enemy.targetX, null);
  });

  it('should have defaults of dx and dy set to 0', () => {
    assert.equal(enemy.dx, 0);
    assert.equal(enemy.dy, 0);
  });

  it('should have a default enemyArray set to an empty array', () => {
    assert.isArray(enemy.enemyArray);
    assert.deepEqual(enemy.enemyArray, []); 
  });

  it('should be able to seek the player', () => {
    player = new Player(250, 250, 30, 30);
    
    assert.equal(enemy.targetY, null);
    assert.equal(enemy.targetX, null);
    assert.equal(enemy.dx, 0);
    assert.equal(enemy.dy, 0);

    enemy.targetX = player.x;
    enemy.targetY = player.y;

    enemy.seekPlayer();

    assert.equal(enemy.targetX, 250);
    assert.equal(enemy.targetY, 250);
    assert.equal(enemy.dx, -0.7071067811865476);
    assert.equal(enemy.dy, -0.7071067811865475);
  });

});
