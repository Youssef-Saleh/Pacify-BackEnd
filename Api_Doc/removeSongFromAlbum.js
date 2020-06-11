/**
 * @api {put} /Library removes song from an album
 * @apiName removeSongFromAlbum
 * @apiGroup Library
 * @apiVersion 0.1.0
 * @apiParam {string} req       contains token and other request data 
 * @apiParam {string} res       response containing the data that will be sent to the user
 * 
 * @apiSuccess (200){string} Message        song removed successfully from the album
 * @apiError (400){string} ErrorMessage     no album found!
*/