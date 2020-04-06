
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const express = require('express');
const bodyParser = require('body-parser');


const rateSongsRoutes = (app, fs) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

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