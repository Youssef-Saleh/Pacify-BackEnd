const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const https = require('https');
const mongoose = require ('mongoose');
const nodemailer = require('nodemailer');

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);
//const signup = require ('./routing/signup');
const accOverview = require ('./routing/accoverview');
const passwordReset = require ('./routing/passwordReset');
const firstTime = require ('./routing/firstTime');

const directoryToServe = 'templates';
const path = require('path');


//https config
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'))
}

app.use(require('./routes/api'));

app.use(express.static(directoryToServe));
app.use([express.urlencoded({extended: true}), express.json() ]); //to deal with post requests

//app.use('/signup', signup);  //calling the routing of the signup

app.use('/select', firstTime); //routing for first time preferences

app.use('/account', accOverview); //calling the account overview routing

app.use('/password-reset', passwordReset); //calling the reset password routing

https.createServer(httpsOptions, app)

app.listen(5000, () => {
  console.log('Server started on port 5000')
});

module.exports = app;
