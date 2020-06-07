/**
 * @api {get} /playlist/trending Trending Playlist
 * @apiVersion 0.1.0
 * @apiName GetTrendingPlaylist
 * @apiGroup Playlists 
 * @apiDescription Retrieves playlist created in database updated with songs played the most
 * 
 * @apiParam {Object} req request body
 * @apiParam {Object} res It responds with trending playlist
 * 
 * @apiSuccess {Object} trendingPlaylist Trending playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/highestRated Highest-Rated Playlist
 * @apiVersion 0.1.0
 * @apiName GetHighestRatedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Retrieves highest-rated playlist
 * 
 * @apiParam {Object} req request body
 * @apiParam {Object} res It responds with highest-rated playlist
 * 
 * @apiSuccess {Object} highestRatedPlaylist  Highest-rated playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/random Random Playlist
 * @apiVersion 0.1.0
 * @apiName GetRandomPlaylist
 * @apiGroup Playlists 
 * @apiDescription Generate random playlists
 * 
 * @apiParam {Object} req request body
 * @apiParam {Object} res It responds with a random playlist
 * 
 * @apiSuccess {Object} randomPlaylist Random playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/region Region-Based Playlist
 * @apiVersion 0.1.0
 * @apiName GetRegionBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each region has a playlist created in database called "Top in 'region'" updated with region songs played the most
 * 
 * @apiParam {Object} req It has type of required playlist
 * @apiParam {Object} res It responds with required playlist
 * 
 * @apiSuccess {Object} regionBasedPlaylist Region-based playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/genre Genre-Based Playlist
 * @apiVersion 0.1.0
 * @apiName GetGenreBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each genre has a playlist for it created in database updated with songs having same genre
 * 
 * @apiParam {Object} req It has type of required playlist
 * @apiParam {Object} res It responds with required playlist
 * 
 * @apiSuccess {Object} genreBasedPlaylist Genre-based playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */

 
 /**
 * @api {get} /playlist/mood Mood-Based Playlist
 * @apiVersion 0.1.0
 * @apiName GetMoodBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each mood has a playlist created for it in database updated with songs having same mood
 * 
 * @apiParam {Object} req It has type of required playlist
 * @apiParam {Object} res It responds with required playlist
 * 
 * @apiSuccess {Object} moodBasedPlaylist Mood-based playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */
