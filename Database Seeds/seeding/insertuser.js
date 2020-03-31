var User = require ('../models/user');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var users = [
    new User({
      email: "goto@admin.com",
      password: "abcde12345",
      nickname: "Fourth user",
      type: "Free",
      gender: "Male",
      birthdate: "October 13, 2019",
      phone: "01111545885",
      likedArtists:[],
      likedAlbums:[],
      likedSongs: [],
      followers:[]
    }),
    new User({
        email: "goto@admin.com",
        password: "abcde12345",
        nickname: "Fourth user",
        type: "Artist",
        gender: "Male",
        birthdate: "October 13, 2019",
        phone: "01111545885",
        likedArtists:[],
        likedAlbums:[],
        likedSongs: [],
        followers:[]
      }),
   
];

var counter = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function(err, result) {
        counter++;
        if (counter === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}