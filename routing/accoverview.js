const express = require ('express');
const router = express.Router();
const tokenhandler = require ('../controller/auth');
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');


router.get('/overview', tokenhandler.verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        //An error page to be rendered
        res.sendStatus(403);
      } else {
        if(!authData.user.fbuser) {
          res.json(authData.user);
        }
        else {
          res.json(authData.user);
        }
        
      }
    });
});


router.get('/profile', tokenhandler.verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
      if(!authData.user.fbuser) {
        res.json(authData.user);

      }
      else {
        res.json(authData.user);

      }
      
    }
  });
});

router.put('/profile', tokenhandler.verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
      //console.log(req.body.country);
      console.log(authData);
      if(authData.user.fbuser){
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({email: authData.user.email}, {$set: {country: req.body.country, phone: req.body.phone}})
          if(err){
              res.send(err);
          }
          else{
            mongoose.connection.db.collection('users', function (err, collection) {
              collection.find({ 'email' : authData.user.email })
              .toArray((err, docs) => {
                if(docs.length == 0){
                  res.send("No user exists with the same email or username!");
                } else {
                  //res.send(docs);
                  var user = docs[0];
                  console.log(docs);
                  jwt.sign({user: user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                    res.send({token: token});

                  });
                  
                }
              });
            });
          }
          
        });

      }
      else{
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {country: req.body.country, phone: req.body.phone, email: req.body.email, password: req.body.password, gender: req.body.gender}})
          if(err){
              res.send(err);
          }
          else{
            mongoose.connection.db.collection('users', function (err, collection) {
              collection.find({ _id: mongoose.Types.ObjectId(authData.user._id)})
              .toArray((err, docs) => {
                if(docs.length == 0){
                  res.send("No user exists with the same email or username!");
                } else {
                  //res.send(docs);
                  var user = docs[0];
                  console.log(docs);
                  jwt.sign({user: user}, 'secretkey', { expiresIn: '50m' }, (err, token) => {
                    res.send({token: token});

                  });
                  
                }
              });
            });
          }
          
        });
      } 
    }
  });
});

module.exports = router;
