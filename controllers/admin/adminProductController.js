const Product = require('../../models/admin/AdminProduct');
const mongoose = require('mongoose');
// Create a new product
// exports.createAdminProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     console.log(product)
//     const savedProduct = await product.save();
//     res.status(201).json({ message: 'Product created successfully', product: savedProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create product', error });
//   }
// };








// const Product = require('../models/Product'); // Ensure this path is correct

exports.createAdminProduct = async (req, res) => {
  try {
    let productList = req.body;

    // Convert a single object {} into an array of one object [{}]
    if (!Array.isArray(productList)) {
      productList = [productList];
    }

    const savedProducts = [];

    // Function to generate the next UniqueID safely
    const generateUniqueID = async () => {
      // Find the latest product and ensure uniqueness
      const latestProduct = await Product.findOne().sort({ UniqueID: -1 });

      let lastID = latestProduct ? latestProduct.UniqueID : 'ihub/000';
      let nextNumber = parseInt(lastID.split('/')[1], 10) + 1;
      let newID = `ihub/${String(nextNumber).padStart(3, '0')}`;

      // Ensure the new ID doesn't already exist
      while (await Product.exists({ UniqueID: newID })) {
        nextNumber += 1;
        newID = `ihub/${String(nextNumber).padStart(3, '0')}`;
      }

      return newID;
    };

    for (const productData of productList) {
      const { ItemName, Make, ModelNumber, SerialNumber, Quantity, IssuedTo } = productData;

      // Generate a unique UniqueID
      const UniqueID = await generateUniqueID();

      // Create and save the product
      const newProduct = new Product({
        UniqueID,
        ItemName,
        Make,
        ModelNumber,
        SerialNumber,
        Quantity,
        IssuedTo,
      });

      const savedProduct = await newProduct.save();
      savedProducts.push(savedProduct);
    }

    res.status(201).json({ message: "Products created successfully", products: savedProducts });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to create products", error: error.message });
  }
};

// Get all products
exports.getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Get a product by ID
exports.getAdminProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

// Update a product by ID
exports.updateAdminProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

// Delete a product by ID
// exports.deleteProductById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete product', error });
//   }
// };


exports.deleteAdminProductById = async (req, res) => {
  const { id } = req.params;
  console.log('ID received:', id); // Log the ID received

  try {
    // Ensure the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log('Deleted product:', deletedProduct); // Log the deleted product

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error); // Log the error
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};



exports.deleteAllAdminProducts = async (req, res) => {
  console.log('Deleting all products'); // Log that the deletion is being attempted

  try {
    const deletedProducts = await Product.deleteMany({});
    console.log('Deleted products:', deletedProducts); // Log the result of deletion

    if (deletedProducts.deletedCount === 0) {
      return res.status(404).json({ message: 'No products found to delete' });
    }

    res.status(200).json({ message: `${deletedProducts.deletedCount} products deleted successfully` });
  } catch (error) {
    console.error('Error deleting products:', error); // Log the error
    res.status(500).json({ message: 'Failed to delete products', error });
  }
};