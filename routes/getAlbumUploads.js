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
const getAlbumUploads = require('../Database Seeds/models/album');
const getAlbumUploadsRoutes= (app, fs) => {
    // showing the uploaded albums
    app.get('/getAlbumUploads', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            if (err){
                throw err;
            }
             collection.find({_id:new ObjectId(req.body.userId)}, {type: "Artist"}).toArray(function(err,docs){

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