const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');


const getAlbumSongsRoutes = (app, fs) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/getAlbumSongs', (req, res) => {
        mongoose.connection.db.collection('albums',function(err, collection){
            if (err){
                throw err;
            }
            collection.find({_id:new ObjectId(req.body.albumId)}).toArray(function(err,docs){

                if (err){
                    throw err;

                }
                arr = []
                arr=docs[0].songs
                res.send(arr);
            });
        });
    });
};

module.exports = getAlbumSongsRoutes;