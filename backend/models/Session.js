const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    place_id: {
        type: String,
    },
    rating: {
        type: Number,
    },
    user_ratings_total: {
        type: Number,
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    // todo: update this attribute to reflect time set by user, calculated using opening hours attribute from API
    is_open: {
        type: Boolean,
    },
    // todo: have to retrieve from place photos API using photo ref
    photos: [{ type: String }]

    // todo: setup review schema if needed
    // reviews: {
        
    // }
})

const SessionSchema = new mongoose.Schema({
    // group: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // },
    group: {
        type: String,
        required: true,
    },
    ongoing: {
        type: Boolean,
        default: true,
    },
    candidates: [CandidateSchema],
    chosen: {
        name: {
            type: String,
            default: null
        },
        place_id: {
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