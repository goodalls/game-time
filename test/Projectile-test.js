global.Image = class {};
global.Audio = class {};

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const Projectile = require('../lib/Projectile');
const Enemy = require ('../lib/Enemy.js');
const Game = require('../lib/Game.js');


beforeEach(() => {
  projectile = new Projectile(30, 30, 5, 5);
});

describe('Projectile unit testing', () => {

  it('should instantiate a projectile', () => {
    assert.isObject(projectile);
  });
  it('should take arguments for x, y, h and w', () => {

    projectile = new Projectile(30, 30, 5, 5, -1, 0, 'left', 5, false);
    assert.equal(projectile.x, 30);
    assert.equal(projectile.y, 30);
    assert.equal(projectile.h, 5);
    assert.equal(projectile.w, 5);
    assert.equal(projectile.xd, -1);
    assert.equal(projectile.yd, 0);
    assert.equal(projectile.direction, 'left');
    assert.equal(projectile.speed, 5);
    assert.equal(projectile.bulletCollision, false);
  });

  it('should have empty array called projectile.bullets', () => {
    expect(projectile.bullets.isArray, true);
    assert.deepEqual(projectile.bullets, []);  
  });

  it('should have height and width of 10 by default', () => {
    projectile = new Projectile();
    assert.equal(projectile.h, 10);
    assert.equal(projectile.w, 10);
  });
      
  it('should have default speed of 10', () => {
    assert.equal(projectile.speed, 10);
  });

  it('should have default bulletCollision of false', () => {
    assert.equal(projectile.bulletCollision, false);
  });

  // have to comment out line 55 game.sounds('squeak') in projectile.js 
  it.skip('should detect if a bullet collidies with an enemy, then splice both bullet and enemy and incriment score', () => {
    game = new Game();

    let shoot = new Projectile( player.x, player.y, 5, 5, -1, 0, 'left', 5);
    projectile.bullets.push(shoot);
    
    enemy = new Enemy(300, 300, 20, 20);
    game.enemyArray.push(enemy);
    
    
    assert.equal(projectile.bullets.length, 1);
    assert.equal(game.enemyArray.length, 1);
    assert.equal(game.score, -100);
    
    projectile.projectileCollision(game);
    
    assert.equal(projectile.bullets.length, 0);
    assert.equal(game.enemyArray.length, 0);
    assert.equal(game.score, -90);    

  });
});