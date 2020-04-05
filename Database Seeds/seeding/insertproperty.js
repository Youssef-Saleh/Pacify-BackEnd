var Property = require ('../models/property');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var properties = [
    //////////////////////////////////////////////////
    ///genres

    new Property({
        name: "Arabic",
        type: "Genre"

    }),
    new Property({
        name: "Blues",
        type: "Genre"
    }),
    new Property({
        name: "Chill",
        type: "Genre"

    }),
    new Property({
        name: "Classical",
        type: "Genre"
    }),
    new Property({
        name: "Country",
        type: "Genre"

    }),
    new Property({
        name: "Electronic",
        type: "Genre"
    }),
    new Property({
        name: "Gaming",
        type: "Genre"

    }),
    new Property({
        name: "HipHop",
        type: "Genre"
    }),
    new Property({
        name: "Jazz",
        type: "Genre"

    }),
    new Property({
        name: "Kids",
        type: "Genre"
    }),
    new Property({
        name: "Pop",
        type: "Genre"

    }),
    new Property({
        name: "Punk",
        type: "Genre"
    }),
    new Property({
        name: "R&B",
        type: "Genre"

    }),
    new Property({
        name: "Rock",
        type: "Genre"
    }),
    new Property({
        name: "Travel",
        type: "Genre"

    }),
    new Property({
        name: "TV&Movies",
        type: "Genre"
    }),

    //////////////////////////////////////////////////
    ///moods

    new Property({
        name: "Angry",
        type: "mood"

    }),
    new Property({
        name: "Bright",
        type: "mood"
    }),
    new Property({
        name: "Calm",
        type: "mood"

    }),
    new Property({
        name: "Dark",
        type: "mood"
    }),
    new Property({
        name: "Dramatic",
        type: "mood"

    }),
    new Property({
        name: "Funky",
        type: "mood"
    }),
    new Property({
        name: "Happy",
        type: "mood"

    }),
    new Property({
        name: "Inspirational",
        type: "mood"
    }),
    new Property({
        name: "Romantic",
        type: "mood"

    }),
    new Property({
        name: "Sad",
        type: "mood"
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