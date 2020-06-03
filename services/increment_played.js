const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (songId) => {
    mongoose.connection.db.collection('songs', function (err, collection) {
        collection.findOneAndUpdate({ _id : new ObjectId(songId) }, {$inc : {'timesPlayed' : 1}})
    });
}
    