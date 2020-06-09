const express = require('express');
const controller= require('../controller/getSongsByGenreController');

const getSongByGenreRoutes = (app, fs) => {
    app.get('/getSongByGenre',(req, res) => {controller.getSongsByGenre(req, res)})
}

module.exports = getSongByGenreRoutes;