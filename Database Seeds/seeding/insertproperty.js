var Property = require ('../models/property');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var properties = [
    new Property({
        Name: "Egypt",
        type: "Country"

    }),
    new Property({
        Name: "Pop",
        type: "Genre"
    })
];

var counter = 0;
for (var i = 0; i < properties.length; i++) {
    properties[i].save(function(err, result) {
        counter++;
        if (counter === properties.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}