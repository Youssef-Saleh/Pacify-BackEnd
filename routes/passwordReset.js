const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');
//const User = require ('../Database Seeds/models/user');
const tokenhandler = require ('../controller/auth');
const controller = require ('../controller/passwordReset');


const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);



const passwordRoutes = (app, fs, User) => {
  app.post ('/password-reset' , controller.resetPass);  // calling the controller function

  app.get('/password-reset/change', tokenhandler.verifyToken, (req, res) => {controller.loadingChangePage(req, res, User)});
  
  app.put('/password-reset/change', tokenhandler.verifyToken, (req, res) => {controller.changePassword(req, res, User)});
}

module.exports = passwordRoutes;
