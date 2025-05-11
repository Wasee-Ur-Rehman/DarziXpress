// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const adminRoutes = require('./routes/admin'); 

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/admin', adminRoutes); 

// mongoose.connect('mongodb://localhost:27017/darziXpress', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('MongoDB connected');
//   app.listen(5000, () => console.log('Server running on port 5000'));
// })
// .catch(err => console.error('MongoDB connection error:', err));
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/admin.js'; // ✅ add `.js` in path
import User from './models/User.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes); 

mongoose.connect('mongodb://localhost:27017/darziXpress', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // ✅ Ensure admin exists after DB connection
  await User.ensureAdminExists();

  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error('MongoDB connection error:', err));
