const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

mongoose.connect('mongodb://localhost:27017/testpacify');

const transporter = nodemailer.createTransport({
  service: "Gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "pacifyproject@gmail.com", // generated ethereal user
      pass: "A123456bc" // generated ethereal password
    }
});

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
                          const url = `http://localhost:3000/password-reset/change/?Authorization=Bearer ${token}`;
                          console.log(token);
                          let mailOptions = {
                            from: '"Pacify" <pacifyproject@gmail.com>', // sender address
                            to: "mwnyzinwhgwklrlxmb@awdrt.net", // list of receivers
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
                      const url = `http://localhost:3000/password-reset/change/?Authorization=Bearer ${token}`;
                      console.log(token);
                      let mailOptions = {
                          from: '"Pacify" <pacifyproject@gmail.com>', // sender address
                          to: "mwnyzinwhgwklrlxmb@awdrt.net", // list of receivers
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
        }

    };
    
