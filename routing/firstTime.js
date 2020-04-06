const express = require ('express');
const router = express.Router();
const tokenhandler = require ('../controller/auth');
const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

router.get('/genres', tokenhandler.verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        //An error page to be rendered
        res.sendStatus(403);
      } else {
        mongoose.connection.db.collection('properties', function (err, collection) {
          collection.find({ 'type' : "Genre" })
          .toArray((err, docs) => {
            if(docs.length == 0){
              res.send("No genres exist!")
            } else {
              console.log(authData);
              res.status(200).send({
                "user": authData.user,
                "Genres": docs
              });
              
            }
          });
        }); 

       
      }
    });
});

router.put('/genres', tokenhandler.verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
      console.log(authData.user);
      if(!authData.user.fbuser){
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {likedGenres: req.body.Genres}})
          if(err){
              res.send(err);
          }
          else{
              res.send('Genres inserted');
          }
          
        });
      }
      else{
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({email: authData.users.email}, {$set: {likedGenres: req.body.Genres}})
          if(err){
              res.send(err);
          }
          else{
              res.send('Genres inserted');
          }
          
        });
      }
    }
  });    
});


router.get('/artists', tokenhandler.verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
      mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({ 'type' : "Artist" })
        .toArray((err, docs) => {
          if(docs.length == 0){
            res.send("No artists exist!")
          } else {
            console.log(authData);
            res.status(200).send({
              "user": authData.user,
              "Artists": docs
            });
            
          }
        });
      }); 

     
    }
  });
});

router.put('/artists', tokenhandler.verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      //An error page to be rendered
      res.sendStatus(403);
    } else {
      console.log(authData.user);
      if(!authData.user.fbuser){
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({_id: mongoose.Types.ObjectId(authData.user._id)}, {$set: {likedArtists: req.body.Artists}})
          if(err){
              res.send(err);
          }
          else{
              res.send('Artists inserted');
          }
          
        });
      }
      else{
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.updateOne({email: authData.users.email}, {$set: {likedArtists: req.body.Artists}})
          if(err){
              res.send(err);
          }
          else{
              res.send('Artists inserted');
          }
          
        });
      }
    }
  });    
});

module.exports = router;