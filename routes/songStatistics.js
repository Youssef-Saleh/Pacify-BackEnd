/** Express router providing notfications related routes
 * @module routers/Statistics
 * @requires controller
 * @requires tokenhandler
 * @requires artistAuth
 * @requires mongoose
 * @requires environment variables
 */

/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');
//const User = require ('../Database Seeds/models/user');
/**
 * tokenhandler module
 * @const
 */
const tokenhandler = require ('../middlewares/token_auth');

/**
 * Artist Authorization module
 * @const
 */
const artistAuth = require ('../middlewares/artist_auth');

/**
 * Statistics controller module
 * @const
 */
const controller = require ('../controller/getStatistics');

/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


/**
 * This function gets the statistics of the passed song ID in the request body
 * 
 * 
 * @namespace Statistics
 */

const statisticsRoutes = (app, fs) => {
/**
 * Route serving notifications form.
 * @memberof module:routers/activitylog~statisticsRoutes
 * @name get/statistics
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get ('/statistics' , tokenhandler, artistAuth, (req, res, next) => {controller.getStatistics(req, res, next)});  // calling the controller function
 
}

module.exports = statisticsRoutes;

