const mongoose = require('mongoose');
const userModel = require('../Database Seeds/models/user');
const app = require('../app');
const authVar = require('../env_variables/env_vars.json').KEY
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Home Playlists', () => {
  /**
   * Test home playlists
   */
  describe('Get Home Playlists', () => {

    it('It should return different types of playlists', (done) => {
      chai.request(app)
      .get('/homePlaylists')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
  });
});