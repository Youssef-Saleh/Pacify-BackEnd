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
   * Test delete playlist
   */
  describe('Delete Playlist', () => {
    it('It should delete a playlist from database and respond with "Deleted"', async () => {
      var playlistId;
      let playlist = {
        name: "myPlaylist"
      };
      await mongoose.connection.db.collection('playlists').insertOne(playlist).then((Playlist) => { 
        playlistId = Playlist.insertedId;
      });
      chai.request(app)
      .delete('/collection/playlist/' + playlistId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Deleted');
      });
    });
  });

 /**
   * Test remove a song from playlist
   */
  describe('Remove Song from Playlist', () => {
    it('It should remove a song from playlist and respond with "Removed"', async () => {
      var playlistId;
      var songId;
      let song = {
        name: 'mySong',
        year: '2000',
        url: 'https://www.mboxdrive.com/Bye%20Bye%20(Instrumental).mp3'
      }
      let playlist = {
        name: 'myPlaylist',
        songs: ['mySong']
      };
      mongoose.connection.db.collection('songs').insertOne(song).then((Song) => { 
        songId = Song.insertedId;
      });
      await mongoose.connection.db.collection('playlists').insertOne(playlist).then((Playlist) => { 
        playlistId = Playlist.insertedId;
      });
      chai.request(app)
      .delete('/collection/playlist/' + playlistId + '/song/' + songId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Removed');
      });
    });
  });

})