// controllers/orderController.js
import Order from '../models/schemas/orderSchema.js';

export const getOrderSummary = async (req, res) => {
    try {
        const status = req.query.status; 
        let filter = {};

        if (status) {
            filter.status = status;
        }

        const orders = await Order.find(filter).populate('customer tailor').exec();

        res.status(200).json({
            message: 'Order summary fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching order summary',
            error: error.message,
        });
    }
};
