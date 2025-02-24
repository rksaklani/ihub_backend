// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// exports.authenticateToken = (req, res, next) => {
//   const token = req.cookies.token; // Assuming the token is stored in cookies
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized, token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to the request
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Unauthorized, invalid token' });
//   }
// };

exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};


exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.id; // Save user ID for later use
    req.userRole = decoded.role; // Save user role for later use
    next();
  });
};

