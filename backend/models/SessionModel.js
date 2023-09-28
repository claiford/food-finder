const mongoose = require('mongoose');

const VoterSchema = new mongoose.Schema({
    voter: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: Number,
    }
})

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
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
    distance: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    // todo: update this attribute to reflect time set by user, calculated using opening hours attribute from API
    is_open: {
        type: Boolean,
    },
    photos: [{
        type: String,
    }],
    votes: {
        type: Number,
    }

    // todo: setup review schema if needed
    // reviews: {
        
    // }
})

const SessionSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    // group: {
    //     type: String,
    //     required: true,
    // },
    status: {
        type: String,
        default: "incomplete",
    },
    origin: {
        type: String,
    },
    candidates: [CandidateSchema],
    // num_voters need to be updated if users added/removed from group
    voters: [VoterSchema],
    chosen: CandidateSchema
},
{
    timestamps: true
});

module.exports = mongoose.model("Session", SessionSchema)