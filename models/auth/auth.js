// models/auth.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    // default: 'superadmin',
  },
}, { timestamps: true });

// Hash password before saving
authSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
