const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
const mongoose = require ('mongoose');
const authVar = require('../env_variables/env_vars.json');

var ObjectId = require('mongoose').Types.ObjectId; 

app.use(express.static('./static'));
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost:27017/testpacify');


/**
 *  @module downloadApkFileRoute
 */
const downloadApkFileRoute = (app, fs, songModel, propertyModel, playlistModel) => {
  
  app.get('/download', downloadApkFile)
  

  /**
   * Dwnload APK file
   * @name downloadApkFile
   * @function
   * @memberof module:downloadApkFileRoute
   * @inner
   * @param req
   * @param res
   * @param next
  */
  function downloadApkFile(req, res, next) {
    res.download(__dirname + '/APK File/Netflix.xapk')
  }
}

module.exports = downloadApkFileRoute;