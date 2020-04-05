var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    type: {type: String, required: true},
    seen: {type: Boolean, default: false},
    timestamp: {type: String, required: true}
});

module.exports = mongoose.model('Eventlog', schema);