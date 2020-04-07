const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
//const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json')

var ObjectId = require('mongoose').Types.ObjectId; 




const mongoosePort = require('../env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

const auth = require('../middlewares/token_auth');
const premiumCheck = require('../middlewares/premium_auth');


const loginRoutes = (app, fs) => {
  app.use(express.static('./static'))

  app.get('/home', auth, premiumCheck,(req, res) => {
    fs.readFile('./templates/login.html', null, (err, data) => {
      if(err){
        res.sendStatus(404);
      } else {
        res.write('welcome');
      }
    });
  });
    
  app.post('/login', (req, res) => {
      var token;
      var enteredData = req.body;
      console.log(req.body)
    
      mongoose.connection.db.collection('users', function (err, collection) {
        collection.find({'email' : enteredData.email, 'password' : enteredData.password})
        .toArray((err, docs) => {
          if(docs.length == 0){
              if(err){
                res.sendStatus(404);
              }
              
          } else {
            jwt.sign({_id : docs[0]._id}, authVar.KEY, { expiresIn: '2h' }, (err, token) => {
              console.log(token)
              res.json(token)
            });
          }
        });
      });
  });
}

module.exports = loginRoutes;