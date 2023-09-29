const express = require('express');
const router = express.Router();

const customersController = require('../controllers/CustomersController')
const groupsController = require('../controllers/GroupsController');
const sessionsController = require('../controllers/SessionsController');
const storesController = require('../controllers/StoresController');

// GET Customer
router.get('/api/customers', customersController.getAllCustomers);

// GET Group
router.get('/api/groups/:customer_id', groupsController.index);
router.get('/api/group/:group_id', groupsController.show)

// GET Session
router.get('/api/sessions/:group_id', sessionsController.index)

// GET Store
router.get('/api/store/findpartner/:place_id', storesController.partnerQuery)

// POST Group
router.post('/api/groups/new', groupsController.create);

// POST Session
router.post('/api/sessions/new', sessionsController.create)

// PATCH Group
router.patch('/api/group/:group_id/addmember', groupsController.addMember);
router.patch('/api/group/:group_id/removemember', groupsController.removeMember);

// PATCH Session
router.patch('/api/session/:session_id/handle-voting', sessionsController.handleVoting);
router.patch('/api/session/:session_id/handle-archive', sessionsController.handleArchive);

// DELETE Group
router.delete('/api/groups/:group_id', groupsController.delete)

// DELETE Session
router.delete('/api/session/:session_id', sessionsController.delete)

module.exports = router;

