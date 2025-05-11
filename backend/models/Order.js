import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String,
  tailorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tailor' },
  description: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'declined'],
    default: 'active',
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

