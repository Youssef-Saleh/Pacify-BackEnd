/** Express router providing password related routes
 * @module routers/password-reset
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
 * password-reset controller module
 * @const
 */
const controller = require ('../controller/passwordReset');

/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


/**
 * This function redirects to password-reset and change
 * 
 * 
 * @namespace passwordRoutes
 */
const passwordRoutes = (app, fs, User) => {
/**
 * Route serving password-reset form.
 * @memberof module:routers/password-reset~passwordRoutes
 * @name post/password-reset
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.post ('/password-reset' , controller.resetPass);  // calling the controller function
 /**
 * Route serving password change form.
 * @memberof module:routers/password-reset~passwordRoutes
 * @name get/password-reset/change
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get('/password-reset/change', tokenhandler.verifyToken, (req, res) => {controller.loadingChangePage(req, res, User)});
   /**
 * Route serving password change form.
 * @memberof module:routers/password-reset~passwordRoutes
 * @name put/password-reset/change
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.put('/password-reset/change', tokenhandler.verifyToken, (req, res) => {controller.changePassword(req, res, User)});
}

module.exports = passwordRoutes;
