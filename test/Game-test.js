global.Image = class {};
global.window = {};

const chai = require('chai');
const assert = chai.assert;
const Enemy = require('../lib/Enemy.js');
const Game = require('../lib/Game.js')

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

  it.only('should detect enemys that are colliding and seperate them', () => {
   
    const enemy1 = new Enemy(270, 300, 30, 30);
    enemy1.targetX = 300;
    enemy1.targetY = 300;

    const enemy2 = new Enemy(330, 300, 30, 30);
    enemy2.targetX = 300;
    enemy2.targetY = 300;

    game.enemyArray.push(enemy1, enemy2);
    //console.log(game.enemyArray);
    
    assert.equal(game.enemyArray[0].colliding, false);
    assert.equal(game.enemyArray[1].colliding, false);
    
    game.enemyColliding();
    console.log(game.enemyArray);

    assert.equal(game.enemyArray[0].colliding, true);
    //assert.equal(game.enemyArray[1].colliding, true);


  });

});