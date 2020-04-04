const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const playlistModel = require('./models/playlist');
const userModel = require('./models/user');
const songModel = require('./models/song');
const propertyModel = require('./models/property');


/**
 * Create Playlist: Create a playlist in database 
 * @param {string} name - The name of playlist
 */
router.post('/', decodeTekon, (req, res, next) => {
  jwt.verify(req.token, 'secret', (err, userData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (!req.body.name) {
        req.body.name = 'New Playlist';
      }
      playlistModel.create({name: req.body.name, type: "userCreated", creator: userData.users._id}).then((Playlist) => {
        res.json(Playlist); 
      }).catch(next);
    }
  });
});

/**
 * Get Playlist: Get into a playlist in library
 * @param {string} id - The id of playlist
 */
router.get('/collection/playlist/:id', (req, res) => {
  playlistModel.find({_id: req.params.id}).then((Playlist) => {
    res.send(Playlist[0]);
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
      userModel.findOne({_id: userData.users._id}, (err, User) => {
        if (err) {
          res.sendStatus(403);
        } else {
          var playlistIsLiked = false;
          var string1 = '1';
          var string2 = '2';
          var comparison = 10;
          for (i = 0; i < User.likedPlaylists.length; i++) {
            string1 = (User.likedPlaylists[i]).toString();
            string2 = (req.params.id).toString();
            comparison = string1.localeCompare(string2);
            if (comparison === 0) {
              playlistIsLiked = true;
            };
          };
          if (!playlistIsLiked) {
            playlistModel.updateOne({_id: req.params.id}, {$push: {followers: userData.users._id}}).then(() => {
              userModel.updateOne({_id: userData.users._id}, {$push: {likedPlaylists: req.params.id}}).then(() => {
                res.json({
                  message: "Liked"
                }); 
              })
            })
          } else {
            playlistModel.updateOne({_id: req.params.id}, {$pull: {followers: userData.users._id}}).then(() => {
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


/**
 * Get trending playlist: playlist created in database updated with songs played the most
 */
router.get('/playlist/trending', (req, res) => {
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
        playlistModel.updateOne({_id: trendPlaylist._id}, {$push: {songs: Song[i]._id}}).then(() => {});
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
 */
router.get('/playlist/highestRated', (req, res) => {
  playlistModel.aggregate(
    [
      {$sort: {rating: -1}},
      {$limit: 1}
    ]
  ).then((Playlist) => {
    res.json(Playlist)
  });
});

/**
 * Generate random playlists
 */
router.get('/playlist/random', (req, res) => {
  var playlistId = 0;
  songModel.aggregate(
    [
      {$sample: {size: 20}}
    ]
  ).then((Song) => {
    playlistModel.create({name: "Random Playlist", type: "random"}).then((Playlist) => {
      playlistId = Playlist._id;
      for (i = 0; i < Song.length; i++) {
        playlistModel.updateOne({_id: Playlist._id}, {$push: {songs: Song[i]._id}}).then(() => {});
      }
    }).then(() => {
      playlistModel.findOne({_id: playlistId}).then((Playlist) => {
        res.json(Playlist);
      });
    });
  });
});

/**
 * Get region playlists: Each region has a playlist created in database called "Top in 'region'" updated with region songs played the most
 * Name of region is passed in query string => ?region=Egypt for example
 */
router.get('/playlist/region', (req, res) => {
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
          playlistModel.updateOne({_id: regPlaylist._id}, {$push: {songs: Song[i]._id}}).then(() => {});
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
 * Get genre-based playlists: Each genre has a playlist created in database with its name updated with songs having same genre
 * Name of genre is passed in query string => ?genre=Arabic for example
 */
router.get('/playlist/genre', (req, res) => {
  var qString = req.query;
  var genreProp;
  var genPlaylist;
  propertyModel.findOne({type: "Genre", name: qString.genre.toString()}).then((Property) => {
    genreProp = Property;
  }).then(() => {
    playlistModel.findOne({type: "genreBased", name: genreProp.name}).then((Playlist) => {
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
          playlistModel.updateOne({_id: genPlaylist._id}, {$push: {songs: Song[i]._id}}).then(() => {});
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
 * Get mood-based playlists: Each mood has a playlist created in database with its name updated with songs having same mood
 * Name of mood is passed in query string => ?mood=Happy for example
 */
router.get('/playlist/mood', (req, res) => {
  var qString = req.query;
  var moodProp;
  var moodPlaylist;
  propertyModel.findOne({type: "Mood", name: qString.mood.toString()}).then((Property) => {
    moodProp = Property;
  }).then(() => {
    playlistModel.findOne({type: "moodBased", name: moodProp.name}).then((Playlist) => {
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
          playlistModel.updateOne({_id: moodPlaylist._id}, {$push: {songs: Song[i]._id}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: moodPlaylist._id}).then((Playlist) => {
          res.json(Playlist);
        });
      });
    });
  });
});


module.exports = router;

