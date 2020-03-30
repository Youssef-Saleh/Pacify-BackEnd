/**
 * @api {get} /library Get playlist
 * @apiVersion 0.1.0
 * @apiName Get 
 * @apiGroup Playlists 
 *  
 * @apiParam {String} name Playlist Name
 * 
 * @apiSuccess {String} id Playlist ID
 *  
 * @apiError PlaylistNotFound Playlist is not found
 * 
 */

/**
 * @api {post} /library Create playlist
 * @apiVersion 0.1.0
 * @apiName Create
 * @apiGroup Playlists  
 * 
 * @apiParam {String} name Playlist Name
 * 
 * @apiSuccess {String} id Playlist ID
 *  
 * @apiError NoPlaylistName Enter a name for the playlist
 */

/**
 * @api {post} /library Like playlist
 * @apiVersion 0.1.0
 * @apiName Like
 * @apiGroup Playlists
 *  
 * @apiParam {Object[]} playlist Playlist Name
 * 
 * @apiSuccess {String} id Playlist ID
 *  
 * @apiError PlaylistNotFound Playlist is not found
 */
