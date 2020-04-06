const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const createSongRoutes = (app, fs, Song) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/createSong', (req, res, next)=>{
      mongoose.connection.db.collection('users', function(err, collection2){
          if (err){
              throw err;
          }
          collection2.find({type:"Artist"},{_id:new ObjectId(req.body.userId)}).toArray( function(err,docs) {
              if (err){
                  throw err
              }else{
                  mongoose.connection.db.collection('songs', function(err, collection){
                      if(err){
                          throw err;
                      }

                      var newSong = new Song ({
                          name: req.body.name,
                          year: req.body.year,
                          genre: req.body.genre,
                          mood: req.body.mood,
                          artist: req.body.artist
                      });
    
                      newSong.save(function(err, result) {
                        if (err) {
                          throw err;
                        }
                      });
                  });
                }
      });
    
      collection2.updateOne(
        {_id: new ObjectId(req.body.userId)},
        {$push:{ uploadedSongs :req.body.name}}
      );
    });
  res.send('new song created!')
  });
};
module.exports = createSongRoutes;