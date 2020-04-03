const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');

const getArtist = require('../middlewares/artist_search');
const getSong = require('../middlewares/song_search');
const getAlbum = require('../middlewares/album_search');

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');


const browseRoutes = (app, fs) => {

    app.get('/browse/:text', getArtist, getSong, getAlbum, (req, res) => {   
        res.send(req.result);
    });

    
}
module.exports = browseRoutes;