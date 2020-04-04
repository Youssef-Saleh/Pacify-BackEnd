var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    name: {type: String, required: true},
    year: {type: Number, required: true},
    timesPlayed: {type: Number, default: 0},
    userId:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    songs:[{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
});

module.exports = mongoose.model('Album', schema);