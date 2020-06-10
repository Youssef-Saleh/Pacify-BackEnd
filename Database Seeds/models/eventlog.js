var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Performer:{ type: String, required: true},
    Affected: { type: String, required: true}, 
    Year: {type: Number, default: (new Date).getFullYear()},
    Month: {type: Number, default: (new Date).getMonth()},
    Day: {type: Number, default: (new Date).getDay()},
    Type: {type: String, required: true},
    Object: {type: String, default: null}

});

module.exports = mongoose.model('Event', schema);