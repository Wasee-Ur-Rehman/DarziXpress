import mongoose from 'mongoose';

const userManagementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['taylor', 'customer'],
    default: 'user',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

const UserManagement = mongoose.model('UserManagement', userManagementSchema);
export default UserManagement;
