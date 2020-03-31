const playlistModel = require('../schemas/playlist');
const userModel = require('../schemas/user');
const index = require('../index');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Playlist', () => {

  /**
   * Test Create Playlist
   */
  describe('Create Playlist', () => {
    it('it should not create playlist whithout a name given', (done) => {
      let playlist = {};
      chai.request(index)
      .post('/')
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('Failed').eql('Error');
        done();
      });
    });

    it('It should create a playlist', (done) => {
      let playlist = {
        name: "newPlaylist"
      };
      chai.request(index)
      .post('/')
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Created');
        done();
      });
    });
  });

  /**
   * Test Get Playlist
   */
  describe('Get Playlist', () => {
    it('It should get a playlist by its id', (done) => {
      let playlist = new playlistModel({
        name: "newPlaylist"
      });
      playlistModel.create(playlist);
      chai.request(index)
      .get('/playlist/' + playlist.id)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('_id').eql(playlist.id);
        done();
      });
    });
  });

  /**
   * Test Like Playlist
   */
  describe('Like Playlist', () => {
    it('It adds the id of a playlist to the user and the id of him/her to the playlist', (done, userToken) => {
      let playlist = new playlistModel({
        name: "newPlaylist"
      });
      let user = new userModel({
        name: "Sherif"
      });
      playlistModel.create(playlist);
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(index)
      .put('/playlist/'+ playlist.id)
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Liked');
        done();
      });
    });
  });
});
