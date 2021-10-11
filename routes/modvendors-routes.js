const express = require('express');
const { createVendor } = require('../controllers/modvendors-controller');

//Router
const router = express.Router();
router.post('/', createVendor);

module.exports = router;