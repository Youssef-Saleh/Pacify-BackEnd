/**
 * @api {get} /collection/playlist/:playlistId Get Playlist
 * @apiVersion 0.1.0
 * @apiName GetPlaylist 
 * @apiGroup Playlists 
 * @apiDescription Retrieves playlist songs
 *  
 * @apiParam {Object} req It has playlist id
 * @apiParam {Object} res It responds with songs of required playlist
 * 
 * @apiSuccess {Array} songs  Playlist songs
 * @apiError {String} PlaylistNotFound  Playlist is not found
 * 
 */


/**
 * @api {post} /createPlaylist Create Playlist
 * @apiVersion 0.1.0
 * @apiName CreatePlaylist
 * @apiGroup Playlists 
 * @apiDescription Create a playlist in database
 * 
 * @apiParam {Object} req It has playlist name and token of user
 * @apiParam {Object} res It responds with created playlist
 * @apiParam {Object} next If there is an error
 * 
 * @apiSuccess {Object} playlist Created playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */

 
/**
 * @api {put} /playlist/:id Like Playlist
 * @apiVersion 0.1.0
 * @apiName LikePlaylist
 * @apiGroup Playlists
 * @apiDescription Adds the id of an existing playlist to the liking user and the id of him/her to the liked playlist, in case playlist is liked, it ulikes it and vice versa 
 * 
 * @apiParam {Object} req It has playlist id and token of user
 * @apiParam {Object} res It responds with a message when playlist is liked or not
 * 
 * @apiSuccess {Object} message Liked
 * @apiError PlaylistNotFound Playlist is not found
 */


 /**
 * @api {delete} /collection/playlist/:playlistId Delete Playlist
 * @apiVersion 0.1.0
 * @apiName DeletePlaylist
 * @apiGroup Playlists 
 * @apiDescription Deletes a playlist in database 
 * 
 * @apiParam {Object} req It has playlist id
 * @apiParam {Object} res It responds with a message when deleted
 * @apiParam {Object} next If there is an error
 * 
 * @apiSuccess {Object} message  Deleted
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {delete} /collection/playlist/:playlistId/song/:songId Remove Song from Playlist
 * @apiVersion 0.1.0
 * @apiName RemoveSongFromPlaylist
 * @apiGroup Playlists 
 * @apiDescription Remove song from playlist 
 * 
 * @apiParam {Object} req It has playlist id
 * @apiParam {Object} res It responds with a message when song is removed 
 * @apiParam {Object} next If there is an error
 * 
 * @apiSuccess {Object} message  Removed
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


/**
 * @api {get} /homePlaylists Home Playlists
 * @apiVersion 0.1.0
 * @apiName GetHomePlaylists
 * @apiGroup Playlists 
 * @apiDescription collects different types of playlists in one array 
 * 
 * @apiParam {Object} req request body
 * @apiParam {Object} res It responds with all required playlists
 * @apiParam {Object} next If there is an error
 * 
 * @apiSuccess {Array} playlists  Different types of playlists
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */
