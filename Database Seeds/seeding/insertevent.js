var Eventlog = require ('../models/eventlog');
var mongoose = require ('mongoose');

var url = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(url);

var events = [
    new Eventlog({
        type: "follow",
        timeStamp: "October 13, 2014 11:13:00"
    }),
    new Eventlog({
        type: "song release",
        timeStamp: "October 13, 2020 12:15:00"
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