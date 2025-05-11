import mongoose from 'mongoose';

const registrationRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  speciality: {
    type: String,
    required: true,
    trim: true
  },
  experienceInYears: {
    type: Number,
    min: 0,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  }
});

const RegistrationRequest = mongoose.model('RegistrationRequest', registrationRequestSchema);
export default RegistrationRequest;
