const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
    place_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    photos: [{
        type: String,
    }],
    promotion: {
        type: String,
    }
});

module.exports = mongoose.model('Store', storeSchema);
