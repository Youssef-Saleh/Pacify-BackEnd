const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('../middlewares/token_auth');

/**
 * get all the uploaded songs of an artist request
 * @module getSongUploadsRoutes
 */
const getSongUploadsRoutes= (app, fs) => {
    // showing the uploaded songs
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    /**
   * This function gets all the uploaded songs that the user requested for.
   * @name get/getSongUploads
   * @function
   * @memberof module:getSongUploadsRoutes
   * @inner
   * @param {*} req requesting the needed info from postman as the following:
   * @param {*} _id the id of the user (artist) that uploaded the song
   * @param {Array} res it shows all the uploaded songs of an artist that the user requested.
   */

    app.get('/getSongUploads', auth, (req, res) => {
        mongoose.connection.db.collection('users',function(err, collection){
            if (err){
                throw err;
            }
             collection.find({_id:new ObjectId(req.userId)}, {type: "Artist"}).toArray(function(err,docs){

                if (err){
                    throw err;

                }

                arr = []


                arr=docs[0].uploadedSongs
                mongoose.connection.db.collection('songs',function(err, collection2){
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
module.exports = getSongUploadsRoutes;