import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return this.loginType !== 'google';
        }
    },
    loginType: {
        type: String,
        enum: ['manual', 'google'],
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    lastLoginTime: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

export default User;