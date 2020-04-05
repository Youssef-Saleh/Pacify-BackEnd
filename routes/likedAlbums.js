
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
const Album = require('../Database Seeds/models/album');





const likedAlbumsRoutes = (app, fs) => {
    // showing the liked albums
    app.get('/likedAlbums', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
             collection.find({_id:new ObjectId(req.body.userId)}).toArray(function(err,docs){

                if (err) {
                    throw err;

                }

                arr = []

                for (var i = 0; i < docs[0].likedAlbums.length; i++) {
                    arr.push(new ObjectId(docs[0].likedAlbums[i]))
                }

                mongoose.connection.db.collection('albums',function(err, collection2){
                    collection2.find({_id:{ $in: arr}}).toArray(function(err,docs2){
       
                       if (err) {
                           throw err;
                       }
                       res.send(docs2);
                    });
                   });
             });
            });
    });
    // liking an album
    app.put('/likedAlbums', (req, res, next) => {
        var query;
        mongoose.connection.db.collection('albums',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.albumId)},
                {$push:{ userId :req.body.userId}}
            );
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.userId)},
                {$push:{ likedAlbums :req.body.albumId}}
            );
        });
        res.end();
      });
    // unliking an album
    app.put('/unlikeAlbums', (req, res) => {
        mongoose.connection.db.collection('albums',function(err, collection){
            collection.find({_id:new ObjectId (req.body.albumId)}, {userId:req.body.userId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].userId
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.albumId)},
                        {$pull:{ userId :req.body.userId}}
                    )
                  
                }
            });
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.userId)}, {likedAlbums:req.body.albumId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].likedAlbums
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.userId)},
                        {$pull:{ likedAlbums :req.body.albumId}}
                    )
                  
                }
            });
        });
           res.end();
    });
};

module.exports = likedAlbumsRoutes;