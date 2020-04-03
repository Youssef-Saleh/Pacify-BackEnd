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
  playlistModel.create({name: req.body.name, type: "userCreated"}).then((playlist) => {
    res.json(playlist) 
  }).catch(next);
});

router.post('/creator',decodeTekon, (req, res, next) => {
  jwt.verify(req.token, 'secret', (err, userData) => {
    if (err) {
      res.sendStatus(403);
    } else {

  
  if(!req.body.name){
    req.body.name = 'New Playlist';
  };
  playlistModel.create({name: req.body.name, type: "userCreated", creator: userData.users._id}).then((playlist) => {
    res.json(playlist) 
  }).catch(next);
}
})
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
router.get('/playlist/trending', (req, res) => {
  var trendPlaylist;
  playlistModel.findOne({type: "trending", name: "Trending"}).then((playlist) => {
    trendPlaylist = playlist;
  }).then(() => {
    songModel.aggregate(
      [
        {$sort: {timesPlayed: -1}},
        {$limit: 50}
      ]
    ).then((song) => {
      for (i = 0; i < song.length; i++) {
        playlistModel.updateOne({_id: trendPlaylist._id}, {$pop: {playlistSongs: 1}}).then(() => {});
      }
      for (i = 0; i < song.length; i++) {
        playlistModel.updateOne({_id: trendPlaylist._id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
      }
    }).then(() => {
      playlistModel.findOne({_id: trendPlaylist._id}).then((playlist) => {
        res.json(playlist.playlistSongs);
      });
    });
  });
});

/**
 * Get highest-rated playlists
 */
router.get('/playlist/highestRated', (req, res) => {
  playlistModel.aggregate(
    [
      {$sort: {rating: -1}},
      {$limit: 3}
    ]
  ).then((playlist) => {
    res.json(playlist)
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
  ).then((song) => {
    playlistModel.create({name: "Random Playlist", type: "random"}).then((playlist) => {
      playlistId = playlist._id;
      for (i = 0; i < song.length; i++) {
        playlistModel.updateOne({_id: playlist._id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
      }
    }).then(() => {
      playlistModel.findOne({_id: playlistId}).then((playlist) => {
        res.json(playlist.playlistSongs);
      });
    });
  });
});

/**
 * Generate region playlists
 */
router.get('/playlist/region', (req, res) => {
  var qString = req.query;
  var reg;
  var regPlaylist;
  propertyModel.findOne({type: "Region", name: qString.region.toString()}).then((property) => {
    reg = property;
  }).then(() => {
    playlistModel.findOne({type: "region", name: "Top in "+ reg.name}).then((playlist) => {
      regPlaylist = playlist;
    }).then(() => {
      songModel.aggregate(
        [
          {$match: {region: reg.name}},
          {$sort: {timesPlayed: -1}},
          {$limit: 20}
        ]
      ).then((song) => {
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: regPlaylist._id}, {$pop: {playlistSongs: 1}}).then(() => {});
        }
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: regPlaylist._id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: regPlaylist._id}).then((playlist) => {
          res.json(playlist);
        });
      });
    });
  });
});

/**
 * Generate genre-based playlists
 */
router.get('/playlist/genre', (req, res) => {
  var qString = req.query;
  var genreProp;
  var genPlaylist;
  propertyModel.findOne({type: "Genre", name: qString.genre.toString()}).then((property) => {
    genreProp = property;
  }).then(() => {
    playlistModel.findOne({type: "genreBased", name: genreProp.name}).then((playlist) => {
      genPlaylist = playlist;
    }).then(() => {
      songModel.aggregate(
        [
          {$match: {genre: genreProp.name}},
          {$sample: {size: 20}}
        ]
      ).then((song) => {
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: genPlaylist._id}, {$pop: {playlistSongs: 1}}).then(() => {});
        }
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: genPlaylist._id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: genPlaylist._id}).then((playlist) => {
          res.json(playlist);
        });
      });
    });
  });
});

/**
 * Generate mood-based playlists
 */
router.get('/playlist/mood', (req, res) => {
  var qString = req.query;
  var moodProp;
  var moodPlaylist;
  propertyModel.findOne({type: "Mood", name: qString.mood.toString()}).then((property) => {
    moodProp = property;
  }).then(() => {
    playlistModel.findOne({type: "moodBased", name: moodProp.name}).then((playlist) => {
      moodPlaylist = playlist;
    }).then(() => {
      songModel.aggregate(
        [
          {$match: {mood: moodProp.name}},
          {$sample: {size: 20}}
        ]
      ).then((song) => {
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: moodPlaylist._id}, {$pop: {playlistSongs: 1}}).then(() => {});
        }
        for (i = 0; i < song.length; i++) {
          playlistModel.updateOne({_id: moodPlaylist._id}, {$push: {playlistSongs: song[i]._id}}).then(() => {});
        }
      }).then(() => {
        playlistModel.findOne({_id: moodPlaylist._id}).then((playlist) => {
          res.json(playlist);
        });
      });
    });
  });
});



module.exports = router;

