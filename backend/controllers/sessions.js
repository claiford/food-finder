const Session = require('../models/Session');
const axios = require('axios');

const PLACE_NEARBYSEARCH_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

module.exports = {
    index,
    create,
}

async function index(req, res) {
    try {
        // pending: "find" to be updated to query using group ID
        const sessions = await Session.find({});
        res.json(sessions);
    } catch (err) {
        console.log(err);
    }
}

async function create(req, res) {
    const key = process.env.GMAPS_API_KEY;
    try {
        // PERFORM NEARBY SEARCH QUERY
        const location = "1.387420%2C103.906998";
        const radius = "1000";
        const keyword = "food";
        const type = "restaurant";

        const queryNearbySearch = PLACE_NEARBYSEARCH_URL + `?location=${location}&radius=${radius}&keyword=${keyword}&type=${type}&key=${key}`;
        const resNearbySearch = await axios.get(queryNearbySearch);
        const nearbySearch = resNearbySearch.data.results

        const candidates = []
        for (const place of nearbySearch) {
            // PERFORM PLACE DETAILS QUERY
            const queryPlaceDetails = PLACE_DETAILS_URL + `?place_id=${place.place_id}&key=${key}`;
            const resPlaceDetails = await axios.get(queryPlaceDetails);
            const placeDetails = resPlaceDetails.data.result;
            const candidate = {
                name: placeDetails.name,
                place_id: placeDetails.place_id,
                rating: placeDetails.rating,
                user_ratings_total: placeDetails.user_ratings_total,
                location: placeDetails.geometry.location,
                // todo: update this to calculate based on user specified time
                // note: not all place details contain opening_hours attribute, set to null for unknown
                is_open: placeDetails.opening_hours?.open_now ?? null,
                photos: [],
            }
            
            if (placeDetails.photos) {
                for (const photo of placeDetails.photos) {
                    const queryPlacePhoto = PLACE_PHOTO_URL + `?photo_reference=${photo.photo_reference}&maxheight=200&key=${key}`;
                    resPlacePhoto = await axios.get(queryPlacePhoto);
                    const photoUrl = resPlacePhoto.request.res.responseUrl
                    candidate.photos.push(photoUrl);
                }
            }
            candidates.push(candidate);
        }

        const newSession = await Session.create({
            group: "Test Group " + new Date(Date.now()).toLocaleTimeString(),
            candidates: candidates,
        })

        res.json(newSession);
    } catch (err) {
        console.log(err);
    }
}