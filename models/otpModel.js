import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
    {
        registrationNumber: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
    },
    {
        timestamps: true,
    }
);

mongoose.models = {};

const otp = mongoose.model('otp', otpSchema);

export default otp;