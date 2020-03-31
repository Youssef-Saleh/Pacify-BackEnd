const mongoose = require('mongoose');
const schema = mongoose.Schema;

// set playlist schema
const playlistSchema = new schema({
  name: {
    type: String,
    required: true
  },
  playlistSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'song'
  }],
  likingUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

// identify playlist model to be able to create playlists in database
const playlistModel = mongoose.model('playlist', playlistSchema);

module.exports = playlistModel;