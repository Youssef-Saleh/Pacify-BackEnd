var MongoClient = require('mongodb').MongoClient;
var url = require('../../env_variables/env_vars.json').mongoosePort;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});