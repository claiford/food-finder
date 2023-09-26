const express = require('express');
const router = express.Router();

const MerchantsController = require('../controllers/MerchantsController');
const StoresController = require('../controllers/StoresController');

// GET /merchant/home :: get all stores belonging to merchant
router.get("/home", MerchantsController.index);

// GET /merchant/store/:store_id :: get single store detail
router.get("/store/:store_id", StoresController.show);

// POST /merchant/store/new :: create new store belonging to merchant
router.post("/store/new", StoresController.create);

// PUT /merchant/store/:store_id/edit :: edit store information
router.put("/store/:store_id/edit", StoresController.update);

module.exports = router;
