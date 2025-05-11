// routes/orderRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Order from '../models/schemas/orderSchema.js'; // Ensure this path is correct
// import User from '../models/schemas/userSchema.js'; // Only if needed for extra checks not covered by authMiddleware
import TailorEarning from '../models/schemas/tailorEarningSchema.js';

const router = express.Router();

// --- Specific string routes BEFORE dynamic parameter routes ---

// @route   GET /api/orders/my-orders
// @desc    Get all orders for the logged-in customer
// @access  Private (Customer)
router.get('/my-orders', authMiddleware, async (req, res) => {
    console.log('--- Reached GET /api/orders/my-orders ---');
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only for customers.' });
    }
    try {
        const orders = await Order.find({ customer: req.user.userId })
            .populate('tailor', 'fullName') // Populate tailor's name
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        res.status(500).json({ message: 'Server Error fetching customer orders' });
    }
});

// @route   GET /api/orders/my-orders/latest/:count
// @desc    Get latest orders summary for the logged-in customer (Dashboard)
// @access  Private (Customer)
router.get('/my-orders/latest/:count', authMiddleware, async (req, res) => {
    console.log('--- Reached GET /api/orders/my-orders/latest/:count ---');
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only for customers.' });
    }
    try {
        const count = parseInt(req.params.count) || 1; // Default to 1 for dashboard summary
        const latestOrders = await Order.find({ customer: req.user.userId })
            .sort({ orderDate: -1 })
            .limit(count)
            .select('orderIdString items status orderDate totalAmount'); // Select only needed fields

        // Define "active" for customer view - typically orders not yet fully resolved
        const activeCustomerOrderStatus = ['Pending', 'In Progress'];
        const activeOrdersCount = await Order.countDocuments({
            customer: req.user.userId,
            status: { $in: activeCustomerOrderStatus }
        });

        res.json({ latestOrders, activeOrdersCount });
    } catch (error) {
        console.error("Error fetching customer orders summary:", error);
        res.status(500).json({ message: 'Server Error fetching customer orders summary' });
    }
});

// @route   GET /api/orders/tailor-orders
// @desc    Get all orders assigned to the logged-in tailor
// @access  Private (Tailor)
router.get('/tailor-orders', authMiddleware, async (req, res) => {
    console.log('--- Reached GET /api/orders/tailor-orders ---');
    if (!req.user || req.user.userType !== 'tailor') {
        console.error('Tailor Orders (/tailor-orders): Access Denied. User:', req.user);
        return res.status(403).json({ message: 'Access denied. Only for tailors.' });
    }
    try {
        const orders = await Order.find({ tailor: req.user.userId })
            .populate('customer', 'fullName email') // Populate customer's details
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching tailor orders:", error);
        res.status(500).json({ message: 'Server Error fetching tailor orders' });
    }
});

// @route   GET /api/orders/tailor-summary
// @desc    Get order summary for the logged-in tailor
// @access  Private (Tailor)
router.get('/tailor-summary', authMiddleware, async (req, res) => {
    console.log('--- Reached GET /api/orders/tailor-summary ---');
    if (!req.user || req.user.userType !== 'tailor') {
        console.error('Tailor Order Summary (/tailor-summary): Access Denied. User:', req.user);
        return res.status(403).json({ message: 'Access denied. Only for tailors.' });
    }
    try {
        const tailorId = req.user.userId;
        // Define "active" for tailor view
        const activeTailorOrderStatus = ['Pending', 'In Progress'];
        const activeOrdersCount = await Order.countDocuments({
            tailor: tailorId,
            status: { $in: activeTailorOrderStatus }
        });

        const latestCompletedOrder = await Order.findOne({
            tailor: tailorId,
            status: 'Completed' // Using 'Completed' as the final positive status
        }).sort({ actualDeliveryDate: -1, updatedAt: -1 }).select('actualDeliveryDate updatedAt'); // Sort by delivery date, then by update

        res.json({
            activeOrdersCount,
            lastCompletedOrderDate: latestCompletedOrder ? (latestCompletedOrder.actualDeliveryDate || latestCompletedOrder.updatedAt) : null
        });
    } catch (error) {
        console.error("Error fetching tailor order summary:", error);
        res.status(500).json({ message: 'Server Error fetching order summary' });
    }
});


// --- General/Dynamic parameter routes AFTER specific string routes ---

// @route   POST /api/orders
// @desc    Create a new order (customer places an order)
// @access  Private (Customer)
router.post('/', authMiddleware, async (req, res) => {
    console.log('--- Reached POST /api/orders ---');
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only customers can create orders.' });
    }
    try {
        const { tailorId, tailorName, items, totalAmount, shippingAddress, notesToTailor } = req.body;

        // Basic validation
        if (!tailorId || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
            return res.status(400).json({ message: 'Missing or invalid required order details (tailorId, items array, totalAmount).' });
        }
        // Further validation for items array elements can be added here
        for (const item of items) {
            if (!item.serviceName || !item.quantity || item.pricePerItem === undefined) {
                return res.status(400).json({ message: 'Each item must have serviceName, quantity, and pricePerItem.' });
            }
        }

        const newOrder = new Order({
            customer: req.user.userId,
            tailor: tailorId,
            tailorName, // Denormalized for display
            items,
            totalAmount,
            shippingAddress,
            notesToTailor,
            status: 'Pending', // Initial status set to 'Pending'
        });

        const savedOrder = await newOrder.save();
        // TODO: Notify tailor about the new order (e.g., via email, push notification, WebSocket)
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server Error creating order.' });
    }
});

