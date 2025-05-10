// server.js
import express from 'express';
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectDB();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
