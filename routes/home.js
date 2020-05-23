const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');


const homeRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/home', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId(req.userId)}).toArray(function(err,docs){

                if (err) {
                    throw err;
                }

                RecentlyPlayed = []
                popularPlaylists = []
                popularAlbums = []


                mongoose.connection.db.collection('playlists',function(err, playlistModel){
                    playlistModel.find({genre: "Arabic"}).toArray(function(err,recResult){

                        for (var i = 0; i < recResult.length; i++) {
                            RecentlyPlayed.push(recResult[i])
                        }

                        playlistModel.find({genre: "Blues"}).toArray(function(err,popResult){

                            for (var i = 0; i < popResult.length; i++) {
                                popularPlaylists.push(popResult[i])
                            }
                            
                            mongoose.connection.db.collection('albums',function(err, albumModel){
                                albumModel.find({artist : "amr diab"}).toArray(function(err,popAlbums){
                                   
                                    console.log(popAlbums)
                                    for (var i = 0; i < popAlbums[i].length; i++) {
                                        popularAlbums.push(popAlbums[i])
                                    }

                                    out = [{
                                        "title" : "Recently Played",
                                        'data' : RecentlyPlayed,
                                    },

                                    {
                                        "title" : "Popular Playlists",
                                        'data' : popularPlaylists,
                                    },
                                    
                                    {
                                        "title" : "Popular Albums",
                                        'data' : popAlbums,
                                    }]
                                    res.send(out);
                                })
                            })
                        })
                    })
                });
            });
        });
    });
};

module.exports = homeRoutes;