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
const Album = require('../Database Seeds/models/album');
var Song = require('../Database Seeds/models/song');

const addSongsToAlbumRoutes = (app, fs) => {
    app.put('/addSongsToAlbum', (req, res, next) => {
        mongoose.connection.db.collection('users',function(err, collection){
            if (err){
                throw err;
            }
            collection.find({_id:new ObjectId (req.body.userId)},{type:"Artist"}).toArray(function(err,docs){
                if (err) {
                    throw err;
                }else{
                    mongoose.connection.db.collection('songs', function(err, collection3){
                        if(err){
                            throw err;
                        }
            
                        var newSong = new Song ({
                            name: req.body.songName,
                            year: req.body.songYear,
                            genre: req.body.songGenre,
                            mood: req.body.songMood,
                            artist: req.body.songArtist
                        });
            
                        newSong.save(function(err, result) {
                          if (err) {
                            throw err;
                          }
                        });
                    });
                    collection.updateOne(
                        {_id: new ObjectId(req.body.userId)},
                        {$push:{ uploadedSongs :req.body.songName}}
                    )
                 }
             });
            mongoose.connection.db.collection('albums',function(err, collection2){
                if (err){
                    throw err;
                }
                collection2.find({_id:new ObjectId (req.body.AlbumId)}).toArray(function(err,docs){
                    collection2.updateOne(
                        {_id: new ObjectId(req.body.albumId)},
                        {$push:{ songs :req.body.songName}}
                    );

                });
            });
        });
        res.send("song added to album");
      });

};

module.exports = addSongsToAlbumRoutes;