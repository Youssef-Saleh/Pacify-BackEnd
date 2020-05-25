/** Express router providing become user related services
 * @module services/eventsServices
 * @requires eventModel
 */

 /**
 * Event's model module
 * @const
 */
var Event = require ('../Database Seeds/models/event')



/**
 * function retrieves specific event data
 * @memberof module:services/eventServices
 * @name getEvents
 * @function
 * @param filter {String} The condition
 * @param errMsg {String} The error message.
 * @return users {Array} The list of users with the chosen condition
 */
exports.getEvents = async function (filter, errMsg= "User not found") {
    try {
        var events = await Event.find(filter);
        return events;
    } catch (error) {
        //console.log(error);
        throw (error);
    }
}

