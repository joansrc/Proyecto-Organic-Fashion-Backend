const express = require('express');
const { createProduct, readproducts, updateProduct, deleteProduct, readproducts, updateProduct, deleteProduct } = require('../controllers/modproducts-controller');

//Router
const router = express.Router();
router.post('/', createProduct);
router.get('/', readproducts);
router.get('/:id', readproducts);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;