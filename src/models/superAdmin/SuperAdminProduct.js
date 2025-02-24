const mongoose = require('mongoose');



const superAdminProductSchema = new mongoose.Schema({
  session: { // Nested session object
    SessionStartDate: { type: Date, required: true },
    SessionEndDate: { type: Date, required: true },
  },
  UniqueID: { type: String, required: true, },
  PurchaseDate: { type: Date, required: true },
  InvoiceNumber: { type: String, required: true },
  AssetName: { type: String, required: true },
  Make: { type: String, required: true },
  Model: { type: String, required: true },
  ProductSerialNumber: { type: String, required: true },
  VendorName: { type: String, required: true },
  Quantity: { type: Number, required: true },
  RateIncludingTaxes: { type: String, required: true },
  SimilarName: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperAdminCategory' }, // Reference to Category// Nested category array
  IssuedTo: { type: String, required: true },
}, { timestamps: true });
superAdminProductSchema.index({ UniqueID: 1 }); 
module.exports = mongoose.model('SuperAdminProduct', superAdminProductSchema);
