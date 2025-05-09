// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/schemas/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

// Register a user
router.post('/signup', async (req, res) => {
    const { fullName, email, password, phoneNumber, city, userType } = req.body;

    try {
        // Validate required fields
        if (!fullName || !email || !password || !phoneNumber || !city || !userType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Check if phone number already exists
        const existingPhoneNumber = await User.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(409).json({ message: 'Phone number already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            city,
            userType,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
// routes/auth.js
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email ' });
        }

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid  password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        // Return the token and user type to the client
        res.json({
            message: 'Login successful',
            token,
            userType: user.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

export default router;
