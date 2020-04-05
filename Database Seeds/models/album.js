var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    imagePath: {type: String, required: true},
    name: {type: String, required: true},
    year: {type: Number, required: true},
    timesPlayed: {type: Number, default: 0},
    userId:{type: Array, default:[]},
    artist: {type: String, default: null},
    songs:{type: Array, default:[]}
});

module.exports = mongoose.model('Album', schema);