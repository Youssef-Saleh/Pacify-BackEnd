const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

/**
 * Login request
 * @module getGenreRoutes
 */

const getGenreRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    /**
    * @name get/genre/:genreid top poular playlists in a genre
    * @description The choosen genre will get all its top playlists
    * @param {string} GenreId The choosen genre's id which is given in /browse 
    * @inner
    * @param {object} req requesting the needed info 
    * @param {object} res it shows all the Song that the user liked and requested for.

    * @returns {Object} Returns all its top popular playlists
    */

    app.get('/genre/:genreId', (req, res) => {
        mongoose.connection.db.collection('properties',function(err, collection){
            collection.find({_id:new ObjectId(req.params.genreId)}).toArray(function(err,docs){
                if (err) {
                    throw err;

                }
                genreName = docs[0].name;
                mongoose.connection.db.collection('playlists',function(err, playlistModel){
                    playlistModel.find({genre: genreName}).toArray(function(err, result){
                        response = {
                            title:"popular playlists",
                            playlists : result
                        }
                        res.json(response)
                    });
                });
            });
        });
    });
}

module.exports = getGenreRoutes;