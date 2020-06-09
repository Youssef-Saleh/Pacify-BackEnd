const express = require('express');
const controller= require('../controller/addSongsToAlbumController');


const addSongsToAlbumRoutes = (app, fs) => {
    app.put('/addSongsToAlbum', (req, res, next) => {controller.addSongsToAlbum(req, res, next)})
};

module.exports = addSongsToAlbumRoutes;