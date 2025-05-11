// models/schemas/orderSchema.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceOffering' }, // Assuming you'll have a ServiceOffering schema
    serviceName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    pricePerItem: { type: Number, required: true },
    // You might add specific measurements used for this item if they differ from profile
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderIdString: { type: String, required: true, unique: true }, // User-friendly Order ID like ORD12345
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tailor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // Assuming tailor is also a User with userType 'tailor'
    tailorName: { type: String, required: true }, // Denormalized for quick display
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Pending Confirmation', 'In Progress', 'Shipped', 'Delivered', 'Cancelled', 'Awaiting Payment'],
        default: 'Pending Confirmation',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending',
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    orderDate: { type: Date, default: Date.now },
    estimatedDeliveryDate: { type: Date },
    actualDeliveryDate: { type: Date },
    notesToTailor: { type: String },
    cancellationReason: { type: String },
    trackingNumber: { type: String },
    // You might also want to store measurements snapshot used for this specific order
}, { timestamps: true });

// Helper to generate user-friendly Order ID (example)
orderSchema.pre('save', async function (next) {
    if (this.isNew && !this.orderIdString) {
        // Example: ORD + timestamp + random part. Make this more robust for production.
        const count = await mongoose.model('Order').countDocuments();
        this.orderIdString = `ORD${new Date().getFullYear()}${(count + 1).toString().padStart(5, '0')}`;
    }
    next();
});


const Order = mongoose.model('Order', orderSchema);
export default Order;