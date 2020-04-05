var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String, required: true},
    type: {type: String, required: true},
    img: {type: String, default: null}
});

module.exports = mongoose.model('Property', schema);