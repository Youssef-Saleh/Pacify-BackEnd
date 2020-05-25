/** Express router providing notifications related controllers
 * @module controller/notifications
 * @requires mongoose
 * @requires tokenValidation
 * @requires eventsServices
 * @requires environment-variables
 */

/**
 * Token validation module
 * @const
 */
var tokenValidation = require ('../services/token');


/**
 * Events services module
 * @const
 */
var eventsServices = require ('../services/eventsServices');

/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');

/**
 * This module contain notifications controller
 * 
 * 
 * @namespace notificationsController
 */

/**
 * function handles a user request to retrieve notifications
 * @memberof module:controller/notifications~notificationsController
 * @name getNofitifications
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  

exports.getNotifications = async function (req, res, next)
{
    try {  
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');    
        var user= authData.user;
        var searchFilter = { Affected: mongoose.Types.ObjectId(user._id)};
        var events = await eventsServices.getEvents (searchFilter);
        if (events.length == 0) throw ("No notifications found!");    
        return res.status(200).json({ status: 200, message: "Notifications retrieved succesfully", events});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}