var User = require ('../models/user');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var users = [
    //////////////////////////////////////////////////
    ///Artists
    new User({
        email: "editingmaster@artist.pacify",
        activated : true,
        password: "Dehkmodhek2",
        nickname: "Editingmaster",
        type: "Artist",
        gender: "Male",
        phone: "unknown",
    }),
    new User({
        email: "lolichan@artist.pacify",
        activated : true,
        password: "Dehkmodhek2",
        nickname: "Shaloos",
        type: "Artist",
        gender: "Male",
        phone: "unknown",
    }),
    new User({
        email: "abdobeatz@artist.pacify",
        activated : true,
        password: "Dehkmodhek2",
        nickname: "Abdobeatz",
        type: "Artist",
        gender: "Male",
        phone: "unknown",
    }),
    new User({
        email: "Bensound@artist.pacify",
        password: "null",
        nickname: "Bensound",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "BizBazStudio@artist.pacify",
        password: "null",
        nickname: "BizBazStudio",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "CheeseCakeDude@artist.pacify",
        password: "null",
        nickname: "CheeseCakeDude",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "Density&Time@artist.pacify",
        password: "null",
        nickname: "Density&Time",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "DiamondOrtiz@artist.pacify",
        password: "null",
        nickname: "DiamondOrtiz",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "EdiVilla@artist.pacify",
        password: "null",
        nickname: "EdiVilla",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "JinglePunks@artist.pacify",
        password: "null",
        nickname: "JinglePunks",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "Network415@artist.pacify",
        password: "null",
        nickname: "Network415",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "OtisMcDonald@artist.pacify",
        password: "null",
        nickname: "OtisMcDonald",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "Ramzoid@artist.pacify",
        password: "null",
        nickname: "Ramzoid",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "Riot@artist.pacify",
        password: "null",
        nickname: "Riot",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "SilentPartner@artist.pacify",
        password: "null",
        nickname: "SilentPartner",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),new User({
        email: "SpazzCardigan@artist.pacify",
        password: "null",
        nickname: "SpazzCardigan",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "The126ers@artist.pacify",
        password: "null",
        nickname: "The126ers",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "Tubebackr@artist.pacify",
        password: "null",
        nickname: "Tubebackr",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "VibeTracks@artist.pacify",
        password: "null",
        nickname: "VibeTracks",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),
    new User({
        email: "ds3@artist.pacify",
        password: "null",
        nickname: "FromSoftware-Darksouls3",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
    }),

    /////////////////////////////////////////////////
    ///users

    new User({
        email: "goto@admin.com",
        password: "abcde12345",
        nickname: "Fourth user",
        type: "Free",
        gender: "Male",
        birthdate: "October 13, 2019",
        phone: "01111545885",
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