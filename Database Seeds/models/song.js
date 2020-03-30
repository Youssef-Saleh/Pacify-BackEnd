var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String, required: true},
    year: {type: Number, required: true},
    rateCount:{type:Number,default:0},
    rating: {type: Number, default: 0},
    timesplayed: {type: Number, default: 0}
});

module.exports = mongoose.model('Song', schema);