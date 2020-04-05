var Album = require ('../models/album');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');


var albums = [
    new Album({
        imagePath: "https://i1.sndcdn.com/artworks-000162189360-qfth66-t500x500.jpg",
        name: "Allem alby",
        year: 2003,
    }),
    new Album({
        imagePath: "https://s.mxmcdn.net/images-storage/albums5/4/5/3/3/8/3/42383354_500_500.jpg",
        name: "Kol yom men dah",
        year: 2019,
    })
];

var counter = 0;
for (var i = 0; i < albums.length; i++) {
    albums[i].save(function(err, result) {
        counter++;
        if (counter === albums.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}