import express from 'express';
const router = express.Router();

import Tailor from '../models/Tailor.js';
import Order from '../models/Order.js';
import moment from 'moment';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Fetch overview data (total profits, pending tailor requests, disabled tailors)
router.get('/overview', async (req, res) => {
  try {
    const totalProfitResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalProfit = totalProfitResult[0]?.total || 0;

    const pendingTailors = await Tailor.countDocuments({ status: 'pending' });
    const disabledTailors = await Tailor.countDocuments({ status: 'disabled' });

    res.json({
      totalProfit,
      pendingTailors,
      disabledTailors
    });
  } catch (error) {
    console.error('Overview fetch failed:', error);
    res.status(500).json({ message: 'Server error while fetching overview data' });
  }
});

// Fetch pending tailor requests
router.get('/tailor-requests', async (req, res) => {
  try {
    const pendingTailors = await Tailor.find({ status: 'pending' });
    res.json(pendingTailors);
  } catch (error) {
    console.error('Error fetching tailor requests:', error);
    res.status(500).json({ message: 'Server error while fetching tailor requests' });
  }
});

// Accept a tailor request
router.post('/tailor-requests/:id/accept', async (req, res) => {
  try {
    await Tailor.findByIdAndUpdate(req.params.id, { status: 'active' });
    res.json({ message: 'Tailor request accepted.' });
  } catch (error) {
    console.error('Error accepting tailor request:', error);
    res.status(500).json({ message: 'Server error while accepting tailor request' });
  }
});

// Decline a tailor request
router.post('/tailor-requests/:id/decline', async (req, res) => {
  try {
    await Tailor.findByIdAndUpdate(req.params.id, { status: 'declined' });
    res.json({ message: 'Tailor request declined.' });
  } catch (error) {
    console.error('Error declining tailor request:', error);
    res.status(500).json({ message: 'Server error while declining tailor request' });
  }
});

router.get("/orders-summary", async (req, res) => {
  try {
    const tailors = await Tailor.find({}); // Adjust query if needed

    let activeOrders = [];
    let completedOrders = [];
    let declinedOrders = [];

    tailors.forEach((tailor) => {
      tailor.orders.forEach((order) => {
        if (order.status === "active") activeOrders.push(order);
        else if (
          order.status === "completed" &&
          moment(order.completedAt).isSame(moment(), "month")
        )
          completedOrders.push(order);
        else if (order.status === "declined") declinedOrders.push(order);
      });
    });

    res.json({ activeOrders, completedOrders, declinedOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order summary" });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const admin = await User.findOne({ userType: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT admin profile
router.put('/profile', async (req, res) => {
  try {
    const admin = await User.findOne({ userType: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const { fullName, email, phoneNumber, city, password } = req.body;

    if (fullName) admin.fullName = fullName;
    if (email) admin.email = email;
    if (phoneNumber) admin.phoneNumber = phoneNumber;
    if (city) admin.city = city;
    if (password) admin.password = await bcrypt.hash(password, 10);

    await admin.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
