// routes/orderRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Order from '../models/schemas/orderSchema.js';
import TailorEarning from '../models/schemas/tailorEarningSchema.js';
// import User from '../models/schemas/userSchema.js'; // Only if you need to check User model directly for tailor existence beyond auth

const router = express.Router();

// --- Specific string routes BEFORE dynamic parameter routes ---

// @route   GET /api/orders/my-orders
// @desc    Get all orders for the logged-in customer
// @access  Private (Customer)
router.get('/my-orders', authMiddleware, async (req, res) => {
    console.log('--- API Reached: GET /api/orders/my-orders ---');
    console.log('Authenticated User (my-orders):', JSON.stringify(req.user, null, 2));
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only for customers.' });
    }
    try {
        const orders = await Order.find({ customer: req.user.userId })
            .populate('tailor', 'fullName') // Populate tailor's name for display
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching customer orders (/my-orders):", error);
        res.status(500).json({ message: 'Server Error fetching customer orders' });
    }
});

// @route   GET /api/orders/my-orders/latest/:count
// @desc    Get latest orders summary for the logged-in customer (Customer Dashboard)
// @access  Private (Customer)
router.get('/my-orders/latest/:count', authMiddleware, async (req, res) => {
    console.log('--- API Reached: GET /api/orders/my-orders/latest/:count ---');
    console.log('Authenticated User (my-orders/latest):', JSON.stringify(req.user, null, 2));
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only for customers.' });
    }
    try {
        const count = parseInt(req.params.count) || 1; // Default to 1 for dashboard summary
        const latestOrders = await Order.find({ customer: req.user.userId })
            .sort({ orderDate: -1 })
            .limit(count)
            .select('orderIdString items status orderDate totalAmount');

        const activeCustomerOrderStatus = ['Pending', 'In Progress'];
        const activeOrdersCount = await Order.countDocuments({
            customer: req.user.userId,
            status: { $in: activeCustomerOrderStatus }
        });

        res.json({ latestOrders, activeOrdersCount });
    } catch (error) {
        console.error("Error fetching customer orders summary (/my-orders/latest):", error);
        res.status(500).json({ message: 'Server Error fetching customer orders summary' });
    }
});

// @route   GET /api/orders/tailor-orders
// @desc    Get all orders assigned to the logged-in tailor
// @access  Private (Tailor)
router.get('/tailor-orders', authMiddleware, async (req, res) => {
    console.log('--- API Reached: GET /api/orders/tailor-orders ---');
    console.log('Authenticated User (tailor-orders):', JSON.stringify(req.user, null, 2));
    if (!req.user || req.user.userType !== 'tailor') {
        return res.status(403).json({ message: 'Access denied. Only for tailors.' });
    }
    try {
        const orders = await Order.find({ tailor: req.user.userId })
            .populate('customer', 'fullName email')
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching tailor orders (/tailor-orders):", error);
        res.status(500).json({ message: 'Server Error fetching tailor orders' });
    }
});

// @route   GET /api/orders/tailor-summary
// @desc    Get order summary for the logged-in tailor (Tailor Dashboard)
// @access  Private (Tailor)
router.get('/tailor-summary', authMiddleware, async (req, res) => {
    console.log('--- API Reached: GET /api/orders/tailor-summary ---');
    console.log('Authenticated User (tailor-summary):', JSON.stringify(req.user, null, 2));
    if (!req.user || req.user.userType !== 'tailor') {
        return res.status(403).json({ message: 'Access denied. Only for tailors.' });
    }
    try {
        const tailorId = req.user.userId;
        const activeTailorOrderStatus = ['Pending', 'In Progress'];
        const activeOrdersCount = await Order.countDocuments({
            tailor: tailorId,
            status: { $in: activeTailorOrderStatus }
        });

        const latestCompletedOrder = await Order.findOne({
            tailor: tailorId,
            status: 'Completed'
        }).sort({ actualDeliveryDate: -1, updatedAt: -1 }).select('actualDeliveryDate updatedAt');

        res.json({
            activeOrdersCount,
            lastCompletedOrderDate: latestCompletedOrder ? (latestCompletedOrder.actualDeliveryDate || latestCompletedOrder.updatedAt) : null
        });
    } catch (error) {
        console.error("Error fetching tailor order summary (/tailor-summary):", error);
        res.status(500).json({ message: 'Server Error fetching order summary' });
    }
});


// --- GENERAL / ACTION ROUTES ---

// @route   POST /api/orders
// @desc    Customer creates a new order
// @access  Private (Customer)
router.post('/', authMiddleware, async (req, res) => {
    console.log('--- API Reached: POST /api/orders ---');
    console.log('Authenticated User (create order):', JSON.stringify(req.user, null, 2));
    console.log('Request Body (create order):', JSON.stringify(req.body, null, 2));

    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only customers can create orders.' });
    }
    try {
        const {
            tailorId, tailorName, serviceId, serviceName, servicePrice,
            quantity = 1, shippingAddress, notesToTailor, selectedMeasurementProfileId,
        } = req.body;

        if (!tailorId || !serviceId || !serviceName || servicePrice === undefined || !shippingAddress || !shippingAddress.address || !shippingAddress.city) {
            return res.status(400).json({ message: 'Missing required order details: tailorId, serviceId, serviceName, servicePrice, and complete shippingAddress are required.' });
        }
        if (!selectedMeasurementProfileId) {
            return res.status(400).json({ message: 'Please select a measurement profile for this order.' });
        }

        const items = [{ serviceId, serviceName, quantity, pricePerItem: servicePrice }];
        const totalAmount = servicePrice * quantity;

        const newOrder = new Order({
            customer: req.user.userId,
            tailor: tailorId,
            tailorName, items, totalAmount, shippingAddress, notesToTailor,
            linkedMeasurementProfile: selectedMeasurementProfileId,
            status: 'Pending', // Default status from schema is 'Pending'
        });
        // orderIdString will be auto-generated by pre-save hook

        const savedOrder = await newOrder.save();
        console.log('Order created successfully:', savedOrder._id, savedOrder.orderIdString);
        // TODO: Notify tailor about the new order
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order (POST /api/orders):", error);
        if (error.name === 'ValidationError') {
            let messages = [];
            for (let field in error.errors) { messages.push(error.errors[field].message); }
            return res.status(400).json({ message: "Order validation failed.", details: messages.join('; ') });
        }
        res.status(500).json({ message: 'Server Error creating order.' });
    }
});

