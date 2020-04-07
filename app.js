const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const https = require('https');
const mongoose = require ('mongoose');
const cors = require('cors')


var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
app.use('/audio',express.static('../Songs/Songs'))

const mongoosePort = require('./env_variables/env_vars.json').mongoosePort
mongoose.connect(mongoosePort);

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);


const directoryToServe = 'templates';
const path = require('path');


//https config
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem'))
}

app.use(express.static(directoryToServe));
app.use([express.urlencoded({extended: true}), express.json() ]); //to deal with post requests


https.createServer(httpsOptions, app)

app.listen(5000, () => {
  console.log('Server started on port 5000')
});

module.exports = app;
