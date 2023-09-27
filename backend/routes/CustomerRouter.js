const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/GroupsController');
const sessionsController = require('../controllers/SessionsController');
const storesController = require('../controllers/StoresController');
const customersController = require('../controllers/CustomersController')

router.get('/new', groupsController.new);
router.post('/api/groups', groupsController.create);
router.get('/api/groups/:customer_id', groupsController.getAllGroups);
router.get('/api/customers', customersController.getAllCustomers);
router.post('/', groupsController.create);

router.put('/api/group/:group_id/add-members', groupsController.addMember);
router.delete('/api/group/:group_id/remove-member/:user_id', groupsController.removeMember);


// GET /customer/group/:group_id
router.get('/group/:group_id', groupsController.show)
// GET /customer/group/:group_id/sessions
router.get('/group/:group_id/sessions', sessionsController.index)
// POST /customer/group/:group_id/sessions/new
router.post('/group/:group_id/session/new', sessionsController.create)

// GET /customer/group/:group_id
router.get('/group/:group_id', groupsController.show)

// GET /customer/group/:group_id/sessions
router.get('/group/:group_id/sessions', sessionsController.index)

// GET 
router.get('/api/candidate/partnersearch/:place_id', storesController.partnerQuery)

// POST /customer/group/:group_id/sessions/new
router.post('/group/:group_id/session/new', sessionsController.create)

module.exports = router;

