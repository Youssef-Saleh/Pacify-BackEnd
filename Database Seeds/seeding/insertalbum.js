var Album = require ('../models/album');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/testpacify');


var albums = [
    new Album({
        imagePath: "https://i1.sndcdn.com/artworks-000162189360-qfth66-t500x500.jpg",
        Name: "Allem alby",
        year: 2003,
        userid:[1]
    }),
    new Album({
        imagePath: "https://s.mxmcdn.net/images-storage/albums5/4/5/3/3/8/3/42383354_500_500.jpg",
        Name: "Kol yom men dah",
        year: 2019,
        userid:[1]
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