var Eventlog = require ('../models/eventlog');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var events = [
    new Eventlog({
        type: "follow",
        timestamp: "October 13, 2014 11:13:00"
    }),
    new Eventlog({
        type: "song release",
        timestamp: "October 13, 2020 12:15:00"
    })
];

var counter = 0;
for (var i = 0; i < events.length; i++) {
    events[i].save(function(err, result) {
        counter++;
        if (counter === events.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}