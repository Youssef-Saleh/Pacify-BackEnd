const mongoose = require('mongoose');
const userModel = require('../Database Seeds/models/user');
const app = require('../app');
const authVar = require('../env_variables/env_vars.json').KEY
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Playlist', () => {

  /**
   * Test get trending playlist
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
   * Test get highest-rated playlist
   */
  describe('Get Highest-Rated Playlist', () => {
    it('It should return highest-rated playlist', (done) => {
      var highestRating;
      mongoose.connection.db.collection('playlists',function(err, collection){
        collection.aggregate([{$sort: {rating: -1}}]).toArray((err,Playlist) => {
        highestRating = Playlist[0].rating;
        });
      })
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
   * Test get random playlist
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
   * Test get region-based playlist
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
   * Test get genre-based playlist
   */
  describe('Get Genre-Based Playlist', () => {
    it('It should return genre-based playlist called "Arabic" when query string object.genre equals "Arabic"', (done) => {
      chai.request(app)
      .get('/playlist/genre')
      .query({genre: 'Arabic'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('genre').eql('Arabic');
        res.body.should.have.property('type').eql('genreBased');
        done();
      });
    });
  });

   /**
   * Test get mood-based playlist
   */
  describe('Get Mood-Based Playlist', () => {
    it('It should return mood-based playlist called "Happy" when query string object.mood equals "Happy"', (done) => {
      chai.request(app)
      .get('/playlist/mood')
      .query({mood: 'Happy'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('genre').eql('Happy');
        res.body.should.have.property('type').eql('moodBased');
        done();
      });
    });
  });
})