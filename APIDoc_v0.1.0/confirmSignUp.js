/**
 * @api {get} /confirmregisteration/:id  Confirm the entered data
 * @apiVersion 0.1.0
 * @apiName Data Confirmation
 * @apiGroup Email Registeration
 * 
 * @apiParam {string} id               The ID of the user
 * 
 *
*/

/**
 * @api {post} /confirm  Confirm the email
 * @apiVersion 0.1.0
 * @apiName email Confirmation
 * @apiGroup Email Registeration
 * 
 * 
 * @apiParam {String} ID                The ID of the User.
 * @apiParam {String} Code              Confirmation code sent to the user.
 * 
 * @apiSuccess {string} token           ID for the user
 * @apiError (400) {string} wrongCode            Different code from the sent to the email
 * 
*/