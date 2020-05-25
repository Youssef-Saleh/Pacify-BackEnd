/** Express router providing mailer related services
 * @module services/mailer
 * @requires mongoose
 * @requires auth
 * @requires databaseURL
 * @requires nodemailer
 */
/**
 * mongoose module
 * @const
 */
const mongoose = require ('mongoose');
/**
 * environment variables module for authentication
 * @const
 */
const transporterData = require('../env_variables/env_vars.json').transporter;
const databaseURL = require('../env_variables/env_vars.json').mongoosePort;
/**
 * environment variables module for sender address
 * @const
 */
const senderAddress = require ('../env_variables/env_vars.json').senderAddress;
/**
 * environment variables module for receiver address
 * @const
 */
const receiverAddress = require ('../env_variables/env_vars.json').receiverAddress;
mongoose.connect(databaseURL);
/**
 * nodemailer module
 * @const
 */
const nodemailer = require('nodemailer');
/**
 * nodemailer configuration function
 * @const
 * @param authentication {Object} The email, password and host
 */
const transporter = nodemailer.createTransport({
    host: transporterData.host,
    port: transporterData.port,
    secure: transporterData.secure, // true for 465, false for other ports
    auth: transporterData.auth,
  });
  
  
/*
console.log(receiverAddress);
console.log(senderAddress);
*/
exports.sendEmail = async function (subject, html) {
    let mailOptions = {
        from: senderAddress, // sender address
        to: receiverAddress, // list of receivers
        subject,
        html
        };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw (error);
        }
        
    });
    
}    
