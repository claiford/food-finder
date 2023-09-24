const express = require('express');
const router = express.Router();
const groupsCtrl = require('../controllers/GroupsController');
const customer = require('../models/CustomerModel');
const Group = require('../models/GroupModel');


// Your existing routes
router.get('/new', groupsCtrl.new);
router.post('/', groupsCtrl.create);

// Fetch customers route
router.get("/api/customers", async (req, res) => {
    try {
        const customers = await customer.find();
        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a new group route (POST)
router.post("/api/groups", async (req, res) => {
    try {
        const { groupName, memberIds } = req.body;

        // Create a new group with the received data
        const newGroup = new Group({ groupName, memberIds });

        // Save the group to the database
        const savedGroup = await newGroup.save();

        res.status(201).json(savedGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch all groups
router.get("/api/groups", async (req, res) => {
    try {
      const groups = await Group.find();
      res.json(groups);
    } catch (error) {
      console.error("Error fetching groups", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
