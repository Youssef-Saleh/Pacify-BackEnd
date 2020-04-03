const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json')

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');

const auth = require('../middlewares/token_auth');
const premiumCheck = require('../middlewares/premium_auth');


const loginRoutes = (app, fs) => {

    app.get('/home', auth, premiumCheck,(req, res) => {
      fs.readFile('./templates/login.html', null, (err, data) => {
        if(err){
          res.sendStatus(404);
        } else {
          res.write('welcome');
        }
      });
    });

    app.get('/login', (req, res) => {
        fs.readFile('./templates/login.html', null, (err, data) => {
          if(err){
            res.sendStatus(404);
          } else {
            res.write(data);
          }
        });
    });
      
    app.post('/login', (req, res) => {
      
        var userCredintials;
        var token;
        var enteredData = req.body;
      
        mongoose.connection.db.collection('users', function (err, collection) {
          collection.find({'email' : enteredData.email, 'password' : enteredData.password})
          .toArray((err, docs) => {
            if(docs.length == 0){
              fs.readFile('./templates/error_login.html', null, (err, data) => {
                if(err){
                  res.sendStatus(404);
                } else {
                  res.write(data);
                }
              });
            } else {
              console.log(authVar.KEY)
              token = jwt.sign({_id : docs[0]._id}, authVar.KEY, { expiresIn: '2h' }, (err, token) => {
                console.log(token);
              });
            }
          });
        });
    });
  }

module.exports = loginRoutes;