/**
 * @api {get} /premium Token Validation
 * @apiVersion 0.1.0
 * @apiName Premium request authorization
 * @apiGroup Premium
 * @apiDescription Checks token validity before requesting to be premium
 * @apiParam {string} req            contains token and other request data
 * @apiParam {string} res            response containing the data will be sent to the user
 * @apiParam {string} next            callback function
 * 
 * @apiSuccess (200){string} Message         The token is valid
 * @apiError (400) {string} ErrorMessage        Invalid token
 */
 
 /**
  * @api {put} /premium/ User type validation
  * @apiVersion 0.1.0
  * @apiName User type validation
  * @apiGroup Premium 
  * @apiDescription Checks the user type and sends email if free
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next            callback function
  * 
  * @apiSuccess (200){string} Message         Email is sent
  * @apiError (400) {string} ErrorMessage        Invalid token or error sending the email
  * 
  * 
  * 
  */

  /**
  * @api {get} /premium/confirmation Confirming premium purchase
  * @apiVersion 0.1.0
  * @apiName Completing request
  * @apiGroup Premium 
  * @apiDescription Completes the request and changes the user type to premium
  * @apiParam {string} req            contains token and other request data
  * @apiParam {string} res            response containing the data will be sent to the user
  * @apiParam {string} next            callback function
  *
  * 
  * @apiSuccess (200){string} Message         The user is premium now
  * @apiError (400) {string} ErrorMessage        Invalid token or already premium
  * 
  * 
  * 
  */