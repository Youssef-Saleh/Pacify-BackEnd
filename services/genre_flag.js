const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (userId, genreId) => {
    mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({ _id : new ObjectId(userId) })
        .toArray((err, data) => {
            if(length(data) != 0){
                if(length(data.likedGenres != 0)){
                    for (var i = 0; i += 1; i < length(data.likedGenres)){
                        if(data.likedGenres[i] == genreId){
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    });
}
    