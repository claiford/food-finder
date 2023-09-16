const express = require('express');
const router = express.Router();

const groupsCtrl = require('../controllers/GroupController');


router.get('/new', groupsCtrl.new);

router.post('/', groupsCtrl.create);

module.exports = router;