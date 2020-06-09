const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

var User = require('../Database Seeds/models/user')

exports.getArtistId = async function (artistName) {
    try {
        var user = await User.find({nickname : artistName})
        return user[0]._id;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}