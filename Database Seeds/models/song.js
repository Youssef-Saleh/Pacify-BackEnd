var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    artist: {type: String, required: true},
    rateCount:{type:Number,default:0},
    rating: {type: Number, default: 0},
    timesPlayed: {type: Number, default: 0},
    userId:{type: Array}
});

module.exports = mongoose.model('Song', schema);