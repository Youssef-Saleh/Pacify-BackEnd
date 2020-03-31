var Property = require ('../models/property');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var properties = [
    new Property({
        Name: "Arabic",
        type: "Genre"

    }),
    new Property({
        Name: "Blues",
        type: "Genre"
    }),
    new Property({
        Name: "Chill",
        type: "Genre"

    }),
    new Property({
        Name: "Classical",
        type: "Genre"
    }),
    new Property({
        Name: "Country",
        type: "Genre"

    }),
    new Property({
        Name: "Electronic",
        type: "Genre"
    }),
    new Property({
        Name: "Gaming",
        type: "Genre"

    }),
    new Property({
        Name: "HipHop",
        type: "Genre"
    }),
    new Property({
        Name: "Jazz",
        type: "Genre"

    }),
    new Property({
        Name: "Kids",
        type: "Genre"
    }),
    new Property({
        Name: "Pop",
        type: "Genre"

    }),
    new Property({
        Name: "Punk",
        type: "Genre"
    }),
    new Property({
        Name: "R&B",
        type: "Genre"

    }),
    new Property({
        Name: "Rock",
        type: "Genre"
    }),
    new Property({
        Name: "Travel",
        type: "Genre"

    }),
    new Property({
        Name: "TV&Movies",
        type: "Genre"
    }),
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