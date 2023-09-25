const express = require('express');
const router = express.Router();
const groupsCtrl = require('../controllers/GroupsController');
const Group = require('../models/GroupModel');
const customersCtrl = require('../controllers/CustomersController')


// Your existing routes
router.get('/new', groupsCtrl.new);
router.post('/api/groups', groupsCtrl.create);
router.get('/api/groups', groupsCtrl.getAllGroups);
router.get('/api/customers', customersCtrl.getAllCustomers);

module.exports = router;
