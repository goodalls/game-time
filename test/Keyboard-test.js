global.window = {};

const chai = require('chai');
const assert = chai.assert;
const Keyboard = require('../lib/Keyboard.js');

describe('Keyboard unit testing', () => {

  beforeEach(() => {
    keyboard = new Keyboard();
  });

  it('should instantiate a Keyboard', () => {
    assert.isObject(keyboard);
  });
  

});