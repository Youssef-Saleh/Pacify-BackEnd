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
var Song = require('../Database Seeds/models/song');
/**
 * addSongsToAlbum request
 * @module getSongByGenreRoutes 
 */
const getSongByGenreRoutes = (app, fs) => {
    /**
     * This function would request info of the song genre that the user wants to search.
     * then it shows all the song with the same genre and all the info of those songs.
     * @name get/getSongByGenre
     * @function
     * @memberof module:getSongByGenreRoutes
     * @param {*} req requesting the needed info from postman as the following:
     * @param {*} genre the genre of songs in mongoBD that the user wants to search as requested by postman
     */

    app.get('/getSongByGenre', (req, res) => {
        mongoose.connection.db.collection('songs',function(err, collection){
            if (err){
                throw err;
            }
            collection.find({genre:req.body.genre}).toArray(function(err,docs){
                    if (err) {
                        throw err;

                    }
                    res.send(docs);
                });
        });
    });
}

module.exports = getSongByGenreRoutes;