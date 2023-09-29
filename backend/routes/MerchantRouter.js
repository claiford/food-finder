const express = require('express');
const router = express.Router();

const storesController = require('../controllers/StoresController');

// Get Store
router.get('/api/stores/:merchant_id', storesController.index);
router.get('/api/store/:store_id', storesController.show);

// POST Store
router.post('/api/stores/new', storesController.create);

// PUT Store
router.put('/api/store/:store_id/edit', storesController.update);

// DELETE Store
router.delete('/api/stores/:store_id/:merchant_id', storesController.delete)

module.exports = router;
