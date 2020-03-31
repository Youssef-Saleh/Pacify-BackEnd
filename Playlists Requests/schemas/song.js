const mongoose = require('mongoose');
const schema = mongoose.Schema;

// set song schema
const songSchema = new schema({
  name: {
    type: String,
    required: true
  },
  timesPlayed: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  }
});

// identify song model to be able to create songs in database
const songModel = mongoose.model('song', songSchema);

module.exports = songModel;