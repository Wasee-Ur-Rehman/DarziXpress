// models/schemas/tailorEarningSchema.js
import mongoose from 'mongoose';

const tailorEarningSchema = new mongoose.Schema({
    tailor: { // The tailor (User ID) who earned this
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    order: { // The completed order
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true, // Ensure only one earning record per order
        index: true,
    },
    orderIdString: { // Denormalized for easier display, from the Order
        type: String,
        required: true,
    },
    serviceNames: [{ // Denormalized list of service names from the order
        type: String,
    }],
    earnedAmount: { // The amount the tailor earned (which is order.totalAmount in this simplified model)
        type: Number,
        required: true,
    },
    completionDate: { // When the order was marked as completed
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true }); // createdAt will track when this earning record was created

const TailorEarning = mongoose.model('TailorEarning', tailorEarningSchema);

export default TailorEarning;