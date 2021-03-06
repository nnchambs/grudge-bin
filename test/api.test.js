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
      res.body.length.should.equal(3)
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
      res.body.length.should.equal(4)
      done()
    })
  });



  it('the PATCH route should return an empty array when given a nonexistent id', function(done) {
    chai.request(server)
    .patch('/api/grudge/999')
    .field('_method', 'patch')
    .field('forgivenStatus', 'true')
    .end(function(err, res) {
      res.should.have.status(200)
      res.body.length.should.equal(0)
      done()
    })
  });

  it('the GET route should respond with a single grudge', function(done) {
    chai.request(server)
    .get('/api/grudge/1')
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.name.should.equal('Andrew Crist')
      done()
    })
  });

  xit('the GET route should respond with an error if the requested grudge is not found', function(done) {
    chai.request(server)
    .get('/api/grudge/999')
    .end(function(err, res) {
      res.should.have.status(404);
      done()
    })
  });


})
