var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;
var jsdom = require('mocha-jsdom');
var $ = require('jquery');

const Grudge = require('../src/index.js')


describe('an instance of Grudge', function () {

  it('should instantiate a grudge', function() {
    var grudge = new Grudge();
    assert.isObject(grudge);
  })
})
