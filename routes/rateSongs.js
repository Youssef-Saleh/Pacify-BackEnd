
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
const rateSongs = require('../Database Seeds/models/song');





const rateSongsRoutes = (app, fs) => {

    app.put('/rateSongs', (req, res) => {
        mongoose.connection.db.collection('songs', function(err, collection){
            collection.find({_id : new ObjectId (req.body.songId)})
            .toArray((err, docs) => {
                rateCount = docs[0].rateCount;
                if(rateCount == 0){
                    var avg = JSON.parse(req.body.rating);
                    collection.updateOne(
                        {_id: new ObjectId(req.body.songId)},
                        {$set:{rateCount : 1, rating : avg}},
                    );
                }else {
                    rating = docs[0].rating * rateCount;
                    rateCount++;
                    var newRating = JSON.parse(req.body.rating) + rating;
                    var avg = newRating/rateCount
                    collection.updateMany(
                        {_id: new ObjectId(req.body.songId)},
                        {$inc:{rateCount : 1}, $set:{rating : avg}},
      
                    );
                }
      
            });
        });
        res.end();
    });
};

module.exports = rateSongsRoutes;