/** Express router providing signup related routes
 * @module routers/signup
 * @requires controller
 * @requires tokenhandler
 * @requires mongoose
 * @requires environment variables
 */

 /**
 * signup controller module
 * @const
 */
const controller = require ('../controller/signup');
/**
 * tokenhandler module
 * @const
 */
const tokenhandler = require ('../controller/auth');
/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');
/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

/**
 * This function redirects to signup and email confirmation
 * 
 * @param {module} app 
 * @param {module} fs 
 * @param {Object} User 
 * @namespace signupRoutes
 */
const signupRoutes = (app, fs, User) => {
/**
 * Route serving signup form.
 * @memberof signupRoutes
 * @name post/login
 * @function
 * @memberof module:routers/signup~signupRoutes
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.post ('/signup' , (req, res) => {controller.insertuser(req, res, User)});  // calling the controller function
/**
 * Route serving email confirmation form.
 * @memberof signupRoutes
 * @name get/emailconfirmation
 * @function
 * @memberof module:routers/signup~signupRoutes
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get ('/emailconfirmation', tokenhandler.verifyToken, (req, res) => {controller.emailVerify(req, res, User)}); // calling the confirmation function
}

module.exports = signupRoutes;