const express = require('express');
const { createProduct, readProducts, updateProduct, deleteProduct } = require('../controllers/modproducts-controller');

//Router
const router = express.Router();
router.post('/', createProduct);
router.get('/', readProducts);
router.get('/:id', readProducts);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;