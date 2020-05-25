/** Express router providing token related services
 * @module services/token
 * @requires jsonwebtoken
 */
/**
 * jsonwebtoken module
 * @const
 */
const jwt = require('jsonwebtoken');

/**
 * function checks the validity of the token
 * @memberof module:services/token
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

exports.signToken = async function (data, key) {
    try {
        var user= data;
        var token = await jwt.sign({user}, key, { expiresIn: '50m' });
        return token;
    } catch (error) {
        throw (error);
    }
}
