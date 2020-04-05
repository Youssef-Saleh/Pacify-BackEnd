const express = require('express'); 
const app = express();
const fs = require('fs');
const https = require('https');
const nodemailer = require('nodemailer');

//routing directories
const signup = require ('./routing/signup');
const accOverview = require ('./routing/accoverview');
const login = require ('./routing/login');
const passwordReset = require ('./routing/passwordReset');
const firstTime = require ('./routing/firstTime');


const directoryToServe = 'templates';
const path = require('path');
const port = 3443;


//https config
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'))
}

app.use(express.static(directoryToServe));
app.use([express.urlencoded({extended: true}), express.json() ]); //to deal with post requests

app.use('/signup', signup);  //calling the routing of the signup

app.use('/select', firstTime); //routing for first time preferences

app.use('/account', accOverview); //calling the account overview routing

app.use('/login', login); //calling the login routing

app.use('/password-reset', passwordReset); //calling the reset password routing





///creating https server
https.createServer(httpsOptions, app)
.listen(port, () => {
  console.log("Server is running on port "+ port);
})
///

app.listen(3000);
module.exports = app;