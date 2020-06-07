const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const auth = require('../middlewares/token_auth');
const authVar = require('../env_variables/env_vars.json');

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');


/**
 *  @module createPlaylistRoute
 */
const createPlaylistRoute = (app, fs, songModel, propertyModel, playlistModel) => {

  /**
   * Create Playlist: Create a playlist in database 
   * @name post/createPlaylist
   * @function
   * @memberof module:createPlaylistRoute
   * @inner
   * @param {object} req It has playlist name and token of user
   * @param {object} res It responds with created playlist
   * @param {object} next If there is an error
  */
  app.post('/createPlaylist', auth, (req, res, next) => {

    if (!req.body.name) {
      req.body.name = 'New Playlist';
    }
    playlistModel.create({name: req.body.name, type: "userCreated", creator: req.userId}).then((Playlist) => {
      res.json(Playlist); 
    }).catch(next);
  })
}

module.exports = createPlaylistRoute;