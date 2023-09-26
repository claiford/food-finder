const axios = require('axios');
const mongoose = require('mongoose');

const Merchant = require('../models/MerchantModel');
const Store = require('../models/StoreModel');

const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

module.exports = {
    create,
    show,
    update,
    partnerQuery
}

async function create(req, res) {
    const key = process.env.GMAPS_API_KEY;

    // PERFORM PLACE DETAILS QUERY
    const queryPlaceDetails = PLACE_DETAILS_URL + `?place_id=${req.body.place_id}&key=${key}`;
    const resPlaceDetails = await axios.get(queryPlaceDetails);
    const placeDetails = resPlaceDetails.data.result;
    try {
        const newStore = await Store.create({
            place_id: placeDetails.place_id,
            name: placeDetails.name,
            promotion: "None",
        })
        res.json(newStore);
    } catch (err) {
        console.log(err);
    }
}

async function show(req, res) {
    try {
        const store = await Store.findById(req.params.store_id);
        res.json(store);
    } catch (err) {
        console.log(err)
    }
}

async function update(req, res) {
    try {
        await Store.findOneAndUpdate({ _id: req.params.store_id }, req.body.storeInfo)
        res.send("ok")
    } catch (err) {
        console.log(err)
    }
};

async function partnerQuery(req, res) {
    try {
        const partner = await Store.find({ place_id: req.params.place_id });
        res.json(partner[0]);
    } catch (err) {
        console.log(err);
    }
}