import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: '/api/v1',
      }, done);
  });
});

describe('GET /api/v1/sample-controller', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/sample-controller')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});
