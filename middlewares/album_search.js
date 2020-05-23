const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (req, res, next) => {
    mongoose.connection.db.collection('albums', function (err, collection) {
        collection.createIndex({ name : "text" }, function(err, data) {
            collection.find({ $text: { $search: req.params.text } })//, { score: { $meta: "textScore" } })
            //.sort( { score: { $meta: "textScore" } } )
            .toArray((err, docs) => {
                req.result.albums = docs
                next();
            });
        });
    });
}