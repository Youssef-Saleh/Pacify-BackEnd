/** Express router providing password reset and change related controllers
 * @module controller/password-reset
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
 * This module contain passowrd related functions
 * 
 * 
 * @namespace passwordFunctions
 */
module.exports = {
 /**
 * function handles a user request to reset his password
 * @memberof module:controller/password-reset~passwordFunctions
 * @name resetPass
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */ 
    resetPass : (req , res) => {
        mongoose.connection.db.collection('users', function (err, collection) {
            collection.find({ 'email' : req.body.emailUsername })
            .toArray((err, docs) => {
              if(docs.length == 0){
                try{
                  mongoose.connection.db.collection('users', function (err, collection) {
                    collection.find({ '_id' : mongoose.Types.ObjectId(req.body.emailUsername) })
                    .toArray((err, docs) => {
                      if(docs.length == 0){
                        res.send("No user exists with the same email or username!");
                      } else {
                        //res.send(docs);
                        
                        res.send("Success!");
                        var user = docs[0];
                        jwt.sign({user: user}, 'passwordKey', { expiresIn: '50m' }, (err, token) => {
                          const url = `${mailURL}/password-reset/change/?Authorization=Bearer ${token}`;
                            let mailOptions = {
                            from: senderAddress, // sender address
                            to: receiverAddress, // list of receivers
                            subject: 'Password Reset',
                            html: `Please click this email to reset your password: <a href="${url}">${url}</a>`,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            
                        });
                          
                          
                        });
                        
                      }
                    });
                  });

                } catch(err) {
                  res.send("No user exists with the same email or username!");
                }
                              
              } else {

                      res.send("Success!");
                      var user = docs[0];
                      jwt.sign({user: user}, 'passwordKey', { expiresIn: '50m' }, (err, token) => {
                          const url = `${mailURL}/password-reset/change/?Authorization=Bearer ${token}`;
                          let mailOptions = {
                          from: senderAddress, // sender address
                          to: receiverAddress, // list of receivers
                          subject: 'Password Reset',
                          html: `Please click this email to reset your password: <a href="${url}">${url}</a>`,
                      };
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          
                      });
                        
                        
                      });
                
                
              }
            });
          });
        },
/**
 * function validates the token to change the password
 * @memberof module:controller/password-reset~passwordFunctions
 * @name loadingChangePage
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */        
        loadingChangePage: (req, res, User) => {
          jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              res.json("success");
            }
          });
        },
/**
 * function changes user password
 * @memberof module:controller/password-reset~passwordFunctions
 * @name changePassword
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */        
        changePassword: (req, res, User) => {
          jwt.verify(req.token, 'passwordKey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              mongoose.connection.db.collection('users', function (err, collection) {
                collection.updateOne({email: authData.user.email}, {$set: {password: req.body.newPassword}})
                if(err){
                    res.send(err);
                }
                else{
                    res.send('Success');
                }
                
              });
            }
          });
        }

    };
    
