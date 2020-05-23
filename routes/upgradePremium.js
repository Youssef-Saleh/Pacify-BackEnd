/** Express router providing premium upgrade related routes
 * @module routers/premium
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
 * premium controller module
 * @const
 */
const controller = require ('../controller/premium');

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
 * @namespace premium
 */
const premiumRoutes = (app, fs, User) => {
/**
 * Route serving premium form.
 * @memberof module:routers/premium~premiumRoutes
 * @name post/premium
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.put ('/premium' , tokenhandler.verifyToken, (req, res) => {controller.getPremium(req, res, User)});  // calling the controller function
 /**
 * Route serving premium form.
 * @memberof module:routers/premium~premiumRoutes
 * @name get/premium/cofirmation
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
  app.get('/premium/confirmation', tokenhandler.verifyToken, (req, res) => {controller.premiumConfirmation(req, res, User)});
   
}

module.exports = premiumRoutes;
