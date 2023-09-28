const Customer = require('../models/CustomerModel');

module.exports = {
    getAllCustomers
}

async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.find({});
        customers.sort((c1, c2) => {
            return c1.name.toLowerCase() < c2.name.toLowerCase() ? -1 : 1
        })
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers", error);
        res.status(500).json({ error: "Internal server error" });
    }
}