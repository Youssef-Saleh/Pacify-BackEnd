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
    it('In case of no name given, it names the playlist "New Playlist"', (done) => {
      let playlist = {
        name: ""
      };
      let user = new userModel({
        name: "Sherif"
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(index)
      .post('/')
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('New Playlist');
        res.body.should.have.property('type').eql('userCreated');
        done();
      });
    });

    it('It should create a playlist with the name given', (done) => {
      let playlist = {
        name: "myPlaylist"
      };
      let user = new userModel({
        name: "Sherif"
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(index)
      .post('/')
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql(playlist.name);
        res.body.should.have.property('type').eql('userCreated');
        done();
      });
    });
  });

  /**
   * Test Get Playlist
   */
  describe('Get Playlist', () => {
    it('It should return playlist songs\' IDs', (done) => {
      let playlist = new playlistModel({
        name: "myPlaylist",
        type: "userCreated"
      });
      playlistModel.create(playlist);
      chai.request(index)
      .get('/collection/playlist/' + playlist.id)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  });

  /**
   * Test Like Playlist
   */
  describe('Like Playlist', () => {
    it('It likes the playlist', (done, userToken) => {
      let playlist = new playlistModel({
        name: "myPlaylist",
        type: "userCreated"
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

    it('It unlikes the playlist', (done, userToken) => {
      let playlist = new playlistModel({
        name: "myPlaylist",
        type: "userCreated"
      });
      playlistModel.create(playlist);
      let user = new userModel({
        name: "Sherif",
        likedPlaylists: [playlist._id]
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(index)
      .put('/playlist/'+ playlist.id)
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Unliked');
        done();
      });
    });
  });
});
