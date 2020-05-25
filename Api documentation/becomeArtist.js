/**
  * @api {get} /becomeArtist Token validation
  * @apiVersion 0.1.0
  * @apiName Token validation
  * @apiGroup Artist 
  * @apiDescription Checks the validitiy of a token before requesting
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next           callback function
  *
  * 
  * @apiSuccess (200){string} Message         User retrieved
  * @apiError (400) {string} ErrorMessage        Invalid token
  * 
  * 
  * 
  */

  /**
  * @api {put} /becomeArtist Be an Artist request
  * @apiVersion 0.1.0
  * @apiName Artist Upgrade
  * @apiGroup Artist 
  * @apiDescription Submits the request to be an artist
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next            callback function
  * 
  * @apiSuccess (200){string} Message         Request approved
  * @apiError (400) {string} ErrorMessage        Invalid token or already an artist
  * 
  * 
  * 
  */