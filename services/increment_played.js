const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 
/**
     * addSongsToAlbum request
     * @module getSong/:songId
    */
    /**
     * This service would request the song Id that the user wants to search.
     * then it increment the times this song was played.
     * @name get/Song/:songId
     * @function
     * @param {*} req requesting the needed info from postman as the following:
     * @param {*} songId the genre of songs in mongoBD that the user wants to search as requested by postman
    */
module.exports = (songId) => {
    mongoose.connection.db.collection('songs', function (err, collection) {
        collection.findOneAndUpdate({ _id : new ObjectId(songId) }, {$inc : {'timesPlayed' : 1}})
    });
}
    