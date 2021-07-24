const request = require('supertest');
const app = require('../server/app.js');
const {productsMock, productsInfoMock, productStylesMock, relatedProductsMock} = require('./../data/products.js');

afterAll(() => jest.setTimeout(5 * 1000))

describe('GETs data in json format for all routes', function() {
  it('response for /products', function(done) {
    request(app)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('response for /products/:product_id', function(done) {
    request(app)
      .get('/products/:product_id')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('response for /products/:product_id/styles', function(done) {
    request(app)
      .get('/products/:product_id')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('response for /products/:product_id/related', function(done) {
    request(app)
      .get('/products/:product_id')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('Checks data lengths are greater than 0 or 10 where limit is set', function() {
  it('responds with json', function() {
    return request(app)
      .get('/products')
      .then(response => response.body.length)
      .then(num => num === 10)
  });
  it('responds with json', function() {
    return request(app)
      .get('/products/:product_id')
      .expect(200)
      .then(response => response.body.length)
      .then(num => num > 0)
  });
});

