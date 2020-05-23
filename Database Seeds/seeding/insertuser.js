var User = require ('../models/user');
var mongoose = require ('mongoose');

var url = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(url);

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
        img: "https://cdn4.vectorstock.com/i/1000x1000/21/58/rock-and-roll-music-print-vector-22632158.jpg"
    }),
    new User({
        email: "lolichan@artist.pacify",
        activated : true,
        password: "Dehkmodhek2",
        nickname: "Shaloos",
        type: "Artist",
        gender: "Male",
        phone: "unknown",
        img: "https://previews.123rf.com/images/paseven/paseven1711/paseven171100076/89699839-bannière-de-vecteur-ou-emblème-avec-des-mots-musique-rock-guitare-électrique-avec-des-ailes-sur-le-fond-d-.jpg"
    }),
    new User({
        email: "abdobeatz@artist.pacify",
        activated : true,
        password: "Dehkmodhek2",
        nickname: "Abdobeatz",
        type: "Artist",
        gender: "Male",
        phone: "unknown",
        img: "https://i1.sndcdn.com/avatars-000654903674-xjixte-t500x500.jpg"
    }),
    new User({
        email: "Bensound@artist.pacify",
        password: "null",
        nickname: "Bensound",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://pbs.twimg.com/profile_images/1011617157589893120/Pa8Xyu6o_400x400.jpg"
    }),
    new User({
        email: "BizBazStudio@artist.pacify",
        password: "null",
        nickname: "BizBazStudio",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.ytimg.com/vi/P4dhbmAg2UA/maxresdefault.jpg"
    }),
    new User({
        email: "CheeseCakeDude@artist.pacify",
        password: "null",
        nickname: "CheeseCakeDude",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://www.ahlanlive.com/sites/default/files/styles/landscape/public/images/2012/09/11/1058202_0.jpg?itok=cD8SSRCI"
    }),
    new User({
        email: "Density&Time@artist.pacify",
        password: "null",
        nickname: "Density&Time",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://img.discogs.com/wSBnaKMV0ECToXQPX2hfX8zbeKw=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-117584-1307972801.jpeg.jpg"
    }),
    new User({
        email: "DiamondOrtiz@artist.pacify",
        password: "null",
        nickname: "DiamondOrtiz",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://pbs.twimg.com/profile_images/1215198879349497857/ADP3_5GA_400x400.jpg"
    }),
    new User({
        email: "EdiVilla@artist.pacify",
        password: "null",
        nickname: "EdiVilla",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.ytimg.com/vi/2ByGDDnxSU4/maxresdefault.jpg"
    }),
    new User({
        email: "JinglePunks@artist.pacify",
        password: "null",
        nickname: "JinglePunks",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.vimeocdn.com/portrait/992615_640x640"
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
        img: "https://i.ytimg.com/vi/qBvMfVemGjY/maxresdefault.jpg"
    }),
    new User({
        email: "Ramzoid@artist.pacify",
        password: "null",
        nickname: "Ramzoid",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.ytimg.com/vi/mjY1RCuVt8E/maxresdefault.jpg"
    }),
    new User({
        email: "Riot@artist.pacify",
        password: "null",
        nickname: "Riot",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.ytimg.com/vi/7S9S3UbtIVM/maxresdefault.jpg"
    }),
    new User({
        email: "SilentPartner@artist.pacify",
        password: "null",
        nickname: "SilentPartner",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://lh3.googleusercontent.com/proxy/dtPsCu-tlexhsBcovZ-fz7NskQhv74zZFUQwSBgOP96nHZEh9bvLI8nRA7_h4GCvFLjEXeEnlCy9P76NLIkOf51mREh6GfgusdY"
    }),new User({
        email: "SpazzCardigan@artist.pacify",
        password: "null",
        nickname: "SpazzCardigan",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://images.genius.com/053109652159269b61a44865910443f1.400x400x1.jpg"
    }),
    new User({
        email: "The126ers@artist.pacify",
        password: "null",
        nickname: "The126ers",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i1.sndcdn.com/artworks-000134463766-v9coii-t500x500.jpg"
    }),
    new User({
        email: "Tubebackr@artist.pacify",
        password: "null",
        nickname: "Tubebackr",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i1.sndcdn.com/avatars-000524892837-d9tig5-t500x500.jpg"
    }),
    new User({
        email: "VibeTracks@artist.pacify",
        password: "null",
        nickname: "VibeTracks",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i.ytimg.com/vi/TrP2lxjLFgE/maxresdefault.jpg"
    }),
    new User({
        email: "ds3@artist.pacify",
        password: "null",
        nickname: "FromSoftware-Darksouls3",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://m.media-amazon.com/images/I/91fBWKCYE3L._SS500_.jpg"
    }),
    new User({
        email: "h.shaker@artist.pacify",
        password: "null",
        nickname: "Haytham Shaker",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://i1.wp.com/see.news/wp-content/uploads/2019/08/ff26adc7-37b9-4967-bf7a-6eb9f9cabbc9.jpg?fit=825%2C500&ssl=1"
    }),
    new User({
        email: "A.diab@artist.pacify",
        password: "null",
        nickname: "Amr Diab",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://pbs.twimg.com/profile_images/1227958901515182080/i18Ow4Zj_400x400.jpg"
    }),
    new User({
        email: "Angham@artist.pacify",
        password: "null",
        nickname: "Angham",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://pbs.twimg.com/profile_images/1234814071159083009/jtOKAbIt_400x400.jpg"
    }),
    new User({
        email: "Asala@artist.pacify",
        password: "null",
        nickname: "Asala",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "https://www.aghanyna.net/english/wp-content/uploads/2017/04/Asala-Nasri-2017.jpeg"

    }),
    new User({
        email: "B.Soltan@artist.pacify",
        password: "null",
        nickname: "Bahaa Soltan",
        type: "Artist",
        gender: "unknown",
        phone: "unknown",
        img: "http://melody4arab.com/images/group/baha2_soltan.jpg"
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