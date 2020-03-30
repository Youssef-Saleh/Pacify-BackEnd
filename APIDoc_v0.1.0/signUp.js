/**
 * @api {get} /signup/ Get Signup Page
 * @apiVersion 0.1.0
 * @apiName Get
 * @apiGroup Registeration
 * 
 */


/**
 * @api {post} /register/ Create new Account
 * @apiVersion 0.1.0
 * @apiName Create Account
 * @apiGroup Registeration
 * 
 * 
 * 
 * @apiParam {String} email             Email of the User.
 * @apiParam {String} password          Password of the user.
 * @apiParam {String} username          Username
 * @apiParam {string} gender            Gender
 * @apiParam {number} day               day of birth
 * @apiParam {number} month             month of birth
 * @apiParam {number} year              year of birth
 * @apiParam {boolean} shareData        Share data with spotify or not
 * 
 * @apiSuccess {number} id              ID for the user
 * @apiError (400) emailAlreadytaken          A user registered with same email
 * 
 */