var Playlist = require ('../models/playlist');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var playlists = [

    // Genre-Based
    new Playlist({
        name: "Arabic",
        type: "genreBased"
    }),
    new Playlist({
        name: "Blues",
        type: "genreBased"
    }),
    new Playlist({
        name: "Chill",
        type: "genreBased"
    }),
    new Playlist({
        name: "Classical",
        type: "genreBased"
    }),
    new Playlist({
        name: "Country",
        type: "genreBased"
    }),
    new Playlist({
        name: "Electronic",
        type: "genreBased"
    }),
    new Playlist({
        name: "Gaming",
        type: "genreBased"
    }),
    new Playlist({
        name: "HipHop",
        type: "genreBased"
    }),
    new Playlist({
        name: "Jazz",
        type: "genreBased"
    }),
    new Playlist({
        name: "Kids",
        type: "genreBased"
    }),
    new Playlist({
        name: "Pop",
        type: "genreBased"
    }),
    new Playlist({
        name: "Punk",
        type: "genreBased"
    }),
    new Playlist({
        name: "R&B",
        type: "genreBased"
    }),
    new Playlist({
        name: "Rock",
        type: "genreBased"
    }),
    new Playlist({
        name: "Liked songs",
        type: "liked"
    }),
    new Playlist({
        name: "Rock",
        type: "Library"

    }),
    new Playlist({
        name: "Travel",
        type: "genreBased"
    }),
    new Playlist({
        name: "TV&Movies",
        type: "genreBased"
    }),

    //Mood-Based
    new Playlist({
        name: "Angry",
        type: "moodBased"
    }),
    new Playlist({
        name: "Bright",
        type: "moodBased"
    }),
    new Playlist({
        name: "Calm",
        type: "moodBased"
    }),
    new Playlist({
        name: "Dark",
        type: "moodBased"
    }),
    new Playlist({
        name: "Dramatic",
        type: "moodBased"
    }),
    new Playlist({
        name: "Funky",
        type: "moodBased"
    }),
    new Playlist({
        name: "Happy",
        type: "moodBased"
    }),
    new Playlist({
        name: "Inspirational",
        type: "moodBased"
    }),
    new Playlist({
        name: "Romantic",
        type: "moodBased"
    }),
    new Playlist({
        name: "Sad",
        type: "moodBased"
    }),

    // Region Based
    new Playlist({
        name: "Top in Egypt",
        type: "region"
    }),
    new Playlist({
        name: "Top in Lebanon",
        type: "region"
    }),

    // Trending
    new Playlist({
        name: "Trending",
        type: "trending"
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