const Merchant = require('../models/MerchantModel');
const Store = require('../models/StoreModel');

const axios = require('axios');
const mongoose = require('mongoose');

module.exports = {
    index,
}

async function index(req, res) {
    console.log(req.params.merchant_id)
    try {
        const merchant = await Merchant.findById(req.params.merchant_id).populate('stores');
        res.json(merchant.stores);
    } catch (err) {
        console.log(err);
    }
}