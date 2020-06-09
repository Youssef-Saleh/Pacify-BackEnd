const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../Database Seeds/models/user')

exports.artistFlag = async function (userId, artistId) {
    try {
        var flag = false
        await User.find({ _id : new ObjectId(userId) }).then((data) => {
            

            if(data.length != 0){
                if(data[0].likedArtists.length != 0){

                    data[0].likedArtists.forEach(element => {
                        if(element == artistId){
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
    
    