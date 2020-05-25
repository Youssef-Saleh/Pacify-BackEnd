/** Express router providing premium related controllers
 * @module controller/premium
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires nodemailer
 * @requires environment-variables
 */
/**
 * environment variables module
 * @const
 */
const mailURL = require('../env_variables/env_vars.json').mailURL

/**
 * Mailer services module
 * @const
 */
var mailer = require ('../services/mailer');
/**
 * Token validation module
 * @const
 */
var tokenValidation = require ('../services/token');

/**
 * User services module
 * @const
 */
var userServices = require ('../services/userServices');

/**
 * This module contain premium related functions
 * 
 * 
 * @namespace premiumControllers
 */

/**
 * function handles checks if token is valid  to become premium
 * @memberof module:controller/premium~premiumControllers
 * @name checkUser
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  
exports.checkUser = async function (req, res, next)
{
    try {  
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');        
        return res.status(200).json({ status: 200, message: "Succesfully retrieved!"});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}

/**
 * function handles a user request to become premium
 * @memberof module:controller/premium~premiumControllers
 * @name getPremium
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  

exports.getPremium = async function (req, res, next)
{
    try {  
        var authData = await tokenValidation.validateToken(req.token, 'secretkey');    
        var user= authData.user;
        var searchFilter = {email: authData.user.email, type: "Free"};
        var users = await userServices.getUsers (searchFilter);
        if (users.length == 0) throw ("Already premium or artist");   
        var token = await tokenValidation.signToken(user,'premiumSecret');
        const url = `${mailURL}/premium/emailconfirmation/?Authorization=Bearer ${token}`;
        var subject = 'Premium verification';
        var html = `Please click this email to confirm upgrading to premium: <a href="${url}">${url}</a>`;
        //console.log(html);
        await mailer.sendEmail(subject, html); 
        return res.status(200).json({ status: 200, message: "Email sent! Please check your inbox.", token});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}

/**
 * function handles a user request to become premium
 * @memberof module:controller/premium~premiumControllers
 * @name premiumConfirmation
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  
exports.premiumConfirmation = async function (req, res, next)
{
    try {  
        var authData = await tokenValidation.validateToken(req.token, 'premiumSecret'); 
        var user= authData.user;
        var searchFilter = {email: authData.user.email, type: "Free"};
        var users = await userServices.getUsers (searchFilter);
        if (users.length == 0) throw ("Already premium or artist");
        var updateFilter = {email: authData.user.email};
        var query = {$set: {type: "Premium"}};
        await userServices.updateUser(updateFilter, query);         
        return res.status(200).json({ status: 200, message: "You are premium now!"});
    } catch (e) {
        //console.log(e);
        return res.status(400).json({ status: 400, message: e});
    }
}
