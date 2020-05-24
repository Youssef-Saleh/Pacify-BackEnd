/** Express router providing notifications related controllers
 * @module controller/notifications
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
const nodemailer = require('nodemailer');

/**
 * jsonwebtoken module
 * @const
 */
const jwt = require('jsonwebtoken');

/**
 * environment variables module
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
 * This module contain notifications controller
 * 
 * 
 * @namespace notificationsController
 */

module.exports = {
/**
 * function handles a user request to retrieve notifications
 * @memberof module:controller/notifications~notificationsController
 * @name getNofitifications
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  

getNofitifications : (req , res, User) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          //An error page to be rendered
          res.sendStatus(403);
          //console.log(err);
        } else {
            mongoose.connection.db.collection('events', function (err, collection) {
                collection.find({ Affected: mongoose.Types.ObjectId(authData.user._id)})
                .toArray((err, docs) => {
                  if(docs.length == 0){
                    res.send("No notifications exist!");
                  } else {
                    //res.send(docs);
                    var log = docs[0];
                    var user= authData.user;
                    //console.log(docs);
                    jwt.sign({user: user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                        res.json({
                            token: token,
                            log
                        });
  
                    });
                    
                  }
                });
              });
            //////////////
            
    
          
         
        }
      });

},


}