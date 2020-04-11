/** Express router providing account overview related routes
 * @module routers/account
 * @requires controller
 * @requires tokenhandler
 * @requires mongoose
 * @requires environment-variables
 */

 /**
 * tokenhandler module
 * @const
 */
const tokenhandler = require ('../controller/auth');
/**
 * account controller module
 * @const
 */
const controller = require ('../controller/account');
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
 * This function redirects to account overview
 * 
 * 
 * @namespace accountRoutes
 */
const accountRoutes = (app, fs, User) => {
/**
 * Route serving account overview form.
 * @memberof module:routers/account~accountRoutes
 * @name get/account/overview
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
    app.get('/account/overview', tokenhandler.verifyToken, (req, res) => {controller.retrieveOverview(req, res, User)});
/**
 * Route serving account profile form.
 * @memberof module:routers/account~accountRoutes
 * @name get/account/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */ 
    app.get('/account/profile', tokenhandler.verifyToken, (req, res) => {controller.retrieveProfile(req, res, User)});
/**
 * Route serving account profile form.
 * @memberof module:routers/account~accountRoutes
 * @name put/account/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */ 
    app.put('/account/profile', tokenhandler.verifyToken, (req, res) => {controller.updateProfile(req, res, User)});

}

module.exports = accountRoutes;

