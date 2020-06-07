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
 *  @module getPropBasedPlaylistRoutes
 */
const PropBasedPlaylistRoutes = (app, fs, songModel, propertyModel, playlistModel) => {

  /**
   * Get region playlists: Each region has a playlist created in database called "Top in 'region'" updated with region songs played the most
   * Name of region is passed in query string => ?region=Egypt for example
   * @name get/playlist/region
   * @function
   * @memberof module:getPropBasedPlaylistRoutes
   * @inner
   * @param {object} req It has type of required playlist
   * @param {object} res It responds with required playlist
   */
  app.get('/playlist/region', (req, res) => {
    var qString = req.query;
    var reg;
    var regPlaylist;
    propertyModel.findOne({type: "Region", name: qString.region.toString()}).then((Property) => {
      reg = Property;
    }).then(() => {
      playlistModel.findOne({type: "region", name: "Top in "+ reg.name}).then((Playlist) => {
        regPlaylist = Playlist;
      }).then(() => {
        songModel.aggregate(
          [
            {$match: {region: reg.name}},
            {$sort: {timesPlayed: -1}},
            {$limit: 20}
          ]
        ).then((Song) => {
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: regPlaylist._id}, {$pop: {songs: 1}}).then(() => {});
          }
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: regPlaylist._id}, {$push: {songs: Song[i].name}}).then(() => {});
          }
        }).then(() => {
          playlistModel.findOne({_id: regPlaylist._id}).then((Playlist) => {
            res.json(Playlist);
          });
        });
      });
    });
  });


   /**
   * Get genre-based playlists: Each genre has a playlist for it created in database updated with songs having same genre
   * Name of genre is passed in query string => ?genre=Arabic for example
   * @name get/playlist/genre
   * @function
   * @memberof module:getPropBasedPlaylistRoutes
   * @inner
   * @param {object} req It has type of required playlist
   * @param {object} res It responds with required playlist
   */
  app.get('/playlist/genre', (req, res) => {
    var qString = req.query;
    var genreProp;
    var genPlaylist;
    propertyModel.findOne({type: "Genre", name: qString.genre.toString()}).then((Property) => {
      genreProp = Property;
    }).then(() => {
      playlistModel.findOne({type: "genreBased", genre: genreProp.name}).then((Playlist) => {
        genPlaylist = Playlist;
      }).then(() => {
        songModel.aggregate(
          [
            {$match: {genre: genreProp.name}},
            {$sample: {size: 20}}
          ]
        ).then((Song) => {
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: genPlaylist._id}, {$pop: {songs: 1}}).then(() => {});
          }
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: genPlaylist._id}, {$push: {songs: Song[i].name}}).then(() => {});
          }
        }).then(() => {
          playlistModel.findOne({_id: genPlaylist._id}).then((Playlist) => {
            res.json(Playlist);
          });
        });
      });
    });
  });


 /**
   * Get mood-based playlists: Each mood has a playlist created for it in database updated with songs having same mood
   * Name of mood is passed in query string => ?mood=Happy for example
   * @name get/playlist/mood
   * @function
   * @memberof module:getPropBasedPlaylistRoutes
   * @inner
   * @param {object} req It has type of required playlist
   * @param {object} res It responds with required playlist
   */
  app.get('/playlist/mood', (req, res) => {
    var qString = req.query;
    var moodProp;
    var moodPlaylist;
    propertyModel.findOne({type: "mood", name: qString.mood.toString()}).then((Property) => {
      moodProp = Property;
    }).then(() => {
      playlistModel.findOne({type: "moodBased", genre: moodProp.name}).then((Playlist) => {
        moodPlaylist = Playlist;
      }).then(() => {
        songModel.aggregate(
          [
            {$match: {mood: moodProp.name}},
            {$sample: {size: 20}}
          ]
        ).then((Song) => {
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: moodPlaylist._id}, {$pop: {songs: 1}}).then(() => {});
          }
          for (i = 0; i < Song.length; i++) {
            playlistModel.updateOne({_id: moodPlaylist._id}, {$push: {songs: Song[i].name}}).then(() => {});
          }
        }).then(() => {
          playlistModel.findOne({_id: moodPlaylist._id}).then((Playlist) => {
            res.json(Playlist);
          });
        });
      });
    });
  });
};

module.exports = PropBasedPlaylistRoutes;