// routes/authRoutes.js
const express = require('express');
const {
  login,
  register,
  forgetPassword,
  resetPassword,
  getLogin,
} = require('../../controllers/auth/authController');
const { verifyToken, authorizeRole } = require('../../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', register); // Register a new user
router.post('/login', login);       // Login a user
router.post('/forget-password', forgetPassword); // Forget Password
router.post('/reset-password', resetPassword);   // Reset Password

// Protected Routes (Role-Based)
router.get(
  '/admin-dashboard',
  verifyToken,
  authorizeRole(['admin']),
  (req, res) => {
    res.status(200).json({ message: 'Welcome to Admin Dashboard' });
  }
);

router.get(
  '/superadmin-dashboard',
  verifyToken,
  authorizeRole(['superadmin']),
  (req, res) => {
    res.status(200).json({ message: 'Welcome to Superadmin Dashboard' });
  }
);


router.get('/me', verifyToken, getLogin); // Use the new function


module.exports = router;
