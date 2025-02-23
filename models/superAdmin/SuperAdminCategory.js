const mongoose = require('mongoose');

const superAdminCategorySchema = new mongoose.Schema({

  CategoryType: {
    Tangible: { AssetName: { type: String } },
    InTangible: { AssetName: { type: String } },
  },

  
  
}, { timestamps: true });

module.exports = mongoose.model('SuperAdminCategory', superAdminCategorySchema);
