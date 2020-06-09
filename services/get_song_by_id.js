const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var Song = require('../Database Seeds/models/song')

exports.getSong = async function (songId) {
    try {
        var song = await Song.find({_id : songId})
        return song;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating songs')
    }
}