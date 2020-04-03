const mongoose = require('mongoose');
const schema = mongoose.Schema;

// set playlist schema
const playlistSchema = new schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  rating: {
    type: Number,
    default: 0
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