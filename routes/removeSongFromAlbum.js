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
 * @module removeSongFromAlbumRoutes 
 */
const removeSongFromAlbumRoutes = (app, fs) => {
       /**
     * This function would request info of the user ID and requirs that he is an artist. it will also request the song name and the album ID.
     * It searches the collection of users and finds the particular artist that wants to remove the song. 
     * Then it finds the particualr album that the artist want to remove the song from it.
     * It would remove this song and update the info of the artist.
     * @name put/removeSongFromAlbum
     * @function
     * @memberof module:removeSongFromAlbumRoutes
     * @param {*} req requesting the needed info from postman as the following:
     * @param {*} artistId the ID of the artist in mongoBD that wants to remove a certain song from an album as requested by postman
     * @param {*} albumId the ID of the album in mongoDB that has this song
     * @param {string} songName the name of the song that would be removed
     * @param {string} res a message notifying the artist that the song has been removed.
     */
    app.put('/removeSongFromAlbum', (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            collection.find({_id:new ObjectId (req.body.artistId)}, {type:"Artist"}).toArray(function(err,docs){
                var arr = docs[0].uploadedAlbums
                if (arr.length == 0) {
                    throw err
                }
                mongoose.connection.db.collection('albums', function(err, collection2){
                    if(err){
                        throw err;
                    }
                    collection2.updateOne(
                        {_id: new ObjectId(req.body.albumId)},
                        {$pull:{ songs :req.body.songName}}
                    )
                });
            });
        });
           res.send('song removed successfully from the album');
    });
};
module.exports = removeSongFromAlbumRoutes;
