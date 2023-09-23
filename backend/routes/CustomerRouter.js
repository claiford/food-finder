const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/GroupsController');
const sessionsController = require('../controllers/SessionsController');

router.get('/new', groupsController.new);

router.post('/', groupsController.create);

// router.get('/customer/group/groupid/', groupsController.index)

// GET /customer/group/:group_id/sessions
router.get('/group/:group_id/sessions', sessionsController.index)


module.exports = router;