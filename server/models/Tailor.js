import mongoose from 'mongoose';

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'active', 'disabled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
const Tailor = mongoose.model('Tailor', tailorSchema);
export default Tailor;

