const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const getGenreRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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