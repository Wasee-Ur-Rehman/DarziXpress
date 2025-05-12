// server.js
import express from 'express';
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import cors from 'cors';
import measurementRoutes from './routes/measurementRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin.js'; 
import User from './models/schemas/userSchema.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';
dotenv.config();
connectDB();

// Ensure admin user exists before starting the server
User.ensureAdminExists().catch(err => {
  console.error("Error ensuring admin exists:", err);
  process.exit(1); // Stop the server if admin creation fails
});
const app = express();

// Allow CORS from the frontend port (e.g., 5173 for Vite or 3000 for React)
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/admin', adminOrderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
