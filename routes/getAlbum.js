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
var Album = require('../Database Seeds/models/album');

const getAlbumRoutes = (app, fs) => {
    // showing the liked albums
    app.get('/album/:albumId', (req, res) => {
        mongoose.connection.db.collection('albums',function(err, collection){
             collection.find({_id:new ObjectId(req.params.albumId)}).toArray(function(err,docs){
                    if (err) {
                        throw err;

                    }
                    res.send(docs[0]);
                });
        });
    });
}

module.exports = getAlbumRoutes;