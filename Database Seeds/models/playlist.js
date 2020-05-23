var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    type: {type: String, required: true},
    isAlbum: {type: Boolean, default: false},
    description: {type: String, default: "no description"},
    url: {type: String, default: null},
    rating: {type: Number, default: 0},
    timesPlayed: {type: Number, default: 0},
    songs: {type: Array, default: []}, //ref: 'Song'}],
    creator: {type: mongoose.Schema.Types.ObjectId}, //ref: 'User'},
    followers: [{type: mongoose.Schema.Types.ObjectId}], //ref: 'User'}],
    mood: {type: mongoose.Schema.Types.String, ref: 'Property', default: null},
    genre: {type: mongoose.Schema.Types.String, ref: 'Property', default: null}
});

module.exports = mongoose.model('Playlist', schema);