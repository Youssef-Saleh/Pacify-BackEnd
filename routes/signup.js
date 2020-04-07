const controller = require ('../controller/signup');
const tokenhandler = require ('../controller/auth');
const mongoose = require ('mongoose');

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const signupRoutes = (app, fs, User) => {

  app.post ('/signup' , (req, res) => {controller.insertuser(req, res, User)});  // calling the controller function

  app.get ('/emailconfirmation', tokenhandler.verifyToken, (req, res) => {controller.emailVerify(req, res, User)}); // calling the confirmation function
}

module.exports = signupRoutes;