const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 
var Event = require('../Database Seeds/models/eventlog');

/**
 * function retrieves specific user data
 * @memberof module:services/statisticsService
 * @name getStatistics
 * @function
 * @param songId {String} The id of the requested song to get its statistics
 * @param year {String} The year of the statistics range
 * @param month {String} The month of the statistics range (zero if the artist wants the range for years only)
 * @param day {String} The day of the statistics range (zero if the artist wants the range for months only)
 * @return events {Array} The list of events where the songs was played
 */
exports.getStatistics = async (songId, year, month, day) => {
    try{
        if(day != 0)
        {
            result = await Event.find({ Object : songId , Type : 'play', Year : year, Month : month, Day : day})
            return result;
        }

        else if(month !=0 && day == 0){
            result = await Event.find({ Object : songId , Type : 'play', Year : year, Month : month})
            return result;
        }
        else{
            result = await Event.find({ Object : songId , Type : 'play', Year : year})
            return result;
        }

    }catch(e){
        throw Error('Error while Paginating Events')
    }
};