// @route   PUT /api/orders/:orderId/status
// @desc    Tailor updates the status of an order AND handles earnings
// @access  Private (Tailor)
router.put('/:orderId/status', authMiddleware, async (req, res) => {
    // ... (existing checks for tailor auth, order existence, status validation)
    try {
        const order = await Order.findById(orderId);
        // ... (checks if order exists, belongs to tailor, valid status transition) ...

        const previousStatus = order.status;
        order.status = status;

        if (status === 'Completed') {
            if (!order.actualDeliveryDate) order.actualDeliveryDate = new Date();
            order.paymentStatus = 'Paid';

            // Handle Tailor Earning (full amount as per previous logic)
            const existingTailorEarning = await TailorEarning.findOne({ order: order._id });
            if (!existingTailorEarning) {
                const newTailorEarning = new TailorEarning({
                    tailor: order.tailor,
                    order: order._id,
                    orderIdString: order.orderIdString,
                    serviceNames: order.items.map(item => item.serviceName),
                    earnedAmount: order.totalAmount, // Tailor gets full amount
                    completionDate: order.actualDeliveryDate || new Date(),
                });
                await newTailorEarning.save();
                console.log(`Tailor Earning record created for order ${order.orderIdString}.`);
            }

            // --- NEW: Handle Platform Earning ---
            const existingPlatformEarning = await PlatformEarning.findOne({ order: order._id });
            if (!existingPlatformEarning) {
                const newPlatformEarning = new PlatformEarning({
                    order: order._id,
                    orderIdString: order.orderIdString,
                    tailor: order.tailor,
                    commissionAmount: PLATFORM_COMMISSION_FEE,
                    earnedAt: order.actualDeliveryDate || new Date(),
                });
                await newPlatformEarning.save();
                console.log(`Platform Earning record created for order ${order.orderIdString}.`);
            }
            // --- END NEW ---

        } else if (status === 'Cancelled' && previousStatus === 'Completed') {
            await TailorEarning.deleteOne({ order: order._id });
            await PlatformEarning.deleteOne({ order: order._id }); // <--- Also delete platform earning
            console.log(`Earning records (tailor & platform) for order ${order.orderIdString} removed due to cancellation.`);
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) { /* ... */ }
});

// @route   GET /api/orders/:id  <--- MOST GENERAL DYNAMIC GET ROUTE AT THE END of GETs
// @desc    Get a specific order by its MongoDB ID (for customer or involved tailor)
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
    console.log(`--- API Reached: GET /api/orders/:id with id: ${req.params.id} ---`);
    console.log('Authenticated User (get order by id):', JSON.stringify(req.user, null, 2));
    try {
        const order = await Order.findById(req.params.id)
            .populate('customer', 'fullName email') // Populate customer details
            .populate('tailor', 'fullName email');   // Populate tailor details

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Authorization: Ensure user is the customer or the tailor for this order
        if (order.customer._id.toString() !== req.user.userId && order.tailor._id.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }
        res.json(order);
    } catch (error) {
        console.error(`Error fetching order details for ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: `Invalid Order ID format: ${req.params.id}` });
        }
        res.status(500).json({ message: 'Server Error fetching order details' });
    }
});

// routes/orderRoutes.js
// ... (other imports and routes) ...

// @route   DELETE /api/orders/:orderId
// @desc    Customer deletes their own order if it's in an allowed state
// @access  Private (Customer)
router.delete('/:orderId', authMiddleware, async (req, res) => {
    console.log(`--- API Reached: DELETE /api/orders/${req.params.orderId} ---`);
    if (!req.user || req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Only customers can delete their orders.' });
    }

    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Ensure the order belongs to this customer
        if (order.customer.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this order.' });
        }

        // --- BUSINESS LOGIC: Check if the order status allows deletion ---
        const deletableStatuses = ['Pending', 'In Progress'];
        if (!deletableStatuses.includes(order.status)) {
            return res.status(400).json({
                message: `Cannot delete order. Order status is currently '${order.status}'. Only orders that are 'Pending' or 'In Progress' can be deleted by the customer.`
            });
        }
        // --- END BUSINESS LOGIC ---

        // If an order is deleted, there should be no associated earning record yet,
        // as earnings are created upon 'Completed' status. So, no TailorEarning cleanup needed here.

        await Order.findByIdAndDelete(orderId);
        console.log(`Order ${order.orderIdString} (ID: ${orderId}) deleted by customer ${req.user.userId}`);
        res.json({ message: 'Order deleted successfully.' });

    } catch (error) {
        console.error("Error deleting order:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: `Invalid Order ID format: ${orderId}` });
        }
        res.status(500).json({ message: 'Server error deleting order.' });
    }
});

export default router;