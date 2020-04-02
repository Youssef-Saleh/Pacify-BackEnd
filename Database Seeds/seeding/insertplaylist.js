var Playlist = require ('../models/playlist');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var playlists = [
    new Playlist({
        name: "Liked songs",
        type: "liked"
    }),
    new Playlist({
        name: "Rock",
        type: "Library"
    })
];

var counter = 0;
for (var i = 0; i < playlists.length; i++) {
    playlists[i].save(function(err, result) {
        counter++;
        if (counter === playlists.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}