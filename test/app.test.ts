import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';

describe('home test', () => {
  it('should return appropiate message', () => {
    request(app)
      .get('/')
      .expect(200)
      .end((err: Error, res) => {
        if (err) throw err;
        expect(res.text).to.eql('Project Fiber');
      });
  });
});
