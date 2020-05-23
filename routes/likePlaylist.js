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
 *  @module playlistRoutes
 */
const likePlaylistRoute = (app, fs, songModel, propertyModel, playlistModel) => {
  
   /**
   * Like Playlist: Adds the id of an existing playlist to the liking user and the id of him/her to the liked playlist, in case playlist is liked, it ulikes it and vice versa
   * @name put/playlist/:id
   * @function
   * @memberof module:playlistRoutes
   * @inner
   * @param {string} id - the id of playlist
   * @param {token} token - the token of user
   */
  app.put('/playlist/:id', auth, (req, res) => {
    var UserId;
    if(typeof req.userId == 'undefined') {
      UserId = token.users._id
    } else {
      UserId = req.userId
    }
    mongoose.connection.db.collection('users', (err, userModel) =>{
      userModel.find({_id: new ObjectId(UserId)})
      .toArray((err, User) => {
        if (err) {
          res.sendStatus(403);
        } else {
          var playlistIsLiked = false;
          var string1 = '1';
          var string2 = '2';
          var comparison = 10;
          for (i = 0; i < User[0].likedPlaylists.length; i++) {
            string1 = (User[0].likedPlaylists[i]).toString();
            string2 = (req.params.id).toString();
            comparison = string1.localeCompare(string2);
            if (comparison === 0) {
              playlistIsLiked = true;
            };
          };
          if (!playlistIsLiked) {
            playlistModel.updateOne({_id: req.params.id}, {$push: {followers: UserId}}).then(() => {})
            userModel.updateOne({_id: new ObjectId(UserId)}, {$push: {likedPlaylists: req.params.id}}, () => {
              res.json({
                message: "Liked"
              }); 
            })
          } else {
            playlistModel.updateOne({_id: req.params.id}, {$pull: {followers: UserId}}).then(() => {
              userModel.updateOne({_id: new ObjectId(UserId)}, {$pull: {likedPlaylists: req.params.id}}, () => {
                res.json({
                  message: "Unliked"
                });
              })
            })
          };
        }
      });
    });
  });
}

module.exports = likePlaylistRoute;