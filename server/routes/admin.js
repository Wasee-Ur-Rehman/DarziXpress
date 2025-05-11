const express = require('express');
const router = express.Router();
const Tailor = require('../models/Tailor'); // Assuming your Tailor model is here
const Order = require('../models/Order'); // Assuming your Order model is here

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

module.exports = router;
