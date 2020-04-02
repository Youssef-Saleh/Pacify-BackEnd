const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const playlistModel = require('./schemas/playlist');
const userModel = require('./schemas/user');
const songModel = require('./schemas/song');
const propertyModel = require('./schemas/property');


/**
 * Create Playlist: Create a playlist in database 
 * @param {string} name - The name of playlist
 */
router.post('/', (req, res, next) => {
  if(!req.body.name){
    req.body.name = 'New Playlist';
  };
  playlistModel.create(req.body).then((playlist) => {
    res.json(playlist) 
  }).catch(next);
});


/**
 * Get Playlist: Get into a playlist in library
 * @param {string} id - The id of playlist
 */
router.get('/collection/playlist/:id', (req, res) => {
  playlistModel.find({_id: req.params.id}).then((playlist) => {
    res.send(playlist[0].playlistSongs);
  })
});


/**
 * Like Playlist: Adds the id of an existing playlist to the liking user and the id of him/her to the liked playlist, in case playlist is liked, it ulikes it and vice versa
 * @param {string} id - the id of playlist
 * @param {token} token - the token of user
 */
router.put('/playlist/:id',decodeTekon, (req, res) => {
  jwt.verify(req.token, 'secret', (err, userData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      userModel.findOne({_id: userData.users._id}, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          var playlistIsLiked = false;
          var string1 = '1';
          var string2 = '2';
          var comparison = 10;
          for (i = 0; i < user.likedPlaylists.length; i++) {
            string1 = (user.likedPlaylists[i]).toString();
            string2 = (req.params.id).toString();
            comparison = string1.localeCompare(string2);
            if (comparison === 0) {
              playlistIsLiked = true;
            };
          };
          if (!playlistIsLiked) {
            playlistModel.updateOne({_id: req.params.id}, {$push: {likingUsers: userData.users._id}}).then(() => {
              userModel.updateOne({_id: userData.users._id}, {$push: {likedPlaylists: req.params.id}}).then(() => {
                res.json({
                  message: "Liked"
                }); 
              })
            })
          } else {
            playlistModel.updateOne({_id: req.params.id}, {$pull: {likingUsers: userData.users._id}}).then(() => {
              userModel.updateOne({_id: userData.users._id}, {$pull: {likedPlaylists: req.params.id}}).then(() => {
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


// router.post('/property', (req, res, next) => {
//   propertyModel.create(req.body).then((property) => {
//     res.json(property) 
//   }).catch(next);
// });

// router.put('/song/:id', (req, res, next) => {
//   songModel.findByIdAndUpdate({_id: req.params.id}, {$set: {region: req.body._id}}).then((song) => {
//     console.log(req.body._id)
//     res.json({
//       song
//     })
//   }) .catch(next);
// });

/**
 * Get trending playlist
 */
// router.get('/playlist/:id', (req, res) => {
//   songModel.aggregate(
//     [
//       {$sort: {timesPlayed: -1}},
//       {$limit: 50}
//     ]
//   ).then((song) => {
//     for (i = 0; i < song.length; i++) {
//       playlistModel.updateOne({_id: req.params.id}, {$pop: {playlistSongs: -1}}).then(() => {});
//     }
//     for (i = 0; i < song.length; i++) {
//       playlistModel.updateOne({_id: req.params.id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
//     }
//   }).then(() => {
//     playlistModel.findOne({_id: req.params.id}).then((playlist) => {
//       res.json(playlist.playlistSongs);
//     })
//   });
// });

/**
 * Get mood-based playlist
 */
// router.get('/playlist/:id', (req, res) => {
//   songModel.findOne({_id: req.params.id}).then((song) => {
//     songModel.aggregate(
//       [
//         {$match: {region: song.region}},
//         {$limit: 20}
//       ]
//     )
//   }).then((song) => {

//   })
//     songModel.aggregate(
//       [
//         {$match: {region: song.region}},
//         {$limit: 20}
//       ]
//     ).then((song) => {
//       playlistModel.insertMany({_id:500, playlistSongs: song}).then(()=>{});
//     }).then(() => {
//       playlistModel.findOne({_id: 500}).then((playlist) => {
//         res.json(playlist.playlistSongs);
//       })
//     })
//   })
// });


module.exports = router;

