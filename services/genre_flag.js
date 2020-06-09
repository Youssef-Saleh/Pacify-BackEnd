const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../Database Seeds/models/user')

exports.genreFlag = async function (userId, genreId) {
    try {
        var flag = false
        await User.find({ _id : new ObjectId(userId) }).then((data) => {
            

            if(data.length != 0){
                if(data[0].likedGenres.length != 0){

                    data[0].likedGenres.forEach(element => {
                        if(element == genreId){
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
    