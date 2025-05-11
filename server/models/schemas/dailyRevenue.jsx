import mongoose from 'mongoose';

const dailyRevenueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    trim: true
  },
  source: {
    type: String,
    trim: true
  }
});

const DailyRevenue = mongoose.model('DailyRevenue', dailyRevenueSchema);
export default DailyRevenue;
