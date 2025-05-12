// routes/adminOrderRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Order from '../models/schemas/orderSchema.js';

const router = express.Router();

// @route   GET /api/orders/admin/filter
// @desc    Admin: Get orders filtered by status
// @access  Private (Admin)
router.get('/filter', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.query;

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status query parameter is required.' });
        }

        const validStatuses = ['Pending Confirmation', 'In Progress', 'Shipped', 'Delivered', 'Cancelled', 'Awaiting Payment'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided.' });
        }

        const orders = await Order.find({ status })
            .sort({ orderDate: -1 });

        if (orders.length === 0) {
            return res.status(404).json({ message: `No orders found with status: ${status}` });
        }

        res.json(orders);
    } catch (error) {
        console.error("Error fetching filtered orders for admin:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PATCH /api/orders/admin/status/:orderId
// @desc    Admin: Update order status
// @access  Private (Admin)
router.patch('/status/:id', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const { status } = req.body;

        const validStatuses = ['Pending Confirmation', 'In Progress', 'Shipped', 'Delivered', 'Cancelled', 'Awaiting Payment'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error("Error updating order status for admin:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/orders/admin/all
// @desc    Admin: Get all orders in the system
// @access  Private (Admin)
router.get('/all', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    try {
        const orders = await Order.find().sort({ orderDate: -1 });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orders);
    } catch (error) {
        console.error("Error fetching all orders for admin:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/orders/admin/active-count
// @desc    Admin: Get the count of active orders
// @access  Private (Admin)
router.get('/active-count', authMiddleware, async (req, res) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    try {
        const activeOrdersCount = await Order.countDocuments({
            status: { $in: ['Pending Confirmation', 'In Progress', 'Shipped', 'Awaiting Payment'] }
        });

        res.json({ activeOrdersCount });
    } catch (error) {
        console.error("Error fetching active orders count for admin:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
