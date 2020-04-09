const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');


const getAlbumRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/album/:albumId', (req, res) => {
        mongoose.connection.db.collection('albums',function(err, collection){
            collection.find({_id:new ObjectId(req.params.albumId)}).toArray(function(err,docs){
                if (err) {
                    throw err;

                }
                console.log(docs[0])
                arr = []

                for (var i = 0; i < docs[0].songs.length; i++) {
                    arr.push(docs[0].songs[i])
                }

                mongoose.connection.db.collection('songs',function(err, collection2){
                    collection2.find({name:{ $in: arr}}).toArray(function(err,docs2){
        
                        if (err) {
                            throw err;
                        }
                        res.send(docs2);
                    });
                });
            });
        });
    });
}

module.exports = getAlbumRoutes;