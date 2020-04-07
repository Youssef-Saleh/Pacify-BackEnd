const tokenhandler = require ('../controller/auth');
const mongoose = require ('mongoose');
const controller = require ('../controller/firstTime');


const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);


const firstRoutes = (app, fs, User, Property) => {
      app.get('/select/genres', tokenhandler.verifyToken, (req, res) => {controller.retreieveGenres(req, res, User, Property)});

      app.put('/select/genres', tokenhandler.verifyToken, (req, res) => {controller.chooseGenres(req, res, User, Property)});

      app.get('/select/artists', tokenhandler.verifyToken, (req, res) => {controller.retreiveArtists(req, res, User)});

      app.put('/select/artists', tokenhandler.verifyToken, (req, res) => {controller.selectArtists(req, res, User)});
}

module.exports = firstRoutes;

