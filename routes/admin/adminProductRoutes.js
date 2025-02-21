const express = require('express');
const {
  createAdminProduct,
  getAllAdminProducts,
  getAdminProductById,
  updateAdminProduct,
  deleteAdminProductById,
  deleteAllAdminProducts
} = require('../../controllers/admin/adminProductController');

const router = express.Router();

// Create a new product
router.post('/admin/products', createAdminProduct);

// Get all products
router.get('/admin/products', getAllAdminProducts);

// Get a product by ID
router.get('/admin/products/:id', getAdminProductById);

// Update a product by ID
router.put('/admin/products/:id', updateAdminProduct);

// Delete a product by ID
router.delete('/admin/products/:id', deleteAdminProductById);

router.delete('/admin/products/', deleteAllAdminProducts);


module.exports = router;
