const chai = require('chai');
const expect = chai.expect;
const keyboard = require('../lib/Keyboard.js');

describe('Keyboard unit testing', () => {

  beforeEach(() => {
    keyboard = new Keyboard();
  });

  it('should instantiate a Keyboard', () => {
    assert.isObject(keyboard);
  });


});