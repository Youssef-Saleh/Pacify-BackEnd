/** Express router providing activity log related controllers
 * @module controller/activitylog
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires nodemailer
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
 * This module contain activity log
 * 
 * 
 * @namespace activitylogController
 */

/**
 * function handles a user request to become premium
 * @memberof module:controller/activitylog~activitylogController
 * @name getActivity
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  

exports.getActivity = async function (req, res, next)
{
    try {  
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');    
        var user= authData.user;
        var searchFilter = { Performer: mongoose.Types.ObjectId(user._id)};
        var events = await eventsServices.getEvents (searchFilter);
        if (events.length == 0) throw ("No events found!");    
        return res.status(200).json({ status: 200, message: "Events retrieved succesfully", events});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}