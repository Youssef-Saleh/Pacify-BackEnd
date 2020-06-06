/**
 * @api {get} /collection/playlist/:playlistId
 * @apiVersion 0.1.0
 * @apiName GetPlaylist 
 * @apiGroup Playlists 
 * @apiDescription Retrieves playlist songs
 *  
 * @apiParam {Object} req  
 * @apiParam {Object} res  
 * 
 * @apiSuccess {Array} songs  Playlist songs
 * @apiError {String} PlaylistNotFound  Playlist is not found
 * 
 */


/**
 * @api {post} /createPlaylist
 * @apiVersion 0.1.0
 * @apiName CreatePlaylist
 * @apiGroup Playlists 
 * @apiDescription Create a playlist in database
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * @apiParam {Object} next
 * 
 * @apiSuccess {Object} playlist Created playlist
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */

 
/**
 * @api {put} /playlist/:id
 * @apiVersion 0.1.0
 * @apiName LikePlaylist
 * @apiGroup Playlists
 * @apiDescription Adds the id of an existing playlist to the liking user and the id of him/her to the liked playlist, in case playlist is liked, it ulikes it and vice versa 
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * 
 * @apiSuccess {Object} message Liked
 * @apiError PlaylistNotFound Playlist is not found
 */


 /**
 * @api {delete} /collection/playlist/:playlistId
 * @apiVersion 0.1.0
 * @apiName DeletePlaylist
 * @apiGroup Playlists 
 * @apiDescription Deletes a playlist in database 
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * @apiParam {Object} next
 * 
 * @apiSuccess {Object} message  Deleted
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


 /**
 * @api {delete} /collection/playlist/:playlistId/song/:songId
 * @apiVersion 0.1.0
 * @apiName RemoveSongFromPlaylist
 * @apiGroup Playlists 
 * @apiDescription Remove song from playlist 
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * @apiParam {Object} next
 * 
 * @apiSuccess {Object} message  Removed
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */


/**
 * @api {get} /homePlaylists
 * @apiVersion 0.1.0
 * @apiName GetHomePlaylists
 * @apiGroup Playlists 
 * @apiDescription collects different types of playlists in one array 
 * 
 * @apiParam {Object} req  
 * @apiParam {Object} res 
 * @apiParam {Object} next
 * 
 * @apiSuccess {Array} playlists  Different types of playlists
 * @apiError {String} PlaylistNotFound  Playlist is not found
 */
