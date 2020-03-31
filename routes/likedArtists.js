
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
const likedArtists = require('../Database Seeds/models/user');





const likedArtistsRoutes = (app, fs) => {
    // showing the liked Artists
    app.get('/likedArtists', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
             collection.find({_id:new ObjectId(req.body.userId)}).toArray(function(err,docs){

                if (err) {
                    throw err;

                }

                arr = []

                for (var i = 0; i < docs[0].likedArtists.length; i++) {
                    arr.push(new ObjectId(docs[0].likedArtists[i]))
                }

                mongoose.connection.db.collection('users',function(err, collection2){
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
    app.put('/likedArtists', (req, res, next) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.userId)},
                {$push:{ likedArtists :req.body.artistId}}
            );
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.artistId)},
                {$push:{ followers :req.body.userId}}
            );
        });
        res.end();
      });
    // unliking an album
    app.put('/unlikeArtists', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.userId)}, {likedArtists:req.body.artistId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].likedArtists
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.userId)},
                        {$pull:{ likedArtists :req.body.artistId}}
                    )
                  
                }
            });
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.artistId)}, {followers:req.body.userId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].followers
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.artistId)},
                        {$pull:{ followers :req.body.userId}}
                    )
                  
                }
            });
        });
           res.end();
    });
};

module.exports = likedArtistsRoutes;