const express = require('express');
const router = express.Router();
const {
  createSuperAdminCategory,
  getAllSuperAdminCategories,
  getSuperAdminCategoryById,
  updateSuperAdminCategory,
  deleteSuperAdminCategoryById,
} = require('../../controllers/superAdmin/superAdminCategoryController');


// Create a new product
router.post('/super-admin/category', createSuperAdminCategory);

// Get all products
router.get('/super-admin/category', getAllSuperAdminCategories);

// Get a product by ID
router.get('/super-admin/category/:id', getSuperAdminCategoryById);

// Update a product by ID
router.put('/super-admin/category/:id', updateSuperAdminCategory);

// Delete a product by ID
router.delete('/super-admin/category/:id', deleteSuperAdminCategoryById);

module.exports = router;
