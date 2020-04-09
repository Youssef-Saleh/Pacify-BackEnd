const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');


const allPlaylistsRoutes = (app, fs) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/allSongs', (req, res) => {
      
        mongoose.connection.db.collection('songs',function(err, playlistModel){
            playlistModel.find({}).toArray((err, Arr) => {

                res.send(Arr);
            })
        });
    });
}

module.exports = allPlaylistsRoutes;