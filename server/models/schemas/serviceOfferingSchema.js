// models/schemas/serviceOfferingSchema.js
import mongoose from 'mongoose';

const serviceOfferingSchema = new mongoose.Schema({
    tailor: { // The tailor (User ID) offering this service
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    tailorName: { // Denormalized for easier display
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: [true, "Service name is required."],
        trim: true,
        index: true, // For searching
    },
    description: {
        type: String,
        required: [true, "Service description is required."],
        trim: true,
    },
    category: { // e.g., "Men's Formal", "Women's Bridal", "Alterations", "Men's Casual"
        type: String,
        required: [true, "Service category is required."],
        trim: true,
        index: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    priceType: { // e.g., "Fixed", "Starting at", "Per Hour", "Per Piece"
        type: String,
        default: "Fixed",
    },
    estimatedDuration: { // e.g., "3-5 days", "1 week"
        type: String,
    },
    location: { // Location where the tailor offers this service (could be same as tailor's main city)
        type: String,
        required: [true, "Location is required."],
        trim: true,
        index: true,
    },
    images: [{ // URLs to images showcasing the service or examples
        type: String,
    }],
    tags: [{ // Keywords for better searchability
        type: String,
        trim: true,
        lowercase: true,
    }],
    isActive: { // For tailor to enable/disable the listing
        type: Boolean,
        default: true,
    },
    // You might add an approval status if admins need to approve services
    // status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    // You might want to store an average rating for this specific service if you implement service-level ratings
}, { timestamps: true });

// Text index for more efficient searching on multiple fields
serviceOfferingSchema.index({ serviceName: 'text', description: 'text', category: 'text', tags: 'text', tailorName: 'text' });

const ServiceOffering = mongoose.model('ServiceOffering', serviceOfferingSchema);

export default ServiceOffering;