const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../Database Seeds/models/user')

exports.albumFlag = async function (userId, albumId) {
    try {
        var flag = false
        await User.find({ _id : new ObjectId(userId) }).then((data) => {
            

            if(data.length != 0){
                if(data[0].likedAlbums.length != 0){

                    data[0].likedAlbums.forEach(element => {
                        if(element == albumId){
                            flag = true;
                        }
                    });
                }
            }
        })
        return flag
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
    