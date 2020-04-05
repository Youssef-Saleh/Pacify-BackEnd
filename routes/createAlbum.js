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

const createAlbumRoutes = (app, fs) => {
    app.post('/createAlbum', (req, res, next)=>{

        mongoose.connection.db.collection('users', function(err, collection2){
            if (err){ 
                throw err;
            }
            collection2.find({_id:new ObjectId(req.body.userId)}, {type:"Artist"}).toArray( function(err,docs) {

                if (err){
                    throw err
                }else{
                    mongoose.connection.db.collection('albums', function(err, collection){
                        if(err){
                            throw err;
                        }
                        
                        var nAlbum = new Album ({
                            imagePath: req.body.imagePath,
                            name: req.body.name,
                            year: req.body.year,
                        });

                        nAlbum.save(function(err, result) {
                            if (err) {
                              throw err;
                            }
                        });
                    });
                }
                collection2.updateOne(
                    {_id: new ObjectId(req.body.userId)},
                    {$push:{ uploadedAlbums :req.body.name}}
                );
            });
        });
        res.send('new album created!')
    });
};
module.exports = createAlbumRoutes;