const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = (req, res, next) => {
    mongoose.connection.db.collection('Eventlog', function (err, collection) {
        var nEvent = new Eventlog ({
            type: req.eventType,
            time: Date.now(),
        });

        nEvent.save(function(err, result) {
            if (err) {
              throw err;
            }
        });

        next();
    });
};