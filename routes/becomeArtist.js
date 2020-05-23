/** Express router providing become an artist related routes
 * @module routers/becomeArtist
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
 * becomd an artist controller module
 * @const
 */
const controller = require ('../controller/becomeArtist');
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
 * @namespace becomeArtistRoutes
 */
const becomeArtistRoutes = (app, fs, User) => {
/**
 * Route serving become an artst form.
 * @memberof module:routers/becomeArtist~becomeArtistRoutes
 * @name get/becomeArtist
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
    app.get('/becomeArtist', tokenhandler.verifyToken, (req, res) => {controller.retrieveUser(req, res, User)});

/**
 * Route serving account profile form.
 * @memberof module:routers/becomeArtist~becomeArtistRoutes
 * @name put/account/profile
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */ 
    app.put('/becomeArtist', tokenhandler.verifyToken, (req, res) => {controller.artistUpgrade(req, res, User)});

}

module.exports = becomeArtistRoutes;

