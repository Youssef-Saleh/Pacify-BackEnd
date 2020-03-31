const mongoose = require('mongoose');
const schema = mongoose.Schema;

// set user schema
const userSchema = new schema({
  name: {
    type: String,
    required: true
  },
  likedPlaylists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'playlist'
  }]
});

// identify user model to be able to create users in database
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;