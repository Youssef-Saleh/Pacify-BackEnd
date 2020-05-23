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
   * Test create playlist
   */
  describe('Create Playlist', () => {
    it('In case of no name given, it names the playlist "New Playlist"', (done) => {
      let playlist = {
        name: ""
      };
      let user = {
        email: "user1@admin.com",
        password: "secret",
        nickname: "User",
        gender: "Male"
      }
      userModel.create(user);
      userToken = jwt.sign({users: user}, authVar);
      chai.request(app)
      .post('/createPlaylist/')
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
      let user = {
        email: "user2@admin.com",
        password: "secret",
        nickname: "User",
        gender: "Male"
      }
      userModel.create(user);
      userToken = jwt.sign({users: user}, authVar);
      chai.request(app)
      .post('/createPlaylist/')
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
   * Test get playlist
   */
  describe('Get Playlist', () => {
    it('It should return playlist songs' , async () => {
      var playlistId;
      let playlist = {
        name: "myPlaylist5655",
        type: "userCreated",
        songs: []
      }
      await mongoose.connection.db.collection('playlists').insertOne(playlist).then((Playlist) => { 
        playlistId = Playlist.insertedId;
      });
      chai.request(app)
      .get('/collection/playlist/' + playlistId)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
      })
    });
  });


  /**
   * Test like playlist
   */
  describe('Like Playlist', () => {
    it('It likes the playlist', async () => {
      var playlistId;
      var currUser;
      var userToken;
      let playlist = {
        name: "myPlaylist",
        type: "userCreated",
        followers: []
      }
      mongoose.connection.db.collection('playlists').insertOne(playlist).then((Playlist) => { 
        playlistId = Playlist.insertedId;
      });
      let user = {
        email: "user3@admin.com",
        password: "secret",
        nickname: "User",
        gender: "Male"
      }
      await userModel.create(user).then((User) => {
        currUser = User
      }).then(() => {
        userToken =jwt.sign({users: currUser}, authVar)
      })
      chai.request(app)
      .put('/playlist/'+ playlistId)
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Liked');
      });
    });

    it('It unlikes the playlist', async () => {
      var playlistId;
      var currUser;
      var userToken;
      let playlist = {
        name: "myPlaylist",
        type: "userCreated",
        followers: []
      }
      mongoose.connection.db.collection('playlists').insertOne(playlist).then((Playlist) => { 
        playlistId = Playlist.insertedId;
      });
      let user = {
        email: "user4@admin.com",
        password: "secret",
        nickname: "User",
        gender: "Male",
        likedPlaylists: [playlist._id]
      }
      await userModel.create(user).then((User) => {
        currUser = User
      }).then(() => {
        userToken =jwt.sign({users: currUser}, authVar)
      })
      chai.request(app)
      .put('/playlist/'+ playlistId)
      .set('Authorization', 'Bearer ' + userToken)
      .send(playlist)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Unliked');
      });
    });
  });
});
