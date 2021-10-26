const express = require('express');
const { createVenta, readVentas, updateVenta, deleteVenta } = require('../controllers/modventas-controller');

//Router
const router = express.Router();
router.post('/', createVenta);
router.get('/', readVentas);
router.get('/:id', readVentas);
router.patch('/:id', updateVenta);
router.delete('/:id', deleteVenta);

module.exports = router;