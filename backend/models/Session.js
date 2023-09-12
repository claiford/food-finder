const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    // group: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // },
    group: {
        type: String,
        required: true,
    },
    restaurant: {
        name: {
            type: String,
            default: null
        },
        gmap_id: {
            type: String,
            default: null
        },
        db_id: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Session", SessionSchema)