// const mongoose = require ('mongoose');
// const User = require ('../Database Seeds/models/user');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');

// mongoose.connect('mongodb://localhost:27017/testpacify');

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "pacifyproject@gmail.com", // generated ethereal user
//         pass: "A123456bc" // generated ethereal password
//       }
//   });

// module.exports = {
//     insertuser : (req , res) => {
//         var users = new User ({
//             email: req.body.email,
//             password: req.body.password,
//             nickname: req.body.nickname,
//             type: req.body.type,
//             gender: req.body.gender,
//             birthdate: req.body.birthdate,
//             phone: req.body.phone,
//             fbuser: req.body.fbuser,
//             img: req.body.img,
//             country: req.body.country,
//             img: req.body.img
//         });
        
//         users.save()
//         .then( user => {
//             res.status(201);
//             //token for email
//             jwt.sign({user}, 'EmailSecret', { expiresIn: '50m' }, (err, token) => {
                    
//                     if(!result.fbuser){
//                             const url = `http://localhost:3000/signup/emailconfrimation/?Authorization=Bearer ${token}`;
//                             console.log(token);
//                             let mailOptions = {
//                             from: '"Pacify" <pacifyproject@gmail.com>', // sender address
//                             to: "mwnyzinwhgwklrlxmb@awdrt.net", // list of receivers
//                             subject: 'Email verification',
//                             html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
//                         };
//                         transporter.sendMail(mailOptions, (error, info) => {
//                             if (error) {
//                                 return console.log(error);
//                             }
                            
//                         });
                    
//                     }
                    
                    
//                   });
            
            
//                   jwt.sign({user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
//                     res.json({
//                         token: token,
//                         user
//                     });
                    
                    
                    
//                   });
                  
            
//         })
//         .catch(err => {
//                 res.status(400);
//                 console.log(err);
//                 res.json("user already exists")
            
//         })
//     }
// };