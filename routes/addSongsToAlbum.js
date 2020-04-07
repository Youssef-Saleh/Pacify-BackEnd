const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');


const addSongsToAlbumRoutes = (app, fs) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.put('/addSongsToAlbum', auth, (req, res, next) => {
        mongoose.connection.db.collection('users',function(err, collection){
            if (err){
                throw err;
            }
            collection.find({_id:new ObjectId (req.userId)},{type:"Artist"}).toArray(function(err,docs){
                if (err) {
                    throw err;
                }else{
                    mongoose.connection.db.collection('songs', function(err, collection3){
                        if(err){
                            throw err;
                        }
                    });
                    collection.updateOne(
                        {_id: new ObjectId(req.userId)},
                        {$push:{ uploadedSongs :req.body.songName}}
                    )
                 }
             });
            mongoose.connection.db.collection('albums',function(err, collection2){
                if (err){
                    throw err;
                }
                collection2.find({_id:new ObjectId (req.body.albumId)}).toArray(function(err,docs){
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