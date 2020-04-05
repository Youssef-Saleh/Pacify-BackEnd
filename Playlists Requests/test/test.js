const playlistModel = require('../models/playlist');
const userModel = require('../models/user');
const app = require('../app');
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
        email: "user1@admin.com",
        password: "secret",
        nickname: "User",
        type: "Free",
        gender: "Male",
        phone: "0123534569"
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(app)
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
        email: "user2@admin.com",
        password: "secret",
        nickname: "User",
        type: "Free",
        gender: "Male",
        phone: "0123534569"
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(app)
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
      chai.request(app)
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
        email: "user3@admin.com",
        password: "secret",
        nickname: "User",
        type: "Free",
        gender: "Male",
        phone: "0123534569"
      });
      playlistModel.create(playlist);
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(app)
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
        email: "user4@admin.com",
        password: "secret",
        nickname: "User",
        type: "Free",
        gender: "Male",
        phone: "0123534569",
        likedPlaylists: [playlist._id]
      });
      userModel.create(user);
      userToken = jwt.sign({users: user}, 'secret');
      chai.request(app)
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

  /**
   * Test Get Trending Playlist
   */
  describe('Get Trending Playlist', () => {
    it('It should return trending playlist', (done) => {
      chai.request(app)
      .get('/playlist/trending')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Trending');
        res.body.should.have.property('type').eql('trending');
        done();
      });
    });
  });

  /**
   * Test Get Highest-Rated Playlist
   */
  describe('Get Highest-Rated Playlist', () => {
    it('It should return highest-rated playlist', (done) => {
      var highestRating;
      playlistModel.aggregate([{$sort: {rating: -1}}]).then((Playlist) => {
        highestRating = Playlist[0].rating;
      });
      chai.request(app)
      .get('/playlist/highestRated')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('rating').eql(highestRating);
        done();
      });
    });
  });

  /**
   * Test Get Random Playlist
   */
  describe('Get Random Playlist', () => {
    it('It should create new random playlist', (done) => {
      chai.request(app)
      .get('/playlist/random')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Random Playlist');
        res.body.should.have.property('type').eql('random');
        done();
      });
    });
  });

   /**
   * Test Get Region-Based Playlist
   */
  describe('Get Region-Based Playlist', () => {
    it('It should return region-based playlist called "Top in Egypt" when query string object.region equals "Egypt"', (done) => {
      chai.request(app)
      .get('/playlist/region')
      .query({region: 'Egypt'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Top in Egypt');
        res.body.should.have.property('type').eql('region');
        done();
      });
    });
  });

   /**
   * Test Get Genre-Based Playlist
   */
  describe('Get Genre-Based Playlist', () => {
    it('It should return genre-based playlist called "Arabic" when query string object.genre equals "Arabic"', (done) => {
      chai.request(app)
      .get('/playlist/genre')
      .query({genre: 'Arabic'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Arabic');
        res.body.should.have.property('type').eql('genreBased');
        done();
      });
    });
  });

   /**
   * Test Get Mood-Based Playlist
   */
  describe('Get Mood-Based Playlist', () => {
    it('It should return mood-based playlist called "Happy" when query string object.mood equals "Happy"', (done) => {
      chai.request(app)
      .get('/playlist/mood')
      .query({mood: 'Happy'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Happy');
        res.body.should.have.property('type').eql('moodBased');
        done();
      });
    });
  });
  
});
