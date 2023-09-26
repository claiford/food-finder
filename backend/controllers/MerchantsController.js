const Merchant = require('../models/MerchantModel');
const Store = require('../models/StoreModel');

const axios = require('axios');
const mongoose = require('mongoose');

module.exports = {
    index,
    queryPlaceName,
}

async function index(req, res) {
    try {
        const stores = await Store.find({});
        res.json(stores);
    } catch (err) {
        console.log(err);
    }
}

async function queryPlaceName(req, res) {
    try {
        const placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.body.place_id}&key=AIzaSyBLJXCbjB7HjCUmosPIocJkCpGjno-WJLg`)
        const placeName = placeDetails.data.result.name;
        res.json(placeName)
    } catch (err) {
        console.log(err);
    }
}