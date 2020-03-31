const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// connect to database
mongoose.connect('mongodb://localhost/pacifydb')
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// connect to routes handling file (api)
app.use(require('./api'));

// handling error
app.use((err, req, res, next) => {
  res.status(422).json({
    Failed: "Error"
  });
});

app.listen(5000, () => {
  console.log("Listening");
});

module.exports = app; // for testing
