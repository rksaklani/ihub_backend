const mongoose = require('mongoose');
const adminProductSchema = new mongoose.Schema({
  UniqueID: { type: String, required: true },
  ItemName: { type: String, required: true },
  Make: { type: String, required: true },
  ModelNumber: { type: String, required: true },
  SerialNumber: { type: String, required: true },
  Quantity: { type: Number, required: true },
  IssuedTo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AdminProduct', adminProductSchema);
