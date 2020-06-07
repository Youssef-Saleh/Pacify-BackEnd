const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json');

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');


/**
 *  @module deleteSongFromPlaylistRoute
 */
const deleteSongFromPlaylistRoute = (app, fs, songModel, propertyModel, playlistModel) => {

  app.delete('/collection/playlist/:playlistId/song/:songId', deleteSongFromPlaylist)

  /**
   * Remove Song from Playlist
   * @name deleteSongFromPlaylist
   * @function
   * @memberof module:deleteSongFromPlaylistRoute
   * @inner
   * @param {object} req It has playlist id
   * @param {object} res It responds with a message when song is removed
   * @param {object} next If there is an error
  */
  function deleteSongFromPlaylist(req, res, next) {
    var songName
    songModel.findOne({_id: req.params.songId}).then((Song) => {
      songName = Song.name  
      playlistModel.findByIdAndUpdate({_id: req.params.playlistId}, {$pull: {songs: songName}}).then(() => {
          res.json({message: 'Removed'})
      })
    }).catch(next)
  }
}

module.exports = deleteSongFromPlaylistRoute;