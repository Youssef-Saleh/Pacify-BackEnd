/** Express router providing authentication related controllers
 * @module controller/authentication
 * @requires jsonwebtoken
 * @requires mongoose
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

mongoose.connect('mongodb://localhost:27017/testpacify');

/**
 * This module redirects to authentication functions
 * 
 * 
 * @namespace authFunctions
 */
module.exports = {
  /**
 * function checks user's credintials
 * @memberof module:controller/authentication~authFunctions
 * @name login
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    login: (req, res, next) => {
      var userCredintials;
      var token;
      var enteredData = req.body;
      mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({'email' : enteredData.email, 'password' : enteredData.password})
        .toArray((err, docs) => {
          if(docs.length == 0){
            console.log(err);
            res.send("Wrong password or email");
          } else {
            var user = docs[0];
            token = jwt.sign({user: user}, 'secretkey', { expiresIn: '2h' }, (err, token) => {
            console.log(token);
            res.json({token: token});
            });
          }
        });
      });
    },
/**
 * function validates token
 * @memberof module:controller/authentication~authFunctions
 * @name verifyToken
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user schema
 * @param req.body {Object} The JSON payload.
 * @param next {Function} The callback function
 * @return {undefined}
 */
    verifyToken: (req, res, next) => {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
          // Split at the space
          const bearer = bearerHeader.split(' ');
          // Get token from array
          const bearerToken = bearer[1];
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
        } else {
          // Forbidden
          res.sendStatus(403);
        }
      
      }
};