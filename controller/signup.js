/** Express router providing signup related controllers
 * @module controller/signup
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
 * This module contain signup related functions
 * 
 * 
 * @namespace signupFunctions
 */
module.exports = {
/**
 * function handles a user request to signup
 * @memberof module:controller/signup~signupFunctions
 * @name insertuser
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */  
    insertuser : (req , res, User) => {
        var users = new User ({
            email: req.body.email,
            password: req.body.password,
            nickname: req.body.nickname,
            type: req.body.type,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            phone: req.body.phone,
            fbuser: req.body.fbuser,
            img: req.body.img,
            country: req.body.country,
            img: req.body.img
        });
        //console.log(users);
        users.save()
        .then( user => {
            res.status(201);
            //token for email
            jwt.sign({user}, 'EmailSecret', { expiresIn: '50m' }, (err, token) => {
                    
                    if(!user.fbuser){
                            const url = `${mailURL}/signup/emailconfirmation/?Authorization=Bearer ${token}`;
                            let mailOptions = {
                            from: senderAddress, // sender address
                            to: receiverAddress, // list of receivers
                            subject: 'Email verification',
                            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            
                        });
                    
                    }
                    
                    
                  });
            
            
                  jwt.sign({user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                    res.json({
                        token: token,
                        user
                    });
                    
                    
                    
                  });
                  
            
        })
        .catch(err => {
                res.status(400);
                //console.log(err);
                res.json("user already exists")
            
        })
    },
/**
 * function handles sending a verification email to user
 * @memberof module:controller/signup~signupFunctions
 * @name emailVerify
 * @function
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param User {Object} The user model
 * @param req.body {Object} The JSON payload.
 * @return {undefined}
 */
    emailVerify: (req, res, User) => {
        jwt.verify(req.token, 'EmailSecret', (err, authData) => {
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
                          if(!docs[0].activated){
                            mongoose.connection.db.collection('users', function (err, collection) {
                                collection.updateOne({email: authData.user.email}, {$set: {activated: true}})
                                if(err){
                                    res.send(err);
                                }
                                else{
                                  res.json("Email confirmed!");
                                }
                              });   
                          } else {
                                res.json("Email is already confirmed");
                          }
                        
                      }
                    });
                  });  
              
            }
          })
    }
};