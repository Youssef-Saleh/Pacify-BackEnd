var Playlist = require ('../models/playlist');
var mongoose = require ('mongoose');

var url = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(url);

var playlists = [

    // Genre-Based
    new Playlist({
        name: "1st playlist",
        genre: "Arabic",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "nice playlist",
        genre: "Arabic",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "great playlist",
        genre: "Arabic",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "great time",
        genre: "Blues",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "blues classics",
        genre: "Blues",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "ahead of its time",
        genre: "Blues",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist1",
        genre: "Blues",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist2",
        genre: "Chill",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist3",
        genre: "Classical",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist4",
        genre: "Country",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist5",
        genre: "Electronic",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist6",
        genre: "Gaming",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist7",
        genre: "HipHop",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist8",
        genre: "Jazz",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist9",
        genre: "Kids",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist10",
        genre: "Pop",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist11",
        genre: "Punk",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist12",
        genre: "R_B",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist13",
        genre: "Rock",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist14",
        genre: "Liked songs",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "liked"
    }),
    new Playlist({
        name: "playlist15",
        genre: "Rock",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "Library"
    }),
    new Playlist({
        name: "playlist16",
        genre: "Travel",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    new Playlist({
        name: "playlist17",
        genre: "TV_Movies",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "genreBased"
    }),
    
    //Mood-Based
    new Playlist({
        name: "playlist18",
        genre: "Angry",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist19",
        genre: "Bright",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist20",
        genre: "Calm",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist21",
        genre: "Dark",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist22",
        genre: "Dramatic",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist23",
        genre: "Funky",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist24",
        genre: "Happy",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist25",
        genre: "Inspirational",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist26",
        genre: "Romantic",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    new Playlist({
        name: "playlist27",
        genre: "Sad",
        url : "https://withweddings.com/wp-content/uploads/2019/05/1280x960_90129B00-OJTUC.jpg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "moodBased"
    }),
    
    // Region Based
    new Playlist({
        name: "Top in Egypt",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "region"
    }),
    new Playlist({
        name: "Top in Lebanon",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "region"
    }),
    
    // Trending
    new Playlist({
        name: "Trending",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "trending"
    }),

    // Random
    new Playlist({
        name: "Random Playlist",
        url : "https://travel.home.sndimg.com/content/dam/images/travel/stock/2017/3/24/0/Shutterstock_393700531_BeachPlaylistGraphic.jpg.rend.hgtvcom.616.462.suffix/1491594774042.jpeg",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        description: "description for the playlist",
        type: "random"
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