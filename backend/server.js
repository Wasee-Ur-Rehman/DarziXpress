const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin'); // Importing the admin routes

const app = express();
app.use(cors());
app.use(express.json());

// Admin routes
app.use('/api/admin', adminRoutes); // Use /api/admin to prefix the routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/darziXpress', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error('MongoDB connection error:', err));
