var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    year: {type: Number, required: true},
    url : {type: String, required: true},
    genre: {type: mongoose.Schema.Types.String, ref: 'Property'},
    mood: {type: mongoose.Schema.Types.String, ref: 'Property'},
    region: {type: mongoose.Schema.Types.String, ref: 'Property'},
    artist: {type: String, ref: 'User'},
    featured: {type: Array, default: []},
    remixes: {type: Array, default: []},
    rateCount:{type:Number,default:0},
    rating: {type: Number, default: 0},
    timesPlayed: {type: Number, default: 0},
    userId:{type: Array, default: []}
});

module.exports = mongoose.model('Song', schema);