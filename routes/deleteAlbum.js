const express = require('express');
const controller= require('../controller/deleteAlbumController');

const deleteAlbumRoutes = (app, fs) => {
    
   app.put('/deleteAlbum', (req, res, next) => {controller.deleteAlbum(req, res, next)})
};
module.exports = deleteAlbumRoutes;