const loginRoutes = require('./login');
const browseRoutes = require('./browse');
const likedAlbumsRoutes = require('./likedAlbums');
const likedArtistsRoutes = require('./likedArtists');
const likedSongsRoutes = require('./likedSongs');
const rateSongsRoutes = require('./rateSongs');
const userRoutes = require('./users');
const createSongRoutes = require('./createSong');
const createAlbumRoutes= require('./createAlbum');
const getSongUploadsRoutes = require ('./getSongUploads');
const getAlnumUploadsRoutes = require ('./getAlbumUploads');
const addSongsToAlbumRoutes = require ('./addSongsToAlbum')
const getAlbumSongsRoutes = require ('./getAlbumSongs');
const getSongRoutes = require ('./getSong')
const remixesRoutes = require ('./remixes');
const getAlbumRoutes = require ('./getAlbum');
const playlistRoutes = require ('./api')
var Song = require('../Database Seeds/models/song');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    loginRoutes(app, fs);
    browseRoutes(app, fs);
    likedAlbumsRoutes(app, fs);
    likedArtistsRoutes(app, fs);
    likedSongsRoutes(app, fs);
    rateSongsRoutes(app, fs);
    playlistRoutes(app, fs, Song);
    createSongRoutes(app, fs, Song);
    createAlbumRoutes(app, fs);
    getSongUploadsRoutes(app,fs);
    getAlnumUploadsRoutes(app,fs);
    addSongsToAlbumRoutes (app, fs);
    getAlbumSongsRoutes(app,fs);
    getSongRoutes(app, fs);
    getAlbumRoutes(app, fs);
    remixesRoutes(app, fs);
    userRoutes(app, fs);
};

module.exports = appRouter;