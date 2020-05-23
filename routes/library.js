const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');

/**
 * Login request
 * @module libraryRoutes
*/

const libraryRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    /**
    * @name get/library the user's library
    * @description returns all the user's liked/created playlists 
    * @inner
    * @param {object} req requesting the needed info 
    * @param {object} res it shows all the Song that the user liked and requested for.

    * @returns {Object} Results all the user's liked/created playlists
    */

    app.get('/library', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId(req.userId)}).toArray(function(err,docs){

                if (err) {
                    throw err;
                }

                liked = []
                created = []

                for (var i = 0; i < docs[0].likedPlaylists.length; i++) {
                    liked.push(new ObjectId(docs[0].likedPlaylists[i]))
                }

                mongoose.connection.db.collection('playlists',function(err, playlistModel){
                    playlistModel.find({creator: new ObjectId(req.userId)}).toArray(function(err,result){

                        for (var i = 0; i < result.length; i++) {
                            created.push(new ObjectId(result[i]._id))
                        }
                
                        if (err) {
                            throw err;
                        }
                        playlistModel.find({_id : {$in:liked}}).toArray((err, likedArr) => {
                            playlistModel.find({_id : {$in:created}}).toArray((err, createdArr) => {

                                out = {
                                    'likedPlaylists' : likedArr,
                                    'createdPlaylists' : createdArr,
                                }
                                res.send(out);
                            })
                        })
                    })
                });
            });
        });
    });
};

module.exports = libraryRoutes;