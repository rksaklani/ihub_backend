const mongoose = require('mongoose');

const superAdminCategorySchema = new mongoose.Schema({
  AssetName: { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model('SuperAdminCategory', superAdminCategorySchema);
