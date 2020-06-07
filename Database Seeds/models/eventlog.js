var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Performer:{ type: mongoose.Schema.Types.ObjectId, required: true},
    Affected: { type: mongoose.Schema.Types.ObjectId, required: true}, 
    Time: {type: Date, default: Date.now()},
    Type: {type: String, required: true},
    Object: {type: String, default: null}

});

module.exports = mongoose.model('Event', schema);