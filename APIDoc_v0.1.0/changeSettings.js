/**
 * @api {get} /accountsettings retrieve account settings
 * @apiVersion 0.1.0
 * @apiName Retrieve
 * @apiGroup User Settings 
 * 
 * @apiParam {object} user              Retrieves the user info including ID,email,username, birhtdate, country and subscribtion type
 * 
 */

/**
 * @api {post} /saveprofile save account changes
 * @apiVersion 0.1.0
 * @apiName Save
 * @apiGroup User Settings 
 * 
 * @apiParam {object} user             Sends a modified copy of user settings including new email, password, mobile no., birthdate              
 * 
 * 
 * @apiSuccess {string} successful     Tell the user that new settings are applied
 * @apiError (403) {string}  forbidden          Worng password
 * 
 */

 