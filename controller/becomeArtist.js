/** Express router providing become an artist related controllers
 * @module controller/becomeArtist
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires nodemailer
 * @requires environment-variables
 */

/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');
/**
 * jsonwebtoken module
 * @const
 */
const jwt = require('jsonwebtoken');
/**
 * nodemailer module
 * @const
 */
const nodemailer = require('nodemailer');
/**
 * environment variables module for authentication
 * @const
 */
const auth = require('../env_variables/env_vars.json').auth

mongoose.connect('mongodb://localhost:27017/testpacify');

/**
 * nodemailer configuration function
 * @const
 * @param authentication {Object} The email, password and host
 */
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth,
  });
  /**
   * environment variables module for mail URL
   * @const
   */
  const mailURL= "http://localhost:5000";
  /**
   * environment variables module for sender address
   * @const
   */
  const senderAddress = '"Pacify" <pacify@pacify.tech>';
  /**
   * environment variables module for receiver address
   * @const
   */
  const receiverAddress = "ahmadosgalal@gmail.com";


/**
 * This module redirects to become an artist 
 * 
 * 
 * @namespace becomeArtistController
 */
module.exports = {
/**
 * function retrieves specific user data for account overview
 * @memberof module:controller/becomeArtist~becomeArtistController
 * @name retrieveOverview
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    retrieveUser: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
                res.json(authData.user); 
            }
          });
    },
/**
 * function retrieves specific user data for account profile
 * @memberof module:controller/account~accountFunctions
 * @name retrieveProfile
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    retrieveProfile: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              if(!authData.user.fbuser) {
                res.json(authData.user);
        
              }
              else {
                res.json(authData.user);
        
              }
              
            }
          });
    },
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
    artistUpgrade: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              //console.log(req.body.country);
              //console.log(authData);
              mongoose.connection.db.collection('users', function (err, collection) {
                collection.updateOne({email: authData.user.email}, {$set: {realName: req.body.realName, nationalID: req.body.nationalID, type: "Artist"}})
                if(err){
                    res.send(err);
                }
                else{
                  mongoose.connection.db.collection('users', function (err, collection) {
                    collection.find({ 'email' : authData.user.email })
                    .toArray((err, docs) => {
                      if(docs.length == 0){
                        res.send("No user exists with the same email or username!");
                      } else {
                        //res.send(docs);
                        //const url = `${mailURL}/premium/emailconfirmation/?Authorization=Bearer ${token}`;
                        let mailOptions = {
                        from: senderAddress, // sender address
                        to: receiverAddress, // list of receivers
                        subject: 'Artist request',
                        html: `After reviewing the submitted request, you are now officially an Artist!! Congrats`,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            
                        });
                        var user = docs[0];
                        //console.log(docs);
                        jwt.sign({user: user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                          res.send({token: token});
      
                        });
                        
                      }
                    });
                  });
                }
                
              });
              
              
            }
          });
    }

};