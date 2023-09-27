const Customer = require('../models/CustomerModel');

module.exports = {
    getAllCustomers
}

async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers", error);
        res.status(500).json({ error: "Internal server error" });
    }
}