var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, default: null},
    nickname: {type: String, required: true},
    username: {type: String},
    type: {type: String, required: true, default: 'Free'},
    gender: {type: String, required: true},
    activated: {type: Boolean, default: false},
    birthdate: {type: Date, required: true},
    joindate:{type: Date, default: Date.now()},
    phone: {type: String, default: null},
    fbuser: {type: Boolean, default: false},
    artist: {type: Boolean, default: false},
    img: {type: String, reqired: false},
    country: {type: String},
    likedGenres: {type: Array, default: []},
    likedAlbums:{type: Array, default: []},
    likedSongs: {type:Array, default: []},
    likedArtists: {type:Array, default: []},
    followers:{type: Array, default: []}
    
});

//Hashing
schema.pre('save', async function (next) {
    try{
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();
    } catch(err) {
        next(err);
    }
});

schema.statics.isValidPassword = async function (newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  }

module.exports = mongoose.model('User', schema);