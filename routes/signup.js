const jwt = require('jsonwebtoken');
const controller = require ('../controller/signup');
const tokenhandler = require ('../controller/auth');
const mongoose = require ('mongoose');

const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const signupRoutes = (app, fs, User) => {

  app.post ('/signup' , (req, res) => {controller.insertuser(req, res, User)});  // calling the controller function

  app.get('/signup/emailconfirmation', tokenhandler.verifyToken, (req, res) => {  
      jwt.verify(req.token, 'EmailSecret', (err, authData) => {
        if(err) {
          //An error page to be rendered
          res.sendStatus(403);
        } else {
          mongoose.connection.db.collection('users', function (err, collection) {
            console.log(authData.result.email);
            collection.updateOne({email: authData.result.email}, {$set: {activated: true}})
            if(err){
                res.send(err);
            }
            else{
              res.json("Email confirmed!");
            }
          });   
        }
      })
  });
}
module.exports = signupRoutes;