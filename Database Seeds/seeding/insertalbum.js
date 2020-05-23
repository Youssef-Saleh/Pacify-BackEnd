var Album = require ('../models/album');
var mongoose = require ('mongoose');

var url = require('../../env_variables/env_vars.json').mongoosePort;
mongoose.connect(url);


var albums = [
    new Album({
        url: "https://i1.sndcdn.com/artworks-000162189360-qfth66-t500x500.jpg",
        name: "Allem alby",
        year: 2003,
        songs: ["Allem Alby", "Ana Ayesh", "Habiby Ya Omry"],
        artist: "Ramy Sabry",
    }),
    new Album({
        url: "https://s.mxmcdn.net/images-storage/albums5/4/5/3/3/8/3/42383354_500_500.jpg",
        name: "Kol yom men dah",
        year: 2019,
        songs: ["Gamda", "Ana Ayesh", "Ana Ayesh"],
        artist: "amr diab",
    }),
    new Album({
        url: "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/p960x960/86289329_10158157447514577_4904555315741065216_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=HXD_Ev8l-MsAX84gjZ5&_nc_ht=scontent-amt2-1.xx&_nc_tp=6&oh=bbb3170f21e659aef73cbede6976c7a3&oe=5EB05E39",
        name: "Sahran",
        year: 2020,
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"],
        artist: "Angham",
    }),
    new Album({
        url: "https://t2.genius.com/unsafe/275x0/https%3A%2F%2Fimages.genius.com%2F965ad8c82774fa0b9a136ad5f0dcbf70.959x959x1.jpg",
        name: "Haala khassa",
        year: 2019,
        artist: "Angham",
        songs: ["Habayebna"]
    }),
    new Album({
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7IjqmY6IYQRybqu0YnlMFmSTCUX3RgdbR2vnRjO_AmGNdsc_Y&usqp=CAU",
        name: "Mesh Mohem Ana",
        artist: "amr diab",
        year: 2019,
    }),
    new Album({
        url: "https://img.youm7.com/ArticleImgs/2017/8/2/135393-بوستر-مهتمة-بالتفاصيل.jpg",
        name: "Mohtama bel tafaseel",
        year: 2019,
        artist: "amr diab",
        songs: ["Hay2olek", "Ya 3alem", "Yom El ra7eel"]
    }),
    new Album({
        url: "https://i.ytimg.com/vi/gwPgsWKeSr4/maxresdefault.jpg",
        name: "Nassay",
        year: 2018,
        artist: "amr diab",
        songs: ["Sahran", "Rooh", "Gamda", "Helwa El bedayat"]

    }),
    new Album({
        url: "https://i.ytimg.com/vi/cDqOAOpa3dI/maxresdefault.jpg",
        name: "Marefa adema",
        year: 2019,
        artist: "Hany Shaker",
        songs: ["Matghebosh", "Mesh Mohem Ana", "Habiby Ya Omry"]
    }),
    new Album({
        url: "https://i.ytimg.com/vi/_cun9Qt3Wjg/maxresdefault.jpg",
        name: "Garhy ana",
        year: 2001,
        artist: "Hany Shaker",
        songs: ["Kol Makan"]
    }),
    new Album({
        url: "https://i.ytimg.com/vi/44YW6E6sAZM/maxresdefault.jpg",
        name: "Welad Enharda",
        year: 2015,
        artist: "Hany Shaker",
        songs: ["Kol Makan"]

    }),
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