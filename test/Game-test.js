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
    game.spawn(20, 800);
    assert.equal(game.enemyArray.length, 80);
  });

  it('should detect other enemys and not overlap', () => {

    game.spawn(1, 800);

    game.enemyArray[0].x = 15
    game.enemyArray[1].x = 10
    game.enemyArray[0].y = 15
    game.enemyArray[1].y = 10
    game.enemyArray[2].x = 15
    game.enemyArray[3].x = 10
    game.enemyArray[2].y = 15
    game.enemyArray[3].y = 10
    game.enemyColliding();
    assert.equal(game.enemyArray[0].colliding, true)
    assert.equal(game.enemyArray[1].colliding, true)

    game.enemyArray[0].x = 10
    game.enemyArray[1].x = 100
    game.enemyArray[0].y = 10
    game.enemyArray[1].y = 100

    assert.equal(game.enemyArray[0].colliding, false)
    assert.equal(game.enemyArray[1].colliding, false)
    
    
  });

});