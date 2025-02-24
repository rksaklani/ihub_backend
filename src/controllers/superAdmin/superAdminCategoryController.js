const Category = require('../../models/superAdmin/SuperAdminCategory');
const mongoose = require('mongoose');

// Create a new category
exports.createSuperAdminCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json({ message: 'Category created successfully', category: savedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

// Get all categories
exports.getAllSuperAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

// Get a category by ID
exports.getSuperAdminCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error });
  }
};

// Update a category by ID
exports.updateSuperAdminCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category', error });
  }
};

// Delete a category by ID
// exports.deleteCategoryById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(id);
//     if (!deletedCategory) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete category', error });
//   }
// };



exports.deleteSuperAdminCategoryById = async (req, res) => {
  const { id } = req.params;
  console.log('ID received:', id); // Log the ID received

  try {
    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedCategory = await Category.findByIdAndDelete({_id:id});
    console.log('Deleted product:', deletedCategory); // Log the deleted product

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error); // Log the error
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};