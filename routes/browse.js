const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const fs = require('fs');
const mongoose = require ('mongoose');

const getArtist = require('../middlewares/artist_search');
const getSong = require('../middlewares/song_search');
const getAlbum = require('../middlewares/album_search');

var ObjectId = require('mongoose').Types.ObjectId; 

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


const browseRoutes = (app, fs) => {

    app.use(express.static('./static'));
    app.use(bodyParser.urlencoded({extended : false}));    

    app.get('/browse/:text', getArtist, getSong, getAlbum, (req, res) => {   
        res.send(req.result);
    });

    app.get('/browse', (req, res) => {   
        mongoose.connection.db.collection('properties',function(err, collection){
            collection.find({type: "Genre"}).toArray(function(err,docs){
                res.json(docs);
            })
        })
    });

    
}
module.exports = browseRoutes;