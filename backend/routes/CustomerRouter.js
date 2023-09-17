const express = require('express');
const router = express.Router();

const groupsCtrl = require('../controllers/GroupsController');



router.get('/new', groupsCtrl.new);

router.post('/', groupsCtrl.create);

module.exports = router;