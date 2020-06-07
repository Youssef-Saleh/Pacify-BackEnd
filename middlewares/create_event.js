const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');

var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = async (eventType, eventPerformer, eventAffected, eventObject = null) => {
    mongoose.connection.db.collection('Eventlog', function (err, collection) {
        var nEvent = new Eventlog ({
            Performer: eventPerformer,
            Affected: eventAffected,
            Object: eventObject,
            Type: eventType,
        });

        nEvent.save(function(err, result) {
            if (err) {
              throw err;
            }
        });
    });
};