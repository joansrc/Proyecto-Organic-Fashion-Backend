const express = require('express');
const { createVendor, readVendors, updateVendor } = require('../controllers/modvendors-controller');

//Router
const router = express.Router();
router.post('/', createVendor);
router.get('/', readVendors);
router.get('/:id', readVendors);
router.patch('/:id', updateVendor);

module.exports = router;