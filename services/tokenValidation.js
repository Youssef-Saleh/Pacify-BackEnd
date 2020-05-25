/** Express router providing token related services
 * @module services/tokenValidation
 * @requires jsonwebtoken
 */
/**
 * jsonwebtoken module
 * @const
 */
const jwt = require('jsonwebtoken');

/**
 * function checks the validity of the token
 * @memberof module:services/tokenValidation
 * @name validateToken
 * @function
 * @param token {String} The token
 * @param key {String} The secret key of the token.
 * @return {object} The data stored in the token 
 */

exports.validateToken = async function (token, key) {
    try {
        const decode = await jwt.verify (token, key);
        return decode;
        
    } catch (e) {
        //console.log (e);
        throw ("Invalid token!");
    }

}
