/** Express router providing notfications related routes
 * @module routers/Statistics
 * @requires StatisticsService
 * @requires mongoose
 * @requires environment variables
 */


/**
 * statistics services module
 * @const
 */
var statisticsService = require ('../services/Statistics_service');

/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');

/**
 * This module contain statistics from the activity log
 * 
 * 
 * @namespace statisticsController
 */

/**
 * function handles an artist request to get statistics for a song
 * @memberof module:controller/activitylog~statistics
 * @name getStatistics
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  

exports.getStatistics = async function (req, res, next)
{
    try {  
        statistics = statisticsService.getStatistics(req.body.songId, req.body.year, req.body.month, req.body.day);
        statistics.then((result) => {
            if (result.length == 0) {
                res.send ("No statistics found!");
            } else {
                res.send({count :result.length})
            }
            
        })
           
    } catch (e) {
        //console.log(e);
        res.status(400).json({ status: 400, message: e});
    }
}