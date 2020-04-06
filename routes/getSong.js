const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const getSongRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/Song/:songId', (req, res) => {
        mongoose.connection.db.collection('songs',function(err, collection){
             collection.find({_id:new ObjectId(req.params.songId)}).toArray(function(err,docs){
                    if (err) {
                        throw err;

                    }
                    res.send(docs[0]);
                });
        });
    });
}

module.exports = getSongRoutes;