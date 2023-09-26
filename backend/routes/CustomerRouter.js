const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/GroupsController');
const sessionsController = require('../controllers/SessionsController');
const customersController = require('../controllers/CustomersController')




// Your existing routes
router.get('/new', groupsController.new);
router.post('/api/groups', groupsController.create);
router.get('/api/groups/:customer_id', groupsController.getAllGroups);
router.get('/api/customers', customersController.getAllCustomers);
router.post('/', groupsController.create);


// GET /customer/group/:group_id
router.get('/group/:group_id', groupsController.show)
// GET /customer/group/:group_id/sessions
router.get('/group/:group_id/sessions', sessionsController.index)
// POST /customer/group/:group_id/sessions/new
router.post('/group/:group_id/session/new', sessionsController.create)

module.exports = router;
