
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');

const likedAlbumsRoutes = (app, fs) => {
    // showing the liked albums
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/likedAlbums', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
             collection.find({_id:new ObjectId(req.userId)}).toArray(function(err,docs){

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
    app.put('/likedAlbums', auth, (req, res, next) => {
        var query;
        mongoose.connection.db.collection('albums',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.body.albumId)},
                {$push:{ userId :req.userId}}
            );
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.updateOne(
                {_id: new ObjectId(req.userId)},
                {$push:{ likedAlbums :req.body.albumId}}
            );
        });
        res.end();
      });
    // unliking an album
    app.put('/unlikeAlbums', auth, (req, res) => {
        mongoose.connection.db.collection('albums',function(err, collection){
            collection.find({_id:new ObjectId (req.body.albumId)}, {userId:req.userId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].userId
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.body.albumId)},
                        {$pull:{ userId :req.userId}}
                    )
                  
                }
            });
        });
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.userId)}, {likedAlbums:req.body.albumId}).toArray(function(err,docs){
               if (err) {
                   throw err;
               }
               var arr = docs[0].likedAlbums
               if (arr.length == 0) {
                   throw err
               }else{
                    collection.updateOne(
                        {_id: new ObjectId(req.userId)},
                        {$pull:{ likedAlbums :req.body.albumId}}
                    )
                  
                }
            });
        });
           res.end();
    });
};

module.exports = likedAlbumsRoutes;