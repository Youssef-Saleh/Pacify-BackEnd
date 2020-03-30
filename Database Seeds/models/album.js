var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    Name: {type: String, required: true},
    year: {type: Number, required: true},
    timesPlayed: {type: Number, default: 0},
    userid:[]
});

module.exports = mongoose.model('Album', schema);