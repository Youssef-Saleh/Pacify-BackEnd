/** Express router providing signup related controllers
 * @module controller/premium
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
 * This module contain premium related functions
 * 
 * 
 * @namespace premiumControllers
 */

module.exports = {
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

getPremium : (req , res, User) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          //An error page to be rendered
          res.sendStatus(403);
          console.log(err);
        } else {
            //res.send("test");
            //console.log(authData);
            var user= authData.user;
            //res.sendStatus(200);
            jwt.sign({user}, 'premiumSecret', { expiresIn: '50m' }, (err, token) => {
                    
                    const url = `${mailURL}/premium/emailconfirmation/?Authorization=Bearer ${token}`;
                    let mailOptions = {
                    from: senderAddress, // sender address
                    to: receiverAddress, // list of receivers
                    subject: 'Premium verification',
                    html: `Please click this email to confirm upgrading to premium: <a href="${url}">${url}</a>`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        
                    });
                
                    res.send(token);
                
                
              });
            //////////////
            
    
          
         
        }
      });

},

premiumConfirmation : (req, res, User) => {
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
jwt.verify(req.token, 'premiumSecret', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
        mongoose.connection.db.collection('users', function (err, collection) {
            collection.find({'email' : authData.user.email})
            .toArray((err, docs) => {
              if(docs.length == 0){
                res.send(err);
              } else {
                  if(docs[0].type== "Free"){
                    mongoose.connection.db.collection('users', function (err, collection) {
                        collection.updateOne({email: authData.user.email}, {$set: {type: "Premium"}})
                        if(err){
                            res.send(err);
                        }
                        else{
                          res.json("You are premium now!");
                        }
                      });   
                  } else {
                        res.json("You are already premium");
                  }
                
              }
            });
          });  
      
    }
  })
}
}