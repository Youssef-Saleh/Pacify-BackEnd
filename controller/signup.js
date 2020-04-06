const mongoose = require ('mongoose');
const nodemailer = require('nodemailer');
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

module.exports = {
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
        console.log(users);
        users.save()
        .then( user => {
            res.status(201);
            //token for email
            jwt.sign({user}, 'EmailSecret', { expiresIn: '50m' }, (err, token) => {
                    
                    if(!user.fbuser){
                            const url = `http://localhost:5000/signup/emailconfrimation/?Authorization=Bearer ${token}`;
                            let mailOptions = {
                            from: '"Pacify" <pacify@pacify.tech>', // sender address
                            to: "masterahmed25@hotmail.com,  ahmadosgalal@gmail.com", // list of receivers
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
                console.log(err);
                res.json("user already exists")
            
        })
    }
};