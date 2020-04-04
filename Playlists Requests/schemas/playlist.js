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
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: {
    type: Number,
    default: 0
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// identify playlist model to be able to create playlists in database
const playlistModel = mongoose.model('Playlist', playlistSchema);

module.exports = playlistModel;