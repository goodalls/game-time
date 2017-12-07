const chai = require('chai');
const assert = chai.assert;
const GamePiece = require('../lib/GamePiece.js');

global.Audio = class {};
global.Image = class {};

beforeEach(() => {
  gamePiece = new GamePiece(30, 30, 5, 5);
});

describe('GamePiece unit testing', () => {
  
  it('should instantiate a GamePiece', () => {
    assert.isObject(gamePiece);
  });

  it('should take arguments for x, y, h and w', () => {
        assert.equal(gamePiece.x, 30);
        assert.equal(gamePiece.y, 30);
        assert.equal(gamePiece.h, 5);
        assert.equal(gamePiece.w, 5);
  });

});