// @route   PUT /api/orders/:orderId/status
// @desc    Tailor updates the status of an order
// @access  Private (Tailor)
router.put('/:orderId/status', authMiddleware, async (req, res) => {
    console.log(`--- Reached PUT /api/orders/:orderId/status with orderId: ${req.params.orderId} ---`);
    if (!req.user || req.user.userType !== 'tailor') {
        return res.status(403).json({ message: 'Access denied. Only tailors can update order status.' });
    }

    const { status } = req.body;
    const { orderId } = req.params;

    if (!status) {
        return res.status(400).json({ message: 'New status is required.' });
    }

    // Use the simplified list of statuses
    const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status value. Allowed: ${allowedStatuses.join(', ')}` });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.tailor.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this order.' });
        }

        // Logic for specific status transitions
        if (order.status === 'Completed' && status !== 'Completed') {
            return res.status(400).json({ message: 'Cannot change status from Completed without specific override logic.' });
        }
        if (order.status === 'Cancelled' && status !== 'Cancelled') {
            return res.status(400).json({ message: 'Cannot change status from Cancelled without specific override logic.' });
        }


        order.status = status;
        if (status === 'Completed' && !order.actualDeliveryDate) { // Changed from 'Delivered'
            order.actualDeliveryDate = new Date();
        }
        // If you re-introduce 'Shipped', you'd handle trackingNumber here:
        // if (status === 'Shipped' && req.body.trackingNumber) {
        //     order.trackingNumber = req.body.trackingNumber;
        // }

        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } catch (error) {
        console.error("Error updating order status:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: `Invalid Order ID format for status update: ${orderId}` });
        }
        res.status(500).json({ message: 'Server error updating order status.' });
    }
});


// @route   GET /api/orders/:id
// @desc    Get a specific order by its MongoDB ID (for customer or involved tailor)
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
    console.log(`--- Reached GET /api/orders/:id with id: ${req.params.id} ---`);
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', 'fullName email')
            .populate('tailor', 'fullName email'); // Populate details

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Authorization: Ensure user is the customer or the tailor for this order
        if (order.customer._id.toString() !== req.user.userId && order.tailor._id.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }
        res.json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: `Invalid Order ID format: ${req.params.id}` });
        }
        res.status(500).json({ message: 'Server Error fetching order details' });
    }
});

router.put('/:orderId/status', authMiddleware, async (req, res) => {
    if (!req.user || req.user.userType !== 'tailor') {
        return res.status(403).json({ message: 'Access denied. Only tailors can update order status.' });
    }

    const { status } = req.body;
    const { orderId } = req.params;

    if (!status) {
        return res.status(400).json({ message: 'New status is required.' });
    }
    const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status value. Allowed: ${allowedStatuses.join(', ')}` });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        if (order.tailor.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this order.' });
        }

        const previousStatus = order.status;
        order.status = status;

        if (status === 'Completed') {
            if (!order.actualDeliveryDate) {
                order.actualDeliveryDate = new Date();
            }
            order.paymentStatus = 'Paid'; // Assuming payment is confirmed upon completion

            // Check if an earning record already exists for this order to prevent duplicates
            const existingEarning = await TailorEarning.findOne({ order: order._id });
            if (!existingEarning) {
                const newEarning = new TailorEarning({
                    tailor: order.tailor,
                    order: order._id,
                    orderIdString: order.orderIdString,
                    serviceNames: order.items.map(item => item.serviceName),
                    earnedAmount: order.totalAmount, // Tailor earns the full order amount
                    completionDate: order.actualDeliveryDate || new Date(),
                });
                await newEarning.save();
                console.log(`Earning record created for order ${order.orderIdString}. Amount: ${newEarning.earnedAmount}`);
            } else {
                console.log(`Earning record for order ${order.orderIdString} already exists.`);
            }
        } else if (status === 'Cancelled' && previousStatus === 'Completed') {
            // If an order is cancelled AFTER being completed, we should delete the earning record.
            console.log(`Order ${order.orderIdString} cancelled after completion. Attempting to remove earning record.`);
            await TailorEarning.deleteOne({ order: order._id });
            console.log(`Earning record for order ${order.orderIdString} removed due to cancellation.`);
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } catch (error) {
        console.error("Error updating order status and/or earnings:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: `Invalid Order ID format: ${orderId}` });
        }
        res.status(500).json({ message: 'Server error updating order status.' });
    }
});

export default router;