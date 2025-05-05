import mongoose from 'mongoose';
import crypto from 'crypto';

const SignUPVerifyOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    uuid: {
        type: String,
        required: true,
        default: () => crypto.randomUUID(),
        unique: true,
    },
    otp: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid 6-digit OTP!`,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: { // This field is used by MongoDB to automatically delete the document
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
});

SignUPVerifyOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const SignUPVerifyOTP = mongoose.model('SignUPVerifyOTP', SignUPVerifyOTPSchema);

SignUPVerifyOTP.syncIndexes().catch(console.error);

export default SignUPVerifyOTP;
