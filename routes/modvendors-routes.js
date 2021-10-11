const express = require('express');
const { createVendor, readVendors } = require('../controllers/modvendors-controller');

//Router
const router = express.Router();
router.post('/', createVendor);
router.get('/', readVendors);

module.exports = router;