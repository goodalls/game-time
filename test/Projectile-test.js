const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const Projectile = require('../lib/Projectile');

global.Audio = class {};
global.Image = class {};

describe('Projectile unit testing', () => {
  
  beforeEach(() => {
    projectile = new Projectile(30, 30, 5, 5);
  });

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

  it('should have height and width of 5 by default', () => {
    projectile = new Projectile();
    assert.equal(projectile.h, 5);
    assert.equal(projectile.w, 5);
  });
      
  it('should have default speed of 10', () => {
    assert.equal(projectile.speed, 10);
  });

  it('should have default bulletCollision of false', () => {
    assert.equal(projectile.bulletCollision, false);
  });
});