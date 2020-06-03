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


/**
 * addSongsToAlbum request
 * @module deleteAlbumRoutes 
 */
const deleteAlbumRoutes = (app, fs) => {
    /**
    * This function would request info of the user ID and requirs that he is an artist. it will also request the song name and the song ID.
    * It searches the collection of users and songs and finds the particular song that the artist wants to delete. 
    *  It would delete this song and update the info of the artist and the collection of songs.
    * @name put/deleteAlbum
    * @function
    * @memberof module:deleteAlbumRoutes
    * @param {*} req requesting the needed info from postman as the following:
    * @param {*} artistId the ID of the artist in mongoBD that wants to delete a certain song from an album as requested by postman
    * @param {*} songId the ID of the song in mongoDB that will be deleted
    * @param {string} songName the name of the songs that would be deleted
    * @param {string} res a message notifying the artist that the Album has been deleted.
    */
   app.put('/deleteAlbum', (req, res, next)=>{
       mongoose.connection.db.collection('users', function(err, collection){
           if (err){
               throw err;
           }
           collection.find({type:"Artist"},{_id:new ObjectId(req.body.artistId)}).toArray( function(err,docs) {
               if (err){
                   throw err
               }
               collection.updateOne(
                   {_id: new ObjectId(req.body.artistId)},
                   {$pull:{ uploadedAlbums :req.body.albumName}},
               )
               collection.updateOne(
                    {_id: new ObjectId(req.body.artistId)},
                    {$pull:{ likedAlbums :req.body.albumName}}
                )
               mongoose.connection.db.collection('albums', function(err, collection2){
                    if(err){
                        res.send('No Album Found..');
                    }
                    collection2.find({_id:new ObjectId(req.body.albumtId)}, {name: req.body.albumName}).toArray( function(err,docs) {
                        if (err){
                            throw err
                        }
                        collection2.deleteOne(
                            {_id: new ObjectId(req.body.albumId)},
                            { name :req.body.albumName}
                        )
                    
                    });
                });
            });
        });
       res.send('Album deleted successfully');
    });
};
module.exports = deleteAlbumRoutes;