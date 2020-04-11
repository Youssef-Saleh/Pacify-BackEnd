/** Express router providing account overview related controllers
 * @module controller/account
 * @requires jsonwebtoken
 * @requires mongoose
 * @requires environment-variables
 */

/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');
const nodemailer = require('nodemailer');
/**
 * jsonwebtoken module
 * @const
 */
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/testpacify');

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "pacify@pacify.tech", // generated ethereal user
      pass: "26855765Pacify!" // generated ethereal password
    }
});

/**
 * This module redirects to account settings
 * 
 * 
 * @namespace accountFunctions
 */
module.exports = {
/**
 * function retrieves specific user data for account overview
 * @memberof module:controller/account~accountFunctions
 * @name retrieveOverview
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    retrieveOverview: (req, res, User) => {
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
 * @memberof module:controller/account~accountFunctions
 * @name updateProfile
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    updateProfile: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              //console.log(req.body.country);
              //console.log(authData);
              if(authData.user.fbuser){
                mongoose.connection.db.collection('users', function (err, collection) {
                  collection.updateOne({email: authData.user.email}, {$set: {country: req.body.country, phone: req.body.phone}})
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
              else{
                mongoose.connection.db.collection('users', function (err, collection) {
                  mongoose.connection.db.collection('users', function (err, collection) {
                    collection.find({ email: req.body.email})
                    .toArray((err, docs) => {
                      if(docs.length == 0){
                        collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {country: req.body.country, phone: req.body.phone, email: req.body.email, password: req.body.password, gender: req.body.gender}})
                        if(err){
                            res.send(err);
                        }
                        else{
                          mongoose.connection.db.collection('users', function (err, collection) {
                            collection.find({ _id: mongoose.Types.ObjectId(authData.user._id)})
                            .toArray((err, docs) => {
                              if(docs.length == 0){
                                res.send("No user exists with the same email or username!");
                              } else {
                                //res.send(docs);
                                var user = docs[0];
                                //console.log(docs);
                                jwt.sign({user: user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                                  res.send({token: token});
              
                                });
                                
                              }
                            });
                          });
                        }
                      } else {
                        res.send("Existing email!")
                        
                      }
                    });
                  });
                  
                  
                });
              } 
            }
          });
    }

};