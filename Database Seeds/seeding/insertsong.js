var Song = require ('../models/song');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var songs = [
    new Song({
        Name: "Ana Ayesh",
        year: 2003,
        userId:[],
        rateCount: 0,
        rating: 0
    }),
    new Song({
        Name: "Mel bedaya",
        year: 2019,
        userId:[],
        rateCount: 0,
        rating: 0
    })
];

var counter = 0;
for (var i = 0; i < songs.length; i++) {
    songs[i].save(function(err, result) {
        counter++;
        if (counter === songs.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}