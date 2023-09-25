const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/GroupsController');
const sessionsController = require('../controllers/SessionsController');

const Customer = require('../models/CustomerModel');
const Group = require('../models/GroupModel');

router.get('/new', groupsController.new);

router.post('/', groupsController.create);

// GET /customer/group/:group_id
router.get('/group/:group_id', groupsController.show)

// GET /customer/group/:group_id/sessions
router.get('/group/:group_id/sessions', sessionsController.index)

// POST /customer/group/:group_id/sessions/new
router.post('/group/:group_id/session/new', sessionsController.create)

// Fetch customers route
router.get("/api/customers", async (req, res) => {
    try {
        const customers = await Customer.find();
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
      const groups = await Group.find({});
      res.json(groups);
    } catch (error) {
      console.error("Error fetching groups", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
