var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    username: {type: String, default: 'none'},
    type: {type: String, default: "Free"},
    gender: {type: String, required: true},
    phone: {type: String},
    activated: {type: Boolean, default: false},
    birthdate: {type: Date, default: null},
    joindate:{type: Date, default: Date.now()},
    fbuser: {type: Boolean, default: false},
    img: {type: String, reqired: false},
    country: {type: String, default: 'none'},
    likedAlbums:{type: Array, default: []},
    likedGenres: {type: Array, default: []},
    likedPlaylists: {type: Array, default: []},
    likedSongs: {type:Array, default: []},
    likedArtists: {type:Array, default: []},
    followers:{type: Array, default: []},
    uploadedSongs:{type: Array, default: []},
    uploadedAlbums: {type: Array, default: []}
});

module.exports = mongoose.model('User', schema);