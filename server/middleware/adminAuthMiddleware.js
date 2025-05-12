// middleware/adminAuthMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/schemas/userSchema.js'; // Assuming admin is a type of User
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const adminAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // Fetch the user from DB to verify their current userType
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'User not found, authorization denied.' });
            }

            if (user.userType !== 'admin') { // Check if user is an admin
                return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
            }

            req.user = user; // Attach the full admin user object to req
            next();
        } catch (error) {
            console.error("Admin Auth Middleware: Token verification failed:", error.message);
            return res.status(401).json({ message: 'Token is not valid or expired for admin.' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided, admin authorization denied.' });
    }
};

export default adminAuthMiddleware;