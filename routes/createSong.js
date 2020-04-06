const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
mongoose.connect('mongodb://localhost:27017/testpacify');
const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//var Song = require('../Database Seeds/models/song');

const createSongRoutes = (app, fs, Song) => {
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