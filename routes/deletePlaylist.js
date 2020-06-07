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
 *  @module deletePlaylistRoute
 */
const deletePlaylistRoute = (app, fs, songModel, propertyModel, playlistModel) => {

  app.delete('/collection/playlist/:playlistId', deletePlaylist)

  /**
   * Delete Playlist: deletes a playlist in database 
   * @name deletePlaylist
   * @function
   * @memberof module:deletePlaylistRoute
   * @inner
   * @param {object} req It has playlist id
   * @param {object} res It responds with a message when deleted
   * @param {object} next If there is an error
  */
  function deletePlaylist(req, res, next) {
    playlistModel.findByIdAndRemove({_id: req.params.playlistId}).then((Playlist) => {
      res.json({message: 'Deleted'}); 
    }).catch(next);
  }
}

module.exports = deletePlaylistRoute;