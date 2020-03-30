/**
 * @api {get} /getpremium/ Get Premium ID
 * @apiVersion 0.1.0
 * @apiName Get code
 * @apiGroup Premium subscribtion
 * 
 * @apiParam {number} id            Getting logged user ID
 * 
 * @apiSuccess {number} id          Retrieved user id
 * @apiError (403) {string} forbidden        For users not logged in
 */

 /**
  * @api {post} /purchase/ Check the entered code
  * @apiVersion 0.1.0
  * @apiName Check code
  * @apiGroup Premium subscribtion
  * 
  * @apiParam {number} id           The Id of the user
  * @apiParam {string} code         The sent code to user's email
  *
  * 
  * @apiSuccess {string} premium    Notifiying the user he is premium now
  * @apiError (400) {string} wrongcode       User enters a wrong code
  * 
  * 
  * 
  */