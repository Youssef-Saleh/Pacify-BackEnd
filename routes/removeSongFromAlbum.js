const express = require('express');
const controller= require('../controller/removeSongFromAlbumController');

const removeSongFromAlbumRoutes = (app, fs) => {
    app.put('/removeSongFromAlbum', (req, res) =>{controller.removeSongFromAlbum(req, res)})
};
module.exports = removeSongFromAlbumRoutes;
