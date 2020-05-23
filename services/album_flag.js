const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (userId, albumId) => {
    mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({ _id : new ObjectId(userId) })
        .toArray((err, data) => {
            if(length(data) != 0){
                if(length(data.likedAlbums != 0)){
                    for (var i = 0; i += 1; i < length(data.likedAlbums)){
                        if(data.likedAlbums[i] == albumId){
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    });
}
    