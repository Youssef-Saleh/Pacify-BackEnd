const mongoose = require('mongoose');
const schema = mongoose.Schema;

const propertySchema = new schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const propertyModel = mongoose.model('Property', propertySchema);

module.exports = propertyModel;