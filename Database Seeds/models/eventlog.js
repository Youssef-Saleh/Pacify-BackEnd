var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Performer:{ type: String, required: true},
    Affected: { type: String, required: true}, 
    Time: {type: Date, default: Date.now()},
    Type: {type: String, required: true},
    Object: {type: String, default: null}

});

module.exports = mongoose.model('Event', schema);