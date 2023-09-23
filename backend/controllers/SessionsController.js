const Session = require('../models/SessionModel');
const axios = require('axios');

const PLACE_NEARBYSEARCH_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const ROUTES_COMPUTEROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

module.exports = {
    index,
    getOngoing,
    create,
    handleVoting,
    handleArchive,
}

async function index(req, res) {
    try {
        // pending: "find" to be updated to query using group ID
        const sessions = await Session.find({ group: req.params.group_id });
        res.json(sessions);
    } catch (err) {
        console.log(err);
    }
}

async function getOngoing(req, res) {
    try {
        // pending: "find" to be updated to query using group ID
        const ongoingSession = await Session.find({ ongoing: true })
        res.json(ongoingSession[0].candidates);
    } catch (err) {
        console.log(err);
    }
}

async function create(req, res) {
    const key = process.env.GMAPS_API_KEY;
    try {
        console.log("CREATING SESSION...")

        // GET ORIGIN LAT & LNG FOR NEARBY SEARCH
        const queryOriginDetails = PLACE_DETAILS_URL + `?place_id=${req.body.location}&key=${key}`;
        const resOriginDetails = await axios.get(queryOriginDetails);
        const originDetails = resOriginDetails.data.result;
        const originLat = originDetails.geometry.location.lat;
        const originLng = originDetails.geometry.location.lng;

        // PERFORM NEARBY SEARCH QUERY
        const location = `${originLat}%2C${originLng}`;
        const radius = req.body.distance * 1000;
        const maxprice = req.body.budget;
        // pending: ignore keyword (cuisine) selection for now
        // const keyword = "mexican";
        const type = "restaurant";

        const queryNearbySearch = PLACE_NEARBYSEARCH_URL + `?location=${location}&radius=${radius}&maxprice=${maxprice}&type=${type}&key=${key}`;
        const resNearbySearch = await axios.get(queryNearbySearch);
        const nearbySearch = resNearbySearch.data.results

        const candidates = []
        for (const place of nearbySearch) {
            // PERFORM PLACE DETAILS QUERY
            const queryPlaceDetails = PLACE_DETAILS_URL + `?place_id=${place.place_id}&key=${key}`;
            const resPlaceDetails = await axios.get(queryPlaceDetails);
            const placeDetails = resPlaceDetails.data.result;

            // PERFORM ROUTE QUERY
            const fields = "routes.duration,routes.distanceMeters"
            const queryComputeRoutes = ROUTES_COMPUTEROUTES_URL + `?fields=${fields}&key=${key}`;
            const resComputeRoutes = await axios.post(queryComputeRoutes, {
                "origin": {
                    "location": {
                        "latLng": {
                            "latitude": 1.387420,
                            "longitude": 103.906998
                        }
                    }
                },
                "destination": {
                    "placeId": placeDetails.place_id
                }
            })
            const computeRoutes = resComputeRoutes.data.routes[0]

            // PERFORM PHOTO QUERY
            const placePhotos = []
            if (placeDetails.photos) {
                for (const photo of placeDetails.photos) {
                    const queryPlacePhoto = PLACE_PHOTO_URL + `?photo_reference=${photo.photo_reference}&maxheight=200&key=${key}`;
                    const resPlacePhoto = await axios.get(queryPlacePhoto);
                    const photoUrl = resPlacePhoto.request.res.responseUrl
                    placePhotos.push(photoUrl);
                }
            }

            // construct candidate object
            const candidate = {
                name: placeDetails.name,
                place_id: placeDetails.place_id,
                rating: placeDetails.rating ?? null,
                user_ratings_total: placeDetails.user_ratings_total ?? null,
                location: placeDetails.geometry.location,
                distance: computeRoutes.distanceMeters,
                duration: Number(computeRoutes.duration.slice(0, -1)),
                // todo: update this to calculate based on user specified time
                // note: not all place details contain opening_hours attribute, set to null for unknown
                is_open: placeDetails.opening_hours?.open_now ?? null,
                photos: placePhotos,
                votes: 0,
            }

            candidates.push(candidate);
        }

        const newSession = await Session.create({
            group: "Test Group " + new Date(Date.now()).toLocaleTimeString(),
            status: "incomplete",
            candidates: candidates,
            num_voters: 1,
        })

        console.log("SESSION CREATED")
        res.json(newSession);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function handleVoting(req, res) {
    try {
        console.log("updating session");
        const update = { status: "complete" };
        const session = await Session.findById(req.params.sessionid)
        for (const [place_id, vote] of Object.entries(req.body.votes)) {
            session.candidates.find((c) => c.place_id === place_id).votes += vote;
        }
        session.num_voted += 1;

        if (session.num_voted === session.num_voters) {
            session.status = "complete";
            console.log(session.candidates)
            session.chosen = session.candidates.reduce((a, b) => {
                if (a.votes === b.votes) {
                    if (a.distance <= b.distance) return a
                    if (a.distance > b.distance) return b
                } else {
                    if (a.votes > b.votes) return a
                    if (a.votes < b.votes) return b
                }
            })
        }

        await session.save()
        console.log("session updated");
        res.send('session updated');
    } catch (err) {
        console.log(err);
    }
}

async function handleArchive(req, res) {
    try {
        console.log("updating session");
        await Session.findOneAndUpdate({ _id: req.params.sessionid }, { status: "archive" })
        console.log("session updated");
        res.send('session updated');
    } catch (err) {
        console.log(err);
    }
}