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

/**
 * Login request
 * @module browseRoutes
 */

const browseRoutes = (app, fs) => {

    app.use(express.static('./static'));
    app.use(bodyParser.urlencoded({extended : false}));    

    /**
    * @name get/browse/:text Start a Search
    * @description The input text will be used to search the whole database for artists/songs/albums meeting the text
    * @inner
    * @param {String} Text The input text the user entered 
    * @param {object} req requesting the needed info 
    * @param {object} res it shows all the Song that the user liked and requested for.

    * @returns {Object} Returns Artists/Album/songs Meeting the feautures
    */

    app.get('/browse/:text', getArtist, getSong, getAlbum, (req, res) => {   
        res.send(req.result);
    });

    /**
    * @name get/browse genre search
    * @eescription this route will send all the genres available
    * @inner
    * @description The user enter his email and password to access his webplayer account
    * @param {object} req requesting the needed info 
    * @param {object} res it shows all the Song that the user liked and requested for.

    * @returns {Object} Returns all genres in the database
    */

    app.get('/browse', (req, res) => {   
        mongoose.connection.db.collection('properties',function(err, collection){
            collection.find({type: "Genre"}).toArray(function(err,docs){
                res.json(docs);
            })
        })
    });

    
}
module.exports = browseRoutes;