const request = require('supertest');
const app = require('../index');

describe('GET /', function() {
    it('respond with 200', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .then(response => {
            expect(response.text).toContain('Great to have you here');
            done();
        })
    });

    it('respond with 404', function(done) {
        request(app)
          .get('/bogus')
          .expect(404, done);
      });
  });