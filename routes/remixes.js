const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');
const artist_auth = require('../middlewares/artist_auth');

var Song = require('../Database Seeds/models/song');

const remixesRoutes = (app, fs) => {
    // showing song remix
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/remixes/:remixId',(req, res) => {
        mongoose.connection.db.collection('songs',function(err, collection){
             collection.find({_id:new ObjectId(req.params.remixId)}).toArray(function(err,docs){
                    if (err) {
                        throw err;

                    }
                    res.send(docs[0]);
                });
        });
    });

    app.post('/createRemix', auth, artist_auth, (req, res) =>{
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

                        var newRemix = new Song ({
                            name: req.body.remixName,
                            year: req.body.year,
                            genre: req.body.genre,
                            mood: req.body.mood,
                            artist: req.body.artist
                        });
      
                        newRemix.save(function(err, result) {
                          if (err) {
                            throw err;
                          }
                        });
                        collection.updateOne(
                            {_id: new ObjectId(req.body.songId)},
                            {$push:{ remixes :req.body.remixName}}
                        );
                    });
                  }
        });
      
        collection2.updateOne(
          {_id: new ObjectId(req.body.userId)},
          {$push:{ uploadedSongs :req.body.remixName}}
        );
      });
    res.send('new song created!')
  });
}

module.exports = remixesRoutes;