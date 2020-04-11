/** Express router providing firstlogin related controllers
 * @module controller/firstlogin
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
const nodemailer = require('nodemailer');

mongoose.connect('mongodb://localhost:27017/testpacify');



/**
 * This module contain first login to choose artists and genres related functions
 * 
 * 
 * @namespace firstTimeRoutes
 */
module.exports = {
/**
 * function retrieves list of genres
 * @memberof module:controller/firstlogin~firstTimeRoutes
 * @name retreieveGenres
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param Property {Object} The property model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    retreieveGenres: (req, res, User, Property) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              mongoose.connection.db.collection('properties', function (err, collection) {
                collection.find({ 'type' : "Genre" })
                .toArray((err, docs) => {
                  if(docs.length == 0){
                    res.send("No genres exist!")
                  } else {
                    //console.log(authData);
                    res.status(200).send({
                      "user": authData.user,
                      "Genres": docs
                    });
                    
                  }
                });
              }); 
      
             
            }
          });
    },
/**
 * function seelects list of genres
 * @memberof module:controller/firstlogin~firstTimeRoutes
 * @name selectGenres
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param Property {Object} The Property model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */    
    chooseGenres: (req, res, User, Property) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              //console.log(authData.user);
              if(!authData.user.fbuser){
                mongoose.connection.db.collection('users', function (err, collection) {
                  collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {likedGenres: req.body.Genres}})
                  if(err){
                      res.send(err);
                  }
                  else{
                      res.send('Genres inserted');
                  }
                  
                });
              }
              else{
                mongoose.connection.db.collection('users', function (err, collection) {
                  collection.updateOne({email: authData.users.email}, {$set: {likedGenres: req.body.Genres}})
                  if(err){
                      res.send(err);
                  }
                  else{
                      res.send('Genres inserted');
                  }
                  
                });
              }
            }
          });
    },
/**
 * function retrieves list of artists
 * @memberof module:controller/firstlogin~firstTimeRoutes
 * @name retreieveArtists
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param Property {Object} The property model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */    
    retreiveArtists: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              mongoose.connection.db.collection('users', function (err, collection) {
                collection.find({ 'type' : "Artist" })
                .toArray((err, docs) => {
                  if(docs.length == 0){
                    res.send("No artists exist!")
                  } else {
                    console.log(authData);
                    res.status(200).send({
                      "user": authData.user,
                      "Artists": docs
                    });
                    
                  }
                });
              }); 
        
             
            }
          });
    },
/**
 * function seelects list of artists
 * @memberof module:controller/firstlogin~firstTimeRoutes
 * @name selectArtists
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */    
    selectArtists: (req, res, User) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
              //An error page to be rendered
              res.sendStatus(403);
            } else {
              console.log(authData.user);
              if(!authData.user.fbuser){
                mongoose.connection.db.collection('users', function (err, collection) {
                  collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {likedArtists: req.body.Artists}})
                  if(err){
                      res.send(err);
                  }
                  else{
                      res.send('Artists inserted');
                  }
                  
                });
              }
              else{
                mongoose.connection.db.collection('users', function (err, collection) {
                  collection.updateOne({email: authData.users.email}, {$set: {likedArtists: req.body.Artists}})
                  if(err){
                      res.send(err);
                  }
                  else{
                      res.send('Artists inserted');
                  }
                  
                });
              }
            }
          });    
    }
};
    
