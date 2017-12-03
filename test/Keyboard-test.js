const chai = require('chai');
const expect = chai.expect;
const Keyboard = require('../lib/Keyboard.js');

global.document = {
	getElementById: function() {}
};

global.window = document.defaultView;


describe.skip('Keyboard unit testing', () => {

  beforeEach(() => {
    keyboard = new Keyboard();
  });

  it('should instantiate a Keyboard', () => {
    assert.isObject(keyboard);
  });


});