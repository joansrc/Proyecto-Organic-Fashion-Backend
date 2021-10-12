const express = require('express');
const { createVendor, readVendors, updateVendor, deleteVendor } = require('../controllers/modvendors-controller');

//Router
const router = express.Router();
router.post('/', createVendor);
router.get('/', readVendors);
router.get('/:id', readVendors);
router.patch('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;