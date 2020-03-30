var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String, required: true},
    type: {type: String, required: true},
    rating: {type: Number, default: 0},
    timesPlayed: {type: Number, default: 0}
});

module.exports = mongoose.model('Playlist', schema);