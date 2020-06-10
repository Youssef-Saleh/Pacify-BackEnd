const mongoose = require ('mongoose');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (req, res, next) => {
  mongoose.connection.db.collection('users', function (err, collection) {
      collection.find({'_id': new ObjectId(req.userId)})
      .toArray((err, docs) => {
        if(docs[0].type == 'Artist'){
          next();
        } else {
          res.sendStatus(401)
        }
      });
  });     
}
