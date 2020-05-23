/** Express router providing first-login related routes
 * @module routers/first-login
 * @requires controller
 * @requires tokenhandler
 * @requires mongoose
 * @requires environment variables
 */

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
 * first-login controller module
 * @const
 */
const controller = require ('../controller/firstTime');

/**
 * environment variables module
 * @const
 */
const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

/**
 * This function redirects to first time use
 * 
 * 
 * @namespace firstRoutes
 */
const firstRoutes = (app, fs, User, Property) => {
/**
 * Route serving select genres form.
 * @memberof module:routers/first-login~firstRoutes
 * @name get/select/genres
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
      app.get('/select/genres', tokenhandler.verifyToken, (req, res) => {controller.retreieveGenres(req, res, User, Property)});
/**
 * Route serving select genres form.
 * @memberof module:routers/first-login~firstRoutes
 * @name put/select/genres
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
      app.put('/select/genres', tokenhandler.verifyToken, (req, res) => {controller.chooseGenres(req, res, User, Property)});
/**
 * Route serving select artists form.
 * @memberof module:routers/first-login~firstRoutes
 * @name get/select/artists
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
      app.get('/select/artists', tokenhandler.verifyToken, (req, res) => {controller.retreiveArtists(req, res, User)});
/**
 * Route serving select artists form.
 * @memberof module:routers/first-login~firstRoutes
 * @name put/select/artists
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
      app.put('/select/artists', tokenhandler.verifyToken, (req, res) => {controller.selectArtists(req, res, User)});
}

module.exports = firstRoutes;

