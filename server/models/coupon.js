const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Coupon code is required"],
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true
    },
    discountValue: {
        type: Number,
        required: [true, "Discount value is required"],
        min: [0, "Discount value cannot be negative"]
    },
    minPurchaseAmount: {
        type: Number,
        default: 0
    },
    maxDiscountAmount: {
        type: Number
    },
    validFrom: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date,
        required: [true, "Expiry date is required"]
    },
    usageLimit: {
        type: Number,
        default: null // null means unlimited
    },
    usedCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("coupon", couponSchema);
