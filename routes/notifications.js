/** Express router providing notfications related routes
 * @module routers/notifications
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
 * Notifications controller module
 * @const
 */
const controller = require ('../controller/notificationsController');

/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


/**
 * This function redirects to notifications
 * 
 * 
 * @namespace Notifications
 */
const notificationsRoutes = (app, fs, User) => {
/**
 * Route serving notifications form.
 * @memberof module:routers/notifications~notificationsRoutes
 * @name get/notfications
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get ('/notifications' , tokenhandler.verifyToken, (req, res) => {controller.getNotifications(req, res, User)});  // calling the controller function
 
}

module.exports = notificationsRoutes;

