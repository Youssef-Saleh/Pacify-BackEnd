/** Express router providing become user related services
 * @module services/userServices
 * @requires UserModel
 */

 /**
 * User's model module
 * @const
 */
var User = require ('../Database Seeds/models/user')

/**
 * function retrieves specific user data
 * @memberof module:services/userServices
 * @name getUsers
 * @function
 * @param filter {String} The condition
 * @param errMsg {String} The error message.
 * @return users {Array} The list of users with the chosen condition
 */
exports.getUsers = async function (filter, errMsg= "User not found") {
    try {
        var users = await User.find(filter);
        return users;
    } catch (error) {
        //console.log(error);
        throw (error);
    }
}

/**
 * function updates specific user data
 * @memberof module:services
 * @name updateUser
 * @function
 * @param filter {String} The condition
 * @param qurey {String} The updated data.
 * @return {undefined}
 */
exports.updateUser = async function (filter, query) {
    try {
        await User.update(filter, query);
    } catch (error) {
        throw ("Already updated!");
    }
}