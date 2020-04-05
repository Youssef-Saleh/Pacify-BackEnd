var Song = require ('../models/song');
var mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/testpacify');

var songs = [
    new Song({
        name: "Termtany",
        year: 2020,
        genre: "HipHop",
        mood: "Inspirational",
        artist: "Abdobeatz",
        featured: ["Editingmaster"]
    }),
    new Song({
        name: "pythondisstrack",
        year: 2020,
        genre: "HipHop",
        mood: "Inspirational",
        artist: "Abdobeatz",
        featured: ["Editingmaster"]
    }),
    new Song({
        name: "stand_by_me",
        year: 2020,
        genre: "Electronic",
        mood: "Calm",
        artist: "Editingmaster",
    }),
    new Song({
        name: "dancin_editingmaster_remix",
        year: 2020,
        genre: "Ads",
        mood: null,
        artist: "Editingmaster",
        featured: ["Shaloos"]
    }),
    new Song({
        name: "yer_a_pirate",
        year: 2020,
        genre: "Ads",
        mood: null,
        artist: "Editingmaster",
        featured: ["Shaloos"]
    }),
    new Song({
        name: "deee7k",
        year: 2020,
        genre: "Ads",
        mood: null,
        artist: "Editingmaster",
        featured: ["Shaloos"]
    }),
    new Song({
        name: "Summer - Bensound Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Electronic",
        mood: "Calm",
        artist: "Bensound",
    }),
    new Song({
        name: "1200 AM - Ramzoid Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Electronic",
        mood: "Dramatic",
        artist: "Ramzoid",
    }),
    new Song({
        name: "Milky Way - Ramzoid Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Electronic",
        mood: "Dramatic",
        artist: "Ramzoid",
    }),
    new Song({
        name: "Wonton - Ramzoid Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Electronic",
        mood: "Inspirational",
        artist: "Ramzoid",
    }),
    new Song({
        name: "CIRCLES - tubebackr Royalty Free Music Instrumental Inspirational Background Music For Videos",
        year: 2020,
        genre: "Electronic",
        mood: "Inspirational",
        artist: "tubebackr",
    }),
    new Song({
        name: "Sky Level - CheesecakeDude Non Copyrighted Music For Background Of Video Free Download Music C",
        year: 2020,
        genre: "Electronic",
        mood: "Inspirational",
        artist: "CheesecakeDude",
    }),
    new Song({
        name: "The Happy Choice - CheeseCakeDude Background Music For Videos No Copyright Instrumental Music",
        year: 2020,
        genre: "Electronic",
        mood: "Inspirational",
        artist: "CheesecakeDude",
    }),
    new Song({
        name: "Green Forest - Riot Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Country",
        mood: "Calm",
        artist: "Riot",
    }),
    new Song({
        name: "Safety Net - Riot Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Country",
        mood: "Happy",
        artist: "Riot",
    }),
    new Song({
        name: "Strolling Through - Silent Partner Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Country",
        mood: "Inspirational",
        artist: "SilentPartner",
    }),
    new Song({
        name: "Dark_Souls_III_Soundtrack_OST_-_Epilogue_Ending_Credits_The_Ringed_City",
        year: 2020,
        genre: "Gaming",
        mood: "Dark",
        artist: "FromSoftware-Darksouls3",
    }),
    new Song({
        name: "Dark_Souls_III_Soundtrack_OST_-_Slave_Knight_Gael_The_Ringed_City",
        year: 2020,
        genre: "Gaming",
        mood: "Dark",
        artist: "FromSoftware-Darksouls3",
    }),
    new Song({
        name: "Dark_Souls_III_Soundtrack_OST_-_Soul_of_Cinder",
        year: 2020,
        genre: "Gaming",
        mood: "Dark",
        artist: "FromSoftware-Darksouls3",
    }),
    new Song({
        name: "A To The O - Diamond Ortiz Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "HipHop",
        mood: "Funky",
        artist: "DiamondOrtiz",
    }),
    new Song({
        name: "Not For Nothing - Otis McDonald Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "HipHop",
        mood: "Funky",
        artist: "OtisMcDonald",
    }),
    new Song({
        name: "Top Down - Jingle Punks Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "HipHop",
        mood: "Dark",
        artist: "JinglePunks",
    }),
    new Song({
        name: "SpongeBob theme songEarrape",
        year: 2020,
        genre: "Kids",
        mood: "Bright",
        artist: "Editingmasters",
    }),
    new Song({
        name: "Don't Hate Me - Jingle Punks Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Pop",
        mood: "Funky",
        artist: "JinglePunks",
    }),
    new Song({
        name: "Eyes On You - Network 415 Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Pop",
        mood: "Happy",
        artist: "Network415",
    }),
    new Song({
        name: "I Love You - Vibe Tracks Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Pop",
        mood: "Inspirational",
        artist: "VibeTracks",
    }),
    new Song({
        name: "Lonely Nights - Silent Partner Royalty Free Fusic - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Pop",
        mood: "Dramatic",
        artist: "SilentPartner",
    }),
    new Song({
        name: "Starry Eyed Romance - Biz Baz Studio Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Pop",
        mood: "Romantic",
        artist: "BizBaz",
    }),
    new Song({
        name: "After Thought - Density & Time Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Punk",
        mood: "Sad",
        artist: "Density&Time",
    }),
    new Song({
        name: "Hang For Days - Silent Partner Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Punk",
        mood: "Funky",
        artist: "SilentPartner",
    }),
    new Song({
        name: "Nothin' Yet - Spazz Cardigan Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Punk",
        mood: "Angry",
        artist: "SpazzCardigan",
    }),
    new Song({
        name: "Outlet - Silent Partner Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Punk",
        mood: "Angry",
        artist: "SilentPartner",
    }),
    new Song({
        name: "Parasail - Silent Partner Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Rock",
        mood: "Bright",
        artist: "SilentPartner",
    }),
    new Song({
        name: "The Coldest Shoulder - The 126ers Royalty Free Music - No Copyright Music",
        year: 2020,
        genre: "Rock",
        mood: "Dark",
        artist: "The126ers",
    }),
    new Song({
        name: "Walk With Me - Silent Partner Royalty Free Music - No Copyright Music YouTube Music",
        year: 2020,
        genre: "Rock",
        mood: "Happy",
        artist: "SilentPartner",
    }),
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