const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
//const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json')

var ObjectId = require('mongoose').Types.ObjectId; 

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const auth = require('../middlewares/token_auth');
const premiumCheck = require('../middlewares/premium_auth');

/**
 * Login request
 * @module loginRoutes
 */
const loginRoutes = (app, fs) => {
  app.use(express.static('./static'))

  /**
  * @name post/login 
  * @inner
  * @description The user enter his email and password to access his webplayer account
  * @param {object} req requesting the needed info
  * @param {object} res it shows all the Song that the user liked and requested for.
  * @param {String} Username The user's Email (username).
  * @param {String} Password The user's Password.
  * @returns {string} Generates The user's Token based on the credintials after calling the user type check function
  */
    
  app.post('/login', (req, res) => {
      var token;
      var enteredData = req.body;
      console.log(req.body)
    
      mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({'email' : enteredData.email, 'password' : enteredData.password})
        .toArray((err, docs) => {
          if(docs.length == 0){
              if(err){
                res.sendStatus(404);
              }
              
          } else {
            const user= docs[0];
            jwt.sign(user, authVar.KEY, { expiresIn: '2h' }, (err, token) => {
              console.log(token)
              res.json(token)
            });
          }
        });
      });
  });
}

module.exports = loginRoutes;