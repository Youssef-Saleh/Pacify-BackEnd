const tokenhandler = require ('../controller/auth');
const controller = require ('../controller/account');
const mongoose = require ('mongoose');

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);




const accountRoutes = (app, fs, User) => {
    app.get('/account/overview', tokenhandler.verifyToken, (req, res) => {controller.retrieveOverview(req, res, User)});

    app.get('/account/profile', tokenhandler.verifyToken, (req, res) => {controller.retrieveProfile(req, res, User)});

    app.put('/account/profile', tokenhandler.verifyToken, (req, res) => {controller.updateProfile(req, res, User)});

}

module.exports = accountRoutes;

