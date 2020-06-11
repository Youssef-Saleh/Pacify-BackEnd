/**
 * @api {put} /Library adds songs to album
 * @apiName addSongsToAlbum
 * @apiGroup Library
 * @apiVersion 0.1.0
 * @apiParam {string} req       contains token and other request data 
 * @apiParam {string} res       response containing the data that will be sent to the user
 * @apiParam {string} next      callback function
 * 
 * @apiSuccess (200){string} Message    song added to album
*/