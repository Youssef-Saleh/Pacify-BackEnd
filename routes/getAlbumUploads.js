const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');

const getAlbumUploadsRoutes= (app, fs) => {
    // showing the uploaded albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/getAlbumUploads', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            if (err){
                throw err;
            }
             collection.find({_id:new ObjectId(req.userId)}, {type: "Artist"}).toArray(function(err,docs){

                if (err){
                    throw err;

                }

                arr = []

                arr=docs[0].uploadedAlbums
                mongoose.connection.db.collection('albums',function(err, collection2){
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
};
module.exports = getAlbumUploadsRoutes;