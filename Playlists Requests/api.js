const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const playlistModel = require('./schemas/playlist');
const userModel = require('./schemas/user');
const songModel = require('./schemas/song');


/**
 * Create Playlist: Create a playlist in database 
 * @param {string} name - The name of playlist
 */
router.post('/', (req, res, next) => {
  playlistModel.create(req.body).then((playlist) => {
    res.json({
      message: 'Created'
    }) 
  }).catch(next);
});

router.post('/song/', (req, res, next) => {
  songModel.create(req.body).then((song) => {
    res.json(song) 
  }).catch(next);
});


/**
 * Get Playlist: Get into a playlist
 * @param {string} id - The id of playlist
 */
router.get('/playlist/:id', (req, res) => {
  playlistModel.find({_id: req.params.id}).then((playlist) => {
    res.send(playlist[0]);
  })
});


/**
 * Like Playlist: Adds the id of an existing playlist to the liking user and the id of him/her to the liked playlist, in case playlist is liked, it ulikes it and vice versa
 * @param {string} id - the id of playlist
 * @param {token} token - the token of user
 */
router.put('/playlist/:id',decodeTekon, (req, res) => {
  jwt.verify(req.token, 'secret', (err, userData, currentUser) => {
    if (err) {
      res.sendStatus(403);
    } else {
      userModel.findOne({_id: userData.users._id}, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          currentUser = user
          var playlistIsLiked = false;
          var string1 = '1';
          var string2 = '2';
          var comparison = 10;
          for (i = 0; i < currentUser.likedPlaylists.length; i++) {
            string1 = (currentUser.likedPlaylists[i]).toString();
            string2 = (req.params.id).toString();
            comparison = string1.localeCompare(string2);
            if (comparison === 0) {
              playlistIsLiked = true;
            };
          };
          if (!playlistIsLiked) {
            playlistModel.findByIdAndUpdate({_id: req.params.id}, {$push: {likingUsers: userData.users._id}}).then(() => {
              userModel.findByIdAndUpdate({_id: userData.users._id}, {$push: {likedPlaylists: req.params.id}}).then(() => {
                res.json({
                  message: "Liked"
                }); 
              })
            })
          } else {
            playlistModel.findByIdAndUpdate({_id: req.params.id}, {$pull: {likingUsers: userData.users._id}}).then(() => {
              userModel.findByIdAndUpdate({_id: userData.users._id}, {$pull: {likedPlaylists: req.params.id}}).then(() => {
                res.json({
                  message: "Unliked"
                });
              })
            })
          };
        };
      });
    };
  });
});


/**
 * Decoding the token of user to get his/her data
 * @param {token} token - the token of user
 */
function decodeTekon(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  if (typeof authorizationHeader !== 'undefined') {
    const tokenValue = authorizationHeader.split(' ');
    req.token = tokenValue[1];
    next();
  } else {
    res.sendStatus(403);
  };
};

/**
 * Get trending playlist
 */
// router.get('/:id', (req,res) => {
//   songModel.aggregate(
//     [
//       {$sort: {timesPlayed: -1}},
//       {$limit: 50}
//     ]
//   ).then((song) => {
//     for (i = 0; i < song.length; i++) {
//       playlistModel.findByIdAndUpdate({_id: req.params.id}, {$push: {playlistSongs: song[i]._id}})
//     }
//   }).then(() => {
//     res.json('playlist')
//   })
// });

module.exports = router;

