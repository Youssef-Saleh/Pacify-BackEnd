const express = require('express');
const controller= require('../controller/deleteSongController');


const deleteSongRoutes = (app, fs) => {
    
    app.put('/deleteSong',(req, res, next) => {controller.deleteSong(req, res, next)})
};
module.exports = deleteSongRoutes;