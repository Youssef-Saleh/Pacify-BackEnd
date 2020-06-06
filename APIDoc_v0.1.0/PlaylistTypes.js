/**
 * @api {get} /playlist/trending
 * @apiVersion 0.1.0
 * @apiName GetTrendingPlaylist
 * @apiGroup Playlists 
 * @apiDescription Retrieves playlist created in database updated with songs played the most
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} trendingPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/highestRated
 * @apiVersion 0.1.0
 * @apiName GetHighestRatedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Retrieves highest-rated playlist
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} highestRatedPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/random
 * @apiVersion 0.1.0
 * @apiName GetRandomPlaylist
 * @apiGroup Playlists 
 * @apiDescription Generate random playlists
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} randomPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/region
 * @apiVersion 0.1.0
 * @apiName GetRegionBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each region has a playlist created in database called "Top in 'region'" updated with region songs played the most
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} regionBasedPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {get} /playlist/genre
 * @apiVersion 0.1.0
 * @apiName GetGenreBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each genre has a playlist for it created in database updated with songs having same genre
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} genreBasedPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */

 
 /**
 * @api {get} /playlist/mood
 * @apiVersion 0.1.0
 * @apiName GetMoodBasedPlaylist
 * @apiGroup Playlists 
 * @apiDescription Each mood has a playlist created for it in database updated with songs having same mood
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} moodBasedPlaylist  
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */
