const loginRoutes = require('./login');
const browseRoutes = require('./browse');
const likedAlbumsRoutes = require('./likedAlbums');
const likedArtistsRoutes = require('./likedArtists');
const likedSongsRoutes = require('./likedSongs');
const likedPlaylistsRoutes = require('./likedPlaylists');
const rateSongsRoutes = require('./rateSongs');
const userRoutes = require('./users');
const createSongRoutes = require('./createSong');
const createAlbumRoutes= require('./createAlbum');
const getSongUploadsRoutes = require ('./getSongUploads');
const getAlbumUploadsRoutes = require ('./getAlbumUploads');
const addSongsToAlbumRoutes = require ('./addSongsToAlbum')
const getAlbumSongsRoutes = require ('./getAlbumSongs');
const getSongRoutes = require ('./getSong')
const remixesRoutes = require ('./remixes');
const getAlbumRoutes = require ('./getAlbum');
const playlistRoutes = require ('./playlistRequests');
const signupRoutes = require ('./signup');
const passwordRoutes = require ('./passwordReset');
const firstTimeRoutes = require ('./firstTime');
const accountRoutes = require ('./accoverview');
const getGenreRoutes = require ('./getGenres');
const libraryRoutes = require('./library');

var Song = require('../Database Seeds/models/song');
var User = require('../Database Seeds/models/user');
var Property = require('../Database Seeds/models/property');
const playlistModel = require('../database seeds/models/playlist');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    loginRoutes(app, fs);
    browseRoutes(app, fs);
    likedAlbumsRoutes(app, fs);
    likedArtistsRoutes(app, fs);
    likedSongsRoutes(app, fs);
    likedPlaylistsRoutes(app, fs);
    rateSongsRoutes(app, fs);
    signupRoutes(app, fs, User);
    firstTimeRoutes(app, fs, User, Property);
    accountRoutes(app, fs, User);
    passwordRoutes(app, fs, User);
    playlistRoutes(app, fs, Song, Property, playlistModel);
    createSongRoutes(app, fs, Song);
    createAlbumRoutes(app, fs);
    getSongUploadsRoutes(app,fs);
    getAlbumUploadsRoutes(app,fs);
    addSongsToAlbumRoutes (app, fs);
    getAlbumSongsRoutes(app,fs);
    getSongRoutes(app, fs);
    getAlbumRoutes(app, fs);
    remixesRoutes(app, fs);
    userRoutes(app, fs);
    getGenreRoutes(app, fs);
    libraryRoutes(app, fs);
};

module.exports = appRouter;