const mongoose = require('mongoose');
const userModel = require('../Database Seeds/models/user');
const app = require('../app');
const authVar = require('../env_variables/env_vars.json').KEY
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Download', () => {
  /**
   * Test download APK file
   */
  describe('Download APK File', () => {

    it('It should download the APK file', (done) => {
      chai.request(app)
      .get('/download')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});