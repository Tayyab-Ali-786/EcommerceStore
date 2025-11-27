const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"]
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Compound index to ensure one review per user per product
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("review", reviewSchema);
