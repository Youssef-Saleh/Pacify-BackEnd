const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json')

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');


/**
 *  @module getPlaylistRoutes
 */
const getPlaylistRoutes = (app, fs, songModel, propertyModel, playlistModel) => {
  
   /**
   * Get Playlist: Get into a playlist
   * @name get/collection/playlist/:playlistId
   * @function
   * @memberof module:getPlaylistRoutes
   * @inner
   * @param {object} req It has playlist id
   * @param {object} res It responds with songs of required playlist
   */
  app.get('/collection/playlist/:playlistId', (req, res) => {
    mongoose.connection.db.collection('playlists',function(err, collection){
      collection.find({_id: new ObjectId(req.params.playlistId)}).toArray((err, Playlist) => {
        arr = []

        for (var i = 0; i < Playlist[0].songs.length; i++) {
          arr.push(Playlist[0].songs[i])
        }

        mongoose.connection.db.collection('songs',function(err, collection2){
          collection2.find({name:{ $in: arr}}).toArray(function(err,docs2){

            if (err) {
                throw err;
            }
            res.send(docs2);
          });
        })
      });
    })
  });


  /**
   * Get trending playlist: playlist created in database updated with songs played the most
   * @name get/playlist/trending
   * @function
   * @memberof module:getPlaylistRoutes
   * @inner
   * @param {object} req request body
   * @param {object} res It responds with trending playlist
   */
  app.get('/playlist/trending', (req, res) => {
    var trendPlaylist;
    playlistModel.findOne({type: "trending", name: "Trending"}).then((Playlist) => {
      trendPlaylist = Playlist;
    }).then(() => {
      songModel.aggregate(
        [
          {$sort: {timesPlayed: -1}},
          {$limit: 50}
        ]
      ).then((Song) => {
        for (i = 0; i < Song.length; i++) {
          playlistModel.updateOne({_id: trendPlaylist._id}, {$pop: {songs: 1}}).then(() => {});
        }
        for (i = 0; i < Song.length; i++) {
          playlistModel.updateOne({_id: trendPlaylist._id}, {$push: {songs: Song[i].name}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: trendPlaylist._id}).then((Playlist) => {
          res.json(Playlist);
        });
      });
    });
  });


   /**
   * Get highest-rated playlist
   * @name get/playlist/highestRated
   * @function
   * @memberof module:getPlaylistRoutes
   * @inner
   * @param {object} req request body
   * @param {object} res It responds with highest-rated playlist
   */
  app.get('/playlist/highestRated', (req, res) => {
    playlistModel.aggregate(
      [
        {$sort: {rating: -1}},
        {$limit: 1}
      ]
    ).then((Playlist) => {
      res.json(Playlist[0])
    });
  });


  /**
   * Generate random playlists
   * @name get/playlist/random
   * @function
   * @memberof module:getPlaylistRoutes
   * @inner
   * @param {object} req request body
   * @param {object} res It responds with a random playlist
   */
  app.get('/playlist/random', (req, res) => {
    var playlistId = 0;
    songModel.aggregate(
      [
        {$sample: {size: 20}}
      ]
    ).then((Song) => {
      playlistModel.create({name: "Random Playlist", type: "random"}).then((Playlist) => {
        playlistId = Playlist._id;
        for (i = 0; i < Song.length; i++) {
          playlistModel.updateOne({_id: Playlist._id}, {$push: {songs: Song[i].name}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: playlistId}).then((Playlist) => {
          res.json(Playlist);
        });
      });
    });
  });
}

module.exports = getPlaylistRoutes;