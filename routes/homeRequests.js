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
 *  @module homePlaylistsRoutes
 */
const homePlaylistsRoute = (app, fs, songModel, propertyModel, playlistModel) => {
    
  app.get('/homePlaylists', homePlaylists)

  /**
   * homePlaylists: collects different types of playlists in one array
   * @name homePlaylists
   * @function
   * @memberof module:homePlaylistsRoutes
   * @inner
   * @param {object} req 
   * @param {object} res
   * @param {object} next
  */
  function homePlaylists(req, res, next) {
    var playlistArray = []
    var playlistTypes = ['genreBased', 'moodBased', 'region','trending'] 

    getThePlayist(playlistTypes, playlistArray);

    getHighestRatedPlaylist(playlistArray);

    getRandomPlaylist(playlistArray);

    playlistModel.find({type: 'random'}).then((playlist) => {
      for (i = 0; i < 1; i++) {
        playlistArray.push(playlist[playlist.length-1])
        }
    }).then(() => {
        res.json(playlistArray)
    })
  }

  /**
   * getThePlayist: gets types of playists passed to it in an array and returns them in another array
   * @name getThePlayist
   * @function
   * @memberof module:homePlaylistsRoutes
   * @inner
   * @param {array} typesArr - array of playlist types
   * @param {array} arr - array of playlists
  */
  function getThePlayist(typesArr, arr) {
    var songsArray = []
    playlistModel.find({type: {$in: typesArr}}).then((Playlist) => {  
    for (i = 0; i < Playlist.length; i++) {
      arr.push(Playlist[i])
    }
    })
  }

  /**
   * getHighestRatedPlaylist: pushes the highest rated playlist in the passed array
   * @name getHighestRatedPlaylist
   * @function
   * @memberof module:homePlaylistsRoutes
   * @inner
   * @param {array} arr - array to push the playlist
  */
  function getHighestRatedPlaylist(arr) {
    playlistModel.aggregate(
        [
        {$sort: {rating: -1}},
        {$limit: 1}
        ]
    ).then((Playlist) => {
        arr.push(Playlist[0])
    });
  }

  /**
   * getRandomPlaylist: creates a new random playlist in database and pushes it in the passed array
   * @name getRandomPlaylist
   * @function
   * @memberof module:homePlaylistsRoutes
   * @inner
   * @param {array} arr - array to push the playlist
  */
  function getRandomPlaylist(arr) {
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
        arr.push(Playlist);
      });
    });
    });
  }
}

module.exports = homePlaylistsRoute;