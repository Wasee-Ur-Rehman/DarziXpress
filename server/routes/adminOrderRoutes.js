// routes/adminOrderRoutes.js
import express from 'express';
import adminAuthMiddleware from '../middleware/adminAuthMiddleware.js';
import Order from '../models/schemas/orderSchema.js';

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Admin gets all orders with optional status filter
// @access  Private (Admin)
router.get('/', adminAuthMiddleware, async (req, res) => {
    const { status, page = 1, limit = 10, search } = req.query;
    const query = {};

    if (status && status !== 'All' && status !== '') {
        query.status = status;
    }

    // Basic search functionality (can be expanded)
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.$or = [
            { orderIdString: searchRegex },
            { tailorName: searchRegex },
            // Add more fields to search if needed, e.g., customer name (requires populating customer first)
            // If searching customer name, you'd need to do a more complex query or an aggregation.
            // For simplicity, keeping it to fields directly on the Order or denormalized.
        ];
    }


    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        populate: [ // Populate multiple paths
            { path: 'customer', select: 'fullName email' },
            { path: 'tailor', select: 'fullName email' }
        ],
        sort: { orderDate: -1 },
        lean: true // For better performance with Mongoose-Paginate-v2
    };

    try {
        // If you install mongoose-paginate-v2, you can use:
        // const result = await Order.paginate(query, options);
        // res.json({
        //     orders: result.docs,
        //     totalPages: result.totalPages,
        //     currentPage: result.page,
        //     totalOrders: result.totalDocs,
        // });

        // Manual pagination if not using mongoose-paginate-v2:
        const skip = (options.page - 1) * options.limit;
        const orders = await Order.find(query)
            .populate(options.populate)
            .sort(options.sort)
            .skip(skip)
            .limit(options.limit);

        const totalOrders = await Order.countDocuments(query);

        res.json({
            orders,
            totalPages: Math.ceil(totalOrders / options.limit),
            currentPage: options.page,
            totalOrders,
        });

    } catch (error) {
        console.error("Error fetching orders for admin:", error);
        res.status(500).json({ message: 'Server error fetching orders.' });
    }
});

export default router;