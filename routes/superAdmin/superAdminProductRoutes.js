const express = require('express');
const {
  createSuperAdminProduct,
  getAllSuperAdminProducts,
  getSuperAdminProductById,
  updateSuperAdminProduct,
  deleteSuperAdminProductById,
  deleteAllSuperAdminProducts,
} = require('../../controllers/superAdmin/superAdminProductController');

const router = express.Router();

// Create a new product
router.post('/super-admin/products', createSuperAdminProduct);

// Get all products
router.get('/super-admin/products', getAllSuperAdminProducts);

// Get a product by ID
router.get('/super-admin/products/:id', getSuperAdminProductById);

// Update a product by ID
router.put('/super-admin/products/:id', updateSuperAdminProduct);

// Delete a product by ID
router.delete('/super-admin/products/:id', deleteSuperAdminProductById);

router.delete('/super-admin/products/', deleteAllSuperAdminProducts);


module.exports = router;
