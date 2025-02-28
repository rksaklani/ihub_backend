
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const adminProductRoutes = require('./src/routes/admin/adminProductRoutes');
const superAdminProductRoutes = require('./src/routes/superAdmin/superAdminProductRoutes');
const superAdminCategoryRoutes = require('./src/routes/superAdmin/superAdminCategoryRoutes');
const authRoutes= require('./src/routes/auth/authRoutes');
const cors = require("cors");

// dotenv.config({ path: './config/config.env' });
require('dotenv').config({ path: __dirname + '/config/config.env' });

const app = express();

app.use(cors());
// Middleware
app.use(bodyParser.json())
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use('/api', adminProductRoutes);
app.use('/api', superAdminProductRoutes);
app.use('/api', superAdminCategoryRoutes);
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









