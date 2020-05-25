/** Express router providing become an artist related implementations
 * @module controller/becomeArtist
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires nodemailer
 * @requires environment-variables
 */
/**
 * User services module
 * @const
 */
var userServices = require ('../services/userServices');
/**
 * Token validation module
 * @const
 */
var tokenValidation = require ('../services/tokenValidation');
/**
 * Mailer services module
 * @const
 */
var mailer = require ('../services/mailer');

/**
 * This module redirects to become an artist 
 * 
 * 
 * @namespace becomeArtistController
 */

/**
 * function retrieves specific user data for account overview
 * @memberof module:controller/becomeArtist~becomeArtistController
 * @name retrieveUser
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
exports.retrieveUser = async function (req, res, next)
{
    try {
        //var user = await 
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');
        //console.log (authData);
        //var users = await userServices.getUsers ();
        return res.status(200).json({ status: 200, message: "Succesfully retrieved!"});
        //return res.status(200).json({ status: 200,  message: "Succesfully retrieved!"});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}

/**
 * function updates specific user data for account overview
 * @memberof module:controller/becomeArtist~becomeArtistController
 * @name artistUpgrade
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
exports.artistUpgrade = async function (req, res, next)
{
    try {
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');
        var searchFilter = {email: authData.user.email, $or: [{type: "Free"}, {type: "Premium"}]};
        var users = await userServices.getUsers (searchFilter);
        if (users.length == 0) throw ("Already an artist");
        var updateFilter = {email: authData.user.email};
        var query = {$set: {realName: req.body.realName, nationalID: req.body.nationalID, type: "Artist"}};
        await userServices.updateUser(updateFilter, query);
        var subject = 'Artist request';
        var html = 'After reviewing the submitted request, you are now officially an Artist!! Congrats!';
        await mailer.sendEmail(subject, html);
        return res.status(200).json({ status: 200, message: "You are an artist now!"});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}