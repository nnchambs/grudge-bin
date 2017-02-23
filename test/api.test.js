process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp)

describe('grudge bin routes', function() {
  it('the GET route should return grudges via app.locals.grudges', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(1)
      done()
    })
  });

  it('the POST route should allow a grudge to be posted and return a response', function(done) {
    chai.request(server)
    .post('/api/grudges')
    .field('_method', 'post')
    .field('id', '45')
    .field('name', 'Jamie Lannister')
    .field('offense', 'KINGSLAYER!!!')
    .field('forigven', 'false')
    .field('date', '1969-12-31')
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.length.should.equal(2)
      done()
    })
  });


})
