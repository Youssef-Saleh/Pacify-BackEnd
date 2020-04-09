const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const auth = require('../env_variables/env_vars.json').auth

mongoose.connect('mongodb://localhost:27017/testpacify');

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth,
});
const mailURL= "http://localhost:5000";
const senderAddress = '"Pacify" <pacify@pacify.tech>';
const receiverAddress = "ahmadosgalal@gmail.com";

module.exports = {
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
    
