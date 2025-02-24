const Product = require('../../models/superAdmin/SuperAdminProduct');
const mongoose = require('mongoose');
// Create a new product
// exports.createSuperAdminProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     console.log("product",product)
//     const savedProduct = await product.save();
//     res.status(201).json({ message: 'Product created successfully', product: savedProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create product', error });
//   }
// };


// exports.createSuperAdminProduct = async (req, res) => {
//   try {
//     const {
//       session, UniqueID, PurchaseDate, InvoiceNumber, AssetName, Make,
//       Model, ProductSerialNumber, VendorName, Quantity, RateIncludingTaxes,
//       SimilarName, category, IssuedTo
//     } = req.body;

//     // Ensure that session dates are Date objects
//     session.SessionStartDate = new Date(session.SessionStartDate);
//     session.SessionEndDate = new Date(session.SessionEndDate);
//     session.PurchaseDate = new Date(PurchaseDate); // Convert PurchaseDate

//     // Convert category to ObjectId
//     const categoryId = category;

//     // Create product object
//     const newProduct = new Product({
//       session,
//       UniqueID,
//       PurchaseDate,
//       InvoiceNumber,
//       AssetName,
//       Make,
//       Model,
//       ProductSerialNumber,
//       VendorName,
//       Quantity,
//       RateIncludingTaxes,
//       SimilarName,
//       category: categoryId,
//       IssuedTo
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json({ message: "Product created successfully", product: savedProduct });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Failed to create product", error: error.message });
//   }
// };


// exports.createSuperAdminProduct = async (req, res) => {
//   try {
//     const productList = req.body; // Expecting an array of objects

//     if (!Array.isArray(productList) || productList.length === 0) {
//       return res.status(400).json({ message: "Invalid input: Expected an array of products" });
//     }

//     const savedProducts = [];

//     for (const productData of productList) {
//       const {
//         session, UniqueID, PurchaseDate, InvoiceNumber, AssetName, Make,
//         Model, ProductSerialNumber, VendorName, Quantity, RateIncludingTaxes,
//         SimilarName, category, IssuedTo
//       } = productData;

//       // Ensure that session dates and PurchaseDate are valid Date objects
//       session.SessionStartDate = new Date(session.SessionStartDate);
//       session.SessionEndDate = new Date(session.SessionEndDate);
//       const purchaseDate = new Date(PurchaseDate);

//       // Convert category to ObjectId
//       const categoryId = category;

//       // Create a new product object for each entry
//       const newProduct = new Product({
//         session,
//         UniqueID,
//         PurchaseDate: purchaseDate,
//         InvoiceNumber,
//         AssetName,
//         Make,
//         Model,
//         ProductSerialNumber,
//         VendorName,
//         Quantity,
//         RateIncludingTaxes,
//         SimilarName,
//         category: categoryId,
//         IssuedTo
//       });

//       const savedProduct = await newProduct.save();
//       savedProducts.push(savedProduct);
//     }

//     res.status(201).json({ message: "Products created successfully", products: savedProducts });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Failed to create products", error: error.message });
//   }
// };


// exports.createSuperAdminProduct = async (req, res) => {
//   try {
//     console.log("Received Request Body:", req.body); // ✅ Log the incoming request data

//     // Validate required fields
//     const requiredFields = ["InvoiceNumber", "IssuedTo", "UniqueID", "PurchaseDate"];
//     for (let field of requiredFields) {
//       if (!req.body[field]) {
//         return res.status(400).json({ message: `${field} is required` });
//       }
//     }

//     const product = new Product(req.body);
//     const savedProduct = await product.save();

//     res.status(201).json({ message: "Product created successfully", product: savedProduct });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ message: "Failed to create product", error });
//   }
// };


// exports.createSuperAdminProduct = async (req, res) => {
//   try {
//     let productList = req.body;

//     // Convert object with numeric keys into an array if necessary
//     if (!Array.isArray(productList)) {
//       productList = Object.values(productList);
//     }
    

//     if (productList.length === 0) {
//       return res.status(400).json({ message: "Invalid input: Expected at least one product" });
//     }

//     const savedProducts = [];

//     for (const productData of productList) {
//       const {
//         session, UniqueID, PurchaseDate, InvoiceNumber, AssetName, Make,
//         Model, ProductSerialNumber, VendorName, Quantity, RateIncludingTaxes,
//         SimilarName, category, IssuedTo
//       } = productData;

//       // Ensure that session dates and PurchaseDate are valid Date objects
//       session.SessionStartDate = new Date(session.SessionStartDate);
//       session.SessionEndDate = new Date(session.SessionEndDate);
//       const purchaseDate = new Date(PurchaseDate);

//       // Convert category to ObjectId
//       const categoryId = category;

//       // Create a new product object for each entry
//       const newProduct = new Product({
//         session,
//         UniqueID,
//         PurchaseDate: purchaseDate,
//         InvoiceNumber,
//         AssetName,
//         Make,
//         Model,
//         ProductSerialNumber,
//         VendorName,
//         Quantity,
//         RateIncludingTaxes,
//         SimilarName,
//         category: categoryId,
//         IssuedTo
//       });

//       const savedProduct = await newProduct.save();
//       savedProducts.push(savedProduct);
//     }

//     res.status(201).json({ message: "Products created successfully", products: savedProducts });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Failed to create products", error: error.message });
//   }
// };

exports.createSuperAdminProduct = async (req, res) => {
  try {
    let productList = req.body;

    // Convert a single object {} into an array of one object [{}]
    if (!Array.isArray(productList)) {
      productList = [productList];
    }

    const savedProducts = [];

    for (const productData of productList) {
      const {
        session, UniqueID, PurchaseDate, InvoiceNumber, AssetName, Make,
        Model, ProductSerialNumber, VendorName, Quantity, RateIncludingTaxes,
        SimilarName, category, IssuedTo
      } = productData;

      // Validate and convert session dates
      if (session) {
        session.SessionStartDate = new Date(session.SessionStartDate);
        session.SessionEndDate = new Date(session.SessionEndDate);
      }

      const purchaseDate = new Date(PurchaseDate);
      const categoryId = category;

      // Create and save the product
      const newProduct = new Product({
        session,
        UniqueID,
        PurchaseDate: purchaseDate,
        InvoiceNumber,
        AssetName,
        Make,
        Model,
        ProductSerialNumber,
        VendorName,
        Quantity,
        RateIncludingTaxes,
        SimilarName,
        category: categoryId,
        IssuedTo
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
exports.getAllSuperAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Get a product by ID
exports.getSuperAdminProductById = async (req, res) => {
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
exports.updateSuperAdminProduct = async (req, res) => {
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


exports.deleteSuperAdminProductById = async (req, res) => {
  const { id } = req.params;
  console.log('ID received:', id); // Log the ID received

  try {
    // Ensure the ID is a valid MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: 'Invalid ID format' });
    // }

    const deletedProduct = await Product.findByIdAndDelete({_id:id});
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


exports.deleteAllSuperAdminProducts = async (req, res) => {
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