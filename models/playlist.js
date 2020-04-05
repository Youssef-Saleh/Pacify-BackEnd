var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    rating: {type: Number, default: 0},
    timesPlayed: {type: Number, default: 0},
    songs: {type: Array, default: []},
    creator: {type: String, default: null},
    followers: {type: Array, default: []},
    mood: {type: String, default: null},
    genre: {type: String, default: null},
});

module.exports = mongoose.model('Playlist', schema);