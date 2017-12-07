global.Image = class {};
global.window = {};

const chai = require('chai');
const assert = chai.assert;
const Enemy = require('../lib/Enemy.js');
const Game = require('../lib/Game.js');

beforeEach( () => {
  game = new Game();
});

describe('Game unit testing', () => {
  
  it('should instantiate a game', () => {
    assert.isObject(game);
  });

  it('should have a default enemyArray set to an empty array', () => {
    assert.isArray(game.enemyArray);
    assert.deepEqual(game.enemyArray, []); 
  });

  it('should have defaults of gameOver and initiated set to false', () => {
    assert.equal(game.gameOver, false);
    assert.equal(game.initiated, false);
  });

  it('should have a default of loadSceen set to true', () => {
    assert.equal(game.loadScreen, true);
  });

  it('should have defaults of round score and delay defaults set to -100 and 0', () => {
    assert.equal(game.round, 0);
    assert.equal(game.score, -100);
    assert.equal(game.delay, 0);
  });

  it('should be able to spawn enemies', () => {
    assert.equal(game.enemyArray.length, 0);
    game.spawn(20);
    assert.equal(game.enemyArray.length, 20);
  });

  it.skip('should detect other enemys and not overlap', () => {

    game.spawn(20);
    assert.equal(game.enemyArray[0])
  
  });

});