var supertest = require("supertest");
	   should = require('chai').should();
	   expect = require('chai').expect;
	   request = require('supertest');
	   assert = require('chai').assert;

var server;

describe('Fibonacci Sequence Tests : ', function () {
after(function (done) {
        server.close();
        done();
    });

server = require('../server');
  it('should return 200 on good request', function (done) {
    request(server)
      .get('/9?method=iterative')
      .expect(200, done);
  });
  it('should return 500 on bad request', function (done) {
    request(server)
      .get('/9?metho')
      .expect(500, done);
  });

  it('should return json response', function (done) {
    request(server)
      .get('/9?method=iterative')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
      	expect(res.body).to.have.property("nth");
      	expect(res.body.nth).to.not.equal(null);
      	expect(res.body).to.have.property("value");
      	expect(res.body.elapsed).to.not.equal(null);
      	expect(res.body).to.have.property("timestamp");
      	expect(res.body.timestamp).to.not.equal(null);
      	expect(res.body).to.have.property("elapsed");
      	expect(res.body.elapsed).to.not.equal(null);
      	done();
      });
  });

  it('should return n value iterative', function (done) {
    request(server)
      .get('/19?method=iterative')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
      	assert.equal(res.body.nth,"19");
      	assert.equal(res.body.value,"4181");
      	done();
      });
  });

  it('should return n value recursive', function (done) {
    request(server)
      .get('/10?method=iterative')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
      	assert.equal(res.body.nth,"10");
      	assert.equal(res.body.value,"55");
      	done();
      });
  });

});
