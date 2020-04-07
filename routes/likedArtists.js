
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');

const likedArtistsRoutes = (app, fs) => {
    // showing the liked Artists
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/likedArtists', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
             collection.find({_id:new ObjectId(req.userId)}).toArray(function(err,docs){

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
    app.put('/likedArtists', auth, (req, res, next) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.userId)},
                {$push:{ likedArtists :req.body.artistId}}
            );
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.artistId)},
                {$push:{ followers :req.userId}}
            );
        });
        res.end();
      });
    // unliking an album
    app.put('/unlikeArtists', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.userId)}, {likedArtists:req.body.artistId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].likedArtists
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.userId)},
                        {$pull:{ likedArtists :req.body.artistId}}
                    )
                  
                }
            });
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.artistId)}, {followers:req.userId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].followers
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.artistId)},
                        {$pull:{ followers :req.userId}}
                    )
                  
                }
            });
        });
           res.end();
    });
};

module.exports = likedArtistsRoutes;