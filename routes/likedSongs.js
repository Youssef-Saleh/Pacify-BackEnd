
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');
const premiumCheck = require('../middlewares/premium_auth');

const likedSongsRoutes = (app, fs) => {
    // showing the liked Songs
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/likedSongs', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
             collection.find({_id:new ObjectId(req.body.userId)}).toArray(function(err,docs){

                if (err) {
                    throw err;

                }

                arr = []

                for (var i = 0; i < docs[0].likedSongs.length; i++) {
                    arr.push(new ObjectId(docs[0].likedSongs[i]))
                }

                mongoose.connection.db.collection('songs',function(err, collection2){
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
    app.put('/likedSongs', (req, res, next) => {
        var query;
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.userId)},
                {$push:{ likedSongs :req.body.songId}}
            );
        });
        mongoose.connection.db.collection('songs',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.songId)},
                {$push:{ userId :req.body.userId}}
            );
        });
        res.end();
      });
    // unliking an album
    app.put('/unlikeSongs', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.userId)}, {likedSongs:req.body.songId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].likedSongs
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.userId)},
                        {$pull:{ likedSongs :req.body.songId}}
                    )
                  
                }
            });
        mongoose.connection.db.collection('songs',function(err, collection){
            collection.find({_id:new ObjectId (req.body.songId)}, {userId:req.body.userId}).toArray(function(err,docs){
                if (err) {
                    throw err;
                }
                var arr = docs[0].userId
                if (arr.length == 0) {
                    throw err
                }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.songId)},
                        {$pull:{ userId :req.body.userId}}
                    )
                    
                }
            });
        });
        });
           res.end();
    });
};

module.exports = likedSongsRoutes;