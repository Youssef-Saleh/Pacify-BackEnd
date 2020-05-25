/** Express router providing activity log related routes
 * @module routers/activitylog
 * @requires controller
 * @requires tokenhandler
 * @requires mongoose
 * @requires environment variables
 */
const jwt = require('jsonwebtoken');
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
const tokenhandler = require ('../controller/auth');
/**
 * Activity log controller module
 * @const
 */
const controller = require ('../controller/activityLogController');

/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


/**
 * This function redirects to activity log
 * 
 * 
 * @namespace activitylog
 */
const activitylogRoutes = (app, fs, User) => {
/**
 * Route serving activity log form.
 * @memberof module:routers/activitylog~activitylogRoutes
 * @name get/activitylog
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get ('/activitylog' , tokenhandler.verifyToken, (req, res) => {controller.getActivity(req, res, User)});  // calling the controller function
 
}

module.exports = activitylogRoutes;

