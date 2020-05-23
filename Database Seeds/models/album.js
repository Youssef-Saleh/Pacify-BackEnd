var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    year: {type: Number, required: true},
    isAlbum: {type: Boolean, default: true},
    timesPlayed: {type: Number, default: 0},
    userId:{type: Array, default:[]},
    artist: {type: String, default: null},
    songs:{type: Array, default:[]},
    url:{type: String, required: true},
    description: {type: String, default: "no description"},
    url: {type: String, default: null},
});

module.exports = mongoose.model('Album', schema);