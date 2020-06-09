const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../Database Seeds/models/user')

exports.playlistFlag = async function (userId, playlistId) {
    try {
        var flag = false
        await User.find({ _id : new ObjectId(userId) }).then((data) => {
            

            if(data.length != 0){
                if(data[0].likedPlaylists.length != 0){

                    data[0].likedPlaylists.forEach(element => {
                        if(element == playlistId){
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
    